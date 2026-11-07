// Pricing logic for /tools/brand-deal-rate-calculator. Pure functions, no dependencies.
// Every add-on is a whole-number percentage of the base fee, as a low–high range.
// The page's "How we calculate" table cites a source for each number: change both together.

/** @typedef {"INR"|"USD"} Currency */
/** @typedef {"reel"|"story"|"post"} DeliverableKey */
/** @typedef {"organic"|"paid"|"exclusivity"} AddOnKey */
/** @typedef {{ value: string, label: string, low: number, high: number, phrase: string }} AddOnOption */
/** @typedef {{ key: AddOnKey, label: string, options: AddOnOption[] }} AddOn */
/**
 * @typedef {object} RateInput
 * @property {Currency} currency
 * @property {Partial<Record<DeliverableKey, string|number>>} fees Fee per item, as typed ("1,50,000" is fine).
 * @property {Partial<Record<DeliverableKey, string|number>>} quantities
 * @property {string} [organic] An option value from ADD_ONS; anything else counts as none.
 * @property {string} [paid]
 * @property {string} [exclusivity]
 * @property {boolean} [rush]
 * @property {string|number} [extraRevisions]
 */
/** @typedef {{ key: DeliverableKey, label: string, qty: number, fee: number, amount: number }} BasePart */
/** @typedef {{ key: string, label: string, phrase: string, lowPct: number, highPct: number, low: number, high: number }} PricedLine */
/** @typedef {{ base: number, parts: BasePart[], lines: PricedLine[], low: number, high: number, suggested: number, ready: boolean }} RateResult */

/** @type {{ key: DeliverableKey, one: string, many: string }[]} */
export const DELIVERABLES = [
  { key: "reel", one: "Reel", many: "Reels" },
  { key: "story", one: "Story frame", many: "Story frames" },
  { key: "post", one: "static or carousel post", many: "static or carousel posts" },
];

const none = { value: "none", label: "None", low: 0, high: 0, phrase: "" };
/** @param {number} n @param {number} low @param {number} high @param {string} noun @returns {AddOnOption} */
const days = (n, low, high, noun) => ({ value: String(n), label: `${n} days`, low, high, phrase: `${n} days of ${noun}` });

/** @type {AddOn[]} */
export const ADD_ONS = [
  // 0 = included free (coaches quoted by Modash); 20% per 30 days and 2.5 months for a 90-day block (Selene the Lawyer);
  // perpetual 100–200% (industry executives in Storyboard18).
  { key: "organic", label: "Organic use by the brand", options: [
    none,
    days(30, 0, 20, "organic use on your channels"),
    days(90, 0, 50, "organic use on your channels"),
    days(180, 0, 100, "organic use on your channels"),
    { value: "perpetual", label: "Perpetual", low: 100, high: 200, phrase: "perpetual organic use on your channels" },
  ] },
  // 15–40% per 30 days (Aspire 15–35%, Storyboard18 20–40%); 90 days from 40% (Storyboard18) to 2.5 × 40%.
  { key: "paid", label: "Paid usage or whitelisting", options: [
    none,
    days(30, 15, 40, "paid usage"),
    days(60, 30, 80, "paid usage"),
    days(90, 40, 100, "paid usage"),
  ] },
  // 10–15% (easy category) to about 50% (crowded category) per 30 days: a creator coach quoted by Modash.
  { key: "exclusivity", label: "Category exclusivity", options: [
    none,
    days(30, 10, 50, "category exclusivity"),
    days(60, 20, 100, "category exclusivity"),
    days(90, 30, 150, "category exclusivity"),
  ] },
];

/** Delivery in under 7 days (Selene the Lawyer: commonly 20–50%). */
export const RUSH = { low: 20, high: 50 };
/** Each extra revision round (Selene the Lawyer: 10–25% of base per round). */
export const EXTRA_REVISION = { low: 10, high: 25 };

const LOCALES = { INR: "en-IN", USD: "en-US" };

/** Whole-unit money: 150000 INR -> "₹1,50,000", 1500 USD -> "$1,500".
 * @param {number} amount @param {Currency} currency @returns {string} */
export function formatMoney(amount, currency) {
  return new Intl.NumberFormat(LOCALES[currency], { style: "currency", currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}

/** Reads a typed amount such as "₹1,50,000", "$1,500.50" or 1500. Empty, negative or unreadable input is 0.
 * @param {unknown} value @returns {number} */
export function toAmount(value) {
  const n = typeof value === "number" ? value : Number.parseFloat(String(value ?? "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** @param {unknown} value @returns {number} */
export const toCount = (value) => Math.floor(toAmount(value));

/** Rounds a quote to a clean number at most 2.5% away: 1,547 -> 1,550 and 1,24,700 -> 1,25,000.
 * @param {number} amount @returns {number} */
export function roundQuote(amount) {
  if (!(amount > 0) || !Number.isFinite(amount)) return 0;
  const step = Math.max(1, 5 * 10 ** (Math.floor(Math.log10(amount)) - 2));
  return Math.round(amount / step) * step;
}

/** The rounded middle of a range, kept inside it. @param {number} low @param {number} high */
const middle = (low, high) => Math.min(high, Math.max(low, roundQuote((low + high) / 2)));

/** @param {RateInput} input @returns {RateResult} */
export function calculate(input) {
  const parts = DELIVERABLES.map(({ key, one, many }) => {
    const qty = toCount(input.quantities?.[key]);
    // Whole units first, so the "qty × fee" shown in the breakdown always equals the amount.
    const fee = Math.round(toAmount(input.fees?.[key]));
    return { key, label: `${qty} ${qty === 1 ? one : many}`, qty, fee, amount: qty * fee };
  }).filter((part) => part.qty > 0);
  const base = parts.reduce((sum, part) => sum + part.amount, 0);

  /** @type {Omit<PricedLine, "low"|"high">[]} */
  const picked = [];
  for (const group of ADD_ONS) {
    const option = group.options.find((o) => o.value === input[group.key]);
    if (option && option !== none) picked.push({ key: group.key, label: `${group.label}, ${option.label.toLowerCase()}`, phrase: option.phrase, lowPct: option.low, highPct: option.high });
  }
  if (input.rush) picked.push({ key: "rush", label: "Rush delivery, under 7 days", phrase: "delivery within 7 days", lowPct: RUSH.low, highPct: RUSH.high });
  const rounds = toCount(input.extraRevisions);
  if (rounds > 0) {
    const label = `${rounds} extra revision round${rounds === 1 ? "" : "s"}`;
    picked.push({ key: "revisions", label, phrase: label, lowPct: EXTRA_REVISION.low * rounds, highPct: EXTRA_REVISION.high * rounds });
  }

  const lines = picked.map((line) => ({ ...line, low: Math.round((base * line.lowPct) / 100), high: Math.round((base * line.highPct) / 100) }));
  const low = lines.reduce((sum, line) => sum + line.low, base);
  const high = lines.reduce((sum, line) => sum + line.high, base);
  return { base, parts, lines, low, high, suggested: middle(low, high), ready: base > 0 };
}

/** @param {string[]} items "a", "a and b", "a, b and c" */
const list = (items) => (items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);

/** A reply to paste into the DM, or "" until there is a base fee.
 * @param {RateInput} input @param {RateResult} result @returns {string} */
export function replySentence(input, result) {
  if (!result.ready) return "";
  const extras = result.lines.map((line) => line.phrase);
  const keys = result.lines.map((line) => line.key);
  const flexible = [(keys.includes("organic") || keys.includes("paid")) && "usage", keys.includes("exclusivity") && "exclusivity"].filter(Boolean).join(" or ");
  return `Thanks for sending this over! My rate for ${list(result.parts.map((part) => part.label))}${extras.length ? `, with ${list(extras)},` : ""} is ${formatMoney(result.suggested, input.currency)}.`
    + (flexible ? ` If that’s over your budget, I’m happy to look at shorter ${flexible} terms.` : "");
}

/** Reel fee from average views and a CPM (fee per 1,000 views) the creator chooses. One CPM is enough.
 * @param {unknown} views @param {unknown} cpmLow @param {unknown} cpmHigh
 * @returns {{ low: number, high: number, suggested: number } | null} null until views and a CPM are filled in. */
export function feeFromViews(views, cpmLow, cpmHigh) {
  const perThousand = toAmount(views) / 1000;
  const [a, b] = [toAmount(cpmLow), toAmount(cpmHigh)].sort((x, y) => x - y);
  if (!perThousand || !b) return null;
  const low = Math.round(perThousand * (a || b));
  const high = Math.round(perThousand * b);
  return { low, high, suggested: middle(low, high) };
}
