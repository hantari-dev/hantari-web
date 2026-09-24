"use client";

import { useState } from "react";

/** Shows an email address as plain, selectable text with a small copy button (no mailto: needed). */
export function CopyEmail({ email, copyLabel, copiedLabel }: { email: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — the address is still selectable */
    }
  };
  return (
    <span className="inline-flex flex-wrap items-center gap-3">
      <span className="select-all font-mono text-[17px] text-ink md:text-lg">{email}</span>
      <button
        type="button"
        onClick={copy}
        className="rounded-md border border-[#C9C4B8] px-3 py-1.5 text-[13px] text-graphite transition-colors hover:border-ink hover:text-ink"
        aria-live="polite"
      >
        {copied ? copiedLabel : copyLabel}
      </button>
    </span>
  );
}
