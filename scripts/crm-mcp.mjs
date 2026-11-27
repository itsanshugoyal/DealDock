// Minimal stdio client for founder-crm's MCP server (the live CRM since 25 Oct 2026; Airtable is a read-only archive).
// Credentials stay inside founder-crm's own launcher (its .local/credentials files); nothing secret is printed.
//   node scripts/crm-mcp.mjs list                      tool names and arguments
//   node scripts/crm-mcp.mjs tasks [regex]             tasks (status | due | owner | title | id | version), optionally filtered by title
//   node scripts/crm-mcp.mjs plan spec.json [--apply]  preview, then apply, a batch of task updates/creates, and read them back
// spec.json: { "updates": [{ "id" or "title", "status"?, "append": "text added to notes" }],
//              "creates": [{ "title", "status": "to_do", "ownerId", "dueAt", "data": { "notes", "owner", "channel", "priority", "scope" } }] }
// Owner ids: Anshu c32246c7-04f9-4046-a6e6-f1eff7f3e895, Nahush 90faa550-1160-4dd3-88c3-bfa95fff6f63 (null + data.owner "Both" for both).
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";

const CRM = process.env.FOUNDER_CRM_DIR || "C:/code/founder-crm";
const [mode, arg] = process.argv.slice(2);
const child = spawn(process.execPath, ["scripts/mcp-launch.mjs"], { cwd: CRM, stdio: ["pipe", "pipe", "inherit"], windowsHide: true });
let buf = "", nextId = 1;
const pending = new Map();
child.stdout.on("data", (d) => {
  buf += d;
  let i;
  while ((i = buf.indexOf("\n")) >= 0) {
    const line = buf.slice(0, i).trim(); buf = buf.slice(i + 1);
    if (!line) continue;
    let msg; try { msg = JSON.parse(line); } catch { continue; }
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  }
});
const rpc = (method, params) => new Promise((res, rej) => {
  const id = nextId++;
  const t = setTimeout(() => rej(new Error("timeout " + method)), 60000);
  pending.set(id, (m) => { clearTimeout(t); m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result); });
  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
});
const text = (r) => (r.content || []).map((c) => c.text || "").join("");
const records = async () => JSON.parse(text(await rpc("tools/call", { name: "records_list", arguments: {} })));

try {
  await rpc("initialize", { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "dealdock-seo", version: "1" } });
  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method: "notifications/initialized" }) + "\n");

  if (mode === "list") {
    for (const t of (await rpc("tools/list", {})).tools) console.log(t.name, "| args:", Object.keys(t.inputSchema?.properties || {}).join(","));
  } else if (mode === "tasks") {
    const re = new RegExp(arg || ".", "i");
    for (const r of (await records()).records.filter((r) => r.kind === "task" && re.test(r.title)))
      console.log([r.status, r.dueAt?.slice(0, 10) || "-", r.data?.owner || "-", r.title, r.id, "v" + r.version].join(" | "));
  } else if (mode === "plan") {
    const spec = JSON.parse(readFileSync(arg, "utf8"));
    const state = await records();
    const byId = new Map(state.records.map((r) => [r.id, r]));
    const updates = (spec.updates || []).map((u) => {
      const r = u.id ? byId.get(u.id) : state.records.find((x) => x.title === u.title);
      if (!r) throw new Error("record not found: " + (u.id || u.title));
      const data = { ...r.data, notes: `${r.data?.notes || ""}\n\n${u.append}`.trim() };
      return { recordId: r.id, version: r.version, title: r.title, payload: { ...(u.status ? { status: u.status } : {}), data } };
    });
    const creates = spec.creates || [];
    const changes = [
      ...updates.map((u) => ({ action: "update_record", recordId: u.recordId, version: u.version, payload: u.payload })),
      ...creates.map((c) => ({ action: "create_record", payload: { kind: "task", ...c } })),
    ];
    const preview = await rpc("tools/call", { name: "changeset_preview", arguments: { changes } });
    console.log(preview.isError ? "PREVIEW FAILED: " + text(preview) : `preview ok: ${changes.length} change(s)`);
    if (!preview.isError && process.argv.includes("--apply")) {
      for (const u of updates) {
        const r = await rpc("tools/call", { name: "record_update", arguments: { recordId: u.recordId, version: u.version, ...u.payload } });
        console.log(r.isError ? "FAILED update" : "updated", "|", u.title, r.isError ? "| " + text(r).slice(0, 160) : "");
      }
      for (const c of creates) {
        const r = await rpc("tools/call", { name: "task_create", arguments: { kind: "task", ...c } });
        console.log(r.isError ? "FAILED create" : "created", "|", c.title, r.isError ? "| " + text(r).slice(0, 160) : "");
      }
      const titles = new Set([...updates.map((u) => u.title), ...creates.map((c) => c.title)]);
      for (const r of (await records()).records.filter((r) => titles.has(r.title))) console.log("readback |", r.status, "| v" + r.version, "|", r.title);
    }
    if (preview.isError) process.exitCode = 1;
  } else {
    console.log("usage: node scripts/crm-mcp.mjs list | tasks [regex] | plan spec.json [--apply]");
  }
} catch (e) { console.error("error:", e.message); process.exitCode = 1; }
child.kill();
