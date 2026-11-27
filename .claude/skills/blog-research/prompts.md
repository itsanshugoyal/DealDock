# Research subagent prompts

Spawn each as a `general-purpose` agent with `run_in_background: true`. Fill in the `<…>` placeholders. These are the prompts that produced the November 2026 research (`docs/seo/research/`), generalised. Replace `<repo>` with the absolute path of the checkout (e.g. `C:/code/DealDock` or a worktree).

---

## A. Topic research (one agent per topic)

```
Research one blog topic for DealDock and write a brief that a writer agent will turn into the best answer on the web.

DealDock is an inbox for solo creators' Instagram DMs (coaches, course and cohort sellers, and creators who handle brand deals; US roughly 20K–500K followers, plus an India page in rupees and Hinglish). Its pilot is built to sort conversations by type and estimated value, draft replies in the creator's own voice, send nothing without approval, nudge quiet threads and track deals from agreed to paid. It is application-only and has no customers, reviews or results yet. It is not comment-to-DM automation, bulk outreach, scheduling, invoicing or payment collection.

Topic: <topic or seed question>
Audience: <coaches / brand-deal creators / India Hinglish>
Repo: <repo>

First read, in the repo:
- .claude/skills/blog-research/SKILL.md (method and scoring)
- .claude/skills/blog-research/brief-template.md (the output format)
- docs/seo/research/ (existing evidence; don't redo fresh work)
- docs/seo/content-queue.md and src/lib/blog-posts.ts (avoid overlapping live posts)

Then:
1. Demand. Google autocomplete for US and India: curl "https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=<q>" (and gl=in) with alphabet and question-word variations. Also People Also Ask via WebSearch, and Reddit threads. Use real phrasings only, and don't invent volumes.
2. Competition. For the 3–6 best queries, record the top results, their page type and weakness. Say that WebSearch stands in for Google.
3. Score winnability with the rubric in SKILL.md, and check cannibalisation against live posts.
4. Primary-source dossier: official pages the writer must verify (Meta Help Center ids, developer docs, laws, regulators, vendors' own docs), and how to read each. help.instagram.com/<id> can be read at facebook.com/help/instagram/<id>. Never spoof a browser user agent to get past a block.
5. Write the brief to docs/seo/briefs/<slug>.md, following the template exactly.

Don't edit any other file. Don't commit or push.
Report back in under 300 words: slug, the question, score breakdown, the 3 strongest searches with evidence, the weakest competitor you'd beat, and any risk (legal, tax, vendor, product claim) needing a specialist fact-check.
```

---

## B. AI-search evidence refresh (quarterly)

```
Research question: as of <month year>, what actually gets a new, small B2B SaaS website (a) ranked in Google and (b) cited or recommended by AI answer engines: ChatGPT (search and plain answers), Google AI Overviews and AI Mode, Perplexity, Gemini, Claude and Microsoft Copilot?

Context: dealdock.io is a young SaaS for Instagram creators, with a blog and a free tool. Read the previous findings first: <repo>/docs/seo/research/ai-search-evidence-<latest>.md. Report what has changed since then, not a restatement.

Cover, with source URLs and dates:
1. Official guidance: Google Search Central on AI features; OpenAI's crawlers (OAI-SearchBot, GPTBot, ChatGPT-User); PerplexityBot; Anthropic's ClaudeBot and Claude-SearchBot; Bing Webmaster Tools and IndexNow; Google-Extended.
2. Data studies from the last 12 months (Ahrefs, Semrush, SE Ranking, Profound, BrightEdge, Seer and others): which domains and source types get cited; overlap with Google's top 10; brand mentions vs backlinks; freshness; content structure; schema and llms.txt effects.
3. Community findings (Reddit r/SEO, r/bigseo, r/SaaS; Hacker News; practitioners on X and LinkedIn): what worked for startups, and what turned out to be a myth.
4. How a new domain breaks in, and how long it takes.
5. Measurement: Search Console and Bing AI reports, GA4 setup, prompt panels.

Output: tactics ranked strong / mixed / myth, each with a one-line reason and its URL(s). Flag anything stale. Don't recommend tactics that need fake reviews or fabricated content. Under 1,300 words.
Then save it as <repo>/docs/seo/research/ai-search-evidence-<yyyy-mm>.md, in the same structure as the previous file. Don't commit.
```

---

## C. Query and competitor landscape refresh (quarterly)

```
I'm updating DealDock's SEO and AI-search plan and need the current query and competitor landscape, as of <month year>.

DealDock: <same product paragraph as prompt A>.

Read the previous landscape first: <repo>/docs/seo/research/query-landscape-<latest>.md, and the live and in-review posts in <repo>/docs/seo/content-queue.md. Report changes and new opportunities.

Research with WebSearch, WebFetch and Google autocomplete (curl suggestqueries.google.com, gl=us and gl=in):
1. Real queries in each cluster: replying to brands, pricing and usage rights, tracking, late payment, inbox and DM management, AI replies, comparisons, India/Hinglish, and owned-offer (coaches selling programs).
2. For about 8 of the most valuable queries: who is on page one now, and which source types dominate. WebSearch stands in for Google; say so.
3. Competitors and adjacent tools: what content they publish that ranks or gets cited, any new entrants, and the gaps DealDock could own. Name a gap only if DealDock's real features support it.
4. Free listings, roundups, newsletters and communities, with each one's current submission rules.

Output: compact tables plus a "biggest opportunities" list, with URLs. Don't invent search volumes. Under 1,300 words.
Save it as <repo>/docs/seo/research/query-landscape-<yyyy-mm>.md. Don't commit.
```
