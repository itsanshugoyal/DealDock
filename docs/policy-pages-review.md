# Policy pages: review notes (28 Nov 2026)

New: `/terms`, `/data-deletion`, `/refunds`, `/delivery`, `/pricing`. Rewritten: `/privacy` (now covers the product, not only the website), `/contact`. Every footer links Pricing, Terms, Privacy, Refunds, Delivery, Data deletion and Contact. Shared facts live in `src/lib/legal.ts`; fill a placeholder there once and every page updates.

## Placeholders (src/lib/legal.ts)

- `entity`, `address`, `registration` (CIN), `gstin`: must match the PAN/GST/bank name exactly (Razorpay rejects mismatches; Paddle needs the legal name in the Terms).
- `phone`: Paddle's seller handbook asks for a support phone number.
- `grievanceOfficer`: name (email defaults to hello@dealdock.io).
- `governingCity`: courts for the Terms.
- `[backup period]` in /privacy and /data-deletion: no backup retention is defined yet (Railway Hobby restore window, or the deferred nightly dump).

## Which reviewer checks what

| Reviewer | Needs | Where |
|---|---|---|
| Meta App Review | Privacy Policy URL; User data deletion = **Data Deletion Instructions URL**; Terms URL; policy must say what's processed, why, and how to request deletion | /privacy, /data-deletion, /terms |
| Google OAuth (Gmail) | Homepage describing the app, privacy policy on the same verified domain, Limited Use disclosure, terms link | /, /privacy, /terms |
| Razorpay (live keys, intl cards) | About, Contact (with address), Pricing, Terms, Privacy, Cancellation/Refund (with timeline), Shipping/Delivery | /about, /contact, /pricing, /terms, /privacy, /refunds, /delivery |
| Paddle domain review | Product description, pricing, Terms naming the legal entity, Refund policy, Privacy, all in navigation | /, /pricing, /terms, /refunds, /privacy |

## Things the code doesn't do yet (the pages avoid promising them)

- **No Meta deauthorize / data-deletion callback.** Use the instructions URL. If Meta asks for a callback, build `signed_request` handling that returns `{ url, confirmation_code }`.
- **Account deletion doesn't delete the Clerk user/org** and doesn't revoke Meta/Google tokens. /data-deletion promises the email route "also removes your sign-in profile", which is manual until the code does it.
- **Syncing continues during the 7-day deletion grace and after cancellation**, although the in-app dialogs say it stops. Fix the app copy or the code.
- **Gmail scopes `gmail.readonly` + `gmail.send` are restricted**: Google verification will also need an annual CASA security assessment.
- **Gmail and DM text is sent to OpenAI/Groq.** The "providers' API terms don't allow training" claim relies on their current API terms; confirm both (and any zero-retention option).
- **Studio and Roster can't be chosen in the app** (every workspace is Solo). The pricing page lists them; Paddle checks the site prices match the Paddle catalog ($49/$99/$179 exist there).
- Comment leads, Gmail, invoices and voice notes are not on /pricing because they're off or unconfirmed in production. ElevenLabs is named in /privacy only as "if you turn on voice notes".
- The app's older docs (meta-app-review.md, ARCHITECTURE.md) still name Anthropic and Neon; they aren't production providers.

## For a lawyer

- Liability cap (fees paid in the last 3 months) and the indemnity clause in /terms.
- Governing law and courts; the consumer carve-out.
- DPDP Act consent wording and the "Data Protection Board" complaint line; DPDP Rules phase in through 2027.
- Notice periods we committed to: 30 days for price changes, 14 days for material term changes, 72 h acknowledge / 30 days resolve for grievances, 2 business days support reply, 5–7 business days for refunds.
- Refunds: only billing errors and statutory rights; Paddle may still refund within 14 days at its discretion (its buyer terms). Paddle's handbook recommends, but doesn't require, a 30-day money-back guarantee.
- Pilot terms still describe a Solo-only pilot; decide whether /pilot-terms stays once Terms and Pricing are live.
