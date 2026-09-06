"use client";

import { motion } from "motion/react";
import { DmThreadMockup } from "@/components/mockups/dm-thread-mockup";
import { SectionWrapper } from "@/components/shared/section-wrapper";
import { fadeUp, slideFromLeft, staggerContainer, viewportOnce } from "@/lib/motion";
import { useLocale } from "@/lib/locale-context";

export function ProblemSection() {
  const { problem, currencySymbol } = useLocale();

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
            {problem.eyebrow}
          </motion.p>

          <motion.h2 variants={fadeUp} className="text-h1 mb-6">
            {problem.headlinePrefix}{" "}
            <span className="text-[#ffc107]">{problem.headlineHighlight}</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-body-lg text-[#a3a3a3] mb-5 max-w-lg"
          >
            {problem.para1}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-body-lg text-[#a3a3a3] mb-8 max-w-lg"
          >
            {problem.para2Prefix}{" "}
            <span className="text-[#e5e5e5]">{problem.para2Bold}</span>
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-3 bg-[#ffc107]/[0.08] border border-[#ffc107]/20 rounded-2xl px-5 py-4"
          >
            <div className="w-8 h-8 rounded-full bg-[#ffc107]/10 flex items-center justify-center flex-shrink-0">
              <span className="text-[#ffc107] text-base font-bold">{currencySymbol}</span>
            </div>
            <p className="text-sm text-[#a3a3a3]">
              {problem.calloutPrefix}{" "}
              <span className="text-[#ffc107] font-semibold">
                {problem.calloutValue}
              </span>{" "}
              {problem.calloutSuffix}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
