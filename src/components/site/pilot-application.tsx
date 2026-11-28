"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { APPLICATION_EMAIL, OFFER_LABELS, clearCorrectedFieldError, normalizeApplication, prepareApplication, submitApplication } from "./application.mjs";
import { recordMarketingEvent } from "./marketing-analytics";
import styles from "./site.module.css";
import { usePilotCurrency } from "./pilot-currency";

type Receipt = { reference: string };
type Prepared = { body: string; href: string };

/** The pilot application. `compact` is the hero's second step: the handle is already known, so it asks only for
 * email and offer. `prefix` keeps element ids unique when a second copy is on the page. */
export function PilotApplication({ online = false, compact = false, handle = "", prefix = "pilot-" }: { online?: boolean; compact?: boolean; handle?: string; prefix?: string }) {
  const { selection } = usePilotCurrency();
  const [prepared, setPrepared] = useState<Prepared | null>(null);
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState("");
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
      document.getElementById(prefix + pendingErrorFocus.current)?.focus();
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
      document.getElementById(prefix + Object.keys(validated.errors)[0])?.focus();
      return null;
    }
    const query = new URLSearchParams(window.location.search);
    return {
      ...validated.fields, company: String(data.get("company") || ""),
      ...(selection.currency ? { pricingCurrency: selection.currency } : {}),
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
      <noscript><style>{`#${prefix}application-form{display:none}`}</style><p className={styles.formPrivacy}>To apply without JavaScript, email what you sell and your Instagram username to <a href={"mailto:" + APPLICATION_EMAIL}>{APPLICATION_EMAIL}</a>. Never send a password or payment details.</p></noscript>
      <form id={prefix + "application-form"} ref={form} method="post" action="/api/pilot-application" onSubmit={apply} noValidate hidden={Boolean(prepared || receipt)} aria-busy={submitting}
        onChangeCapture={(event) => {
          const field = event.target;
          if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
            setErrors(previous => clearCorrectedFieldError(previous, field.name, field.value));
          }
        }}
        onFocusCapture={() => {
          if (!started.current) { started.current = true; recordMarketingEvent("form_started"); }
        }}>
        {!compact && <p className={styles.formIntro}>{online ? "Three quick details. No password, payment or Instagram connection needed." : "Three quick details. We’ll prepare an email for you to send."}</p>}
        <p className={styles.fieldError} role="alert">{Object.keys(errors).length > 0 ? "Please check the highlighted fields. Your details are still here." : ""}</p>
        <fieldset className={styles.formFields} disabled={submitting}>
          <legend className="sr-only">Pilot application details</legend>
          <div>
            <label htmlFor={prefix + "email"}>Your email</label>
            <input id={prefix + "email"} name="email" type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} required maxLength={254} placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? prefix + "email-error" : undefined} />
            {errors.email && <p id={prefix + "email-error"} className={styles.fieldError}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor={prefix + "instagram"}>Instagram username</label>
            <input id={prefix + "instagram"} name="instagram" type="text" autoComplete="off" autoCapitalize="none" spellCheck={false} required maxLength={31} placeholder="@yourusername" defaultValue={handle}
              aria-invalid={Boolean(errors.instagram)} aria-describedby={errors.instagram ? prefix + "instagram-error" : undefined} />
            {errors.instagram && <p id={prefix + "instagram-error"} className={styles.fieldError}>{errors.instagram}</p>}
          </div>
          <div>
            <label htmlFor={prefix + "offer"}>What do you sell?</label>
            <select id={prefix + "offer"} name="offer" required defaultValue="" aria-invalid={Boolean(errors.offer)} aria-describedby={errors.offer ? prefix + "offer-error" : undefined}>
              <option value="" disabled>Choose one</option>
              {Object.entries(OFFER_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
            {errors.offer && <p id={prefix + "offer-error"} className={styles.fieldError}>{errors.offer}</p>}
          </div>
          {!compact && <div>
            <label htmlFor={prefix + "note"}>What gets missed today? <span>Optional</span></label>
            <textarea id={prefix + "note"} name="note" rows={3} maxLength={600} autoComplete="off" placeholder="For example: brand emails get lost, or coaching leads go cold after a story."
              aria-invalid={Boolean(errors.note)} aria-describedby={errors.note ? prefix + "note-error" : prefix + "note-help"} />
            {errors.note && <p id={prefix + "note-error"} className={styles.fieldError}>{errors.note}</p>}
            <p id={prefix + "note-help"} className={styles.fieldHint}>A sentence is enough. Up to 600 characters.</p>
          </div>}
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor={prefix + "company"}>Leave this field empty</label>
            <input id={prefix + "company"} name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>
        </fieldset>
        <button className={styles.primaryButton} type="submit" disabled={submitting}>
          {submitting ? "Sending your application…" : online ? "Apply for the pilot" : "Prepare my email application"}
        </button>
        {online && !compact && <button className={styles.emailAlternative} type="button" disabled={submitting} onClick={prepareEmail}>Prefer email? Prepare an email instead</button>}
        {compact
          ? <p className={styles.formPrivacy}>Only used to reply about the pilot. <Link href="/privacy" target="_blank" rel="noopener noreferrer" aria-label="Privacy (opens in a new tab)">Privacy ↗</Link></p>
          : <p className={styles.formPrivacy}>We use these details only to reply about the pilot. <Link href="/privacy" target="_blank" rel="noopener noreferrer" aria-label="How we use your details (opens in a new tab)">How we use your details ↗</Link> Please leave out passwords, payment details and private DMs.</p>}
      </form>
      {receipt && (
        <div className={styles.applicationReview}>
          <span className={styles.reviewCheck} aria-hidden="true">✓</span>
          <h3 ref={resultHeading} tabIndex={-1}>Application received.</h3>
          <p>Anshu or Nahush will reply by email within two working days to set up a short call.</p>
          <ol className={styles.receiptSteps}><li>Look out for a personal email from one of us.</li><li>On the call, we check fit and connect your account together.</li><li>Your Leak Scan runs as soon as you connect.</li></ol>
          <p className={styles.formPrivacy}>Nothing has been connected and no payment has been taken.</p>
          <p className={styles.reference}>Reference: DD-{receipt.reference.slice(0, 8).toUpperCase()}</p>
          <Link className={styles.textLink} href="/contact">A question about your application? ↗</Link>
        </div>
      )}
      {prepared && (
        <div className={styles.applicationReview}>
          <span className={styles.reviewCheck} aria-hidden="true">↗</span>
          <h3 ref={resultHeading} tabIndex={-1}>Your email is ready to send.</h3>
          <p>It has <strong>not been sent yet</strong>. Open it, check it, and press Send in your email app.</p>
          <a className={styles.primaryButton} href={prepared.href}>Open email draft</a>
          <div className={styles.reviewTools}>
            <button type="button" onClick={copyApplication}>Copy application</button>
            <button type="button" onClick={() => { setPrepared(null); setNotice(""); requestAnimationFrame(() => document.getElementById(prefix + "email")?.focus()); }}>Edit details</button>
          </div>
          <details><summary>View the application text</summary><label htmlFor={prefix + "copy"} className="sr-only">Prepared application text</label><textarea id={prefix + "copy"} readOnly value={prepared.body} rows={10} /></details>
          <p className={styles.formPrivacy}>No email app? Copy the text and send it to <a href={"mailto:" + APPLICATION_EMAIL}>{APPLICATION_EMAIL}</a>.</p>
        </div>
      )}
      <p className={styles.formStatus} role="status" aria-live="polite">{submitting ? "Sending your application…" : notice}</p>
    </div>
  );
}
