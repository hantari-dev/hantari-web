import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { CaveArt } from "@/components/art/Art";
import { CONTACT_EMAIL } from "@/lib/services";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("aboutTitle"), alternates: { canonical: `/${locale}/about` } };
}

export default function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("about");

  const facts = [
    { k: t("basedIn"), v: t("basedInValue") },
    { k: t("email"), v: <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-signal">{CONTACT_EMAIL}</a> },
    { k: t("languages"), v: t("languagesValue") },
    { k: t("response"), v: t("responseValue") },
  ];

  return (
    <>
      <section className="container-page grid gap-6 pb-12 pt-12 md:pb-24 md:pt-[140px] lg:grid-cols-3 lg:gap-12">
        <p className="eyebrow lg:pt-5">{t("eyebrow")}</p>
        <div className="flex flex-col gap-8 lg:col-span-2 lg:gap-9">
          <h1 className="font-display text-[46px] leading-[1.02] tracking-[-0.015em] md:text-[76px]">{t("title")}</h1>
          <p className="max-w-[720px] text-lg leading-relaxed text-graphite md:text-xl">{t("intro")}</p>
        </div>
      </section>

      <section className="container-page pb-16 md:pb-[120px]">
        <div className="relative h-[320px] overflow-hidden rounded-2xl md:h-[520px] md:rounded-[22px]">
          <CaveArt idPrefix="about-cave" />
          <p className="absolute bottom-7 left-6 max-w-[560px] font-display text-[28px] leading-[1.1] text-[#F7F3EA] md:bottom-12 md:left-14 md:text-[40px]">
            {t("imageLine")}
          </p>
        </div>
      </section>

      <section className="container-page">
        <div className="grid gap-8 border-t border-hairline pb-16 pt-14 md:pb-[120px] md:pt-[110px] lg:grid-cols-3 lg:gap-12">
          <p className="eyebrow">{t("howEyebrow")}</p>
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14 lg:col-span-2">
            {([1, 2, 3, 4] as const).map((n) => (
              <div key={n} className="flex flex-col gap-2.5">
                <span className="font-display text-[26px] md:text-[30px]">{t(`p${n}Title`)}</span>
                <span className="leading-relaxed text-graphite">{t(`p${n}Text`)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page">
        <div className="grid gap-8 border-t border-hairline pb-16 pt-14 md:pb-[120px] md:pt-[110px] lg:grid-cols-3 lg:gap-12">
          <p className="eyebrow">{t("studioEyebrow")}</p>
          <dl className="flex flex-col border-t border-ink lg:col-span-2">
            {facts.map((f) => (
              <div key={f.k} className="grid gap-1 border-b border-hairline py-5 sm:grid-cols-[220px_1fr]">
                <dt className="text-graphite">{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
