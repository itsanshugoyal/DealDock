// Page content per market. The global page (/) leads in dollars; /in carries rupees, Hinglish and TDS for the India pilot.
// People, brands and amounts are fictional examples and are labelled as examples on the page.
import type { Label } from "./primitives";

export type PlanId = "solo" | "studio" | "roster";
export type Locale = "global" | "in";
type InboxRow = { name: string; tone: number; label: Label; text: string; value?: string; verified?: boolean; hindi?: boolean };

export type SiteContent = {
  locale: Locale; currency: "USD" | "INR"; lang: string; path: "/" | "/in";
  hero: { pill: string; sub: string; trust: string; count: string; rows: InboxRow[]; fold: string; draft: string };
  leak: { total: number; parts: { label: Label; text: string; count: number; shown: string; value: number }[] };
  voice: { from: string; incoming: string; tones: { name: string; text: string; hindi?: boolean }[]; notes: string[] };
  approve: { to: string; estimate: string; preview: string };
  deal: { brand: string; terms: string; posted: string; late: string; reminder: string; paid: string };
  creators: { name: string; tone: number; niche: string; waiting: string; earned: string }[];
  plans: { id: PlanId; name: string; who: string; features: string[]; featured?: boolean }[];
  roi: string;
  faq: { q: string; a: string }[];
};

const STEPS = [
  { title: "Sort", body: "Every DM and brand email gets a label and an estimate from the message, the sender and your own prices. Fans and spam step aside." },
  { title: "Draft", body: "Each reply is drafted the way you text. Edit anything, or ask for shorter or warmer." },
  { title: "Slide", body: "Nothing leaves until you slide, and every send has a few seconds to undo." },
  { title: "Get paid", body: "Terms, deliverables, follow-ups and payment reminders, until the money lands." },
];
export { STEPS };

const plans = (inbox: string): SiteContent["plans"] => [
  { id: "solo", name: "Solo", who: "One creator, one Instagram account.", featured: true, features: [inbox, "Every message sorted by type and value", "Replies drafted in your voice", "Follow-ups and reply-window countdowns", "Deals tracked from yes to paid"] },
  { id: "studio", name: "Studio", who: "A creator plus an assistant.", features: ["Everything in Solo", "A second seat for your assistant", "Both reply in your voice", "A record of who sent what"] },
  { id: "roster", name: "Roster", who: "Up to five creators, plus manager seats.", features: ["Everything in Studio, for each creator", "Each creator’s own inbox, voice and revenue", "One desk across your roster", "Creators see every reply sent for them"] },
];

const sharedFaq = {
  estimates: { q: "How are the money estimates made?", a: "From three things: what the message says (budget, deliverables, dates, how ready they sound), who sent it (followers, a verified badge, whether they follow you), and your own prices, which you set when you join. Every estimate is a range marked “est.” It decides what you see first and never counts as money you made; only deals you record do." },
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
  hero: {
    pill: "Instagram DMs + Gmail, one inbox",
    sub: "DealDock puts brand deals and paying clients first with what each is worth, and drafts every reply in your voice. Nothing sends until you slide.",
    trust: "Official Instagram and Gmail sign-in · Nothing sends without you",
    count: "24 new",
    rows: [
      { name: "Jess Moreno", tone: 6, label: "fan", text: "omg your skin!! 😍" },
      { name: "Glowkind Skincare", tone: 4, label: "brand", verified: true, text: "What’s your rate for 1 Reel + 3 Stories?", value: "est. $2.5K–$5K" },
      { name: "Promo King", tone: 3, label: "spam", text: "Promo for $10? 🚀🚀" },
      { name: "Ana Ruiz", tone: 2, label: "coaching", text: "Is your 12-week program still open?", value: "est. $1,200" },
      { name: "Mike Tan", tone: 5, label: "fan", text: "🔥🔥🔥" },
      { name: "Leo Park", tone: 1, label: "course", text: "Does the course include lifetime access?", value: "est. $299" },
      { name: "Sara Kim", tone: 0, label: "fan", text: "where’s your top from?" },
      { name: "Nina Patel", tone: 7, label: "other", text: "Do you do 1:1 content audits? Happy to pay", value: "est. $250" },
    ],
    fold: "20 fans, spam and chats · moved aside",
    draft: "Hey Mia! Love what Glowkind is doing 🙌 For 1 Reel + 3 Stories it’s $3,800 with 30 days of usage. Can you send the brief?",
  },
  leak: { total: 11840, parts: [
    { label: "brand", text: "Brand deals", count: 3, shown: "$8,200", value: 8200 },
    { label: "coaching", text: "Coaching leads", count: 5, shown: "$2,400", value: 2400 },
    { label: "course", text: "Course questions", count: 9, shown: "$890", value: 890 },
    { label: "other", text: "Other sales", count: 2, shown: "$350", value: 350 },
  ] },
  voice: {
    from: "Glowkind Skincare", incoming: "Hi! We’re launching a vitamin C serum in January. What’s your rate for 1 Reel + 3 Stories?",
    tones: [
      { name: "Casual", text: "Hey Mia! Love what Glowkind is doing 🙌 For 1 Reel + 3 Stories it’s $3,800 with 30 days of usage. Can you send the brief?" },
      { name: "Professional", text: "Hi Mia, thanks for reaching out. My rate for 1 Reel and 3 Stories is $3,800, including 30 days of usage. Could you share the brief and timeline?" },
      { name: "Short", text: "Hey Mia! 1 Reel + 3 Stories is $3,800 incl. 30 days usage. Brief?" },
    ],
    notes: ["Learned: you open with “Hey” and their name", "Learned: you always mention usage rights"],
  },
  approve: { to: "Glowkind Skincare", estimate: "est. $2.5K–$5K", preview: "Hey Mia! For 1 Reel + 3 Stories it’s $3,800 with 30 days of usage. Can you send the brief?" },
  deal: { brand: "Glowkind Skincare", terms: "$3,800 · 1 Reel + 3 Stories · 30-day usage · paid 15 days after posting", posted: "Reel Oct 12 · Stories Oct 13", late: "Payment 8 days late · due Oct 28", reminder: "Hi Mia! Hope the launch went well 😊 Quick one: the $3,800 was due on Oct 28. Could you check on it?", paid: "Paid · $3,800 · added to Revenue" },
  creators: [
    { name: "Mia Torres", tone: 4, niche: "Beauty · 210K", waiting: "$8.2K", earned: "$12.4K" },
    { name: "Jordan Lee", tone: 5, niche: "Fitness · 88K", waiting: "$3.1K", earned: "$5.6K" },
    { name: "Priya Shah", tone: 6, niche: "Books · 140K", waiting: "$2.4K", earned: "$3.9K" },
  ],
  plans: plans("Instagram DMs and Gmail in one inbox"),
  roi: "Solo costs $588 a year. One answered $600 brand deal covers it.",
  faq: [sharedFaq.estimates, read(""), sharedFaq.autosend, connect,
    { q: "Which languages does it write in?", a: "English, Hindi and Hinglish today. Drafts follow the language the other person wrote in and the way you usually reply." },
    sharedFaq.both, sharedFaq.chatgpt, sharedFaq.managers, sharedFaq.tiktok, sharedFaq.after, sharedFaq.cancel, sharedFaq.safe],
};

export const INDIA: SiteContent = {
  locale: "in", currency: "INR", lang: "en-IN", path: "/in",
  hero: {
    pill: "Instagram DMs + Gmail, one inbox",
    sub: "DealDock puts brand deals and paying clients first with what each is worth, and drafts every reply in your voice, Hinglish included. Nothing sends until you slide.",
    trust: "Official Instagram and Gmail sign-in · Nothing sends without you",
    count: "24 new",
    rows: [
      { name: "Neha Sharma", tone: 6, label: "fan", text: "omg ur skin!! 😍" },
      { name: "Glowkind Skincare", tone: 4, label: "brand", verified: true, text: "What’s your rate for 1 Reel + 3 Stories?", value: "est. ₹1.2L–₹2.5L" },
      { name: "Earn Daily", tone: 3, label: "spam", text: "Earn ₹50,000/day from home 💸" },
      { name: "Ananya Mehta", tone: 2, label: "coaching", text: "12 week program abhi open hai?", value: "est. ₹18K" },
      { name: "Rahul Verma", tone: 5, label: "fan", text: "🔥🔥🔥" },
      { name: "Kavya Singh", tone: 1, label: "course", text: "क्या कोर्स में लाइफटाइम एक्सेस मिलेगा?", value: "est. ₹4,999", hindi: true },
      { name: "Arjun Rao", tone: 0, label: "fan", text: "bhai editing kaise karte ho?" },
      { name: "Meera Jain", tone: 7, label: "other", text: "Can you audit my bakery’s page? Paid, of course", value: "est. ₹6K" },
    ],
    fold: "20 fans, spam and chats · moved aside",
    draft: "Heyy Aditi! Thank you 🙏 1 Reel + 3 Stories ke liye ₹1.8L hoga, 30 days usage ke saath. Brief bhej dogi?",
  },
  leak: { total: 340000, parts: [
    { label: "brand", text: "Brand deals", count: 2, shown: "₹1.9L", value: 190000 },
    { label: "coaching", text: "Coaching leads", count: 7, shown: "₹98K", value: 98000 },
    { label: "course", text: "Course questions", count: 16, shown: "₹36K", value: 36000 },
    { label: "other", text: "Other sales", count: 3, shown: "₹16K", value: 16000 },
  ] },
  voice: {
    from: "Glowkind Skincare", incoming: "Hi Riya! We’re launching a vitamin C serum in January. What’s your rate for 1 Reel + 3 Stories?",
    tones: [
      { name: "Hinglish", text: "Heyy Aditi! Thank you 🙏 1 Reel + 3 Stories ke liye ₹1.8L hoga, 30 days usage ke saath. Brief bhej dogi?" },
      { name: "English", text: "Hi Aditi! Thank you 🙏 For 1 Reel + 3 Stories it’s ₹1.8L with 30 days of usage. Could you share the brief?" },
      { name: "हिंदी", text: "नमस्ते अदिति! 1 रील और 3 स्टोरीज़ के लिए ₹1.8L, 30 दिन के यूसेज के साथ। ब्रीफ़ भेज देंगी?", hindi: true },
    ],
    notes: ["Learned: Hinglish when they write Hinglish", "Learned: you open with “Heyy”"],
  },
  approve: { to: "Glowkind Skincare", estimate: "est. ₹1.2L–₹2.5L", preview: "Heyy Aditi! 1 Reel + 3 Stories ke liye ₹1.8L hoga, 30 days usage ke saath. Brief bhej dogi?" },
  deal: { brand: "Glowkind Skincare", terms: "₹1,80,000 · 1 Reel + 3 Stories · 30 days usage · paid 15 days after posting", posted: "Reel 12 Oct · Stories 13 Oct", late: "Payment 8 days late · due 28 Oct", reminder: "Hi Aditi! Hope the launch went well 😊 Quick one: the ₹1,80,000 was due on 28 Oct. Could you check on it?", paid: "₹1,62,000 received · ₹18,000 TDS · added to Revenue" },
  creators: [
    { name: "Riya Kapoor", tone: 4, niche: "Skincare · 210K", waiting: "₹2.4L", earned: "₹3.1L" },
    { name: "Kabir Malhotra", tone: 5, niche: "Fitness · 88K", waiting: "₹86K", earned: "₹1.2L" },
    { name: "Meher Arora", tone: 6, niche: "Books · 140K", waiting: "₹1.1L", earned: "₹64K" },
  ],
  plans: plans("Instagram DMs and Gmail in one inbox"),
  roi: "Solo costs ₹48,000 a year. One answered ₹50,000 brand deal covers it.",
  faq: [sharedFaq.estimates, read(""), sharedFaq.autosend, connect,
    { q: "Does it work in Hinglish?", a: "Yes. DealDock sorts and drafts in English, Hindi and Hinglish, and switches the way you do. If you answer Hinglish with Hinglish, your drafts will too." },
    sharedFaq.both, sharedFaq.chatgpt, sharedFaq.managers, sharedFaq.tiktok, sharedFaq.after, sharedFaq.cancel, sharedFaq.safe],
};

/** Every FAQ, for structured data on the page that shows it. */
export const FAQ = GLOBAL.faq;
export const PLANS = GLOBAL.plans;
