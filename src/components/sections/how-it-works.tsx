"use client";

import { motion } from "motion/react";
import { InstagramLogo, ArrowsDownUp, PaperPlaneTilt } from "@phosphor-icons/react";
import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { useLocale } from "@/lib/locale-context";

const stepMeta = [
  { Icon: InstagramLogo, color: "#22c55e", glow: "rgba(34,197,94,0.25)" },
  { Icon: ArrowsDownUp, color: "#3b82f6", glow: "rgba(59,130,246,0.25)" },
  { Icon: PaperPlaneTilt, color: "#ffc107", glow: "rgba(255,193,7,0.25)" },
];

export function HowItWorks() {
  const { howItWorks } = useLocale();
  const steps = howItWorks.steps.map((s, i) => ({ ...s, ...stepMeta[i], number: `0${i + 1}` }));

  return (
    <SectionWrapper id="how-it-works">
      <SectionHeader
        eyebrow="How It Works"
        headline="Three steps to stop the leak."
        centered
      />

      <motion.div
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14"
      >
        {/* Connecting line — desktop only, sits BEHIND icons via z-0 */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute z-0 h-px"
          style={{
            top: "4rem",
            left: "calc(16.67% + 2.25rem)",
            right: "calc(16.67% + 2.25rem)",
            background:
              "linear-gradient(to right, rgba(34,197,94,0.35), rgba(59,130,246,0.35), rgba(255,193,7,0.35))",
          }}
        >
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/70"
            initial={{ left: "0%", opacity: 0 }}
            whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.7, ease: "easeInOut" }}
          />
        </div>

        {steps.map((step, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="relative flex flex-col items-center text-center group"
          >
            {/* Step number */}
            <motion.span
              className="font-mono text-[11px] font-bold mb-4 tracking-widest"
              style={{ color: step.color }}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.12 }}
            >
              {step.number}
            </motion.span>

            {/* Icon circle */}
            <motion.div
              whileHover={{
                scale: 1.12,
                boxShadow: `0 0 36px ${step.glow}, 0 0 10px ${step.glow}`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-6 cursor-pointer"
              style={{
                backgroundColor: "#111111",
                border: `1px solid ${step.color}35`,
                boxShadow: `inset 0 0 20px ${step.color}10, 0 0 18px ${step.color}18`,
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: `${step.color}45`, borderStyle: "dashed" }}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <step.Icon size={26} weight="duotone" style={{ color: step.color }} />
            </motion.div>

            {/* Content */}
            <h3 className="text-base font-semibold text-[#e5e5e5] mb-3 group-hover:text-[#fafafa] transition-colors">
              {step.title}
            </h3>
            <p className="text-[14px] text-[#737373] leading-relaxed max-w-[260px]">
              {step.body}
            </p>

            {/* Mobile vertical connector */}
            {i < steps.length - 1 && (
              <div className="md:hidden mt-8 w-px h-8 bg-gradient-to-b from-white/10 to-transparent" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
