"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useApplyModal } from "@/lib/apply-modal-context";
import { useLocale } from "@/lib/locale-context";
import { inLocale } from "@/data/locales/in";
import { globalLocale } from "@/data/locales/global";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const locales = [inLocale, globalLocale];

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const { openModal } = useApplyModal();
  const current = useLocale();
  const other = locales.find((l) => l.id !== current.id) ?? globalLocale;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(`#${id}`); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.15 }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
      >
        <nav
          ref={navRef}
          className={cn(
            "glass-pill rounded-full px-5 py-2.5 flex items-center gap-6 transition-all duration-500",
            scrolled
              ? "bg-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-white/[0.03]"
          )}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-1.5 group"
          >
            <span className="w-6 h-6 rounded-lg bg-[#ffc107] flex items-center justify-center text-[#050505] text-[11px] font-black leading-none select-none group-hover:bg-[#e5a800] transition-colors">
              {current.currencySymbol}
            </span>
            <span className="font-bold text-[#fafafa] text-sm tracking-tight">DealDock</span>
          </a>

          {/* Links — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative text-[13px] px-3 py-1.5 rounded-full cursor-pointer transition-colors duration-200"
                  style={{ color: isActive ? "#fafafa" : "#a3a3a3" }}
                >
                  <AnimatePresence>
                    {hoveredLink === link.href && (
                      <motion.span
                        layoutId="nav-hover-pill"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute inset-0 rounded-full bg-white/[0.07]"
                      />
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#ffc107]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Locale switcher — desktop */}
          <a
            href={other.routePath}
            title={`Switch to ${other.label} pricing (${other.currencyCode})`}
            className="hidden md:inline-flex items-center gap-1.5 text-[12px] text-[#a3a3a3] hover:text-[#fafafa] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] rounded-full px-3 py-1.5 transition-colors"
          >
            <span>{other.flag}</span>
            <span className="font-medium">{other.currencySymbol}</span>
          </a>

          {/* CTA — desktop */}
          <motion.button
            onClick={() => openModal()}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:inline-flex items-center gap-2 bg-[#ffc107] text-[#050505] text-[13px] font-bold px-4 py-1.5 rounded-full hover:bg-[#e5a800] transition-colors shadow-[0_0_12px_rgba(255,193,7,0.3)]"
          >
            Apply for Pilot
          </motion.button>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#a3a3a3] hover:text-[#fafafa] transition-colors ml-auto"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait">
              {menuOpen ? (
                <motion.span key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={18} weight="bold" />
                </motion.span>
              ) : (
                <motion.span key="open" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <List size={18} weight="bold" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-6"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.05 }} className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-xl bg-[#ffc107] flex items-center justify-center text-[#050505] text-sm font-black">{current.currencySymbol}</span>
              <span className="text-xl font-bold text-[#fafafa]">DealDock</span>
            </motion.div>

            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.08 + i * 0.06, type: "spring", stiffness: 200, damping: 22 }}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "text-2xl font-semibold transition-colors cursor-pointer",
                  activeSection === link.href ? "text-[#ffc107]" : "text-[#fafafa] hover:text-[#ffc107]"
                )}
              >
                {link.label}
              </motion.button>
            ))}

            {/* Locale switcher — mobile */}
            <motion.a
              href={other.routePath}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.08 + navLinks.length * 0.06, type: "spring" }}
              className="inline-flex items-center gap-2 text-[14px] text-[#a3a3a3] hover:text-[#fafafa] bg-white/[0.05] border border-white/[0.08] rounded-full px-4 py-2 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              <span>{other.flag}</span>
              View {other.label} pricing ({other.currencySymbol})
            </motion.a>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.14 + navLinks.length * 0.06, type: "spring" }}
              onClick={() => { setMenuOpen(false); openModal(); }}
              className="mt-2 inline-flex items-center bg-[#ffc107] text-[#050505] text-base font-bold px-8 py-3 rounded-full hover:bg-[#e5a800] transition-colors shadow-[0_0_24px_rgba(255,193,7,0.35)]"
            >
              Apply for Pilot
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
