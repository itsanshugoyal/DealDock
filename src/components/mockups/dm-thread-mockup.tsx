"use client";

import { motion } from "motion/react";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const dmRows = [
  { text: "Love your content bhai!! 🔥🔥", type: "fan", sender: "@rohan_fan123" },
  { text: "Hi! We're Herbalia India — interested in a paid collab for our Q2...", type: "brand", sender: "@herbalindia_brand", value: "₹3.2L" },
  { text: "Bro which protein do you recommend for beginners??", type: "fan", sender: "@gym_newbie_99" },
  { text: "Hey! Your coaching program — is 1-on-1 still available?", type: "coaching", sender: "@vikram_fitness91", value: "₹1.8L" },
  { text: "Your story was so inspiring 😭❤️", type: "fan", sender: "@anjali_admirer" },
  { text: "Free collab — we send products, you post once?", type: "spam", sender: "@freeproducts_collab" },
  { text: "Is your next course cohort still open? I've been waiting...", type: "course", sender: "@anjali_learns", value: "₹80K" },
  { text: "Bhai can you check my diet plan?? DM kar", type: "fan", sender: "@health_enthusiast" },
];

const typeConfig = {
  brand: {
    glow: true,
    textClass: "text-[#e5e5e5]",
    containerClass: "border-l-2 border-[#22c55e] bg-[#22c55e]/[0.04]",
  },
  coaching: {
    glow: true,
    textClass: "text-[#e5e5e5]",
    containerClass: "border-l-2 border-[#3b82f6] bg-[#3b82f6]/[0.04]",
  },
  course: {
    glow: true,
    textClass: "text-[#e5e5e5]",
    containerClass: "border-l-2 border-[#a855f7] bg-[#a855f7]/[0.04]",
  },
  fan: {
    glow: false,
    textClass: "text-[#525252]",
    containerClass: "border-l-2 border-transparent",
  },
  spam: {
    glow: false,
    textClass: "text-[#404040]",
    containerClass: "border-l-2 border-transparent opacity-60",
  },
};

export function DmThreadMockup() {
  return (
    <div className="card-bezel w-full max-w-sm mx-auto lg:mx-0">
      <div className="card-bezel-inner overflow-hidden">
        <div className="px-4 py-3.5 border-b border-white/[0.06]">
          <p className="text-[11px] text-[#737373] uppercase tracking-widest font-medium">
            Your Instagram Inbox
          </p>
          <p className="text-sm font-semibold text-[#fafafa] mt-0.5">
            Before DealDock
          </p>
        </div>
        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="divide-y divide-white/[0.03]"
        >
          {dmRows.map((row, i) => {
            const config = typeConfig[row.type as keyof typeof typeConfig];
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`px-4 py-2.5 flex items-start gap-2.5 ${config.containerClass}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-medium truncate ${
                        config.glow ? "text-[#a3a3a3]" : "text-[#525252]"
                      }`}
                    >
                      {row.sender}
                    </span>
                    {row.value && (
                      <span className="text-[11px] font-mono font-bold text-[#ffc107] flex-shrink-0">
                        {row.value}
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-[12px] truncate mt-0.5 ${config.textClass}`}
                  >
                    {row.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        <div className="px-4 py-3 border-t border-white/[0.06] text-center">
          <p className="text-[11px] text-[#525252]">
            <span className="text-[#ffc107]">3 revenue messages</span> buried
            under {dmRows.length - 3} others
          </p>
        </div>
      </div>
    </div>
  );
}
