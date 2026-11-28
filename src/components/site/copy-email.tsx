"use client";

import { useState } from "react";
import { Check } from "@phosphor-icons/react/dist/ssr/Check";
import { Copy } from "@phosphor-icons/react/dist/ssr/Copy";

/** Copies an address, for visitors whose mail link opens nothing. */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: the address stays visible to copy by hand
    }
  };
  return (
    <button type="button" onClick={copy} aria-live="polite">
      {copied ? <Check size={16} weight="bold" aria-hidden="true" /> : <Copy size={16} weight="bold" aria-hidden="true" />}
      {copied ? "Copied" : "Copy address"}
    </button>
  );
}
