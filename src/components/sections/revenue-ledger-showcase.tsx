"use client";

import { motion } from "motion/react";
import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper";
import { RevenueLedgerMockup } from "@/components/mockups/revenue-ledger-mockup";
import { GlowEffect } from "@/components/shared/glow-effect";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { useLocale } from "@/lib/locale-context";

export function RevenueLedgerShowcase() {
  const { ledgerShowcase } = useLocale();

  return (
    <SectionWrapper>
      <div className="relative">
        <GlowEffect
          size="xl"
          className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
        />
        <SectionHeader
          eyebrow="Revenue Ledger"
          headline={ledgerShowcase.headline}
          subhead={ledgerShowcase.subhead}
          centered
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl mx-auto"
        >
          <RevenueLedgerMockup />
        </motion.div>

        {/* Stats strip below mockup */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
        >
          {ledgerShowcase.stats.map((item, i) => (
            <div key={i} className="text-center">
              <p
                className="text-3xl font-bold font-mono mb-1"
                style={{ color: item.color }}
              >
                {item.stat}
              </p>
              <p className="text-[13px] text-[#737373]">{item.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
