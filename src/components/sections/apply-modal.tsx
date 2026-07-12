"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  InstagramLogo,
  WhatsappLogo,
  CheckCircle,
  ArrowRight,
  WarningCircle,
} from "@phosphor-icons/react";
import { useApplyModal } from "@/lib/apply-modal-context";
import { useLocale } from "@/lib/locale-context";
import { cn } from "@/lib/utils";

// ── Configuration ─────────────────────────────────────────────────────────────
// 1. Create a free form at https://formspree.io → copy the form ID (e.g. "xpwzabcd")
// 2. Replace YOUR_FORM_ID below, or set NEXT_PUBLIC_FORMSPREE_ID in your .env
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORM_ID";
// ─────────────────────────────────────────────────────────────────────────────

const niches = [
  "Fitness & Health",
  "Fashion & Style",
  "Beauty & Skincare",
  "Food & Cooking",
  "Tech & Gadgets",
  "Travel",
  "Business & Finance",
  "Lifestyle",
  "Entertainment",
  "Other",
];

const followerRanges = [
  "10K – 50K",
  "50K – 200K",
  "200K – 1M",
  "1M+",
];

type FormState = {
  name: string;
  handle: string;
  niche: string;
  followers: string;
  email: string;
};

const EMPTY: FormState = { name: "", handle: "", niche: "", followers: "", email: "" };

export function ApplyModal() {
  const { isOpen, selectedTier, closeModal } = useApplyModal();
  const { label: localeLabel, applyModal } = useLocale();
  const WHATSAPP_URL = `https://wa.me/${applyModal.whatsappNumber}?text=Hi!%20I%20want%20to%20apply%20for%20the%20DealDock%20pilot%20%F0%9F%99%8F%0AMy%20Instagram%3A%20%40`;
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setForm(EMPTY);
      setStatus("idle");
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeModal]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (FORMSPREE_ID === "YOUR_FORM_ID") {
      // Dev fallback — just show success without actually posting
      setStatus("success");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          instagram_handle: `@${form.handle.replace(/^@/, "")}`,
          niche: form.niche,
          followers: form.followers,
          email: form.email,
          tier: selectedTier ?? "Not specified",
          locale: localeLabel,
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const whatsappHref = `${WHATSAPP_URL}${encodeURIComponent(form.handle || "")}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 60, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="w-full max-w-lg pointer-events-auto card-bezel"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="card-bezel-inner p-0 overflow-hidden">

                {/* Header */}
                <div className="px-6 pt-6 pb-5 border-b border-white/[0.06] flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-lg bg-[#ffc107] flex items-center justify-center text-[#050505] text-[11px] font-black">
                        ₹
                      </span>
                      <span className="text-[11px] text-[#737373] font-medium uppercase tracking-widest">
                        DealDock
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-[#fafafa]">
                      Apply for the Pilot
                    </h2>
                    <p className="text-[13px] text-[#737373] mt-0.5">
                      Capped cohort · We review every application
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-white/[0.1] flex items-center justify-center text-[#737373] hover:text-[#fafafa] transition-colors flex-shrink-0"
                  >
                    <X size={14} weight="bold" />
                  </button>
                </div>

                {/* Body */}
                <div className="px-6 py-6">
                  <AnimatePresence mode="wait">

                    {/* ── Success state ─────────────────────────────────── */}
                    {status === "success" ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                          className="w-16 h-16 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center mx-auto mb-4"
                        >
                          <CheckCircle size={32} weight="fill" className="text-[#22c55e]" />
                        </motion.div>
                        <h3 className="text-lg font-bold text-[#fafafa] mb-2">
                          Application received!
                        </h3>
                        <p className="text-[14px] text-[#737373] max-w-xs mx-auto mb-6">
                          We'll review it and get back to you within 48 hours. Check your inbox.
                        </p>
                        {/* WhatsApp follow-up */}
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/25 text-[#25D366] font-semibold text-[13px] px-5 py-2.5 rounded-full hover:bg-[#25D366]/20 transition-colors"
                        >
                          <WhatsappLogo size={16} weight="fill" />
                          Also ping us on WhatsApp
                          <ArrowRight size={12} />
                        </a>
                        <button
                          onClick={closeModal}
                          className="block mx-auto mt-4 text-[12px] text-[#525252] hover:text-[#737373] transition-colors"
                        >
                          Close
                        </button>
                      </motion.div>

                    ) : (
                      /* ── Form ───────────────────────────────────────── */
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {/* Row: Name + Email */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-[#737373] uppercase tracking-wider mb-1.5 font-medium">
                              Full name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              required
                              placeholder="Priya Sharma"
                              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-[#fafafa] placeholder-[#525252] outline-none focus:border-[#ffc107]/40 focus:bg-white/[0.06] transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-[#737373] uppercase tracking-wider mb-1.5 font-medium">
                              Email
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              required
                              placeholder="you@gmail.com"
                              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-[#fafafa] placeholder-[#525252] outline-none focus:border-[#ffc107]/40 focus:bg-white/[0.06] transition-all"
                            />
                          </div>
                        </div>

                        {/* Instagram handle */}
                        <div>
                          <label className="block text-[11px] text-[#737373] uppercase tracking-wider mb-1.5 font-medium">
                            Instagram handle
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#525252] text-[13px] flex items-center gap-1.5">
                              <InstagramLogo size={14} weight="fill" />
                              @
                            </span>
                            <input
                              type="text"
                              name="handle"
                              value={form.handle}
                              onChange={handleChange}
                              required
                              placeholder="yourhandle"
                              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-3.5 py-2.5 text-[13px] text-[#fafafa] placeholder-[#525252] outline-none focus:border-[#ffc107]/40 focus:bg-white/[0.06] transition-all"
                            />
                          </div>
                        </div>

                        {/* Row: Niche + Followers */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-[#737373] uppercase tracking-wider mb-1.5 font-medium">
                              Your niche
                            </label>
                            <select
                              name="niche"
                              value={form.niche}
                              onChange={handleChange}
                              required
                              className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-[#fafafa] outline-none focus:border-[#ffc107]/40 transition-all appearance-none cursor-pointer"
                            >
                              <option value="" disabled>Select…</option>
                              {niches.map((n) => (
                                <option key={n} value={n}>{n}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] text-[#737373] uppercase tracking-wider mb-1.5 font-medium">
                              Followers
                            </label>
                            <select
                              name="followers"
                              value={form.followers}
                              onChange={handleChange}
                              required
                              className="w-full bg-[#111111] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-[13px] text-[#fafafa] outline-none focus:border-[#ffc107]/40 transition-all appearance-none cursor-pointer"
                            >
                              <option value="" disabled>Select…</option>
                              {followerRanges.map((r) => (
                                <option key={r} value={r}>{r}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Error */}
                        {status === "error" && (
                          <motion.div
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-red-400 text-[12px] bg-red-400/10 border border-red-400/20 rounded-xl px-3.5 py-2.5"
                          >
                            <WarningCircle size={14} weight="fill" />
                            Something went wrong. Please try again or use WhatsApp below.
                          </motion.div>
                        )}

                        {/* Submit */}
                        <motion.button
                          type="submit"
                          disabled={status === "loading"}
                          whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(255,193,7,0.35)" }}
                          whileTap={{ scale: 0.98 }}
                          transition={{ type: "spring", stiffness: 400 }}
                          className={cn(
                            "w-full py-3.5 rounded-full text-[14px] font-bold transition-colors",
                            status === "loading"
                              ? "bg-[#ffc107]/60 text-[#050505]/60 cursor-not-allowed"
                              : "bg-[#ffc107] text-[#050505] hover:bg-[#e5a800]"
                          )}
                        >
                          {status === "loading" ? "Submitting…" : "Submit Application →"}
                        </motion.button>

                        {/* Divider */}
                        <div className="flex items-center gap-3 py-1">
                          <div className="flex-1 h-px bg-white/[0.07]" />
                          <span className="text-[11px] text-[#525252]">or reach us directly</span>
                          <div className="flex-1 h-px bg-white/[0.07]" />
                        </div>

                        {/* WhatsApp */}
                        <motion.a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex w-full items-center justify-center gap-2.5 bg-[#25D366]/08 border border-[#25D366]/20 text-[#25D366] font-semibold text-[13px] py-3 rounded-full hover:bg-[#25D366]/15 hover:border-[#25D366]/35 transition-all"
                        >
                          <WhatsappLogo size={18} weight="fill" />
                          Chat on WhatsApp instead
                        </motion.a>

                        {/* Trust */}
                        <p className="text-center text-[11px] text-[#525252]">
                          No spam · We respond within 48 hours · Data stays private
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
