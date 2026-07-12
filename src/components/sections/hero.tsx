"use client";

import { motion } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { RevenueInboxMockup } from "@/components/mockups/revenue-inbox-mockup";
import { GlowEffect } from "@/components/shared/glow-effect";
import { staggerContainer, wordReveal, fadeUp, slideFromRight } from "@/lib/motion";
import { useApplyModal } from "@/lib/apply-modal-context";
import { useLocale } from "@/lib/locale-context";

export function Hero() {
  const { openModal } = useApplyModal();
  const { hero } = useLocale();

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-24 pb-16">
      {/* Background glow decorations */}
      <GlowEffect
        size="xl"
        className="top-1/3 left-[-10%] -translate-y-1/2 opacity-40"
      />
      <GlowEffect
        size="lg"
        className="top-1/2 right-[5%] -translate-y-1/2 opacity-30"
        color="subtle"
      />

      <div className="section-container w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: copy */}
          <motion.div
            className="flex-1 lg:max-w-[55%]"
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate="visible"
          >
            {/* Status chip — scarcity + liveness above the fold */}
            <motion.div variants={fadeUp} className="mb-7">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffc107] opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ffc107]" />
                </span>
                <span className="text-[12px] font-medium text-[#a3a3a3]">
                  Pilot cohort open
                  <span className="mx-2 text-[#404040]">·</span>
                  <span className="text-[#e5e5e5]">Limited seats</span>
                </span>
              </span>
            </motion.div>

            {/* Headline — word-by-word reveal */}
            <motion.h1
              variants={staggerContainer(0.06)}
              className="text-display mb-6"
            >
              {hero.headlineLines.map((line, li) => (
                <span key={li} className="block">
                  {line.split(" ").map((word, wi) => (
                    <motion.span
                      key={wi}
                      variants={wordReveal}
                      className={`inline-block mr-[0.25em] ${
                        word === hero.highlightWord ? "text-[#ffc107]" : ""
                      }`}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

            {/* Subhead */}
            <motion.p
              variants={fadeUp}
              className="text-body-lg text-[#a3a3a3] mb-10 max-w-xl"
            >
              {hero.subheadPrefix}{" "}
              <span className="text-[#e5e5e5] font-medium">
                {hero.subheadBoldStat}
              </span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <button
                onClick={() => openModal()}
                className="group inline-flex items-center gap-2 bg-[#ffc107] text-[#050505] font-bold text-base px-7 py-3.5 rounded-full hover:bg-[#e5a800] transition-all duration-300 active:scale-[0.98]"
              >
                Apply for Pilot
                <span className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform">
                  <ArrowRight size={12} weight="bold" />
                </span>
              </button>
              <button
                onClick={() =>
                  document
                    .querySelector("#how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 text-[#a3a3a3] hover:text-[#fafafa] font-medium text-base py-3.5 transition-colors"
              >
                See How It Works
                <ArrowRight size={14} />
              </button>
            </motion.div>

            {/* Trust line */}
            <motion.p
              variants={fadeUp}
              className="mt-5 text-[13px] text-[#525252]"
            >
              {hero.trustLine}
            </motion.p>
          </motion.div>

          {/* Right: Revenue Inbox mockup */}
          <motion.div
            className="flex-1 w-full lg:max-w-[45%]"
            variants={slideFromRight}
            initial="hidden"
            animate="visible"
            style={{ rotate: -1 }}
          >
            <RevenueInboxMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
