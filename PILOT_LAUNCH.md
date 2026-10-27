# DealDock pilot launch handoff

**26 October 2026 update:** https://dealdock.io is live over HTTPS; www redirects to it. Production SITE_URL now uses this domain and MARKETING_SITE_LIVE=true permits indexing. Comparison pages remain noindex; preview/development remain excluded. The owner requested retaining Hobby for current personal use; no hosting purchase or commercial-launch validation was made. Search Console ownership/submission remains to do. See DOMAIN_SETUP.md for the verified release and configuration.

**25 October 2026 update:** the user authorized a separate marketing deployment under deltaodcom-1158 / Delta (delta-7460) and bought dealdock.io through Hostinger (reported Reviewing). See DOMAIN_SETUP.md for the new project/store, exact DNS records and canonical/indexing cutover. The goldfish4 deployment and its records are retained; its identifiers below are historical.

A working website application path does not establish product readiness. The product repo PRD/PLAN govern connect → prioritize → draft → human-approved send → record sale.

## Next actions in order

| Action | Suggested owner | When | Evidence needed |
| --- | --- | --- | --- |
| Confirm suitable commercial hosting | Anshu | Before commercial invitations | Current project remains Hobby for stated personal use. Canonical domain dealdock.io is configured; no paid plan upgrade was made. |
| Verify real Instagram core loop | Product/engineering | Before accepting partners | Meta permissions/review, compatible account, allowed reply window, ingestion, tenant isolation, editable drafts, approval before every send and a recorded outcome. Current readiness is unverified here. |
| Finish service/data and billing terms | Anshu with appropriate advisers | Before connection/payment | Operator identity, permissions, retention/deletion, cancellation, applicable taxes, billing timing and tested payment/cancel flow. Website privacy is not the product agreement. |
| Establish daily application review | Anshu | Before sharing | Read private records, classify own-offer fit versus future brand interest, reply manually from itsanshugoyal2@gmail.com. Suggested internal target: one business day; not a published promise. |
| Run five comprehension checks; onboard 2–3 partners | Anshu | Once gates pass | They understand audience, workflow, human approval and application commitment. Confirm paid offer, recurring buyer enquiries, professional account, review time and feedback willingness. |
| Measure weekly and expand toward ten | Anshu/product | During pilot | Baseline missed enquiries, drafts reviewed/edited, weekly use, first recorded sale, objections and explicit paid continuation. Product target: first LedgerEntry within 14 days; not a revenue guarantee. |

Follower count alone is not qualification. Keep brand-deal-only interest separate. Start small with weekly feedback; consider wider acquisition after use and paid continuation have evidence. These recommendations do not authorize sourcing or sending outreach.

## Website operations

Review origin: https://dealdock-design-review.vercel.app. Accepted /, same design /design-preview, archive /original. Review stays noindex. After agreeing commercial hosting, attach the intended domain, set SITE_URL to it and MARKETING_SITE_LIVE=true, redeploy and verify canonical/social/sitemap/robots. Preview/archive stay noindex.

The dedicated private store is dealdock-pilot-applications (store_gVbObWGTY95X9xIQ, Singapore), linked to the marketing project. No public read endpoint exists. Receipt only appears after save. No email alert or automated applicant confirmation is configured; review manually. Applying starts neither billing nor Instagram connection.

### Read saved applications locally

Use authenticated Vercel CLI in the isolated marketing stage, never repo root. Verify whoami and .vercel/project.json selects dealdock-design-review (prj_yHyHBkELMMClMMt1WmO3Iljgdqal). From that stage, pull development credentials into the ignored, separate file:

~~~powershell
vercel env pull C:/code/DealDock/.env.pilot.local --environment development --scope goldfish4 --yes
~~~

From C:/code/DealDock:

~~~powershell
node --env-file=.env.pilot.local scripts/pilot-inbox.mjs
~~~

Review .pilot-data/store_gVbObWGTY95X9xIQ/*.json locally. The script checks the expected store, paginates and exports without printing personal details. For Delta, pass the new expected store ID using DOMAIN_SETUP.md. Credentials/exports must not be committed or shared. Renew expired CLI/OIDC credentials by pulling again. The authenticated Vercel dashboard also provides owner access.

For deletion requests verify the matching reference/email, delete its private blob and local exports, and record completion privately. Review stale records monthly and remove those no longer needed for pilot discussion.

### Deploy safely

~~~powershell
node scripts/prepare-pilot-website.mjs
# Change directory to the printed isolated staging path.
vercel link --project dealdock-design-review --scope goldfish4 --yes
vercel deploy --prod --scope goldfish4 --yes --archive=tgz
~~~

The stage copies only marketing files and generates Next/Vercel config. Only POST /api/pilot-application and GET /api/marketing-currency are published. Never deploy this mixed CRM repository root. .env*, .pilot-data, node_modules, research, internal APIs and dashboards stay outside uploads. Changes to server-rendered form configuration require redeployment.

## Measurement and learning

Basic Vercel Web Analytics records visits; our beforeSend removes queries/fragments. Custom events require Pro/Enterprise and stay disabled (NEXT_PUBLIC_MARKETING_EVENTS_ENABLED=false). After a supported plan is agreed, set true and redeploy. Categorical events cover CTA, form start, attempt, confirmed receipt, failure and draft preparation. Never put form content/reference in analytics.

Track visits, actual private applications or received emails, qualified own-offer creators, held calls, accepted partners, activation and paid continuation. Brand interest is separate. Source/campaign tags are private attribution; drafts are not received applications. Ask five relevant creators what they understood and what stopped them applying; fix the strongest objection before scaling.

## Limits and sources

No automatic messages or founder email alerts were added. Product Meta, tenancy and payment workflows were not verified. Hosting remains a Hobby review project; no paid plan changed. Full screen-reader, Lighthouse and cross-browser audits are incomplete.

Official sources: [Vercel Hobby](https://vercel.com/docs/plans/hobby), [custom event availability](https://vercel.com/docs/analytics/custom-events), [private storage](https://vercel.com/docs/vercel-blob/private-storage). Runtime upgraded to Next.js 16.4.0: production audit clean; five high dev-only lint dependency findings remain.

Next milestone requires approval: product pilot-readiness verification and commercial go-live.

## Approved regional offer — 2026-10-14

Solo remains the single public card: ₹4,000 INR or USD $49 monthly, one creator and one Instagram account. International applications are accepted for selected validation pilots, not unrestricted global signup. Confirm account compatibility, supported language, timezone/onboarding capacity and international billing availability before accepting a participant. The website's country hint and visitor-selected display currency do not establish billing eligibility or the product's ledger currency.

Before paid participation, agree billing currency, applicable tax treatment, first-week charge treatment, the period covered by the first invoice and cancellation in writing. First invoice after a full week of active use does not by itself promise a free week. Real INR/USD payment and cancellation flows still require product-readiness verification; this marketing milestone adds no checkout or payment rail.

Private Solo records can carry pricing.plan, pricing.currency, pricing.monthlyMinor and pricing.version, generated from the approved server-side catalog. Treat these as the displayed offer, not an accepted subscription. Old/unknown-currency records remain valid and need price confirmation. Brand-only future interest has no Solo quote. Review applications, fit conversations, activations and paid continuations separately for INR/USD; custom currency events stay disabled until an appropriate analytics plan is approved.
