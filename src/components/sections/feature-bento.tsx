"use client";

import { motion } from "motion/react";
import {
  Tray,
  Microphone,
  ChartBar,
  CheckSquare,
  Translate,
} from "@phosphor-icons/react";
import { SectionWrapper, SectionHeader } from "@/components/shared/section-wrapper";
import { staggerContainer, scaleIn, viewportOnce } from "@/lib/motion";
import { ClassificationBadge } from "@/components/shared/classification-badge";
import { useLocale } from "@/lib/locale-context";
import type { ClassificationType } from "@/data/locales/types";

const cardMeta = [
  { id: "revenue-inbox", icon: Tray, title: "Revenue Inbox", span: "lg:col-span-2", accent: "#ffc107", visual: "inbox" },
  { id: "voice-drafting", icon: Microphone, title: "Your voice. AI speed.", span: "lg:col-span-1", accent: "#22c55e", visual: "voice" },
  { id: "revenue-ledger", icon: ChartBar, title: "Revenue Ledger", span: "lg:col-span-1", accent: "#3b82f6", visual: "ledger" },
  { id: "review-queue", icon: CheckSquare, title: "Human in the loop", span: "lg:col-span-1", accent: "#a855f7", visual: "review" },
  { id: "language", icon: Translate, title: "", span: "lg:col-span-1", accent: "#f97316", visual: "language" },
];

function InboxVisual({ rows }: { rows: { type: ClassificationType; value: string; preview: string }[] }) {
  return (
    <div className="mt-4 space-y-1.5">
      {rows.map((row, i) => (
        <div key={i} className="flex items-center justify-between py-1.5 border-b border-white/[0.04]">
          <div className="flex items-center gap-2">
            <ClassificationBadge type={row.type} />
            <span className="text-[11px] text-[#737373] truncate max-w-[100px]">{row.preview}</span>
          </div>
          <span className="text-[12px] font-mono font-bold text-[#ffc107]">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function VoiceVisual({ draft }: { draft: string }) {
  return (
    <div className="mt-4 space-y-2">
      <p className="text-[10px] text-[#737373] uppercase tracking-wider">Draft generated</p>
      <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.05]">
        <p className="text-[12px] text-[#a3a3a3] leading-relaxed">{draft}</p>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="h-1 flex-1 rounded-full bg-white/[0.06]">
          <div className="h-full w-[73%] rounded-full bg-[#22c55e]" />
        </div>
        <span className="text-[10px] text-[#22c55e] font-medium whitespace-nowrap">73% no-edit rate</span>
      </div>
    </div>
  );
}

function LedgerVisual() {
  return (
    <div className="mt-4 flex items-end gap-1.5 h-12">
      {[25, 45, 35, 70, 55, 100].map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-sm"
          style={{
            height: `${h}%`,
            background: i === 5
              ? "linear-gradient(to top, #ffc107, #fff0bf)"
              : "rgba(255,255,255,0.1)",
          }}
        />
      ))}
    </div>
  );
}

function ReviewVisual() {
  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
        <span className="text-[11px] text-[#a3a3a3]">@randomdm_user</span>
        <div className="flex items-center gap-1.5">
          <button className="px-2.5 py-1 rounded-full bg-[#22c55e]/10 text-[#22c55e] text-[10px] border border-[#22c55e]/20">
            Confirm
          </button>
          <button className="px-2.5 py-1 rounded-full bg-white/[0.04] text-[#737373] text-[10px] border border-white/[0.08]">
            Override
          </button>
        </div>
      </div>
      <p className="text-[10px] text-[#525252]">Uncertain — awaiting your classification</p>
    </div>
  );
}

function LanguageVisual({ draft }: { draft: string }) {
  return (
    <div className="mt-4 space-y-2">
      <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.05]">
        <p className="text-[12px] text-[#a3a3a3]">{draft}</p>
      </div>
      <div className="flex items-center gap-2">
        <ClassificationBadge type="coaching" />
        <span className="text-[11px] text-[#737373]">Classified correctly · 97% confidence</span>
      </div>
    </div>
  );
}

export function FeatureBento() {
  const { features } = useLocale();

  const cardCopy = [
    features.inboxBody,
    features.voiceBody,
    features.ledgerBody,
    features.reviewBody,
    features.languageBody,
  ];
  const cardTitles = [
    "Revenue Inbox",
    "Your voice. AI speed.",
    "Revenue Ledger",
    "Human in the loop",
    features.languageTitle,
  ];

  const visualMap: Record<string, React.ReactNode> = {
    inbox: <InboxVisual rows={features.inboxVisualRows} />,
    voice: <VoiceVisual draft={features.voiceDraft} />,
    ledger: <LedgerVisual />,
    review: <ReviewVisual />,
    language: <LanguageVisual draft={features.languageDraft} />,
  };

  return (
    <SectionWrapper id="features" className="bg-[#0a0a0a]">
      <SectionHeader
        eyebrow="Features"
        headline="Built for creators who sell through DMs."
        centered
      />

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {cardMeta.map((card, ci) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              variants={scaleIn}
              className={`card-bezel ${card.span}`}
            >
              <div className="card-bezel-inner p-6 flex flex-col min-h-[220px]">
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-4 border"
                  style={{
                    backgroundColor: `${card.accent}14`,
                    borderColor: `${card.accent}25`,
                  }}
                >
                  <Icon size={18} weight="regular" style={{ color: card.accent }} />
                </div>

                {/* Text */}
                <h3 className="text-[16px] font-semibold text-[#fafafa] mb-2">
                  {cardTitles[ci]}
                </h3>
                <p className="text-[13px] text-[#737373] leading-relaxed">
                  {cardCopy[ci]}
                </p>

                {/* Visual */}
                {visualMap[card.visual]}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
