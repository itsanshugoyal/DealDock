# Creator tools

`src/lib/tools/catalog.ts` is the single catalogue for the hub, featured cards,
article recommendations and sitemap. Add a tool there only when its page exists.
The calculator uses the tested pure model in `src/lib/tools/rate-calculator.ts`;
keep its assumptions aligned with the source notes in
`content/tools/brand-deal-rate-calculator.mdx`.

The documentation and original calculator formula were recovered from DealDock's
existing published calculator. Source notes retain their original review date
of 7 November 2026. `scripts/import-live-calculator.mjs` is a one-time importer
that refuses to overwrite the documentation and is never run during builds.

Run `npm run tools:check`, `npm run blog:check` and `npm run build` before publishing.
For a running production preview, use
`npm run tools:check -- --url=http://127.0.0.1:3000` for HTTP checks.
Calculator inputs and search queries stay in the browser and are not submitted
to a server. Currency selection changes display units; it does not convert user
fees. Example defaults are replaced on a currency change only until fees have
been edited. Keep calculators separate from article routes and metadata.
