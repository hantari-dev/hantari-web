"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { CONTACT_EMAIL, SERVICE_IDS } from "@/lib/services";
import { HMark } from "@/components/Logo";
import { DuskArt, LactaArt, NightArt, PflegeArt } from "@/components/art/Art";
import { SERVICE_ART } from "@/components/art/serviceArt";

type Idea = { id: string; label: string; items: { t: string; d: string }[] };

const pad = "px-[clamp(24px,6vw,96px)] pt-[clamp(28px,8vh,88px)] pb-[clamp(96px,14vh,128px)]";
const pill = "rounded-full bg-[#0B1122]/75 text-[#F4F2ED] backdrop-blur-md";

// Full-screen state, kept in sync with the browser
function subscribeFs(cb: () => void) {
  document.addEventListener("fullscreenchange", cb);
  return () => document.removeEventListener("fullscreenchange", cb);
}
const getFs = () => Boolean(document.fullscreenElement);
const getFsServer = () => false;

export function DemoDeck() {
  const t = useTranslations("demo");
  const deckRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);
  const isFs = useSyncExternalStore(subscribeFs, getFs, getFsServer);

  // Remember which slides were shown, so each illustration animates once on arrival
  if (!seen.includes(index)) setSeen([...seen, index]);

  const slides = [
    <Intro key="intro" />,
    <Services key="services" />,
    <How key="how" />,
    <Project key="lacta" id="lacta" name="Lacta" url="https://lacta.ro" clip="/demo/lacta" Art={LactaArt} active={index === 3} />,
    <Project key="pflege" id="pflege" name="Pflege mit Kopf und Herz" url="https://pflegemitkopfundherz.at" clip="/demo/pflege" Art={PflegeArt} active={index === 4} />,
    <Ideas key="ideas" />,
    <Close key="close" />,
  ];
  const last = slides.length - 1;

  const go = (i: number) => {
    const el = deckRef.current;
    if (!el) return;
    const target = Math.max(0, Math.min(last, i));
    el.scrollTo({ left: target * el.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = deckRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    if (i !== indexRef.current) {
      indexRef.current = i;
      setIndex(i);
    }
  };

  // Keyboard arrows (handy with a keyboard case or when presenting from a laptop),
  // and keep the current slide in place when the screen rotates or resizes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(e.key)) go(indexRef.current + 1);
      if (["ArrowLeft", "PageUp"].includes(e.key)) go(indexRef.current - 1);
    };
    const onResize = () => {
      const el = deckRef.current;
      if (el) el.scrollLeft = indexRef.current * el.clientWidth;
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFs = () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  };

  return (
    <div className="fixed inset-0 z-40 bg-night">
      <div
        ref={deckRef}
        onScroll={onScroll}
        className="flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden overscroll-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((s, i) => (
          <section
            key={i}
            data-inview={seen.includes(i) ? "" : undefined}
            aria-hidden={i !== index}
            className="relative h-[100dvh] w-screen shrink-0 snap-start overflow-y-auto overflow-x-hidden"
          >
            {s}
          </section>
        ))}
      </div>

      {/* Top right: language + full screen */}
      <div className={`fixed right-4 top-4 z-50 flex items-center gap-1 px-2 py-1.5 text-[13px] ${pill}`}>
        {routing.locales.map((l) => (
          <LangLink key={l} l={l} />
        ))}
        <span className="mx-1 h-4 w-px bg-white/25" aria-hidden />
        <button type="button" onClick={toggleFs} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/10" aria-label={isFs ? t("exitFullscreen") : t("fullscreen")}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.4">
            {isFs ? <path d="M6 1v5H1M10 1v5h5M6 15v-5H1M10 15v-5h5" /> : <path d="M1 6V1h5M15 6V1h-5M1 10v5h5M15 10v5h-5" />}
          </svg>
        </button>
      </div>

      {/* Bottom: previous · dots · next */}
      <nav className={`fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 px-2 py-1.5 ${pill}`} aria-label="Slides">
        <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label={t("prev")} className="flex h-11 w-11 items-center justify-center rounded-full text-xl hover:bg-white/10 disabled:opacity-30">
          ←
        </button>
        <div className="flex items-center gap-2 px-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`${i + 1} / ${slides.length}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === index ? "w-7 bg-[#F6D6A2]" : "w-2.5 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
        <button type="button" onClick={() => go(index + 1)} disabled={index === last} aria-label={t("next")} className="flex h-11 w-11 items-center justify-center rounded-full text-xl hover:bg-white/10 disabled:opacity-30">
          →
        </button>
      </nav>
    </div>
  );
}

function LangLink({ l }: { l: string }) {
  const locale = useLocale();
  return (
    <Link href="/demo" locale={l} className={`rounded-full px-2.5 py-1.5 font-mono uppercase ${l === locale ? "bg-white/15 text-white" : "text-white/60 hover:text-white"}`}>
      {l}
    </Link>
  );
}

/* ── 1 · Intro ─────────────────────────────────────────── */
function Intro() {
  const t = useTranslations("demo");
  return (
    <div className="relative h-full">
      <DuskArt />
      <div className={`relative flex h-full flex-col justify-between text-[#F4F2ED] ${pad}`}>
        <div className="flex items-center gap-3">
          <HMark className="h-[28px] w-auto" />
          <span className="text-[16px] font-medium tracking-[0.24em]">HANTARI</span>
        </div>
        <div className="flex max-w-[880px] flex-col gap-6">
          <p className="eyebrow !text-[#D9DDEA]">{t("introEyebrow")}</p>
          <h1 className="font-display text-[clamp(44px,7vw,96px)] leading-[1.02] tracking-[-0.015em]">{t("introTitle")}</h1>
          <p className="max-w-[640px] text-[clamp(18px,2vw,24px)] leading-relaxed text-[#D9DDEA]">{t("introText")}</p>
        </div>
        <p className="flex items-center gap-3 self-end font-mono text-sm uppercase tracking-[0.2em] text-[#F6D6A2]">
          {t("swipe")} <span className="demo-nudge text-lg">→</span>
        </p>
      </div>
    </div>
  );
}

/* ── 2 · Services ──────────────────────────────────────── */
function Services() {
  const t = useTranslations("demo");
  const ts = useTranslations("services");
  return (
    <div className={`flex h-full flex-col justify-center gap-[clamp(20px,5vh,48px)] bg-paper text-ink ${pad}`}>
      <div className="flex flex-col gap-3">
        <p className="eyebrow">{t("servicesEyebrow")}</p>
        <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-[1.04]">{t("servicesTitle")}</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-5">
        {SERVICE_IDS.map((id, i) => {
          const Art = SERVICE_ART[id];
          return (
            <div key={id} className="flex flex-col gap-3">
              <div className="relative h-[clamp(110px,24vh,220px)] overflow-hidden rounded-2xl">
                <Art />
              </div>
              <span className="font-mono text-xs text-graphite">0{i + 1}</span>
              <span className="-mt-1.5 font-display text-[clamp(20px,2vw,26px)] leading-tight">{ts(`${id}.name`)}</span>
              <span className="text-[15px] leading-snug text-graphite">{ts(`${id}.line`)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── 3 · How we work ───────────────────────────────────── */
function How() {
  const t = useTranslations("demo");
  const th = useTranslations("home");
  return (
    <div className={`flex h-full flex-col justify-center gap-[clamp(28px,7vh,72px)] bg-paper text-ink ${pad}`}>
      <div className="flex flex-col gap-3">
        <p className="eyebrow">{t("howEyebrow")}</p>
        <h2 className="max-w-[900px] font-display text-[clamp(36px,5vw,64px)] leading-[1.04]">{t("howTitle")}</h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3 md:gap-12">
        {([1, 2, 3] as const).map((n) => (
          <div key={n} className="flex flex-col gap-3 border-t-2 border-ink pt-6">
            <span className="font-mono text-sm uppercase text-graphite">{th(`step${n}Label`)}</span>
            <span className="font-display text-[clamp(24px,2.6vw,34px)] leading-tight">{th(`step${n}Title`)}</span>
            <span className="text-[clamp(16px,1.5vw,19px)] leading-relaxed text-graphite">{th(`step${n}Text`)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 4–5 · Projects ────────────────────────────────────── */
function Project({
  id,
  name,
  url,
  clip,
  Art,
  active,
}: {
  id: "lacta" | "pflege";
  name: string;
  url: string;
  clip: string;
  Art: React.ComponentType;
  active: boolean;
}) {
  const t = useTranslations("demo");
  const points = t.raw(`${id}.points`) as string[];
  return (
    <div className={`grid h-full items-center gap-8 bg-paper text-ink md:grid-cols-12 md:gap-10 ${pad}`}>
      <div className="md:col-span-7">
        <ProjectMedia clip={clip} Art={Art} active={active} />
      </div>
      <div className="flex flex-col gap-5 md:col-span-5">
        <p className="eyebrow">
          {t("projectEyebrow")} · {t(`${id}.tag`)}
        </p>
        <h2 className="font-display text-[clamp(36px,4.4vw,60px)] leading-[1.02]">{name}</h2>
        <p className="text-[clamp(17px,1.6vw,20px)] leading-relaxed text-graphite">{t(`${id}.lead`)}</p>
        <ul className="flex flex-col gap-3">
          {points.map((p) => (
            <li key={p} className="flex gap-3 text-[clamp(15px,1.4vw,18px)] leading-snug">
              <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal text-[11px] text-white" aria-hidden>
                ✓
              </span>
              {p}
            </li>
          ))}
        </ul>
        <a
          href={url}
          target="_blank"
          rel="noopener"
          className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-ink px-7 py-4 text-[17px] font-medium text-paper transition-opacity hover:opacity-90"
        >
          {t("tryLive")} ↗
        </a>
      </div>
    </div>
  );
}

/**
 * The project's screen recording (public/demo/<name>.mp4, or .webm) over its illustration.
 * Until a clip exists, or if it can't load, the illustration simply stays visible.
 * The clip only plays while its slide is on screen.
 */
function ProjectMedia({ clip, Art, active }: { clip: string; Art: React.ComponentType; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || !ready) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active, ready]);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[22px] bg-stone shadow-[0_24px_60px_rgba(11,17,34,0.18)]">
      <Art />
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={() => setReady(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <source src={`${clip}.mp4`} type="video/mp4" />
        <source src={`${clip}.webm`} type="video/webm" />
      </video>
    </div>
  );
}

/* ── 6 · Ideas for their business ──────────────────────── */
function Ideas() {
  const t = useTranslations("demo");
  const ideas = t.raw("ideas") as Idea[];
  const [pick, setPick] = useState(ideas[0].id);
  const current = ideas.find((i) => i.id === pick) ?? ideas[0];
  return (
    <div className={`flex h-full flex-col justify-center gap-[clamp(20px,5vh,44px)] bg-paper text-ink ${pad}`}>
      <div className="flex flex-col gap-3">
        <p className="eyebrow">{t("ideasEyebrow")}</p>
        <h2 className="font-display text-[clamp(36px,5vw,64px)] leading-[1.04]">{t("ideasTitle")}</h2>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="mr-1 text-[15px] text-graphite">{t("ideasHint")}</span>
        {ideas.map((i) => (
          <button
            key={i.id}
            type="button"
            onClick={() => setPick(i.id)}
            aria-pressed={i.id === pick}
            className={`rounded-full border px-5 py-3 text-[16px] transition-colors ${i.id === pick ? "border-ink bg-ink text-paper" : "border-[#C9C4B8] hover:border-ink"}`}
          >
            {i.label}
          </button>
        ))}
      </div>
      <div key={current.id} className="menu-preview grid gap-4 md:grid-cols-3 md:gap-5">
        {current.items.map((item, n) => (
          <div key={item.t} className="flex flex-col gap-3 rounded-2xl border border-hairline bg-paper-raised p-6 md:p-7">
            <span className="font-mono text-xs text-signal">0{n + 1}</span>
            <span className="font-display text-[clamp(22px,2.2vw,28px)] leading-tight">{item.t}</span>
            <span className="text-[clamp(15px,1.4vw,17px)] leading-relaxed text-graphite">{item.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 7 · Close ─────────────────────────────────────────── */
function Close() {
  const t = useTranslations("demo");
  const locale = useLocale();
  return (
    <div className="relative h-full">
      <NightArt />
      <div className={`relative grid h-full items-center gap-10 text-[#F4F2ED] md:grid-cols-12 ${pad}`}>
        <div className="flex flex-col gap-6 md:col-span-7">
          <p className="eyebrow !text-[#D9DDEA]">{t("closeEyebrow")}</p>
          <h2 className="font-display text-[clamp(40px,5.6vw,76px)] leading-[1.02]">{t("closeTitle")}</h2>
          <p className="max-w-[560px] text-[clamp(17px,1.7vw,21px)] leading-relaxed text-[#D3D8E8]">{t("closeText")}</p>
          <Link href="/start" className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-[#F4F2ED] px-7 py-4 text-[17px] font-medium text-ink transition-opacity hover:opacity-90">
            {t("fillNow")} →
          </Link>
          <p className="text-[15px] text-[#C9CEDD]">
            {t("orEmail")} <span className="font-mono text-[#F4F2ED]">{CONTACT_EMAIL}</span>
          </p>
        </div>
        <div className="flex justify-center md:col-span-5 md:justify-end">
          <figure className="flex w-[clamp(220px,26vw,320px)] flex-col items-center gap-4 rounded-[22px] bg-[#FBFAF7] p-6 text-ink shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/demo/qr-${locale}.svg`} alt={`hantari.ro/${locale}/start`} className="aspect-square w-full" />
            <figcaption className="text-center text-[15px] font-medium leading-snug">{t("scan")}</figcaption>
            <span className="font-mono text-xs text-graphite">hantari.ro/{locale}/start</span>
          </figure>
        </div>
      </div>
    </div>
  );
}
