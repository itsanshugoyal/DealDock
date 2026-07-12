#!/usr/bin/env node
/**
 * seed-leads.js
 * Seeds 8 known Indian creator leads into the Airtable Leads table
 * to bootstrap the DealDock pipeline for testing.
 *
 * Usage:
 *   AIRTABLE_API_KEY=patXXX AIRTABLE_BASE_ID=appXXX node seed-leads.js
 */

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID || 'appd6MifJsQc0hBXo';
const TABLE_NAME = 'Leads';

if (!AIRTABLE_API_KEY) {
  console.error('Set AIRTABLE_API_KEY in your environment (see .env.local).');
  process.exit(1);
}

const SEED_LEADS = [
  {
    ig_handle: 'financewithsharan',
    ig_followers: 4800000,
    ig_bio: 'Making finance fun & simple | Forbes 30U30 | Entrepreneur',
    ig_is_verified: true,
    ig_is_business: true,
    niche: 'finance',
    has_product_page: true,
    source: 'community',
    source_detail: 'manual seed - Indian finance creator',
    outreach_priority: 'high',
    enrichment_status: 'pending',
    qualification_status: 'pending',
    stage: 'Sourced',
  },
  {
    ig_handle: 'ca_rachanaranade',
    ig_followers: 5200000,
    ig_bio: 'CA | Stock Market Educator | Making investing easy',
    ig_is_verified: true,
    ig_is_business: true,
    niche: 'finance',
    has_product_page: true,
    source: 'community',
    source_detail: 'manual seed - Indian stock market educator',
    outreach_priority: 'high',
    enrichment_status: 'pending',
    qualification_status: 'pending',
    stage: 'Sourced',
  },
  {
    ig_handle: 'ankurwarikoo',
    ig_followers: 3900000,
    ig_bio: 'Entrepreneur | Author | Content Creator | Building warikoo.com',
    ig_is_verified: true,
    ig_is_business: true,
    niche: 'business',
    has_product_page: true,
    source: 'community',
    source_detail: 'manual seed - Indian entrepreneur & educator',
    outreach_priority: 'high',
    enrichment_status: 'pending',
    qualification_status: 'pending',
    stage: 'Sourced',
  },
  {
    ig_handle: 'sharan_hegde',
    ig_followers: 1200000,
    ig_bio: '1Finance | Simplifying personal finance for India',
    ig_is_verified: true,
    ig_is_business: true,
    niche: 'finance',
    has_product_page: true,
    source: 'community',
    source_detail: 'manual seed - 1Finance personal finance',
    outreach_priority: 'high',
    enrichment_status: 'pending',
    qualification_status: 'pending',
    stage: 'Sourced',
  },
  {
    ig_handle: 'fitteam.global',
    ig_followers: 850000,
    ig_bio: "Fittr | World's largest online fitness community | 2M+ transformations",
    ig_is_verified: true,
    ig_is_business: true,
    niche: 'fitness',
    has_product_page: true,
    source: 'community',
    source_detail: 'manual seed - Indian fitness coaching platform',
    outreach_priority: 'high',
    enrichment_status: 'pending',
    qualification_status: 'pending',
    stage: 'Sourced',
  },
  {
    ig_handle: 'gauravtaneja',
    ig_followers: 5600000,
    ig_bio: 'Pilot | Fitness Coach | YouTuber | Flying Beast',
    ig_is_verified: true,
    ig_is_business: true,
    niche: 'fitness',
    has_product_page: true,
    source: 'community',
    source_detail: 'manual seed - Indian fitness & lifestyle creator',
    outreach_priority: 'medium',
    enrichment_status: 'pending',
    qualification_status: 'pending',
    stage: 'Sourced',
  },
  {
    ig_handle: 'pranjal_kamra',
    ig_followers: 1800000,
    ig_bio: 'CEO @ Finology | Making investing accessible for everyone',
    ig_is_verified: true,
    ig_is_business: true,
    niche: 'finance',
    has_product_page: true,
    source: 'community',
    source_detail: 'manual seed - Indian investing educator',
    outreach_priority: 'high',
    enrichment_status: 'pending',
    qualification_status: 'pending',
    stage: 'Sourced',
  },
  {
    ig_handle: 'beerbiceps',
    ig_followers: 6500000,
    ig_bio: 'Podcaster | Entrepreneur | Content Creator',
    ig_is_verified: true,
    ig_is_business: true,
    niche: 'business',
    has_product_page: true,
    source: 'community',
    source_detail: 'manual seed - Indian business & lifestyle creator',
    outreach_priority: 'medium',
    enrichment_status: 'pending',
    qualification_status: 'pending',
    stage: 'Sourced',
  },
];

async function getExistingHandles() {
  const formula = encodeURIComponent("NOT({ig_handle} = '')");
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE_NAME)}?filterByFormula=${formula}&fields%5B%5D=ig_handle`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
  });
  if (!res.ok) throw new Error(`Failed to fetch existing leads: ${res.status}`);
  const data = await res.json();
  return new Set((data.records || []).map(r => r.fields.ig_handle));
}

async function createRecords(records) {
  // Airtable allows max 10 records per request
  const batches = [];
  for (let i = 0; i < records.length; i += 10) {
    batches.push(records.slice(i, i + 10));
  }

  const results = [];
  for (const batch of batches) {
    const body = {
      records: batch.map(fields => ({ fields })),
    };

    const res = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Airtable POST failed: ${res.status} - ${text}`);
    }

    const data = await res.json();
    results.push(...data.records);
    console.log(`  Created batch of ${data.records.length} records`);
  }

  return results;
}

async function main() {
  console.log('DealDock Lead Seeder');
  console.log('====================\n');

  // Check for existing leads
  console.log('Checking for existing leads...');
  const existingHandles = await getExistingHandles();
  console.log(`Found ${existingHandles.size} existing lead(s)\n`);

  // Filter out duplicates
  const newLeads = SEED_LEADS.filter(lead => {
    if (existingHandles.has(lead.ig_handle)) {
      console.log(`⏭ SKIP: @${lead.ig_handle} (already exists)`);
      return false;
    }
    return true;
  });

  if (newLeads.length === 0) {
    console.log('\nAll seed leads already exist. Nothing to do.');
    return;
  }

  console.log(`\nInserting ${newLeads.length} new seed lead(s)...`);
  const created = await createRecords(newLeads);

  console.log('\n--- Summary ---');
  console.log(`Inserted: ${created.length} leads`);
  created.forEach(r => {
    console.log(`  ✅ @${r.fields.ig_handle} → ${r.id}`);
  });

  console.log('\nThese leads have enrichment_status=pending.');
  console.log('When Workflow 02 (Enrichment) activates, it will auto-enrich them.');
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
