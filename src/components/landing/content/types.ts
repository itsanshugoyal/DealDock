// The shape of a landing page's content. Each market (global, India) fills one LandingContent; the components only
// render it, so a new market is a new content file, not new components.

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

/** Section 2 inbox: one conversation per kind, listed by value. `checks` is what DealDock read from the message. */
export type Catch = {
  label: Label; name: string; ini: string; av: string; verified?: boolean; sub: string;
  /** where it arrived; an email also has a subject */
  app: "ig" | "gmail"; subject?: string;
  when: string; short: string; value: string; snippet: string; text: string;
  worthLabel: string; worth: string; window: string;
  checks: [text: string, state: "ok" | "miss" | "bad", note?: string][];
  draft?: string; quiet?: string; row?: string;
  /** a note on the draft's voice, e.g. that it answers Hinglish in Hinglish */
  voice?: string;
};

/** The phone story and the control section follow one brand deal from the first DM to payment. */
export type Story = {
  creator: string; handle: string; brand: string; brandIni: string; brandShort: string; contact: string;
  /** lock screen: the date, other apps' notifications [app, from, text, ago], and DealDock's alert line */
  lockDate: string; noise: [app: "ig" | "gm", from: string, text: string, ago: string][]; alert: string;
  /** the brand's DM, its one-line ask ("What's your rate for…"), and what Docky reads from it */
  message: string; rateAsk: string; asks: string; usage: string; missing: string; estimate: string; window: string;
  /** her reply, the agreed rate and the invoice */
  draft: string; rate: string; invoice: string;
  /** the payment reminder she sends, and the brand's reply once paid */
  reminder: string; paidReply: string;
  /** How many past replies the draft learned from, shown under the draft. Defaults to 14. */
  replyCount?: number;
  /** dates along the deal, short form ("14 Jan") */
  dates: { enquiry: string; agreed: string; invoiced: string; seen: string; reminded: string; paid: string };
  /** the month's paid total, counting up from the total before this payment; `received` notes what actually landed */
  month: { label: string; total: string; from: string }; received?: string;
};

export type Creator = {
  id: string; name: string; first: string; niche: string; img: string; tone: string;
  /** opening of the reply drafted for the top of this creator's queue, in their own voice */
  voice: string;
  /** the kinds of message in their queue, biggest first (drives the roster's beams) */
  labels: Label[];
};

export type LandingContent = {
  hero: { sub: string; note: string; examples: HeroExample[] };
  catches: Catch[];
  story: Story;
  creators: Creator[];
};

export const photo = (id: string) => `https://images.unsplash.com/${id}?w=160&h=160&fit=crop&crop=faces&q=70`;
/** Tighter crop for portraits shot wider than a headshot. */
export const face = (id: string) => `https://images.unsplash.com/${id}?w=160&h=160&fit=facearea&facepad=2.6&q=70`;
