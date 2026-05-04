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

export const testimonials: Testimonial[] = [
  {
    name: "Priya Menon",
    handle: "@priyafitpro",
    niche: "Fitness Coach",
    followers: "142K followers",
    quote:
      "I missed a ₹4.5L brand deal because it was buried under 200 fan messages. DealDock would have surfaced it in seconds. Week one alone recovered what I'd lost the previous month.",
    recovered: "3.8",
    recoveredLabel: "lakhs recovered, month 1",
    initials: "PM",
    accentColor: "#22c55e",
  },
  {
    name: "Rahul Kapoor",
    handle: "@rahulconsults",
    niche: "Business Consultant",
    followers: "89K followers",
    quote:
      "My inbox was a disaster — I'm terrible at replying. Now every coaching inquiry gets a draft reply in my exact tone before I've even opened the app. My reply rate went from 40% to 94%.",
    recovered: "2.2",
    recoveredLabel: "lakhs recovered, month 1",
    initials: "RK",
    accentColor: "#3b82f6",
  },
  {
    name: "Ananya Sharma",
    handle: "@ananyacreates",
    niche: "Course Creator",
    followers: "210K followers",
    quote:
      "The voice matching is genuinely scary-good. My community thought I replied personally to every course inquiry. I did — DealDock just wrote the first draft.",
    recovered: "6.1",
    recoveredLabel: "lakhs recovered, month 1",
    initials: "AS",
    accentColor: "#a855f7",
  },
];
