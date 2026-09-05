"use client";

import { motion, useReducedMotion, type TargetAndTransition } from "motion/react";
import { ArrowRight, ShieldCheck } from "@phosphor-icons/react";
import { RevenueInboxMockup } from "@/components/mockups/revenue-inbox-mockup";
import { staggerContainer, wordReveal, fadeUp, easeOutExpo } from "@/lib/motion";
import { useApplyModal } from "@/lib/apply-modal-context";
import { useLocale } from "@/lib/locale-context";

export function Hero() {
  const { openModal } = useApplyModal();
  const { hero, ledgerShowcase } = useLocale();

  // The entrance variants start at opacity 0, which lives in inline style. If a
  // reader has reduced motion on, skip straight to the resolved state rather
  // than relying on an animation to reveal the headline.
  const reduceMotion = useReducedMotion();
  const from = reduceMotion ? "visible" : "hidden";
  const revealFrom = (v: TargetAndTransition): TargetAndTransition | false =>
    reduceMotion ? false : v;

  // Reuse the proof numbers already defined per-locale so the floating cards
  // never drift out of sync with the ledger section.
  const [avgRecovered, noEditRate] = ledgerShowcase.stats;

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center overflow-hidden pt-32 lg:pt-40">
      {/* ── Background layers ───────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 hero-grid" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-14rem] h-[38rem] w-[64rem] -translate-x-1/2 rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,193,7,0.13) 0%, rgba(255,193,7,0.04) 45%, transparent 72%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-[26rem] h-[26rem] w-[26rem] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59,130,246,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Centered editorial copy ─────────────────────────────────── */}
      <motion.div
        variants={staggerContainer(0.07)}
        initial={from}
        animate="visible"
        className="section-container relative z-10 flex flex-col items-center text-center"
      >
        {/* Status chip — scarcity + liveness above the fold */}
        <motion.div variants={fadeUp} className="mb-8">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-xl">
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

        {/* Headline — sans throughout, serif italic on the one word that carries the loss */}
        <motion.h1
          variants={staggerContainer(0.05)}
          className="text-hero max-w-5xl"
        >
          {hero.headlineLines.map((line, li) => (
            <span key={li} className="block">
              {line.split(" ").map((word, wi) => {
                const bare = word.replace(/[.,]/g, "");
                const isAccent = bare === hero.highlightWord;
                return (
                  // Real space between words (not a margin) so the headline stays
                  // readable to screen readers and selectable as one sentence.
                  <span key={wi}>
                    <motion.span
                      variants={wordReveal}
                      className={`inline-block ${
                        isAccent ? "text-serif-accent text-[#ffc107]" : ""
                      }`}
                    >
                      {word}
                    </motion.span>{" "}
                  </span>
                );
              })}
            </span>
          ))}
        </motion.h1>

        {/* Subhead */}
        <motion.p
          variants={fadeUp}
          className="mt-7 max-w-[34rem] text-body-lg text-[#a3a3a3] [text-wrap:pretty]"
        >
          {hero.subheadPrefix}{" "}
          <span className="text-[#e5e5e5] font-medium">
            {hero.subheadBoldStat}
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <button
            onClick={() => openModal()}
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#ffc107] pl-7 pr-2 py-2 text-base font-bold text-[#050505] shadow-[0_0_32px_rgba(255,193,7,0.28)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#ffd040] hover:shadow-[0_0_44px_rgba(255,193,7,0.4)] active:scale-[0.98]"
          >
            Apply for Pilot
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
              <ArrowRight size={14} weight="bold" />
            </span>
          </button>

          <button
            onClick={() =>
              document
                .querySelector("#how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-3.5 text-base font-medium text-[#a3a3a3] backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/[0.14] hover:text-[#fafafa]"
          >
            See How It Works
            <ArrowRight
              size={14}
              className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0.5"
            />
          </button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          variants={fadeUp}
          className="mt-6 flex items-center gap-2 text-[13px] text-[#525252]"
        >
          <ShieldCheck size={13} weight="fill" className="text-[#404040]" />
          {hero.trustLine}
        </motion.p>
      </motion.div>

      {/* ── Product cascade — tilted into Z, floating proof at the edges ── */}
      <div className="hero-stage relative z-10 mt-16 lg:mt-20 w-full">
        <div className="section-container relative flex justify-center">
          {/* Floating proof — left */}
          <motion.div
            initial={revealFrom({ opacity: 0, y: 28, x: -12 })}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease: easeOutExpo }}
            // Anchored off centre rather than the viewport edge, so the card stays
            // visually tethered to the product card at any window width.
            style={{ right: "calc(50% + 272px)" }}
            className="pointer-events-none absolute top-10 z-20 hidden xl:block"
          >
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d0d]/85 px-5 py-4 backdrop-blur-2xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]">
              <p className="font-mono text-2xl font-bold text-[#ffc107]">
                {avgRecovered.stat}
              </p>
              <p className="mt-1 text-[11px] text-[#737373]">
                {avgRecovered.label}
              </p>
            </div>
          </motion.div>

          {/* Floating proof — right */}
          <motion.div
            initial={revealFrom({ opacity: 0, y: 28, x: 12 })}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.9, delay: 0.88, ease: easeOutExpo }}
            style={{ left: "calc(50% + 272px)" }}
            className="pointer-events-none absolute top-40 z-20 hidden xl:block"
          >
            <div className="rounded-2xl border border-white/[0.08] bg-[#0d0d0d]/85 px-5 py-4 backdrop-blur-2xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]">
              <p className="font-mono text-2xl font-bold text-[#22c55e]">
                {noEditRate.stat}
              </p>
              <p className="mt-1 text-[11px] text-[#737373]">
                {noEditRate.label}
              </p>
            </div>
          </motion.div>

          {/* The product itself — lifted, tilted, grounded by its own shadow */}
          <motion.div
            initial={revealFrom({ opacity: 0, y: 60, rotateX: 22 })}
            animate={{ opacity: 1, y: 0, rotateX: reduceMotion ? 0 : 9 }}
            transition={{ duration: 1.1, delay: 0.5, ease: easeOutExpo }}
            style={{ transformStyle: "preserve-3d" }}
            // Grounding shadow lives on the wrapper, not the card: .card-bezel:hover
            // reassigns box-shadow, which would otherwise drop this shadow on hover.
            className="relative w-full max-w-lg rounded-[1.5rem] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95)]"
          >
            <RevenueInboxMockup className="max-w-lg" />
          </motion.div>
        </div>

        {/* Bottom fade — the product dissolves into the next chapter */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#050505]"
        />
      </div>
    </section>
  );
}
