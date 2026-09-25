import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ComingSoon } from "@/components/ComingSoon";

/** Set COMING_SOON=true (e.g. in Vercel) to show only the holding page. Redeploy after changing it. */
const COMING_SOON = process.env.COMING_SOON === "true";

import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/500.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-mono/400.css";
import "../globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://hantari.ro";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    // Stop iOS/Safari from turning random words, numbers and addresses into links
    formatDetection: { email: false, address: false, telephone: false },
    title: { default: t("title"), template: `%s · Hantari` },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ro: "/ro" },
    },
    openGraph: {
      type: "website",
      siteName: "Hantari",
      title: t("title"),
      description: t("description"),
      locale: locale === "ro" ? "ro_RO" : "en_GB",
    },
    twitter: { card: "summary_large_image" },
    ...(COMING_SOON && { robots: { index: false, follow: false } }),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col bg-paper text-ink antialiased">
        {COMING_SOON ? (
          <ComingSoon locale={locale} />
        ) : (
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
          >
            {t("skip")}
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
        )}
      </body>
    </html>
  );
}
