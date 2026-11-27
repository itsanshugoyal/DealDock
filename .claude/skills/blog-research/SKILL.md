---
name: blog-research
description: Research DealDock blog topics before anything is written. Reuse saved research, measure real search demand (autocomplete, People Also Ask, Reddit), map who ranks and how weak page one is, score winnability, check cannibalisation, build a primary-source dossier, and write a brief to docs/seo/briefs/<slug>.md. Also refreshes the AI-search evidence and competitor landscape. Use for "research blog topics", "what should we write next", "brief for <topic>", "refresh SEO research", or as step 1 of /search-growth.
---

# Blog research

Output: one brief per topic in `docs/seo/briefs/<slug>.md`, good enough that a writer agent (the `blog-write` skill) can produce an article that answers its question better than anything online. Research is only useful if it changes what gets written. Keep it specific and cite everything.

## Step 0: start from what we already know (always)
Read these before searching the web, and don't redo work that's still fresh:
- `docs/seo/research/ai-search-evidence-*.md`: what ranks and gets cited (newest file wins)
- `docs/seo/research/query-landscape-*.md`: query clusters, who ranks, competitors, gaps
- `docs/seo/research/lessons-first-batch-2026-11.md`: research shortcuts and pitfalls
- `docs/seo/content-queue.md`: live, in-review and idea topics
- `src/lib/blog-posts.ts`: every registered post (cannibalisation check)
- `docs/seo/briefs/`: earlier briefs (reuse their source lists)
- `docs/seo/ai-visibility-log.md`: prompts where we're absent
- Live CRM content tasks: `node scripts/crm-mcp.mjs tasks "content|SEO|article"`
- Local plan, if present: `docs/site-plan/dealdock-search-plan.html`

Research files older than ~3 months: refresh the relevant part (Step 6), saved as a new dated file.

## Step 1: demand evidence (free tools only)
- Google autocomplete, US and India:
  `curl -s "https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=<query>"` (and `gl=in`). Try "<seed> a…z", question prefixes (how, why, what, can, should) and "<seed> reddit".
- People Also Ask and related searches via WebSearch.
- Reddit and community threads: the `last30days` skill, or WebSearch `site:reddit.com <query>`. Note the exact phrases creators use.
- No invented search volumes. Describe demand qualitatively and give the evidence (number of autocomplete variants, threads, PAA).

## Step 2: who ranks now and how weak it is
For the 3–6 most valuable queries, WebSearch them and record the top results: domain, page type (vendor blog, listicle, Reddit, YouTube, government, template marketplace) and quality (thin, outdated, written for brands rather than creators, no sources). Note whether an AI Overview is likely: question and comparison queries mostly trigger one. WebSearch is a proxy for Google; say so.

## Step 3: score winnability (0–2 each, publish only at 8+ of 12)
| Factor | 0 | 2 |
|---|---|---|
| Page-one weakness | Strong brands, deep guides | Thin blogs, AI template pages, wrong intent |
| Money at stake for the reader | Curiosity | Lost deal, unpaid invoice, missed buyer |
| DealDock fit | Unrelated | The answer shows the job DealDock does |
| AI-answer likelihood | Navigational | Question or comparison phrasing |
| Primary sources exist | Opinion only | Official docs, laws, help centres to cite |
| No cannibalisation | Overlaps a live post | Distinct question; links to siblings |

If it overlaps a live post, recommend a **refresh** of that post instead.

## Step 4: primary-source dossier
List the official sources the writer must verify: Meta Help Center article ids, developer docs, statutes, regulator guidance, vendors' own docs. For each, note how to read it:
- help.instagram.com/<id> → read via facebook.com/help/instagram/<id>
- government 403s → the department's explainer page or the official gazette
- Never spoof user agents.

Flag topics that need a specialist fact-check (legal, tax, named vendors, a tool with maths).

## Step 5: write the brief
Copy `brief-template.md` (this folder) to `docs/seo/briefs/<slug>.md` and fill every section. Then set or add the row in `docs/seo/content-queue.md` to `briefed`.

## Step 6: refreshing the big-picture research (quarterly)
Use the prompts in `prompts.md`: **AI-search evidence refresh** and **landscape refresh**. Run them as two parallel background subagents (`general-purpose`). Save their reports as new dated files in `docs/seo/research/` and update `content-queue.md` ideas from the gaps they find.

## Parallel research for several topics
Spawn one `general-purpose` background agent per topic with the **Topic research** prompt in `prompts.md`. Each writes its own brief file. You then review the briefs, rank them by score, and pick the batch. If an agent stops at a usage limit or stalls, resume it with SendMessage; don't respawn it.
