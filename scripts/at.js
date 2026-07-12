#!/usr/bin/env node
/**
 * at.js — Airtable CLI helper for the manual-mode DealDock pipeline.
 * Thin wrapper around the Airtable REST API so Claude Code skills run
 * deterministic commands instead of hand-rolled curl each time.
 *
 * Usage:
 *   node scripts/at.js list <table> "<filterByFormula>" [maxRecords]
 *   node scripts/at.js get <table> <recordId>
 *   node scripts/at.js update <table> <recordId> '<jsonFields>'
 *   node scripts/at.js create <table> '<jsonFields>'
 *   node scripts/at.js stats
 *
 * Reads AIRTABLE_PAT / AIRTABLE_BASE_ID from .env.local (same loader as validate-pipeline.js).
 */

const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env.local");
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

const AIRTABLE_PAT = process.env.AIRTABLE_PAT;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
  console.error("Missing AIRTABLE_PAT or AIRTABLE_BASE_ID (checked .env.local and env vars)");
  process.exit(1);
}

const API_BASE = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`;
const HEADERS = {
  Authorization: `Bearer ${AIRTABLE_PAT}`,
  "Content-Type": "application/json",
};

async function airtableFetch(pathAndQuery, options) {
  const res = await fetch(`${API_BASE}${pathAndQuery}`, { headers: HEADERS, ...options });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Airtable ${options?.method || "GET"} ${pathAndQuery} failed: ${JSON.stringify(data)}`);
  }
  return data;
}

async function listRecords(table, formula, maxRecords) {
  const params = new URLSearchParams();
  if (formula) params.set("filterByFormula", formula);
  if (maxRecords) params.set("maxRecords", String(maxRecords));
  const data = await airtableFetch(`/${encodeURIComponent(table)}?${params.toString()}`);
  console.log(JSON.stringify(data.records, null, 2));
}

async function getRecord(table, recordId) {
  const data = await airtableFetch(`/${encodeURIComponent(table)}/${recordId}`);
  console.log(JSON.stringify(data, null, 2));
}

async function updateRecord(table, recordId, fieldsJson) {
  const fields = JSON.parse(fieldsJson);
  const data = await airtableFetch(`/${encodeURIComponent(table)}/${recordId}`, {
    method: "PATCH",
    body: JSON.stringify({ fields }),
  });
  console.log(JSON.stringify(data, null, 2));
}

async function createRecord(table, fieldsJson) {
  const fields = JSON.parse(fieldsJson);
  const data = await airtableFetch(`/${encodeURIComponent(table)}`, {
    method: "POST",
    body: JSON.stringify({ fields }),
  });
  console.log(JSON.stringify(data, null, 2));
}

async function stats() {
  const data = await airtableFetch(`/Leads?pageSize=100`);
  const records = data.records || [];
  const count = (pred) => records.filter(pred).length;

  const summary = {
    total: records.length,
    by_enrichment_status: {},
    by_qualification_status: {},
    by_stage: {},
    qualified_awaiting_outreach: count(
      (r) => r.fields.qualification_status === "qualified" && !r.fields.outreach_drafted
    ),
    pending_qualification: count(
      (r) => r.fields.enrichment_status === "complete" && r.fields.qualification_status === "pending"
    ),
    pending_enrichment: count((r) => r.fields.enrichment_status === "pending" || !r.fields.enrichment_status),
  };

  for (const r of records) {
    const es = r.fields.enrichment_status || "(none)";
    const qs = r.fields.qualification_status || "(none)";
    const st = r.fields.stage || "(none)";
    summary.by_enrichment_status[es] = (summary.by_enrichment_status[es] || 0) + 1;
    summary.by_qualification_status[qs] = (summary.by_qualification_status[qs] || 0) + 1;
    summary.by_stage[st] = (summary.by_stage[st] || 0) + 1;
  }

  console.log(JSON.stringify(summary, null, 2));
}

async function main() {
  const [, , cmd, ...args] = process.argv;

  switch (cmd) {
    case "list": {
      const [table, formula, maxRecords] = args;
      if (!table) throw new Error("Usage: at.js list <table> [filterByFormula] [maxRecords]");
      await listRecords(table, formula, maxRecords);
      break;
    }
    case "get": {
      const [table, recordId] = args;
      if (!table || !recordId) throw new Error("Usage: at.js get <table> <recordId>");
      await getRecord(table, recordId);
      break;
    }
    case "update": {
      const [table, recordId, fieldsJson] = args;
      if (!table || !recordId || !fieldsJson) throw new Error("Usage: at.js update <table> <recordId> '<jsonFields>'");
      await updateRecord(table, recordId, fieldsJson);
      break;
    }
    case "create": {
      const [table, fieldsJson] = args;
      if (!table || !fieldsJson) throw new Error("Usage: at.js create <table> '<jsonFields>'");
      await createRecord(table, fieldsJson);
      break;
    }
    case "stats": {
      await stats();
      break;
    }
    default:
      console.error("Unknown command. Usage: at.js <list|get|update|create|stats> ...");
      process.exit(1);
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
