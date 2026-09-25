"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { SERVICE_IDS } from "@/lib/services";
import { HMark } from "./Logo";
import { MenuArt } from "./art/Art";

type MenuId = "services" | "studio" | "lang" | null;

const LANG_NAMES: Record<Locale, string> = { en: "English", ro: "Română" };

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      aria-hidden
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="M2 3.5L5 6.5L8 3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function Globe() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M1.5 8H14.5M8 1.5C10 3.5 10.8 5.8 10.8 8S10 12.5 8 14.5C6 12.5 5.2 10.2 5.2 8S6 3.5 8 1.5Z" />
      </g>
    </svg>
  );
}

// Page scrolled past the top? (drives the sticky header's compact state)
function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}
const getScrolled = () => window.scrollY > 24;
const getScrolledServer = () => false;

const panel =
  "absolute top-full z-40 mt-2 rounded-[14px] border border-hairline bg-paper-raised shadow-[0_18px_40px_rgba(25,26,28,0.10)]";

export function Header() {
  const t = useTranslations("nav");
  const ts = useTranslations("services");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState<MenuId>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getScrolledServer);

  // Close menus when the route changes (render-time adjustment, no effect needed)
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }
  // …and when any link inside a menu is clicked (covers same-page #anchors)
  const closeOnLink = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a")) {
      setOpen(null);
      setMobileOpen(false);
    }
  };

  // Escape + click outside
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(null);
        setMobileOpen(false);
      }
    }
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const hoverOpen = (id: MenuId) => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(id);
  };
  const hoverClose = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 150);
  };
  const toggle = (id: MenuId) => () => setOpen((cur) => (cur === id ? null : id));

  const switchLocale = (next: Locale) => {
    setOpen(null);
    setMobileOpen(false);
    router.replace(pathname, { locale: next });
  };

  const trigger = (id: Exclude<MenuId, null>) =>
    `flex items-center gap-1.5 py-2.5 transition-colors hover:text-signal ${open === id ? "text-signal" : ""}`;

  return (
    <header
      className={`sticky top-0 z-30 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-hairline bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-paper"
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between lg:h-[84px]">
        <Link href="/" aria-label={t("home")} className="flex items-center text-ink">
          <HMark className="h-[24px] w-auto shrink-0" />
          {/* The word collapses into the H once you scroll */}
          <span
            aria-hidden={scrolled}
            className={`overflow-hidden whitespace-nowrap text-[15px] font-medium tracking-[0.22em] transition-[max-width,opacity,margin] duration-500 ease-out ${
              scrolled ? "ml-0 max-w-0 opacity-0" : "ml-3 max-w-[140px] opacity-100"
            }`}
          >
            HANTARI
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav ref={navRef} aria-label="Main" onClick={closeOnLink} className="hidden items-center gap-8 text-[15px] lg:flex">
          <div className="relative" onMouseEnter={hoverOpen("services")} onMouseLeave={hoverClose}>
            <button
              type="button"
              className={trigger("services")}
              aria-expanded={open === "services"}
              aria-controls="menu-services"
              onClick={toggle("services")}
            >
              {t("services")}
              <Chevron open={open === "services"} />
            </button>
            {open === "services" && (
              <div id="menu-services" className={`${panel} left-1/2 grid w-[min(780px,calc(100vw-32px))] -translate-x-1/2 grid-cols-3 overflow-hidden`}>
                <div className="col-span-2 flex flex-col gap-1 p-7 pb-6">
                  <p className="eyebrow px-3 pb-2.5 !text-[11px]">{t("whatWeDo")}</p>
                  {SERVICE_IDS.map((id, i) => (
                    <Link
                      key={id}
                      href={`/services/${id}`}
                      className="group flex gap-4 rounded-lg p-3 transition-colors hover:bg-[#F1EFE9]"
                    >
                      <span className="pt-1 font-mono text-[11px] text-graphite">0{i + 1}</span>
                      <span className="flex flex-col gap-0.5">
                        <span className="font-medium text-ink group-hover:text-signal">{ts(`${id}.name`)}</span>
                        <span className="text-[13px] text-graphite">{ts(`${id}.line`)}</span>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="relative flex flex-col gap-3.5 overflow-hidden bg-[#1A2446] p-7 pt-9 text-paper">
                  <MenuArt className="absolute inset-x-0 bottom-0 h-[170px] w-full" />
                  <p className="relative font-display text-2xl leading-tight">{t("notSure")}</p>
                  <p className="relative text-sm leading-relaxed text-[#C9CEDD]">{t("notSureText")}</p>
                  <Link href="/start" className="relative pt-1.5 text-sm font-medium text-paper hover:text-white hover:underline">
                    {t("start")} →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/#work" className="py-2.5 transition-colors hover:text-signal">
            {t("work")}
          </Link>

          <div className="relative" onMouseEnter={hoverOpen("studio")} onMouseLeave={hoverClose}>
            <button
              type="button"
              className={trigger("studio")}
              aria-expanded={open === "studio"}
              aria-controls="menu-studio"
              onClick={toggle("studio")}
            >
              {t("studio")}
              <Chevron open={open === "studio"} />
            </button>
            {open === "studio" && (
              <div id="menu-studio" className={`${panel} left-1/2 flex w-[320px] -translate-x-1/2 flex-col p-4`}>
                {[
                  { href: "/about", label: t("about"), line: t("aboutLine") },
                  { href: "/#approach", label: t("approach"), line: t("approachLine") },
                  { href: "/start", label: t("contact"), line: t("contactLine") },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex flex-col gap-0.5 rounded-lg p-3 transition-colors hover:bg-[#F1EFE9]"
                  >
                    <span className="font-medium group-hover:text-signal">{item.label}</span>
                    <span className="text-[13px] text-graphite">{item.line}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              className={`${trigger("lang")} text-sm`}
              aria-expanded={open === "lang"}
              aria-label={`${t("language")}: ${LANG_NAMES[locale]}`}
              onClick={toggle("lang")}
            >
              <Globe />
              <span className="uppercase">{locale}</span>
              <Chevron open={open === "lang"} />
            </button>
            {open === "lang" && (
              <div className={`${panel} -right-2 flex w-[180px] flex-col p-2`}>
                {routing.locales.map((l) => (
                  <button
                    key={l}
                    type="button"
                    lang={l}
                    onClick={() => switchLocale(l)}
                    className={`flex justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-[#F1EFE9] ${l === locale ? "bg-[#F1EFE9]" : ""}`}
                  >
                    {LANG_NAMES[l]}
                    {l === locale && <span aria-hidden>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/start"
            className="rounded-lg bg-ink px-[18px] py-[11px] text-sm font-medium text-paper transition-opacity hover:opacity-85"
          >
            {t("start")}
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
              <path d="M3 3L17 17M17 3L3 17" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          ) : (
            <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden>
              <path d="M0 1H22M0 7H22M0 13H22" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div onClick={closeOnLink} className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-paper lg:hidden">
          <div className="container-page flex flex-col gap-8 pb-12 pt-4">
            <div className="flex flex-col">
              <p className="eyebrow pb-2 !text-[11px]">{t("services")}</p>
              {SERVICE_IDS.map((id) => (
                <Link
                  key={id}
                  href={`/services/${id}`}
                  className="border-b border-hairline py-3.5 font-display text-[22px]"
                >
                  {ts(`${id}.name`)}
                </Link>
              ))}
            </div>
            <div className="flex flex-col">
              <p className="eyebrow pb-2 !text-[11px]">{t("studio")}</p>
              <Link href="/#work" className="border-b border-hairline py-3.5 text-lg">{t("work")}</Link>
              <Link href="/about" className="border-b border-hairline py-3.5 text-lg">{t("about")}</Link>
              <Link href="/#approach" className="border-b border-hairline py-3.5 text-lg">{t("approach")}</Link>
            </div>
            <div className="flex gap-2" role="group" aria-label={t("language")}>
              {routing.locales.map((l) => (
                <button
                  key={l}
                  type="button"
                  lang={l}
                  onClick={() => switchLocale(l)}
                  aria-pressed={l === locale}
                  className={`rounded-lg border px-4 py-2.5 text-sm ${l === locale ? "border-ink bg-ink text-paper" : "border-hairline"}`}
                >
                  {LANG_NAMES[l]}
                </button>
              ))}
            </div>
            <Link href="/start" className="rounded-lg bg-ink px-5 py-4 text-center font-medium text-paper">
              {t("start")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
