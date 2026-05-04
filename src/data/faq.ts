export type FaqItem = {
  q: string;
  a: string;
};

export const faqItems: FaqItem[] = [
  {
    q: "Is my Instagram account safe?",
    a: "Completely. DealDock connects only through Meta's official Graph API — no browser automation, no scraping, no unofficial workarounds. We never touch your password. Your account policy risk is zero.",
  },
  {
    q: "How does voice matching work?",
    a: "During onboarding, we ingest a sample of your recent sent DMs (with your explicit consent) to learn your writing style — your greeting, sentence length, tone, sign-off, and characteristic phrases. By day 7, drafted replies should feel indistinguishable from your own writing.",
  },
  {
    q: "What if the AI misclassifies a message?",
    a: "Anything below 80% confidence automatically routes to the Review Queue — not your Revenue Inbox. You see the message, the best-guess classification, and the confidence level. One tap to confirm or override. Every correction makes the system smarter for your specific account.",
  },
  {
    q: "Does DealDock ever auto-send replies?",
    a: "Never. Every reply requires your approval — or an authorised seat's approval — before it sends. This is a non-negotiable product principle, not just a setting. Your audience's trust stays yours.",
  },
  {
    q: "Do you support Hindi and Hinglish messages?",
    a: "Yes, and this was a core requirement from day one. Indian DMs are heavily code-switched. Our classifier handles Hindi, English, and Hinglish without degrading accuracy — it was built specifically for the Indian creator market.",
  },
  {
    q: "How does pricing work during the pilot?",
    a: "Monthly billing only — no annual lock-in. No setup fee. The first invoice runs after you've actively used DealDock for one full week, so you're paying for results, not promises. Pilot members keep their pricing as long as they remain subscribed.",
  },
  {
    q: "Can my manager or assistant access my inbox?",
    a: "Yes, on Studio (1 creator + 1 assistant) and Roster (up to 5 accounts, multiple manager seats) tiers. Each reply sent is logged with the sender's seat identity — full audit trail so you always know what was sent and by whom.",
  },
  {
    q: "What happens to my data when I cancel?",
    a: "Your Revenue Ledger stays accessible read-only for 30 days post-cancellation. You can export everything — processed DMs, classifications, drafts, ledger entries — as a full archive at any time. After 30 days, all data is permanently deleted.",
  },
];
