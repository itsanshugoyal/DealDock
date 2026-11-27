import { normalizeCurrency, planPriceLabel } from "../../lib/marketing-pricing.mjs";

export const APPLICATION_EMAIL = "hello@dealdock.io";
export const OFFER_LABELS = {
  brand: "Brand deals",
  coaching: "Coaching / consulting",
  course: "A course",
  cohort: "A cohort or programme",
  mixed: "More than one of these",
  agency: "I manage creators",
  other: "Another offer",
};

/** @param {Record<string, unknown>} input */
export function normalizeApplication(input) {
  const string = (value) => typeof value === "string" ? value.trim() : "";
  const fields = {
    email: string(input.email),
    instagram: string(input.instagram).replace(/^@/, ""),
    offer: string(input.offer),
    note: string(input.note),
  };
  /** @type {Record<string, string>} */
  const errors = {};
  if (fields.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = "Enter a reply email, for example you@example.com.";
  if (!/^[A-Za-z0-9_.]{1,30}$/.test(fields.instagram)) errors.instagram = "Enter your Instagram username, with or without @. Please leave out the profile URL.";
  if (!Object.hasOwn(OFFER_LABELS, fields.offer)) errors.offer = "Choose what you sell.";
  if (fields.note.length > 600) errors.note = "Keep your note to 600 characters or fewer.";
  return { valid: Object.keys(errors).length === 0, fields, errors };
}

/** Clear a corrected field's previous error without validating untouched fields.
 * @param {Record<string,string>} errors
 * @param {string} field
 * @param {unknown} value */
export function clearCorrectedFieldError(errors, field, value) {
  if (!Object.hasOwn(errors, field) || normalizeApplication({ [field]: value }).errors[field]) return errors;
  const remaining = { ...errors };
  delete remaining[field];
  return remaining;
}

/** @param {Record<string, unknown>} payload
 * @param {{fetcher?:typeof fetch,signal?:AbortSignal}} options */
export async function submitApplication(payload, { fetcher = fetch, signal } = {}) {
  let response;
  try {
    response = await fetcher("/api/pilot-application", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify(payload), signal,
    });
  } catch (error) {
    if (error?.name === "AbortError") throw error;
    throw Object.assign(new Error("We couldn’t connect. Your details are still here. Try again or prepare an email instead."), { code: "network" });
  }
  const raw = await response.json().catch(() => ({}));
  const receipt = raw && typeof raw === "object" ? raw : {};
  if (!response.ok || receipt.status !== "received" || receipt.reference !== payload.id || receipt.interest !== "pilot") {
    const error = new Error(receipt.message || "We couldn’t confirm receipt. Try again or send your application by email.");
    Object.assign(error, { code: receipt.code || "unconfirmed", errors: receipt.errors || {} });
    throw error;
  }
  return /** @type {{status:"received",reference:string,interest:"pilot"}} */ (receipt);
}

/** Prepare a visitor-reviewed email. This function never sends or stores an application.
 * @param {{email:string,instagram:string,offer:string,note?:string,pricingCurrency?:string}} fields
 * @param {{source?:string,campaign?:string}} attribution
 */
export function prepareApplication(fields, attribution = {}) {
  const email = fields.email.trim();
  const instagram = fields.instagram.trim().replace(/^@/, "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid reply email.");
  if (!/^[A-Za-z0-9_.]{1,30}$/.test(instagram)) throw new Error("Enter your Instagram username, without a profile URL.");
  if (!Object.hasOwn(OFFER_LABELS, fields.offer)) throw new Error("Choose what you sell.");
  const note = (fields.note || "").trim().slice(0, 600);
  const clean = (value = "") => value.replace(/[\r\n]/g, " ").slice(0, 100);
  const currency = normalizeCurrency(fields.pricingCurrency);
  const body = [
    "Hi Anshu and Nahush,",
    "",
    "I’d like to apply for the DealDock pilot.",
    "",
    "Reply email: " + email,
    "Instagram: @" + instagram,
    "I sell: " + OFFER_LABELS[fields.offer],
    "Pilot prices shown: Solo " + planPriceLabel("solo", currency) + ", Studio " + planPriceLabel("studio", currency) + ", Roster " + planPriceLabel("roster", currency) + " per month (terms to be confirmed)",
    ...(note ? ["What gets missed: " + note] : []),
    "",
    "Page: DealDock pilot application",
    ...(attribution.source ? ["Source: " + clean(attribution.source)] : []),
    ...(attribution.campaign ? ["Campaign: " + clean(attribution.campaign)] : []),
    "",
    "Please get in touch to discuss fit, access and pilot terms.",
  ].join("\n");
  return { body, href: "mailto:" + APPLICATION_EMAIL + "?subject=" + encodeURIComponent("DealDock: pilot application") + "&body=" + encodeURIComponent(body) };
}
