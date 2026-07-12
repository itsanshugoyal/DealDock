# DealDock — n8n Workflow Setup Guide

7 workflows that run the full lead acquisition pipeline automatically.

---

## File Index

| File | Purpose | Trigger | Deps |
|------|---------|---------|------|
| `01-lead-sourcing.json` | Pulls leads from Apify Instagram scraper → Airtable | Daily 6 AM IST | Apify, Airtable |
| `02-enrichment.json` | Finds emails via Hunter.io + deep IG profile scrape | Every 30 min | Hunter.io, Apify, Airtable |
| `03-ai-qualification.json` | Scores leads 0–10 via Claude, flags hot leads to Slack | Every 15 min | Claude, Airtable, Slack |
| `04-email-sequences.json` | Sends 3-touch email sequence (India + Global variants) | Daily 12 PM IST | Gmail OAuth2, Airtable |
| `05-reply-monitor.json` | Watches Gmail for replies, classifies sentiment, routes | Every 2 hours | Gmail OAuth2, Claude, Airtable, Slack |
| `06-slack-outreach-drafts.json` | Generates IG DM + LinkedIn drafts for newly qualified leads | Every 30 min | Claude, Airtable, Slack |
| `07-calendly-booking.json` | Handles booking webhook → CRM update → pre/post call emails | Webhook (Calendly) | Gmail OAuth2, Airtable, Slack |

---

## Step 1 — Sign Up for n8n

**Option A — n8n Cloud (recommended for getting started):**
1. Go to [n8n.io](https://n8n.io) → Start free trial
2. Cloud instance has built-in credential storage

**Option B — Self-hosted (free, more control):**
```bash
npx n8n
# or with Docker:
docker run -it --rm -p 5678:5678 n8nio/n8n
```
Then open `http://localhost:5678`

---

## Step 2 — Set Environment Variables

In n8n go to **Settings → Environment Variables** and add:

| Variable | Value | Where to get it |
|----------|-------|-----------------|
| `AIRTABLE_BASE_ID` | `appXXXXXXXXXXXXXX` | Airtable base URL |
| `AIRTABLE_LEADS_TABLE` | `Leads` | Exact table name |
| `AIRTABLE_CALLS_TABLE` | `Calls` | Exact table name |
| `ANTHROPIC_API_KEY` | `sk-ant-...` | console.anthropic.com |
| `HUNTER_API_KEY` | `xxxxxxxx...` | hunter.io → API |
| `APIFY_API_TOKEN` | `apify_api_...` | apify.com → Settings → API |
| `SLACK_WEBHOOK_LEADS` | `https://hooks.slack.com/...` | Slack App → Incoming Webhooks |
| `SLACK_WEBHOOK_OUTREACH` | `https://hooks.slack.com/...` | Second Slack webhook (or same) |
| `CALENDLY_LINK` | `https://calendly.com/yourname/20min` | Your Calendly URL |
| `SENDER_NAME` | `Anshu` | Your first name |

### Airtable API Key (header auth credential)

1. n8n → Credentials → New → **Header Auth**
2. Name: `Airtable API`
3. Header Name: `Authorization`
4. Header Value: `Bearer YOUR_AIRTABLE_API_KEY`
5. Get key: airtable.com → Account → Developer Hub → Personal Access Tokens

### Gmail OAuth2 Credential

1. n8n → Credentials → New → **Gmail OAuth2**
2. Follow the OAuth2 flow (requires Google Cloud project with Gmail API enabled)
3. Quick path: n8n.io/integrations/gmail has a step-by-step guide
4. Scope needed: `https://www.googleapis.com/auth/gmail.modify`

---

## Step 3 — Import Workflows (in order)

For each file:
1. n8n → **Workflows → Import from File**
2. Select the JSON file
3. After import, open the workflow and check all nodes show no errors
4. Assign credentials where prompted

**Import order matters:**
```
01 → 02 → 03 → 04 → 05 → 06 → 07
```

---

## Step 4 — Configure Apify Webhook (for Workflow 01)

Workflow 01 receives data pushed by Apify after each scrape run.

1. Set up Apify actor runs (see `../apify-configs/README.md`)
2. In Apify: Actor → Integrations → Webhooks
3. Event: `RUN_SUCCEEDED`
4. URL: Copy the webhook URL from the **Webhook** node in Workflow 01
5. Payload template: leave default

---

## Step 5 — Configure Calendly Webhook (for Workflow 07)

1. Activate Workflow 07 first (so the webhook URL is live)
2. Copy the webhook URL from the **Calendly Webhook** node
3. In Calendly: Integrations → Webhooks → Add Webhook
4. URL: paste the n8n webhook URL
5. Event: `invitee.created`

**Calendly intake questions to add to your event type:**
1. What's your Instagram handle?
2. Roughly how many DMs do you get per day?
3. What do you primarily sell? (course / coaching / both)
4. How did you hear about DealDock?

---

## Step 6 — Activate Workflows

Activate in this exact order:

```
1. Activate 07 (Calendly) first — generates the live webhook URL
2. Activate 05 (Reply Monitor) — starts watching Gmail
3. Activate 06 (Outreach Drafts) — starts watching Airtable
4. Activate 03 (AI Qualification) — starts scoring new leads
5. Activate 02 (Enrichment) — starts enriching sourced leads
6. Activate 04 (Email Sequences) — starts email sends at 12 PM
7. Activate 01 (Lead Sourcing) — pipeline is now fully live
```

Toggle each workflow to **Active** (green) in the workflow list.

---

## Credentials Checklist

- [ ] Airtable Header Auth credential created
- [ ] Gmail OAuth2 credential connected
- [ ] All env vars added in n8n Settings
- [ ] Apify webhook pointed at Workflow 01 webhook URL
- [ ] Calendly webhook pointed at Workflow 07 webhook URL
- [ ] Two Slack channels created: `#dealdock-leads` and `#dealdock-outreach`
- [ ] Both Slack incoming webhooks created and added as env vars

---

## Slack Channel Setup

Create two Slack channels and one incoming webhook per channel:

1. `#dealdock-leads` → receives:
   - Hot lead alerts (score >= 9) from Workflow 03
   - Warm reply alerts from Workflow 05
   - Call booking notifications from Workflow 07
   - Post-call reminder from Workflow 07

2. `#dealdock-outreach` → receives:
   - Outreach draft cards (IG DM + LinkedIn drafts) from Workflow 06

To create webhooks: api.slack.com → Your Apps → Create → Add Incoming Webhooks

---

## Cost Estimates (at pilot volume, ~15 leads/day)

| Service | Cost |
|---------|------|
| n8n Cloud | $0 (free tier: 2,500 runs/mo) |
| Claude API | ~$0.30/day (~$9/mo) |
| Hunter.io | $0 (free: 25 searches/mo) |
| Apify | ~$5/mo (pay-as-you-go, ~$0.15/day) |
| Gmail | $0 |
| Slack | $0 |
| **Total** | **~$14/mo** |

---

## Workflow Data Flow

```
[Apify Scrape] --> 01 Lead Sourcing --> Airtable (enrichment_status=pending)
                                              |
                                              v
[Hunter.io / Apify] <-- 02 Enrichment <-------+  (every 30 min)
                              |
                              v  enrichment_status=complete
                         Airtable
                              |
                              v
                    03 AI Qualification (every 15 min)
                              |
                    qualification_status=qualified
                              |
                    +---------+---------+
                    |                   |
                    v                   v
           04 Email Sequences   06 Slack Outreach Drafts
           (auto, 12pm daily)   (manual IG DM + LinkedIn)
                    |
                    v
             Reply arrives
                    |
           05 Reply Monitor (every 2h)
                    |
            +-------+-------+
         warm            not-fit / unsub
            |                   |
    Slack alert -->         Mark dead -->
    send Calendly         stop sequence
            |
     Creator books
            |
    07 Calendly Booking
    (pre-call email + post-call reminder)
```

---

## Troubleshooting

**Workflow 01 not receiving Apify data**
→ Check Apify webhook URL is correct (Workflow 01 must be active when you copy the URL)
→ Trigger a manual Apify run and watch the execution log

**Workflow 03 not finding leads**
→ Verify Workflow 02 is active and enrichment_status is being set to `complete`
→ Check Airtable filterByFormula in the Fetch Enriched Leads node

**Gmail OAuth2 keeps expiring**
→ In Google Cloud Console, set the OAuth app to "Production" (not "Testing")
→ Testing mode tokens expire every 7 days

**Workflow 06 generating duplicate Slack messages**
→ Check that the `outreach_drafted` field is correctly set to `true` in Airtable after first run
→ Verify the Airtable PATCH request in the Save Drafts node is firing successfully

**Workflow 07 not receiving Calendly webhooks**
→ Calendly webhooks require HTTPS — if self-hosting n8n, use ngrok or Cloudflare Tunnel
→ n8n Cloud provides HTTPS automatically

---

## Manual Actions Required

These are intentionally NOT automated (too high-risk to auto-send):

| Action | Timing | Source |
|--------|--------|--------|
| Send IG DM | 12-2 PM daily | Workflow 06 Slack card |
| Send LinkedIn connection request | Any time | Workflow 06 Slack card |
| Send LinkedIn follow-up message | 24h after accept | Workflow 06 Slack card |
| Reply to warm email replies | Within 2h | Workflow 05 Slack alert |
| Log call notes in Airtable | Within 30 min after call | Workflow 07 Slack reminder |
