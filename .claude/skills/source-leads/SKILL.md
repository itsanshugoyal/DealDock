---
name: source-leads
description: Scrape Instagram hashtags via Apify MCP to find new candidate leads, dedupe against Airtable, and create new lead records. Replaces n8n workflow 01 — runs manually instead of on a cron.
---

# Source Leads

Apify is not an LLM — it's a scraping platform with its own free credits, so this step has no per-run AI cost. Uses the `mcp__Apify__*` tools directly.

## Step 1 — Pick hashtags

Rotate through the list in [apify-configs/instagram-hashtag-scraper.json](../../../apify-configs/instagram-hashtag-scraper.json): `cohortbasedlearning`, `coursecreatorindia`, `onlinecoachingindia`, `reelsstrategy`, `solopreneurindia`, `digitalcoachindia`. Pick 2 not run recently (ask the user, or default to the two the last `/daily` run didn't use).

## Step 2 — Run the scraper

Use `mcp__Apify__call-actor` with actor `apify/instagram-hashtag-scraper`, input matching the config file (`hashtags`, `resultsLimit: 50`, `scrapePostDetails: true`). Fetch results with `mcp__Apify__get-dataset-items`.

## Step 3 — Filter for ICP fit (rough pre-filter, not full qualification)

Keep only posts whose owner:
- Has `ownerFollowersCount` roughly 20K–500K (wider net than the 40K-250K ICP band — enrichment/qualification narrows further)
- `ownerIsBusinessAccount` is true
- Bio or caption hints at coaching/course/cohort language (not a personal/meme account)

## Step 4 — Dedupe against Airtable

```
node scripts/at.js list Leads "{ig_handle}='<candidate_handle>'" 1
```

Skip any handle that already has a record.

## Step 5 — Create new lead records

```
node scripts/at.js create Leads '{"ig_handle":"...","ig_followers":123000,"ig_bio":"...","ig_website":"...","recent_post_sample":"...","source":"ig_hashtag","source_detail":"hashtag: <name>","date_sourced":"2026-07-06","enrichment_status":"pending","qualification_status":"pending","stage":"Sourced"}'
```

Field mapping reference: `ownerUsername`→`ig_handle`, `ownerFollowersCount`→`ig_followers`, `ownerBiography`→`ig_bio`, `ownerExternalUrl`→`ig_website`, `caption`→`recent_post_sample`.

## Step 6 — Report

Print how many candidates were found, how many were duplicates, how many new leads were created, with handles and follower counts.
