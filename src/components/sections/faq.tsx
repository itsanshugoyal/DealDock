import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper";
import { faqItems } from "@/data/faq";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export function Faq() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SectionWrapper id="faq" className="bg-[#0a0a0a]">
        <SectionHeader
          eyebrow="FAQ"
          headline="Questions creators ask before applying."
          centered
        />

        <div className="max-w-2xl mx-auto">
          <FaqAccordion />
        </div>
      </SectionWrapper>
    </>
  );
}

function FaqAccordion() {
  return (
    <div className="divide-y divide-white/[0.06]">
      {faqItems.map((item, i) => (
        <details key={i} className="group py-5">
          <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
            <span className="text-[15px] font-medium text-[#e5e5e5] group-open:text-[#ffc107] transition-colors">
              {item.q}
            </span>
            <span className="text-[#525252] group-open:text-[#ffc107] transition-all flex-shrink-0 text-lg leading-none">
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:block">−</span>
            </span>
          </summary>
          <p className="mt-4 text-[14px] text-[#737373] leading-relaxed max-w-xl">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
