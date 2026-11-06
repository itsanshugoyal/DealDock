# DealDock blog: shared writing brief (read all of it before writing)

You are writing one article for the DealDock blog at https://dealdock.io/blog. A founder reviews and edits it before it goes live, and it must be good enough to rank on Google and to be quoted by ChatGPT, Perplexity and Google's AI Overviews. That means the most useful, accurate, specific answer on the web for its question, written by a person who understands creators. It must not read like generic AI content.

## Repository and files
- Work only in the checkout and branch you are given (Next.js 16 App Router, React 19, TypeScript). Never push, merge or deploy.
- Read first: `src/app/blog/AGENTS.md` (house rules), `src/app/blog/influencer-brand-dms/page.tsx` (reference article: voice, structure and markup), `src/components/marketing/blog-article.tsx` and `src/lib/blog-posts.ts`.
- Your article is already registered in `src/lib/blog-posts.ts` with a working title and description. Do **not** edit that file; propose a final title and description in your report instead.
- Create only the files your assignment lists. Do not commit, push, run `next build` or start a dev server unless told to. When you finish, run `npx tsc --noEmit -p .` and fix any errors in your files.

## Page template (follow exactly)
```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { BlogArticle } from "@/components/marketing/blog-article";
import styles from "@/components/marketing/blog-article.module.css";
import { blogMetadata } from "@/lib/blog-posts";

const faqs = [
  { question: "…", answer: "…" },
];

export const metadata: Metadata = blogMetadata("<slug>");

export default function Page() {
  return <BlogArticle slug="<slug>" faqs={faqs}>
    <p>…</p>
    <h2>…</h2>
    …
  </BlogArticle>;
}
```
- `BlogArticle` already renders the H1 (title from the registry), the updated date, BlogPosting and FAQPage structured data, the FAQ accordion, a pilot call-to-action card and related posts. Do not add your own H1, JSON-LD, CTA card, author line or date.
- Allowed markup: `<p>`, `<h2>`, `<h3>` (sparingly), `<ul>`/`<ol>`/`<li>`, `<strong>`, `<em>`, `<Link href="/blog/…">` for internal links, `<a href="https://…">` for external sources, and these classes:
  - Message templates: `<p className={styles.template}><span className={styles.templateLabel}>If they haven't replied after a week</span>Hi Priya, …</p>`. `white-space: pre-line` is on, so use `{"\n"}` inside the JSX string if you need a line break.
  - Tables: `<div className={styles.tableWrap}><table><thead>…</thead><tbody>…</tbody></table></div>`. Keep them small; a table must earn its place.
- In JSX text use typographic quotes and apostrophes (’ “ ”), never raw `'` or `"`, as the reference does. Escape `{` and `}` if you need them.
- FAQ: 5–8 questions people actually ask (Google's People Also Ask, Reddit, autocomplete). Answers are plain strings of 2–4 sentences with no markup and no links. They render visibly and as FAQPage data, so the text must be identical in both.

## Audience and voice
- Readers are solo creators who sell through Instagram DMs: coaches and course or cohort sellers (roughly 20K–500K followers, many in India, many in the US), and creators who handle brand deals themselves. They read on a phone between other work.
- Voice: warm, direct, practical; second person; short paragraphs; British/Indian English spelling to match the existing article ("organise", "prioritise"). Contractions are fine. Sound like a person who has helped creators with this, not like a brand or a textbook.
- Open with a situation the reader will recognise, in 2–4 short paragraphs, then answer the title question plainly within the first ~150 words. The answer must make sense on its own if quoted.
- Use H2s that match how people phrase the sub-questions. Lead each section with its answer, then explain.
- Give specifics: real numbers and timings, example messages, exact Instagram menu names (verified), checklists people can use today. Label made-up examples as examples, with obviously invented names (for example “Priya, a career coach (example)”).
- Length: 1,300–2,000 words of body copy plus the FAQ. Shorter is fine if it's complete; never pad.

## Research and accuracy (most important)
- Verify every factual claim with WebSearch/WebFetch against a primary source: Meta/Instagram Help Center, Meta developer docs, government or legislation sites, official tool documentation. Link 3–8 of them inline where the claim is made. Every link must be a URL you actually opened and that loads.
- Instagram changes its interface often. Describe menus as of November 2026 and only after you've confirmed them in Meta's Help Center. If you can't confirm a detail, describe it more generally rather than guessing.
- No invented statistics, studies, quotes, testimonials, customer stories or results. Use a number only if you can cite it, and say who measured it and when.
- Legal or financial points: state what the rule says, link the official source, say who it applies to, and add one plain line suggesting a lawyer or accountant for their own case. Don't give personalised legal advice.

## What you may say about DealDock (and what you may not)
DealDock is an inbox for creators' Instagram DMs, currently in a small, application-only pilot. In the pilot it is built to:
- sort conversations by type (brand deal, coaching lead, course question, other sale, fan, spam) and put the ones likely to be worth the most first, with an estimated value;
- draft each reply in the creator's own texting style, which the creator can edit;
- send nothing without the creator's approval (no auto-send, including follow-ups);
- remind the creator about conversations that have gone quiet;
- record deals from agreed to paid, in a ledger the creator updates;
- connect through Meta's official Instagram API, never asking for passwords and never scraping.

Rules:
- Describe these as what the pilot does or is built to do. Never present them as generally available, proven or guaranteed. Prefer “DealDock’s pilot is built to…” or “is designed to…”.
- Never claim customer numbers, results, testimonials, integrations beyond Instagram, auto-sending, bulk or cold outreach, comment-to-DM automation, scheduling, contracts, invoicing or payment collection, or TikTok/WhatsApp support.
- Mention DealDock once, in a short, honest section near the end, usually headed something like “Where a tool helps (and where it doesn't)”. Be fair: say when a notes app or spreadsheet is enough. The pilot card below the article handles the call to action, so don't add another.
- Mentioning other tools is fine when it's useful and factual: describe what they do, cite their own documentation, and don't run them down.

## Internal links
Link naturally to 2–4 related pages with `<Link href="/blog/<slug>">`. Choose from the posts in `src/lib/blog-posts.ts` and the `live` or `in review` rows of `docs/seo/content-queue.md`. Link only to pages that will exist when yours goes live. Free tools are listed in `freeTools` in the same registry.

## Writing quality gate (do this before you finish)
1. Load the `avoid-ai-writing` skill with the Skill tool and run your draft through it. Fix everything it flags.
2. Banned on sight: “in today’s fast-paced world”, “game-changer”, “unlock”, “leverage”, “dive into”, “navigate”, “landscape”, “seamless”, “robust”, “elevate”, “it’s important to note”, “in conclusion”, “Here’s the thing”, “Let’s be honest”, “Not just X, but Y”, stacked rhetorical questions, three-item lists everywhere, a summary paragraph that repeats the article, and em dashes (use commas, full stops or brackets instead).
3. Read it once as a sceptical creator on a phone. Cut any sentence that doesn't help them act.

## Report back (your final message)
- Final title (≤ 65 characters, contains the main search phrase) and description (120–155 characters).
- Word count of the body.
- The main queries the article targets.
- Every source URL you cited, one line each.
- Any claim you couldn't fully verify, and what you did about it.
- Files you created.
