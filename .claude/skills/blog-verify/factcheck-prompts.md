# Fact-check subagent prompts

One `general-purpose` background agent per 1–3 articles, or one per risky article (legal, tax, named vendors, tools). It must be a **fresh** agent, never the writer, and the prompt must tell it the drafts may be wrong. Compose the prompt as **Base + the modules that apply**. These prompts made 9–20+ real fixes per piece in November 2026.

## Base (always)

```
You are the independent fact-checker and line editor for <n> DealDock blog draft(s) that other agents wrote. You have not seen their reasoning, and they may be wrong. A founder reviews after you, so catch the errors before they do. Be sceptical, not anchored on the drafts.

Files, in the git worktree <worktree> (don't commit, push or build). <If a dev server is running: "A dev server is running at http://localhost:<port>; you can curl the pages.">
- <file 1>
- <file 2>

Read first: the writers' brief at <worktree>/.claude/skills/blog-write/writing-brief.md (rules on DealDock claims and research), src/app/blog/AGENTS.md, and the brief(s) in docs/seo/briefs/ if they exist.

For each article:
1. Sources. Open every external link, confirm it loads (HTTP 200) and that it supports the exact sentence it's attached to. Fix or remove any claim a source doesn't support. Instagram Help Center pages render with JavaScript: read https://www.facebook.com/help/instagram/<id>, but link https://help.instagram.com/<id>. Never spoof a browser user agent to get past a block. If a page can't be read, find the same fact on another official page, or soften the claim.
2. Platform facts. Check every feature, menu name and behaviour against the current Meta Help Center and developer docs. Where articles describe the same thing, make them consistent with each other and with Meta's wording.
3. DealDock claims. These must stay within the brief's allowed list ("the pilot is built to…", nothing sends without approval). Remove anything beyond it, any implied result, and anything that reads like a guarantee.
4. Invented specifics. No unlabelled numbers or statistics, invented studies or quotes, or real brand or person names used as examples. Every example is labelled as an example.
5. Writing. Load the `avoid-ai-writing` skill with the Skill tool and apply it. Remove em dashes, the brief's banned phrases, stacked rhetorical questions, filler and repetition. Keep the voice and structure with the smallest edits that fix things. Use typographic quotes in JSX prose, straight quotes inside formulas people will paste.
6. Structure. FAQ answers stay plain strings, identical to what's visible. Internal links may only point to: <list of live and in-review slugs from src/lib/blog-posts.ts and freeTools>.

Edit the files directly. Then run `timeout 300 npx tsc --noEmit -p .` in the foreground and fix errors in these files.

Report back, under <450–600> words: each change as one line (what was wrong, what you changed), facts you couldn't verify and how you hedged or removed them, and anything needing a founder decision (product truth, legal points, naming companies).
```

## Module: legal (add to the Base prompt for laws, contracts, consumer rules)

```
Verify each legal point on official government or legislature sites and fix anything that's wrong or overstated: <list the statutes and sections, thresholds, deadlines, remedies and dates the article relies on>. For each rule, check who it applies to, and that the article says so. Check for recent amendments, replacements and court rulings that changed the position (in Nov 2026, for example, NBCC v State of West Bengal had doubted Silpi Industries). Inferences must read as inferences ("on our reading…"). Keep the one-line "general information, not legal advice" note. End your report with the points a lawyer should still check before it goes live.
```

## Module: tax (India, or any tax claim)

```
Verify against the Income Tax Department (incometaxindia.gov.in, incometax.gov.in), CBDT circulars, CBIC/GST law and official gazettes: <sections, rates, thresholds, circular numbers and question numbers, and the old-to-new Act mapping (the Income-tax Act 2025 has been in force since 1 April 2026; "tax year" replaces "previous year")>. Check each circular is credited with the rule it actually contains. Keep GST and income statements hedged, and keep the "ask a CA" line. End with the points a CA should still check.
```

## Module: named vendors (articles naming other tools)

```
Be scrupulously fair. Every description of a named tool must match that vendor's own documentation, with no ranking and no disparagement. If a vendor's site blocks fetching, confirm the fact on another page the vendor itself publishes, or on a platform partner page (e.g. Meta's partner case studies), or soften it. Trim sources to the ones that carry weight (about 10–12 at most). If a comparison table is wider than 3 columns, check it's worth its space on a phone, and simplify it if not.
```

## Module: tool or calculator

```
Also check the tool:
- Run `node --test scripts/test-<tool>.mjs`, then read src/lib/<tool>.mjs and confirm the line items add up to the totals and the copied text matches the numbers shown. Fix bugs and add a test for each one.
- Verify every percentage or default against its cited source. Where the page models its own numbers (doubling, multipliers), make sure it says so plainly. It must never present ranges as market rates, and any outlier figures must be described accurately.
- Curl the page and confirm the server-rendered HTML contains the default result, the FAQ and valid JSON-LD (WebApplication plus FAQPage, with FAQ text identical to the visible FAQ).
- Accessibility: labelled inputs, an aria-live result, and a copy button with an accessible name and a failure path.
```

## Module: language (Hinglish or other regional)

```
The language should read like natural, spoken Roman-script Hinglish from an Indian creator: no Devanagari, no stiff or translated-sounding Hindi, no em dashes, and gender-neutral verbs in templates. Confirm the registry entry sets inLanguage "hi-Latn".
```

## Module: template file (CSV or spreadsheet downloads)

```
Check the download: the exact column order, a UTF-8 BOM, CRLF line endings, that example rows are labelled "(example)", that no cell starts with = + - @, and that there are no real brand names. Confirm every formula or dropdown in the article matches the column letters, and that each menu path matches the current Google, Microsoft and Notion help pages.
```
