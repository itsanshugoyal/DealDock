# DealDock public marketing design

This governs the marketing website. Authenticated product design remains in C:/code/dealdock-app/DESIGN.md.

## Current design — rebuilt 2026-11-28

`/` is the global page in US dollars; `/in` is the India page in rupees. Both render one component (src/components/landing/landing-page.tsx) from typed content (src/components/landing/content: LANDING_GLOBAL, LANDING_IN) plus per-locale settings (src/components/site/site-content.ts), and hreflang links them with `/` as x-default. The India page keeps the same design and sections; Hinglish appears only where a sender writes Hinglish and the draft mirrors them.

Look: warm paper #FBF8F2, ink #14202C, one orange accent #FF7A1A (Docky's colour) for buttons, progress and focus. Label colours stay inside product UI. Warm "stage" gradients sit behind product moments; at most one night band (#1E1A16) per page, plus the footer. Soft lift shadows and hairlines, no hard offset shadows or highlighter marks.

Type: Instrument Serif for headlines, Geist for text, Geist Mono for small uppercase labels. Motion is CSS-first, gated by reveal-on-scroll, and every view is readable with reduced motion.

Code: the tokens, header, footer, long-form document template and application form live in src/components/site/site.module.css; the landing's own parts in src/components/landing/*.module.css read the same tokens. Long pages (security, privacy, pilot terms, about, contact, blog posts, tools) use MarketingDocument: eyebrow, serif title, lede, an optional "short version" card, an optional full-width band, and numbered sections with sticky contents. The brand files are in public/brand; scripts/build-brand-icons.mjs makes the site icons from them. Share images come from one function (src/components/marketing/og-image.tsx).

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

This repository is the marketing site only; Vercel builds it from main. Only POST /api/pilot-application and GET /api/marketing-currency are allowed server-side. Credentials, private exports, internal APIs, dashboards and research must not enter the upload.

The review stays noindex until a commercial plan and canonical launch domain are agreed. SITE_URL supplies canonical, sitemap and social URLs. MARKETING_SITE_LIVE=true enables indexing.

Basic Vercel Web Analytics is mounted on the live public site. URL queries and fragments are removed; categorical event helpers exclude form content and references. Custom Vercel events stay disabled on Hobby. Google Tag Manager container `GTM-MXV6HLJT` is loaded only on the live public site; it receives no application fields, references or DM content from DealDock. Count actual saved applications separately from email drafts. No conversion uplift is claimed before real visitor evidence.

## Search, answer-engine and crawler foundation — 2026-10-27

Public discovery relies on ordinary crawlable, useful pages rather than a separate AI-ranking mechanism. The homepages publish narrowly truthful Organization/WebSite structured data; approved guides use Article metadata with a named author, visible update date and matching visible copy. Guides are the blog at /blog, published only after founder review. `robots.txt` allows public crawlers and excludes only private API/dashboard surfaces. Search inclusion and AI training are separate policy decisions: retain `OAI-SearchBot` access for ChatGPT search, and decide any `GPTBot` training directive explicitly with the founders. Do not add `llms.txt`, fabricated reviews/results, FAQ markup, generic AI-tool pages or mass keyword variants as discovery tactics.
