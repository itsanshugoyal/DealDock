---
name: qualify-leads
description: Score enriched DealDock leads against the ICP rubric and write results to Airtable. Replaces n8n workflow 03 (which needs a paid Anthropic API key we don't have) — you do the scoring yourself, in-chat, for free.
---

# Qualify Leads

Fetch leads ready for scoring, apply the ICP rubric yourself (you are the qualification engine — no API call needed), and write results back to Airtable.

## Step 1 — Fetch leads pending qualification

```
node scripts/at.js list Leads "AND({enrichment_status}='complete',{qualification_status}='pending')" 25
```

If empty, tell the user there's nothing to qualify (they may need to run `/enrich-leads` first) and stop.

## Step 2 — Score each lead against the ICP rubric

This is the exact rubric from the retired n8n workflow ([n8n-workflows/03-ai-qualification.json](../../../n8n-workflows/03-ai-qualification.json)) — apply it yourself for each record:

**ICP TARGET:** Indian solo creator, 40K–250K Instagram followers, sells their own course/cohort/1:1 coaching via DMs, estimated ₹6L–₹20L/month revenue, heavy DM volume (80–400/day), no large team (max 1 VA).

**5 YES-signals (+2 points each):**
1. Bio link is a paid product landing page (Stan Store, Exly, Graphy, Kajabi, Razorpay, custom checkout)
2. Bio CTA reads "DM [KEYWORD]" or "DM for cohort" — routes buyers through inbox
3. Story highlights include Wins/Results/Testimonials/Students
4. Pinned post is a sales Reel with 200+ comments
5. Recent posts mention cohort scarcity ("Batch 6 closing", "last 3 seats")

**3 ANTI-signals (−3 points each):**
1. No own product — pure brand-deal/UGC creator
2. >700K followers with a visible team (assistant, manager, multiple staff mentioned)
3. Free-content only, under 20K followers, no monetization signal

Start every lead at a base score using signal count (roughly: 5/10 base, +2 per yes-signal hit, −3 per anti-signal hit, clamp 0–10). Use judgment — the goal is matching what Claude-via-API would have produced, not a rigid formula.

For each lead, produce:
- `score` (0–10 integer)
- `yes_signals_hit` (JSON array of strings, e.g. `["Bio link = Stan Store product page","DM COHORT CTA in bio"]`)
- `anti_signals_hit` (JSON array of strings)
- `estimated_revenue_band` (one of: `<₹4L`, `₹4-10L`, `₹10-25L`, `₹25L+`, `<$5K`, `$5-20K`, `$20-50K`, `$50K+`, `unknown`)
- `niche` (one of: `business`, `fitness`, `finance`, `language`, `career`, `design`, `marketing`, `mindset`, `wellness`, `other`)
- `personalization_hook` — one specific, real observation from their profile to use in outreach (a specific post, cohort number, or bio detail — not generic)
- `outreach_priority` (`high` if score 8–10, `medium` if score 7, `low` if score 5–6)
- `qualification_status`: score ≥7 → `qualified`, score 5–6 → `hold`, score <5 → `dead`
- `dq_reason` (only if dead — one of: `too-small`, `too-big`, `no-own-product`, `has-team`, `not-active`, `data-privacy-concern`, `other`)
- `stage`: `Qualified` if qualified, else leave as-is (don't downgrade stage for `hold`/`dead`)

If a lead is missing key data (no bio, no follower count) to score confidently, say so and either skip it (leave `qualification_status=pending`) or score conservatively and note the uncertainty — your call based on what data is present.

## Step 3 — Write results to Airtable

For each scored lead:

```
node scripts/at.js update Leads <recordId> '{"score":8,"yes_signals_hit":"[\"...\"]","anti_signals_hit":"[]","estimated_revenue_band":"₹10-25L","niche":"business","personalization_hook":"...","outreach_priority":"high","qualification_status":"qualified","stage":"Qualified"}'
```

Note: `yes_signals_hit` / `anti_signals_hit` are Long Text fields storing a JSON string — escape the inner quotes as shown.

## Step 4 — Report a scoreboard

Print a table: handle, score, status, priority, one-line reason. Flag any score ≥9 as "🔥 hot lead — prioritize outreach." Tell the user how many are now `qualified` and ready for `/draft-outreach`.
