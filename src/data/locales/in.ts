import type { LocaleContent } from "./types";

export const inLocale: LocaleContent = {
  id: "in",
  routePath: "/",
  label: "India",
  flag: "🇮🇳",
  currencySymbol: "₹",
  currencyCode: "INR",
  moneyFormat: "lakh",

  meta: {
    title: "DealDock — Revenue Recovery for Instagram Creators",
    description:
      "DealDock finds high-value brand deals, coaching leads, and course inquiries buried in your Instagram DMs. Sorted by rupee value. Replied in your voice. Average pilot creator recovers ₹2.4L in month one.",
    ogDescription:
      "Stop losing lakhs in your DMs. DealDock classifies, sorts, and drafts replies for every brand deal and coaching lead in your inbox.",
  },

  hero: {
    headlineLines: ["You're losing", "lakhs every month.", "They're sitting", "in your DMs."],
    highlightWord: "lakhs",
    subheadPrefix:
      "DealDock finds the brand deals, coaching leads, and course inquiries buried in your Instagram inbox — sorts them by rupee value — and drafts replies in your voice.",
    subheadBoldStat: "Average pilot creator: ₹2.4L recovered in month one.",
    trustLine: "Capped cohort · No setup fee · Cancel anytime",
  },

  socialProof: {
    statPrefix: "40+ creators",
    statMiddle: "recovering",
    statValue: "₹1.2Cr+",
    statSuffix: "monthly",
    creators: [
      { name: "Priya Sharma", img: "https://i.pravatar.cc/40?img=47", niche: "Fitness" },
      { name: "Rahul Kapoor", img: "https://i.pravatar.cc/40?img=12", niche: "Business" },
      { name: "Ananya Singh", img: "https://i.pravatar.cc/40?img=49", niche: "Lifestyle" },
      { name: "Nisha Kumar", img: "https://i.pravatar.cc/40?img=45", niche: "Fashion" },
      { name: "Shivam Patel", img: "https://i.pravatar.cc/40?img=15", niche: "Tech" },
      { name: "Deepika Mehra", img: "https://i.pravatar.cc/40?img=44", niche: "Food" },
      { name: "Vivek Rathi", img: "https://i.pravatar.cc/40?img=33", niche: "Travel" },
      { name: "Kavya Pillai", img: "https://i.pravatar.cc/40?img=48", niche: "Beauty" },
    ],
  },

  inboxMockup: {
    footerLabel: "4 of 23 messages",
    rows: [
      {
        type: "brand", handle: "@herbalindia_brand",
        preview: "Hi! We'd love to collaborate on our Q2 campaign...",
        value: 3.2, valueSuffix: "L", age: "2h ago", hasDraft: true, isNew: true,
        avatarColor: "#22c55e", initials: "HI",
      },
      {
        type: "coaching", handle: "@vikram_fitness91",
        preview: "Bhai your 12-week program — do you take one-on-one?",
        value: 1.8, valueSuffix: "L", age: "4h ago", hasDraft: true, isNew: false,
        avatarColor: "#3b82f6", initials: "VF",
      },
      {
        type: "course", handle: "@anjali_learns",
        preview: "Is the next cohort of your course still open? I've...",
        value: 0.8, valueSuffix: "L", age: "5h ago", hasDraft: true, isNew: false,
        avatarColor: "#a855f7", initials: "AL",
      },
      {
        type: "brand", handle: "@nykaa_collab",
        preview: "Hey! We've been following your content and think...",
        value: 2.5, valueSuffix: "L", age: "8h ago", hasDraft: false, isNew: false,
        avatarColor: "#f97316", initials: "NK",
      },
    ],
  },

  dmThreadMockup: {
    rows: [
      { text: "Love your content bhai!! 🔥🔥", type: "fan", sender: "@rohan_fan123" },
      { text: "Hi! We're Herbalia India — interested in a paid collab for our Q2...", type: "brand", sender: "@herbalindia_brand", value: "₹3.2L" },
      { text: "Bro which protein do you recommend for beginners??", type: "fan", sender: "@gym_newbie_99" },
      { text: "Hey! Your coaching program — is 1-on-1 still available?", type: "coaching", sender: "@vikram_fitness91", value: "₹1.8L" },
      { text: "Your story was so inspiring 😭❤️", type: "fan", sender: "@anjali_admirer" },
      { text: "Free collab — we send products, you post once?", type: "spam", sender: "@freeproducts_collab" },
      { text: "Is your next course cohort still open? I've been waiting...", type: "course", sender: "@anjali_learns", value: "₹80K" },
      { text: "Bhai can you check my diet plan?? DM kar", type: "fan", sender: "@health_enthusiast" },
    ],
  },

  problem: {
    eyebrow: "The Invisible Leak",
    headlinePrefix: "Your inbox is a",
    headlineHighlight: "₹50L graveyard.",
    para1:
      "That ₹4L brand brief from a premium D2C brand? It arrived on Tuesday. By the time you saw it on Thursday — buried under 180 fan messages and three spam collabs — they'd already moved on to the next creator who replied in four hours.",
    para2Prefix:
      "The coaching enquiry that went cold. The course question from a warm lead who bought a competitor's program instead.",
    para2Bold:
      "You'll never know the exact number you've lost — because the messages you never saw can't tell you what they were worth.",
    calloutPrefix: "Creators in our pilot were missing",
    calloutValue: "₹2L–₹8L per month",
    calloutSuffix: "before connecting DealDock.",
  },

  howItWorks: {
    steps: [
      {
        title: "Connect your Instagram",
        body: "One OAuth tap. DealDock begins reading your inbox within 60 seconds. Official Meta API only — your account safety is non-negotiable.",
      },
      {
        title: "We sort by rupee value",
        body: "AI classifies every DM — brand deal, coaching lead, course inquiry. Hinglish, Hindi, English. The most valuable messages surface to the top, not the most recent.",
      },
      {
        title: "Draft, send, track the money",
        body: "Voice-matched replies drafted for you. Review, edit, send. Every closed deal logged instantly in your Revenue Ledger. You see the rupees you recovered, month over month.",
      },
    ],
  },

  features: {
    inboxBody:
      "Every DM sorted by what it's worth. Brand deals at the top. Fan messages at the bottom. The ₹3L brief that would've expired unseen? Now it's the first thing you see.",
    voiceBody:
      "Drafts that sound like you wrote them — your greeting, your tone, your sign-off. 70% of pilot creators send them without edits.",
    voiceDraft:
      "\"Hey Vikram! Haan bhai, 1-on-1 coaching still open for the right fit. My 12-week program is ₹18K — DM me your goals and we'll see if it's a match 💪\"",
    ledgerBody:
      "One-tap close. Every recovered rupee tracked month over month. Proof that DealDock pays for itself many times over.",
    reviewBody: "Uncertain messages go to review — never your inbox. Nothing sends without your approval. Ever.",
    languageTitle: "Hindi. English. Hinglish.",
    languageBody: "Code-switching doesn't break our classifier. Built for how Indian creators actually talk — bro, this works.",
    languageDraft: "\"Bhai tera coaching program lena hai yaar, kitna charge karta hai?\"",
    inboxVisualRows: [
      { type: "brand", value: "₹3.2L", preview: "@herbalindia_brand" },
      { type: "coaching", value: "₹1.8L", preview: "@vikram_fitness91" },
      { type: "course", value: "₹80K", preview: "@anjali_learns" },
    ],
  },

  ledgerShowcase: {
    headline: "See every rupee you've recovered.",
    subhead:
      "Month-over-month growth you can point to. Your Revenue Ledger isn't just a dashboard — it's proof. For yourself, your manager, your next brand negotiation.",
    stats: [
      { stat: "₹2.4L", label: "avg recovered in month 1", color: "#ffc107" },
      { stat: "70%", label: "of drafts sent without edits", color: "#22c55e" },
      { stat: "90%+", label: "classification accuracy", color: "#3b82f6" },
    ],
  },

  ledgerMockup: {
    months: [
      { label: "Dec", value: 1.2, height: 28 },
      { label: "Jan", value: 2.1, height: 48 },
      { label: "Feb", value: 1.8, height: 40 },
      { label: "Mar", value: 3.4, height: 75 },
      { label: "Apr", value: 2.9, height: 64 },
      { label: "May", value: 4.7, height: 100 },
    ],
    recentDeals: [
      { date: "May 3", handle: "@herbalindia_brand", type: "brand", value: 3.2 },
      { date: "Apr 28", handle: "@vikram_fitness91", type: "coaching", value: 1.8 },
      { date: "Apr 21", handle: "@nykaa_collab", type: "brand", value: 2.5 },
    ],
    tileLabels: { thisMonth: "This month", avgDeal: "Avg deal size", topDeal: "Top deal" },
    thisMonthValue: 4.7,
    avgDealValue: 2.4,
    topDealValue: 3.2,
  },

  pricing: {
    tiers: [
      {
        id: "solo", name: "Solo", price: 4000, period: "/month", for: "Solo creators",
        igAccounts: "1 Instagram account", seats: "1 seat",
        features: [
          "Revenue Inbox sorted by ₹ value", "AI message classification", "Voice-matched reply drafting",
          "Revenue Ledger", "Review Queue", "Hindi, English & Hinglish support", "CSV data export",
        ],
        cta: "Apply for Pilot", highlighted: false,
      },
      {
        id: "studio", name: "Studio", price: 8000, period: "/month", for: "Creator + assistant",
        igAccounts: "1 Instagram account", seats: "2 seats",
        features: [
          "Everything in Solo", "Priority review queue", "Per-seat audit trail",
          "Manager can draft & send", "Assistant access controls", "Priority founding-team support",
        ],
        cta: "Apply for Pilot", highlighted: true, badge: "Most Popular",
      },
      {
        id: "roster", name: "Roster", price: 15000, period: "/month", for: "Managers & agencies",
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
      name: "Priya Menon", handle: "@priyafitpro", niche: "Fitness Coach", followers: "142K followers",
      quote: "I missed a ₹4.5L brand deal because it was buried under 200 fan messages. DealDock would have surfaced it in seconds. Week one alone recovered what I'd lost the previous month.",
      recovered: "3.8", recoveredLabel: "lakhs recovered, month 1", initials: "PM", accentColor: "#22c55e",
    },
    {
      name: "Rahul Kapoor", handle: "@rahulconsults", niche: "Business Consultant", followers: "89K followers",
      quote: "My inbox was a disaster — I'm terrible at replying. Now every coaching inquiry gets a draft reply in my exact tone before I've even opened the app. My reply rate went from 40% to 94%.",
      recovered: "2.2", recoveredLabel: "lakhs recovered, month 1", initials: "RK", accentColor: "#3b82f6",
    },
    {
      name: "Ananya Sharma", handle: "@ananyacreates", niche: "Course Creator", followers: "210K followers",
      quote: "The voice matching is genuinely scary-good. My community thought I replied personally to every course inquiry. I did — DealDock just wrote the first draft.",
      recovered: "6.1", recoveredLabel: "lakhs recovered, month 1", initials: "AS", accentColor: "#a855f7",
    },
  ],

  faq: [
    { q: "Is my Instagram account safe?", a: "Completely. DealDock connects only through Meta's official Graph API — no browser automation, no scraping, no unofficial workarounds. We never touch your password. Your account policy risk is zero." },
    { q: "How does voice matching work?", a: "During onboarding, we ingest a sample of your recent sent DMs (with your explicit consent) to learn your writing style — your greeting, sentence length, tone, sign-off, and characteristic phrases. By day 7, drafted replies should feel indistinguishable from your own writing." },
    { q: "What if the AI misclassifies a message?", a: "Anything below 80% confidence automatically routes to the Review Queue — not your Revenue Inbox. You see the message, the best-guess classification, and the confidence level. One tap to confirm or override. Every correction makes the system smarter for your specific account." },
    { q: "Does DealDock ever auto-send replies?", a: "Never. Every reply requires your approval — or an authorised seat's approval — before it sends. This is a non-negotiable product principle, not just a setting. Your audience's trust stays yours." },
    { q: "Do you support Hindi and Hinglish messages?", a: "Yes, and this was a core requirement from day one. Indian DMs are heavily code-switched. Our classifier handles Hindi, English, and Hinglish without degrading accuracy — it was built specifically for the Indian creator market." },
    { q: "How does pricing work during the pilot?", a: "Monthly billing only — no annual lock-in. No setup fee. The first invoice runs after you've actively used DealDock for one full week, so you're paying for results, not promises. Pilot members keep their pricing as long as they remain subscribed." },
    { q: "Can my manager or assistant access my inbox?", a: "Yes, on Studio (1 creator + 1 assistant) and Roster (up to 5 accounts, multiple manager seats) tiers. Each reply sent is logged with the sender's seat identity — full audit trail so you always know what was sent and by whom." },
    { q: "What happens to my data when I cancel?", a: "Your Revenue Ledger stays accessible read-only for 30 days post-cancellation. You can export everything — processed DMs, classifications, drafts, ledger entries — as a full archive at any time. After 30 days, all data is permanently deleted." },
  ],

  finalCta: {
    body: "Join the pilot. Capped cohort. ₹4,000/month. Pays for itself in one recovered deal.",
    trustLine: "No setup fee · Cancel anytime · First invoice after one week of active use",
  },

  footer: { tagline: "Revenue recovery for Instagram creators." },

  applyModal: { whatsappNumber: "919999999999" },
};
