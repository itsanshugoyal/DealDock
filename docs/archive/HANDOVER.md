# DealDock — Agent Handover

## What this is
**DealDock** is a B2B SaaS for Instagram creators who sell courses/coaching and convert buyers in their DMs. The problem it solves: at 80–400 DMs/day, real buyers get buried under "love your content" noise and go cold. We are currently doing **founder-led outbound** to find 10 design partners.

**ICP:** IG creator/coach who sells their **own** course, cohort, or 1:1 coaching and converts via DM.
- 20K–500K followers (sweet spot 40K–250K) · India preferred, global acceptable · solo or ≤1 VA

**Yes-signals (+2 each):** bio link to a paid checkout (Stan Store, Exly, Graphy, Kajabi, TagMango, Razorpay, own domain) · `DM "KEYWORD"` CTA in bio · testimonial/results highlights · sales Reel with 200+ comments · cohort scarcity language ("Batch 6 closing", "last 3 seats").

**Anti-signals (−3 each):** no own product (pure brand-deal/UGC) · >700K followers with a visible team · under 20K with no monetization. Also reject **institutions** — anything named Academy/Institute/School has staff and fails the solo test.

**Scoring:** ≥7 → `qualified` · 5–6 → `hold` · <5 → `dead`.

## Critical constraint: ₹0 API budget
There is **no Anthropic or Gemini API key** (the Gemini key we tested is quota-dead). The n8n workflows in `n8n-workflows/` are built and imported but **dormant** — 3 of the 7 need a paid LLM key.

**You are the LLM.** Qualification, outreach drafting, and reply classification happen in your chat context, for free. Don't try to call a paid API; don't reactivate n8n.

## How to operate
Airtable is the single source of truth. Credentials are in `.env.local` (already present, not committed — never paste them into chat or a prompt).

```bash
node scripts/at.js stats                                    # pipeline counts
node scripts/at.js list Leads "<filterByFormula>" [max]     # query
node scripts/at.js update Leads <recordId> '<jsonFields>'   # write
node scripts/at.js create Leads '<jsonFields>'              # insert
```

Slash-command skills in `.claude/skills/`: `/source-leads`, `/enrich-leads`, `/qualify-leads`, `/draft-outreach`, `/classify-replies`, and `/daily` (runs the whole loop). Each carries the full rubric — read the SKILL.md before running.

For bulk writes (>5 records), write a one-off Node script in the scratchpad rather than many CLI calls — avoids shell-escaping pain with quote-heavy draft text.

## Tooling that works (learned the hard way)
- **Verify an IG handle:** `WebFetch` on `https://www.instagram.com/<handle>/` → returns follower count + bio. Accurate to ~1% vs Apify. This is the primary method.
- **Apify MCP:** unreliable — disconnects mid-session, finite free credits. Use only if connected; WebFetch is the fallback.
- **Firecrawl:** explicitly **does not support instagram.com**. Fine for directories/case-studies/podcast pages. Its CLI binary has vanished from PATH before — check `which firecrawl` first.
- **Discovery pattern that works:** `site:instagram.com <niche> India "DM" <offer language>` — IG bios are Google-indexed, so this searches the exact ICP signal. Snippets often return follower count + bio, letting you pre-filter for free.

**Hunt these niches** (skew solo): fitness/transformation, life & mindset coaching, manifestation/tarot/astrology, career & leadership, yoga, nutrition, communication/confidence, Instagram/content coaching.

**Avoid these** (skew institutional in India): digital marketing, stock trading, IELTS/study-abroad, makeup, dance/music, baking. Also avoid generic "top influencer" listicles — they rank by size and surface 1M+ celebrities.

## Current state (2026-09-06)
76 leads in Airtable: **44 qualified · 14 hold · 13 dead · 5 pending**.
- **34 qualified leads have no outreach drafts yet** ← the obvious next job.
- 10 qualified already have drafts saved (`outreach_drafted = true`).
- 13 dead are correctly triaged legacy test data (celebrity-tier seeds + a bad hashtag scrape) — ignore them.
- The 5 `pending` are an **exploratory brand-deal segment** (creators who monetize via sponsorships, no own product): `mrsumitreview`, `mommylilworld`, `fs_praveen_mekala`, `captain_amaira`, `geekyranjitofficial`. Anshu decided to source them but **not lock a pitch yet** — do not draft outreach for these until he decides the angle.

## Next actions
1. Run `/draft-outreach` on the 34 qualified leads without drafts → IG DM + LinkedIn note + LinkedIn follow-up each, saved to Airtable, then print a copy-paste send list.
2. Respect manual send limits: **~10–15 IG DMs/day, ~25 LinkedIn connects/day** — cap the daily list, queue the rest.
3. When Anshu pastes a reply he's received, run `/classify-replies`.

Nothing in this mode sends messages automatically — Anshu sends everything by hand. Never claim a message was sent.

## Reference
`PIPELINE.md` (ops detail + sourcing findings) · `airtable-schema.md` (all 49 fields) · `dealdock-30-day-leadgen-plan.md` (targets, outreach copy, kill criteria) · `automation.md` (the n8n design, for whenever there's budget).
