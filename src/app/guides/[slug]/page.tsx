import type { Metadata } from "next";
import { MARKETING_SHARE_IMAGE } from "@/lib/marketing-metadata";
import { notFound } from "next/navigation";
import { ArticleStructuredData } from "@/components/marketing/structured-data";
import { MarketingDocument } from "@/components/design-preview/marketing-document";
import { guideBySlug, marketingGuides } from "@/lib/marketing-guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return marketingGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const guide = guideBySlug((await params).slug);
  if (!guide) return {};
  return {
    title: `${guide.title} | DealDock`,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: { title: guide.title, description: guide.description, type: "article", url: `/guides/${guide.slug}`, siteName: "DealDock", images: [MARKETING_SHARE_IMAGE] },
    twitter: { card: "summary_large_image", title: guide.title, description: guide.description, images: [MARKETING_SHARE_IMAGE] },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = guideBySlug((await params).slug);
  if (!guide) notFound();
  const path = `/guides/${guide.slug}`;
  return (
    <>
      <ArticleStructuredData
        title={guide.title}
        description={guide.description}
        publishedAt={guide.publishedAt}
        updatedAt={guide.updatedAt}
        author={guide.author}
        path={path}
      />
      <MarketingDocument title={guide.title} updatedAt={`By ${guide.author} · Updated ${guide.updatedAt}`}>
        <p className="documentIntro">{guide.intro}</p>
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        {guide.sourceNote ? <p><strong>Method note:</strong> {guide.sourceNote}</p> : null}
        {guide.relatedLinks?.length ? (
          <section>
            <h2>Continue reading</h2>
            <ul>{guide.relatedLinks.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
          </section>
        ) : null}
      </MarketingDocument>
    </>
  );
}
