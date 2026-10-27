# Marketing design comparison

The user approved a complete landing page on /design-preview on 2026-09-08. It is a review candidate; the original / and /global implementations remain unchanged in this repository.

The visual direction uses bold Geist typography, cool paper, signal yellow, a custom exploratory “d” mark, and layered conversation examples. The page now covers the problem, human-approved workflow, recorded outcomes, pilot fit, Solo offer, FAQ and application.

The initial audience is explicitly coaches, course sellers and cohort hosts selling their own offers through Instagram. Brand-deal-only creators have a separate future-interest option. Example conversations, estimated values and ledger entries are illustrative. No messages are sent by the example.

Applications use three required fields and one optional note. Preparing an application creates an unsent mailto draft for itsanshugoyal2@gmail.com; the visitor reviews and sends it through their email app. Copy/manual-paste and edit options are available. No server submission, email delivery confirmation or analytics service is configured. Only bounded utm_source and utm_campaign tags are carried into the email.

## Review deployment

scripts/prepare-marketing-review.mjs creates a temporary allowlisted marketing source bundle outside the repository. Build that directory using the installed Next.js CLI with build --webpack, then run scripts/finalize-marketing-review.mjs with the absolute out directory. Finalization supplies an explicit PNG extension for static image hosting and checks excluded paths. Publish only its out/ directory to the dedicated Vercel project dealdock-design-review (prj_yHyHBkELMMClMMt1WmO3Iljgdqal, scope goldfish4). Never deploy the repository root or copy environment files.

The public original has a persistent notice identifying unverified claims, figures and testimonials, honest review metadata with old structured claims removed, and a replacement dialog linking to the current pilot application. Its geolocation prompt is omitted. These adjustments exist only in the staged review copy. Both public concepts are noindex; dashboard/API routes and private working files are excluded.

The script accepts the public deployment origin as its first argument for social image URLs. Confirm the actual assigned domain matches before sharing.

## Validation

- node --test scripts/test-pilot-application.mjs: five tests for validation, recipient/encoding, normalization, bounded attribution, and separate brand interest.
- node scripts/test-design-preview.mjs: five local HTTP checks. Set PREVIEW_TEST_ORIGIN to override port 3011.
- REVIEW_TEST_ORIGIN=<public origin> node scripts/test-marketing-review.mjs: public access, noindex, excluded routes, image bytes/type/origin, and CSS/JS asset availability.
- Scoped ESLint for preview components/routes and scripts.
- Browser checks: desktop, 390px and 320px; no horizontal overflow; cohort example; required-field validation; correct email draft; edit retains details; review heading focus; native FAQ keyboard expansion.

Production export, TypeScript, scoped lint and all 14 automated tests passed. The final public comparison was verified on 2026-09-08; results and resolved issues are recorded in PLAN.md. No application email was sent during testing. Full Lighthouse, screen-reader, cross-browser and OS-level reduced-motion audits are not completed. Confirm the next milestone before replacing the canonical landing page or adding hosted form infrastructure.

Public links: [new page](https://dealdock-design-review.vercel.app/design-preview/) · [original design](https://dealdock-design-review.vercel.app/).
