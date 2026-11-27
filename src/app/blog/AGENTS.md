# DealDock blog conventions

Write and verify posts with the project skills: `blog-research` → `blog-write` → `blog-verify` → `blog-publish` (start from `search-growth`). They hold the writing brief, subagent prompts and checks behind the November 2026 articles.

Use `content/blog/influencer-brand-dms.mdx` as an editorial reference. Read `content/blog/README.md` before adding posts.

## Routes and reusable layout

- Put each article and its metadata in `content/blog/<slug>.mdx`. The shared `[slug]/page.tsx` route creates its `/blog/<slug>` URL automatically. Never add separate per-post routes or a manual post registry.
- The shared dynamic route uses `BlogArticle` for layout and expandable FAQs. Put FAQ questions and answers in the MDX frontmatter.
- Reuse `@/components/marketing/blog-article.module.css` for illustrations and shared article styling. The existing MarketingDocument supplies the DealDock header/footer, typography, colours and reading width.
- Keep responsive images descriptive, sized correctly and styled with `illustration`. Preserve the shared FAQ keyboard focus treatment and native details/summary interaction.
- Do not duplicate article CSS for each post. Keep common visual changes in the shared component and stylesheet.

## Editorial structure and voice

- Start with a recognisable creator situation, then explain the problem in connected, conversational paragraphs.
- Use helpful section headings, concrete campaign or enquiry examples, short sample replies and distinct illustrations where they clarify the story.
- End with relevant questions using the shared FAQ. Choose questions for the topic rather than copying the reference questions unchanged.
- Keep the voice natural and useful. Avoid repetitive rhetorical questions, formulaic reveals, corporate filler, manufactured results and unsupported promises.
- Public-facing content is brand-led: use DealDock attribution rather than a founder's name, face, personal story or voice.
- Distinguish planned product capabilities from verified availability. Estimates, deal agreements and payments are different states. Never invent customer messages or results.

## Metadata and validation

- Provide a unique title, description, canonical and appropriate share image. Keep BlogPosting data aligned with the visible content; FAQ data must match visible FAQs.
- Preserve draft/noindex status until publication is explicitly approved. Publishing approval should include checking indexing, dates and sitemap inclusion; moving a URL alone is not that approval.
- Check lint/types, HTTP response, canonical, image loading, responsive layout and FAQ behaviour. Preserve unrelated local changes and stage only the requested blog work.
