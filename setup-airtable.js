#!/usr/bin/env node
/**
 * DealDock — Airtable Base Setup Script
 *
 * Creates all 3 tables (Leads, Calls, Daily Counters) with correct field types,
 * select options, and formulas using the Airtable Meta API.
 *
 * Prerequisites:
 *   1. Create an empty base named "DealDock CRM" at airtable.com
 *   2. Get your Personal Access Token from airtable.com/account → Developer Hub → Tokens
 *      - Scope needed: schema.bases:write, schema.bases:read
 *   3. Get the Base ID from the base URL: airtable.com/appXXXXXXXX/...
 *
 * Usage:
 *   AIRTABLE_API_KEY=patXXX AIRTABLE_BASE_ID=appXXX node setup-airtable.js
 *
 * Or create a .env.local and run:
 *   node -e "require('dotenv').config({path:'.env.local'})" -r dotenv/config setup-airtable.js
 */

const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!API_KEY || !BASE_ID) {
  console.error('\n❌  Missing environment variables.\n');
  console.error('Usage: AIRTABLE_API_KEY=patXXX AIRTABLE_BASE_ID=appXXX node setup-airtable.js\n');
  process.exit(1);
}

const META_BASE = `https://api.airtable.com/v0/meta/bases/${BASE_ID}`;
const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function apiCall(method, path, body) {
  const res = await fetch(`${META_BASE}${path}`, {
    method,
    headers: HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(`API ${method} ${path} failed: ${JSON.stringify(data)}`);
  }
  return data;
}

// ─── Helper: create a table and return its id ────────────────────────────────
async function createTable(name, fields) {
  console.log(`\n📋  Creating table: ${name} (${fields.length} fields)...`);
  const result = await apiCall('POST', '/tables', { name, fields });
  console.log(`✅  Created "${name}" → tableId: ${result.id}`);
  return result;
}

// ─── Helper: add fields to an existing table (for fields that need linkedTableId) ─
async function addField(tableId, field) {
  await sleep(250); // stay under 5 req/s rate limit
  const result = await apiCall('POST', `/tables/${tableId}/fields`, field);
  console.log(`   + Added field: ${field.name} (${field.type})`);
  return result;
}

// ─── LEADS TABLE ─────────────────────────────────────────────────────────────
const LEADS_FIELDS = [
  // Primary field — must be first
  { name: 'ig_handle', type: 'singleLineText' },

  // Instagram profile
  { name: 'ig_followers', type: 'number', options: { precision: 0 } },
  { name: 'ig_bio', type: 'multilineText' },
  { name: 'ig_website', type: 'url' },
  { name: 'ig_following', type: 'number', options: { precision: 0 } },
  { name: 'ig_posts_count', type: 'number', options: { precision: 0 } },
  { name: 'ig_is_business', type: 'checkbox', options: { icon: 'check', color: 'greenBright' } },
  { name: 'ig_is_verified', type: 'checkbox', options: { icon: 'check', color: 'blueBright' } },
  { name: 'ig_avg_likes', type: 'number', options: { precision: 0 } },
  { name: 'story_highlights_count', type: 'number', options: { precision: 0 } },
  { name: 'recent_post_sample', type: 'multilineText' },

  // Social profiles
  { name: 'linkedin_url', type: 'url' },
  { name: 'twitter_handle', type: 'singleLineText' },

  // Contact
  { name: 'email', type: 'email' },
  { name: 'email_found', type: 'checkbox', options: { icon: 'check', color: 'greenBright' } },

  // Source
  {
    name: 'source',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'ig_hashtag', color: 'blueLight2' },
        { name: 'ig_follower_mining', color: 'cyanLight2' },
        { name: 'linkedin', color: 'blueLight2' },
        { name: 'twitter', color: 'cyanLight2' },
        { name: 'podcast_guest', color: 'purpleLight2' },
        { name: 'community', color: 'greenLight2' },
        { name: 'warm_intro', color: 'yellowLight2' },
        { name: 'vibe_prospecting', color: 'orangeLight2' },
        { name: 'inbound', color: 'pinkLight2' },
      ],
    },
  },
  { name: 'source_detail', type: 'singleLineText' },
  { name: 'date_sourced', type: 'date', options: { dateFormat: { name: 'local' } } },

  // ICP classification
  {
    name: 'niche',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'business', color: 'blueLight2' },
        { name: 'fitness', color: 'greenLight2' },
        { name: 'finance', color: 'yellowLight2' },
        { name: 'language', color: 'cyanLight2' },
        { name: 'career', color: 'purpleLight2' },
        { name: 'design', color: 'pinkLight2' },
        { name: 'marketing', color: 'orangeLight2' },
        { name: 'mindset', color: 'tealLight2' },
        { name: 'wellness', color: 'greenLight2' },
        { name: 'other', color: 'grayLight2' },
      ],
    },
  },
  {
    name: 'estimated_revenue_band',
    type: 'singleSelect',
    options: {
      choices: [
        { name: '<₹4L', color: 'redLight2' },
        { name: '₹4-10L', color: 'orangeLight2' },
        { name: '₹10-25L', color: 'yellowLight2' },
        { name: '₹25L+', color: 'greenLight2' },
        { name: '<$5K', color: 'redLight2' },
        { name: '$5-20K', color: 'orangeLight2' },
        { name: '$20-50K', color: 'yellowLight2' },
        { name: '$50K+', color: 'greenLight2' },
        { name: 'unknown', color: 'grayLight2' },
      ],
    },
  },
  { name: 'has_product_page', type: 'checkbox', options: { icon: 'check', color: 'greenBright' } },
  { name: 'has_booking_link', type: 'checkbox', options: { icon: 'check', color: 'cyanBright' } },

  // AI Qualification
  { name: 'score', type: 'number', options: { precision: 0 } },
  { name: 'yes_signals_hit', type: 'multilineText' },
  { name: 'anti_signals_hit', type: 'multilineText' },
  { name: 'personalization_hook', type: 'multilineText' },
  {
    name: 'outreach_priority',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'high', color: 'redBright' },
        { name: 'medium', color: 'yellowBright' },
        { name: 'low', color: 'grayBright' },
      ],
    },
  },

  // Pipeline status
  {
    name: 'enrichment_status',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'pending', color: 'yellowLight2' },
        { name: 'complete', color: 'greenLight2' },
        { name: 'failed', color: 'redLight2' },
      ],
    },
  },
  {
    name: 'qualification_status',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'pending', color: 'yellowLight2' },
        { name: 'qualified', color: 'greenLight2' },
        { name: 'hold', color: 'orangeLight2' },
        { name: 'dead', color: 'redLight2' },
      ],
    },
  },

  // Sequence tracking
  { name: 'email_sequence_active', type: 'checkbox', options: { icon: 'check', color: 'greenBright' } },
  { name: 'sequence_step', type: 'number', options: { precision: 0 } },
  { name: 'date_first_msg_sent', type: 'date', options: { dateFormat: { name: 'local' } } },

  // Replies
  { name: 'replied', type: 'checkbox', options: { icon: 'check', color: 'greenBright' } },
  {
    name: 'reply_sentiment',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'warm', color: 'greenLight2' },
        { name: 'lukewarm', color: 'yellowLight2' },
        { name: 'not-fit', color: 'redLight2' },
        { name: 'unsubscribe', color: 'grayLight2' },
      ],
    },
  },
  { name: 'date_replied', type: 'date', options: { dateFormat: { name: 'local' } } },
  { name: 'li_replied', type: 'checkbox', options: { icon: 'check', color: 'blueBright' } },

  // Outreach drafts (AI-generated)
  { name: 'ig_dm_draft', type: 'multilineText' },
  { name: 'li_connection_note', type: 'multilineText' },
  { name: 'li_followup_note', type: 'multilineText' },
  { name: 'outreach_drafted', type: 'checkbox', options: { icon: 'check', color: 'blueBright' } },

  // Call tracking
  { name: 'call_booked', type: 'checkbox', options: { icon: 'check', color: 'greenBright' } },
  {
    name: 'call_date',
    type: 'dateTime',
    options: {
      dateFormat: { name: 'local' },
      timeFormat: { name: '12hour' },
      timeZone: 'Asia/Kolkata',
    },
  },
  { name: 'calendly_event_id', type: 'singleLineText' },

  // Stage
  {
    name: 'stage',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'Sourced', color: 'grayLight2' },
        { name: 'Enriched', color: 'blueLight2' },
        { name: 'Qualified', color: 'cyanLight2' },
        { name: 'Outreach Sent', color: 'yellowLight2' },
        { name: 'Replied', color: 'orangeLight2' },
        { name: 'Call Booked', color: 'purpleLight2' },
        { name: 'Call Done', color: 'pinkLight2' },
        { name: 'Pilot Active', color: 'greenLight2' },
        { name: 'Paying', color: 'greenBright' },
        { name: 'Dead', color: 'redLight2' },
      ],
    },
  },

  // Automation metadata
  { name: 'last_auto_touchpoint', type: 'date', options: { dateFormat: { name: 'local' } } },
  { name: 'next_action', type: 'singleLineText' },

  // Outcome
  {
    name: 'outcome',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'pilot', color: 'greenLight2' },
        { name: 'paying', color: 'greenBright' },
        { name: 'passed', color: 'grayLight2' },
        { name: 'ghosted', color: 'orangeLight2' },
        { name: 'not-fit', color: 'redLight2' },
      ],
    },
  },
  {
    name: 'dq_reason',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'too-small', color: 'grayLight2' },
        { name: 'too-big', color: 'grayLight2' },
        { name: 'no-own-product', color: 'redLight2' },
        { name: 'has-team', color: 'orangeLight2' },
        { name: 'not-active', color: 'yellowLight2' },
        { name: 'data-privacy-concern', color: 'purpleLight2' },
        { name: 'other', color: 'grayLight2' },
      ],
    },
  },
  { name: 'intros_given', type: 'number', options: { precision: 0 } },

  // Manual notes
  { name: 'notes', type: 'multilineText' },
];

// Formula fields added in a second pass (cannot be included in table creation)
const LEADS_FORMULA_FIELDS = [
  {
    name: 'airtable_record_url',
    type: 'formula',
    options: { formula: 'CONCATENATE("https://airtable.com/", RECORD_ID())' },
  },
];

// ─── CALLS TABLE ─────────────────────────────────────────────────────────────
// lead_id (linked record) is added as a separate step after we know the Leads tableId
const CALLS_FIELDS_BASE = [
  // Primary
  { name: 'calendly_event_id', type: 'singleLineText' },

  // Booking info
  {
    name: 'scheduled_at',
    type: 'dateTime',
    options: {
      dateFormat: { name: 'local' },
      timeFormat: { name: '12hour' },
      timeZone: 'Asia/Kolkata',
    },
  },
  {
    name: 'status',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'Scheduled', color: 'blueLight2' },
        { name: 'done', color: 'greenLight2' },
        { name: 'no-show', color: 'redLight2' },
      ],
    },
  },

  // Intake answers from Calendly form
  { name: 'ig_handle_intake', type: 'singleLineText' },
  { name: 'invitee_name', type: 'singleLineText' },
  { name: 'invitee_email', type: 'email' },
  { name: 'dm_volume_intake', type: 'singleLineText' },
  { name: 'product_type_intake', type: 'singleLineText' },
  { name: 'heard_from', type: 'singleLineText' },

  // Post-call
  { name: 'call_notes', type: 'multilineText' },
  {
    name: 'outcome',
    type: 'singleSelect',
    options: {
      choices: [
        { name: 'pilot-yes', color: 'greenLight2' },
        { name: 'pilot-no', color: 'redLight2' },
        { name: 'not-fit', color: 'grayLight2' },
        { name: 'follow-up', color: 'yellowLight2' },
      ],
    },
  },
  { name: 'pilot_start_date', type: 'date', options: { dateFormat: { name: 'local' } } },
  { name: 'post_call_email_sent', type: 'checkbox', options: { icon: 'check', color: 'greenBright' } },
];

// ─── DAILY COUNTERS TABLE ────────────────────────────────────────────────────
const DAILY_COUNTERS_FIELDS = [
  { name: 'date', type: 'date', options: { dateFormat: { name: 'local' } } },
  { name: 'leads_sourced', type: 'number', options: { precision: 0 } },
  { name: 'leads_enriched', type: 'number', options: { precision: 0 } },
  { name: 'leads_qualified', type: 'number', options: { precision: 0 } },
  { name: 'outreach_sent', type: 'number', options: { precision: 0 } },
  { name: 'replies_received', type: 'number', options: { precision: 0 } },
  { name: 'warm_replies', type: 'number', options: { precision: 0 } },
  { name: 'calls_booked', type: 'number', options: { precision: 0 } },
  { name: 'calls_done', type: 'number', options: { precision: 0 } },
  { name: 'pilots_closed', type: 'number', options: { precision: 0 } },
];

// ─── MAIN ────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🚀  DealDock Airtable Base Setup`);
  console.log(`   Base ID : ${BASE_ID}`);
  console.log(`   API Key : ${API_KEY.substring(0, 12)}...`);
  console.log('');

  // Step 1: List existing tables so we don't double-create
  console.log('🔍  Checking existing tables...');
  const { tables: existingTables } = await apiCall('GET', '/tables');
  const existingNames = existingTables.map((t) => t.name);
  console.log(`   Existing: ${existingNames.join(', ') || '(none)'}`);

  let leadsTableId;

  // ── Create Leads table ───────────────────────────────────────────────────
  const existingLeads = existingTables.find((t) => t.name === 'Leads');
  if (existingLeads) {
    console.log('\n⚠️   "Leads" table already exists — skipping creation, using existing ID.');
    leadsTableId = existingLeads.id;
  } else {
    const leadsTable = await createTable('Leads', LEADS_FIELDS);
    leadsTableId = leadsTable.id;
    // Add formula fields in a second pass
    console.log('\n🔢  Adding formula fields to Leads...');
    for (const f of LEADS_FORMULA_FIELDS) {
      await addField(leadsTableId, f, new Set());
    }
  }

  await sleep(500);

  // ── Create Calls table ───────────────────────────────────────────────────
  let callsTableId;
  const existingCalls = existingTables.find((t) => t.name === 'Calls');
  if (existingCalls) {
    console.log('\n⚠️   "Calls" table already exists — skipping creation, using existing ID.');
    callsTableId = existingCalls.id;
  } else {
    const callsTable = await createTable('Calls', CALLS_FIELDS_BASE);
    callsTableId = callsTable.id;

    // Add the linked record field now that we know both table IDs
    console.log('\n🔗  Adding linked record field (Calls → Leads)...');
    await addField(callsTableId, {
      name: 'lead_id',
      type: 'multipleRecordLinks',
      options: { linkedTableId: leadsTableId },
    });
  }

  await sleep(500);

  // ── Create Daily Counters table ──────────────────────────────────────────
  const existingCounters = existingTables.find((t) => t.name === 'Daily Counters');
  if (existingCounters) {
    console.log('\n⚠️   "Daily Counters" table already exists — skipping creation.');
  } else {
    await createTable('Daily Counters', DAILY_COUNTERS_FIELDS);
  }

  // ── Delete the default "Table 1" if it exists ────────────────────────────
  const defaultTable = existingTables.find((t) => t.name === 'Table 1' || t.name === 'tblDefault');
  if (defaultTable) {
    console.log('\n🗑️   Removing default empty table...');
    // Note: Airtable API doesn't support deleting tables via Meta API
    // You'll need to delete "Table 1" manually in the UI
    console.log('   ⚠️  Cannot delete "Table 1" via API — please delete it manually in Airtable.');
  }

  // ── Print summary ────────────────────────────────────────────────────────
  console.log('\n' + '─'.repeat(60));
  console.log('✅  Setup complete!\n');
  console.log('📋  Table IDs (copy these into your n8n env vars):');
  console.log(`   AIRTABLE_BASE_ID    = ${BASE_ID}`);
  console.log(`   AIRTABLE_LEADS_TABLE  = Leads`);
  console.log(`   AIRTABLE_CALLS_TABLE  = Calls`);
  console.log('');
  console.log('📌  Manual steps remaining in Airtable UI:');
  console.log('   1. Delete "Table 1" (the default empty table) if present');
  console.log('   2. Create views in the Leads table:');
  console.log('      - "🎯 Outreach Queue Today" (filter: qualified + high priority, sort: score desc)');
  console.log('      - "🔥 Hot Leads" (filter: reply_sentiment=warm, call_booked=false)');
  console.log('      - "⏰ Follow-up Due" (filter: replied=false, date_first_msg_sent not empty)');
  console.log('      - "📞 Calls This Week" (calendar view on call_date)');
  console.log('      - "✅ Pilot Active" (filter: stage = Pilot Active or Paying)');
  console.log('      - "💀 Dead Pool" (filter: stage = Dead)');
  console.log('   3. Import your 3 lead CSVs from C:\\code\\DealDock\\leads\\');
  console.log('      - Set enrichment_status = pending on all rows');
  console.log('      - Set qualification_status = pending on all rows');
  console.log('');
  console.log('🎉  Run n8n workflows 01-07 after this. See n8n-workflows/README.md');
  console.log('─'.repeat(60) + '\n');
}

main().catch((err) => {
  console.error('\n❌  Fatal error:', err.message);
  process.exit(1);
});
