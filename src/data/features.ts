export type Feature = {
  id: string;
  title: string;
  body: string;
  span: "large" | "medium" | "small";
  accentColor?: string;
};

export const features: Feature[] = [
  {
    id: "revenue-inbox",
    title: "Revenue Inbox",
    body: "Every DM sorted by what it's worth. Brand deals at the top. Fan messages at the bottom. The ₹3L brief that would've expired unseen? Now it's the first thing you see.",
    span: "large",
  },
  {
    id: "voice-drafting",
    title: "Your voice. AI speed.",
    body: "Drafts that sound like you wrote them — your greeting, your tone, your sign-off. 70% of pilot creators send them without edits.",
    span: "medium",
  },
  {
    id: "revenue-ledger",
    title: "Revenue Ledger",
    body: "One-tap close. Every recovered rupee tracked month over month. Your proof that DealDock pays for itself many times over.",
    span: "small",
  },
  {
    id: "review-queue",
    title: "Human in the loop",
    body: "Uncertain messages go to review — never to your inbox. Nothing sends without your approval. Ever.",
    span: "small",
  },
  {
    id: "hinglish",
    title: "Hindi. English. Hinglish.",
    body: "Code-switching doesn't break our classifier. Built for how Indian creators actually talk.",
    span: "small",
  },
];
