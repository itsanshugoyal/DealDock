# DealDock Manual-Mode Pipeline

**Status: running with $0 API budget.** The n8n workflows in [n8n-workflows/](n8n-workflows/) are the original design (documented in [automation.md](automation.md)) but 3 of the 7 need a paid Anthropic/Gemini key we don't currently have (03-ai-qualification, 05-reply-monitor, 06-slack-outreach-drafts). Instead of paying for those API calls, **Claude Code chat sessions do the thinking** — the subscription is already paid for, so this is free.

n8n itself stays dormant. Reactivate it (see [start-n8n.ps1](start-n8n.ps1) + [import-n8n-workflows.js](import-n8n-workflows.js)) once there's budget for an LLM API key — nothing here needs to be undone, it's a parallel manual path over the same Airtable data.

## The pipeline, run by hand

| Stage | Slash command | What it replaces |
|---|---|---|
| 1. Source | `/source-leads` | n8n 01 — Apify hashtag scrape → new Airtable leads |
| 2. Enrich | `/enrich-leads` | n8n 02 — Apify profile scrape + bio-link classification |
| 3. Qualify | `/qualify-leads` | n8n 03 — **Claude API → now done in-chat** |
| 4. Draft outreach | `/draft-outreach` | n8n 06 — **Claude API → now done in-chat** |
| 5. Classify replies | `/classify-replies` | n8n 05 — **Claude API → now done in-chat** (paste reply text in) |
| — | `/daily` | orchestrates 1→4 in one go, run each morning |

n8n 04 (email sequences) and 07 (Calendly booking) stay unused for now — outreach is IG-DM-first and manual; Calendly bookings are checked manually in the Calendly dashboard.

## Airtable is the single source of truth

Base ID and PAT live in `.env.local` (not committed). Tables: `Leads` (49 fields, see [airtable-schema.md](airtable-schema.md)), `Calls`, `Daily Counters`. Every skill reads/writes through [scripts/at.js](scripts/at.js):

```
node scripts/at.js list <table> "<filterByFormula>" [maxRecords]
node scripts/at.js get <table> <recordId>
node scripts/at.js update <table> <recordId> '<jsonFields>'
node scripts/at.js create <table> '<jsonFields>'
node scripts/at.js stats
```

The dashboard at `/dashboard` (localhost:3456) reads the same Airtable data via [src/app/api/airtable/route.ts](src/app/api/airtable/route.ts) — it's a read-only mirror, not part of the write path.

## Key field semantics (see airtable-schema.md for the full 49)

- `enrichment_status`: `pending` → `complete` (or `failed`)
- `qualification_status`: `pending` → `qualified` (score ≥7) / `hold` (5–6) / `dead` (<5)
- `outreach_drafted`: checkbox set true once DM/LinkedIn drafts are saved
- `stage`: `Sourced` → `Enriched` → `Qualified` → `Outreach Sent` → `Replied` → `Call Booked` → `Call Done` → `Pilot Active`/`Paying`/`Dead`

## Free-tier budget guardrails

- **Apify**: ~$5/mo free credits. `/source-leads` and `/enrich-leads` use it — don't run more than once/day unless catching up.
- **Hunter.io**: 25 free email lookups/month, total. Spend only on leads that already look like strong ICP fits (see `/enrich-leads` step 4). Default: skip it, go IG-DM-first.
- **Manual send limits** (avoid platform flags): ~10–15 IG DMs/day, ~25 LinkedIn connection requests/day.
- **Claude Code**: the qualification/drafting/reply-classification "API calls" are just this conversation — no per-lead cost, but it does spend context/time, so batch runs (10–25 leads at a time) beat one-off single-lead calls.

## Manual steps `/classify-replies` can't automate

There's no Gmail/IG API wired up — the founder pastes reply text into chat when one arrives, and manually sends whatever the skill drafts (DMs, LinkedIn notes, reply emails). Nothing in this mode sends messages on your behalf.

## Sourcing findings (2026-07-06 live test)

Ran `/source-leads`-equivalent scrapes live: hashtags `cohortbasedlearning` + `onlinecoachingindia` (51 posts, 24 unique owners), a follower-mine of `sharanhegde` (3 followers returned — likely a rate limit or handle mismatch), and profile-enriched the most promising 11 candidates. **Every single one was far below the 20K–500K ICP follower range** (most under 10K, several under 100) — the hashtags mostly surface brand-new accounts and institutional test-prep coaching centers (JEE/NEET academies — anti-signal: team/institution), not established solo creators.

**Takeaway for future `/source-leads` runs:** blind hashtag scraping has a low hit rate for this specific follower band. Prioritize the higher-signal manual channels from [dealdock-30-day-leadgen-plan.md](dealdock-30-day-leadgen-plan.md) §2 instead — tagged-tab mining off known creators (§2a), LinkedIn search strings (§2b), and podcast guest list mining (§2e) — then use Apify only to enrich/verify candidates a human has already spotted, rather than as the primary discovery mechanism. If retrying automated hashtag sourcing, try niche-specific tags to narrow to established accounts (e.g. a tag a 100K+ creator would actually use) rather than generic education tags that skew toward brand-new institutional accounts.

## 30-day plan

See [dealdock-30-day-leadgen-plan.md](dealdock-30-day-leadgen-plan.md) → "Manual Mode (₹0/month)" section for daily cadence and weekly targets.
