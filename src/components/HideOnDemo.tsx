"use client";

import { usePathname } from "@/i18n/navigation";

/** Hides the site header/footer on the full-screen tablet showcase (/demo). */
export function HideOnDemo({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/demo") return null;
  return <>{children}</>;
}
