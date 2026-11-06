---
name: search-growth
description: Run DealDock's search and AI-visibility workflow for dealdock.io. Weekly health check, indexing pings, the AI-answer prompt panel, the next article from the content queue (drafted locally for founder review, never pushed), listings and CRM updates. Use for "/search-growth", "SEO", "rank on Google", "get cited by ChatGPT/AI Overviews", "write the next blog post", "refresh the blog", "submit to directories".
---

# Search growth for dealdock.io

Goal: rank on Google for narrow creator questions and get DealDock named and cited by ChatGPT, Perplexity, Gemini, Claude, Copilot and Google AI Overviews. What works, and what to skip, is in `docs/site-plan/dealdock-search-plan.html` (local) and summarised below.

## Ground rules (founder decisions, 7 Nov 2026)

1. **Articles, tools and any page copy are never pushed or merged by you.** Draft them on a local branch (`seo/articles` or a new `seo/<slug>` branch), build-check them and hand them to the founders to review and edit. Infrastructure (routes, schema, sitemap, scripts, docs) may be pushed, PR'd and merged.
2. Home page, `/in` and global-site copy belong to the redesign. Record changes in `docs/seo/redesign-merge-notes.md`; don't edit those pages.
3. Every claim is verified against a primary source and linked. No invented stats, studies, quotes, customers or results. DealDock is described only as the brief allows (pilot; planned vs available).
4. Articles are brand-led (author: DealDock). See `src/app/blog/AGENTS.md`.
5. No paid APIs or paid tools. No paid directory listings without founder approval.
6. Don't publish security or vulnerability details in public places (commits, PRs, issues). Report them to the founders privately.
7. Production deploys go through `main` only. Every push to `main` deploys `deal-dock`, `dealdock-website` (dealdock.io), `dealdock-crm` and a Netlify mirror.
8. The CRM is **founder-crm** (Supabase), not Airtable. Airtable is a read-only archive: never write to it.

## Map

| What | Where |
|---|---|
| Post registry (title, dates, topic; feeds pages, /blog, sitemap, share cards) | `src/lib/blog-posts.ts` |
| Article shell (schema, FAQ, pilot card, related posts) | `src/components/marketing/blog-article.tsx` |
| House rules for posts | `src/app/blog/AGENTS.md`, plus `writing-brief.md` in this skill folder |
| Queue of topics and their status | `docs/seo/content-queue.md` |
| Prompt panel and results | `docs/seo/ai-visibility-log.md` |
| Listing copy, assets, directory list | `docs/seo/listing-kit.md`, `docs/seo/assets/` |
| Notes for the redesign merge | `docs/seo/redesign-merge-notes.md` |
| Live health check (read-only) | `node scripts/seo-health.mjs` |
| Tell Bing and IndexNow engines about new URLs | `node scripts/indexnow.mjs [urls]` (needs the deploy live first) |

## Modes

Run the weekly loop unless the user names a mode.

### 1. Weekly loop
1. **Health.** `node scripts/seo-health.mjs`. Fix infrastructure failures on a branch (PR, then merge). Report content failures to the founders.
2. **Indexing.** For any URL that is new or updated since last week: `node scripts/indexnow.mjs <urls>`, and ask the founders to use URL Inspection → Request indexing in Search Console (it needs their login).
3. **Prompt panel.** Follow `docs/seo/ai-visibility-log.md`. Engines that need a browser or login (ChatGPT, Perplexity, Gemini, Copilot, Google AI Mode) are run by a founder, or by you only if a browser tool such as Claude in Chrome is connected. With WebSearch alone, run the prompts as a rough proxy (Brave-style results, close to what Claude sees) and label the rows "proxy".
4. **Content.** Take the top `idea` from `docs/seo/content-queue.md` and run mode 2. One excellent page a week beats several thin ones.
5. **Distribution.** Pick the next one or two items from `docs/seo/listing-kit.md`. Submitting needs a browser session with the brand account (dealdockai@gmail.com). If no browser tool is connected, prepare the exact copy and fields and list it as a founder action.
6. **CRM.** Update the related founder-crm tasks (mode 5). Finish with a short report: what changed, what is waiting on the founders, and the panel trend.

### 2. Write an article (local branch, founder review)
1. Check search demand and the live competition with WebSearch: page-one results, People Also Ask, Reddit threads (the `last30days` skill finds fresh ones). Confirm the topic doesn't cannibalise a live post; if it overlaps, refresh that post instead.
2. Add the post to `src/lib/blog-posts.ts` (slug, working title, description, topic, dates).
3. Delegate drafting to one subagent per article with `writing-brief.md` (this folder) as its brief, plus a short assignment: slug, the question to answer, searches to win, what to cover and the sources to verify. Give independent articles their own agents in parallel.
4. Run an **independent fact-check agent** over every draft. It opens each cited URL and checks each factual claim, especially Instagram menu names, laws, percentages and anything about DealDock. Then check the copy yourself with the `avoid-ai-writing` skill.
5. `npx tsc --noEmit -p .` and `npm run build`. Then serve it (`npm run start`) and check the page, its `/og/<slug>` image, `/blog` and `/sitemap.xml`.
6. Commit on the local branch. **Do not push.** Tell the founders how to preview it (`npm run dev` in that checkout, then `/blog/<slug>`), and set the queue row to `in review`.
7. After a founder approves and merges: run `node scripts/indexnow.mjs https://dealdock.io/blog/<slug> https://dealdock.io/blog https://dealdock.io/sitemap.xml`, set the row to `live`, and add the post to the panel if it targets a new prompt.

### 3. Refresh (quarterly, or when Search Console shows a page slipping)
Recheck facts, menu names and legal figures, improve the answer, and update `updatedAt` only for material changes. It goes to founder review like a new article.

### 4. Technical changes
Schema, routes, sitemap and performance. Read `node_modules/next/dist/docs/` first (this Next.js version differs from older ones). Work on a branch, build, and verify with a local `npm run start` and `scripts/seo-health.mjs <local origin>`. Then push, PR, check the Vercel previews and merge. After a deploy, run `node scripts/seo-health.mjs`.

### 5. CRM updates (founder-crm MCP)
founder-crm lives at `C:/code/founder-crm` (production: https://founder-crm-rouge.vercel.app). Its MCP server starts with `node scripts/mcp-launch.mjs` from that folder and reads private credential files; never print or copy them. Tools: `records_list`, `task_create`, `record_update`, `changeset_preview` and others. Task fields: `title`, `status` (`to_do`, `in-progress`, `blocked`, `done`), `ownerId` (Anshu `c32246c7-04f9-4046-a6e6-f1eff7f3e895`, Nahush `90faa550-1160-4dd3-88c3-bfa95fff6f63`), `dueAt`, and `data` {`notes`, `owner`, `scope`, `channel`, `priority`}. For more than five writes, preview with `changeset_preview`, apply, then read back. Read `C:/code/founder-crm/AGENTS.md` before writing. The relevant tasks are titled "SEO, GEO and AI content plan…", "SEO, GEO and AI technical publishing foundation…", "Align public brand and buyer-channel profiles…" and "Select and prepare first launch-directory submissions…".

## What moves the needle (evidence, Nov 2026)

- **Strong:** being indexed and letting crawlers in; being named on third-party "best X" lists and roundups; ranking for the question and its sub-questions (AI Overviews fan out); answer-first, self-contained passages.
- **Mixed:** freshness (real updates only); YouTube and Reddit presence (genuine, disclosed); G2 and Capterra (only with real reviews); honest comparison pages.
- **Skip:** llms.txt as a ranking lever, schema as a citation trick, stuffing statistics or quotes, mass self-ranked "best tools" lists, bought links, fake reviews, date bumps.
- **Name clash:** six other companies are called DealDock. Always pair the name with the descriptor "the Instagram DM inbox for creators who sell", and add each new official profile to `sameAs` in `src/components/marketing/structured-data.tsx`.
