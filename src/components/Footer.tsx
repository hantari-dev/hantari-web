import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SERVICE_IDS, CONTACT_EMAIL } from "@/lib/services";
import { Wordmark } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const ts = useTranslations("services");
  const year = new Date().getFullYear();

  return (
    <footer className="container-page">
      <div className="flex flex-col gap-12 border-t border-hairline pb-12 pt-14">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="flex flex-col gap-3.5">
            <Wordmark small />
            <span className="text-sm text-graphite">{t("tagline")}</span>
            <span className="flex items-center gap-2.5 pt-2 text-sm text-graphite">
              <span className="h-0.5 w-[22px] bg-signal" aria-hidden />
              {t("ethos")}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3 sm:gap-24">
            <div className="flex flex-col gap-2.5">
              <span className="eyebrow pb-1 !text-[11px]">{t("services")}</span>
              {SERVICE_IDS.map((id) => (
                <Link key={id} href={`/services/${id}`} className="hover:text-signal">
                  {ts(`${id}.name`)}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="eyebrow pb-1 !text-[11px]">{t("studio")}</span>
              <Link href="/#work" className="hover:text-signal">{tn("work")}</Link>
              <Link href="/#approach" className="hover:text-signal">{tn("approach")}</Link>
              <Link href="/about" className="hover:text-signal">{tn("about")}</Link>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="eyebrow pb-1 !text-[11px]">{t("contact")}</span>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-signal">{CONTACT_EMAIL}</a>
              <Link href="/start" className="hover:text-signal">{tn("start")}</Link>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-6 border-t border-hairline pt-6 text-[13px] text-graphite">
          {/* Add the legal entity (name · CUI · Reg. Com.) here once the company is registered. */}
          <span>{t("rights", { year })}</span>
          <Link href="/privacy" className="hover:text-ink">{t("privacy")}</Link>
        </div>
      </div>
    </footer>
  );
}
