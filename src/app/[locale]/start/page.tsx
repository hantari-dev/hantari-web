import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SmallDuskArt } from "@/components/art/Art";
import { CONTACT_EMAIL, FORM_OPTIONS, type FormOption } from "@/lib/services";
import { StartForm } from "./StartForm";

export async function generateMetadata({ params }: PageProps<"/[locale]/start">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t("startTitle"), alternates: { canonical: `/${locale}/start` } };
}

export default async function StartPage({ params, searchParams }: PageProps<"/[locale]/start">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "start" });

  // Links like /start?service=automation preselect that option.
  const sp = await searchParams;
  const requested = Array.isArray(sp.service) ? sp.service : sp.service ? [sp.service] : [];
  const initial = requested.filter((s): s is FormOption => (FORM_OPTIONS as readonly string[]).includes(s));

  return (
    <div className="container-page grid gap-10 pb-20 pt-10 md:pt-20 lg:grid-cols-12 lg:gap-6 lg:pb-[120px]">
      <aside className="flex flex-col gap-10 lg:col-span-4">
        <div className="flex flex-col gap-[18px]">
          <p className="eyebrow">{t("eyebrow")}</p>
          <h1 className="font-display text-[42px] leading-[1.02] tracking-[-0.015em] md:text-[56px]">{t("title")}</h1>
          <p className="text-[17px] leading-relaxed text-graphite">{t("intro")}</p>
        </div>
        <div className="relative hidden h-[220px] overflow-hidden rounded-2xl lg:block">
          <SmallDuskArt />
        </div>
        <div className="hidden flex-col border-t border-hairline lg:flex">
          <p className="eyebrow pb-1.5 pt-5 !text-[11px]">{t("nextTitle")}</p>
          {([1, 2, 3] as const).map((n) => (
            <div key={n} className="grid grid-cols-[36px_1fr] py-3 text-[15px] leading-normal">
              <span className="pt-[3px] font-mono text-xs text-graphite">0{n}</span>
              <span>{t(`next${n}`)}</span>
            </div>
          ))}
        </div>
        <p className="hidden text-sm text-graphite lg:block">
          {t("preferEmail")}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="border-b border-ink text-ink">
            {CONTACT_EMAIL}
          </a>
        </p>
      </aside>

      <section className="self-start rounded-[20px] border border-hairline bg-paper-raised px-5 py-8 sm:px-10 sm:py-12 lg:col-span-7 lg:col-start-6 lg:px-14">
        <StartForm initial={initial} />
      </section>

      {/* On small screens the "what happens next" list sits under the form */}
      <div className="flex flex-col border-t border-hairline lg:hidden">
        <p className="eyebrow pb-1.5 pt-5 !text-[11px]">{t("nextTitle")}</p>
        {([1, 2, 3] as const).map((n) => (
          <div key={n} className="grid grid-cols-[36px_1fr] py-3 text-[15px] leading-normal">
            <span className="pt-[3px] font-mono text-xs text-graphite">0{n}</span>
            <span>{t(`next${n}`)}</span>
          </div>
        ))}
        <p className="pt-4 text-sm text-graphite">
          {t("preferEmail")}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="border-b border-ink text-ink">{CONTACT_EMAIL}</a>
        </p>
      </div>
    </div>
  );
}
