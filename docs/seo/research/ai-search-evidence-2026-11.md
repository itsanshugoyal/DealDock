# What gets a new site ranked and cited by AI search (evidence, November 2026)

Research run on 7 Nov 2026 for dealdock.io. Most figures come from vendor studies and reached us through summaries; read them as direction, not precision. Re-verify anything older than six months before relying on it. Used by the `search-growth`, `blog-research` and `blog-write` skills.

## Bottom line

AI visibility for a new site comes mainly from (1) being crawlable and ranking in ordinary search (Google for AI Overviews/AI Mode/Gemini, Bing for Copilot and partly ChatGPT, probably Brave for Claude) and (2) being named on other sites, especially "best X" lists and comparisons. Most on-page "GEO" tricks did not survive testing.

## How each engine sources answers

| Engine | Sources | Implication |
|---|---|---|
| Google AI Overviews / AI Mode / Gemini | Google index and core ranking; fans out sub-queries, so only ~38% of AIO citations rank top 10 for the original query | Rank for the question and its sub-questions; no special markup needed (Google) |
| ChatGPT search | OAI-SearchBot plus search partners; Bing overlap 87% (Seer, 2025) vs 27% (2026 replication) | Allow OAI-SearchBot; Bing Webmaster Tools anyway |
| Perplexity | PerplexityBot; Reddit is its #1 cited domain (6.6%) | Fastest to cite new pages (median ~4 days in one test) |
| Claude | Very likely Brave Search (unconfirmed) plus Claude-SearchBot | Allow the bots |
| Copilot | Bing | Bing Webmaster Tools + IndexNow |
| Answers without search | Training data | Only changes at retraining; be mentioned widely now |

## Tactics by strength of evidence

**Strong**
1. Be indexed and let search bots in. Google: indexed + snippet-eligible is the only requirement. https://developers.google.com/search/docs/appearance/ai-features · OpenAI bots https://help.openai.com/en/articles/12627856 · Perplexity https://docs.perplexity.ai/docs/resources/perplexity-crawlers · Anthropic https://support.anthropic.com/en/articles/8896518
2. Get named on third-party "best X" lists and comparisons. In ChatGPT "best" answers 43.8% of cited pages were lists; 35% of cited lists sat on low-authority domains (Ahrefs, Dec 2025) https://ahrefs.com/blog/best-lists-research/. Branded web mentions correlated 0.664 with AIO visibility vs 0.218 for backlinks (Ahrefs 2025, DR40+ brands, correlation only) https://searchengineland.com/why-backlinks-alone-wont-save-big-brands-in-ai-search-500637. AirOps (Oct 2025): brands 6.5x more likely to be cited via third-party sources https://www.airops.com/glossary/offsite-seo. DerivateX (May 2026): 87.4% of ChatGPT citations for recommended SaaS tools were third-party https://derivatex.agency/report/b2b-saas-ai-citation-study/
3. Rank in ordinary search for the main query and its sub-questions. Retrieval rank dominates what the AI sees (C-SEO Bench, NeurIPS 2025) https://arxiv.org/abs/2506.11097. AIO citations from top-10 pages dropped to ~38% https://www.searchenginejournal.com/google-ai-overview-citations-from-top-ranking-pages-drop-sharply/568637/. Google: AI features are "rooted in our core Search ranking" https://developers.google.com/search/blog/2026/05/a-new-resource-for-optimizing
4. Answer first in self-contained passages; don't hide key text. Microsoft (Oct 2025) https://about.ads.microsoft.com/en/blog/post/october-2025/optimizing-your-content-for-inclusion-in-ai-search-answers. Kevin Indig: 44.2% of ChatGPT citations come from the first 30% of a page (Feb 2026, secondary).

**Mixed**
- Freshness: AI-cited pages 25.7% newer than organic; ChatGPT's 458 days newer; AIO no preference (Ahrefs, Jul 2025) https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/. Real updates only; "2026" date bumps get punished.
- G2/Capterra: G2 was ChatGPT's #4 domain (1.1%, Profound) https://www.tryprofound.com/blog/ai-platform-citation-patterns; DerivateX saw zero. Only with real reviews.
- Reddit: #1 on Perplexity; ChatGPT responses citing Reddit fell from ~60% to ~10% in Sept 2025 https://www.semrush.com/blog/most-cited-domains-ai/. Volatile; participate genuinely or not at all.
- YouTube: correlation 0.737 with AI visibility (Ahrefs, Dec 2025, secondary); YouTube and Reddit are the top two AIO domains (Ahrefs, Nov 2026) https://ahrefs.com/blog/most-cited-domains-ai-overviews/
- Bing for ChatGPT: see table. https://aiplusautomation.com/blog/bing-replication-chatgpt-citations
- Own "vs"/"best" pages: honest ones get cited; sites with dozens of self-ranked lists lost 30–50% visibility from Jan 2026; AIOs cite them yet recommend competitors 83% of the time (Lily Ray, Sept 2026) https://searchengineland.com/google-ai-overviews-cite-self-serving-listicles-recommend-competitors-480573

**Myth / no measurable effect**
- llms.txt: no effect across 300k domains (SE Ranking) https://www.searchenginejournal.com/llms-txt-shows-no-clear-effect-on-ai-citations-based-on-300k-domains/561542/; Google ignores it.
- Schema as a citation lever: Ahrefs (May 2026) 1,885 pages adding JSON-LD vs 4,000 controls: AI Mode +2.4%, ChatGPT +2.2% (noise), AIO −4.6% https://ahrefs.com/blog/schema-ai-citations/. The "schema gives 30–40% more visibility" claim has no primary source. Keep schema for entity clarity.
- FAQ/HowTo rich results: retired (HowTo removed, FAQ restricted 2023; reportedly fully retired 7 May 2026). FAQPage markup is harmless.
- Stuffing statistics/quotes: the Princeton GEO paper (KDD 2024, "up to 40%") https://arxiv.org/abs/2311.09735 did not replicate; C-SEO Bench found only 3 of 54 cases improved and adding statistics hurt.
- Mass self-ranked "best tools 2026" lists, bought links, fake reviews.

## Timelines for a new domain
- Branded queries surface soon after indexing.
- First citation: median 13 days in one vendor benchmark (Perplexity 4, AIO 18, Claude 22; ChatGPT cited 4 of 12 test pages) https://brandmentions.com/blog/ai-search-citation-speed/
- Category "best X" answers: months; they depend on third-party lists.
- 39% of cited domains changed week to week in one study: expect churn.

## AI Overview frequency (for expectations)
Semrush, 10M+ keywords: 15.69% (Nov 2025) after a 24.6% peak https://www.semrush.com/blog/semrush-ai-overviews-study/. BrightEdge commercial tracker ~48% (Feb 2026), 82% for B2B tech. Question-style queries trigger AIOs far more often (~86% in Seer's 2026 study, via presenc.ai), comparison ~95%.

## Measuring
- Search Console Generative AI report (impressions only; worldwide from 31 Aug 2026) https://www.searchenginejournal.com/google-search-console-ai-reports-rolled-out-worldwide/587836/
- Bing Webmaster Tools AI Performance (citations + grounding queries, Feb 2026) https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- GA4 "AI assistants" channel above Referral: `chatgpt\.com|chat\.openai\.com|perplexity\.ai|gemini\.google\.com|copilot\.microsoft\.com|claude\.ai` (ChatGPT adds utm_source=chatgpt.com)
- Manual 20-prompt panel weekly: `docs/seo/ai-visibility-log.md`

## Entity / name clash
At least six unrelated companies use "DealDock": dealdock.ai (VC software), dealdockai.com (real-estate AI, $79/mo), dealdock.co (private-equity tool, owns crunchbase.com/organization/dealdock), dealdock.co.za (escrow), dealdockus.com (retailer), dealdockuk.com (construction). Always pair the name with the descriptor "the Instagram DM inbox for creators who sell"; add every official profile to `sameAs`; the About page carries an "About the name" section.
