---
name: daily
description: Run the full DealDock manual-mode pipeline for the day — source, enrich, qualify, draft outreach — and print the scoreboard plus today's send list. The one command to run each morning.
---

# Daily Pipeline Run

Runs the whole loop in order, since each stage feeds the next. This is the zero-budget replacement for n8n's scheduled triggers — you (Claude, in-chat) are the automation, not an API call.

## Order of operations

1. **Source** — invoke the [source-leads](../source-leads/SKILL.md) skill logic to scrape 2 hashtags and add new candidates.
2. **Enrich** — invoke the [enrich-leads](../enrich-leads/SKILL.md) skill logic on everything `enrichment_status=pending` (new leads from step 1, plus any left over from before).
3. **Qualify** — invoke the [qualify-leads](../qualify-leads/SKILL.md) skill logic on everything now `enrichment_status=complete AND qualification_status=pending`.
4. **Draft outreach** — invoke the [draft-outreach](../draft-outreach/SKILL.md) skill logic on everything newly `qualified` without drafts.

Run these as sequential steps in this same conversation — fetch, think, write back, move to the next stage. Don't skip a stage silently; if a stage has nothing to do, say so in one line and move on.

## Step 5 — Print the daily scoreboard

```
node scripts/at.js stats
```

Then summarize in plain language: how many leads sourced today, how many enriched, how many newly qualified, how many hot (score ≥9), how many drafts are ready to send.

## Step 6 — Print today's send list

Pull qualified leads with drafts (`outreach_drafted=true`) that haven't been sent yet — the founder tracks "sent" manually by checking them off, so just list everyone currently in the `Qualified` stage with a draft. Cap the printed list at **10–15 IG DMs + 25 LinkedIn connects** (safe daily manual-send limits) and note if more are queued for tomorrow.

## Notes

- This is meant to run once per morning, ~30–45 min including the founder's own read of the output before manually sending messages.
- If Apify calls fail (rate limit, actor error), report it and continue with whatever stages don't depend on it (qualify/draft can run on already-enriched data).
- Full architecture reference: [PIPELINE.md](../../../PIPELINE.md).
