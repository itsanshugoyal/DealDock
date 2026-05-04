# Product Requirements Document — DealDock

**Working name:** DealDock (final name TBD)
**Product type:** B2B SaaS — revenue recovery system for Instagram-first commerce creators
**Document version:** v1.0 — pilot scope
**Status:** Active, pre-launch
**Audience:** Founding team, design, eng, ops, GTM

---

## 1. Product overview

DealDock is a revenue recovery system for Indian Instagram creators, coaches, and course sellers. It connects to a creator's Instagram inbox, identifies high-intent messages — brand briefs, coaching leads, course inquiries — sorts them by estimated rupee value, drafts replies in the creator's voice, and tracks the revenue it recovers each month.

Most inbox tools optimise for time saved or messages handled. DealDock optimises for one number: **rupees recovered.** Every product decision flows from that.

The pilot ships with Instagram only. WhatsApp Business is the first post-pilot platform.

---

## 2. Problem statement

Indian creators doing ₹4L–₹40L/month on Instagram receive significant commerce inbound directly in their DMs — brand collaboration briefs, paid coaching enquiries, course questions from warm leads. These messages get buried under fan replies, spam collab pitches, and message requests. The high-value messages that get missed are, by definition, invisible — the creator never sees the size of the leak.

We have observed creators losing five-figure brand deals every month not to better competitors, but to inbox chaos. There is no existing tool that:

- Sorts DMs by **estimated revenue value**, rather than recency or sentiment.
- Understands **commerce-specific message types** (brand brief vs. coaching enquiry vs. fan).
- Drafts replies in the **creator's own voice** rather than a generic helpdesk tone.
- Builds a **revenue attribution ledger** so the creator can see, over time, how much money the tool has recovered.
- Treats **human review as the default** for uncertain classifications, rather than auto-sending.

DealDock is the tool that does all five.

---

## 3. Goals and non-goals

### 3.1 Pilot goals (first 90 days post-launch)

1. Onboard a capped pilot cohort and ship the full core loop end-to-end (connect → classify → draft → close-out → ledger).
2. Establish a credible **average recovered revenue per creator per month** number, derived from real attributed deals.
3. Achieve a **classification accuracy** high enough that creators trust the Revenue Inbox without re-checking the unsorted folder. Target benchmark to be set after week 2 of pilot data.
4. Achieve **voice fidelity** strong enough that >70% of drafted replies are sent with no edits or only minor edits.
5. Validate the Revenue Ledger as a retention mechanism — i.e. measure whether close-out frequency correlates with subscription renewal intent.

### 3.2 Long-term product goals (post-pilot)

- Expand to WhatsApp Business as the second platform.
- Open self-serve onboarding for the primary audience without losing onboarding quality.
- Build the Revenue Ledger into a defensible, longitudinal asset (the longer a creator uses DealDock, the more valuable their revenue history becomes — and the harder it is to leave).
- Introduce the Roster tier as a real product surface for talent managers and small agencies, not just a pricing line.

### 3.3 Non-goals (explicitly out of scope, even if requested)

- **Fully autonomous reply mode.** No "auto-pilot" that sends messages without creator approval. Ever, in pilot. Possibly later, only for low-stakes message classes, only opt-in.
- **Customer-support ticketing features** (SLAs, ticket queues, agent assignments, CSAT surveys). Not the wedge.
- **Generic creator CRM.** No deal pipelines, contact records, or sales-stage tracking beyond what the Revenue Ledger needs.
- **Content scheduling, post analytics, or audience analytics.** Not in scope. Plenty of tools do this already.
- **Bulk outbound / cold DM tools.** Strict no — both wedge-incorrect and a reputation risk.
- **AI bots that pretend to be the creator in real-time chat.** Drafts only. The creator approves and sends.

---

## 4. Target users

### 4.1 Primary persona — Solo Commerce Creator

- **Who:** Indian creator running their own brand. Typical examples: a fitness coach selling a 12-week program, a consultant running a paid newsletter and 1:1 calls, a course creator selling cohort-based courses.
- **Revenue band:** ₹4L–₹40L/month.
- **Inbox shape:** 50–500 incoming DMs/day. Mix of fan messages, brand briefs (1–10/week), coaching enquiries (5–30/week), course questions, spam collab pitches.
- **Pain:** misses real opportunities under message volume; replies late to high-value messages; can't tell which deals they've lost.
- **Decision driver:** money recovered, not time saved.

### 4.2 Secondary persona — Talent Manager / Small Agency

- **Who:** Manager handling 2–10 creator accounts. Either an in-house "manager" working for one creator's expanding business, or a small agency.
- **Inbox shape:** triaging multiple creators' inboxes simultaneously. Volume scales with roster size.
- **Pain:** can't be present in every inbox; brand briefs land on creator phones and never reach the manager; revenue attribution across the roster is invisible.
- **Decision driver:** roster-wide visibility and per-creator revenue reporting.

### 4.3 Anti-personas (explicit non-fit, do not design for these)

- **Entertainment-only creators with no commerce.** Their DMs are mostly fans; there's no revenue to recover.
- **E-commerce/D2C brands using IG as a storefront for thousands of order queries.** Different problem shape — high-volume support, not commerce sorting.
- **Enterprise marketing teams.** Wrong scale, wrong buying motion.
- **Creators below ~₹3L/month.** The product can't pay for itself yet at that scale, and we'd rather wait than mis-sell.

---

## 5. Key user journeys

### 5.1 First-time onboarding (pilot member)

1. Creator submits pilot application form.
2. Founding team reviews; if accepted, schedules a 20-minute onboarding call.
3. On the call, creator connects their Instagram Business/Creator account via official OAuth.
4. Creator answers ~10 quick questions about their business: what they sell, typical brand deal size range, typical coaching package sizes, who their audience is, any handles to ignore (close family, regular collaborators).
5. DealDock begins ingesting DMs and shows the first classified messages within minutes. Voice-modeling sample replies are surfaced over the next 5–7 days.
6. By day 7, voice fidelity should be high enough that drafted replies are usable with light edits.

**Onboarding success criteria:** creator closes their first deal logged in the Revenue Ledger within the first 14 days.

### 5.2 Daily triage (the main loop)

1. Creator opens DealDock — web on desktop, responsive on mobile (no native app in pilot).
2. Top of screen: month-to-date "Revenue Recovered" card.
3. Below: Revenue Inbox, sorted by estimated rupee value descending. Each row shows: classification badge (Brand / Coaching / Course / Other), estimated value range, sender handle, first-line preview, age of message.
4. Creator taps into a thread → sees full DM history + DealDock-drafted reply.
5. Creator approves, edits, or rewrites the draft → sends. Send happens via IG API; the message appears in IG as if sent normally.
6. Creator continues down the inbox until satisfied, or flips to Review Queue for uncertain classifications.

### 5.3 Closing a deal

1. A thread that has progressed to "deal confirmed" gets a one-tap **Mark closed for ₹___** button at the top of the thread view.
2. Creator types or taps a number, optionally tags the deal type (brand / coaching / course / other), confirms.
3. Revenue Ledger updates immediately. Month-to-date Recovered Revenue tile reflects the new value.
4. The deal appears in the ledger with: date, sender, deal type, ₹ value, and a link back to the thread.

### 5.4 Handling the review queue

1. Messages the classifier is uncertain about land in a separate Review Queue, never in the main Revenue Inbox.
2. Creator periodically clears the queue: a row shows the message, the system's best guess, and confidence level.
3. One tap to confirm the classification, one tap to override. The system learns from each correction.
4. Nothing in the Review Queue is auto-replied to, ever.

### 5.5 Roster manager journey (Studio / Roster tier)

1. Manager logs in and sees a roster overview: each creator on a row, with month-to-date recovered revenue, unread high-priority count, and review-queue size.
2. Tapping into a creator opens that creator's Revenue Inbox.
3. Manager can draft and send replies on the creator's behalf, with the creator's voice profile applied.
4. Per-creator monthly revenue reports are available as exports.
5. Audit trail logs which user (creator or manager) sent which reply, for accountability.

### 5.6 Cancellation and data export

1. Creator goes to Settings → Subscription → Cancel.
2. No friction, no retention popups, no "are you sure" loops beyond a single confirmation.
3. On cancellation: subscription ends at end of current billing cycle. Revenue Ledger remains accessible read-only for 30 days.
4. Creator can export their full Revenue Ledger as CSV at any time, including post-cancellation.
5. After 30 days, all data is permanently deleted from our systems.

---

## 6. Functional requirements

Listed by feature area. Each item is something the product must do for the pilot to ship.

### 6.1 Account & Instagram connection

- Support OAuth connection for Instagram Business and Creator accounts via official Graph API.
- Detect and clearly message the user if they're on a Personal account (and explain how to switch — it takes ~2 minutes, and is free).
- Allow disconnect at any time. On disconnect, stop ingestion immediately.
- Support one IG account per user on Solo. Up to two seats (creator + one assistant) on Studio. Up to five connected IG accounts on Roster.

### 6.2 Message ingestion & classification

- Ingest incoming DMs in near-real-time after connection (target: a new DM appears in the Revenue Inbox within 60 seconds of arriving in IG).
- Classify each incoming message into one of: **Brand Deal**, **Coaching Lead**, **Course Inquiry**, **Other Commerce** (paid services, consulting, etc.), **Fan Message**, **Spam / Low-quality**, **Personal**, **Uncertain**.
- For each classified message, generate an **estimated rupee value range** based on signal in the message, sender profile, and creator's historical deal-size context provided during onboarding.
- Anything classified as Uncertain (below confidence threshold) routes to the Review Queue, never to the main Revenue Inbox.
- Support **Hinglish, English, and Hindi** messages — and code-switched messages — without degrading classification accuracy. This is non-negotiable for the Indian market.

### 6.3 Revenue Inbox

- Default sort: estimated rupee value, descending.
- Secondary sort options: most recent, oldest unread, highest confidence.
- Filters: classification type, age (today / this week / older), unreplied only.
- Each row shows classification badge, estimated value, sender handle (with verified status if applicable), first line of message, message age, draft-ready indicator.
- Tap into row → full thread view with DealDock-drafted reply at the bottom.

### 6.4 Voice modeling & reply drafting

- During onboarding, ingest a sample of the creator's recent sent DMs (with explicit consent) to model their voice.
- For every classified high-intent message, generate a draft reply that matches: typical greeting, sentence length, tone (formal/informal), signoff, and characteristic phrases.
- Drafts must adapt to message type: a brand brief reply is structured differently from a coaching enquiry reply.
- Creator can edit drafts inline before sending.
- Track edit distance over time as a voice-fidelity metric.
- **Never auto-send.** Always requires creator (or authorised seat) approval.

### 6.5 Review queue (human-in-the-loop)

- Separate inbox view for messages below the classification confidence threshold.
- Each row shows: message, system's best-guess classification, confidence level, and a one-tap accept/override.
- Overrides feed back into the classifier as labelled training data for the creator's account specifically.
- Review queue items never appear in the main Revenue Inbox until classified.

### 6.6 Revenue Ledger

- One-tap "Mark closed for ₹___" button on every thread.
- Closed deals captured with: date, sender, deal type, ₹ value, link to thread.
- Month-to-date Recovered Revenue tile prominently displayed on dashboard.
- Historical view: month-by-month recovered totals, biggest single deal, average deal size, deal-type breakdown.
- Exportable as CSV at any time.
- Closed deals can be edited or deleted by the creator (in case of mistakes or refunded deals).

### 6.7 Reporting & analytics

- **Pilot scope:** monthly recovered revenue total, by-classification breakdown, top 10 deals of the month, voice-fidelity metric (% drafts sent without edit), classification accuracy (% review-queue items where the system's best guess was confirmed).
- **Roster tier:** per-creator reports rolled up into a roster-level dashboard.
- Out of scope for pilot: cohort comparisons, predictive forecasting, benchmarking against other DealDock users.

### 6.8 Multi-seat and multi-account (Studio & Roster)

- Studio: one connected IG account, two user seats (creator + assistant). Both can read and reply. Audit trail logs sender.
- Roster: up to five connected IG accounts under one organisation. One or more manager seats. Per-creator voice profiles. Per-creator revenue reports. Org-level view across all creators.

### 6.9 Settings & data controls

- View what data DealDock has stored.
- Export everything (DMs processed, classifications, drafts, ledger entries) as a single archive.
- Delete account → 7-day grace period, then permanent deletion.
- Toggle voice modeling on/off (some creators may want classification only, no drafting).
- Per-handle "ignore list" — accounts whose DMs should never be classified or drafted (close family, regular collaborators, the creator's own alt account).

### 6.10 Billing & subscription

- Monthly subscription on all three tiers. No annual lock-in for pilot.
- First invoice does not run until the creator has been onboarded and used the product for one full week. (This is a trust mechanism, not a free trial — it's invoiced after the fact.)
- Upgrade/downgrade at any time. Cancel at any time, with no fee.
- Pilot members keep their pilot price as long as they remain subscribed. Post-pilot pricing applies only to new signups.

---

## 7. Non-functional requirements

### 7.1 Privacy and data handling

- DM content is processed for classification and drafting. It is **not** sold, **not** used to train public models, and **not** shared outside the user's account.
- All data encrypted in transit and at rest.
- Per-creator data isolation — no cross-creator data leakage in classification, drafting, or modeling.
- Privacy policy and data-handling FAQ given to every pilot member before onboarding.

### 7.2 Account safety & API compliance

- Connection is via Meta's official Graph API only. No browser automation, no scraping, no unofficial workarounds.
- Sending replies happens through the same official channel.
- Rate limits and policy boundaries must be respected even if it means slower throughput.
- Zero tolerance for anything that puts a creator's IG account at policy risk.

### 7.3 Latency & responsiveness

- New DM → visible in Revenue Inbox: target under 60 seconds.
- Draft reply generation on-thread: target under 5 seconds.
- Dashboard load: target under 2 seconds on a typical Indian mobile connection.

### 7.4 Accuracy benchmarks

- Classification accuracy: target ≥ 90% on the Brand / Coaching / Course / Fan / Spam top-level distinction by end of pilot, after personalisation.
- Voice fidelity: ≥ 70% of drafts sent with no edit or minor edit (defined as <20% character change).
- Review queue routing: any message below 80% confidence goes to review, not Revenue Inbox.

(Benchmarks above are launch targets. Real numbers will be tracked from week 1 and surfaced internally on a weekly dashboard.)

### 7.5 Audit trail

- Every reply sent is logged with: timestamp, sender (creator or assistant), original draft, final sent text, edit distance.
- Exportable on request.

### 7.6 Reliability

- Target uptime in pilot: 99.5% during Indian business hours (8am–11pm IST), 99% overall.
- DM ingestion must self-heal from API outages — no permanently lost messages on the IG side.

---

## 8. Pricing & packaging

| Tier | ₹/month (pilot) | Connected IG accounts | User seats | Notable extras |
|---|---|---|---|---|
| Solo | ₹4,000 | 1 | 1 (creator) | Full Revenue Inbox, voice drafting, Revenue Ledger |
| Studio | ₹8,000 | 1 | 2 (creator + assistant) | Priority review queue, audit trail by seat |
| Roster | ₹15,000 | Up to 5 | Multiple manager seats | Per-creator voice profiles, per-creator + roster-level reports, direct line to founding team |

**Pilot terms:** monthly only, cancel anytime, no setup fee, first invoice runs after one full week of active use. Pilot members retain pilot pricing as long as they remain subscribed.

**Post-pilot:** prices increase. Existing pilot members are grandfathered in. Annual billing option may be introduced.

---

## 9. Phasing

### V0 — Pilot (current scope of this PRD)

Capped cohort. Manual onboarding by founding team. Instagram only. All three tiers available but Roster offered selectively. Web-only interface (responsive). No public signup.

### V1 — Open beta (post-pilot)

Self-serve signup for creators who fit the wedge (gated by qualifying questionnaire). Onboarding partly automated, with optional human onboarding call. Pricing moves to post-pilot rates for new signups.

### V2 — WhatsApp Business

Add WhatsApp Business as a second connected platform. Unified Revenue Inbox across IG and WhatsApp. Cross-platform thread linking when the same lead messages on both.

### V3 — Roster as a real product surface

Stronger multi-account UX, agency-billing options, white-label considerations, cross-creator analytics.

### Beyond

Other platforms (LinkedIn DMs for B2B coaches, email integration, etc.) evaluated based on demand. Autonomous-reply mode considered only for clearly low-stakes message classes, opt-in only.

---

## 10. Risks and open questions

### 10.1 Top risks

1. **Meta API policy changes.** If Meta restricts third-party DM access, the product is materially affected. Mitigation: stay on official APIs, build a WhatsApp track early, watch policy changes weekly.
2. **Classification accuracy on Hinglish.** Indian DMs are heavily code-switched. Underperformance here breaks the entire promise. Mitigation: pilot cohort weighted toward creators with Hinglish-heavy inboxes; treat this as a P0 quality bar.
3. **Voice-modeling cold start.** Until we have a few weeks of approved drafts, drafts may feel generic and creators may disengage. Mitigation: heavy onboarding-call investment; explicit messaging that the first 5–7 days are voice-tuning.
4. **Misclassification reputational risk.** A brand brief routed to the fan folder, or a fan auto-flagged as a deal, can damage trust with the creator's audience. Mitigation: review queue is the default for anything uncertain; nothing auto-sends.
5. **Attribution under-counting.** If creators don't log closed deals, recovered-revenue numbers look smaller than reality and the product appears less valuable than it is. Mitigation: make close-out a one-tap action; nudge gently when threads look like they've concluded; surface attribution prominently on the dashboard.

### 10.2 Open questions to resolve before V1

- Should Reels-DM and Story-reply messages be ingested into the same Revenue Inbox, or kept separate? (Different intent shape.)
- How do we handle group DMs? (Mostly out-of-scope as noise, but some brand pitches do come through groups.)
- Is there a "snooze until reply" state for threads waiting on the brand's response, distinct from open and closed?
- For the Roster tier, do creators get visibility into what their manager is sending, or is it purely a manager-side tool?
- How aggressive should onboarding "ignore list" defaults be? (e.g. auto-ignore verified accounts under a certain follower count?)
- Do we ever support a "one-step-removed" autonomous mode for clearly unambiguous fan replies (a single emoji response to "love your work 🔥")?

---

## 11. Success metrics

### 11.1 North-star metric

**Total monthly Recovered Revenue per active creator**, attributed via Revenue Ledger close-outs.

### 11.2 Supporting product metrics

- Activation: % of onboarded creators who log their first closed deal within 14 days.
- Engagement: weekly active creators, daily inbox-open rate.
- Voice fidelity: % of drafts sent with no/minor edits.
- Classification accuracy: % of review-queue items where best guess was confirmed.
- Review-queue clearance time: average age of a queued message before classification.
- Time-to-first-reply on high-value threads: median, week-over-week.

### 11.3 Business metrics

- Pilot → paid conversion rate (% of pilot members who continue past first paid month).
- Monthly churn rate.
- Net revenue retention (especially as creators move Solo → Studio → Roster).
- Cost per onboarded creator (during pilot's high-touch phase).

---

## 12. Out of scope (do not build, even if asked)

A short list, kept here so it stays in the team's peripheral vision:

- Public API for third-party integrations.
- Mobile native apps (iOS/Android). Responsive web is sufficient for pilot.
- Team chat / internal commenting on threads.
- Scheduled-send for replies.
- Integrations with calendar tools for booking calls (the creator can paste their existing booking link into a draft).
- AI-generated content suggestions for IG posts.
- Audience analytics or follower insights.
- Bulk outbound DM tools (firm no — wedge-incorrect and reputation-risky).
- A Chrome extension or a "DealDock floats over Instagram" overlay. Out of scope and adds policy risk.

---

## 13. Glossary

- **Revenue Inbox** — the primary view of high-intent DMs sorted by estimated rupee value.
- **Revenue Ledger** — the running record of closed deals attributed to DealDock-surfaced threads.
- **Recovered Revenue** — the rupee total of closed deals from Revenue-Inbox-surfaced threads in a given period.
- **Review Queue** — the secondary view for messages below the classification confidence threshold, awaiting human confirmation.
- **Voice profile** — a per-creator model of writing style used to generate drafts.
- **Wedge** — the deliberately narrow primary audience and use case (Indian Instagram-driven creators doing ₹4L–₹40L/month, in commerce DMs).

— end of PRD —
