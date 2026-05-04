export type PricingTier = {
  id: string;
  name: string;
  price: number;
  period: string;
  for: string;
  igAccounts: string;
  seats: string;
  features: string[];
  cta: string;
  highlighted: boolean;
  badge?: string;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "solo",
    name: "Solo",
    price: 4000,
    period: "/month",
    for: "Solo creators",
    igAccounts: "1 Instagram account",
    seats: "1 seat",
    features: [
      "Revenue Inbox sorted by ₹ value",
      "AI message classification",
      "Voice-matched reply drafting",
      "Revenue Ledger",
      "Review Queue",
      "Hindi, English & Hinglish support",
      "CSV data export",
    ],
    cta: "Apply for Pilot",
    highlighted: false,
  },
  {
    id: "studio",
    name: "Studio",
    price: 8000,
    period: "/month",
    for: "Creator + assistant",
    igAccounts: "1 Instagram account",
    seats: "2 seats",
    features: [
      "Everything in Solo",
      "Priority review queue",
      "Per-seat audit trail",
      "Manager can draft & send",
      "Assistant access controls",
      "Priority founding-team support",
    ],
    cta: "Apply for Pilot",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "roster",
    name: "Roster",
    price: 15000,
    period: "/month",
    for: "Managers & agencies",
    igAccounts: "Up to 5 accounts",
    seats: "Multiple manager seats",
    features: [
      "Everything in Studio",
      "Roster-wide dashboard",
      "Per-creator voice profiles",
      "Per-creator revenue reports",
      "Org-level recovery analytics",
      "Direct line to founding team",
    ],
    cta: "Apply for Pilot",
    highlighted: false,
  },
];
