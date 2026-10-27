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
            "@type": "Organization",
            "@id": `${MARKETING_ORIGIN}#organization`,
            name: "DealDock",
            url: MARKETING_ORIGIN,
            description: MARKETING_DESCRIPTION,
          },
          {
            "@type": "WebSite",
            "@id": `${MARKETING_ORIGIN}#website`,
            name: "DealDock",
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
