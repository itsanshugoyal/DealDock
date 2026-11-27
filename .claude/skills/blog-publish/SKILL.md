---
name: blog-publish
description: Hand verified DealDock articles and tools to the founders and take them live after approval. Commit content on its branch and push it (never open a PR or merge content), write REVIEW-NOTES.md, update founder-crm tasks through its MCP, then after a founder merges, run IndexNow, live verification and the queue update. Also the safe path for infrastructure PRs (which may be merged). Use after blog-verify, for "publish the articles", "hand over for review", "it's merged, finish publishing", or "ship this SEO fix".
---

# Blog publishing

## Rules (founder decisions, 7 Nov 2026)
- **Content** (articles, tools, page copy): commit it to the content branch and push it. **Never open a PR and never merge.** Anshu reviews, edits, opens the PR and merges.
- **Infrastructure** (routes, schema, sitemap, scripts, docs, skills): branch → PR → wait for every check → merge. If the permission classifier blocks a merge or deploy, stop and ask a founder. Don't work around it.
- The repo is public: no security or vulnerability details in commits or PRs.
- Every push to `main` deploys four sites: Vercel `deal-dock`, `dealdock-website` (dealdock.io) and `dealdock-crm`, plus a Netlify mirror.

## Step 1: commit and push the content branch
In the content worktree, stage only the content files: the article directories, tool files, `src/lib/blog-posts.ts`, `.gitattributes` and any template downloads. Then:
```
git commit -m "content: <what> (for founder review)"   # end with the Co-Authored-By line
git push -u origin seo/<batch>
```
If `next dev` regenerated the block in `AGENTS.md`, committing it is fine.

Pushing makes protected Vercel previews:
- https://dealdock-website-git-<branch-with-dashes>-delta-7460.vercel.app (log in to Vercel as deltaod).
- Check the build statuses with `gh api repos/itsanshugoyal/DealDock/commits/<sha>/status --jq '.statuses[] | "\(.context)|\(.state)"'`.

## Step 2: REVIEW-NOTES.md (untracked, in the worktree root)
Fill in `review-notes-template.md`:
- what's included (title, URL, words, sources);
- how to preview and publish;
- the founder decisions grouped as product truth, legal and tax, tool modelling, and small things;
- one line per fact-check change.

This file is how the founders review quickly. Never leave a "needs founder decision" item only in chat.

## Step 3: CRM (founder-crm; Airtable is a read-only archive)
- Inspect: `node scripts/crm-mcp.mjs tasks "content|SEO|review"`.
- Write a spec (see `crm-spec-example.json`), then preview and apply:
  ```
  node scripts/crm-mcp.mjs plan spec.json
  node scripts/crm-mcp.mjs plan spec.json --apply
  ```
  It appends to existing notes, keeps the other fields, and reads the result back. For more than five writes, preview first (founder-crm's AGENTS.md rule).
- Typical writes:
  - create or update "Review and merge <batch>" (Anshu, P0, with the branch, the preview link and the REVIEW-NOTES path);
  - append progress to the content-plan task.
- Set the `docs/seo/content-queue.md` rows to `in review` (that file lives on `main`; change it in the next infrastructure PR, or in the content branch).

## Step 4: after a founder merges the content
```
node scripts/indexnow.mjs https://dealdock.io/blog/<slug> https://dealdock.io/blog https://dealdock.io/sitemap.xml
node scripts/seo-health.mjs
node scripts/verify-blog.mjs
```
`verify-blog.mjs` with no argument checks production.

Then:
- Ask the founders to use Search Console → URL Inspection → Request indexing for each new URL (it needs their login).
- Set the queue rows to `live` with the date and a refresh month.
- Add a prompt for each new topic to `docs/seo/ai-visibility-log.md`.
- Mark the CRM review task done.

## Infrastructure PR checklist
1. Work in a worktree from `origin/main`, never Anshu's main checkout (it holds the uncommitted redesign).
2. Run `npx tsc --noEmit -p .` and `npm run build` with servers stopped. Then `next start`, plus `verify-blog.mjs` or `seo-health.mjs` against localhost.
3. `gh pr create` with a neutral description and the 🤖 footer.
4. `gh pr checks <n> --watch` and let it finish. **Never pipe `--watch` into `head`**; that exits early, and a PR got merged with pending checks that way.
5. `gh pr merge <n> --merge`. Verify production with `seo-health.mjs` once it's live.
