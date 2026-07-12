---
name: enrich-leads
description: Deep-scrape Instagram profiles for pending leads via Apify MCP, classify their bio-link platform, and optionally look up email via Hunter's free tier for top prospects. Replaces n8n workflow 02.
---

# Enrich Leads

## Step 1 — Fetch leads pending enrichment

```
node scripts/at.js list Leads "OR({enrichment_status}='pending',{enrichment_status}='')" 10
```

## Step 2 — Deep-scrape each profile

Use `mcp__Apify__call-actor` with actor `apify/instagram-profile-scraper`, `usernames: [<handles>]`, `resultsType: "details"`, `scrapeHighlights: true`. Fetch with `mcp__Apify__get-dataset-items`.

Field mapping (from [apify-configs/instagram-profile-scraper.json](../../../apify-configs/instagram-profile-scraper.json)):
- `followersCount` → `ig_followers`
- `followingCount` → `ig_following`
- `postsCount` → `ig_posts_count`
- `isBusinessAccount` → `ig_is_business`
- `biography` → `ig_bio`
- `externalUrls[0]` → `ig_website`
- `highlightReelCount` → `story_highlights_count`
- first 3 `latestPosts[*].caption` joined → `recent_post_sample`
- average of last 9 `latestPosts[*].likesCount` → `ig_avg_likes`
- `verified` → `ig_is_verified`

## Step 3 — Classify the bio link

Check `ig_website` against these signal lists:
- **Product page** (`has_product_page=true`): contains `stan.store`, `stanstore`, `exly.app`, `graphy.com`, `kajabi.com`, `razorpay.com`, `instamojo.com`, `teachable.com`, `thinkific.com`, `payhip.com`, `gumroad.com`, `upi`, `pay.me`
- **Booking link** (`has_booking_link=true`): contains `calendly.com`, `topmate.io`, `cal.com`, `savvycal.com`, `meetings.hubspot`

If the URL is a linktree/bio-link aggregator, note that you can't fully classify without visiting it — leave both false unless the user provides more detail.

## Step 4 — Email lookup (Hunter free tier — budget it)

Hunter's free tier is 25 lookups/month total. **Only spend it on leads that look like strong ICP fits** (business account, product-page bio link, follower count in range) — not every lead needs an email in DM-first mode. Ask the user before spending lookups if it's not obvious, or skip this step entirely and rely on IG DM outreach (recommended default).

## Step 5 — Update Airtable

```
node scripts/at.js update Leads <recordId> '{"ig_followers":123000,"ig_following":800,"ig_posts_count":340,"ig_is_business":true,"ig_bio":"...","ig_website":"...","story_highlights_count":6,"recent_post_sample":"...","ig_avg_likes":1200,"ig_is_verified":false,"has_product_page":true,"has_booking_link":false,"enrichment_status":"complete","stage":"Enriched"}'
```

If the profile scrape fails or the account is private/deleted: set `enrichment_status":"failed"` and note why.

## Step 6 — Report

Print a short table: handle, followers, has_product_page, has_booking_link, enrichment result. Tell the user how many are now ready for `/qualify-leads`.
