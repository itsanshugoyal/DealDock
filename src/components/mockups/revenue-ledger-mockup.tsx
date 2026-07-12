"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { TrendUp } from "@phosphor-icons/react";
import { ClassificationBadge } from "@/components/shared/classification-badge";
import { RupeeCounter } from "@/components/shared/rupee-counter";
import { staggerContainer } from "@/lib/motion";
import { useLocale, useMoneyFormat } from "@/lib/locale-context";

export function RevenueLedgerMockup() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const { ledgerMockup, currencySymbol } = useLocale();
  const money = useMoneyFormat();
  const { months, recentDeals, tileLabels, thisMonthValue, avgDealValue, topDealValue } = ledgerMockup;

  const formatStatic = (v: number) =>
    money.format === "comma"
      ? `${currencySymbol}${Math.round(v).toLocaleString("en-US")}`
      : `${currencySymbol}${v}L`;

  return (
    <div ref={ref} className="card-bezel w-full">
      <div className="card-bezel-inner overflow-hidden">
        {/* Header bar */}
        <div className="px-6 py-4 border-b border-white/[0.06] bg-[#111111] flex items-center justify-between">
          <div>
            <p className="text-[11px] text-[#737373] uppercase tracking-widest font-medium">
              Revenue Ledger
            </p>
            <p className="text-sm font-semibold text-[#fafafa] mt-0.5">
              Recovered this month
            </p>
          </div>
          <div className="flex items-center gap-1.5 bg-[#22c55e]/10 border border-[#22c55e]/20 rounded-full px-2.5 py-1">
            <TrendUp size={12} weight="bold" className="text-[#22c55e]" />
            <span className="text-[11px] text-[#22c55e] font-semibold">+62%</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Summary tiles */}
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-3 gap-3"
          >
            {[
              { label: tileLabels.thisMonth, value: thisMonthValue, highlight: true },
              { label: tileLabels.avgDeal, value: avgDealValue, highlight: false },
              { label: tileLabels.topDeal, value: topDealValue, highlight: false },
            ].map((tile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200, damping: 25 }}
                className="rounded-xl p-3 border relative overflow-hidden"
                style={{
                  backgroundColor: tile.highlight ? "rgba(255,193,7,0.06)" : "rgba(255,255,255,0.03)",
                  borderColor: tile.highlight ? "rgba(255,193,7,0.2)" : "rgba(255,255,255,0.06)",
                }}
              >
                <p className="text-[10px] text-[#737373] uppercase tracking-wider mb-1.5">
                  {tile.label}
                </p>
                <RupeeCounter
                  value={tile.value}
                  suffix={money.format === "decimal" ? "L" : ""}
                  prefix={money.prefix}
                  decimals={money.decimals}
                  format={money.format}
                  duration={1.4}
                  className="text-lg font-bold font-mono"
                  style={{ color: tile.highlight ? "#ffc107" : "#e5e5e5" }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Bar chart */}
          <div>
            <p className="text-[11px] text-[#737373] uppercase tracking-wider mb-4">
              Monthly recovered ({currencySymbol})
            </p>
            <div className="flex items-end gap-2" style={{ height: "96px" }}>
              {months.map((month, i) => {
                const isLast = i === months.length - 1;
                const isHovered = hoveredBar === i;
                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-1.5 relative"
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 2, scale: 0.95 }}
                          transition={{ duration: 0.12 }}
                          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10 bg-[#1a1a1a] border border-white/[0.1] rounded-lg px-2.5 py-1.5 whitespace-nowrap pointer-events-none"
                          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.4)" }}
                        >
                          <p className="text-[10px] text-[#737373] font-medium">{month.label}</p>
                          <p
                            className="text-[13px] font-bold font-mono"
                            style={{ color: isLast ? "#ffc107" : "#e5e5e5" }}
                          >
                            {formatStatic(month.value)}
                          </p>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#1a1a1a]" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div
                      className="w-full flex items-end rounded-t-md overflow-hidden"
                      style={{ height: "80px" }}
                    >
                      <motion.div
                        className="w-full rounded-t-md"
                        style={{
                          height: `${month.height}%`,
                          background: isLast
                            ? "linear-gradient(to top, #e5a800, #ffc107, #ffe57f)"
                            : isHovered
                            ? "linear-gradient(to top, #525252, #737373)"
                            : "linear-gradient(to top, #2a2a2a, #404040)",
                          transformOrigin: "bottom",
                          boxShadow: isLast ? "0 0 12px rgba(255,193,7,0.3)" : "none",
                        }}
                        initial={{ scaleY: 0 }}
                        animate={inView ? { scaleY: 1 } : {}}
                        transition={{
                          delay: i * 0.08,
                          type: "spring",
                          stiffness: 100,
                          damping: 16,
                        }}
                      />
                    </div>

                    <span
                      className="text-[9px] font-medium transition-colors"
                      style={{ color: isLast ? "#ffc107" : "#525252" }}
                    >
                      {month.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent deals */}
          <div>
            <p className="text-[11px] text-[#737373] uppercase tracking-wider mb-3">
              Recent deals
            </p>
            <div className="space-y-0">
              {recentDeals.map((deal, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.09, type: "spring", stiffness: 200 }}
                  className="flex items-center justify-between py-2.5 border-b border-white/[0.04] group cursor-default"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] text-[#525252] w-12 flex-shrink-0">{deal.date}</span>
                    <ClassificationBadge type={deal.type} />
                    <span className="text-[12px] text-[#a3a3a3] group-hover:text-[#e5e5e5] transition-colors">
                      {deal.handle}
                    </span>
                  </div>
                  <span className="text-[13px] font-mono font-semibold text-[#ffc107]">
                    {formatStatic(deal.value)}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
