<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Blog, SEO and AI-search work

For any blog post, free tool, SEO, ranking or AI-citation (ChatGPT, Perplexity, AI Overviews) task, use the project skills in `.claude/skills/` instead of improvising:

- `search-growth`: start here. The orchestrator, the weekly loop and technical SEO; it routes to the others.
- `blog-research`: demand, competitors, winnability, source dossier and the brief in `docs/seo/briefs/`; refreshes the research in `docs/seo/research/`.
- `blog-write`: writer subagents using `blog-write/writing-brief.md` and `assignment-template.md` (the November 2026 quality bar).
- `blog-verify`: independent fact-check subagents, build, `scripts/verify-blog.mjs`, visual checks.
- `blog-publish`: push the content branch (never open a PR or merge content), REVIEW-NOTES, founder-crm tasks, post-merge IndexNow.
- `seo-offsite`: listings, roundups, profiles, communities and the DealDock name clash.

Rules that always apply:
- Articles and page copy are reviewed and merged by a founder.
- Every claim is verified on a primary source.
- The CRM is founder-crm (`scripts/crm-mcp.mjs`); Airtable is a read-only archive.
- Do the work in a git worktree from `origin/main`.
