import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="container-page flex flex-col items-start gap-6 py-24 md:py-40">
      <p className="eyebrow">404</p>
      <h1 className="max-w-[760px] font-display text-[42px] leading-[1.05] md:text-7xl">{t("title")}</h1>
      <p className="text-lg text-graphite">{t("text")}</p>
      <Link href="/" className="rounded-lg bg-ink px-6 py-3.5 font-medium text-paper">{t("home")}</Link>
    </section>
  );
}
