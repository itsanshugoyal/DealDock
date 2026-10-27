"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { APPLICATION_EMAIL, OFFER_LABELS, clearCorrectedFieldError, normalizeApplication, prepareApplication, submitApplication } from "./application.mjs";
import { recordMarketingEvent } from "./marketing-analytics";
import styles from "./preview.module.css";
import { usePilotCurrency } from "./pilot-currency";
import { soloPriceLabel } from "@/lib/marketing-pricing.mjs";

type Receipt = { reference: string; interest: "pilot" | "future_interest" };
type Prepared = { body: string; href: string };

export function PilotApplication({ online = false }: { online?: boolean }) {
  const { selection } = usePilotCurrency();
  const [prepared, setPrepared] = useState<Prepared | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
  const [offer, setOffer] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const pendingErrorFocus = useRef<string | null>(null);
  const started = useRef(false);
  const request = useRef<{ key: string; id: string } | null>(null);

  useEffect(() => {
    if (prepared || receipt) resultHeading.current?.focus();
  }, [prepared, receipt]);

  useEffect(() => {
    if (!submitting && pendingErrorFocus.current) {
      document.getElementById("pilot-" + pendingErrorFocus.current)?.focus();
      pendingErrorFocus.current = null;
    }
  }, [errors, submitting]);

  function details() {
    const data = new FormData(form.current!);
    const fields = Object.fromEntries(["email", "instagram", "offer", "note"].map(name => [name, String(data.get(name) || "")]));
    const validated = normalizeApplication(fields);
    setErrors(validated.errors);
    if (!validated.valid) {
      recordMarketingEvent("application_failed", { reason: "validation" });
      document.getElementById("pilot-" + Object.keys(validated.errors)[0])?.focus();
      return null;
    }
    const query = new URLSearchParams(window.location.search);
    return {
      ...validated.fields, company: String(data.get("company") || ""),
      ...(selection.currency && validated.fields.offer !== "brand_interest" ? { pricingCurrency: selection.currency } : {}),
      attribution: { source: query.get("utm_source") || "", campaign: query.get("utm_campaign") || "" },
    };
  }

  function prepareEmail() {
    const data = details();
    if (!data) return;
    setPrepared(prepareApplication(data, data.attribution));
    setNotice("");
    recordMarketingEvent("email_fallback_prepared", { offer: data.offer, currency: selection.currency });
  }

  async function apply(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    if (!online) { prepareEmail(); return; }
    const data = details();
    if (!data) return;
    const key = JSON.stringify(data);
    if (request.current?.key !== key) request.current = { key, id: crypto.randomUUID() };
    setSubmitting(true);
    setNotice("");
    recordMarketingEvent("application_attempted", { offer: data.offer, currency: selection.currency });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const result = await submitApplication({ ...data, id: request.current!.id }, { signal: controller.signal });
      setReceipt(result);
      recordMarketingEvent("application_received", { offer: data.offer, currency: selection.currency });
    } catch (error) {
      const problem = error as Error & { errors?: Record<string, string>; code?: string };
      setErrors(problem.errors || {});
      pendingErrorFocus.current = Object.keys(problem.errors || {})[0] || null;
      setNotice(problem.name === "AbortError"
        ? "We couldn’t confirm receipt in time. Your details are still here. Try again or prepare an email instead."
        : problem.message || "We couldn’t confirm receipt. Try again or use the email option.");
      if (problem.code === "application_conflict") request.current = null;
      const reason = problem.code === "network" ? "network" : problem.code === "rate_limited" ? "rate_limited" : problem.code?.includes("unavailable") ? "unavailable" : "unconfirmed";
      recordMarketingEvent("application_failed", { reason });
    } finally {
      clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  async function copyApplication() {
    if (!prepared) return;
    try {
      await navigator.clipboard.writeText(prepared.body);
      setNotice("Copied. Paste this into an email to " + APPLICATION_EMAIL + ".");
    } catch {
      setNotice("Select the application text below and copy it manually.");
    }
  }

  return (
    <div className={styles.applicationPanel}>
      <noscript><style>{"#pilot-application-form{display:none}"}</style><p className={styles.formPrivacy}>To apply without JavaScript, email your offer and Instagram username to <a href={"mailto:" + APPLICATION_EMAIL}>{APPLICATION_EMAIL}</a>. No account password or payment is required.</p></noscript>
      <form id="pilot-application-form" ref={form} method="post" action="/api/pilot-application" onSubmit={apply} noValidate hidden={Boolean(prepared || receipt)} aria-busy={submitting}
        onChangeCapture={(event) => {
          const field = event.target;
          if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
            setErrors(previous => clearCorrectedFieldError(previous, field.name, field.value));
          }
        }}
        onFocusCapture={() => {
          if (!started.current) { started.current = true; recordMarketingEvent("form_started"); }
        }}>
        <p className={styles.formIntro}>{online ? "Three required details. No payment or Instagram connection required." : "Three required details. Prepare an email for Anshu to review."}</p>
        {offer !== "brand_interest" && <p className={styles.applicationOffer}>Solo pilot: {soloPriceLabel(selection.currency)}/month. Availability and billing terms are confirmed before onboarding.</p>}
        <p className={styles.fieldError} role="alert">{Object.keys(errors).length > 0 ? "Please check the highlighted fields. Your details are still here." : ""}</p>
        <fieldset className={styles.formFields} disabled={submitting}>
          <legend className="sr-only">Pilot application details</legend>
          <div>
            <label htmlFor="pilot-email">Your email</label>
            <input id="pilot-email" name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} required maxLength={254} placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "pilot-email-error" : undefined} />
            {errors.email && <p id="pilot-email-error" className={styles.fieldError}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="pilot-instagram">Instagram username</label>
            <input id="pilot-instagram" name="instagram" type="text" autoComplete="off" autoCapitalize="none" spellCheck={false} required maxLength={31} placeholder="@yourusername"
              aria-invalid={Boolean(errors.instagram)} aria-describedby={errors.instagram ? "pilot-instagram-error" : "pilot-instagram-help"} />
            {errors.instagram ? <p id="pilot-instagram-error" className={styles.fieldError}>{errors.instagram}</p> : <p id="pilot-instagram-help" className={styles.fieldHint}>Your username is enough. We won’t ask for your password.</p>}
          </div>
          <div>
            <label htmlFor="pilot-offer">What do you sell?</label>
            <select id="pilot-offer" name="offer" required defaultValue="" onChange={event => setOffer(event.target.value)} aria-invalid={Boolean(errors.offer)} aria-describedby={errors.offer ? "pilot-offer-error" : offer === "brand_interest" ? "pilot-offer-help" : undefined}>
              <option value="" disabled>Choose your offer</option>
              {Object.entries(OFFER_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            {errors.offer && <p id="pilot-offer-error" className={styles.fieldError}>{errors.offer}</p>}
            {offer === "brand_interest" && <p id="pilot-offer-help" className={styles.fieldHint} role="status">Brand-deal-only creators are a separate future audience. This registers interest rather than applying to the first cohort.</p>}
          </div>
          <div>
            <label htmlFor="pilot-note">What tends to get missed? <span>Optional</span></label>
            <textarea id="pilot-note" name="note" rows={3} maxLength={600} autoComplete="off" placeholder="For example, coaching enquiries after a busy story day."
              aria-invalid={Boolean(errors.note)} aria-describedby={errors.note ? "pilot-note-error" : "pilot-note-help"} />
            {errors.note && <p id="pilot-note-error" className={styles.fieldError}>{errors.note}</p>}
            <p id="pilot-note-help" className={styles.fieldHint}>A sentence is enough. Up to 600 characters.</p>
          </div>
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="pilot-company">Leave this field empty</label>
            <input id="pilot-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>
        </fieldset>
        <button className={styles.primaryLink} type="submit" disabled={submitting}>
          {submitting ? "Saving your details…" : online ? offer === "brand_interest" ? "Register future-pilot interest" : "Apply for the pilot" : "Prepare email application"}
          <span aria-hidden="true">{submitting ? "…" : "↗"}</span>
        </button>
        {online && <button className={styles.emailAlternative} type="button" disabled={submitting} onClick={prepareEmail}>Prefer email? Prepare an email draft</button>}
        <p className={styles.formPrivacy}>By sending your details, you ask Anshu to contact you about the pilot. <Link href="/privacy" target="_blank" rel="noopener noreferrer" aria-label="How we use your details (opens in a new tab)">How we use your details ↗</Link>. Please leave out passwords, private DMs and payment information.</p>
      </form>
      {receipt && (
        <div className={styles.applicationReview}>
          <span className={styles.reviewCheck} aria-hidden="true">✓</span>
          <h3 ref={resultHeading} tabIndex={-1}>{receipt.interest === "future_interest" ? "Your interest is recorded." : "Your application is received."}</h3>
          <p>{receipt.interest === "future_interest" ? "Your details are saved for the separate brand-deal use case. This first pilot remains focused on coaching, courses and cohorts; a future place and timing are not confirmed." : "Anshu will review your offer and reply by email to discuss fit, Instagram access and pilot timing."}</p>
          {receipt.interest === "future_interest" ? <p className={styles.formPrivacy}>No account connection is needed. You can contact Anshu to discuss the use case or ask for your details to be removed.</p> : <ol className={styles.receiptSteps}><li>Look out for a personal reply from Anshu.</li><li>We’ll confirm the workflow and terms together.</li><li>Connect an account only after you’re accepted.</li></ol>}
          <p className={styles.formPrivacy}>No subscription has started and no payment has been taken.</p>
          <p className={styles.reference}>Reference: DD-{receipt.reference.slice(0, 8).toUpperCase()}</p>
          <Link className={styles.secondaryLink} href="/contact">A question about your application? ↗</Link>
        </div>
      )}
      {prepared && (
        <div className={styles.applicationReview}>
          <span className={styles.reviewCheck} aria-hidden="true">↗</span>
          <h3 ref={resultHeading} tabIndex={-1}>Your email draft is ready.</h3>
          <p>This email has <strong>not been sent</strong>. Open the draft, review it, and press Send in your email app.</p>
          <a className={styles.primaryLink} href={prepared.href}>Open email draft <span aria-hidden="true">↗</span></a>
          <div className={styles.reviewTools}>
            <button type="button" onClick={copyApplication}>Copy application</button>
            <button type="button" onClick={() => { setPrepared(null); setNotice(""); requestAnimationFrame(() => document.getElementById("pilot-email")?.focus()); }}>Edit details</button>
          </div>
          <details><summary>View the application text</summary><label htmlFor="application-copy" className="sr-only">Prepared application text</label><textarea id="application-copy" readOnly value={prepared.body} rows={10} /></details>
          <p className={styles.formPrivacy}>No email app? Copy the text and send it to <a href={"mailto:" + APPLICATION_EMAIL}>{APPLICATION_EMAIL}</a>.</p>
        </div>
      )}
      <p className={styles.formStatus} role="status" aria-live="polite">{submitting ? "Saving your details…" : notice}</p>
    </div>
  );
}
