import type { Metadata, Viewport } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DemoDeck } from "./DemoDeck";

/** Tablet showcase for in-person meetings. Not linked anywhere, not indexed. */
export async function generateMetadata({ params }: PageProps<"/[locale]/demo">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "demo" });
  return {
    title: { absolute: t("metaTitle") },
    robots: { index: false, follow: false },
    manifest: "/demo.webmanifest",
    alternates: { canonical: `/${locale}/demo`, languages: {} },
  };
}

export const viewport: Viewport = { themeColor: "#0B1122" };

export default async function DemoPage({ params }: PageProps<"/[locale]/demo">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <DemoDeck />;
}
