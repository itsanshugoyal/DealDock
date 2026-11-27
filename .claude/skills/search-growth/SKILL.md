---
name: search-growth
description: Orchestrates DealDock's Google and AI-search growth for dealdock.io and routes to the specialist skills (blog-research, blog-write, blog-verify, blog-publish, seo-offsite). Runs the weekly loop (health check, indexing pings, AI-answer prompt panel, next article, listings, CRM) and technical SEO changes. Use for "/search-growth", "SEO", "rank on Google", "get cited by ChatGPT/Perplexity/AI Overviews", "improve rankings", "write the next blog posts", "refresh the blog", "what should we do for SEO this week".
---

# Search growth for dealdock.io

Goal: rank on Google for narrow creator questions, and get DealDock named and cited by ChatGPT, Perplexity, Gemini, Claude, Copilot and Google AI Overviews.

## The skill suite
| Need | Skill |
|---|---|
| Choose topics, measure demand, map competitors, write briefs, refresh the research | `blog-research` |
| Write articles and free tools at the November 2026 quality bar (writer subagents) | `blog-write` |
| Independent fact-checks, build, automated and visual checks | `blog-verify` |
| Push for founder review, REVIEW-NOTES, CRM, post-merge IndexNow | `blog-publish` |
| Listings, roundups, profiles, communities, name clash, entity signals | `seo-offsite` |
| Weekly loop, technical SEO, AI-visibility panel, routing | this skill |

A full content batch: `blog-research` → `blog-write` → `blog-verify` → `blog-publish`. Don't skip `blog-verify`.

## Ground rules (founder decisions)
1. Content (articles, tools, page copy) may be pushed to a branch but is **never PR'd or merged by Claude**. Infrastructure may be merged after checks.
2. Home, `/in` and global-site copy belong to the redesign. Note changes in `docs/seo/redesign-merge-notes.md`.
3. Every claim is verified on a primary source. No invented stats, studies, quotes, customers or results. DealDock is described only as a pilot that is "built to…".
4. Brand-led articles (author DealDock): `src/app/blog/AGENTS.md`.
5. No paid APIs, paid tools or paid listings without founder approval.
6. No security details in public places. Don't spoof user agents. If the permission classifier blocks something, ask a founder.
7. The CRM is founder-crm via `scripts/crm-mcp.mjs`. Airtable is a read-only archive.
8. Work in a git worktree from `origin/main`, never in Anshu's main checkout (it holds the uncommitted redesign).

## What we know (read before deciding anything)
- `docs/seo/research/ai-search-evidence-*.md`: what ranks and gets cited, strong / mixed / myth.
- `docs/seo/research/query-landscape-*.md`: queries, competitors, gaps.
- `docs/seo/research/lessons-first-batch-2026-11.md`: what made the first batch good, and the pitfalls.
- `docs/seo/content-queue.md`, `docs/seo/ai-visibility-log.md`, `docs/seo/listing-kit.md`, `docs/seo/redesign-merge-notes.md`.
- Local plan: `docs/site-plan/dealdock-search-plan.html`.

In short:
- **Works:** being indexed with crawlers allowed; being named on third-party lists and roundups; ranking for the question and its sub-questions; answer-first, self-contained passages; genuine YouTube and Reddit presence.
- **Doesn't:** llms.txt, schema as a citation trick, stuffing statistics, self-ranked "best tools" lists, date bumps.

## Map of the site plumbing
| What | Where |
|---|---|
| Post registry (feeds pages, /blog, sitemap, related links, /og cards) | `src/lib/blog-posts.ts` |
| Article shell (BlogPosting and FAQPage data, pilot card, related posts) | `src/components/marketing/blog-article.tsx` |
| Organization / WebSite schema (descriptor, sameAs) | `src/components/marketing/structured-data.tsx` |
| Robots (all crawlers allowed, by decision) and sitemap | `src/app/robots.ts`, `src/app/sitemap.ts` |
| Live site health (read-only) | `node scripts/seo-health.mjs [origin]` |
| Blog and tool page checks (local or live) | `node scripts/verify-blog.mjs [base]` |
| IndexNow pings (after a deploy) | `node scripts/indexnow.mjs [urls]` |
| CRM tasks | `node scripts/crm-mcp.mjs tasks / plan` |

## Weekly loop (default when no mode is named)
1. **Health:** `node scripts/seo-health.mjs` and `node scripts/verify-blog.mjs`. Fix infrastructure failures through an infrastructure PR (`blog-publish`). Report content failures to the founders.
2. **Indexing:** IndexNow for URLs that are new or changed since last week. Ask the founders to request indexing in Search Console.
3. **Prompt panel:** follow `docs/seo/ai-visibility-log.md`. Browser-only engines (ChatGPT, Perplexity, Gemini, Copilot, Google AI Mode) are run by a founder, or by Claude only if a browser tool such as Claude in Chrome is connected. Otherwise run WebSearch as a proxy and label those rows "proxy". Log the weekly totals.
4. **Content:** take the top-scored `briefed` or `idea` row from `docs/seo/content-queue.md`. Run `blog-research` if there's no brief, then `blog-write` → `blog-verify` → `blog-publish`. One to three excellent pieces beat many thin ones. Refresh live posts that are slipping in Search Console, or whose facts went stale (quarterly).
5. **Distribution:** run `seo-offsite` for the next one or two listings, roundups or profile tasks.
6. **CRM and report:** update the founder-crm tasks (the weekly-loop task, content tasks). End with a short report: what changed, what's waiting on the founders, the panel trend, and what's next.

## Technical SEO changes
Read `node_modules/next/dist/docs/` first; this version of Next.js differs from older ones. Work on a branch, then:
- build;
- check locally with `next start` plus `verify-blog.mjs`/`seo-health.mjs`;
- PR with a neutral description, wait for every check, merge;
- re-check production.

Keep structured data in step with the visible content. Ideas still open: `SoftwareApplication` on the home page (via the redesign notes); `sameAs` once profiles exist; per-post illustrations (no stock or highlighter look).
