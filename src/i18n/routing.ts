import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ro", "es"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];

/** Each language's own name, as shown in language pickers. */
export const LANG_NAMES: Record<Locale, string> = { en: "English", ro: "Română", es: "Español" };

export const isLocale = (v: unknown): v is Locale => routing.locales.includes(v as Locale);
