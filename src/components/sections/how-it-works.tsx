"use client";

import { motion } from "motion/react";
import { InstagramLogo, ArrowsDownUp, PaperPlaneTilt } from "@phosphor-icons/react";
import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const steps = [
  {
    number: "01",
    Icon: InstagramLogo,
    title: "Connect your Instagram",
    body: "One OAuth tap. DealDock begins reading your inbox within 60 seconds. Official Meta API only — your account safety is non-negotiable.",
    color: "#22c55e",
    glow: "rgba(34,197,94,0.2)",
  },
  {
    number: "02",
    Icon: ArrowsDownUp,
    title: "We sort by rupee value",
    body: "AI classifies every DM — brand deal, coaching lead, course inquiry. Hinglish, Hindi, English. The most valuable messages surface to the top, not the most recent.",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.2)",
  },
  {
    number: "03",
    Icon: PaperPlaneTilt,
    title: "Draft, send, track the money",
    body: "Voice-matched replies drafted for you. Review, edit, send. Every closed deal logged instantly in your Revenue Ledger. You see the rupees you recovered, month over month.",
    color: "#ffc107",
    glow: "rgba(255,193,7,0.2)",
  },
];

export function HowItWorks() {
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
        {/* Connecting line — desktop only */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-[3.25rem] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px"
          style={{
            background:
              "linear-gradient(to right, rgba(34,197,94,0.3), rgba(59,130,246,0.3), rgba(255,193,7,0.3))",
          }}
        >
          {/* Animated traveling dot */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/60"
            style={{ left: 0 }}
            initial={{ left: "0%", opacity: 0 }}
            whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
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

            {/* Icon circle with hover animation */}
            <motion.div
              whileHover={{
                scale: 1.12,
                boxShadow: `0 0 32px ${step.glow}, 0 0 8px ${step.glow}`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative w-16 h-16 rounded-full flex items-center justify-center mb-6 border cursor-pointer transition-colors duration-300"
              style={{
                backgroundColor: `${step.color}12`,
                borderColor: `${step.color}25`,
                boxShadow: `0 0 20px ${step.color}15`,
              }}
            >
              {/* Rotating ring on hover */}
              <motion.div
                className="absolute w-16 h-16 rounded-full border"
                style={{ borderColor: `${step.color}40`, borderStyle: "dashed" }}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <step.Icon
                size={26}
                weight="duotone"
                style={{ color: step.color }}
              />
            </motion.div>

            {/* Content */}
            <h3 className="text-base font-semibold text-[#e5e5e5] mb-3 group-hover:text-[#fafafa] transition-colors">
              {step.title}
            </h3>
            <p className="text-[14px] text-[#737373] leading-relaxed max-w-[260px]">
              {step.body}
            </p>

            {/* Connector arrow — mobile only */}
            {i < steps.length - 1 && (
              <div className="md:hidden mt-8 w-px h-8 bg-gradient-to-b from-white/10 to-transparent" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
