# Writer assignment template and real examples

Each writer agent gets **this opening line + one assignment block**. Everything general (voice, markup, research rules, DealDock claims, quality gate, report format) lives in `writing-brief.md`, so assignments stay short and specific.

## Template (article)

```
Write one DealDock blog article. First read the shared brief at <worktree>/.claude/skills/blog-write/writing-brief.md and follow it exactly: files, template, voice, research rules, product claims, quality gate and report format. If docs/seo/briefs/<slug>.md exists, read it too and use its source dossier.

Assignment
- Slug: `<slug>`. Create only `src/app/blog/<slug>/page.tsx` in <worktree>.
- Working title: "<title from registry>"
- The question it must answer better than anything else online: <one question in the reader's words>
- Searches to win: <q1>; <q2>; <q3>; <q4>.

Cover, verifying each <platform/legal> detail in <primary source> first:
- <specific point; say exactly what to explain and name the official source to check>
- <templates: number and scenarios, as `styles.template` blocks>
- <table, only if it earns its place (`styles.tableWrap`)>
- <what not to do / safety / legal angle, with the official source>
- Link to `/blog/<sibling>` and `/blog/<sibling>`.
- A brief, honest "where a tool helps" section, following the brief's DealDock rules. <topic-specific limit, e.g. "DealDock does not collect payments">.

<Any topic-specific warning: "Interface names change, so describe menus as Meta's Help Center describes them in <month year>. Where pages disagree or you can't confirm a detail, write it more generally and note it in your report.">
```

## Template (free tool)

```
Build a free, interactive <tool name> page for DealDock's website. First read the shared brief at <worktree>/.claude/skills/blog-write/writing-brief.md. Its voice, research, product-claim and quality-gate rules apply to every word on the page. Its page template is for blog posts; this is a tool page, so use the structure below instead.

Goal: <what generic tools online do badly, and what this one does better; honest about uncertainty, shows its maths>. Searches to win: <…>.

Files to create in <worktree>, and nothing else:
1. `src/lib/<tool>.mjs`: pure logic with JSDoc types, no React, no dependencies.
2. `scripts/test-<tool>.mjs`: node:test plus assert, covering the maths, rounding, formatting (₹ uses Indian grouping), empty inputs and invariants (low ≤ suggested ≤ high).
3. `src/components/marketing/<tool>.tsx` ("use client") and `<tool>.module.css`.
4. `src/app/tools/<slug>/page.tsx` (server page) and `opengraph-image.tsx` (1200x630, matching `src/app/og/[slug]/route.tsx`).

Method: <inputs, outputs, where every default or percentage must come from (cite each on the page; use ranges where sources disagree; label your own modelling as such; no default you can't source)>.

Page: wrap it in `MarketingDocument` (title, `updatedAt="DealDock free tool · Updated <date>"`). Order: intro answer, tool, explainer, a "How we calculate" section with sources, and an FAQ. Reuse the FAQ markup and classes from `src/components/marketing/blog-article.tsx`. One JSON-LD script with a WebApplication (isAccessibleForFree, price 0, publisher DealDock) and a FAQPage whose text is identical to the visible FAQ. Metadata: a title ending "| DealDock", a 120–155 character description, a canonical on https://dealdock.io/tools/<slug>, and openGraph, twitter and robots index set. Render sensible defaults on the server. Accessibility: labelled inputs, works by keyboard, 44px targets, an aria-live result, and it works at 390px. Use the site palette (paper #f3f4ef, ink #191d1b, muted #59615b, signal #f9d84a, line #cdd2c9). No marker or highlighter effects. One honest line about DealDock's pilot.

Finish with `node --test scripts/test-<tool>.mjs` and `timeout 300 npx tsc --noEmit -p .`. Don't build, commit or push. Report the files, every default with its source, the test results and anything unverified.
```

---

## Real assignments (Nov 2026). Match this level of specificity

### instagram-message-requests
- Question: why do messages from brands and would-be buyers end up in Instagram's Requests, Hidden Requests or the General tab, and how does a creator make sure they see them?
- Searches: instagram message requests not showing; where are message requests on instagram; hidden requests instagram; instagram general vs primary; missed brand DM instagram.
- Cover, verifying each detail in Meta's Help Center first:
  - Routing from accounts you don't follow (Requests); Hidden Requests and why messages land there (message filters, hidden words); Primary and General for professional accounts, and how to move a chat.
  - Message controls: where they are and what changing them does. What happens when you accept, delete or ignore a request, and what the sender sees.
  - Notifications for requests.
  - A short weekly, phone-first check routine.
  - Telling a real brand or buyer from a scam: impersonation, fake collabs, fees, login links, citing Meta's own guidance.
  - An honest tool section with no claims about which folders any tool can read.

### manage-instagram-dms-coach
- Question: how can a coach or course creator handle 50–300 DMs a day without missing buyers, using Instagram's own tools plus a simple routine?
- Searches: how to manage instagram dms; organise instagram dms; instagram dm management for coaches; instagram saved replies; instagram dm folders.
- Cover:
  - Professional-account features, each confirmed in the Help Center: Primary/General, filters, flags or labels, saved replies, instant replies or away messages, and the Business Suite inbox.
  - A twice-a-day triage in priority order: buyers ready to pay, then current clients, brand enquiries, everyone else.
  - 3–4 saved-reply examples that don't sound canned.
  - Moving a buyer forward: a call, a checkout link, or the real objection.
  - Tracking, with internal links.
  - When to bring in a VA or a tool.
  - Account-safety basics: official APIs, no password sharing.
  - No unsourced statistics.

### follow-up-coaching-enquiry
- Question: an enquiry goes quiet. When and how do you follow up so it's helpful, not pushy?
- Searches: how to follow up with a lead on instagram; follow up message after no response; coaching follow up message template; dm follow up templates; how many times to follow up.
- Cover:
  - Why people go quiet, and a recommended rhythm (not data): reply fast; nudge after 1–2 days; again about a week later; close the loop at 2–3 weeks.
  - 6–8 templates: asked the price then went silent; "let me think"; a call no-show; checkout link unused; a genuine deadline; reconnecting after months; the final message.
  - Dark patterns to avoid, citing India's 2023 Dark Patterns Guidelines (false urgency) and the FTC's 2022 staff report.
  - When to stop.
  - A correct note that the 24-hour window and the 7-day Human Agent tag apply to API tools, not manual replies, with Meta developer docs.
  - Tool section: reminders and drafted nudges, nothing sent without approval.

### brand-hasnt-paid
- Question: a brand or agency hasn't paid the invoice. What to check, what to send and when, and what to do if it's still unpaid.
- Searches: brand not paying influencer; influencer late payment; net 30 influencer; payment reminder email to brand; brand deal payment not received.
- Cover:
  - Checks first: the right inbox, PO or vendor forms, terms, who pays.
  - A templates timeline: optional pre-due note, the due date, +7, +14 to finance, +30 final notice.
  - After that: a formal demand, mediation, small claims.
  - Prevention.
  - Laws, each on official sites with who it applies to:
    - New York Freelance Isn't Free Act (statewide since Aug 2024) and the NYC law, Illinois FWPA, and California SB 988 (BPC §18100+);
    - UK Late Payment Act 1998 (8% over base rate, £40/£70/£100);
    - India MSMED Act s.15–17 (45 days, 3× the RBI bank rate), the Samadhaan/ODR portal, and IT Act s.43B(h), now §37(2)(g) under the 2025 Act.
  - A "not legal advice" line.
  - DealDock doesn't collect payments or invoice.

### dm-enquiry-tracker-template
- Two files: the page, and `public/templates/dealdock-dm-enquiry-tracker.csv` (UTF-8 with BOM, CRLF).
- Exact columns: Date received, Name or handle, Where, Type, What they asked, Estimated value, Currency, Stage, Next step, Follow up on, Last contact, Link to conversation, Notes.
- Stages: New, Replied, Waiting on them, Call booked, Agreed, Invoiced, Paid, Lost.
- Three rows obviously labelled "(example)". No cell starts with = + - @, and no real brand names.
- Cover:
  - A download link near the top, and a table explaining the columns.
  - Why Agreed and Paid are separate stages.
  - Verified import steps for Google Sheets (File > Import, the Stage dropdown, an overdue-highlight formula tested against the columns), Excel and Notion.
  - A 10-minute daily routine and a 20-minute weekly review.
  - Privacy (India's DPDP Act, with commencement dates).

### ai-instagram-dm-tools
- Question: what kinds of AI and automation tools exist for Instagram DMs, which suits whom, and how do you pick one without risking your account?
- Cover:
  - Four approaches: keyword/comment-to-DM automation, autonomous agents, approve-first drafts (DealDock as a pilot) and pasting into a general chatbot. Name tools only where their own docs confirm the claim; neutral, no ranking.
  - A small comparison table.
  - Account safety: official API vs passwords or browser automation, citing Instagram's Terms and Meta's docs.
  - Meta's 24-hour and Human Agent rules.
  - Disclosure: California SB 1001 as one jurisdiction's example, plus Meta's policy.
  - An evaluation checklist.
  - Be scrupulously fair: automation is right for some creators.

### barter-vs-paid-collab (Hinglish)
- Language: natural Roman-script Hinglish (see the brief). Registry `inLanguage: "hi-Latn"`.
- Question: a barter offer arrives. Barter vs paid vs affiliate, when barter is worth it, how to ask for money, and the tax and disclosure rules.
- Cover:
  - A comparison table.
  - When to accept barter, and when to say no.
  - 4 Hinglish templates.
  - Rates: no invented ₹ benchmarks; link the calculator.
  - Payment terms.
  - Section 194R: 10% over ₹20,000/yr; Circulars 12 and 18 of 2022; its section under the Income-tax Act 2025. Verify on incometaxindia.
  - GST: barter as "supply" under CGST s.7, hedged.
  - ASCI influencer guidelines and DoCA's "Endorsements Know-hows!" (Jan 2023).
  - A "see a CA" line, and the FAQ in Hinglish.

### brand-deal-rate-calculator (free tool)
- Prices what follower-count calculators skip: usage rights (organic, 30/90/180 days or perpetual), paid usage or whitelisting (30/60/90 days, Meta partnership ads), exclusivity, rush delivery, extra revisions. Each is a cited percentage range of the creator's own base fee.
- An optional views × CPM helper, with no unsourced default CPM.
- Output: a low–high range, a suggested quote, the line-by-line maths and a copyable reply sentence.
- USD and INR.
- See the tool template above for files, schema, accessibility and tests.
