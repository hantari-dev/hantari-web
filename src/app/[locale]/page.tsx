import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { Link } from "@/i18n/navigation";
import { CONTACT_EMAIL, type ServiceId } from "@/lib/services";
import { Reveal } from "@/components/Reveal";
import {
  BridgeArt,
  CityArt,
  DuskArt,
  LactaArt,
  LoopArt,
  NightArt,
  StrataArt,
  SunriseArt,
} from "@/components/art/Art";

const underline =
  "underline decoration-[3px] underline-offset-[10px] transition-colors hover:text-signal max-md:decoration-2 max-md:underline-offset-[6px]";

const SERVICE_CARDS: { id: ServiceId; Art: React.ComponentType; big: boolean }[] = [
  { id: "apps", Art: CityArt, big: true },
  { id: "automation", Art: StrataArt, big: true },
  { id: "ai", Art: LoopArt, big: false },
  { id: "integrations", Art: BridgeArt, big: false },
  { id: "modernisation", Art: SunriseArt, big: false },
];

export default function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("home");
  const tn = useTranslations("nav");
  const ts = useTranslations("services");

  return (
    <>
      {/* Hero */}
      <section className="container-page grid gap-8 pb-12 pt-12 md:pt-20 lg:grid-cols-12 lg:items-end lg:gap-6 lg:pb-[72px] lg:pt-[120px]">
        <h1 className="font-display text-[46px] leading-[1.02] tracking-[-0.015em] md:text-7xl lg:col-span-7 lg:text-[72px] lg:leading-[1.02] lg:tracking-[-0.02em]">
          {t.rich("title", {
            services: (chunks) => (
              <Link href="/#services" className={underline}>
                {chunks}
              </Link>
            ),
            start: (chunks) => (
              <Link href="/start" className={underline}>
                {chunks}
              </Link>
            ),
          })}
        </h1>
        <div className="flex flex-col gap-7 lg:col-span-4 lg:col-start-9 lg:pb-2">
          <p className="font-display text-[19px] leading-[1.45] md:text-[23px] md:leading-[1.4]">{t("intro")}</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/start" className="rounded-lg bg-ink px-[22px] py-3.5 text-[15px] font-medium text-paper transition-opacity hover:opacity-85">
              {tn("start")}
            </Link>
            <Link href="/#services" className="rounded-lg border border-[#C9C4B8] px-[22px] py-[13px] text-[15px] transition-colors hover:border-ink">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* Feature image */}
      <section className="container-page pb-16 md:pb-[150px]">
        <div className="relative h-[420px] overflow-hidden rounded-2xl bg-night md:h-[620px] md:rounded-[22px]">
          <DuskArt />
          <div className="absolute inset-0 flex flex-col items-center justify-start gap-5 px-6 pt-10 text-center text-[#F7F3EA] md:justify-center md:pb-[90px] md:pt-0">
            <p className="eyebrow !text-[#D9DDEA]">{t("featureEyebrow")}</p>
            <p className="max-w-[820px] font-display text-[34px] leading-[1.06] md:text-[64px] md:leading-[1.04]">
              {t("featureTitle")}
            </p>
            <Link href="/#approach" className="hidden rounded-lg bg-[#F7F3EA] px-[18px] py-[11px] text-sm font-medium text-ink transition-opacity hover:opacity-90 md:inline-block">
              {t("featureCta")} →
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container-page flex scroll-mt-6 flex-col gap-10 pb-16 md:gap-12 md:pb-[150px]">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="flex flex-col gap-3.5">
            <p className="eyebrow">{t("servicesEyebrow")}</p>
            <h2 className="font-display text-4xl leading-[1.05] md:text-[56px] md:leading-[1.02]">{t("servicesTitle")}</h2>
          </div>
          <p className="max-w-[420px] text-[17px] leading-relaxed text-graphite">{t("servicesIntro")}</p>
        </div>
        <div className="grid gap-10 md:grid-cols-6 md:gap-6">
          {SERVICE_CARDS.map(({ id, Art, big }, i) => (
            <Link
              key={id}
              href={{ pathname: "/start", query: { service: id } }}
              className={`group flex flex-col gap-4 md:gap-5 ${big ? "md:col-span-3" : "md:col-span-2"}`}
            >
              <Reveal className={`relative overflow-hidden rounded-2xl ${big ? "h-[220px] md:h-[320px]" : "h-[220px] md:h-[250px]"}`}>
                <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.03]">
                  <Art />
                </div>
              </Reveal>
              <div className="flex items-baseline justify-between gap-6">
                <span className={`font-display group-hover:text-signal ${big ? "text-[26px] md:text-[32px]" : "text-[26px] md:text-[28px]"}`}>
                  {ts(`${id}.name`)}
                </span>
                <span className="font-mono text-xs text-graphite">0{i + 1}</span>
              </div>
              <span className="-mt-2 text-[15px] leading-relaxed text-graphite md:text-base">{ts(`${id}.long`)}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="container-page scroll-mt-6">
        <div className="flex flex-col gap-10 border-t border-hairline pb-16 pt-14 md:pb-[150px] md:pt-[110px]">
          <h2 className="font-display text-4xl md:text-[56px]">{t("workTitle")}</h2>
          <a href="https://lacta.ro" target="_blank" rel="noopener" className="group grid items-center gap-6 lg:grid-cols-12">
            <div className="relative h-[240px] overflow-hidden rounded-[18px] md:h-[420px] lg:col-span-7">
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                <LactaArt />
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-4 lg:col-start-9">
              <span className="eyebrow">{t("lactaEyebrow")}</span>
              <span className="font-display text-[32px] leading-[1.05] md:text-[44px]">Lacta</span>
              <span className="text-[17px] leading-relaxed text-graphite">{t("lactaText")}</span>
              <span className="pt-1.5 text-[15px] font-medium group-hover:text-signal">{t("lactaCta")} ↗</span>
            </div>
          </a>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="container-page scroll-mt-6">
        <div className="flex flex-col gap-12 border-t border-hairline pb-16 pt-14 md:gap-16 md:pb-[150px] md:pt-[110px]">
          <div className="flex flex-col gap-5">
            <p className="eyebrow">{t("approachEyebrow")}</p>
            <h2 className="max-w-[1080px] font-display text-[30px] leading-[1.15] md:text-[46px] md:leading-[1.12]">{t("approachTitle")}</h2>
          </div>
          <div className="grid gap-10 md:grid-cols-3 md:gap-12">
            {([1, 2, 3] as const).map((n) => (
              <div key={n} className="flex flex-col gap-3 border-t border-ink pt-6">
                <span className="font-mono text-xs uppercase text-graphite">{t(`step${n}Label`)}</span>
                <span className="text-xl font-medium">{t(`step${n}Title`)}</span>
                <span className="leading-relaxed text-graphite">{t(`step${n}Text`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section id="contact" className="container-page pb-16 md:pb-[120px]">
        <div className="relative overflow-hidden rounded-2xl bg-night md:h-[460px] md:rounded-[22px]">
          <NightArt />
          <div className="relative flex h-full flex-col justify-between gap-8 p-7 text-[#F7F3EA] md:flex-row md:items-end md:p-20">
            <div className="flex max-w-[660px] flex-col gap-5">
              <h2 className="font-display text-[34px] leading-[1.06] md:text-6xl md:leading-[1.04]">{t("ctaTitle")}</h2>
              <p className="text-[17px] leading-relaxed text-[#D3D8E8]">{t("ctaText")}</p>
            </div>
            <div className="flex flex-col gap-3.5 md:items-end">
              <Link href="/start" className="rounded-lg bg-[#F7F3EA] px-6 py-[15px] text-center text-[15px] font-medium text-ink transition-opacity hover:opacity-90">
                {tn("start")}
              </Link>
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-center font-mono text-[13px] text-[#D3D8E8] hover:text-white">
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
