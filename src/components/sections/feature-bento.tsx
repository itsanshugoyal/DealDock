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

const bentoCards = [
  {
    id: "revenue-inbox",
    icon: Tray,
    title: "Revenue Inbox",
    body: "Every DM sorted by what it's worth. Brand deals at the top. Fan messages at the bottom. The ₹3L brief that would've expired unseen? Now it's the first thing you see.",
    span: "lg:col-span-2",
    accent: "#ffc107",
    visual: "inbox",
  },
  {
    id: "voice-drafting",
    icon: Microphone,
    title: "Your voice. AI speed.",
    body: "Drafts that sound like you wrote them — your greeting, your tone, your sign-off. 70% of pilot creators send them without edits.",
    span: "lg:col-span-1",
    accent: "#22c55e",
    visual: "voice",
  },
  {
    id: "revenue-ledger",
    icon: ChartBar,
    title: "Revenue Ledger",
    body: "One-tap close. Every recovered rupee tracked month over month. Proof that DealDock pays for itself many times over.",
    span: "lg:col-span-1",
    accent: "#3b82f6",
    visual: "ledger",
  },
  {
    id: "review-queue",
    icon: CheckSquare,
    title: "Human in the loop",
    body: "Uncertain messages go to review — never your inbox. Nothing sends without your approval. Ever.",
    span: "lg:col-span-1",
    accent: "#a855f7",
    visual: "review",
  },
  {
    id: "hinglish",
    icon: Translate,
    title: "Hindi. English. Hinglish.",
    body: "Code-switching doesn't break our classifier. Built for how Indian creators actually talk — bro, this works.",
    span: "lg:col-span-1",
    accent: "#f97316",
    visual: "hinglish",
  },
];

function InboxVisual() {
  return (
    <div className="mt-4 space-y-1.5">
      {[
        { type: "brand" as const, value: "₹3.2L", preview: "@herbalindia_brand" },
        { type: "coaching" as const, value: "₹1.8L", preview: "@vikram_fitness91" },
        { type: "course" as const, value: "₹80K", preview: "@anjali_learns" },
      ].map((row, i) => (
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

function VoiceVisual() {
  return (
    <div className="mt-4 space-y-2">
      <p className="text-[10px] text-[#737373] uppercase tracking-wider">Draft generated</p>
      <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.05]">
        <p className="text-[12px] text-[#a3a3a3] leading-relaxed">
          &quot;Hey Vikram! Haan bhai, 1-on-1 coaching still open for the right fit. My 12-week program is ₹18K — DM me your goals and we&apos;ll see if it&apos;s a match 💪&quot;
        </p>
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

function HinglishVisual() {
  return (
    <div className="mt-4 space-y-2">
      <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.05]">
        <p className="text-[12px] text-[#a3a3a3]">
          &quot;Bhai tera coaching program lena hai yaar, kitna charge karta hai?&quot;
        </p>
      </div>
      <div className="flex items-center gap-2">
        <ClassificationBadge type="coaching" />
        <span className="text-[11px] text-[#737373]">Classified correctly · 97% confidence</span>
      </div>
    </div>
  );
}

const visualMap: Record<string, React.ReactNode> = {
  inbox: <InboxVisual />,
  voice: <VoiceVisual />,
  ledger: <LedgerVisual />,
  review: <ReviewVisual />,
  hinglish: <HinglishVisual />,
};

export function FeatureBento() {
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
        {bentoCards.map((card) => {
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
                  {card.title}
                </h3>
                <p className="text-[13px] text-[#737373] leading-relaxed">
                  {card.body}
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
