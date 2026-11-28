"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { PilotApplication } from "@/components/site/pilot-application";
import s from "./landing.module.css";

/** Open the apply sheet from anywhere, optionally with the Instagram handle already typed (the hero does this). */
export const openApply = (handle = "") => window.dispatchEvent(new CustomEvent("dealdock:apply", { detail: handle }));

/**
 * The one place to apply. Every link to #apply on this page opens it instead of scrolling, so the header,
 * pricing cards, story band and closing section all lead to the same short form.
 */
export function ApplySheet({ online }: { online: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [handle, setHandle] = useState("");

  useEffect(() => {
    const open = (h: string) => { setHandle(h); if (!dialog.current?.open) dialog.current?.showModal(); };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href*='#apply']") as HTMLAnchorElement | null;
      if (!a || a.hash !== "#apply" || a.pathname !== location.pathname || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      open("");
    };
    const onApply = (e: Event) => open((e as CustomEvent<string>).detail);
    document.addEventListener("click", onClick);
    window.addEventListener("dealdock:apply", onApply);
    // arriving from another page's Apply link (/#apply) opens it straight away
    if (location.hash === "#apply") requestAnimationFrame(() => open(""));
    return () => { document.removeEventListener("click", onClick); window.removeEventListener("dealdock:apply", onApply); };
  }, []);

  return (
    <dialog ref={dialog} className={s.sheet} aria-labelledby="apply-sheet-title"
      onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <div className={s.sheetBody}>
        <button type="button" className={s.sheetClose} onClick={() => dialog.current?.close()} aria-label="Close"><X size={18} weight="bold" /></button>
        <p className={s.sheetKicker}>Pilot · 30 days free</p>
        <h2 id="apply-sheet-title" className={s.sheetTitle}>Apply for the pilot</h2>
        <p className={s.sheetLede}>Three quick details. Anshu reads every application and replies by email within two working days.</p>
        <PilotApplication key={handle} online={online} compact handle={handle} prefix="sheet-" />
      </div>
    </dialog>
  );
}
