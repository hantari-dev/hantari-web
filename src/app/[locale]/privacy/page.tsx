import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("privacyTitle"), alternates: { canonical: `/${locale}/privacy` } };
}

// Update this date whenever the policy text changes.
const UPDATED = "2026-09-24";

export default function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("privacy");
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(UPDATED));

  return (
    <section className="container-page grid gap-8 pb-24 pt-12 md:pt-[120px] lg:grid-cols-3 lg:gap-12">
      <p className="eyebrow lg:pt-4">{t("eyebrow")}</p>
      <div className="flex max-w-[720px] flex-col gap-10 lg:col-span-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-[42px] leading-[1.05] md:text-6xl">{t("title")}</h1>
          <p className="text-sm text-graphite">{t("updated", { date })}</p>
          <p className="rounded-lg border border-hairline bg-stone px-4 py-3 text-sm text-graphite">{t("draftNote")}</p>
        </div>
        {([1, 2, 3, 4, 5, 6] as const).map((n) => (
          <div key={n} className="flex flex-col gap-2.5 border-t border-hairline pt-6">
            <h2 className="text-xl font-medium">{t(`s${n}Title`)}</h2>
            <p className="leading-relaxed text-graphite">{t(`s${n}Text`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
