# Apify Actor Configs — DealDock Lead Sourcing

This directory contains input configuration files for all Apify actors used in the DealDock automated lead acquisition pipeline. Each JSON file is a ready-to-use actor input that can be pasted directly into the Apify console or fed programmatically via the Apify API from n8n.

---

## Actor Configs in This Directory

| File | Actor ID | Purpose | Run Frequency |
|---|---|---|---|
| `instagram-hashtag-scraper.json` | `apify/instagram-hashtag-scraper` | Scrape posts from creator-signal hashtags | Daily (rotate 2 hashtags/run) |
| `instagram-profile-scraper.json` | `apify/instagram-profile-scraper` | Deep-fetch profile data for enrichment | Daily at 7am IST (Stage 2) |
| `instagram-follower-scraper.json` | `apify/instagram-followers-scraper` | Mine followers of known Indian creators | 3x/week (Mon/Wed/Fri) |
| `twitter-search-scraper.json` | `apify/twitter-scraper` | Search tweets for monetization signals | Daily (rotate 2 queries/run) |
| `youtube-podcast-scraper.json` | `apify/youtube-scraper` | Extract podcast guest names from Indian creator channels | Weekly (Sunday) |

---

## How to Use in the Apify Console

### One-time setup
1. Sign up at [apify.com](https://apify.com) and fund your account with $20 (enough for 2–3 weeks of scraping at DealDock volume)
2. Go to **Store** tab and search for each actor by its ID (e.g. `apify/instagram-hashtag-scraper`)
3. Click **Try for free** on each actor to add it to your account

### Running an actor manually (for testing)
1. Open your Apify console → **Actors** → select the actor
2. Click **Input** tab
3. Paste the entire contents of the corresponding JSON file from this directory into the input box
4. Remove all keys starting with `_` (underscore) — those are documentation comments, not valid actor input
5. Click **Start** to run

### Saving actor tasks (for automated runs)
1. Run the actor manually once (step above)
2. Click **Save as Task** → give it a meaningful name like `DealDock — IG Hashtag Daily`
3. From that task page, set up a **Schedule** (cron expression) for automated runs
4. Add a **Webhook** on the task that POSTs to your n8n flow URL on `ACTOR.RUN.SUCCEEDED`

### Actor-specific notes

#### instagram-hashtag-scraper.json
- The `hashtags` array contains 6 hashtags. Only run 2 per day to stay within Apify credits and avoid rate limits.
- In n8n, parameterize the actor input by passing a dynamic `hashtags` array with 2 items per run (rotate through the list over 3 days).
- Remove `proxy.apifyProxyGroups` if you want to use the default proxy pool — RESIDENTIAL proxies are more expensive but less likely to be blocked.

#### instagram-profile-scraper.json
- The `usernames` field contains a sample handle. In production, n8n dynamically builds this array by querying Airtable for leads with `enrichment_status = pending`, then passes it to Apify via API.
- Do not run this actor from the Apify console directly in production — it is always triggered programmatically by n8n with a fresh batch of handles.

#### instagram-follower-scraper.json
- Run one account per actor task. Create 7 separate saved tasks, one per target account.
- The `username` field is set to `akshatsrivastava_` as a default — change it to the target account for each task.
- After the actor returns, n8n filters the results: only keep followers with `followersCount` between 20,000 and 300,000.

#### twitter-search-scraper.json
- The `searchTerms` array contains 5 queries. Run 2 per day.
- n8n should store the current query index in a variable and increment it each day (or use a simple day-of-week modulo).
- Twitter/X scraping is more fragile than Instagram — if you see frequent failures, reduce `maxTweets` to 25.

#### youtube-podcast-scraper.json
- This actor only produces raw episode titles and metadata. The real value extraction happens in n8n post-processing (guest name extraction via Claude API, then Google search for IG handle).
- The channel IDs marked `UC_note_resolve_at_runtime` need to be resolved manually before first run. Use [commentpicker.com/youtube-channel-id.php](https://commentpicker.com/youtube-channel-id.php).
- Run this actor weekly at most — podcast channels publish 1–4 episodes/week, so daily runs waste credits.

---

## Connecting Apify to n8n via Webhooks

### Step 1: Get your n8n webhook URL
1. In n8n, open your **Lead Sourcing** workflow
2. Add an **HTTP Webhook** node at the start of the flow
3. Set Method to `POST`, Path to something like `/apify-leads`
4. Copy the production webhook URL (shown when you activate the workflow)

### Step 2: Add the webhook to your Apify task
1. Open your Apify actor task (e.g. `DealDock — IG Hashtag Daily`)
2. Go to **Settings** tab → **Integrations** → **Webhooks**
3. Click **Add webhook**
4. Set **Event types:** `ACTOR.RUN.SUCCEEDED`
5. Paste your n8n webhook URL
6. Set **Payload template** to default (sends the full `resource` object including `defaultDatasetId`)

### Step 3: n8n reads the dataset
When Apify fires the webhook, the payload includes `resource.defaultDatasetId`. Use this ID in a subsequent n8n HTTP node to fetch the actual results:

```
GET https://api.apify.com/v2/datasets/{defaultDatasetId}/items
Headers: Authorization: Bearer {APIFY_API_TOKEN}
Query params: format=json&clean=true
```

The response is a JSON array of scraped items. Map these fields to your Airtable schema using the `_n8nFieldMapping` objects in each config file.

### Step 4: Deduplication before writing to Airtable
Before creating a new Airtable record, n8n should check if `ig_handle` already exists:

```
GET https://api.airtable.com/v0/{BASE_ID}/Leads
Headers: Authorization: Bearer {AIRTABLE_TOKEN}
Query params: filterByFormula=LOWER({ig_handle})="lowercase_handle_here"
```

- If the response returns 0 records → create new record
- If the response returns 1+ records → skip or update `enrichment_status` field only

---

## Apify API — Triggering Actors from n8n Directly

Instead of relying on Apify's own scheduler, you can trigger actor runs directly from n8n using the Apify API. This gives n8n full control over when and with what input each actor runs.

### Trigger an actor run from n8n HTTP node:

```
POST https://api.apify.com/v2/actor-tasks/{TASK_ID}/runs
Headers:
  Authorization: Bearer {APIFY_API_TOKEN}
  Content-Type: application/json
Body: {
  "input": { ...actor input from this config file... }
}
```

Replace `{TASK_ID}` with the Apify task ID (visible in the task URL: `console.apify.com/tasks/{TASK_ID}`).

### Poll for completion (or use webhook):
After triggering a run, either:
- **Use the webhook** approach (Step 2 above) — Apify calls n8n when done. Recommended.
- **Poll for status:** `GET https://api.apify.com/v2/actor-runs/{runId}` — check `status` field for `SUCCEEDED`.

---

## Environment Variables for n8n

Store these in n8n's **Credentials** or **Environment Variables** section:

| Variable | Value |
|---|---|
| `APIFY_API_TOKEN` | Your Apify API token (Settings → Integrations → API) |
| `AIRTABLE_TOKEN` | Your Airtable personal access token |
| `AIRTABLE_BASE_ID` | Your DealDock CRM base ID (`appXXXXXXXXXXXXXX`) |
| `AIRTABLE_LEADS_TABLE_ID` | Leads table ID (`tblXXXXXXXXXXXXXX`) |
| `AIRTABLE_COUNTERS_TABLE_ID` | Daily Counters table ID |
| `AIRTABLE_CALLS_TABLE_ID` | Calls table ID |
| `ANTHROPIC_API_KEY` | Your Anthropic API key for Claude qualification + DM drafting |
| `HUNTER_API_KEY` | Your Hunter.io API key |
| `CALENDLY_WEBHOOK_SECRET` | Calendly webhook signing secret (for verifying payloads) |

---

## Estimated Monthly Apify Credit Usage

| Actor | Runs/month | Estimated credits/run | Monthly total |
|---|---|---|---|
| instagram-hashtag-scraper | ~60 (daily, 2 hashtags) | ~0.5 CU | ~30 CU |
| instagram-profile-scraper | ~30 (daily, batch of ~30 handles) | ~1.5 CU | ~45 CU |
| instagram-follower-scraper | ~12 (3x/week, 7 accounts) | ~2 CU | ~24 CU |
| twitter-search-scraper | ~60 (daily, 2 queries) | ~0.3 CU | ~18 CU |
| youtube-podcast-scraper | ~4 (weekly) | ~0.5 CU | ~2 CU |
| **Total** | | | **~119 CU/month** |

At Apify's Personal plan ($49/mo), you get 1,000 CU/month — well within budget. The free tier gives 5 CU/month (enough for testing). Fund with $20 on pay-per-use while testing, then upgrade to Personal once the system is stable.

---

## Troubleshooting Common Issues

**Actor returns 0 results:**
- Instagram: The hashtag may be temporarily restricted. Try the next one in the rotation.
- Twitter: Query may be hitting rate limits. Reduce `maxTweets` or wait 30 minutes.
- Check Apify's run logs for specific error messages.

**High failure rate on instagram-profile-scraper:**
- Instagram aggressively blocks scraping. Switch proxy group from `RESIDENTIAL` to default and test.
- Reduce batch size — pass no more than 50 handles per actor run.

**n8n webhook not receiving data from Apify:**
- Verify the webhook URL is the production URL (not the test URL in n8n).
- Check that your n8n workflow is **Active** (toggle in top right).
- In Apify task → Integrations → Webhooks, click **Test** to send a manual payload.

**Duplicate leads appearing in Airtable:**
- The deduplication check (step 4 above) must run before every Airtable record creation. If you're seeing duplicates, the formula in your n8n filter node is likely case-sensitive — use `LOWER()` in the Airtable filter formula.
