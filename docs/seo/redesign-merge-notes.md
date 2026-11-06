# Search notes for the landing-page redesign merge

The redesign (home page, `/in`, global site) is being finished in Anshu's local checkout and will be merged later. Its home page and copy were deliberately left untouched in the search work. Everything below is what the redesign needs to carry so search and AI engines understand the page. The blog, tools and plumbing are already on `main`.

Written 7 November 2026. Plan: `docs/site-plan/dealdock-search-plan.html` (local) · Queue: `docs/seo/content-queue.md`.

## 1. Home page copy (`/` and `/in`)

| Element | Now (redesign draft) | Change |
|---|---|---|
| `<title>` | DealDock: your Instagram DMs, sorted by money | Keep, or use "DealDock: Instagram DM inbox for creators, sorted by money" (57 chars). It must contain "Instagram DM(s)" and, ideally, "creators". |
| Meta description | "DealDock sorts your Instagram DMs by what they're worth…" | Keep. It already answers what it is. |
| H1 | Brand line | Fine to keep a brand line, as long as the hero subhead or first paragraph contains the plain definition below. |
| Definition sentence | Missing | Add it visibly near the top, word for word or close: **"DealDock is an Instagram DM inbox for creators who sell coaching, courses and brand collaborations."** AI answers quote definitions like this, and it separates us from the other DealDocks. |
| FAQ | 11 questions, rendered in the HTML | Add **"What is DealDock?"** as the first question, with the definition plus one line on approval ("Nothing sends until you approve it"). Keep all answers in the server HTML (they are now). |
| Footer and nav | No link to guides | Add **Guides → `/blog`** and, once the reviewed content is merged, **Rate calculator → `/tools/brand-deal-rate-calculator`** to the footer. A nav link is optional. These are the internal links that pass the home page's authority to the articles. |
| `/in` | en-IN copy | Link to `/blog/barter-vs-paid-collab` (Hinglish) from the India page. |

The same descriptor is used everywhere else (schema, listings, profiles); see `docs/seo/listing-kit.md`.

## 2. Home page structured data

- `MarketingWebsiteStructuredData` (Organization + WebSite) is already on `main`, with `alternateName`, logo, topics and a `disambiguatingDescription`. Keep rendering it on `/` and `/in`.
- Add a `SoftwareApplication` node on the home page whose offers **match the visible pricing exactly** (only plans and prices shown on the page; currency per page, USD on `/`, INR on `/in`):

```json
{
  "@type": "SoftwareApplication",
  "@id": "https://dealdock.io/#app",
  "name": "DealDock",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Instagram DM inbox for creators who sell: sorts conversations by estimated value, drafts replies in the creator's voice, and sends nothing without approval.",
  "publisher": { "@id": "https://dealdock.io#organization" },
  "offers": [
    { "@type": "Offer", "name": "Solo", "price": "49", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Studio", "price": "99", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Roster", "price": "179", "priceCurrency": "USD" }
  ]
}
```

No `aggregateRating` or reviews until real, verifiable reviews exist.

## 3. Merging the redesign with `main`

`main` moved ahead of the local checkout (Nahush's blog article, the legacy-route fix and the search work). Expect conflicts in these files. Resolve them as follows:

| File | Keep |
|---|---|
| `src/app/sitemap.ts` | `main`'s version (registry-driven blog, `/blog`, free tools), plus the redesign's extra routes (`/in`, `/security`). |
| `src/app/layout.tsx`, `src/lib/marketing-config.ts` | The redesign's copy, but the origin fallback must stay `https://dealdock.io`. |
| `src/app/about/page.tsx` | The redesign's copy plus `main`'s "About the name" section and `<MarketingWebsiteStructuredData />`. |
| `src/components/design-preview/marketing-document.tsx` | The redesign's version plus the footer **Guides → /blog** link. |
| `src/app/api/airtable/route.ts`, `api/setup/status`, `api/n8n/workflows` | Neither side's CRM code needs to ship on the marketing site. The Airtable CRM was retired on 25 Oct (`.crm-retired.json`); the live CRM is `founder-crm`. The cleanest merge deletes `src/app/dashboard`, `src/app/api/crm`, `src/app/api/airtable`, `api/setup`, `api/n8n` and `src/lib/crm` from this repo. If anything there is still needed, keep it authenticated. |
| `/guides` (`src/lib/marketing-guides.ts`, `src/app/guides/[slug]`) | Articles live at `/blog/<slug>` (registry: `src/lib/blog-posts.ts`). Delete the empty `/guides` route or leave it empty; don't publish articles in two places. |

After merging: run `npm run build`, check `/`, `/in`, `/blog`, one article and `/sitemap.xml`, then run `node scripts/indexnow.mjs` once the deploy is live.

## 4. Deploy safety (learned 7 Nov 2026)

- Every push to `main` deploys to **three Vercel projects** (`deal-dock`, `dealdock-website` = dealdock.io, `dealdock-crm`) and a **Netlify** site (`deal-dock`).
- The `dealdock-crm` project still holds Airtable credentials. From 27 Oct until PR #2 (7 Nov) it served the legacy dashboard API from `main` without authentication. Disconnect that project from Git, or delete it, and remove its Airtable variables. Tracked as a CRM task.
- CLI deploys of the local checkout to the website project are replaced by the next Git deploy of `main`. Ship the redesign through `main`, not the CLI.
