// Example content for the new landing page. Every person, brand, message and amount is made up
// and is labelled as an example where it appears. Only the global (USD) page uses this for now;
// /in keeps the previous design until this one is final.

export type Label = "brand" | "coaching" | "course" | "other" | "scam" | "fan";

export const LABEL_TEXT: Record<Label, string> = {
  brand: "Brand deal",
  coaching: "Coaching lead",
  course: "Course question",
  other: "Other sale",
  scam: "Possible scam",
  fan: "Fan",
};

/** One paying message Docky catches in the hero. */
export type HeroExample = {
  label: Label; from: string; src: string; text: string;
  /** badge once read, e.g. "New lead"; `intent` is the one-line read under the message */
  status: string; intent: string; value: string; valueLabel: string;
  /** opening of the drafted reply */
  draft: string;
};

export type Creator = {
  id: string; name: string; first: string; niche: string; img: string; tone: string;
  waiting: string; paid: string; sent: number; open: number;
  /** Opening of the reply drafted for the top of this creator’s queue, in their own voice. */
  voice: string;
  /** Open paying messages by label, for the "waiting" bar. */
  mix: Partial<Record<Label, number>>;
  /** Paid per week over the last eight weeks, for the sparkline. */
  trend: number[];
  queue: { from: string; mono: string; tone: string; text: string; label: Label; value?: string; est?: boolean; age: string; status: "draft" | "rate" | "flag"; window?: string }[];
};

export type LandingContent = {
  hero: { sub: string; note: string; examples: HeroExample[] };
  /** Section 2 inbox: one conversation per kind, listed by value. `checks` is what DealDock read from the message. */
  catches: {
    label: Label; name: string; ini: string; av: string; verified?: boolean; sub: string;
    /** where it arrived; an email also has a subject */
    app: "ig" | "gmail"; subject?: string;
    when: string; short: string; value: string; snippet: string; text: string;
    worthLabel: string; worth: string; window: string;
    checks: [text: string, state: "ok" | "miss" | "bad", note?: string][];
    draft?: string; quiet?: string; row?: string;
  }[];
  story: {
    brand: string; contact: string; creator: string; estimate: string; rate: string; ledger: string; ledgerEstimate: string;
    incoming: string; draft: string; nudge: string;
  };
  creators: Creator[];
};

const photo = (id: string) => `https://images.unsplash.com/${id}?w=160&h=160&fit=crop&crop=faces&q=70`;

export const LANDING_GLOBAL: LandingContent = {
  hero: {
    sub: "Docky finds buying intent hidden in your Instagram DMs and Gmail, prioritizes valuable leads, and drafts replies in your voice. Track every deal from the first conversation to payment. You stay in control. Nothing sends without your approval.",
    note: "30 days free · No card needed · You approve every reply",
    examples: [
      { label: "brand", from: "Glowkind Skincare", src: "Message request · 11:48 PM", text: "Hi Maya! What’s your rate for 1 Reel + 3 Stories? Usage would be 30 days.",
        status: "New brand deal", intent: "1 Reel + 3 Stories", value: "$2.5K–$5K", valueLabel: "Estimated value",
        draft: "Hi Mia! Thank you, I’ve honestly been living in vitamin C serums all winter lol…" },
      { label: "coaching", from: "Dani Brooks", src: "DM · 7:12 AM", text: "Is your 12-week program open for January? I’m ready to start.",
        status: "New lead", intent: "Ready to start in January", value: "$1,200", valueLabel: "Your price",
        draft: "omg yes! January’s open, 3 spots left 🙌 it’s $1,200 for the full 12 weeks…" },
      { label: "course", from: "Priya N.", src: "DM · Yesterday", text: "Does the course include lifetime access? Thinking of buying today.",
        status: "New lead", intent: "High buying intent", value: "$249", valueLabel: "Your price",
        draft: "yes lifetime access!! and module 4 is all phone lighting…" },
    ],
  },
  catches: [
    { label: "brand", name: "Glowkind Skincare", ini: "GS", av: "#2F5D50", verified: true, app: "ig", sub: "Instagram · Message request · 48.2K followers",
      when: "Tue 11:48 PM", short: "11:48 PM", value: "$2.5K–$5K", snippet: "What's your rate for 1 Reel + 3 Stories?",
      text: "Hi Maya! We're launching a vitamin C serum in January and would love you on it. What's your rate for 1 Reel + 3 Stories? Usage would be 30 days organic.",
      worthLabel: "Could be worth", worth: "$2.5K–$5K", window: "16h left to reply",
      checks: [["1 Reel + 3 Stories", "ok"], ["30 days organic usage", "ok"], ["Posting dates", "miss", "your reply asks"]],
      draft: "Hi Mia! Thank you, I've honestly been living in vitamin C serums all winter lol. 1 Reel + 3 Stories with 30 days organic would be $3,800. When are you hoping to go live?" },
    { label: "coaching", name: "Dani Brooks", ini: "DB", av: "#C9774F", app: "ig", sub: "Instagram · Follows you · 1.2K followers",
      when: "Mon 10:02 PM", short: "Mon", value: "$1,200", snippet: "is your 12-week program still open for January?",
      text: "hey! is your 12-week program still open for January? how much is it?",
      worthLabel: "Your price", worth: "$1,200", window: "20h left to reply",
      checks: [["12-week program", "ok"], ["January cohort, 3 of 10 left", "ok"], ["Ready to pay", "ok", "link added"]],
      draft: "omg yes! January's open, 3 spots left 🙌 it's $1,200 for the full 12 weeks. here's the link if you want one: maya.link/12wk" },
    { label: "other", name: "Oatfield Coffee", ini: "OC", av: "#7A4E2D", app: "gmail", subject: "Content workshop for our team?", sub: "Gmail · events@oatfield.co",
      when: "Sun 6:14 PM", short: "Sun", value: "$800–$1.5K", snippet: "Could you run a 60-minute content workshop?",
      text: "Hi Maya, could you run a 60-minute content workshop for our team of 8 in February? Happy to work around your schedule.",
      worthLabel: "Could be worth", worth: "$800–$1.5K", window: "2 days left to reply",
      checks: [["60-minute workshop", "ok"], ["8 people, February", "ok"], ["Exact date", "miss", "your reply asks"]],
      draft: "Hi! Yes I'd be up for that. I usually do $1,200 for a 60 min workshop, up to 10 people. Do you have a date in Feb in mind?" },
    { label: "course", name: "Priya N.", ini: "PN", av: "#6D5BD0", app: "ig", sub: "Instagram · Follows you · 640 followers",
      when: "Yesterday 11:52 PM", short: "Yest.", value: "$249", snippet: "Does the course include lifetime access?",
      text: "Does the course include lifetime access? Buying tonight 🙏",
      worthLabel: "Your price", worth: "$249", window: "Buying tonight",
      checks: [["Phone lighting course", "ok"], ["Lifetime access", "ok", "it does"], ["Checkout link", "ok", "added"]],
      draft: "yes lifetime access!! and module 4 is all phone lighting, you're going to love it. link's here whenever you're ready: maya.link/lighting" },
    { label: "scam", name: "GlowNest Ambassadors", ini: "GN", av: "#B04A7E", app: "ig", sub: "Instagram · Message request · 312 followers",
      when: "Tue 11:55 PM", short: "11:55 PM", value: "Flagged", snippet: "Pay a one-time $49 fee to activate…",
      text: "Congrats! You've been selected as a brand ambassador ✨ Pay a one-time $49 fee to activate your profile: bit.ly/gn-activate",
      worthLabel: "Possible scam", worth: "Don't pay", window: "Moved to Possible scams",
      checks: [["Asks you to pay $49 to join", "bad"], ["Shortened link to an outside site", "bad"], ["Account is a week old", "bad"]],
      quiet: "No reply drafted. You can still open it any time." },
    { label: "fan", name: "sara.k", ini: "SK", av: "#9A958E", app: "ig", sub: "Instagram · Follows you", row: "27 fan messages",
      when: "Tue 11:58 PM", short: "This week", value: "27", snippet: "omg your last reel 😍 where is the top from??",
      text: "omg your last reel 😍😍 where is the top from??",
      worthLabel: "Fan message", worth: "No reply needed", window: "Moved to Fans",
      checks: [["Kept out of your paying queue", "ok"], ["Never deleted", "ok"]],
      quiet: "No draft. Reply whenever you like." },
  ],
  story: {
    brand: "Glowkind Skincare", contact: "Mia", creator: "Maya",
    estimate: "est. $2.5K–$5K", rate: "$3,800", ledger: "$7,445", ledgerEstimate: "est. $4.1K–$7.6K",
    incoming: "Hi Maya! I’m Mia from Glowkind 🌿 We’re launching a vitamin C serum in January and would love you on it. What’s your rate for 1 Reel + 3 Stories? Usage would be 30 days organic.",
    draft: "Hi Mia! Thank you, I've honestly been living in vitamin C serums all winter lol. 1 Reel + 3 Stories with 30 days organic would be $3,800. When are you hoping to go live?",
    nudge: "Hi Mia! Just checking in, did the team get a chance to look at dates?",
  },
  creators: [
    { id: "ana", name: "Ana Ruiz", first: "Ana", niche: "Cooking · 212K", img: photo("photo-1494790108377-be9c29b29330"), tone: "#B6542F",
      waiting: "est. $9.5K–$14K", paid: "$11,250", sent: 23, open: 6, voice: "Hi! Lumen pans are already all over my kitchen, so this is an easy yes. A 3-video series with 90 days of usage would be $5,200.", mix: { brand: 3, other: 2, course: 1 }, trend: [1.2, 2.1, 1.6, 2.8, 2.2, 3.1, 2.6, 3.4], queue: [
        { from: "Lumen Cookware", mono: "LC", tone: "#3B5B4A", text: "Rate for a 3-video series with 90-day usage?", label: "brand", value: "est. $4K–$6K", est: true, age: "2h", status: "draft", window: "18h left" },
        { from: "Private kitchen class", mono: "PK", tone: "#7A4E2D", text: "Could you host a class for 12 people in March?", label: "other", value: "$1,800", age: "5h", status: "rate", window: "22h left" },
        { from: "tara.s", mono: "TS", tone: "#5A6E8C", text: "Is the weeknight recipes ebook still $29?", label: "course", value: "$29", age: "1d", status: "draft", window: "2 days left" },
      ] },
    { id: "sam", name: "Sam Okafor", first: "Sam", niche: "Travel · 120K", img: photo("photo-1507003211169-0a1dd7228f2d"), tone: "#2D6A8E",
      waiting: "est. $4K–$6.5K", paid: "$5,800", sent: 14, open: 4, voice: "Hey team! Tallmark has been on my list for ages. $3,000 works for 2 Reels and a carousel. Which dates were you thinking?", mix: { brand: 3, course: 1 }, trend: [0.8, 1.1, 0.9, 1.6, 1.4, 1.2, 1.9, 2.1], queue: [
        { from: "Visit Tallmark", mono: "VT", tone: "#1F4E79", text: "Three-day trip, 2 Reels and a carousel, $3,000", label: "brand", value: "$3,000 stated", age: "1h", status: "draft", window: "Reply by Friday" },
        { from: "Northbound Luggage", mono: "NL", tone: "#2F5D50", text: "What would you charge for one Reel in April?", label: "brand", value: "est. $1.5K–$3K", est: true, age: "6h", status: "rate", window: "17h left" },
        { from: "jo.ruiz", mono: "JR", tone: "#8C5A3C", text: "Do your presets work on phone photos?", label: "course", value: "$19", age: "2d", status: "draft", window: "5 days left" },
      ] },
    { id: "maya", name: "Maya Ortiz", first: "Maya", niche: "Lifestyle · 148K", img: photo("photo-1438761681033-6461ffad8d80"), tone: "#D06B3E",
      waiting: "est. $3.1K–$5.2K", paid: "$7,445", sent: 18, open: 5, voice: "Hi Mia! Thank you, I’ve honestly been living in vitamin C serums all winter lol. 1 Reel + 3 Stories would be $3,800.", mix: { brand: 2, coaching: 2, course: 1 }, trend: [0.9, 1.4, 1.2, 1.1, 1.8, 1.6, 2.2, 2.0], queue: [
        { from: "Glowkind Skincare", mono: "GS", tone: "#2F5D50", text: "What’s your rate for 1 Reel + 3 Stories?", label: "brand", value: "est. $2.5K–$5K", est: true, age: "3h", status: "draft", window: "16h left" },
        { from: "Dani Brooks", mono: "DB", tone: "#C9774F", text: "Is your 12-week coaching open for January?", label: "coaching", value: "$1,200", age: "8h", status: "draft", window: "14h left" },
        { from: "Priya N.", mono: "PN", tone: "#6D5BD0", text: "Does the course include the lighting module?", label: "course", value: "$249", age: "1d", status: "draft", window: "2 days left" },
      ] },
    { id: "theo", name: "Theo Park", first: "Theo", niche: "Fitness · 88K", img: photo("photo-1500648767791-00dcc994a43e"), tone: "#4F7A3A",
      waiting: "est. $2.4K–$3.6K", paid: "$2,900", sent: 9, open: 3, voice: "Hey! Strideline has been my long-run shoe for a year. A running Reel and 2 Stories would be $2,000, does that fit?", mix: { brand: 2, coaching: 1 }, trend: [0.4, 0.6, 0.5, 0.9, 0.7, 0.8, 1.1, 1.0], queue: [
        { from: "Strideline Shoes", mono: "SS", tone: "#33415C", text: "Rate for a running Reel and 2 Stories?", label: "brand", value: "est. $1.5K–$2.5K", est: true, age: "4h", status: "rate", window: "19h left" },
        { from: "k.marsh", mono: "KM", tone: "#9A6B4F", text: "Can I still join the spring program?", label: "coaching", value: "$450", age: "9h", status: "draft", window: "15h left" },
        { from: "Athlete Team Pro", mono: "AT", tone: "#D9488F", text: "Pay $99 to join our athlete team", label: "scam", age: "1d", status: "flag" },
      ] },
    { id: "jordan", name: "Jordan Lee", first: "Jordan", niche: "Tech · 64K", img: photo("photo-1534528741775-53994a69daeb"), tone: "#5A4FA8",
      waiting: "est. $1.8K–$2.7K", paid: "$1,600", sent: 7, open: 3, voice: "yo! I’ve been eyeing the Keyform 75. One review Reel would be $1,600, want me to send my media kit?", mix: { brand: 2, other: 1 }, trend: [0.2, 0.4, 0.3, 0.5, 0.4, 0.6, 0.5, 0.7], queue: [
        { from: "Keyform Keyboards", mono: "KK", tone: "#2B2B2B", text: "Would you review our new board in a Reel?", label: "brand", value: "est. $1.2K–$2K", est: true, age: "2h", status: "draft", window: "21h left" },
        { from: "Brightwave team", mono: "BW", tone: "#4A6B8A", text: "Could you run a content workshop for our team?", label: "other", value: "est. $500–$900", est: true, age: "7h", status: "rate", window: "16h left" },
        { from: "n.patel", mono: "NP", tone: "#7A5AC8", text: "Does the editing course cover captions?", label: "course", value: "$79", age: "1d", status: "draft", window: "3 days left" },
      ] },
  ],
};
