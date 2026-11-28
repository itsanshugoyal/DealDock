// Per-locale settings for the landing pages: currency, language, plan names and the FAQ.
// The page's own copy and product examples live in landing/content (LANDING_GLOBAL, LANDING_IN).

export type PlanId = "solo" | "studio" | "roster";
export type Locale = "global" | "in";

export type SiteContent = {
  locale: Locale; currency: "USD" | "INR"; lang: string; path: "/" | "/in";
  plans: { id: PlanId; name: string; featured?: boolean }[];
  faq: { q: string; a: string }[];
};

const PLANS: SiteContent["plans"] = [{ id: "solo", name: "Solo", featured: true }, { id: "studio", name: "Studio" }, { id: "roster", name: "Roster" }];

const sharedFaq = {
  estimates: { q: "How are the money estimates made?", a: "From three things: what the message says (budget, deliverables, dates, how ready they sound), who sent it (followers, a verified badge, whether they follow you), and your own prices, which you set when you join. Every estimate is shown as a range. It decides what you see first and never counts as money you made; only deals you record do." },
  autosend: { q: "Does it ever send on its own?", a: "No. Every reply, follow-up and payment reminder is a draft. It goes out only when you, or someone you’ve added to your team, slides to send, and you get a few seconds to undo. There is no setting that turns this off." },
  both: { q: "Brand deals and coaching: does it handle both?", a: "Yes. It tells a brand brief from a coaching lead, a course question or another sale, and drafts each one differently: rates, deliverables and usage for brands; the next step and your link for clients. You set your prices once, and every estimate and draft uses them." },
  chatgpt: { q: "Why not just use Instagram’s folders or ChatGPT?", a: "Instagram can filter by unread or followers, and ChatGPT can write a reply if you paste a message in. Neither reads every DM and brand email for you, puts a money value on it, writes the way you text, nudges you when a deal goes quiet, or tracks what you’re owed. DealDock does all of that, and still waits for your slide." },
  managers: { q: "Can my manager or agency use it?", a: "Yes. Studio adds a seat for an assistant. Roster covers up to five creators with seats for managers, and each creator keeps their own inbox, voice and revenue. Every reply records who sent it, and creators can see everything sent from their account." },
  after: { q: "What happens after the pilot?", a: "Your price stays the same for as long as you stay subscribed. When DealDock opens to everyone, new members will pay post-pilot prices. If anything about your plan changes, we’ll tell you first." },
  cancel: { q: "Can I cancel and delete my data?", a: "Yes. Cancel anytime from Settings with one confirmation. Your revenue history stays readable for 30 days after you cancel, and you can export it as a CSV whenever you like. If you delete your account, everything is permanently erased after a 7-day grace period." },
  safe: { q: "Is my account safe?", a: "DealDock connects through Meta’s official Instagram API and Google’s official Gmail sign-in. It never asks for your passwords, never scrapes, and never sends bulk or automatic messages. It works within Instagram’s rules, including the 24-hour reply window, and you can disconnect anytime." },
  tiktok: { q: "Do you support TikTok?", a: "Not yet. Instagram DMs and Gmail work today. TikTok and other platforms are next on the list." },
};

const read = (scope: string) => ({ q: "What does DealDock read and store?", a: `It reads the DMs you receive, including message requests where Instagram allows, the emails in the Gmail inbox you connect, basic public details about each sender, and the replies you send, so it can learn your voice. It stores those messages with their labels and estimates, your drafts, what you sent and the deals you record, encrypted. It doesn’t sell your data or use your messages to train public AI models.${scope}` });
const connect = { q: "What do I need to connect?", a: "An Instagram professional account (Business or Creator), which is free to switch to, and if you like, a Gmail inbox. You connect both through their official sign-in screens, so DealDock never sees your passwords." };

export const GLOBAL: SiteContent = {
  locale: "global", currency: "USD", lang: "en", path: "/",
  plans: PLANS,
  faq: [sharedFaq.estimates, read(""), sharedFaq.autosend, connect,
    { q: "Which languages does it write in?", a: "English, Hindi and Hinglish today. Drafts follow the language the other person wrote in and the way you usually reply." },
    sharedFaq.both, sharedFaq.chatgpt, sharedFaq.managers, sharedFaq.tiktok, sharedFaq.after, sharedFaq.cancel, sharedFaq.safe],
};

export const INDIA: SiteContent = {
  locale: "in", currency: "INR", lang: "en-IN", path: "/in",
  plans: PLANS,
  faq: [sharedFaq.estimates, read(""), sharedFaq.autosend, connect,
    { q: "Does it work in Hinglish?", a: "Yes. DealDock sorts and drafts in English, Hindi and Hinglish, and switches the way you do. If you answer Hinglish with Hinglish, your drafts will too." },
    sharedFaq.both, sharedFaq.chatgpt, sharedFaq.managers, sharedFaq.tiktok, sharedFaq.after, sharedFaq.cancel, sharedFaq.safe],
};
