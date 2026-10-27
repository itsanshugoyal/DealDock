"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useApplyModal } from "@/lib/apply-modal-context";

export function ApplyModal() {
  const { isOpen, closeModal } = useApplyModal();
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen && !dialog.current?.open) dialog.current?.showModal();
    if (!isOpen && dialog.current?.open) dialog.current?.close();
  }, [isOpen]);
  return (
    <dialog ref={dialog} className="review-dialog" onCancel={closeModal} onClose={closeModal} aria-labelledby="review-dialog-title">
      <h2 id="review-dialog-title">This is the original design archive.</h2>
      <p>The accepted design has the current pilot offer and application. No application is submitted from this archive.</p>
      <Link href="/#apply">View the pilot application ↗</Link>
      <button type="button" onClick={closeModal}>Keep reviewing this design</button>
    </dialog>
  );
}
