---
name: blog-write
description: Write DealDock blog articles and free tools at the quality of the November 2026 batch. Sets up a content branch, registers posts, spawns one writer subagent per article with the shared writing brief plus a precise assignment, handles stalls and limits, and collects final titles, descriptions and source lists for verification. Use for "write a blog", "write articles about…", "build a free tool/calculator page", "refresh the article on…", or as step 2 of /search-growth. Always followed by blog-verify, then blog-publish.
---

# Blog writing

The process that produced seven articles and a calculator the founders rated "really good". Don't shortcut it: the quality comes from the brief, the precise assignment, primary-source research and the separate verification step (`blog-verify`).

## Rules
- Articles, tools and page copy are **never PR'd or merged by Claude**. They go on a content branch, which may be pushed; a founder reviews, edits, opens the PR and merges. See `blog-publish`.
- Home, `/in` and global-site copy belong to the redesign. Record those changes in `docs/seo/redesign-merge-notes.md` instead.
- Brand-led attribution (author: DealDock), no founder bylines: `src/app/blog/AGENTS.md`.
- Every claim is verified on a primary source, and DealDock is described only as the brief allows.

## Inputs
For each piece, a brief in `docs/seo/briefs/<slug>.md`, from the `blog-research` skill. If there's none, run `blog-research` first. For a quick single article you may write the assignment straight from your own research, but still cover the brief's sections.

## Step 1: set up an isolated content branch
```
git fetch origin
git worktree add -b seo/<batch-name> ../DealDock-<batch-name> origin/main
cd ../DealDock-<batch-name> && npm ci
```
Work only there; Anshu's main checkout holds an uncommitted redesign. Never edit tracked files there.

## Step 2: register every post before writing
Add one entry per post to `blogPosts` in `src/lib/blog-posts.ts` (newest first):
- `slug`, a working `title` (≤ 65 characters, containing the main search phrase), `description` (120–155 characters), `topic`;
- `publishedAt` and `updatedAt` set to today;
- `inLanguage: "hi-Latn"` for Hinglish.

Free tools go in `freeTools` (`href`, `title`, `description`, `updatedAt`). Pages read their title and dates from the registry, so this must happen first.

## Step 3: spawn the writers (one per piece, in parallel)
Use `general-purpose` agents with `run_in_background: true`. Build each prompt from `assignment-template.md`:
- the fixed opening line pointing at `<worktree>/.claude/skills/blog-write/writing-brief.md`;
- the assignment block filled in from the brief: slug and file, working title, the single question, searches to win, a "Cover" list with specifics, sources to verify, internal links;
- for a free tool, the tool variant in `assignment-template.md`.

`assignment-template.md` also holds the eight real assignments from November 2026 as examples. Match their level of specificity.

While the writers work:
- Don't touch tracked files (registry, components, branch switches); their type checks and dev-server checks depend on them.
- If an agent stops at a usage limit or stalls ("no progress for 600s"), its files are saved. Resume it with SendMessage: "Resume: you were stopped at <step>. Your file <path> is saved. Finish <remaining steps>, run `timeout 300 npx tsc --noEmit -p .` in the foreground, and send your final report." Never respawn from scratch.

## Step 4: collect the reports
Each writer reports: final title and description, word count, target queries, every source URL, unverifiable claims, and questions for the founders. Keep these notes; `blog-verify` and `REVIEW-NOTES.md` need them. Update the registry with the final titles and descriptions once all writers have finished.

Then run the `blog-verify` skill. Don't publish anything unverified.

## Refreshing an existing article
Use the same process with a refresh assignment: "Improve `/blog/<slug>`. Keep the URL and voice; recheck every fact and menu name against current primary sources; answer the question better than the current page one, per the new brief; and update or add sections, templates and FAQs." Change `updatedAt` only for material changes.
