#!/usr/bin/env node
/**
 * DealDock — Airtable Patch Script
 * Adds all missing DealDock fields to the existing tables.
 * Safe to run multiple times — skips fields that already exist.
 */

const API_KEY = process.env.AIRTABLE_API_KEY;
const BASE_ID = process.env.AIRTABLE_BASE_ID;

const META_BASE = `https://api.airtable.com/v0/meta/bases/${BASE_ID}`;
const HEADERS = { Authorization: `Bearer ${API_KEY}`, 'Content-Type': 'application/json' };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(method, path, body) {
  const res = await fetch(`${META_BASE}${path}`, {
    method,
    headers: HEADERS,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`${method} ${path} → ${JSON.stringify(data)}`);
  return data;
}

async function addField(tableId, field, existingNames) {
  if (existingNames.has(field.name)) {
    process.stdout.write(`   ⏭  ${field.name} (exists)\n`);
    return;
  }
  await sleep(220);
  try {
    await api('POST', `/tables/${tableId}/fields`, field);
    process.stdout.write(`   ✅ ${field.name} (${field.type})\n`);
  } catch (e) {
    process.stdout.write(`   ❌ ${field.name}: ${e.message}\n`);
  }
}

// ─── LEADS fields to add ─────────────────────────────────────────────────────
const LEADS_FIELDS = [
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
  { name: 'linkedin_url', type: 'url' },
  { name: 'twitter_handle', type: 'singleLineText' },
  { name: 'email', type: 'email' },
  { name: 'email_found', type: 'checkbox', options: { icon: 'check', color: 'greenBright' } },
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
  { name: 'email_sequence_active', type: 'checkbox', options: { icon: 'check', color: 'greenBright' } },
  { name: 'sequence_step', type: 'number', options: { precision: 0 } },
  { name: 'date_first_msg_sent', type: 'date', options: { dateFormat: { name: 'local' } } },
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
  { name: 'ig_dm_draft', type: 'multilineText' },
  { name: 'li_connection_note', type: 'multilineText' },
  { name: 'li_followup_note', type: 'multilineText' },
  { name: 'outreach_drafted', type: 'checkbox', options: { icon: 'check', color: 'blueBright' } },
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
  { name: 'last_auto_touchpoint', type: 'date', options: { dateFormat: { name: 'local' } } },
  { name: 'next_action', type: 'singleLineText' },
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
  { name: 'notes', type: 'multilineText' },
  {
    name: 'airtable_record_url',
    type: 'formula',
    options: { formula: 'CONCATENATE("https://airtable.com/", RECORD_ID())' },
  },
  { name: 'bio_links', type: 'multilineText' },
  { name: 'story_highlights', type: 'multilineText' },
  { name: 'first_name', type: 'singleLineText' },
  { name: 'name', type: 'singleLineText' },
  { name: 'country_code', type: 'singleLineText' },
];

// ─── CALLS fields to add ─────────────────────────────────────────────────────
const CALLS_FIELDS = [
  { name: 'calendly_event_id', type: 'singleLineText' },
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
  { name: 'ig_handle_intake', type: 'singleLineText' },
  { name: 'invitee_name', type: 'singleLineText' },
  { name: 'invitee_email', type: 'email' },
  { name: 'dm_volume_intake', type: 'singleLineText' },
  { name: 'product_type_intake', type: 'singleLineText' },
  { name: 'heard_from', type: 'singleLineText' },
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

// ─── DAILY COUNTERS fields to add ────────────────────────────────────────────
const COUNTERS_FIELDS = [
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

async function patchTable(tableId, tableName, fieldsToAdd, existingFieldNames) {
  console.log(`\n📋  Patching: ${tableName} (id: ${tableId})`);

  // existingFieldNames passed in from the main /tables response
  const existing = new Set(existingFieldNames);
  console.log(`   Existing fields: ${existingFieldNames.length}`);
  console.log(`   Fields to ensure: ${fieldsToAdd.length}`);

  let added = 0;
  let skipped = 0;
  for (const field of fieldsToAdd) {
    if (existing.has(field.name)) {
      skipped++;
    } else {
      await addField(tableId, field, existing);
      existing.add(field.name); // prevent duplicate adds within this run
      added++;
    }
  }
  console.log(`   Done: +${added} added, ${skipped} already existed`);
}

async function addLinkedRecordIfMissing(callsTableId, leadsTableId, callsFieldNames) {
  const existing = new Set(callsFieldNames);
  if (existing.has('lead_id')) {
    console.log('\n   ⏭  lead_id link already exists');
    return;
  }
  console.log('\n🔗  Adding lead_id (Calls → Leads link)...');
  await sleep(220);
  await api('POST', `/tables/${callsTableId}/fields`, {
    name: 'lead_id',
    type: 'multipleRecordLinks',
    options: { linkedTableId: leadsTableId },
  });
  console.log('   ✅ lead_id linked record added');
}

async function main() {
  console.log('\n🔧  DealDock Airtable Patch');
  console.log(`   Base: ${BASE_ID}\n`);

  const { tables } = await api('GET', '/tables');
  const tableMap = Object.fromEntries(tables.map((t) => [t.name, t]));

  const leadsTable = tableMap['Leads'];
  const callsTable = tableMap['Calls'];
  const countersTable = tableMap['Daily Counters'];

  if (!leadsTable) throw new Error('"Leads" table not found in base');
  if (!callsTable) throw new Error('"Calls" table not found in base');
  if (!countersTable) throw new Error('"Daily Counters" table not found in base');

  const leadsFieldNames = leadsTable.fields.map((f) => f.name);
  const callsFieldNames = callsTable.fields.map((f) => f.name);
  const countersFieldNames = countersTable.fields.map((f) => f.name);

  await patchTable(leadsTable.id, 'Leads', LEADS_FIELDS, leadsFieldNames);
  await patchTable(callsTable.id, 'Calls', CALLS_FIELDS, callsFieldNames);
  await addLinkedRecordIfMissing(callsTable.id, leadsTable.id, callsFieldNames);
  await patchTable(countersTable.id, 'Daily Counters', COUNTERS_FIELDS, countersFieldNames);

  console.log('\n' + '─'.repeat(60));
  console.log('✅  All DealDock fields are in place!\n');
  console.log('📌  Remaining manual steps in Airtable UI:');
  console.log('   1. Hide the legacy generic fields (Lead Name, Company, etc.)');
  console.log('      — they won\'t affect automation, just visual clutter');
  console.log('   2. Create 6 views in Leads table (see airtable-schema.md)');
  console.log('   3. Import 3 CSVs from C:\\code\\DealDock\\leads\\');
  console.log('      Set enrichment_status=pending + qualification_status=pending on import');
  console.log('─'.repeat(60) + '\n');
}

main().catch((e) => { console.error('❌', e.message); process.exit(1); });
