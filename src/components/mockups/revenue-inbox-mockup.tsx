"use client";

import { motion } from "motion/react";
import { ClassificationBadge } from "@/components/shared/classification-badge";
import { RupeeCounter } from "@/components/shared/rupee-counter";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";
import { useLocale, useMoneyFormat } from "@/lib/locale-context";

export function RevenueInboxMockup() {
  const { inboxMockup, currencySymbol } = useLocale();
  const money = useMoneyFormat();

  return (
    <div className="card-bezel w-full max-w-md mx-auto lg:mx-0">
      <div className="card-bezel-inner p-0 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between bg-[#111111]">
          <div>
            <p className="text-[11px] text-[#737373] uppercase tracking-widest font-medium">
              Revenue Inbox
            </p>
            <p className="text-sm font-semibold text-[#fafafa] mt-0.5">
              Sorted by {currencySymbol} value
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#ffc107]/20 text-[#ffc107] text-[10px] font-bold border border-[#ffc107]/30">
              {inboxMockup.rows.length}
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
              <span className="text-[11px] text-[#22c55e]">Live</span>
            </div>
          </div>
        </div>

        {/* Rows */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="divide-y divide-white/[0.04]"
        >
          {inboxMockup.rows.map((row, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.025)" }}
              className="px-4 py-3.5 flex items-start gap-3 transition-colors cursor-pointer group"
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0 mt-0.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: row.avatarColor + "30", border: `1px solid ${row.avatarColor}40` }}
                >
                  <span style={{ color: row.avatarColor }}>{row.initials}</span>
                </div>
                {row.isNew && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#22c55e]" />
                  </span>
                )}
              </div>

              {/* Left: badge + handle + preview */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[12px] font-semibold text-[#e5e5e5]">
                    {row.handle}
                  </span>
                  <span className="text-[11px] text-[#525252]">{row.age}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <ClassificationBadge type={row.type} />
                  {row.hasDraft && (
                    <span className="text-[10px] text-[#ffc107] bg-[#ffc107]/10 border border-[#ffc107]/20 rounded-full px-1.5 py-0.5 leading-none">
                      Draft ready
                    </span>
                  )}
                </div>
                <p className="text-[12px] text-[#737373] truncate mt-1">
                  {row.preview}
                </p>
              </div>

              {/* Right: value */}
              <div className="text-right flex-shrink-0">
                <div className="text-[15px] font-mono font-bold">
                  <RupeeCounter
                    value={row.value}
                    suffix={row.valueSuffix}
                    prefix={money.prefix}
                    decimals={money.decimals}
                    format={money.format}
                    duration={1.2}
                    className="text-[#ffc107]"
                  />
                </div>
                <p className="text-[10px] text-[#525252] mt-0.5">est. value</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between bg-[#111111]">
          <span className="text-[11px] text-[#525252]">{inboxMockup.footerLabel}</span>
          <motion.span
            whileHover={{ x: 2 }}
            className="text-[11px] text-[#ffc107] cursor-pointer hover:text-[#e5a800] transition-colors flex items-center gap-1"
          >
            View all →
          </motion.span>
        </div>
      </div>
    </div>
  );
}
