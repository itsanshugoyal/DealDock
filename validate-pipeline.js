#!/usr/bin/env node
/**
 * validate-pipeline.js
 * End-to-end validation of the entire DealDock pipeline.
 * Checks every integration and reports what's working vs what needs attention.
 *
 * Usage: node validate-pipeline.js
 *
 * Reads from .env.local if present, otherwise uses environment variables.
 */

const fs = require("fs");
const path = require("path");

// ── Load .env.local ──
const envPath = path.join(__dirname, ".env.local");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}

const AIRTABLE_PAT = process.env.AIRTABLE_PAT || "";
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || "";
const N8N_API_KEY = process.env.N8N_API_KEY || "";
const N8N_BASE_URL = process.env.N8N_BASE_URL || "http://localhost:5678";

const WORKFLOW_IDS = {
  "01-lead-sourcing": "d8YMeCAueTucIkD0",
  "02-enrichment": "YC77aVl5dlHDH4ng",
  "03-ai-qualification": "CzwUqnOitBKeJGot",
  "04-email-sequences": "411zkm7jWRURJuOU",
  "05-reply-monitor": "PZMjxDwAnJXzAzrl",
  "06-slack-outreach-drafts": "4Tj8zcjVHIY3fFCO",
  "07-calendly-booking": "EGgI9dWWaEE9zu0L",
};

const results = [];
let passCount = 0;
let failCount = 0;
let warnCount = 0;

function pass(test, detail) {
  passCount++;
  results.push({ status: "✅", test, detail });
  console.log(`  ✅ ${test}${detail ? ` — ${detail}` : ""}`);
}
function fail(test, detail) {
  failCount++;
  results.push({ status: "❌", test, detail });
  console.log(`  ❌ ${test}${detail ? ` — ${detail}` : ""}`);
}
function warn(test, detail) {
  warnCount++;
  results.push({ status: "⚠️", test, detail });
  console.log(`  ⚠️ ${test}${detail ? ` — ${detail}` : ""}`);
}

async function checkEnvVars() {
  console.log("\n── Environment Variables ──");
  const required = ["AIRTABLE_PAT", "AIRTABLE_BASE_ID"];
  const optional = [
    "N8N_API_KEY",
    "ANTHROPIC_API_KEY",
    "APIFY_API_TOKEN",
    "HUNTER_API_KEY",
    "SLACK_WEBHOOK_LEADS",
    "SLACK_WEBHOOK_OUTREACH",
    "CALENDLY_LINK",
    "SENDER_NAME",
  ];

  for (const v of required) {
    process.env[v] ? pass(v, "set") : fail(v, "MISSING (required)");
  }
  for (const v of optional) {
    process.env[v] ? pass(v, "set") : warn(v, "not set");
  }
}

async function checkAirtable() {
  console.log("\n── Airtable ──");
  if (!AIRTABLE_PAT) {
    fail("Airtable connection", "No PAT configured");
    return;
  }

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/meta/bases/${AIRTABLE_BASE_ID}/tables`,
      { headers: { Authorization: `Bearer ${AIRTABLE_PAT}` } }
    );
    if (!res.ok) {
      fail("Airtable API", `HTTP ${res.status}`);
      return;
    }
    const data = await res.json();
    const tables = data.tables || [];
    pass("Airtable connection", `${tables.length} tables found`);

    const expectedTables = {
      Leads: 45,
      Calls: 10,
      "Daily Counters": 8,
    };

    for (const [name, minFields] of Object.entries(expectedTables)) {
      const table = tables.find((t) => t.name === name);
      if (table) {
        const fieldCount = table.fields?.length || 0;
        if (fieldCount >= minFields) {
          pass(`Table: ${name}`, `${fieldCount} fields`);
        } else {
          warn(
            `Table: ${name}`,
            `${fieldCount} fields (expected ≥${minFields})`
          );
        }
      } else {
        fail(`Table: ${name}`, "NOT FOUND");
      }
    }

    // Check lead count
    const leadsRes = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Leads?pageSize=1`,
      { headers: { Authorization: `Bearer ${AIRTABLE_PAT}` } }
    );
    if (leadsRes.ok) {
      const leadsData = await leadsRes.json();
      const count = leadsData.records?.length || 0;
      const hasMore = !!leadsData.offset;
      if (count > 0) {
        pass("Leads data", `Has records${hasMore ? " (paginated)" : ""}`);
      } else {
        warn("Leads data", "Table is empty — run seed-leads.js");
      }
    }
  } catch (err) {
    fail("Airtable connection", err.message);
  }
}

async function checkN8n() {
  console.log("\n── n8n ──");

  // Check if n8n is running
  try {
    const healthRes = await fetch(`${N8N_BASE_URL}/healthz`, {
      signal: AbortSignal.timeout(3000),
    });
    if (healthRes.ok) {
      pass("n8n server", `Running at ${N8N_BASE_URL}`);
    } else {
      fail("n8n server", `Unhealthy (HTTP ${healthRes.status})`);
      return;
    }
  } catch {
    fail("n8n server", `Not reachable at ${N8N_BASE_URL}`);
    return;
  }

  if (!N8N_API_KEY) {
    warn("n8n API key", "Not configured — can't check workflows");
    return;
  }

  try {
    const res = await fetch(`${N8N_BASE_URL}/api/v1/workflows`, {
      headers: { "X-N8N-API-KEY": N8N_API_KEY },
    });
    if (!res.ok) {
      fail("n8n API", `HTTP ${res.status}`);
      return;
    }
    const data = await res.json();
    const allWfs = data.data || [];
    pass("n8n API", `${allWfs.length} total workflows`);

    const ddIds = new Set(Object.values(WORKFLOW_IDS));
    const ddWfs = allWfs.filter((w) => ddIds.has(w.id));
    const activeWfs = ddWfs.filter((w) => w.active);

    if (ddWfs.length === 7) {
      pass("DealDock workflows", `All 7 imported`);
    } else {
      fail(
        "DealDock workflows",
        `Found ${ddWfs.length}/7 — run import-n8n-workflows.js`
      );
    }

    if (activeWfs.length > 0) {
      pass("Active workflows", `${activeWfs.length}/7 active`);
    } else {
      warn(
        "Active workflows",
        "0/7 active — activate from dashboard or n8n UI"
      );
    }

    // Check individual workflows
    for (const [slug, id] of Object.entries(WORKFLOW_IDS)) {
      const wf = allWfs.find((w) => w.id === id);
      if (!wf) {
        fail(`Workflow: ${slug}`, "Missing");
      } else if (wf.active) {
        pass(`Workflow: ${slug}`, `Active (${wf.nodes?.length || 0} nodes)`);
      } else {
        warn(`Workflow: ${slug}`, `Inactive (${wf.nodes?.length || 0} nodes)`);
      }
    }
  } catch (err) {
    fail("n8n API", err.message);
  }
}

async function checkWorkflowFiles() {
  console.log("\n── Workflow JSON Files ──");
  const dir = path.join(__dirname, "n8n-workflows");
  for (let i = 1; i <= 7; i++) {
    const prefix = String(i).padStart(2, "0");
    const files = fs.readdirSync(dir).filter((f) => f.startsWith(prefix));
    if (files.length > 0) {
      try {
        const wf = JSON.parse(
          fs.readFileSync(path.join(dir, files[0]), "utf-8")
        );
        pass(
          files[0],
          `${wf.nodes?.length || 0} nodes, "${wf.name || "unnamed"}"`
        );
      } catch {
        fail(files[0], "Invalid JSON");
      }
    } else {
      fail(`Workflow ${prefix}-*.json`, "File not found");
    }
  }
}

async function checkApifyConfigs() {
  console.log("\n── Apify Configs ──");
  const dir = path.join(__dirname, "apify-configs");
  if (!fs.existsSync(dir)) {
    warn("Apify configs directory", "Not found");
    return;
  }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  if (files.length > 0) {
    pass("Apify configs", `${files.length} config files`);
    for (const f of files) {
      try {
        JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"));
        pass(`  ${f}`, "Valid JSON");
      } catch {
        fail(`  ${f}`, "Invalid JSON");
      }
    }
  } else {
    warn("Apify configs", "No JSON config files found");
  }
}

async function checkDashboard() {
  console.log("\n── Dashboard ──");
  const pages = [
    "src/app/dashboard/page.tsx",
    "src/app/dashboard/layout.tsx",
    "src/app/api/airtable/route.ts",
    "src/app/api/n8n/workflows/route.ts",
  ];
  for (const p of pages) {
    const full = path.join(__dirname, p);
    if (fs.existsSync(full)) {
      pass(p, "exists");
    } else {
      fail(p, "MISSING");
    }
  }

  // Try to hit the dashboard if dev server is running
  try {
    const res = await fetch("http://localhost:3456/dashboard", {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      pass("Dashboard server", "Running at localhost:3456");
    } else {
      warn("Dashboard server", `HTTP ${res.status}`);
    }
  } catch {
    warn(
      "Dashboard server",
      'Not running — start with "npx next dev --port 3456"'
    );
  }
}

async function main() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║  DealDock Pipeline Validator              ║");
  console.log("╚══════════════════════════════════════════╝");

  await checkEnvVars();
  await checkAirtable();
  await checkN8n();
  await checkWorkflowFiles();
  await checkApifyConfigs();
  await checkDashboard();

  console.log("\n══════════════════════════════════════════");
  console.log(`  ✅ ${passCount} passed  ⚠️ ${warnCount} warnings  ❌ ${failCount} failed`);
  console.log("══════════════════════════════════════════");

  if (failCount > 0) {
    console.log("\n🔴 Critical issues to fix:");
    results
      .filter((r) => r.status === "❌")
      .forEach((r) => console.log(`   → ${r.test}: ${r.detail}`));
  }
  if (warnCount > 0) {
    console.log("\n🟡 Optional improvements:");
    results
      .filter((r) => r.status === "⚠️")
      .forEach((r) => console.log(`   → ${r.test}: ${r.detail}`));
  }
  if (failCount === 0 && warnCount === 0) {
    console.log("\n🟢 Everything looks perfect! Pipeline is ready to go.");
  } else if (failCount === 0) {
    console.log(
      "\n🟢 Core pipeline is working. Address warnings when ready."
    );
  }

  process.exit(failCount > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Validator crashed:", err);
  process.exit(2);
});
