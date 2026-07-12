# DealDock — 30-Day Lead Gen Plan

**Goal:** 10 design partners in 30 days. 4+ paying (₹4k–₹15k/mo) by day 60.
**Founder time:** ~2 hrs/day. **Paid budget:** ₹0.
**Math you need to hit:** ~150 personalized touches → ~25 replies → ~12–15 calls → 10 design partners.

> **Tooling update (2026-07-06):** the tracking system below (§6, a Google Sheet) is superseded by the Airtable + Claude Code pipeline built since this plan was written — see [PIPELINE.md](PIPELINE.md). Sourcing, scoring, and outreach drafting that used to require paid Claude/Gemini API calls inside n8n now happen for free in Claude Code chat via slash commands (`/source-leads`, `/enrich-leads`, `/qualify-leads`, `/draft-outreach`, `/classify-replies`, or `/daily` to run the whole loop). The ICP, outreach copy, weekly targets, and kill criteria below are unchanged — only the tracking/scoring mechanism moved from a spreadsheet to Airtable. See "Quick Reference" at the end for the updated daily routine.

---

## 1. ICP — Sharper Profile

**The ideal design partner:** An Indian solo creator running a course, cohort, or 1:1 coaching business doing ₹6L–₹20L/month, with 40K–250K Instagram followers. Their content is talking-head Reels + carousels around a clear "method" (their framework, their system, their playbook). Sales flow is **DM → call → UPI/Razorpay link**, no funnel software, no sales team. They handle DMs themselves or with one VA who only does first-line filtering. DM volume sits between 80–400/day on a normal day, and spikes to 800+ when a Reel pops. They've started feeling the pain — they've said something on a podcast or post like "I can't keep up with DMs" — but haven't bought a fix yet because every existing tool is built for D2C brands or US creators.

**5 tells in 10 seconds (yes-signals):**
1. Link in bio = a paid course/cohort landing page (Stan Store, Exly, Graphy, Kajabi, Zoho Bookings, or a custom page) — **not** a Linktree of free PDFs.
2. Bio CTA reads "DM '[KEYWORD]'" or "DM for cohort 5" — they're routing buyers through the inbox, exactly the volume problem.
3. Story highlights include "Wins / Results / Testimonials / Students / Reviews" with 5+ highlight covers — they have a track record they care about.
4. Pinned post is a sales Reel ("How I made my first ₹10L coaching online") with 200+ comments — strong inbound, almost certainly chaotic DMs.
5. Recent posts mention cohort numbers ("Batch 6 closing Aug 12", "Last 3 seats") — running a real revenue calendar, will feel ROI of recovered leads immediately.

**3 anti-signals (skip):**
1. **No own product.** Pure brand-deal/UGC creator. Their problem is sponsorship pipeline, not DM intent.
2. **>700K followers + visible team.** Already has DM ops staff, a chatbot, or has built internal tools. Long sales cycle, low urgency.
3. **Free-content-only with no monetization signal.** "Building in public," "personal brand" types under 20K followers without a paid offer. Wrong stage — they don't yet have the pain.

---

## 2. Sourcing — Where to Find Them

| Channel | Quality | Volume/week | Time/day |
|---|---|---|---|
| Instagram (manual mining) | 9/10 | 40–60 | 30 min |
| LinkedIn (search + posts) | 7/10 | 30–50 | 25 min |
| Twitter/X | 6/10 | 15–25 | 15 min |
| Communities | 7/10 | 10–20 | 20 min |
| Podcast guest mining | 9/10 | 8–12 | 15 min |
| YouTube cross-mining | 6/10 | 10–15 | 10 min |
| Warm intros | 10/10 | 5–10 | 15 min |

### 2a. Instagram (highest signal)
- **"Students of X" mining.** Pick 5 known Indian creators in adjacent niches (e.g., Akshat Shrivastava, Ankur Warikoo, Raj Shamani, Anushka Rathod, Sharan Hegde). Open their *tagged* tab — students post completion shots. Those students who are *themselves creators* are gold.
- **Hashtag scan, but the right ones.** Skip generic #coach. Use: `#cohortbasedlearning` `#coursecreatorindia` `#onlinecoachingindia` `#reelsstrategy` `#solopreneurindia` `#digitalcoachindia`. Sort by Recent, not Top.
- **Comment-section harvesting.** Under viral creator economy posts (Vaibhav Sisinty, Gaurav Bhagat, Varun Mayya), the commenters who have ₹/course-creator language in their *own* bios are pre-qualified.
- **Follower-of-follower.** Open a known-good fit's followers list. Indian course creators tend to follow each other.

### 2b. LinkedIn — exact search strings to paste
Use LinkedIn search → People → "All filters" → Locations: India. Then drop these into the keyword box (one at a time):
- `"course creator" India`
- `"online coach" "Instagram"`
- `"cohort-based course"`
- `"sold out my batch"`
- `"DM me" course`
- `"6 figure" coach India`
- `"₹" "cohort"` (yes, the rupee symbol — surfaces founders who post revenue updates)
- `"build in public" creator India`

Also: search **Posts** (not People) for the same strings. Posts surface people *currently active* on the topic, which is a much better signal than someone who once put "coach" in their headline.

### 2c. Twitter/X — Indian creator Twitter
Search queries:
- `india creator MRR -filter:replies min_faves:10`
- `cohort india "₹" course`
- `"build in public" india coach`
- `"i make" "lakh" instagram`
- `india "course" "students" -from:elonmusk` (yes, exclude noise from US-dominated terms)

Reply-guy strategy: people who *reply* to tweets by Nishchay Nagar, Akshat Shrivastava, Mohit Bhargava, and the GrowthSchool/Visualize Value India crowd are warmer than cold prospects — they're already in the conversation.

### 2d. Communities — where the right people actually hang out
- **GrowthSchool community** (Slack/Circle). Apply, lurk for a week, comment usefully, then DM individuals — never pitch in-channel.
- **Stan Store / Exly creator groups.** These tool's customers *are* your ICP. Find their public communities (LinkedIn group, WhatsApp); ask their CS team for an intro to power users.
- **The Visualize Value India / Build in Public India** WhatsApp circles. Find them by asking 3 creators "what group chat are you in." There are 6–8 active ones in this space.
- **Antler India alumni Slack** (if you can get in via a portfolio founder).
- **NSV Mastermind, 1Up, Indie Hackers India.** Tangential, but talent managers often hang out here.
- **How to find new ones:** ask every prospect on every call: "What WhatsApp group or Slack do you spend the most time in for creator stuff?" Track answers, ask for invites.

### 2e. Podcasts — guest list mining
The guest lists of these shows are pre-qualified ICP databases:
- **Figuring Out (Raj Shamani)** — last 50 episodes have ~10 fits
- **The Neon Show (Siddharth Ahluwalia)** — solo creator/founder leans
- **Maed in India** — some creator-economy guests
- **The Founder Thesis** — when they cover creator businesses
- **The Ranveer Show** — only the entrepreneur episodes
- **WTF is by Nikhil Kamath** — when they do creator/coaching episodes
- **Build with Aprameya** — strong Indian creator/founder mix

Open each show's Spotify/YouTube page → scrape last 6 months of episode titles → list every Indian guest who runs a course or coaching practice → outreach. ~60–90 minutes of work, gets you 30–40 hot leads.

### 2f. YouTube
Search: `"how I make" "lakhs" instagram coach`, `"online course business" india`, `"cohort"` india. Channels under 100K subs but with parallel IG-led businesses are the sweet spot. The YouTube videos tell you their revenue claims; the IG profile tells you whether they fit.

### 2g. Warm intros — mine your existing graph
- LinkedIn 1st-degree connections, filter `Founder` + `India`. Send each a "do you know any course creators on IG with heavy DM volume?" message — not a pitch, just a sourcing ask. Aim 20 such asks in week 1.
- WhatsApp: scan your last 6 months of chats for anyone who mentioned a course or coaching business. Ask for one intro each.
- Hyderabad/Bangalore/Mumbai-specific: post in your local startup WhatsApp group (Hyderabad has T-Hub, 91springboard alumni; Bangalore has multiple). One ask per group, no pitching.

---

## 3. Outreach — Exact Messages

### a) Cold IG DM (~60 words)
> [NAME] — caught your [SPECIFIC REEL/POST, e.g. "Cohort 5 sold out post last Tuesday"]. Quick observation, not a pitch: at your DM volume, roughly 1 in 5 buying-intent messages goes cold before you ever see it (course inquiries, brand reach-outs, the "tell me more" types). Built a small thing for 6 creators to fix exactly that. Free for 90 days, I just want hard feedback. 20 min Zoom this week?

**Send rules:**
- Only after liking 2 of their recent posts (warms the DM into the primary tab).
- Never send between 9am–11am IST or 8pm–10pm IST — that's when their DMs are most chaotic and yours dies in the noise. Send 12–2pm IST.
- Max 15/day. If you send more, IG quietly limits delivery.

### b) LinkedIn — connect + follow-up

**Connection note (~25 words):**
> Hi [NAME] — your post on [SPECIFIC TOPIC, e.g. "DM volume after the Forbes feature"] hit. Working on something for creators with heavy DM inbound, would value your perspective.

**Follow-up after they accept (send 24 hrs later, ~55 words):**
> Thanks [NAME]. Quick context: creators doing ₹5–30L/mo from IG tend to lose meaningful revenue to DM volume — actual buyers buried under "love your content" messages. I'm running a free 90-day pilot with 10 creators this month. Your [SPECIFIC POST/CONTEXT] suggests you've seen this firsthand. Worth 20 min this week to swap notes?

### c) Warm intro request — what to send the mutual

**Your note to the mutual (~50 words):**
> Hey [MUTUAL], one ask — I'm building DealDock for IG creators drowning in DMs. [TARGET NAME] looks like a perfect fit (saw their cohort post). Mind forwarding the note below? Genuinely fine to skip if [NAME]'s plate is full or it feels off.

**The forward note they paste (~60 words):**
> Hey [NAME] — [MUTUAL] suggested I reach out. I'm building a tool that surfaces high-intent DMs (course inquiries, brand deals) for IG creators before they fall through the cracks. Running free 90-day pilots with 10 creators this month. No catch, no upfront ask. 20 min Zoom this week to see if it's a fit for you?

---

## 4. The Qualifying Call — 20 Minutes

The job of this call is to **disqualify**, not convert. If they're not a fit, end early and ask for an intro.

### Min 0–5: Discovery — understand their DM workflow
Ask in this order, exactly:
1. *"Walk me through what happens when someone DMs you about your course right now — start to finish."*
2. *"Roughly how many DMs hit your inbox on a normal day vs. after a Reel pops off?"*
3. *"Who actually replies — you, a VA, both? What does the handoff look like?"*
4. *"What's the typical path from first DM to UPI payment? How many touches?"*
5. *"When was the last time you found a 3-day-old DM and went 'oh shit'?" (← this is the gold question. If they laugh and have a story ready, they're a fit. If they say "rarely happens," they're not.)*

### Min 5–15: Demo — without overselling
- Pull up **one** real example of a missed lead pattern from another pilot (anonymized). Show the before/after.
- Walk through three things and three things only: signal detection → drafted reply → recovered-revenue tracking. Don't open every screen.
- Ask after each: *"Does this map to anything in your inbox?"*
- Hand them control briefly: *"What would have been different if you'd seen this DM 6 hours earlier?"*
- **Stop talking before they're ready for you to.** Most demos die from over-explaining.

### Min 15–20: Close on design partner status
Frame the offer in plain words:
> "Here's what design partner means: free for 90 days, I install it for you personally, weekly 15-min check-in, you give me brutal feedback. After 90 days you decide if it's worth ₹X/month. No contract."

Then ask, in order:
1. *"Are you willing to share your DM data with us under NDA?"*
2. *"Can you commit to a 15-min check-in each week for 6 weeks?"*
3. *"If both yes — can we onboard Wednesday or Thursday?"*

**Hard rule:** if they hesitate on either commitment question, don't push. Say "totally fine — let me follow up in 6 weeks" and ask for one intro before hanging up. Hesitant design partners are the ones who ghost in week 3 and waste 20 hours of your time.

---

## 5. Content-Led Inbound — 5 Pieces

### Piece 1 — Twitter/X thread
- **Hook:** "I went through 1,247 DMs of an Indian creator doing ₹18L/mo and found ₹4.2L in revenue she missed. The breakdown is brutal:"
- **Argument:** Classify the missed DMs — brand deals that went cold (₹X), course inquiries that ghosted (₹Y), refund-prevention misses (₹Z). Show 1 anonymized DM per category. End with the *pattern* you noticed: high-intent DMs almost always come in within 4 hours of a Reel and die within 36 hours of being missed.
- **CTA:** "If you sell anything via DM and want me to do this audit on your inbox (free, 30 min), reply 'audit'."
- **Platform:** X. Post **Tuesday 9am IST**.

### Piece 2 — LinkedIn post (long-form, 1200–1500 chars)
- **Hook:** "An Indian fitness coach with 80K followers told me last week: 'I can't tell which DMs actually want to buy.' I spent 2 hours in her inbox. Here's the breakdown."
- **Argument:** 73% generic ("love your content"), 19% questions answerable in FAQs, 8% genuine buyers — but the 8% had 5 specific linguistic markers (mention of price, mention of timeline, specific outcome named, comparison to another course, "is the discount still on"). Walk through each marker with a redacted example.
- **CTA:** "If you sell via DM and want the 5-marker checklist, comment 'patterns' and I'll DM it."
- **Platform:** LinkedIn. Post **Wednesday 8am IST**.

### Piece 3 — IG carousel (10 slides) on the founder's account
- **Hook (slide 1):** "3 DMs you ignored this week that were ready to pay you ₹50,000."
- **Slides 2–4:** Three real, redacted high-intent DM patterns + why they get missed.
- **Slides 5–8:** The 4 reasons high-intent DMs die (volume, time-of-day, message position in stack, "looks like a fan note").
- **Slide 9:** A simple checklist they can use today (not a product pitch).
- **Slide 10:** "Save this. Tag a creator drowning in DMs."
- **Platform:** IG. Post **Sunday 7pm IST** (peak save window).

### Piece 4 — Twitter/X thread
- **Hook:** "₹4L/mo creators have a different DM problem than ₹40L/mo creators. I've sat in both inboxes. The ₹4L problem is finding intent. The ₹40L problem is response speed. Most tools solve the wrong one."
- **Argument:** Walk through the inbox pathology at each tier. At ₹4L, they reply to almost everyone but can't tell who's serious. At ₹40L, they have filters but the filter cuts buyers along with noise.
- **CTA:** "If you're at either tier and want to compare notes, my DMs are open."
- **Platform:** X. Post **Thursday 9am IST**.

### Piece 5 — LinkedIn post
- **Hook:** "I asked 12 Indian course creators how many DMs they get per day. Average: 287. Read: 84. Replied: 34. The math hurts."
- **Argument:** At an average ₹15K course price and a 3% close rate from DM, missing 5 high-intent DMs/week = ~₹3L/month in unrecovered revenue. Show the calculation. Don't pitch a tool — ask the question: "What would change if you read every DM that mattered?"
- **CTA:** "If this stings and you want to swap notes for 20 min, DM me 'real'."
- **Platform:** LinkedIn. Post **Monday 8am IST**.

**Cross-rule for all 5:** Each post should be useful even if the reader never books a call. No "the solution is our product" reveals. The DealDock connection comes only via DM after they raise their hand.

---

## 6. Tracking — One Google Sheet, Exact Columns

> **Superseded:** this table now lives in Airtable's `Leads` table (already built, see [airtable-schema.md](airtable-schema.md)) instead of a Google Sheet — every column below has a matching Airtable field with the same or a richer set of options. Skip building the sheet; use `node scripts/at.js stats` and the commands in [PIPELINE.md](PIPELINE.md) instead. Kept below for reference on what each field means.

| Column | Notes |
|---|---|
| `Lead Name` | First + last |
| `IG Handle` | @handle |
| `LinkedIn URL` | full URL |
| `Niche` | one of: business / fitness / finance / language / career / design / marketing / mindset / other |
| `Followers (IG)` | rounded |
| `Est. MRR` | from cues; one of <₹4L, ₹4–10L, ₹10–25L, ₹25L+, unknown |
| `Source` | dropdown: IG hashtag / IG follow-of-follow / IG tagged-tab / LinkedIn search / LinkedIn post / X reply / podcast guest / community / warm intro / inbound |
| `Source Detail` | e.g. "Akshat Shrivastava tagged tab" or "intro from Rohan" |
| `Date Sourced` | |
| `Outreach Channel` | IG DM / LI / email / WhatsApp / intro |
| `Date First Msg Sent` | |
| `Replied?` | Y / N / N-yet |
| `Date Replied` | |
| `Reply Sentiment` | warm / lukewarm / no thanks / wrong-fit |
| `Call Booked?` | Y / N |
| `Call Date` | |
| `Call Notes` | bullet form, 3 lines max |
| `Stage` | Sourced → Messaged → Replied → Call Booked → Call Done → Pilot Active → Paying → Dead |
| `Last Touchpoint Date` | auto-formula updates this |
| `Next Action` | one specific verb + date |
| `Outcome` | pilot / paying / passed / ghosted / not-fit |
| `DQ Reason` | only if passed: too small / too big / no own product / has team / not active / other |
| `Intros Given` | count of who they've referred you to |

Pin a second tab: **"Daily Counters"** with date | sourced | outreach sent | replies received | calls booked | calls done | pilots closed. Fill at end of each day. This is your dashboard.

---

## 7. Week-by-Week Plan

### Week 1 — Setup + first prospects (Days 1–7)

**Daily targets:** sourcing 20 prospects, 10 outreach sent, 30 min on content.

| Day | Concrete actions |
|---|---|
| **Mon** | Build the tracking sheet. Set up Calendly with 20-min slots, Tue–Fri, 11am–1pm and 5pm–7pm IST only. Write your "About me" doc (1 page) you'll send post-call. |
| **Tue** | Source 50 prospects from IG: 25 from hashtag mining, 25 from tagged-tabs of 3 known creators. |
| **Wed** | Source 50 from LinkedIn (use the search strings in §2b). Enrich each row with niche + estimated MRR. |
| **Thu** | First outreach wave: 10 IG DMs + 10 LinkedIn connection requests. Write the **Piece 1 Twitter thread** draft. |
| **Fri** | 10 more DMs + follow up LinkedIn accepts with the §3b note. **Ship Piece 1 Twitter thread at 9am IST.** Send 5 warm-intro asks to existing network. |
| **Sat** | Mine 3 podcast guest lists (2 hours), add 25–35 new prospects to sheet. |
| **Sun** | Light day: review week, write **Piece 3 IG carousel** in Canva, post at 7pm. |

**End of week 1 you should have:** 100+ prospects, 30+ outreach sent, 5+ replies, 1–2 calls booked for week 2, 2 pieces of content live.

### Week 2 — Outreach ramp + first calls (Days 8–14)

**Daily targets:** 15 sourced, 25 outreach sent, 1 call done, 30 min content.

| Day | Concrete actions |
|---|---|
| **Mon** | **Ship Piece 5 LinkedIn post at 8am.** 25 outreach (mix: 12 IG, 8 LI, 5 follow-ups). 1 call. |
| **Tue** | 25 outreach. 1 call. Source 15 new from communities you've now joined. |
| **Wed** | **Ship Piece 2 LinkedIn post at 8am.** 25 outreach. 2 calls. Reply to every comment within 90 min. |
| **Thu** | **Ship Piece 4 Twitter thread at 9am.** 25 outreach. 1 call. |
| **Fri** | Follow-up day. Re-message everyone who didn't reply 5 days ago with a tighter, even-shorter message ("still relevant — 20 min this week?"). 2 calls. |
| **Sat** | Long-form sourcing: spend 2 hrs on community lurking + replying usefully (not pitching). Identify 5 hand-raisers from your content — DM them. |
| **Sun** | Review kill criteria (§8). Decide: same ICP or pivot? |

**End of week 2:** 200+ outreach sent total, 12–20 replies, 5–8 calls done, 2–3 design partners verbally committed.

### Week 3 — Convert + iterate (Days 15–21)

**Daily targets:** 20 outreach (down — focus shifts to closing), 2 calls/day, onboard 1 design partner.

| Day | Concrete actions |
|---|---|
| **Mon** | Onboard design partner #1 in person if Hyderabad/Bangalore/Mumbai-based, else Zoom. 90-min session: install + walk through first DM batch together. |
| **Tue** | 2 calls. 20 follow-ups. Update your IG DM template based on what's converting on calls. |
| **Wed** | Onboard design partner #2. **Ship a post-mortem post** on Twitter: "First 2 design partners installed. Here's what we found in their inboxes." (anonymized, builds proof) |
| **Thu** | 2 calls. Reach out to every "interesting but not now" person with a 1-line update on what early partners are seeing. |
| **Fri** | Onboard design partner #3. Ask each onboarded partner for 2 intros to peers. |
| **Sat** | Source another 30 prospects, but with the *learning* from calls — niches that converted best, follower ranges that converted best. |
| **Sun** | Write a "what I'm seeing" public post (LinkedIn or X) — 3 patterns from the first 3 inboxes. |

**End of week 3:** 3 partners installed, 5–7 verbal yeses queued for week 4 onboarding, 1 inbound lead from content per day.

### Week 4 — Lock in pilots + onboard first 3 (Days 22–30)

**Daily targets:** 1 onboarding/day, 1 call/day, 15 follow-ups, 1 content piece every 2 days.

| Day | Concrete actions |
|---|---|
| **Mon** | Onboard partner #4. Write up partner #1's recovered-revenue numbers (2 weeks in) into a 1-pager case study draft. |
| **Tue** | Onboard partner #5. **Post case study teaser** on LinkedIn ("creator doing ₹14L/mo recovered ₹X in 2 weeks — full breakdown Friday"). |
| **Wed** | Onboard partner #6. 2 closing calls. |
| **Thu** | Onboard partner #7. Close any verbal yeses still drifting. |
| **Fri** | **Ship full case study post.** Onboard partner #8. |
| **Sat** | Onboard partner #9. Plan day 31–60: which 3–4 partners are highest-likelihood to convert to ₹4–15k/mo paying? |
| **Sun** | Onboard partner #10. Write your day-30 review: what worked, what didn't, where the next 10 come from. |

**End of week 4:** 10 design partners locked in, 3+ already 2 weeks into their pilot, 1 case study live, content engine generating 1 inbound lead/day.

---

## 8. Kill Criteria — End of Week 2

Look at the data on Sunday of week 2. **Pivot if any of these are true:**

1. **Reply rate <5%.** From 100+ outreach, fewer than 5 people replied. Either the ICP is wrong or the message is wrong. Diagnose: did the 1–2 replies you got say "this isn't for me" or "interesting but later"? "Not for me" = ICP issue. "Interesting but later" = message is fine, you're hitting people too early in their journey.
2. **0 of the calls said "yes, I have this problem."** If everyone on calls has a VA who handles DMs cleanly, or says "honestly my DMs aren't crazy," the segment doesn't have the pain. Move up the follower range or shift to talent managers (your secondary).
3. **Calls all converge on a *different* problem.** If 4 out of 5 say "DMs are fine, but I can't keep up with content / can't price my course / can't onboard students" — the real wedge is somewhere else. Note it. Don't pivot DealDock; it just means you're talking to the wrong stage.
4. **No one is willing to share DM data even after a great call.** Means the trust bar for this product is higher than the pitch can clear in 20 min. Need a different proof asset (case study, mutual NDA template, in-person demo) before continuing outreach.
5. **You can't get warm intros from your existing graph.** If 20 "do you know any IG creators with heavy DMs?" asks return 0 names, your network is too far from the ICP. Either invest 2 weeks in network-building (creator events, in-person meetups in Bangalore/Mumbai) before resuming, or shift to communities-first sourcing.

**If 2 or more of these fire, pause outreach for 48 hrs and re-segment.** Better to lose 2 days than to spend weeks 3–4 grinding the wrong list.

---

## Quick Reference — What to Open Every Morning

1. Run `/daily` in Claude Code — sources new prospects, enriches, qualifies, and drafts outreach for anything new, then prints today's scoreboard and send list.
2. Airtable → "🔥 Hot Leads" view → reply to anyone warm within 12 hrs (or paste their reply into `/classify-replies` first).
3. Airtable → "⏰ Follow-up Due" view → send a one-line nudge to anyone stalled 5+ days.
4. LinkedIn → 10 min posting/commenting on 3 ICP posts (warms them before you reach out next week).
5. Manually send the day's outreach quota from `/daily`'s printed list (cap: ~10–15 IG DMs, ~25 LinkedIn connects).

If you do only this every day for 30 days, you hit the plan.
