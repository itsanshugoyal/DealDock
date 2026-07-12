export type ClassificationType = "brand" | "coaching" | "course" | "other";

export type InboxRow = {
  type: ClassificationType;
  handle: string;
  preview: string;
  value: number;
  valueSuffix: string;
  age: string;
  hasDraft: boolean;
  isNew: boolean;
  avatarColor: string;
  initials: string;
};

export type LedgerMonth = { label: string; value: number; height: number };
export type LedgerDeal = { date: string; handle: string; type: ClassificationType; value: number };

export type DmRow = {
  text: string;
  type: "fan" | "brand" | "coaching" | "course" | "spam";
  sender: string;
  value?: string;
};

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

export type Testimonial = {
  name: string;
  handle: string;
  niche: string;
  followers: string;
  quote: string;
  recovered: string;
  recoveredLabel: string;
  initials: string;
  accentColor: string;
};

export type FaqItem = { q: string; a: string };

export type Creator = { name: string; img: string; niche: string };

export type LocaleContent = {
  id: "in" | "global";
  routePath: string; // "/" or "/global"
  label: string; // shown in switcher, e.g. "India" / "Global"
  flag: string; // emoji
  currencySymbol: string;
  currencyCode: string;
  /** For RupeeCounter: whether values are lakh-notation (decimals) or whole-number comma notation */
  moneyFormat: "lakh" | "comma";

  meta: {
    title: string;
    description: string;
    ogDescription: string;
  };

  hero: {
    headlineLines: string[];
    highlightWord: string;
    subheadPrefix: string;
    subheadBoldStat: string;
    trustLine: string;
  };

  socialProof: {
    statPrefix: string; // "40+ creators"
    statMiddle: string; // "recovering"
    statValue: string; // "₹1.2Cr+" / "$150K+"
    statSuffix: string; // "monthly"
    creators: Creator[];
  };

  inboxMockup: {
    rows: InboxRow[];
    footerLabel: string;
  };

  dmThreadMockup: {
    rows: DmRow[];
  };

  problem: {
    eyebrow: string;
    headlinePrefix: string;
    headlineHighlight: string;
    para1: string;
    para2Prefix: string;
    para2Bold: string;
    calloutPrefix: string;
    calloutValue: string;
    calloutSuffix: string;
  };

  howItWorks: {
    steps: {
      title: string;
      body: string;
    }[];
  };

  features: {
    inboxBody: string;
    voiceBody: string;
    voiceDraft: string;
    ledgerBody: string;
    reviewBody: string;
    languageTitle: string;
    languageBody: string;
    languageDraft: string;
    inboxVisualRows: { type: ClassificationType; value: string; preview: string }[];
  };

  ledgerShowcase: {
    headline: string;
    subhead: string;
    stats: { stat: string; label: string; color: string }[];
  };

  ledgerMockup: {
    months: LedgerMonth[];
    recentDeals: LedgerDeal[];
    tileLabels: { thisMonth: string; avgDeal: string; topDeal: string };
    thisMonthValue: number;
    avgDealValue: number;
    topDealValue: number;
  };

  pricing: {
    tiers: PricingTier[];
    termsNote: string;
  };

  testimonials: Testimonial[];

  faq: FaqItem[];

  finalCta: {
    body: string;
    trustLine: string;
  };

  footer: {
    tagline: string;
  };

  applyModal: {
    whatsappNumber: string;
  };
};
