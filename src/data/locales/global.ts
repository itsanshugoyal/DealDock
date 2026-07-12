import type { LocaleContent } from "./types";

export const globalLocale: LocaleContent = {
  id: "global",
  routePath: "/global",
  label: "Global",
  flag: "🌍",
  currencySymbol: "$",
  currencyCode: "USD",
  moneyFormat: "comma",

  meta: {
    title: "DealDock — Revenue Recovery for Instagram Creators",
    description:
      "DealDock finds high-value brand deals, coaching leads, and course inquiries buried in your Instagram DMs. Sorted by deal value. Replied in your voice. Average pilot creator recovers $2,800 in month one.",
    ogDescription:
      "Stop losing thousands in your DMs. DealDock classifies, sorts, and drafts replies for every brand deal and coaching lead in your inbox.",
  },

  hero: {
    headlineLines: ["You're losing", "thousands every month.", "They're sitting", "in your DMs."],
    highlightWord: "thousands",
    subheadPrefix:
      "DealDock finds the brand deals, coaching leads, and course inquiries buried in your Instagram inbox — sorts them by deal value — and drafts replies in your voice.",
    subheadBoldStat: "Average pilot creator: $2,800 recovered in month one.",
    trustLine: "Capped cohort · No setup fee · Cancel anytime",
  },

  socialProof: {
    statPrefix: "40+ creators",
    statMiddle: "recovering",
    statValue: "$150K+",
    statSuffix: "monthly",
    creators: [
      { name: "Sarah Mitchell", img: "https://i.pravatar.cc/40?img=1", niche: "Fitness" },
      { name: "Jake Torres", img: "https://i.pravatar.cc/40?img=8", niche: "Business" },
      { name: "Emma Chen", img: "https://i.pravatar.cc/40?img=5", niche: "Lifestyle" },
      { name: "Lauren Diaz", img: "https://i.pravatar.cc/40?img=9", niche: "Fashion" },
      { name: "Ryan Cole", img: "https://i.pravatar.cc/40?img=13", niche: "Tech" },
      { name: "Maria Garcia", img: "https://i.pravatar.cc/40?img=25", niche: "Food" },
      { name: "Tom Walsh", img: "https://i.pravatar.cc/40?img=14", niche: "Travel" },
      { name: "Olivia Brooks", img: "https://i.pravatar.cc/40?img=26", niche: "Beauty" },
    ],
  },

  inboxMockup: {
    footerLabel: "4 of 23 messages",
    rows: [
      {
        type: "brand", handle: "@glowbrand_collab",
        preview: "Hi! We'd love to collaborate on our Q2 campaign...",
        value: 3200, valueSuffix: "", age: "2h ago", hasDraft: true, isNew: true,
        avatarColor: "#22c55e", initials: "GB",
      },
      {
        type: "coaching", handle: "@jaketorres_coaching",
        preview: "Hey! Your 12-week program — do you take 1-on-1 clients?",
        value: 1800, valueSuffix: "", age: "4h ago", hasDraft: true, isNew: false,
        avatarColor: "#3b82f6", initials: "JT",
      },
      {
        type: "course", handle: "@emma_learns",
        preview: "Is the next cohort of your course still open? I've...",
        value: 800, valueSuffix: "", age: "5h ago", hasDraft: true, isNew: false,
        avatarColor: "#a855f7", initials: "EL",
      },
      {
        type: "brand", handle: "@modernlearning_co",
        preview: "Hey! We've been following your content and think...",
        value: 2500, valueSuffix: "", age: "8h ago", hasDraft: false, isNew: false,
        avatarColor: "#f97316", initials: "ML",
      },
    ],
  },

  dmThreadMockup: {
    rows: [
      { text: "Love your content!! 🔥🔥", type: "fan", sender: "@mike_fan123" },
      { text: "Hi! We're GlowBrand — interested in a paid collab for our Q2...", type: "brand", sender: "@glowbrand_collab", value: "$3,200" },
      { text: "Which protein do you recommend for beginners??", type: "fan", sender: "@gym_newbie_99" },
      { text: "Hey! Your coaching program — is 1-on-1 still available?", type: "coaching", sender: "@jaketorres_coaching", value: "$1,800" },
      { text: "Your story was so inspiring 😭❤️", type: "fan", sender: "@sara_admirer" },
      { text: "Free collab — we send products, you post once?", type: "spam", sender: "@freeproducts_collab" },
      { text: "Is your next course cohort still open? I've been waiting...", type: "course", sender: "@emma_learns", value: "$800" },
      { text: "Can you check my workout plan?? DM me", type: "fan", sender: "@health_enthusiast" },
    ],
  },

  problem: {
    eyebrow: "The Invisible Leak",
    headlinePrefix: "Your inbox is a",
    headlineHighlight: "$60K graveyard.",
    para1:
      "That $4,000 brand brief from a premium DTC brand? It arrived on Tuesday. By the time you saw it on Thursday — buried under 180 fan messages and three spam collabs — they'd already moved on to the next creator who replied in four hours.",
    para2Prefix:
      "The coaching enquiry that went cold. The course question from a warm lead who bought a competitor's program instead.",
    para2Bold:
      "You'll never know the exact number you've lost — because the messages you never saw can't tell you what they were worth.",
    calloutPrefix: "Creators in our pilot were missing",
    calloutValue: "$2,000–$8,000 per month",
    calloutSuffix: "before connecting DealDock.",
  },

  howItWorks: {
    steps: [
      {
        title: "Connect your Instagram",
        body: "One OAuth tap. DealDock begins reading your inbox within 60 seconds. Official Meta API only — your account safety is non-negotiable.",
      },
      {
        title: "We sort by deal value",
        body: "AI classifies every DM — brand deal, coaching lead, course inquiry — in any language your audience speaks. The most valuable messages surface to the top, not the most recent.",
      },
      {
        title: "Draft, send, track the money",
        body: "Voice-matched replies drafted for you. Review, edit, send. Every closed deal logged instantly in your Revenue Ledger. You see the dollars you recovered, month over month.",
      },
    ],
  },

  features: {
    inboxBody:
      "Every DM sorted by what it's worth. Brand deals at the top. Fan messages at the bottom. The $3,000 brief that would've expired unseen? Now it's the first thing you see.",
    voiceBody:
      "Drafts that sound like you wrote them — your greeting, your tone, your sign-off. 70% of pilot creators send them without edits.",
    voiceDraft:
      "\"Hey Jake! Yes, 1-on-1 coaching is open for the right fit. My 12-week program is $450 — DM me your goals and we'll see if it's a match 💪\"",
    ledgerBody:
      "One-tap close. Every recovered dollar tracked month over month. Proof that DealDock pays for itself many times over.",
    reviewBody: "Uncertain messages go to review — never your inbox. Nothing sends without your approval. Ever.",
    languageTitle: "Any language. Every message.",
    languageBody: "Code-switching, slang, emoji-heavy DMs — none of it breaks our classifier. Built for how creators actually talk online.",
    languageDraft: "\"Hey! I really want to join your coaching program, how much do you charge?\"",
    inboxVisualRows: [
      { type: "brand", value: "$3,200", preview: "@glowbrand_collab" },
      { type: "coaching", value: "$1,800", preview: "@jaketorres_coaching" },
      { type: "course", value: "$800", preview: "@emma_learns" },
    ],
  },

  ledgerShowcase: {
    headline: "See every dollar you've recovered.",
    subhead:
      "Month-over-month growth you can point to. Your Revenue Ledger isn't just a dashboard — it's proof. For yourself, your manager, your next brand negotiation.",
    stats: [
      { stat: "$2,800", label: "avg recovered in month 1", color: "#ffc107" },
      { stat: "70%", label: "of drafts sent without edits", color: "#22c55e" },
      { stat: "90%+", label: "classification accuracy", color: "#3b82f6" },
    ],
  },

  ledgerMockup: {
    months: [
      { label: "Dec", value: 1200, height: 28 },
      { label: "Jan", value: 2100, height: 48 },
      { label: "Feb", value: 1800, height: 40 },
      { label: "Mar", value: 3400, height: 75 },
      { label: "Apr", value: 2900, height: 64 },
      { label: "May", value: 4700, height: 100 },
    ],
    recentDeals: [
      { date: "May 3", handle: "@glowbrand_collab", type: "brand", value: 3200 },
      { date: "Apr 28", handle: "@jaketorres_coaching", type: "coaching", value: 1800 },
      { date: "Apr 21", handle: "@modernlearning_co", type: "brand", value: 2500 },
    ],
    tileLabels: { thisMonth: "This month", avgDeal: "Avg deal size", topDeal: "Top deal" },
    thisMonthValue: 4700,
    avgDealValue: 2400,
    topDealValue: 3200,
  },

  pricing: {
    tiers: [
      {
        id: "solo", name: "Solo", price: 49, period: "/month", for: "Solo creators",
        igAccounts: "1 Instagram account", seats: "1 seat",
        features: [
          "Revenue Inbox sorted by $ value", "AI message classification", "Voice-matched reply drafting",
          "Revenue Ledger", "Review Queue", "Multi-language support", "CSV data export",
        ],
        cta: "Apply for Pilot", highlighted: false,
      },
      {
        id: "studio", name: "Studio", price: 99, period: "/month", for: "Creator + assistant",
        igAccounts: "1 Instagram account", seats: "2 seats",
        features: [
          "Everything in Solo", "Priority review queue", "Per-seat audit trail",
          "Manager can draft & send", "Assistant access controls", "Priority founding-team support",
        ],
        cta: "Apply for Pilot", highlighted: true, badge: "Most Popular",
      },
      {
        id: "roster", name: "Roster", price: 179, period: "/month", for: "Managers & agencies",
        igAccounts: "Up to 5 accounts", seats: "Multiple manager seats",
        features: [
          "Everything in Studio", "Roster-wide dashboard", "Per-creator voice profiles",
          "Per-creator revenue reports", "Org-level recovery analytics", "Direct line to founding team",
        ],
        cta: "Apply for Pilot", highlighted: false,
      },
    ],
    termsNote:
      "Pilot members keep this pricing as long as they remain subscribed. First invoice runs after one full week of active use.",
  },

  testimonials: [
    {
      name: "Sarah Mitchell", handle: "@sarahfitcoach", niche: "Fitness Coach", followers: "142K followers",
      quote: "I missed a $4,500 brand deal because it was buried under 200 fan messages. DealDock would have surfaced it in seconds. Week one alone recovered what I'd lost the previous month.",
      recovered: "3800", recoveredLabel: "recovered, month 1", initials: "SM", accentColor: "#22c55e",
    },
    {
      name: "Jake Torres", handle: "@jaketorres_coaching", niche: "Business Coach", followers: "89K followers",
      quote: "My inbox was a disaster — I'm terrible at replying. Now every coaching inquiry gets a draft reply in my exact tone before I've even opened the app. My reply rate went from 40% to 94%.",
      recovered: "2200", recoveredLabel: "recovered, month 1", initials: "JT", accentColor: "#3b82f6",
    },
    {
      name: "Emma Chen", handle: "@emmacreates", niche: "Course Creator", followers: "210K followers",
      quote: "The voice matching is genuinely scary-good. My community thought I replied personally to every course inquiry. I did — DealDock just wrote the first draft.",
      recovered: "6100", recoveredLabel: "recovered, month 1", initials: "EC", accentColor: "#a855f7",
    },
  ],

  faq: [
    { q: "Is my Instagram account safe?", a: "Completely. DealDock connects only through Meta's official Graph API — no browser automation, no scraping, no unofficial workarounds. We never touch your password. Your account policy risk is zero." },
    { q: "How does voice matching work?", a: "During onboarding, we ingest a sample of your recent sent DMs (with your explicit consent) to learn your writing style — your greeting, sentence length, tone, sign-off, and characteristic phrases. By day 7, drafted replies should feel indistinguishable from your own writing." },
    { q: "What if the AI misclassifies a message?", a: "Anything below 80% confidence automatically routes to the Review Queue — not your Revenue Inbox. You see the message, the best-guess classification, and the confidence level. One tap to confirm or override. Every correction makes the system smarter for your specific account." },
    { q: "Does DealDock ever auto-send replies?", a: "Never. Every reply requires your approval — or an authorised seat's approval — before it sends. This is a non-negotiable product principle, not just a setting. Your audience's trust stays yours." },
    { q: "Do you support multiple languages?", a: "Yes. Our classifier handles English, Spanish, and mixed-language DMs without degrading accuracy — built for how a global creator audience actually messages." },
    { q: "How does pricing work during the pilot?", a: "Monthly billing only — no annual lock-in. No setup fee. The first invoice runs after you've actively used DealDock for one full week, so you're paying for results, not promises. Pilot members keep their pricing as long as they remain subscribed." },
    { q: "Can my manager or assistant access my inbox?", a: "Yes, on Studio (1 creator + 1 assistant) and Roster (up to 5 accounts, multiple manager seats) tiers. Each reply sent is logged with the sender's seat identity — full audit trail so you always know what was sent and by whom." },
    { q: "What happens to my data when I cancel?", a: "Your Revenue Ledger stays accessible read-only for 30 days post-cancellation. You can export everything — processed DMs, classifications, drafts, ledger entries — as a full archive at any time. After 30 days, all data is permanently deleted." },
  ],

  finalCta: {
    body: "Join the pilot. Capped cohort. $49/month. Pays for itself in one recovered deal.",
    trustLine: "No setup fee · Cancel anytime · First invoice after one week of active use",
  },

  footer: { tagline: "Revenue recovery for Instagram creators." },

  applyModal: { whatsappNumber: "919999999999" },
};
