"use client";

import { ArrowDown, PencilSimple, Tray } from "@phosphor-icons/react";
import { useLocale } from "@/lib/locale-context";

/** Static and explicitly illustrative: no simulated live connection or sends. */
export function RevenueInboxMockup({ className = "" }: { className?: string }) {
  const { id } = useLocale();
  const format = (value: number) => new Intl.NumberFormat(id === "in" ? "en-IN" : "en-US", { style: "currency", currency: id === "in" ? "INR" : "USD", maximumFractionDigits: 0 }).format(value);
  const enquiries = [
    { label: "Brand collaboration", initials: "BC", text: "Could you share your availability for a paid partnership?", amount: id === "in" ? 65000 : 1800 },
    { label: "Coaching enquiry", initials: "CE", text: "Is there a place on your 12-week programme?", amount: id === "in" ? 18000 : 450 },
    { label: "Course enquiry", initials: "CQ", text: "Can I still join the next cohort?", amount: id === "in" ? 8500 : 180 },
  ];
  return (
    <div className={"m-inbox " + className}>
      <div className="flex items-center justify-between gap-3 border-b border-white/15 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-2.5 text-sm font-medium"><Tray size={19} aria-hidden="true" />Revenue Inbox</div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#c1c6bb]">Sample / 03</span>
      </div>
      <div className="flex items-center justify-between gap-2 px-5 pt-5 pb-3 text-[10px] uppercase tracking-wider text-[#c1c6bb] sm:px-6">
        <span>Worth a closer look</span><span className="flex items-center gap-1">Est. value <ArrowDown size={11} aria-hidden="true" /></span>
      </div>
      <ol className="px-3 sm:px-4">
        {enquiries.map((row, index) => (
          <li key={row.label} className={"m-inbox-row " + (index === 1 ? "m-inbox-row-selected" : "")}>
            <div className="flex min-w-0 items-start gap-3">
              <span aria-hidden="true" className="m-initials hidden sm:flex">{row.initials}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                  <span className="text-[12px] font-medium">{row.label}</span>
                  <span className="m-money text-[13px]">{format(row.amount)}</span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-[#c1c6bb]">{row.text}</p>
                {index === 1 && <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] text-[#dfbd7f]"><PencilSimple size={12} aria-hidden="true" />Draft ready for your review</span>}
              </div>
            </div>
          </li>
        ))}
      </ol>
      <div className="mx-5 mt-4 mb-5 border-t border-white/15 pt-4 text-[11px] leading-relaxed text-[#c1c6bb] sm:mx-6">
        Estimates help you prioritize. They aren’t confirmed sales.
      </div>
    </div>
  );
}
