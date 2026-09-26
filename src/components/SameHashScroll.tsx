"use client";

import { useEffect } from "react";

/**
 * Clicking a section link (e.g. "What we do" → /#services) a second time does nothing by default:
 * the URL already ends in #services, so neither the browser nor Next.js scrolls. This listener
 * catches that case and scrolls to the section anyway. The short delay lets the mobile menu
 * close and release the page first.
 */
export function SameHashScroll() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (!(a instanceof HTMLAnchorElement) || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      if (url.hash !== location.hash) return; // a different section: normal navigation handles it
      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;
      e.preventDefault();
      setTimeout(() => el.scrollIntoView(), 50);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
