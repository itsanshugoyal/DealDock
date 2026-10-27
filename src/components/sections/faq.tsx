"use client";

import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper";
import { useLocale } from "@/lib/locale-context";
import type { FaqItem } from "@/data/locales/types";

export function Faq() {
  const { faq } = useLocale();


  return (
    <>
      <SectionWrapper id="faq" className="bg-[#0a0a0a]">
        <SectionHeader
          eyebrow="FAQ"
          headline="Questions creators ask before applying."
          centered
        />

        <div className="max-w-2xl mx-auto">
          <FaqAccordion items={faq} />
        </div>
      </SectionWrapper>
    </>
  );
}

function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-white/[0.06]">
      {items.map((item, i) => (
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
