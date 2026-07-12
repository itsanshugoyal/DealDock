---
name: draft-outreach
description: Write personalized IG DM and LinkedIn outreach drafts for newly qualified DealDock leads and save them to Airtable. Replaces n8n workflow 06 (needed a paid Anthropic API key) — drafting happens in-chat instead.
---

# Draft Outreach

For every qualified lead that doesn't have drafts yet, write the three outreach messages yourself and save them, then print a copy-paste send list for the founder.

## Step 1 — Fetch qualified leads needing drafts

```
node scripts/at.js list Leads "AND({qualification_status}='qualified',{outreach_drafted}!=1)" 20
```

If empty, tell the user everyone qualified already has drafts, and stop.

## Step 2 — Write three messages per lead

Use the lead's `personalization_hook`, `niche`, and `ig_bio` to make these feel specific, not templated. Tone: peer-to-peer, casual, confident — not salesy, not corporate.

1. **`ig_dm_draft`** — an Instagram DM, 2–4 short lines. Open with the personalization hook, name a specific pain point (DM volume, missed replies, manual qualification), soft CTA (not a hard pitch). No emojis unless the creator's own bio uses them.
2. **`li_connection_note`** — LinkedIn connection request note, **max 25 words**. Reference the hook, one line, no CTA (connection requests can't sell).
3. **`li_followup_note`** — LinkedIn message sent 24h after they accept, **max 55 words**. Reintroduce briefly, state the specific value prop (auto-qualify/reply to DMs so no lead goes cold), soft CTA to a short call.

## Step 3 — Save drafts to Airtable

```
node scripts/at.js update Leads <recordId> '{"ig_dm_draft":"...","li_connection_note":"...","li_followup_note":"...","outreach_drafted":true}'
```

## Step 4 — Print the send list

Group by `outreach_priority` (high first). For each lead show: handle, IG profile link (`https://instagram.com/<handle>`), the DM text ready to paste, and the LinkedIn note if `linkedin_url` is set. Remind the user of safe manual-send limits: **~10–15 IG DMs/day** and **~25 LinkedIn connects/day** to avoid platform flags — don't blast the whole list at once.
