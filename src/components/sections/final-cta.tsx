"use client";

import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { GlowEffect } from "@/components/shared/glow-effect";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { useApplyModal } from "@/lib/apply-modal-context";
import { useLocale } from "@/lib/locale-context";

export function FinalCta() {
  const { openModal } = useApplyModal();
  const { finalCta } = useLocale();

  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <GlowEffect
        size="xl"
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40"
      />

      <div className="section-container relative z-10 text-center">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p variants={fadeUp} className="text-eyebrow mb-6">
            Apply for the Pilot
          </motion.p>

          <motion.h2 variants={fadeUp} className="text-display max-w-3xl mx-auto mb-6">
            Stop losing revenue.{" "}
            <br className="hidden md:block" />
            <span className="text-[#ffc107]">Start recovering it.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-body-lg text-[#a3a3a3] max-w-xl mx-auto mb-10"
          >
            {finalCta.body}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openModal()}
              className="group inline-flex items-center gap-2 bg-[#ffc107] text-[#050505] font-bold text-base px-8 py-4 rounded-full hover:bg-[#e5a800] transition-all duration-300 active:scale-[0.98] shadow-[0_0_40px_rgba(255,193,7,0.3)]"
            >
              Apply for Pilot
              <span className="w-7 h-7 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform">
                <ArrowRight size={14} weight="bold" />
              </span>
            </button>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 text-[13px] text-[#525252]"
          >
            {finalCta.trustLine}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
