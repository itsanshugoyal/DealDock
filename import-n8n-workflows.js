#!/usr/bin/env node
/**
 * import-n8n-workflows.js
 * Imports all 7 DealDock workflow JSONs into n8n via REST API.
 *
 * Usage:
 *   N8N_API_KEY=xxxxx node import-n8n-workflows.js
 *   N8N_API_KEY=xxxxx N8N_BASE_URL=http://localhost:5678 node import-n8n-workflows.js
 */

const fs = require('fs');
const path = require('path');

const N8N_API_KEY = process.env.N8N_API_KEY;
const N8N_BASE_URL = (process.env.N8N_BASE_URL || 'http://localhost:5678').replace(/\/$/, '');

if (!N8N_API_KEY) {
  console.error('ERROR: N8N_API_KEY env var is required.');
  console.error('Get it from n8n → Settings → n8n API → Create API Key');
  process.exit(1);
}

// Workflow files in import order
const WORKFLOW_FILES = [
  '01-lead-sourcing.json',
  '02-enrichment.json',
  '03-ai-qualification.json',
  '04-email-sequences.json',
  '05-reply-monitor.json',
  '06-slack-outreach-drafts.json',
  '07-calendly-booking.json',
];

const WORKFLOWS_DIR = path.join(__dirname, 'n8n-workflows');

async function importWorkflow(filename) {
  const filePath = path.join(WORKFLOWS_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const workflow = JSON.parse(raw);

  // n8n REST API only accepts: name, nodes, connections, settings
  // Strip all other properties to avoid "must NOT have additional properties" error
  const payload = {
    name: workflow.name,
    nodes: workflow.nodes || [],
    connections: workflow.connections || {},
    settings: workflow.settings || {},
  };

  const res = await fetch(`${N8N_BASE_URL}/api/v1/workflows`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-N8N-API-KEY': N8N_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} importing ${filename}: ${text}`);
  }

  const data = await res.json();
  return { id: data.id, name: data.name, active: data.active };
}

async function listExistingWorkflows() {
  const res = await fetch(`${N8N_BASE_URL}/api/v1/workflows`, {
    headers: { 'X-N8N-API-KEY': N8N_API_KEY },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status} listing workflows: ${text}`);
  }
  const data = await res.json();
  return data.data || [];
}

async function main() {
  console.log(`Connecting to n8n at ${N8N_BASE_URL}...\n`);

  // Check existing workflows
  const existing = await listExistingWorkflows();
  const existingNames = new Set(existing.map(w => w.name));

  if (existing.length > 0) {
    console.log(`Found ${existing.length} existing workflow(s):`);
    existing.forEach(w => console.log(`  - ${w.name} (id=${w.id}, active=${w.active})`));
    console.log('');
  }

  const results = [];
  for (const filename of WORKFLOW_FILES) {
    const raw = fs.readFileSync(path.join(WORKFLOWS_DIR, filename), 'utf-8');
    const wf = JSON.parse(raw);
    const wfName = wf.name;

    if (existingNames.has(wfName)) {
      console.log(`⏭ SKIP: "${wfName}" already exists`);
      results.push({ filename, name: wfName, status: 'skipped' });
      continue;
    }

    try {
      const result = await importWorkflow(filename);
      console.log(`✅ IMPORTED: "${result.name}" → id=${result.id}`);
      results.push({ filename, name: result.name, id: result.id, status: 'imported' });
    } catch (err) {
      console.error(`❌ FAILED: ${filename} → ${err.message}`);
      results.push({ filename, status: 'failed', error: err.message });
    }
  }

  console.log('\n--- Summary ---');
  const imported = results.filter(r => r.status === 'imported');
  const skipped = results.filter(r => r.status === 'skipped');
  const failed = results.filter(r => r.status === 'failed');

  console.log(`Imported: ${imported.length}  Skipped: ${skipped.length}  Failed: ${failed.length}`);

  if (imported.length > 0) {
    console.log('\nNext steps:');
    console.log('1. Open n8n at ' + N8N_BASE_URL);
    console.log('2. For each workflow, open it and assign credentials (Airtable Header Auth, Gmail OAuth2)');
    console.log('3. Add environment variables in Settings → Environment Variables');
    console.log('4. Activate workflows in order: 07 → 05 → 06 → 03 → 02 → 04 → 01');
  }
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
