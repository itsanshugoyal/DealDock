export type FreeTool = {
  slug: string;
  href: string;
  title: string;
  description: string;
  kind: "calculator" | "template";
  action: string;
  updatedAt: string;
  topics: readonly string[];
};

/** One catalogue feeds tool discovery, contextual recommendations and the sitemap. */
export const freeTools: readonly FreeTool[] = [
  {
    slug: "brand-deal-rate-calculator", href: "/tools/brand-deal-rate-calculator",
    title: "Brand deal rate calculator", kind: "calculator", action: "Use calculator",
    description: "Build a quote that accounts for usage rights, paid ads, exclusivity and extra work.",
    updatedAt: "2026-11-22", topics: ["Brand deals"],
  },
  {
    slug: "dm-enquiry-tracker", href: "/tools/dm-enquiry-tracker",
    title: "DM enquiry tracker template", kind: "template", action: "Get template",
    description: "Keep leads, next steps, follow-up dates and payments together in a free spreadsheet.",
    updatedAt: "2026-11-22", topics: ["Coaching and courses", "Instagram DMs"],
  },
];

export const toolsForTopic = (topic: string) => freeTools.filter(tool => tool.topics.includes(topic));
