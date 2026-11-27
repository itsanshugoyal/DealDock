---
name: seo-offsite
description: Off-site work that makes AI engines and Google know and recommend DealDock. Directory listings, "best tools" roundup pitches, creator newsletters, official profiles (LinkedIn, Crunchbase, Instagram) and sameAs, community answers (Reddit and creator groups), YouTube walkthroughs, and the DealDock name-clash fixes. Use for "submit to directories", "get listed", "pitch roundups", "build backlinks/mentions", "fix the name confusion", or step 5 of /search-growth.
---

# Off-site visibility and entity

For "best X" prompts, AI answers mostly repeat third-party lists, and brand mentions track AI visibility more closely than backlinks do (`docs/seo/research/ai-search-evidence-*.md`). This is the bigger lever once the site is solid.

## Rules
- Free channels only, unless a founder approves spend. No paid placements, bought links, fake reviews or astroturfing.
- Use the exact identity and descriptions in `docs/seo/listing-kit.md`, and update that file first if positioning or pricing changes.
- Never claim customers, results, reviews, auto-sending, integrations beyond Instagram, or that Meta App Review is complete.
- Accounts and submissions need a browser session with the brand account (dealdockai@gmail.com). If no browser tool such as Claude in Chrome is connected, prepare the exact fields and copy, then hand them to a founder as a CRM task. Never ask for passwords in chat.
- Log every submission in the CRM task "Select and prepare first launch-directory submissions" and in the status column of the listing kit.

## 1. Directories (in the order in `listing-kit.md`)
For each one, first check its current rules and cost on its own site, and that it's still active. Pick the category the listing kit gives, the description length the site needs, and the logo and screenshots from `docs/seo/assets/`. Replace the screenshots once the redesign ships. For AlternativeTo and SaaSHub, list DealDock as an alternative to Beacons (brand inbox), Insteed and ManyChat, framed as approve-first rather than automation.

## 2. Profiles and the name clash
At least six other companies use the DealDock name (see the research file). For each official profile, use the descriptor "DealDock, the Instagram DM inbox for creators who sell", link back to dealdock.io, then add the profile URL to `sameAs` in `src/components/marketing/structured-data.tsx` (an infrastructure PR, which may be merged). Priorities:
- LinkedIn company page;
- a Crunchbase organisation with a distinct slug (`/organization/dealdock` is a private-equity tool);
- an Instagram brand handle.

Wikidata only once independent coverage exists. Check the About page still has its "About the name" section.

## 3. Roundups and newsletters
Roundups that list creator inbox and brand-deal tools: storyflow.so, heykero.app, pitchbrand.co, aiemaily.com, ainfluencer.com. Find new ones with WebSearch, e.g. "best tools for creators to manage brand deals 2026".

Pitch each with a short, specific, honest note. It names the free tool or guide that fits the author's article, offers a pilot seat for review, and never offers payment.

Newsletters: Creator Wizard, ICYMI (Lia Haberman), The Publish Press, Creator Science, Lindsey Gamble. Pitch a useful asset (the rate calculator, the late-payment guide), not the product.

Draft every pitch as text for a founder to send. Nothing is sent automatically.

## 4. Communities
r/Instagram (message-request threads), r/UGCcreators, r/influencermarketing; for India, The Creators Club. Use `last30days` or WebSearch to find fresh threads where a guide genuinely answers the question. Draft replies that help on their own, disclose the affiliation, and link only when the link is the answer. A founder posts them.

## 5. YouTube (AI Overviews cite YouTube heavily)
For each live article, a 2–4 minute walkthrough titled as the question, with the article linked in the description. Script it from the article; the screen recording or HyperFrames/Remotion production is a founder decision.

## 6. Measure
Track named and cited mentions in `docs/seo/ai-visibility-log.md`. Record referring domains from Search Console and Bing Webmaster Tools monthly. Note which roundups added DealDock.
