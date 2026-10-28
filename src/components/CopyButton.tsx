"use client";

import { useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be blocked; the number stays visible to copy by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label} account number`}
      className="shrink-0 rounded-full border border-burgundy/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-burgundy transition hover:border-burgundy hover:bg-burgundy hover:text-cream"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
