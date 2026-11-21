# Authoring DealDock posts

Each `<slug>.mdx` file is the single source for an article and its metadata.
All `.mdx` files are discovered automatically. There is no manual post list.
The filename becomes `/blog/<slug>`; preserve existing filenames to keep URLs stable.

```md
---
title: Your specific article title
description: An accurate description for search results and article cards.
topic: Instagram DMs
publishedAt: '2026-11-22'
updatedAt: '2026-11-22'
status: draft
faqs: []
---

Start with an introduction. The shared layout renders the title.

## First section

Write your article in Markdown here.
```

1. Add one MDX file using a unique lowercase, hyphenated filename.
2. Choose `Brand deals`, `Coaching and courses`, or `Instagram DMs` as its topic.
3. Keep dates quoted, in `YYYY-MM-DD` format. Update `updatedAt` when revising.
4. Preview drafts with `npm run dev`. Drafts have a visible notice and noindex metadata.
   They are excluded from production routes, lists, related links, and the sitemap.
5. After editorial approval, set `status: published`. Run `npm run blog:check`,
   `npm run lint`, and `npm run build`, then commit the content and any assets together.
6. Push to the branch used by your deployment. A deployment of an older branch
   cannot include content that exists only on another branch.

GitHub Actions runs the content check and production build on every push and PR.
For a running production preview, also run
`npm run blog:check -- --url=http://127.0.0.1:3000` to verify all public URLs,
canonicals, FAQs, structured data, share cards and sitemap entries.

The shared loader drives the blog index, article route, metadata, share cards,
related reading and sitemap. Missing metadata and broken image references fail checks.
MDX is repository-owned executable content: never compile untrusted user input.
The renderer blocks JavaScript expressions and imports; use plain Markdown with tables.

## Images and downloads

Images are optional. Add each article's images under `public/blog/<slug>/`, and
reference them using `/blog/<slug>/hero.webp`. Do not reuse another post's image
as a misleading fallback. A generated text share card is available without an image.

Optional frontmatter:

```yaml
thumbnail: /blog/your-slug/card.webp
image:
  url: /blog/your-slug/hero.webp
  alt: A precise description of what is visible
faqs:
  - question: A relevant question?
    answer: A complete answer shown on the page and in structured data.
```

Use `![Descriptive alt text](/blog/your-slug/hero.webp)` in the body.
Downloads belong in `public/blog/<slug>/` and use normal Markdown links.
Every published article needs at least two distinct images inside the article
body: an article illustration and a second image explaining a relevant section.
Use descriptive alt text and place the second image beside the section it
supports. Blog cards and social previews do not count as body images.
`npm run blog:check` enforces the minimum for published posts.

Choose a distinct visual concept for each cover. Existing examples include a red
overdue invoice, a blue tracking ledger, a coaching conversation, and a day/night
inbox routine. Vary the subject, composition and dominant colour so thumbnails
are easy to tell apart. Avoid a repeated laptop/phone/plant workspace for every
article and glossy 3D AI graphics. Use textured editorial illustrations or
tactile paperwork imagery, following the examples recorded in
`docs/seo/blog-image-prompts-v2.json` and the latest additions and brand-deals
replacement in `docs/seo/blog-image-prompts-v3.json`. Save replacements with versioned filenames
and update both the frontmatter and the body image reference.

## Migration provenance

Seven articles were recovered from the existing published DealDock site using
`scripts/import-live-blog.mjs`; `sourceUrl` records their original URLs. Published
dates, copy, FAQs, links and available assets were retained. Shared page chrome
was removed and is supplied by the reusable renderer. Publication status follows
the existing public deployment. No new editorial content or images were generated.
The importer refuses to overwrite MDX files and never runs during a build.
