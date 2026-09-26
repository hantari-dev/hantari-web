import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/services";
import { HMark } from "./Logo";
import { SunriseScene } from "./art/Sunrise";
import { LANG_NAMES, routing } from "@/i18n/routing";

/** Temporary holding page, shown on every route while COMING_SOON=true. */
const CS = {
  en: { eyebrow: "Software & AI · From Timișoara, for anywhere", title: "Coming soon.", text: "A software & AI studio for businesses, organisations and people with an idea. Our new website is almost ready.", write: "Write to us", ethos: "Better than yesterday." },
  ro: { eyebrow: "Software & AI · Din Timișoara, pentru oriunde", title: "În curând.", text: "Un studio de software & AI pentru afaceri, organizații și oameni cu o idee. Site-ul nostru este aproape gata.", write: "Scrie-ne", ethos: "Mai bine decât ieri." },
  es: { eyebrow: "Software & IA · Desde Timișoara, para todo el mundo", title: "Muy pronto.", text: "Un estudio de software & IA para empresas, organizaciones y personas con una idea. Nuestro sitio web está casi listo.", write: "Escríbenos", ethos: "Mejor que ayer." },
} as const;

export function ComingSoon({ locale }: { locale: string }) {
  const c = CS[locale === "ro" || locale === "es" ? locale : "en"];
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <div className="container-page flex flex-1 flex-col justify-between gap-12 py-10 md:py-14">
        <div className="flex items-center gap-3">
          <HMark className="h-[26px] w-auto" />
          <span className="text-[15px] font-medium tracking-[0.22em]">HANTARI</span>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-7 lg:col-span-7">
            <p className="eyebrow">{c.eyebrow}</p>
            <h1 className="font-display text-[56px] leading-[0.98] tracking-[-0.02em] md:text-[96px]">{c.title}</h1>
            <p className="max-w-[540px] font-display text-[20px] leading-[1.45] text-graphite md:text-[23px]">{c.text}</p>
            <div className="flex flex-col gap-2">
              <span className="eyebrow !text-[11px]">{c.write}</span>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="w-fit border-b border-ink font-mono text-[17px] text-ink transition-colors hover:border-signal hover:text-signal md:text-lg"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <div className="relative h-[260px] overflow-hidden rounded-2xl bg-night md:h-[380px] lg:col-span-5">
            <SunriseScene />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-hairline pt-6 text-sm text-graphite sm:flex-row">
          <span className="flex items-center gap-2.5">
            <span className="h-0.5 w-[22px] bg-signal" aria-hidden />
            {c.ethos}
          </span>
          <span className="flex gap-4">
            {routing.locales.map((l) => (
              <Link key={l} href={`/${l}`} className={l === locale ? "text-ink" : "hover:text-ink"} lang={l}>
                {LANG_NAMES[l]}
              </Link>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
