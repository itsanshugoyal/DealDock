export type MarketingGuide = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  intro: string;
  sections: ReadonlyArray<{ heading: string; paragraphs: ReadonlyArray<string> }>;
  relatedLinks?: ReadonlyArray<{ href: string; label: string }>;
  sourceNote?: string;
};

// Nahush adds reviewed, useful guides here. An empty list deliberately publishes
// no thin content and keeps unprepared URLs out of the sitemap.
export const marketingGuides: readonly MarketingGuide[] = [];

export function guideBySlug(slug: string) {
  return marketingGuides.find((guide) => guide.slug === slug);
}
