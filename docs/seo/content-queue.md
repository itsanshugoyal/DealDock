# Content queue

The `search-growth` skill and the founders work from this list. One row per page. Statuses: `idea` → `drafting` → `in review` (founder edits before merge) → `live` → `refresh due`.

House rules: `src/app/blog/AGENTS.md`. Register every post in `src/lib/blog-posts.ts` before its page exists. Nothing goes live without a founder's review; drafts sit on a local branch and are never pushed until approved.

## Live

| Page | Main searches | Live since | Next refresh |
|---|---|---|---|
| `/blog/influencer-brand-dms`: From Instagram DMs to paid brand deals | brand collaboration DMs, manage brand enquiries | 5 Nov 2026 | Feb 2027 |

## In review (local branch `seo/articles`, not pushed)

| Page | Main searches | Notes |
|---|---|---|
| `/blog/instagram-message-requests` | instagram message requests not showing, hidden requests, general vs primary | Instagram menus checked against Meta Help Center, Nov 2026 |
| `/blog/manage-instagram-dms-coach` | how to manage instagram dms, organise instagram dms, saved replies | Owned-offer ICP |
| `/blog/follow-up-coaching-enquiry` | follow up message after no response, coaching follow up template | Owned-offer ICP |
| `/blog/brand-hasnt-paid` | brand not paying influencer, net 30, payment reminder | US / UK / India late-payment law; general information only |
| `/blog/dm-enquiry-tracker-template` + `/templates/dealdock-dm-enquiry-tracker.csv` | dm tracker template, lead tracker google sheets | Free download |
| `/blog/ai-instagram-dm-tools` | ai reply instagram dms, instagram dm ai assistant | Category explainer; fair to other tools |
| `/blog/barter-vs-paid-collab` (Hinglish) | barter collab kya hota hai, 194R, ASCI | India; link from `/in` after the redesign |
| `/tools/brand-deal-rate-calculator` | how much to charge for a brand deal, usage rights pricing | Free tool; percentages cited on the page |

## Next ideas (rough priority)

1. **Fake brand-collab scams in Instagram DMs**: how to spot them, with real patterns from Meta's and regulators' warnings. High intent, protective, very citable.
2. **How to price a coaching program** (owned-offer ICP). Commercial searches; pairs with the follow-up guide.
3. **Ethical DM sales conversations for coaches**: from "how much?" to a booked call, without scripts that feel like scripts.
4. **Rate card vs media kit**: what brands actually ask for, with a free rate-card template.
5. **Creator vs business Instagram account for DMs**: inbox features compared, verified against Meta Help Center.
6. **India: GST for creators** (when registration applies, invoicing brands). Needs a CA-level source check.
7. **Usage rights vs whitelisting explained**, if the calculator page doesn't fully answer it in Search Console data.
8. **Comparisons** (Beacons brand inbox, Insteed, Ginger): only once the features compared are live in DealDock and Meta App Review is through. Use a table, sources and a "reviewed on" date.
9. **Original data**: anonymised Leak Scan totals across pilot creators (what a month of DMs is worth). Only with at least 20 consenting creators, and the method published.

## Refresh rules

- Recheck every Instagram menu name and legal figure each quarter; Instagram's interface and late-payment rates change.
- Update `updatedAt` in the registry only when the content materially changes. Changing the date alone is not a refresh.
- After any publish or refresh: `node scripts/indexnow.mjs <urls>` and request indexing in Search Console.
