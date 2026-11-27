import { MARKETING_DESCRIPTION, MARKETING_ORIGIN } from "@/lib/marketing-config";

type JsonLd = Record<string, unknown>;

function JsonLdScript({ data }: { data: JsonLd }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function MarketingWebsiteStructuredData() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            // Several unrelated companies share the DealDock name; the descriptor and topics keep this entity distinct.
            "@type": "Organization",
            "@id": `${MARKETING_ORIGIN}#organization`,
            name: "DealDock",
            alternateName: "DealDock for creators",
            url: MARKETING_ORIGIN,
            logo: `${MARKETING_ORIGIN}/apple-icon.png`,
            description: MARKETING_DESCRIPTION,
            disambiguatingDescription: "DealDock (dealdock.io) is an Instagram DM inbox for creators who sell coaching, courses and brand collaborations. It is not affiliated with other companies that use the DealDock name.",
            knowsAbout: ["Instagram direct messages", "Creator brand deals", "Coaching and course sales", "Human-approved AI reply drafts"],
          },
          {
            "@type": "WebSite",
            "@id": `${MARKETING_ORIGIN}#website`,
            name: "DealDock",
            alternateName: "DealDock for creators",
            url: MARKETING_ORIGIN,
            description: MARKETING_DESCRIPTION,
            publisher: { "@id": `${MARKETING_ORIGIN}#organization` },
          },
        ],
      }}
    />
  );
}

export function ArticleStructuredData({
  title,
  description,
  publishedAt,
  updatedAt,
  author,
  path,
}: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  path: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        datePublished: publishedAt,
        dateModified: updatedAt,
        author: { "@type": "Person", name: author },
        publisher: { "@id": `${MARKETING_ORIGIN}#organization`, name: "DealDock", url: MARKETING_ORIGIN },
        mainEntityOfPage: new URL(path, MARKETING_ORIGIN).href,
        inLanguage: "en",
      }}
    />
  );
}
