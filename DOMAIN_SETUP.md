# DealDock website: Delta deployment and Hostinger domain

Updated 26 October 2026. Public marketing only; authenticated product/CRM are excluded.

## Current status — custom domain live

The owner authorized the domain/indexing cutover on 26 October and stated this remains personal use on Hobby. No plan was changed or purchased. Production now uses SITE_URL=https://dealdock.io and MARKETING_SITE_LIVE=true. Preview/development retain the temporary Vercel origin and MARKETING_SITE_LIVE=false. This records the owner's intended use; commercial launch readiness remains separate.

Deployment dpl_AkHxXFzTwBH4yq7xYf2FBBNR6d6D is READY. https://dealdock.io returns 200 over HTTPS; https://www.dealdock.io/ redirects to it with 308. Vercel reports both DNS configurations valid with no conflicts. Homepage canonical, Open Graph and sitemap use dealdock.io; public pages allow indexing, while /design-preview and /original retain noindex in metadata and headers. Indexability does not establish that search engines have indexed the site.

The clean remote Next.js 16.4.3 build, TypeScript and prerendering passed; install reported zero vulnerabilities. All 35 logic checks and 13 live HTTP checks passed. The new indexing test initially compared a literal trailing slash; it was corrected to compare normalized URLs and rerun successfully. No new application record was submitted during this settings-only release; intake validation, origin protection and denied read access were rechecked over HTTP. Previous private-save verification is recorded below.

Submit https://dealdock.io/sitemap.xml in Google Search Console after verifying domain ownership. Search Console setup/submission was not performed. No new browser visual audit, billing setup, Meta connection, email alert, outreach or source commit was performed.

## Deployment destination

- Vercel account: deltaodcom-1158.
- Workspace: Delta, slug delta-7460, team_dI5gycJwZWzwdncCqFzOBLpO.
- Project: dealdock-website, prj_J8UggItKOOuKUYny4mAACpRQeS42.
- Canonical website: https://dealdock.io.
- Retained Vercel alias: https://dealdock-website.vercel.app.
- New private application store: dealdock-pilot-applications, store_9rcU09pd6c0g6s17, Singapore. Existing applications in the goldfish4 review account are not copied.

Delta remains on Hobby for the owner's stated personal use; review hosting eligibility before commercial launch. No paid upgrade was made. Custom analytics events remain disabled. The production site is now indexable; the comparison routes remain noindex.

## Hostinger DNS configuration

Completed and verified through Vercel on 26 October. The registration-review notes below describe the earlier 25 October state.

The owner reports Hostinger status Reviewing. Public Cloudflare/Google DNS lookups returned NXDOMAIN on 25 October; Vercel reports invalid DNS configuration. Adding a domain to Vercel is distinct from registration, DNS routing and a usable TLS certificate. Hostinger says review typically takes up to 24 hours; check the order/verification instructions and contact its support if it remains pending.

In Hostinger hPanel, open Domains → Domain portfolio → dealdock.io → Manage → DNS / Nameservers. If the nameservers remain with Hostinger, manage these records there. These exact values were returned by this project's Vercel domain verification:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | 216.198.79.1 |
| A | @ | 64.29.17.1 |
| CNAME | www | a4ba46e47ebc2fee.vercel-dns-017.com. |

Use Hostinger's default TTL. Replace conflicting website records for these hostnames; preserve existing mail and verification records. A nameserver migration is unnecessary. Both domains are already attached to the Vercel project, and www is configured to redirect to the apex with HTTP 308 once DNS/TLS work.

Recheck Vercel → dealdock-website → Settings → Domains until both show valid configuration and HTTPS works. Pending Hostinger review cannot be fixed by repeatedly changing DNS.

## Canonical and indexing cutover

The initial production environment uses SITE_URL=https://dealdock-website.vercel.app, MARKETING_SITE_LIVE=false, NEXT_PUBLIC_MARKETING_ANALYTICS_ENABLED=true, NEXT_PUBLIC_MARKETING_EVENTS_ENABLED=false and the new BLOB_STORE_ID. Blob credentials are private server-side variables created by the Vercel storage connection; never prefix them NEXT_PUBLIC_.

The owner authorized and completed steps 1–4 on 26 October for the current personal-use website. For future deployments, preserve these production settings:

1. Set production SITE_URL=https://dealdock.io.
2. Set production MARKETING_SITE_LIVE=true only when ready for public indexing. Keep preview/development false.
3. Redeploy: metadata, sitemap, headers and browser analytics flags depend on the build environment.
4. Verify the canonical, sitemap and social-image URLs use dealdock.io, HTTPS works, www redirects, the homepage has no noindex directive and the archived/review routes still have noindex.
5. Submit https://dealdock.io/sitemap.xml in Google Search Console after verifying domain ownership.

Product Meta access, the approval-required core loop, service/data terms and INR/USD billing/cancellation remain separate readiness gates in PILOT_LAUNCH.md. Nothing auto-sends messages. No checkout or applicant email alert is configured by this deployment.

## Account-specific operations

Use an isolated marketing stage produced by scripts/prepare-pilot-website.mjs, never the mixed repository root. The new account's CLI credentials are in a separate local global-config directory so the existing goldfish4 login remains intact:

~~~powershell
# Run the preparation script from C:/code/DealDock, then change to its printed staging path.
node scripts/prepare-pilot-website.mjs
Set-Location "<printed isolated staging path>"
vercel whoami --global-config "$env:TEMP/dealdock-vercel-deltaodcom-1158"
vercel link --yes --project dealdock-website --scope delta-7460 --global-config "$env:TEMP/dealdock-vercel-deltaodcom-1158"
vercel deploy --prod --yes --archive=tgz --scope delta-7460 --global-config "$env:TEMP/dealdock-vercel-deltaodcom-1158"
~~~

From the linked isolated stage, pull development credentials for owner-only application review:

~~~powershell
vercel env pull C:/code/DealDock/.env.pilot.delta.local --environment development --yes --scope delta-7460 --global-config "$env:TEMP/dealdock-vercel-deltaodcom-1158"
~~~

Then, from C:/code/DealDock:

~~~powershell
node --env-file=.env.pilot.delta.local scripts/pilot-inbox.mjs store_9rcU09pd6c0g6s17
~~~

The helper checks the explicit expected store and writes private exports to .pilot-data/store_9rcU09pd6c0g6s17/. Credentials and exports are ignored and must never be uploaded, committed or shared. Review applications manually; preparing a visitor email draft is not sending or receiving an application.

These releases were published by CLI. For automatic Git deployments later, first isolate the marketing website into a dedicated repository or enforce an equivalent marketing-only build boundary. Connecting this mixed repository root directly would publish a different surface than the tested allowlist. A Git integration was not set up in this milestone.

## Sources

- Hostinger review: https://www.hostinger.com/support/6305787-what-to-do-if-your-domain-is-in-reviewing-status/
- Vercel domain setup: https://vercel.com/docs/domains/working-with-domains/add-a-domain
- Vercel Hobby commercial restriction: https://vercel.com/docs/plans/hobby

## Publication and verification — 25 October 2026

Final deployment dpl_BgTt4yhTkwKCN3atsu3XSxgWrcFc is READY in Delta. The usable address while Hostinger finishes registration/DNS is https://dealdock-website.vercel.app. Vercel attaching an alias named dealdock.io does not make its public DNS or HTTPS ready.

Verified on the final deployment: clean remote Next.js 16.4.3 compilation, TypeScript and prerendering; 35 logic tests and 13 deployed HTTP checks; working assets/social image and correct temporary canonical; noindex; no published CRM/dashboard/internal routes; private application receipt only after save; USD price snapshot; anonymous application-file access denied with 403. Both disposable deployment-check records were individually removed and absence verified. No real applications were migrated or exported, and no email was sent. The owner export helper additionally rejects malformed or mismatched store IDs before reading data.

The initial deployment exposed newly published dependency advisories. Before handoff, Next.js and eslint-config-next were patched from 16.4.0 to 16.4.3, Blob from 2.8.1 to 2.8.2, Undici to the patched compatible release, and the CLI-config dependency's Zod was constrained to 4.6.6 using a narrow override. The remaining development Zod dependency was updated within its compatible major. Both the production-only and full dependency audits are clean (zero vulnerabilities). No forced broad dependency downgrade was used. Revisit the narrow override when upstream CLI-config adopts a patched Zod.

Operational limits: Hostinger status was reported by the owner, not inspected inside hPanel; Cloudflare/Google DNS and Vercel confirmed the domain is not configured publicly. Custom-domain TLS, production indexing, real Meta access, billing and analytics dashboard reporting remain unverified. No hosting plan was upgraded. The original goldfish4 deployment and data were not modified; plan its retirement or separate security patch after deciding how to preserve old review links.

One attempted redeploy from the mixed repository root was rejected on project-name validation before project creation/upload. No root .vercel link was created. The successful deploys explicitly used the isolated stage and included only its 69 allowlisted files. Source/documentation changes remain uncommitted.
