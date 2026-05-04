"use client";

import { motion } from "motion/react";
import { DmThreadMockup } from "@/components/mockups/dm-thread-mockup";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { fadeUp, slideFromLeft, slideFromRight, staggerContainer, viewportOnce } from "@/lib/motion";

export function ProblemSection() {
  return (
    <SectionWrapper className="bg-[#0a0a0a]">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left: mockup */}
        <motion.div
          className="flex-1 w-full lg:max-w-[42%]"
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <DmThreadMockup />
        </motion.div>

        {/* Right: copy */}
        <motion.div
          className="flex-1 lg:max-w-[55%]"
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p variants={fadeUp} className="text-eyebrow mb-4">
            The Invisible Leak
          </motion.p>

          <motion.h2 variants={fadeUp} className="text-h1 mb-6">
            Your inbox is a{" "}
            <span className="text-[#ffc107]">₹50L graveyard.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-body-lg text-[#a3a3a3] mb-5 max-w-lg"
          >
            That ₹4L brand brief from a premium D2C brand? It arrived on
            Tuesday. By the time you saw it on Thursday — buried under 180 fan
            messages and three spam collabs — they&apos;d already moved on to
            the next creator who replied in four hours.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-body-lg text-[#a3a3a3] mb-8 max-w-lg"
          >
            The coaching enquiry that went cold. The course question from a
            warm lead who bought a competitor&apos;s program instead.{" "}
            <span className="text-[#e5e5e5]">
              You&apos;ll never know the exact number you&apos;ve lost — because
              the messages you never saw can&apos;t tell you what they were
              worth.
            </span>
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-3 bg-[#ffc107]/[0.08] border border-[#ffc107]/20 rounded-2xl px-5 py-4"
          >
            <div className="w-8 h-8 rounded-full bg-[#ffc107]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[#ffc107] text-base font-bold">₹</span>
            </div>
            <p className="text-sm text-[#a3a3a3]">
              Creators in our pilot were missing{" "}
              <span className="text-[#ffc107] font-semibold">
                ₹2L–₹8L per month
              </span>{" "}
              before connecting DealDock.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
