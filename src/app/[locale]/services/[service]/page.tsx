import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/Reveal";
import { NightArt } from "@/components/art/Art";
import { SERVICE_ART } from "@/components/art/serviceArt";
import { SERVICE_IDS, type ServiceId } from "@/lib/services";

type PageContent = {
  intro: string;
  process: { t: string; d: string }[];
  get: string[];
  fit: string[];
  tools: string[];
};

const isService = (s: string): s is ServiceId => (SERVICE_IDS as readonly string[]).includes(s);

export function generateStaticParams() {
  return SERVICE_IDS.map((service) => ({ service }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[service]">): Promise<Metadata> {
  const { locale, service } = await params;
  if (!isService(service)) return {};
  const t = await getTranslations({ locale, namespace: "services" });
  const page = t.raw(`${service}.page`) as PageContent;
  return {
    title: t(`${service}.name`),
    description: page.intro,
    alternates: { canonical: `/${locale}/services/${service}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[service]">) {
  const { locale, service } = await params;
  if (!isService(service)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "services" });
  const tp = await getTranslations({ locale, namespace: "servicePage" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const page = t.raw(`${service}.page`) as PageContent;
  const Art = SERVICE_ART[service];
  const i = SERVICE_IDS.indexOf(service);
  const prev = SERVICE_IDS[(i + SERVICE_IDS.length - 1) % SERVICE_IDS.length];
  const next = SERVICE_IDS[(i + 1) % SERVICE_IDS.length];

  return (
    <>
      {/* Intro */}
      <section className="container-page grid gap-10 pb-14 pt-10 md:pb-24 md:pt-20 lg:grid-cols-12 lg:items-center lg:gap-6">
        <div className="flex flex-col gap-6 lg:col-span-6">
          <Link href="/#services" className="eyebrow w-fit hover:text-ink">
            ← {tp("eyebrow")} · 0{i + 1}
          </Link>
          <h1 className="font-display text-[44px] leading-[1.02] tracking-[-0.015em] md:text-[72px]">{t(`${service}.name`)}</h1>
          <p className="max-w-[560px] font-display text-[20px] leading-[1.45] text-graphite md:text-[23px]">{page.intro}</p>
        </div>
        <Reveal className="relative h-[260px] overflow-hidden rounded-2xl md:h-[420px] md:rounded-[22px] lg:col-span-6">
          <Art />
        </Reveal>
      </section>

      {/* Process */}
      <section className="container-page">
        <div className="flex flex-col gap-10 border-t border-hairline pb-16 pt-14 md:gap-14 md:pb-24 md:pt-20">
          <h2 className="font-display text-[34px] leading-tight md:text-[48px]">{tp("processTitle")}</h2>
          <ol className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {page.process.map((step, n) => (
              <li key={step.t} className="flex flex-col gap-3 border-t border-ink pt-5">
                <span className="font-mono text-xs text-graphite">{String(n + 1).padStart(2, "0")}</span>
                <span className="text-xl font-medium">{step.t}</span>
                <span className="leading-relaxed text-graphite">{step.d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What you get + fit + tools */}
      <section className="container-page">
        <div className="grid gap-12 border-t border-hairline pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-6 lg:col-span-6">
            <h2 className="font-display text-[30px] md:text-[40px]">{tp("getTitle")}</h2>
            <ul className="flex flex-col border-t border-hairline">
              {page.get.map((g) => (
                <li key={g} className="flex gap-4 border-b border-hairline py-4 text-[17px] leading-snug">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden />
                  {g}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-12 lg:col-span-5 lg:col-start-8">
            <div className="flex flex-col gap-5">
              <h2 className="font-display text-[26px] md:text-[32px]">{tp("fitTitle")}</h2>
              <ul className="flex flex-col gap-2.5 text-[17px] text-graphite">
                {page.fit.map((f) => (
                  <li key={f}>— {f}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="eyebrow">{tp("toolsTitle")}</h2>
              <ul className="flex flex-wrap gap-2">
                {page.tools.map((x) => (
                  <li key={x} className="rounded-full border border-hairline bg-paper-raised px-3.5 py-1.5 font-mono text-[12px] text-graphite">
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* One call to action */}
      <section className="container-page pb-10">
        <div className="relative overflow-hidden rounded-2xl bg-night md:rounded-[22px]">
          <NightArt />
          <div className="relative flex flex-col gap-7 p-7 text-[#F7F3EA] md:flex-row md:items-end md:justify-between md:p-16">
            <div className="flex max-w-[620px] flex-col gap-4">
              <h2 className="font-display text-[32px] leading-[1.08] md:text-[48px]">{tp("ctaTitle")}</h2>
              <p className="text-[17px] leading-relaxed text-[#D3D8E8]">{tp("ctaText")}</p>
            </div>
            <Link
              href={{ pathname: "/start", query: { service } }}
              className="w-fit rounded-lg bg-[#F7F3EA] px-6 py-[15px] text-[15px] font-medium text-ink transition-opacity hover:opacity-90"
            >
              {tn("start")}
            </Link>
          </div>
        </div>
      </section>

      {/* Previous / next service */}
      <nav aria-label={tp("all")} className="container-page grid gap-4 pb-20 pt-6 sm:grid-cols-2 md:pb-[120px]">
        <Link href={`/services/${prev}`} className="group flex flex-col gap-1 rounded-xl border border-hairline p-5 hover:border-ink">
          <span className="eyebrow !text-[11px]">← {tp("prev")}</span>
          <span className="font-display text-2xl group-hover:text-signal">{t(`${prev}.name`)}</span>
        </Link>
        <Link href={`/services/${next}`} className="group flex flex-col gap-1 rounded-xl border border-hairline p-5 text-right hover:border-ink">
          <span className="eyebrow !text-[11px]">{tp("next")} →</span>
          <span className="font-display text-2xl group-hover:text-signal">{t(`${next}.name`)}</span>
        </Link>
      </nav>
    </>
  );
}
