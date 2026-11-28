# DealDock cofounder CRM

The workspace lives at `/dashboard`. Both cofounders have equal access. Airtable remains the source of truth. The shared password is entered privately in the local setup screen and stored only as a salted scrypt hash. Sessions use a signed, HTTP-only cookie and expire after 24 hours. Login offers Anshu and Nahush; the selected name attributes activity but does not provide a separate identity or password. Owner selectors offer Anshu, Nahush, Both, and Unassigned.

## Operating plan

The launch checklist adds 14 tasks with suggested review dates, assigned across Anshu (technical work), Nahush (marketing), and Both (shared decisions). It covers the public domain, site/pilot readiness, consent/support, attribution, Search Console/SEO, useful content, activated pilots, the first ten design partners, consented proof, paid continuations, and an ads decision. Ads remain blocked until at least three activated partners, two paid continuations and a credible outcome story. Nothing purchases a domain, posts content or launches an ad. Use `node scripts/seed-crm-launch.mjs` to inspect the scoped batch and `--apply` to write it; stable keys/title checks prevent repeat runs from adding duplicate launch tasks and existing completed work is preserved.

- Overview: verified current pipeline counts, due follow-ups, team tasks, and actual activity.
- Leads: search and filter existing records; capture source, evidence, owner, segment, next action, and date. Additions start pending. Unknown facts stay unknown.
- Pipeline: current Airtable stages. Bookings, replies and payments are recorded via explicit activity forms.
- Outreach: reviewed drafts with evidence; 15 Instagram touches and 25 LinkedIn connection requests daily, shared between cofounders, using IST dates. Overflow stays queued. These are operating ceilings, not platform-guaranteed allowances.
- Marketing: social content, referral efforts, ads, and experiments. Store hypothesis, draft, owner, date, status, budget, actual spend, qualified leads, held calls and paying customers. Results are manually entered, not synced from ad platforms.
- Tasks: assign the next concrete action and track todo, in-progress, blocked, done.
- Calls and pilots: confirmed bookings and progression to active pilot and paying. Store call notes and pilot agreements in activity notes.
- Activity: human confirmations, edits, replies, notes and payments, with name and timestamp.

There are no paid LLM calls, platform sending integrations, or active n8n workflows. Copy an AI review packet into the current AI conversation for qualification, drafting and reply classification. Save the reviewed result in the CRM. Credentials must never go in that packet. Publishing posts and launching ads are manual.

## Data storage

`Leads` retains its original fields. Structured owner, evidence, segment and activity metadata is appended after a clearly delimited block in `notes`; pre-existing human notes are preserved. `CRM Operations` stores one record per task or marketing campaign using `key`, `kind` and `payload` fields. The existing `Calls` and `Daily Counters` tables remain intact. Existing stage/flags are read as recorded; missing legacy activity is not invented.

Do not remove or overwrite the metadata block when using the Airtable CLI. Use the CRM for edits, or unpack/pack with `src/lib/crm/model.mjs`. Legacy drafts must receive fresh evidence and human review before becoming eligible for outreach. The five pending brand-deal experiments remain excluded.

## Setup and deployment

1. Run the local Next.js server and visit `/dashboard`; enter your name and choose a password of at least 14 characters. Do not paste the password into chat.
2. `node scripts/configure-crm.mjs --apply` creates only the operations table if missing. Existing leads are unchanged.
3. `node scripts/sync-crm-vercel.mjs` transfers only Airtable and CRM access configuration via stdin to the linked Vercel project. It never outputs values. n8n secrets are not uploaded.
4. Deploy with `node scripts/deploy-crm.mjs`. This pins the deployment to the CRM project even if another task changes the local Vercel link. Both cofounders use the shared password and enter their own names.
5. A deployment without password/session configuration fails closed; it cannot expose CRM data. Bootstrap setup is disabled on Vercel.

The project is `goldfish4/dealdock-crm`; the design-review site is separate. `.vercelignore` excludes credentials, research, temporary files and dormant workflows from deployment. `vercel.json` routes the CRM project's homepage to `/dashboard`.

## Safety and practical limits

Draft approval and manual-send confirmation are separate. Every send confirmation includes a checkbox attestation and idempotency key. A reply stops no-reply follow-ups; opt-outs suppress all subsequent outreach. Initial follow-ups are due five days after contact, then seven days later, with a maximum of three unsolicited touches. Timing must never override a decline or request to stop.

Stale edits are rejected using a record version and a second read before writing. Airtable does not provide atomic compare-and-swap: two simultaneous saves to the same lead may still race. Coordinate ownership and avoid simultaneous edits or sending to the same lead. Daily limits depend on every manual send being recorded immediately.

Data requests are cached for 15 minutes without background polling, invalidated after CRM writes. Direct Airtable edits may take up to 15 minutes to appear. Airtable quota failures display errors, never empty success. Monitor the workspace API quota. The in-memory failed-login limiter is per Vercel instance, not a global rate limiter; rotate the password and session secret privately if compromised. This small-team workspace is not an enterprise identity system.

No paid ads are launched by this setup. Use organic outreach, interviews and pilot learning first. Record an ad experiment only after agreeing a budget and success criterion based on held qualified calls and customers.

## Verification

The redesigned workspace uses a light, warm palette and scoped styles. Lead views include qualification, draft backlog, due follow-ups and separate experiments, with search, owner/stage/segment filters, sorting, pagination and CSV export. Export includes only the matching view and escapes spreadsheet formulas. Ctrl/Cmd+K searches stored leads and tasks; page and lead links can be bookmarked. The lead panel pairs each evidence URL with its actual observation and offers explicit re-verification. Switching sections or closing an edited panel asks before discarding unsaved work.

Tasks can be completed or have their status changed inline, preserving the full previous record and optimistic version. Tasks can link to a lead. Outreach shows preparation reasons, ready messages and overflow. Copying never confirms a send. Marketing plans display manually entered outcomes and cost per held call only when calls have been recorded. The dashboard shows actual activity in the last seven days and a clearly labelled target of ten active partners; it does not invent conversions or recovered revenue.

Run `node --test scripts/test-crm.mjs scripts/test-crm-views.mjs` for core safety and view behavior. `node scripts/test-crm-http.mjs` checks the built application and uses one temporary operations task, reads it back, and removes only that exact fixture. Real leads are not edited by verification. `node scripts/verify-crm-deployment.mjs` checks the hosted authentication boundary and record counts without writing data or displaying credentials.

`node --test scripts/test-crm.mjs` tests identity normalization, draft/send separation, shared limits, excluded segments, suppression, stale edits, replies, and password/session security. Run `node node_modules/next/dist/bin/next build` before deployment. Browser automation may be unavailable; report that explicitly instead of claiming visual QA.
