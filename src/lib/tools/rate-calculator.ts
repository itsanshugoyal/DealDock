export type Currency = "INR" | "USD";
export const contentTypes = [
  { key: "reel", one: "Reel", many: "Reels" },
  { key: "story", one: "Story frame", many: "Story frames" },
  { key: "post", one: "static or carousel post", many: "static or carousel posts" },
] as const;
export type ContentKey = typeof contentTypes[number]["key"];
export type RateOption = { value: string; label: string; low: number; high: number; phrase: string };
const none: RateOption = { value: "none", label: "None", low: 0, high: 0, phrase: "" };
const term = (days: number, low: number, high: number, phrase: string): RateOption => ({ value: String(days), label: `${days} days`, low, high, phrase: `${days} days of ${phrase}` });

/** Recovered from the published DealDock calculator; source notes reviewed 7 November 2026. */
export const extras = [
  { key: "organic", label: "Organic use by the brand", description: "Reposting on the brand’s channels, website or emails without paid promotion.", options: [none, term(30, 0, 20, "organic use on your channels"), term(90, 0, 50, "organic use on your channels"), term(180, 0, 100, "organic use on your channels"), { value: "perpetual", label: "Perpetual", low: 100, high: 200, phrase: "perpetual organic use on your channels" }] },
  { key: "paid", label: "Paid usage or whitelisting", description: "Running your content as an ad, from the brand’s account or your handle.", options: [none, term(30, 15, 40, "paid usage"), term(60, 30, 80, "paid usage"), term(90, 40, 100, "paid usage")] },
  { key: "exclusivity", label: "Category exclusivity", description: "Agreeing not to work with competitors in a named category for a fixed time.", options: [none, term(30, 10, 50, "category exclusivity"), term(60, 20, 100, "category exclusivity"), term(90, 30, 150, "category exclusivity")] },
] as const;
export type RateInput = {
  currency: Currency; fees: Record<ContentKey, string>; quantities: Record<ContentKey, string>;
  organic: string; paid: string; exclusivity: string; rush: boolean; extraRevisions: string;
};
export function defaultRateInput(currency: Currency = "INR"): RateInput {
  return { currency, fees: currency === "INR" ? { reel: "20000", story: "5000", post: "12000" } : { reel: "1000", story: "250", post: "600" }, quantities: { reel: "1", story: "2", post: "0" }, organic: "30", paid: "30", exclusivity: "none", rush: false, extraRevisions: "0" };
}
export function positiveNumber(value: string | number) {
  const number = Number(typeof value === "string" ? value.replace(/,/g, "") : value);
  return Number.isFinite(number) && number > 0 ? Math.min(number, 1e9) : 0;
}
const count = (value: string, max: number) => Math.min(max, Math.floor(positiveNumber(value)));
export const money = (amount: number, currency: Currency) => new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
const join = (items: readonly string[]) => items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
function roundedMidpoint(low: number, high: number) {
  const midpoint = (low + high) / 2;
  if (!midpoint) return 0;
  const step = Math.max(1, 5 * 10 ** (Math.floor(Math.log10(midpoint)) - 2));
  return Math.min(high, Math.max(low, Math.round(midpoint / step) * step));
}
export function calculateQuote(input: RateInput) {
  const parts = contentTypes.map(item => {
    const qty = count(input.quantities[item.key], 50);
    const fee = Math.round(positiveNumber(input.fees[item.key]));
    return { key: item.key, label: `${qty} ${qty === 1 ? item.one : item.many}`, qty, fee, amount: qty * fee };
  }).filter(item => item.qty > 0);
  const base = parts.reduce((sum, part) => sum + part.amount, 0);
  const selected: { label: string; phrase: string; lowPct: number; highPct: number }[] = [];
  for (const extra of extras) {
    const option = extra.options.find(option => option.value === input[extra.key]);
    if (option && option.value !== "none") selected.push({ label: `${extra.label}, ${option.label.toLowerCase()}`, phrase: option.phrase, lowPct: option.low, highPct: option.high });
  }
  if (input.rush) selected.push({ label: "Rush delivery, under 7 days", phrase: "delivery within 7 days", lowPct: 20, highPct: 50 });
  const revisions = count(input.extraRevisions, 10);
  if (revisions) selected.push({ label: `${revisions} extra revision round${revisions === 1 ? "" : "s"}`, phrase: `${revisions} extra revision round${revisions === 1 ? "" : "s"}`, lowPct: 10 * revisions, highPct: 25 * revisions });
  const lines = selected.map(line => ({ ...line, low: Math.round(base * line.lowPct / 100), high: Math.round(base * line.highPct / 100) }));
  const low = lines.reduce((sum, line) => sum + line.low, base);
  const high = lines.reduce((sum, line) => sum + line.high, base);
  const suggested = roundedMidpoint(low, high);
  const reply = base ? `Thanks for sending this over! My rate for ${join(parts.map(part => part.label))}${lines.length ? `, with ${join(lines.map(line => line.phrase))},` : ""} is ${money(suggested, input.currency)}. If that’s over your budget, I’m happy to look at a smaller scope or shorter usage terms.` : "";
  return { base, parts, lines, low, high, suggested, ready: base > 0, reply };
}
export function estimateFromViews(views: string, cpmLow: string, cpmHigh: string) {
  const impressions = positiveNumber(views) / 1000;
  const [lowCpm, highCpm] = [positiveNumber(cpmLow), positiveNumber(cpmHigh)].sort((a, b) => a - b);
  if (!impressions || !highCpm) return null;
  const low = Math.round(impressions * (lowCpm || highCpm));
  const high = Math.round(impressions * highCpm);
  return { low, high, suggested: roundedMidpoint(low, high) };
}
