# Review notes: <batch name>

For Anshu (and Nahush) before merging. Written <date> by Claude. Not committed; delete when done.

## What's here (branch `seo/<batch>`, pushed, no PR)

Every piece was researched and drafted by a writer agent, then edited by a separate fact-check agent that opened every cited source.

| Page | Title | Body words | Sources |
|---|---|---|---|
| `/blog/<slug>` | <title> | ~<n> | <n> (<kinds>) |

## How to preview
- Vercel preview (log in as deltaod): https://dealdock-website-git-<branch-with-dashes>-delta-7460.vercel.app/blog
- Locally: `cd <worktree> && npm run dev`, then http://localhost:3000/blog

To publish: commit your edits, `git push`, then open the PR yourself (GitHub, or `gh pr create --base main --head seo/<batch>`). Merge it once the preview checks pass. Then tell Claude "it's merged, finish publishing" (the blog-publish skill, step 4).

## Decisions only you can make

**Product truth**
1. <claim about DealDock behaviour the article relies on, and the question to confirm>

**Legal and tax (worth a professional's glance)**
2. <points the fact-checker listed for a lawyer or CA>

**Tools**
3. <modelling choices, defaults, currency>

**Small things**
4. <naming real companies, link choices, example handles>

## Fact-check changes, in brief
- **<slug>:** <one line per material fix>
