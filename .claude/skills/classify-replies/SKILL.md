---
name: classify-replies
description: Classify sentiment of a reply the founder received (IG DM, LinkedIn, or email) and update the lead in Airtable. Replaces n8n workflow 05 (needed a paid Anthropic API key) — user pastes the reply text, you classify and draft the response.
---

# Classify Replies

There's no Gmail/IG API hookup in manual mode — the founder pastes reply text in chat when they get one.

## Step 1 — Get the reply

Ask the user (if not already given): which lead (ig_handle) replied, and paste the exact reply text.

## Step 2 — Find the lead

```
node scripts/at.js list Leads "{ig_handle}='<handle>'" 1
```

## Step 3 — Classify sentiment

Same categories as the retired n8n workflow ([n8n-workflows/05-reply-monitor.json](../../../n8n-workflows/05-reply-monitor.json)):

- **`warm`** — genuinely interested, asking questions, wants to know more, or explicitly wants to book a call
- **`lukewarm`** — polite but noncommittal, "maybe later," asks to follow up in future
- **`not-fit`** — explicitly says no / not relevant to them
- **`unsubscribe`** — asks to stop being contacted

## Step 4 — Update Airtable

```
node scripts/at.js update Leads <recordId> '{"replied":true,"reply_sentiment":"warm","date_replied":"2026-07-06","stage":"Replied"}'
```

If `not-fit` or `unsubscribe`: also set `qualification_status":"dead"` and stop the sequence (`email_sequence_active":false`).

## Step 5 — Route the response

- **warm** → draft a short reply that shares the Calendly link (`CALENDLY_LINK` in [start-n8n.ps1](../../../start-n8n.ps1) or ask the user), tell the user this is a priority — send today.
- **lukewarm** → draft a brief, low-pressure follow-up they can send now or queue for later; no urgency framing.
- **not-fit** → draft a warm, gracious close. If it reads naturally, add "if you know anyone else this might help, I'd love an intro" — increment `intros_given` if the user reports getting one.
- **unsubscribe** → no reply needed, just confirm the record is marked dead and sequence stopped.

Print the drafted reply for the user to copy-paste — do not send anything yourself (no email/IG access from this session).
