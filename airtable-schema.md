# DealDock CRM — Airtable Base Setup Guide

**Base name:** DealDock CRM  
**Last updated:** 2026-05-20  
**Purpose:** Full pipeline from raw scraped lead through pilot conversion. Automated by n8n; reviewed daily by founder in ~10 minutes.

---

## How to Create This Base

1. Log in to [airtable.com](https://airtable.com)
2. Click **+ Add a base** → **Start from scratch**
3. Name it **DealDock CRM**
4. Rename the default table to **Leads**
5. Create two additional tables: **Daily Counters** and **Calls**
6. Follow the field definitions below exactly — field types matter for n8n automation

---

## Table 1: Leads

**Primary field:** `ig_handle` (Single line text)

This is the master table. Every lead that enters the system gets one row here. n8n reads and writes this table throughout all 6 stages.

### Field Definitions

| # | Field Name | Field Type | Options / Formula / Notes |
|---|---|---|---|
| 1 | **ig_handle** | Single line text | Primary field. Instagram username without @. e.g. `akshatsrivastava_` |
| 2 | **ig_followers** | Number | Integer. Sourced from Apify, updated by enrichment. |
| 3 | **ig_bio** | Long text | Raw bio text from Instagram. |
| 4 | **ig_website** | URL | First external URL in bio. |
| 5 | **ig_following** | Number | Following count from enrichment. |
| 6 | **ig_posts_count** | Number | Total post count. |
| 7 | **ig_is_business** | Checkbox | True if Instagram marks as business/creator account. |
| 8 | **ig_is_verified** | Checkbox | True if blue verified. |
| 9 | **ig_avg_likes** | Number | Average likes on last 9 posts (calculated by n8n from enrichment). |
| 10 | **story_highlights_count** | Number | Number of story highlight covers. |
| 11 | **recent_post_sample** | Long text | First 3 post captions joined. Used by Claude for qualification. |
| 12 | **linkedin_url** | URL | Full LinkedIn profile URL if found. |
| 13 | **twitter_handle** | Single line text | Twitter/X username without @. |
| 14 | **email** | Email | Professional email found via Hunter.io or Apollo. |
| 15 | **email_found** | Checkbox | True = email was found. False = Hunter + Apollo both returned nothing. |
| 16 | **source** | Single select | Options: `ig_hashtag` / `ig_follower_mining` / `linkedin` / `twitter` / `podcast_guest` / `community` / `warm_intro` / `vibe_prospecting` / `inbound` |
| 17 | **source_detail** | Single line text | e.g. `hashtag: cohortbasedlearning` or `follower of: rajshamani` |
| 18 | **date_sourced** | Date | Date this lead entered the system. n8n sets this on record creation. Include time field: off. |
| 19 | **niche** | Single select | Options: `business` / `fitness` / `finance` / `language` / `career` / `design` / `marketing` / `mindset` / `wellness` / `other` |
| 20 | **estimated_revenue_band** | Single select | Options: `<₹4L` / `₹4-10L` / `₹10-25L` / `₹25L+` / `<$5K` / `$5-20K` / `$20-50K` / `$50K+` / `unknown` |
| 21 | **has_product_page** | Checkbox | True if bio link leads to a paid product page (Stan Store, Exly, Graphy, Kajabi, Razorpay, etc). Set by n8n bio link classifier. |
| 22 | **has_booking_link** | Checkbox | True if bio link contains Calendly, Topmate, Cal.com. Set by n8n bio link classifier. |
| 23 | **score** | Number | AI qualification score 0–10. Set by Claude API. |
| 24 | **yes_signals_hit** | Long text | JSON array of YES signals present. e.g. `["bio CTA: DM COHORT", "story highlights: Testimonials, Results"]` |
| 25 | **anti_signals_hit** | Long text | JSON array of disqualifying signals. e.g. `["no own product — brand deal only"]` |
| 26 | **personalization_hook** | Long text | Claude-generated specific observation for outreach. e.g. "Your Batch 6 closing post got 340 comments — that DM flood is exactly what we solve." |
| 27 | **outreach_priority** | Single select | Options: `high` / `medium` / `low`. Set by Claude based on score: 8–10 = high, 7 = medium, 5–6 = low. |
| 28 | **enrichment_status** | Single select | Options: `pending` / `complete` / `failed`. n8n sets to `pending` on create, `complete` after enrichment, `failed` if Apify or Hunter errors. |
| 29 | **qualification_status** | Single select | Options: `pending` / `qualified` / `hold` / `dead`. `hold` = score 5–6, revisit in 30 days. |
| 30 | **email_sequence_active** | Checkbox | True = this lead is in the n8n Gmail email sequence. n8n checks this before sending. |
| 31 | **sequence_step** | Number | Default 0. Tracks which email has been sent last: 0=none, 1=Email1 sent, 2=Email2 sent, 3=Email3 sent. |
| 32 | **date_first_msg_sent** | Date | Date of first outreach (email, LinkedIn, or IG DM — whichever came first). |
| 33 | **replied** | Checkbox | True = lead has replied on any channel. |
| 34 | **reply_sentiment** | Single select | Options: `warm` / `lukewarm` / `not-fit` / `unsubscribe`. Set by Claude sentiment classifier after reply detected. |
| 35 | **date_replied** | Date | Date of first reply. |
| 36 | **li_replied** | Checkbox | Manual LinkedIn reply tracking. Founder checks this after seeing a LinkedIn reply. Triggers n8n routing logic. |
| 37 | **ig_dm_draft** | Long text | AI-generated Instagram DM. Claude writes this during outreach prep; sent to Slack for manual copy-paste. |
| 38 | **li_connection_note** | Long text | AI-generated LinkedIn connection request note (25 words). Sent to Slack for founder to copy-paste. |
| 39 | **li_followup_note** | Long text | AI-generated LinkedIn follow-up message (sent 24h after connection accepted). Sent to Slack. |
| 40 | **call_booked** | Checkbox | True = Calendly booking confirmed. Set by n8n Calendly webhook. |
| 41 | **call_date** | Date | Scheduled call date/time. Include time field: on. Timezone: Asia/Kolkata. |
| 42 | **stage** | Single select | Options: `Sourced` / `Enriched` / `Qualified` / `Outreach Sent` / `Replied` / `Call Booked` / `Call Done` / `Pilot Active` / `Paying` / `Dead`. n8n advances this automatically except `Call Done` (founder manually updates after call). |
| 43 | **last_auto_touchpoint** | Date | Date of the most recent automated email or sequence step. n8n updates this every time it sends. |
| 44 | **next_action** | Single line text | n8n writes a human-readable next action. e.g. `Send Email 2 on 2026-05-23` or `LinkedIn bump due 2026-05-25` |
| 45 | **outcome** | Single select | Options: `pilot` / `paying` / `passed` / `ghosted` / `not-fit` |
| 46 | **dq_reason** | Single select | Options: `too-small` / `too-big` / `no-own-product` / `has-team` / `not-active` / `data-privacy-concern` / `other`. Set when qualification_status=dead. |
| 47 | **intros_given** | Number | Count of intro requests made (when lead replies "not a fit" — system asks "do you know anyone?"). |
| 48 | **notes** | Long text | Founder's manual notes. Only field edited by human during pipeline. |
| 49 | **airtable_record_url** | Formula | `CONCATENATE("https://airtable.com/", RECORD_ID())` — creates a direct link to this record, used in Slack notifications so founder can click straight to the record. |

---

### Notes on Key Fields

**`score` + `qualification_status` logic (set by n8n after Claude API):**
- score 8–10 → `qualification_status = qualified`, `outreach_priority = high`
- score 7 → `qualification_status = qualified`, `outreach_priority = medium`
- score 5–6 → `qualification_status = hold`
- score 0–4 → `qualification_status = dead`

**`stage` progression (n8n handles automatically):**
```
Sourced → (after enrichment) → Enriched → (after Claude scores ≥7) → Qualified
→ (after any outreach sent) → Outreach Sent → (after reply detected) → Replied
→ (if warm reply) → Call Booked → (founder marks after call) → Call Done
→ (if pilot accepted) → Pilot Active → (first invoice paid) → Paying
→ (if dead at any point) → Dead
```

**`yes_signals_hit` and `anti_signals_hit` field format:**  
Store as a JSON array string (Long text). n8n parses the Claude API response JSON and stores `JSON.stringify(array)` here. Example:
```json
["Bio link = Stan Store product page", "DM COHORT CTA in bio", "Story highlights: Wins, Students, Results"]
```

---

## Table 2: Daily Counters

**Purpose:** Auto-populated by n8n at 11:59pm IST each day. Used for the founder's daily dashboard view.

| # | Field Name | Field Type | Notes |
|---|---|---|---|
| 1 | **date** | Date | Primary field. Date this row represents. |
| 2 | **leads_sourced** | Number | Total new leads added to Airtable today. |
| 3 | **leads_enriched** | Number | Leads that completed enrichment today (enrichment_status changed to `complete`). |
| 4 | **leads_qualified** | Number | Leads that scored ≥7 and were moved to Outreach Queue today. |
| 5 | **outreach_sent** | Number | Total outreach touches sent today (email + LinkedIn + IG DMs manually confirmed). |
| 6 | **replies_received** | Number | Total replies detected today (all channels). |
| 7 | **warm_replies** | Number | Replies classified as `warm` by Claude. |
| 8 | **calls_booked** | Number | Calendly bookings received today. |
| 9 | **calls_done** | Number | Calls that took place today (founder updates this manually or via a simple Airtable form). |
| 10 | **pilots_closed** | Number | New pilot agreements confirmed today. |

**n8n daily summary flow:**  
At 11:59pm IST, n8n queries Airtable Leads and Calls tables, counts records modified today matching each category, then creates or updates the Daily Counters row for today.

---

## Table 3: Calls

**Purpose:** Tracks every Calendly booking. Created automatically by n8n when Calendly webhook fires.

| # | Field Name | Field Type | Notes |
|---|---|---|---|
| 1 | **lead_id** | Link to another record | Links to `Leads` table. n8n matches by email address from Calendly event. |
| 2 | **calendly_event_id** | Single line text | Calendly's unique event UUID. Used by n8n to avoid duplicate records. |
| 3 | **scheduled_at** | Date | Call date and time. Include time field: on. Timezone: Asia/Kolkata. |
| 4 | **status** | Single select | Options: `upcoming` / `done` / `no-show`. n8n sets to `upcoming` on creation. Founder or n8n timer updates to `done` or `no-show`. |
| 5 | **call_notes** | Long text | Founder adds 3–5 bullet notes here within 10 min of call ending. n8n waits for this before sending post-call email. |
| 6 | **outcome** | Single select | Options: `pilot-yes` / `pilot-no` / `not-fit` / `follow-up`. Founder sets this after call. Drives n8n post-call automation. |
| 7 | **pilot_start_date** | Date | If outcome=`pilot-yes`, founder sets expected pilot start date. n8n triggers onboarding sequence. |
| 8 | **post_call_email_sent** | Checkbox | True = n8n has fired the post-call follow-up email. Prevents duplicates. |

---

## Pre-Built Views (Leads Table)

Create these views in the Leads table. Access via the **Views** panel on the left sidebar in Airtable.

### View 1: "🎯 Outreach Queue Today"

**Type:** Grid view  
**Purpose:** The founder's daily 10-minute outreach task list.

**Filters (all must match):**
- `qualification_status` is `qualified`
- `stage` is `Qualified`
- `outreach_priority` is `high`

**Sort:** `score` — descending (highest scores first)

**Hidden fields (show only these columns):**
`ig_handle`, `ig_followers`, `niche`, `score`, `personalization_hook`, `ig_dm_draft`, `li_connection_note`, `email`, `email_found`, `outreach_priority`

---

### View 2: "🔥 Hot Leads"

**Type:** Grid view  
**Purpose:** Warm replies that need immediate human follow-up — Calendly link to send.

**Filters:**
- `reply_sentiment` is `warm`
- `call_booked` is unchecked (false)

**Sort:** `date_replied` — descending (most recent first)

**Shown columns:** `ig_handle`, `stage`, `reply_sentiment`, `date_replied`, `email`, `linkedin_url`, `notes`

---

### View 3: "⏰ Follow-up Due"

**Type:** Grid view  
**Purpose:** Leads that have been contacted but haven't replied, and it's been 3+ days since the last automated touchpoint. n8n should handle most follow-ups automatically, but this view catches edge cases.

**Filters:**
- `replied` is unchecked (false)
- `date_first_msg_sent` is not empty
- `qualification_status` is `qualified`
- `stage` is not `Dead`

**Sort:** `last_auto_touchpoint` — ascending (most overdue first)

**Note:** In Airtable's free tier, you can't filter by relative date like "older than 3 days." Use this view as a manual spot-check. n8n handles the actual follow-up timing via its own date logic.

---

### View 4: "📞 Calls This Week"

**Type:** Calendar view  
**Purpose:** Visual weekly view of all booked calls.

**Filters:**
- `call_booked` is checked (true)
- `stage` is `Call Booked` or `Call Done`

**Calendar field:** `call_date`

**Shown fields:** `ig_handle`, `call_date`, `status` (from Calls table via linked record), `stage`

---

### View 5: "✅ Pilot Active"

**Type:** Grid view  
**Purpose:** Active design partners and paying customers. The most important view.

**Filters:**
- `stage` is `Pilot Active` OR `stage` is `Paying`

**Sort:** `stage` — then `call_date` ascending

**Shown columns:** `ig_handle`, `ig_followers`, `niche`, `stage`, `pilot_start_date` (via linked Calls record), `outcome`, `notes`, `email`

---

### View 6: "💀 Dead Pool"

**Type:** Grid view  
**Purpose:** Archived leads. Review monthly for re-activation or ICP pattern analysis.

**Filters:**
- `qualification_status` is `dead` OR `outcome` is `not-fit` OR `stage` is `Dead`

**Sort:** `date_sourced` — descending

**Shown columns:** `ig_handle`, `source`, `score`, `dq_reason`, `outreach_priority`, `date_sourced`, `notes`

---

## Additional Recommended Views

### "📊 Daily Dashboard"
Navigate to **Daily Counters** table → default Grid view. Pin this tab. Review each morning.

### "🔄 Enrichment Queue"
**Leads table filter:** `enrichment_status` is `pending`  
Used by n8n as the input queue for the daily enrichment run. Also useful for debugging when enrichment fails.

### "🤖 Qualification Pending"  
**Leads table filter:** `enrichment_status` is `complete` AND `qualification_status` is `pending`  
Input queue for Claude qualification agent.

---

## Airtable API Setup (for n8n)

1. Go to [airtable.com/create/tokens](https://airtable.com/create/tokens)
2. Click **Create new token**
3. Name: `n8n DealDock Integration`
4. Scopes needed:
   - `data.records:read`
   - `data.records:write`
   - `schema.bases:read`
5. Access: Select your **DealDock CRM** base only
6. Copy the token — you'll need it in n8n as an Airtable credential

**Getting your Base ID:**
- Open DealDock CRM base
- Click the **?** help icon → **API documentation**
- Your base ID appears at the top: `appXXXXXXXXXXXXXX`
- Store this in your n8n environment as `AIRTABLE_BASE_ID`

**Getting Table IDs (more reliable than table names for n8n):**
- In Airtable API docs page for your base, each table's ID is shown: `tblXXXXXXXXXXXXXX`
- Leads table ID: save as `AIRTABLE_LEADS_TABLE_ID`
- Daily Counters table ID: save as `AIRTABLE_COUNTERS_TABLE_ID`
- Calls table ID: save as `AIRTABLE_CALLS_TABLE_ID`

---

## Field Population Summary by Stage

| Stage | Fields Populated By |
|---|---|
| Lead Sourced (Stage 1) | n8n from Apify: `ig_handle`, `ig_followers`, `ig_bio`, `ig_website`, `source`, `source_detail`, `date_sourced`, `recent_post_sample`, `stage=Sourced`, `enrichment_status=pending` |
| Enrichment (Stage 2) | n8n from Apify + Hunter: `email`, `email_found`, `ig_following`, `ig_posts_count`, `ig_is_business`, `ig_avg_likes`, `story_highlights_count`, `has_product_page`, `has_booking_link`, `enrichment_status=complete`, `stage=Enriched` |
| Qualification (Stage 3) | n8n from Claude API: `score`, `yes_signals_hit`, `anti_signals_hit`, `niche`, `estimated_revenue_band`, `personalization_hook`, `outreach_priority`, `qualification_status`, `stage=Qualified or Dead` |
| Outreach Prep (Stage 4) | n8n from Claude API: `ig_dm_draft`, `li_connection_note`, `li_followup_note` |
| Outreach Sent | n8n: `email_sequence_active=true`, `sequence_step=1`, `date_first_msg_sent`, `last_auto_touchpoint`, `stage=Outreach Sent` |
| Reply Detected (Stage 5) | n8n: `replied=true`, `reply_sentiment`, `date_replied`, `stage=Replied` |
| Call Booked (Stage 7) | n8n from Calendly: `call_booked=true`, `call_date`, `stage=Call Booked` |
| Post-Call | Founder: `call_notes` in Calls table, `outcome` in Calls table; n8n: `stage=Call Done or Pilot Active`, `post_call_email_sent=true` |
