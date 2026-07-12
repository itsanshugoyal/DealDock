"use client";

import { motion } from "motion/react";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

/**
 * Chapter bridge between the problem (agitate) and how-it-works (solution).
 * One confident statement, currency-neutral so both locales share it.
 */
export function Manifesto() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="section-divider absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl" />

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="section-container text-center"
      >
        <motion.h2 variants={fadeUp} className="text-h1 max-w-3xl mx-auto">
          The money isn&apos;t gone.
          <br />
          <span className="text-[#737373]">It&apos;s just </span>
          <span className="text-[#ffc107]">invisible.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mt-6 text-body-lg text-[#a3a3a3] max-w-xl mx-auto"
        >
          DealDock makes the revenue in your inbox visible — then helps you
          recover it, in your own voice.
        </motion.p>
      </motion.div>

      <div className="section-divider absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl" />
    </section>
  );
}
