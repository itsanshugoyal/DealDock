# DealDock public marketing design

This governs the marketing website. Authenticated product design remains in C:/code/dealdock-app/DESIGN.md.

## Accepted design — 2026-10-13

The user approved completing the conversation-led design. It now serves /; /design-preview preserves existing review links. /global permanently redirects to /. The previous design lives at /original, with a persistent notice that its claims, figures and testimonials are unverified. Do not use the archive in acquisition campaigns.

Keep the cool paper canvas (#f3f4ef), dark type (#191d1b), signal yellow (#f9d84a), Geist Sans and Geist Mono. The oversized headline, conversation illustration, dark approval section and yellow pilot panel create the rhythm. Illustrations explain decisions; label messages, estimates and recorded sales as illustrative. No invented customers, testimonials, counts or revenue outcomes.

Narrative: hero → missed conversations → approval-required workflow → recorded outcomes → fit → Solo offer → FAQ → application. Use native controls, visible focus, skip link, sticky navigation and readable mobile stacking. Maintain a single-column form, 16px mobile inputs, associated errors and focused receipt headings.

## Initial positioning

The first cohort targets coaches, course sellers and cohort hosts selling their own offers through Instagram. First 10 design partners is a goal, not an existing customer count. Brand-deal-only creators have a separate future-interest option. Product brand-classification requirements remain unchanged.

DealDock never auto-sends messages. Every send requires human approval, including follow-up drafts. Keep this visible in hero, workflow, unsent example, FAQ and terms. Estimated deal values and creator-recorded sales are distinct; an estimate is not recovered revenue.

## Conversion and trust

Primary CTAs lead to #apply. State early-pilot status, fixed Solo pricing of ₹4,000/month in INR or USD $49/month internationally for one account, first invoice after one full week of active use, no setup fee, cancellation and retained pilot pricing. Confirm compatibility, access, billing currency, invoice coverage, first-week treatment, taxes and written terms before onboarding. A delayed invoice is not an agreed free trial. Do not imply immediate self-serve access or a verified, shipped integration.

Ask for email, Instagram username and offer type; a note is optional. No payment or connection during application. An online receipt means a private record was saved. Retries are idempotent. Failures preserve details with retry/email alternatives. Email fallback prepares a visitor-controlled draft to itsanshugoyal2@gmail.com; preparing it is not a send or receipt. JavaScript-disabled visitors get direct email contact.

Support routes: /privacy, /pilot-terms, /contact. These website/pilot explanations do not substitute for the product agreement or Instagram data terms.

## Publication and measurement

Deploy only the marketing allowlist with scripts/prepare-pilot-website.mjs. Only POST /api/pilot-application and GET /api/marketing-currency are allowed server-side. Credentials, private exports, internal APIs, dashboards and research must not enter the upload.

The review stays noindex until a commercial plan and canonical launch domain are agreed. SITE_URL supplies canonical, sitemap and social URLs. MARKETING_SITE_LIVE=true enables indexing; preview/archive remain noindex.

Basic Vercel Web Analytics is mounted on the live public site. URL queries/fragments are removed; categorical event helpers exclude form content and references. Custom Vercel events stay disabled on Hobby. Google Tag Manager container `GTM-MXV6HLJT` is loaded only on the live public site; it receives no application fields, references or DM content from DealDock. Count actual saved applications separately from email drafts. No conversion uplift is claimed before real visitor evidence.

## Search, answer-engine and crawler foundation — 2026-10-27

Public discovery relies on ordinary crawlable, useful pages rather than a separate AI-ranking mechanism. The homepage publishes narrowly truthful Organization/WebSite structured data; approved guides use Article metadata with a named author, visible update date and matching visible copy. The static guide route and sitemap intentionally remain empty until reviewed content exists. `robots.txt` allows public crawlers and excludes only private API/dashboard surfaces. Search inclusion and AI training are separate policy decisions: retain `OAI-SearchBot` access for ChatGPT search, and decide any `GPTBot` training directive explicitly with the founders. Do not add `llms.txt`, fabricated reviews/results, FAQ markup, generic AI-tool pages or mass keyword variants as discovery tactics.

## UX and conversion refinement — 2026-10-14

Use the installed design-taste-frontend, CRO/form, web-design-guidelines and baseline-ui skills as review aids; the approved brand and project conventions take precedence over their generic layout/motion prescriptions. Keep the headline and visual direction. State the Instagram sales-inbox workflow prominently, disclose Solo pricing near the first CTA, and make approval, compatibility, cost and next steps the first FAQ topics. Decision text, form labels and terms need readable sizes rather than tiny decorative labels.

Keep three required fields. Corrected errors clear individually without validating untouched fields; validation is announced and focuses the first invalid field. Privacy details open in a clearly labeled new tab to preserve the draft. Brand-only selection changes the CTA and explanation to future interest, with a separate receipt that does not imply first-cohort onboarding. No extra personal-data persistence, account signup, auto-send, checkout or claimed conversion uplift is introduced.

## Regional pricing — approved 2026-10-14

Keep one public Solo card. India-first now includes applications for selected international validation pilots in the same own-offer ICP; account compatibility, language, timing and billing availability are reviewed before acceptance. Studio and Roster remain product packaging proposals, not verified public offers. A small contact link accommodates assistants and multiple-account enquiries.

Render both fixed prices before JavaScript or when location is unavailable. The non-cached same-origin currency endpoint reads Vercel's country hint: IN suggests INR, other known countries suggest USD, unknown returns null. It returns no country/IP and performs no external lookup or storage. A native radio selector overrides any pending suggestion and saves only a manual currency preference in localStorage when available. Detection times out after 2.5 seconds; blocked storage/network must not prevent application. Keep the homepage statically rendered; do not use request headers in the page itself.

Share display currency across hero, price card, FAQ, sample enquiry values, sample ledger and application disclosure. Persist the choice across terms navigation. USD examples are independent illustrative values, never FX conversions or claimed outcomes. A display preference does not change an organization's ledger currency or establish billing eligibility. No live FX, new checkout, extra required form field or unrestricted global-access promise.

Known Solo application currencies are saved with a server-owned price/version snapshot; caller-provided amounts are ignored. No selection keeps legacy applications valid without silently assigning a currency. Brand-only future interest is never quoted a Solo subscription. Categorical currency events remain gated off on Hobby; stage counts and private records support INR/USD learning without new tracking identifiers.
