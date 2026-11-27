# DealDock public marketing design

This governs the marketing website. Authenticated product design remains in C:/code/dealdock-app/DESIGN.md.

## Current design — rebuilt 2026-11-05 (colour direction pending)

The page was rebuilt from the written plan in docs/site-plan/dealdock-site-plan.html. `/` is the global page in US dollars; `/in` is the India page in rupees with Hinglish examples. Both render one component (src/components/design-preview/marketing-design-preview.tsx) from the content in site-content.ts, and hreflang links them with `/` as x-default. `/design-preview` keeps old review links working (noindex), `/global` permanently redirects to `/`, and `/original` is the labelled archive. Do not use the archive in acquisition campaigns.

Concept: "Watch it sort". The hero inbox sorts one example brand deal to the top, and the page follows that deal through the draft, the approval slide and payment. Six objects carry every visual: DM bubble, value chip, draft bubble, receipt card, sticky note and the slide. Each chapter uses the same template: a mono label, a short Geist 800 headline, a one-sentence lede and one visual. Only two chapters are dark: the approval chapter and the application.

Colour: direction A is the default. Warm paper #F4F3EE, ink #111111, highlighter yellow #FFD43B. Yellow means money: the headline highlight, value chips, the Leak Scan total and the Solo plan; keep it off decoration. Directions B (cobalt) and C (night and gold) exist only as `data-direction` token overrides for the comparison in docs/site-plan/dealdock-directions.html. Once the founders choose, delete the other two token blocks. Status colours are fixed: paid green, late orange, scam red.

Type: Geist 800 for headlines, Geist for text, Geist Mono for labels and captions. Motion is CSS-first. Reduced motion shows every demo at its end state, and numbers render their final value on the server. Resets in preview.module.css use `:where(.page)` so component classes always win.

## Positioning — updated 2026-11-05

For creators whose Instagram DMs and Gmail hold real money: brand deals, coaching clients, course and cohort buyers, and the managers and agencies who run several creators (Roster). Global first, with its own India page. TikTok is shown as coming soon. Do not call the Instagram or Gmail connections verified or publicly available until Meta App Review and Google verification are complete. PIPELINE.md still lists brand-deal outreach experiments as excluded until a separate offer is approved; confirm with the founders before running them.

DealDock never auto-sends messages. Every send requires human approval, including follow-up drafts and payment reminders. Keep this visible in the hero, the approval chapter, the FAQ and the terms. Estimated deal values and creator-recorded sales are distinct; an estimate is not recovered revenue.

Every example is labelled as an example, with made-up names and numbers. No testimonials, logos, customer counts or results until real ones exist.

## Conversion and trust — updated 2026-11-05

Primary CTAs lead to #apply ("Apply for the pilot"). On phones a sticky bar repeats it once the hero is out of view and hides while the form is on screen. Pricing is public: Solo USD $49 / ₹4,000, Studio USD $99 / ₹8,000, Roster USD $179 / ₹15,000 per month (PLAN_PRICES in src/lib/marketing-pricing.mjs). The pilot offer is the first 30 days free from the day Instagram is connected, no setup fee, cancel anytime, and the pilot price kept while subscribed. This offer is pending founder confirmation; if it changes, update PILOT_OFFER, /pilot-terms and the FAQ together. No card or payment is collected on the website.

Ask for email, Instagram username and what they sell (brand deals, coaching, a course, a cohort, more than one, managing creators, other); a note is optional. Keep three required fields. Corrected errors clear individually without validating untouched fields; validation is announced and focuses the first invalid field. Privacy details open in a clearly labelled new tab to preserve the draft. An online receipt means a private record was saved. Retries are idempotent. Failures preserve details with retry and email alternatives. Email fallback prepares a visitor-controlled draft to itsanshugoyal2@gmail.com; preparing it is not a send or a receipt. JavaScript-disabled visitors get direct email contact.

Applications save a server-owned snapshot of the price list the page showed (currency plus PRICE_VERSION); browser-supplied amounts are ignored. The currency endpoint only decides whether `/` shows the "In India?" link to `/in`; it returns no country or IP, performs no external lookup and nothing is stored in the browser.

Support routes: /privacy, /pilot-terms, /security, /about, /contact. These explanations do not substitute for the product agreement or the Instagram and Google data terms.

## Publication and measurement

Deploy only the marketing allowlist with scripts/prepare-pilot-website.mjs. Only POST /api/pilot-application and GET /api/marketing-currency are allowed server-side. Credentials, private exports, internal APIs, dashboards and research must not enter the upload.

The review stays noindex until a commercial plan and canonical launch domain are agreed. SITE_URL supplies canonical, sitemap and social URLs. MARKETING_SITE_LIVE=true enables indexing; preview and archive remain noindex.

Basic Vercel Web Analytics is mounted on the live public site. URL queries and fragments are removed; categorical event helpers exclude form content and references. Custom Vercel events stay disabled on Hobby. Google Tag Manager container `GTM-MXV6HLJT` is loaded only on the live public site; it receives no application fields, references or DM content from DealDock. Count actual saved applications separately from email drafts. No conversion uplift is claimed before real visitor evidence.

## Search, answer-engine and crawler foundation — 2026-10-27

Public discovery relies on ordinary crawlable, useful pages rather than a separate AI-ranking mechanism. The homepages publish narrowly truthful Organization/WebSite structured data; approved guides use Article metadata with a named author, visible update date and matching visible copy. The static guide route remains empty until reviewed content exists. `robots.txt` allows public crawlers and excludes only private API/dashboard surfaces. Search inclusion and AI training are separate policy decisions: retain `OAI-SearchBot` access for ChatGPT search, and decide any `GPTBot` training directive explicitly with the founders. Do not add `llms.txt`, fabricated reviews/results, FAQ markup, generic AI-tool pages or mass keyword variants as discovery tactics.
