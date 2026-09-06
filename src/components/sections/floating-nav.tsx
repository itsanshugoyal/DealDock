"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { useApplyModal } from "@/lib/apply-modal-context";
import { useLocale } from "@/lib/locale-context";
import { DockMark } from "@/components/shared/dock-mark";

const links = [
  { label: "The workflow", href: "#how-it-works" },
  { label: "Your control", href: "#features" },
  { label: "Pilot pricing", href: "#pricing" },
];

export function FloatingNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const { openModal } = useApplyModal();
  const { id, routePath } = useLocale();
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  return (
    <header className="m-header">
      <nav aria-label="Main navigation" className="m-container flex min-h-20 flex-wrap items-center justify-between gap-x-6">
        <a href={routePath} className="flex min-h-11 items-center gap-2.5" aria-label="DealDock home" translate="no">
          <DockMark className="h-8 w-8" />
          <span className="text-xl font-semibold tracking-[-0.06em]">DealDock<span className="m-brass">.</span></span>
        </a>
        <div className="hidden items-center gap-8 text-[13px] font-medium md:flex">
          {links.map((link) => <a key={link.href} className="m-nav-link" href={link.href}>{link.label}</a>)}
        </div>
        <div className="flex items-center gap-3">
          <a className="m-nav-link hidden text-xs sm:inline-flex" href={id === "in" ? "/global" : "/"}>
            {id === "in" ? "Global / USD" : "India / INR"}
          </a>
          <button className="m-button m-button-small hidden sm:inline-flex" onClick={() => openModal()}>
            Join the pilot <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          <button ref={menuButton} className="m-icon-button md:hidden" aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} aria-hidden="true" /> : <List size={22} aria-hidden="true" />}
          </button>
        </div>
        <div id="mobile-navigation" hidden={!menuOpen} className="m-mobile-menu w-full border-t py-4 md:!hidden">
          {links.map((link) => <a key={link.href} href={link.href} className="block py-3 text-base" onClick={() => setMenuOpen(false)}>{link.label}</a>)}
          <a className="block py-3 text-sm" href={id === "in" ? "/global" : "/"}>{id === "in" ? "Global pricing / USD" : "India pricing / INR"}</a>
          <button className="m-button mt-3 w-full" onClick={() => { setMenuOpen(false); openModal(); }}>Join the pilot <ArrowUpRight size={17} aria-hidden="true" /></button>
        </div>
      </nav>
    </header>
  );
}
