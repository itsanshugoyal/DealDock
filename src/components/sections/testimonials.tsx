"use client";

import { motion } from "motion/react";
import { Quotes } from "@phosphor-icons/react";
import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper";
import { staggerContainer, scaleIn, viewportOnce } from "@/lib/motion";
import { RupeeCounter } from "@/components/shared/rupee-counter";
import { useLocale, useMoneyFormat } from "@/lib/locale-context";

export function Testimonials() {
  const { testimonials, currencySymbol } = useLocale();
  const money = useMoneyFormat();

  return (
    <SectionWrapper>
      <SectionHeader
        eyebrow="Creators Who Recovered"
        headline="The money was always there."
        subhead="Now they can see it."
        centered
      />

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {testimonials.map((t, i) => (
          <motion.div key={i} variants={scaleIn} className="card-bezel">
            <div className="card-bezel-inner p-6 flex flex-col gap-5">
              {/* Quote icon */}
              <Quotes size={20} weight="fill" className="text-[#262626]" />

              {/* Quote text */}
              <p className="text-[14px] text-[#a3a3a3] leading-relaxed flex-1">
                &quot;{t.quote}&quot;
              </p>

              {/* Revenue stat */}
              <div
                className="rounded-xl p-4 border"
                style={{
                  backgroundColor: `${t.accentColor}08`,
                  borderColor: `${t.accentColor}20`,
                }}
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-[10px] font-medium mr-1" style={{ color: t.accentColor }}>{currencySymbol}</span>
                  <RupeeCounter
                    value={parseFloat(t.recovered)}
                    suffix={money.format === "decimal" ? "L" : ""}
                    prefix=""
                    decimals={money.decimals}
                    format={money.format}
                    duration={1.4}
                    className="text-2xl font-bold font-mono"
                    style={{ color: t.accentColor }}
                  />
                </div>
                <p className="text-[11px] text-[#525252] mt-0.5">{t.recoveredLabel}</p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-1 border-t border-white/[0.05]">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-[#050505] flex-shrink-0"
                  style={{ backgroundColor: t.accentColor }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#e5e5e5]">
                    {t.name}
                  </p>
                  <p className="text-[11px] text-[#525252]">
                    {t.niche} · {t.followers}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
