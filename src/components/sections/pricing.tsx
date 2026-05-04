"use client";

import { motion } from "motion/react";
import { Check, Sparkle } from "@phosphor-icons/react";
import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper";
import { staggerContainer, scaleIn, viewportOnce } from "@/lib/motion";
import { pricingTiers } from "@/data/pricing";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <SectionWrapper id="pricing" className="bg-[#0a0a0a]">
      <SectionHeader
        eyebrow="Pricing"
        headline="Pays for itself in one recovered deal."
        subhead="Pilot pricing. Monthly only. Cancel anytime. No setup fee."
        centered
      />

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {pricingTiers.map((tier) => (
          <motion.div
            key={tier.id}
            variants={scaleIn}
            whileHover={
              tier.highlighted
                ? {
                    y: -8,
                    boxShadow: "0 0 60px rgba(255,193,7,0.25), 0 20px 40px rgba(0,0,0,0.4)",
                  }
                : {
                    y: -4,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
                  }
            }
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className={cn(
              "relative rounded-[1.5rem] p-px overflow-hidden cursor-default",
              tier.highlighted
                ? "shadow-[0_0_40px_rgba(255,193,7,0.15)]"
                : ""
            )}
            style={{
              background: tier.highlighted
                ? "linear-gradient(135deg, rgba(255,193,7,0.4) 0%, rgba(255,193,7,0.1) 50%, rgba(255,193,7,0.3) 100%)"
                : "rgba(255,255,255,0.06)",
            }}
          >
            {/* Shimmer effect on highlighted card */}
            {tier.highlighted && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,193,7,0.06) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["200% 0", "-200% 0"] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "linear" }}
              />
            )}

            <div
              className={cn(
                "h-full rounded-[calc(1.5rem-1px)] p-7 flex flex-col",
                tier.highlighted ? "bg-[#0f0e00]" : "bg-[#0a0a0a]"
              )}
            >
              {/* Badge */}
              {tier.badge && (
                <span className="inline-flex self-start items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold bg-[#ffc107]/10 text-[#ffc107] border border-[#ffc107]/20 mb-4">
                  <Sparkle size={10} weight="fill" />
                  {tier.badge}
                </span>
              )}

              {/* Name */}
              <h3 className="text-base font-semibold text-[#fafafa] mb-1">
                {tier.name}
              </h3>
              <p className="text-[13px] text-[#737373] mb-5">{tier.for}</p>

              {/* Price */}
              <div className="mb-6 pb-6 border-b border-white/[0.07]">
                <div className="flex items-baseline gap-1">
                  <motion.span
                    className="text-[2.25rem] font-bold font-mono"
                    style={{ color: tier.highlighted ? "#ffc107" : "#fafafa" }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    ₹{tier.price.toLocaleString("en-IN")}
                  </motion.span>
                  <span className="text-[#737373] text-sm">{tier.period}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-3 text-[11px] text-[#525252]">
                  <span>{tier.igAccounts}</span>
                  <span>·</span>
                  <span>{tier.seats}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 flex-1 mb-8">
                {tier.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-2.5"
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 200 }}
                  >
                    <Check
                      size={14}
                      weight="bold"
                      className="mt-0.5 flex-shrink-0 text-[#ffc107]"
                    />
                    <span className="text-[13px] text-[#a3a3a3] leading-snug">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href="#"
                whileHover={
                  tier.highlighted
                    ? { scale: 1.03, boxShadow: "0 0 20px rgba(255,193,7,0.4)" }
                    : { scale: 1.02 }
                }
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "block w-full text-center py-3 rounded-full text-[14px] font-semibold transition-colors duration-200",
                  tier.highlighted
                    ? "bg-[#ffc107] text-[#050505] hover:bg-[#e5a800]"
                    : "bg-white/[0.06] text-[#fafafa] hover:bg-white/[0.1] border border-white/[0.08]"
                )}
              >
                {tier.cta}
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pilot terms note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ delay: 0.4 }}
        className="text-center mt-10 text-[13px] text-[#525252]"
      >
        Pilot members keep this pricing as long as they remain subscribed. First
        invoice runs after one full week of active use.
      </motion.p>
    </SectionWrapper>
  );
}
