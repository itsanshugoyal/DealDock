# Public marketing milestones

## Custom domain and indexing cutover — 26 October 2026

Authorized by the owner: set production SITE_URL=https://dealdock.io, enable MARKETING_SITE_LIVE=true and redeploy; retain Hobby for stated personal use. This changes public website configuration, not product/commercial-launch readiness.

- [x] Verify both domains have valid Vercel DNS configuration and working HTTPS; www redirects to apex with 308.
- [x] Split production variables from preview/development; only production uses the custom canonical origin and allows indexing.
- [x] Deploy the existing 69-file isolated marketing stage to delta-7460/dealdock-website. Deployment dpl_AkHxXFzTwBH4yq7xYf2FBBNR6d6D is READY.
- [x] Verify clean remote build, TypeScript and prerendering; installation reports zero vulnerabilities.
- [x] Extend HTTP acceptance checks to support live indexing, normalized canonical URLs and canonical sitemap/robots references. All 35 logic and 13 live HTTP tests pass. A literal trailing-slash expectation initially failed and was corrected; the deployed canonical URL was valid.
- [x] Confirm public pages are indexable and comparison/archive pages retain noindex; canonical/social URLs and sitemap use dealdock.io.
- [x] Update DOMAIN_SETUP.md and PILOT_LAUNCH.md. No plan upgrade, application submission, billing/Meta change, outreach or source commit.

Search Console ownership verification/submission and actual search-engine indexing are not verified. No new browser visual audit or private-storage write test was run for this environment-only release; HTTP intake protections were rechecked and prior private-save evidence remains in DOMAIN_SETUP.md. Commercial hosting/product readiness remain separate gates; the previous milestone's pending DNS/cutover notes below are historical.

## Measurement configuration — 27 October 2026

- [x] Mount privacy-filtered Vercel Web Analytics from the root layout for the live public marketing site; preview, archive and private dashboard routes remain excluded by the event filter.
- [x] Add GTM container `GTM-MXV6HLJT` with the standard script and noscript fallback only when `MARKETING_SITE_LIVE=true`.
- [x] Keep custom Vercel events gated off on Hobby. The GTM container receives no application fields, references or DM content from DealDock.
- [x] Add a statically generated `/guides/[slug]` publication route, Article structured-data support and sitemap integration. It has no pages until Nahush supplies reviewed content; empty framework routes intentionally return 404 and stay out of the sitemap.
- [x] Add a factual `/about` page, Organization/WebSite entity identifiers and stronger marketing-release checks for canonical metadata, sitemap and structured data. No customer proof, review markup, product-offer markup or AI-crawler training decision was invented.
- [ ] Deploy through the requested `deltaod@gmail.com` Vercel profile, visit the production site, then verify the Vercel pageview request and GTM container in browser developer tools. Configure any GA4 tag in GTM only after reviewing its data settings and applicable consent requirements.

## Delta account deployment and Hostinger domain — 25 October 2026

Authorized by the user: publish the existing marketing website under Vercel account deltaodcom-1158 and provide configuration for the purchased Hostinger domain dealdock.io. This is a website deployment milestone; product/CRM and outreach remain outside scope.

- [x] Authenticate the requested account in separate CLI config; retain the old login.
- [x] Verify Delta workspace delta-7460 and create dealdock-website, prj_J8UggItKOOuKUYny4mAACpRQeS42.
- [x] Provision a new private application store, store_9rcU09pd6c0g6s17, with server-only credentials; do not migrate old applications.
- [x] Configure temporary SITE_URL=https://dealdock-website.vercel.app, noindex and privacy-filtered basic analytics; custom events remain disabled.
- [x] Attach dealdock.io and www.dealdock.io; configure www → apex HTTP 308 and obtain exact DNS records.
- [x] Address newly observed production dependency advisories with targeted updates: Next/eslint-config-next 16.4.3, Blob 2.8.2, compatible patched Undici, and a CLI-config-only Zod 4.6.6 override.
- [x] Verify zero production audit findings, scoped lint, 35 logic + 13 deployed HTTP checks, clean remote build/TypeScript and the real private USD application path after patching. Remove both individually matched synthetic records and verify absence; no email sent.
- [x] Update owner export tooling with an explicit expected store and account-isolated output; test rejection of wrong/malformed stores.
- [x] Record Hostinger steps, exact DNS, environment cutover and remaining gates in DOMAIN_SETUP.md.

The initial pre-patch deployment was replaced. Delta is Hobby; no purchase/upgrade occurred. Both full and production-only dependency audits now report zero vulnerabilities after also updating the compatible development Zod dependency. No root project/link or mixed-repository upload was created: a mistaken root redeploy attempt failed project-name validation, then deployment was explicitly run from the isolated stage. Existing goldfish4 site/data were retained. Temporary QA environment file was removed after checks. Source changes remain uncommitted.

Final deployment dpl_BgTt4yhTkwKCN3atsu3XSxgWrcFc is READY at https://dealdock-website.vercel.app. The clean remote install also reported zero vulnerabilities; compilation, TypeScript and prerendering passed on Next.js 16.4.3. Logic tests and deployed acceptance tests were repeated after the updates. No new authenticated UI, backend product capability, outreach or purchase was introduced.

Pending owner/external steps: Hostinger registration review, DNS records, custom-domain HTTPS, suitable commercial hosting, and canonical/indexing cutover. The domain currently returns NXDOMAIN; Hostinger status was owner-reported, not directly inspected. Domain purchase/deployment does not validate the product's real Meta loop or INR/USD billing. Approval is required before beginning another product/commercial-launch milestone.

## Previous milestones

- Audited product/design/architecture documents and implementation.
- Checkpointed abandoned design batches (51084ff), then reverted them (9de8491).
- Built a limited concept, then the complete comparison page.
- Published comparison on the dedicated review project on 2026-09-08.

## Current milestone — accepted design and working applications

Authorized by the user after reviewing the design; implementation completed 2026-10-13.

- [x] Promote accepted design to /; preserve /design-preview and archive /original.
- [x] Explicit own-offer ICP and separate brand-only interest.
- [x] Mobile form, validation, error recovery and receipt focus.
- [x] Private application destination, idempotent retries, honest acknowledgements.
- [x] Visitor-controlled email fallback and no-JavaScript contact.
- [x] Privacy, terms, contact, brand icons, social images, sitemap and canonical metadata.
- [x] Privacy-filtered analytics; paid custom events gated off.
- [x] Correct old PRD autonomous-send exceptions.
- [x] Owner-only application export and pilot launch checklist.
- [x] Upgrade Next.js/runtime dependencies after security audit.
- [x] Finish browser, deployment and private-storage acceptance checks.
- [x] Publish isolated marketing build and report launch gates.

## Measurement

Measure visits → received applications → qualified own-offer creators → held fit conversations → accepted partners → activated partners → paid continuation. Source/campaign tags are bounded in private records; analytics URLs exclude queries. A prepared email is not received. Custom events are disabled on Hobby; use saved applications and manual stage counts.

For the first 10, collect comprehension/objection feedback from five relevant creators. Low traffic cannot establish statistically reliable A/B results or a proven conversion improvement.

## Next milestone — approval required before starting

Product readiness and commercial go-live: verify real Meta access, the approval-required core loop, data handling, billing/cancellation, commercial hosting, domain and indexing. No authenticated screens, infrastructure expansion, sourcing or outreach is authorized by this website milestone. See PILOT_LAUNCH.md.

## Regional-pricing milestone — approved 2026-10-14

User approved one Solo card, ₹4,000 INR / USD $49 monthly, an automatic currency suggestion with manual override, consistent regional copy, and selected international validation-pilot eligibility. Scope is the public marketing website and its minimal supporting currency/intake context, with living documentation. No product billing implementation or broader global go-live is included.

- [x] Inspect current source, dirty repository, product PRD/architecture and installed Next.js 16.4 documentation before editing.
- [x] Implement fixed prices, non-cached coarse country hint, accessible selector and manual preference precedence.
- [x] Synchronize hero, illustrations, offer, FAQ, application/email disclosure, privacy and terms.
- [x] Keep brand-only future interest separate and add a small team enquiry link.
- [x] Add server-owned price context without trusting supplied amounts or requiring another application field.
- [x] Correct the remaining future-auto-send exception in the marketing repository's PRD.
- [x] Complete production build, scoped lint, logic/HTTP and responsive browser verification.
- [x] Publish the isolated marketing build and verify the deployed currency flow.

USD pricing is an approved pilot offer, not demonstrated willingness to pay or a verified payment rail. International applicants remain subject to fit, language, compatibility, timing and billing review. First-week charge treatment and invoice coverage remain written-onboarding decisions; no free trial is invented. Commercial hosting, product access and real billing are next-milestone gates and require approval before work begins.

Regional-pricing acceptance: 35 logic tests plus 13 deployed HTTP checks pass (48 total), including manual-choice precedence during delayed detection, blocked storage/network, fixed amounts, server-owned quotes, unsupported currency rejection, retry conflicts and separate unpriced brand interest. Scoped ESLint and clean remote Turbopack/TypeScript builds pass. The homepage remains static; only the currency and intake handlers are dynamic. Real local HTTP requests verified IN/US/GB/unknown hints; the published browser received an INR suggestion from location and successfully overrode it with USD. Browser checks covered 320px, 390px and 1280px without horizontal overflow, 44px currency targets, native keyboard selection/focus, synchronized FAQ/examples, retained form details, a correct unsent USD email draft, preference persistence through reload and terms, and a focused live receipt. The private synthetic USD record stored 4,900 minor units and the offer version; anonymous read returned 403. Only that synthetic record was removed and absence verified. Temporary QA credentials were removed; no email was sent.

Local validation limits: the isolated stage's dependency junction caused a Turbopack filesystem-root panic. The documented Webpack fallback compiled but stalled at TypeScript and was stopped. Both clean remote preview and production builds completed compilation, TypeScript and prerendering successfully. Browser navigation timing and native-summary locator differences required checking the actual DOM and retargeting controls; they were not treated as passing checks without observing the result. Full Lighthouse, screen-reader/cross-browser audits, analytics dashboard/custom-event reporting, real product access and INR/USD billing remain unverified. The existing five high development-only lint-dependency audit findings remain; this milestone added no dependency and did not force a breaking lint downgrade.

Published regional offer: dpl_DPmsyLBD6uqrc381FGfLFTcAeAqV (READY), https://dealdock-design-review.vercel.app and /design-preview. Review remains noindex on the existing Hobby project. Source changes remain uncommitted; unrelated CRM/product work was not staged or deployed. Next milestone requires approval: product pilot-readiness verification and commercial go-live.

Final browser cleanup: verified the published USD preference survives reload, then checked INR at 320px. Reset the temporary viewport, closed both agent-created QA tabs, refreshed the user's existing review tab and stopped the local staging server. Development logged Next's non-blocking missing data-scroll-behavior attribute warning; a navigation cleanup is deferred outside this pricing milestone. The smooth-scroll transition required letting the requested section settle before capturing the published USD proof.

Final production-only dependency audit passed with zero vulnerabilities (npm audit --omit=dev); the five full-install audit warnings are outside the production dependency set. The application email module's additional scoped lint check also passed. Git history was inspected; no new commit was made.

## Validation — 2026-10-13

An isolated Next.js 16.4.0 production build passed TypeScript with only marketing routes plus the intake endpoint. All 21 application/analytics tests pass: durable-save acknowledgement, private storage adapter, retries/conflicts, bounds, rate limits, cross-origin rejection, reverse-proxy host handling, actionable network failure and separate brand interest. Production dependency audit: zero vulnerabilities. Five high development-only ESLint-chain findings remain; forced fix proposes a breaking framework lint downgrade and was skipped.

Browser testing exposed a legitimate-origin rejection caused by Next's internal hostname. A regression test reproduced it; the fix checks incoming host/protocol while retaining cross-origin rejection.

Published verification passed: 11 HTTP checks (32 automated checks total), scoped lint, clean remote install/build/TypeScript, public browser application receipt, private record read and anonymous 403 denial. Both synthetic records and the local QA export were removed. Browser checks covered 320px, 390px and 1280px, no horizontal overflow, controls at least 44px, skip/FAQ keyboard operation, field errors/focus, receipt focus, email draft and retained edits. The actual analytics script loaded with HTTP 200; analytics dashboard reporting has not been verified. No email was sent; founder email alerts are unconfigured. Product Meta/billing readiness was not tested. Full Lighthouse, screen-reader and cross-browser audits were not run. Conversion performance remains unproven.

Final publication: https://dealdock-design-review.vercel.app (accepted homepage), /design-preview (same design), /original (labeled archive). Published 2026-10-14; review remains noindex. Homepage is server-rendered with no raster hero download; eight initial Next.js chunks total roughly 186 KB gzip-estimated. This is an asset observation, not a Lighthouse/Core Web Vitals result. An unused archive font is no longer preloaded.

Final deployment: dpl_9DfuwAjcHrtp5r3qA3auze4ozSpB (READY). Returning to the main content now clears the sticky header on desktop/mobile. Source changes remain uncommitted; unrelated concurrent CRM/lead-generation changes were not staged or deployed.

## UX refinement milestone — requested 2026-10-14

User requested an additional skills-led improvement pass. Searched available skills and applied design taste, CRO/form, current Vercel interface guidelines and baseline UI. Scope: hero clarity, visible pilot price, objection order, readable decision text, correction feedback, uninterrupted privacy review and a distinct brand-interest path. No new infrastructure, paid plan, authenticated product work or acquisition execution.

- [x] Report current issues and scoped changes before editing.
- [x] Implement copy/readability and application improvements.
- [x] Test corrected-field behavior first; all 22 logic tests pass.
- [x] Verify responsive layouts and real browser interactions.
- [x] Publish and run the public acceptance checks.

Conversion improvement is a hypothesis. Validate with five relevant creators and actual qualified applications/activation; no statistically reliable uplift or immediate subscription claim is made. Next milestone still requires approval.

Refinement acceptance: 22 logic tests plus 11 deployed HTTP checks pass (33 total); scoped lint and clean remote production build/TypeScript pass. Verified 320px/390px/1280px layouts, independent error clearing, audience-dependent CTA, email fallback/edit retention, keyboard FAQ, focused live future-interest receipt and no horizontal overflow. A DOM contrast spot check covered 59 text elements with no ratios below 4.5:1; this is not a complete accessibility certification. The private synthetic brand-interest record was read, anonymous access returned 403, and removal was verified. No email was sent.

Resolved verification issues: refreshing next.config restarted the local server, requiring a fresh QA tab; development Fast Refresh reset synthetic fields during a file edit, so interactions were retested on a stable page and the production build. The local social-image check expected a production hostname; Next development used localhost. It passed with the correct development expectation; all production metadata/image checks passed separately. Privacy link target and preservation were checked; the in-app browser did not expose a separate popup tab, so cross-browser tab behavior remains unverified.

Refinement deployment: dpl_8n87VEh6Xb5WaG6tr8SeydJ1VvDf, READY at https://dealdock-design-review.vercel.app. /design-preview uses the same component. No new dependencies, product/backend behavior, paid hosting or auto-sends were introduced. The review remains noindex; conversion uplift, full Lighthouse, screen-reader/cross-browser and analytics dashboard reporting remain unverified. Source changes remain uncommitted.
