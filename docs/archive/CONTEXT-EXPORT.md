# DealDock — Context Export

> Handoff brief for an AI agent. No secrets included (they live in `.env.local`, gitignored).

## 1. What it is

**DealDock** — B2B SaaS targeting Instagram creators/coaches in India who sell courses/cohorts/1:1 coaching via DMs.

**ICP:** Indian solo creator, 40K–250K IG followers, sells own product (not brand deals), ₹6L–₹20L/mo revenue, 80–400 DMs/day, ≤1 VA (no team).

Currently the repo is **two things**: a marketing site for DealDock, and an automated lead-gen pipeline used to find DealDock's own customers.

## 2. Stack

- **Next.js 16** (App Router), React 19, Tailwind v4, TypeScript, Geist font, Phosphor icons, `motion`
- Design system: "Ethereal Glass" — OLED dark bg `#050505`, gold accent `#ffc107`, double-bezel cards, glass-pill nav
- **Airtable** = database (base has `Leads` (49 fields), `Calls`, `Daily Counters`)
- **n8n** (localhost:5678) = workflow automation engine, 7 workflows imported
- **Apify** = Instagram scraping; **Hunter.io** = email lookup (25/mo free); **Gmail** = sending; **Slack** = alerts; **Calendly** = bookings
- Dev server: `localhost:3456`

## 3. Repo layout

```
src/app/page.tsx              landing page (hero, pricing, apply modal)
src/app/dashboard/            internal control room (stats, workflow toggles, lead table)
src/app/dashboard/setup/      integration health checks
src/app/api/airtable/         Airtable proxy (stats | leads | recent)
src/app/api/n8n/workflows/    list + activate/deactivate workflows
src/app/api/setup/status/     health check endpoint
src/lib/constants.ts          env var reads + WORKFLOW_IDS map
n8n-workflows/*.json          the 7 workflow definitions
scripts/at.js                 Airtable CLI (list|get|update|create|stats)
.claude/skills/               manual-mode slash commands (see §6)
PIPELINE.md                   manual-mode operating doc
airtable-schema.md            all 49 Leads fields
```

## 4. The 7-workflow pipeline

| # | Workflow | Trigger | Function |
|---|----------|---------|----------|
| 01 | Lead Sourcing | Daily 6am IST | Apify IG hashtag scrape → dedupe → create Airtable leads |
| 02 | Enrichment | Every 15 min | Hunter.io email + Apify profile scrape + classify bio-link platform |
| 03 | AI Qualification | Every 15 min | **LLM** scores lead 0–10 vs ICP rubric → qualified/hold/dead |
| 04 | Email Sequences | Daily 12pm IST | 3-email drip via Gmail (intro → day 3 bump → day 7 final) |
| 05 | Reply Monitor | Every 2 hrs | **LLM** classifies reply sentiment → routes warm leads to Slack + Calendly |
| 06 | Outreach Drafts | Every 30 min | **LLM** drafts IG DM + LinkedIn note → posts to Slack for manual send |
| 07 | Calendly Booking | Webhook | Booking → Calls table + prep email + Slack + post-call reminder |

**Flow:** scrape → enrich → AI-score → email drip / Slack-drafted DMs → reply detection → call booked.

### Qualification rubric (workflow 03, the core IP)
**+2 each:** bio link = paid product page (Stan Store/Exly/Graphy/Kajabi/Razorpay) · bio CTA says "DM [KEYWORD]" · 5+ testimonial story highlights · pinned sales Reel with 200+ comments · posts mention cohort scarcity ("Batch 6 closing")
**−3 each:** no own product (pure UGC/brand deals) · >700K followers + visible team · free-content only, <20K followers

Score ≥7 = qualified, 5–6 = hold, <5 = dead. Score ≥9 fires a Slack hot-lead alert.

### Key field states
- `enrichment_status`: pending → complete/failed
- `qualification_status`: pending → qualified/hold/dead
- `stage`: Sourced → Enriched → Qualified → Outreach Sent → Replied → Call Booked → Call Done → Pilot Active/Paying/Dead

## 5. Current status & blockers

- **n8n is dormant.** Workflows imported (IDs in `src/lib/constants.ts`) but not running.
- **No LLM API key.** Workflows 03, 05, 06 need one. A Gemini key was tested → key is *valid* but free-tier quota is exhausted (HTTP 429, `limit: 0`). Needs billing enabled, or swap back to Anthropic.
- **~19 leads in Airtable**, mostly manually curated.
- Manual setup still pending: Gmail OAuth2 credential in n8n, 2 Slack webhooks, filling remaining keys in `start-n8n.ps1`.

## 6. Manual mode (current operating reality)

Because there's no LLM API budget, the 3 AI workflows are replaced by **Claude Code slash commands** — the thinking happens in a chat session instead of via API. Skills in `.claude/skills/`:

`/source-leads` `/enrich-leads` `/qualify-leads` `/draft-outreach` `/classify-replies` `/daily`

### Hard-won operational findings
- **Apify is not required for enrichment.** `WebFetch` on `instagram.com/<handle>/` returns follower/following/bio accurately (~1% variance vs Apify), at zero cost. Firecrawl does *not* support instagram.com.
- **Sourcing channel hit rates:** manually curated lists ≈ **53%** qualification rate · creator-platform directories (Topmate, Superprofile, Exly, Graphy, TagMango, Kajabi case studies) = highest-signal automated source · podcast guest lists = pre-qualified · **blind hashtag scraping ≈ 0%** across 3 live runs (surfaces test-prep institutions and sub-1K accounts) — deprioritized.
- Budget guardrails: Apify ~$5/mo free · Hunter 25 lookups/mo total · manual sends ≤10–15 IG DMs/day, ≤25 LinkedIn requests/day.

## 7. Strategic assessment (done 2026-09-06)

**Current idea rated 6/10 as a business.** Four structural caps:
1. Sells *inputs* (leads), not outcomes → churns the month bookings dip
2. Core data is scraped from a hostile platform (Meta actively fights this) → supply chain you don't control
3. Nothing compounds — customer #100 gets what customer #1 got. No moat, no network effect
4. Cold-email outbound is the most crowded quadrant (Instantly, Smartlead, Apollo, Clay)

Also: current architecture is single-tenant (one Airtable base, OS-level env vars) — selling it requires a 2–3 month rebuild, not a feature add.

### Recommended pivot: "DM Revenue OS" (9/10 potential)

**Insight:** the ICP already drowns in 80–400 inbound DMs/day. They don't need more leads — they need to *convert the audience they have*.

**Product:** creator connects their IG business account via the **official Meta Messaging API** (legitimate, no scraping). AI becomes their sales rep in the DM inbox — answers pricing questions in their voice 24/7, qualifies buyers, books calls, **takes payment in-DM** (Razorpay/Stripe), follows up with ghosters.

Why it breaks all four caps: sells closed revenue (un-churnable) · official API (Meta *wants* this) · every conversation compounds into a per-niche objection-handling dataset · DM-commerce for course sellers is genuinely sparse (ManyChat does dumb keyword automations, not AI selling).

**Monetization:** SaaS fee (₹4,999/mo) **+ 2–5% of GMV closed in-DM**. Creator doing ₹10L/mo pays ₹25–50K/mo happily because you demonstrably caused it. Shopify economics, not tool economics.

**Existing code survives:** qualification prompt, sequence logic, reply classifier, Calendly flow, dashboard all repoint from "scraped strangers" → "inbound conversations". The scraper becomes an optional growth add-on — the correct place for ToS-risky features.

### Phasing
1. **Now (0 rebuild):** productized service — "30 qualified leads + booked calls/mo, ₹15K" or pay-per-booked-call (₹500–1,500). Run existing pipeline manually for 5–10 clients. Revenue in 30 days + customer discovery.
2. **Months 2–5:** build DM Revenue OS MVP. Phase-1 clients are the beta cohort.
3. **Months 6–12:** turn on take rate. Add WhatsApp (Indian coaches close on WhatsApp, not email). Pooled data starts compounding.

### Value-add upgrades, ranked by monetization impact
1. Deliverability layer (warm-up, sending caps, domain rotation) — without it, churn kills you
2. Multi-source scraping (LinkedIn, YouTube) — removes IG single-point-of-failure
3. Plain-English ICP wizard → AI generates the scoring rubric (**this is the single biggest code change to make the current product general-purpose** — today the rubric is hardcoded for DealDock)
4. CRM + reply inbox in-dashboard so users never touch Airtable/n8n
5. WhatsApp integration

**Alternatives considered:** pay-per-meeting marketplace (8/10, good pricing wrapper for Phase 1) · AI SDR for Indian SMBs broadly (7.5/10, better as later expansion) · "Apollo for creator economy" data play (7/10, maximizes legal exposure).

**One-line reframe:** *stop selling creators more leads; start owning the moment their followers become money.*
