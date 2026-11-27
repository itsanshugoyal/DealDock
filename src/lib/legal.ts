// One source for the facts every policy page repeats, so they can never disagree.
// Values in [brackets] are placeholders the founders must fill before production; the pages render them as-is.
export const LEGAL = {
  updated: "28 November 2026",
  entity: "[Legal company name]",
  address: "[Registered address]",
  registration: "[CIN / registration number, if any]",
  gstin: "[GSTIN, if registered]",
  email: "hello@dealdock.io",
  phone: "[Phone number]",
  supportHours: "Monday to Friday, 10:00 to 18:00 IST",
  grievanceOfficer: "[Grievance officer name]",
  grievanceEmail: "hello@dealdock.io",
  governingCity: "[City]",
  appUrl: "https://app.dealdock.io",
} as const;

export const PLANS = [
  { name: "Solo", inr: "₹4,000", usd: "$49", who: "One creator and one Instagram account." },
  { name: "Studio", inr: "₹8,000", usd: "$99", who: "A creator plus an assistant seat." },
  { name: "Roster", inr: "₹15,000", usd: "$179", who: "Up to five creators, each with their own inbox, plus manager seats." },
] as const;

export const FOOTER_LINKS = [
  ["/pricing", "Pricing"],
  ["/terms", "Terms"],
  ["/privacy", "Privacy"],
  ["/refunds", "Refunds"],
  ["/delivery", "Delivery"],
  ["/data-deletion", "Data deletion"],
  ["/contact", "Contact"],
] as const;
