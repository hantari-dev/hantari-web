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
const UPDATED = "2026-09-25";

type Section = { title: string; p?: string[]; items?: string[]; p2?: string[] };

export default function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("privacy");
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(UPDATED));
  const sections = t.raw("sections") as Section[];

  return (
    <section className="container-page grid gap-8 pb-24 pt-12 md:pt-[120px] lg:grid-cols-3 lg:gap-12">
      <p className="eyebrow lg:pt-4">{t("eyebrow")}</p>
      <div className="flex max-w-[720px] flex-col gap-10 lg:col-span-2">
        <div className="flex flex-col gap-4">
          <h1 className="font-display text-[42px] leading-[1.05] md:text-6xl">{t("title")}</h1>
          <p className="text-sm text-graphite">{t("updated", { date })}</p>
          <p className="rounded-lg border border-hairline bg-stone px-4 py-3 text-sm text-graphite">{t("draftNote")}</p>
        </div>
        {sections.map((s) => (
          <div key={s.title} className="flex flex-col gap-3 border-t border-hairline pt-6 leading-relaxed text-graphite">
            <h2 className="text-xl font-medium text-ink">{s.title}</h2>
            {s.p?.map((x) => <p key={x}>{x}</p>)}
            {s.items && (
              <ul className="flex list-disc flex-col gap-1.5 pl-5 marker:text-hairline">
                {s.items.map((x) => <li key={x}>{x}</li>)}
              </ul>
            )}
            {s.p2?.map((x) => <p key={x}>{x}</p>)}
          </div>
        ))}
      </div>
    </section>
  );
}
