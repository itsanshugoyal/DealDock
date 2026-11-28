# Marketing UX refinement — 14 October 2026

Page: public homepage and retained design-preview. Conversion goal: qualified pilot application followed by a fit conversation and eventual paid use; not immediate checkout. Expected first traffic is shared links/social/warm introductions, an assumption rather than verified traffic data. No reliable conversion baseline is available.

## Skills and evidence

Searched available skills with the Skills CLI. Relevant installed skills were sufficient: design-taste-frontend, CRO plus form reference, web-design-guidelines, baseline-ui and TDD for the correction behavior. Used the current [Vercel interface rules](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md). Generic prescriptions for motion, layout replacement, fabricated social proof or additional fields were not applied. Preserve the approved brand, real terms and project conventions.

## Quick wins implemented

- src/components/design-preview/marketing-design-preview.tsx:42 — product definition was visually secondary; move the Instagram sales-inbox workflow into the main supporting text.
- src/components/design-preview/marketing-design-preview.tsx:49 — price appeared late; disclose the actual Solo monthly offer near the first CTA, with no payment to apply.
- src/components/design-preview/preview.module.css:408 — mobile FAQ/decision text was small; increase question, answer, price-term and form readability while checking narrow layouts.
- src/components/design-preview/pilot-application.tsx:108 — corrected fields retained old errors; clear only the corrected error and preserve other fields/errors. Added a regression test before implementation.
- src/components/design-preview/pilot-application.tsx:140 — brand-only selection looked like a first-cohort application; show a future-interest explanation, distinct CTA and distinct receipt.
- src/components/design-preview/pilot-application.tsx:159 — opening privacy interrupted unfinished fields; use a labeled new tab without persisting personal details in browser storage.
- src/components/design-preview/pilot-application.tsx:125 — email field lacked explicit keyboard/capitalization/spelling settings; configure email input for mobile.
- src/components/design-preview/marketing-design-preview.tsx:9 — key objections were distributed across ten FAQ items; put approval, account eligibility, pricing and next steps first.

## Higher-impact work after this milestone

Use a genuine product walkthrough only after the real approved-send workflow is verified. Add testimonials or outcomes only with actual permission and evidence. Verify custom conversion reporting on a supported analytics/hosting plan before relying on funnel events. Product activation, service terms and billing readiness remain separate launch gates. No infrastructure, authenticated-product or acquisition work is included here.

## Copy and learning hypotheses

Keep the approved headline Some DMs mean business. The implemented supporting copy names the Instagram inbox and concrete actions. A later qualitative comparison could use Follow through on the buyers in your Instagram DMs or Your next buyer should not get buried. These are alternatives, not proven winners or a reason to start a low-traffic A/B test.

Ask five own-offer creators to explain who it is for, what it does, what applying commits them to, the price and who approves a send. Observe the application on mobile and record confusion. Judge qualified applications, activation and paid continuation rather than raw submissions. No promised percentage uplift, fake urgency, customer logos or subscription checkout was added.

Verification results are recorded in PLAN.md.
