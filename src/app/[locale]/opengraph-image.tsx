import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { routing } from "@/i18n/routing";

// Link preview image (WhatsApp, LinkedIn, Slack, iMessage, Facebook…), one per language.
export const alt = "Hantari — Software & AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const COPY = {
  ro: {
    title: "Digitalizăm afaceri, modernizăm software și dăm viață ideilor.",
    line: "Studio de software & AI · Timișoara",
  },
  en: {
    title: "We digitalise businesses, modernise software and bring ideas to life.",
    line: "Software & AI studio · Timișoara",
  },
} as const;

const H_PATH = "M0 492V85L99 0V330L394 75V492H295V272L99 443V492Z";

// The dusk scene from the home page, with the H standing in the sky.
const DUSK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 546" width="420" height="546">
<defs>
<linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#0B1122"/><stop offset="0.38" stop-color="#1B2A55"/><stop offset="0.62" stop-color="#3F5596"/>
<stop offset="0.8" stop-color="#C98458"/><stop offset="0.9" stop-color="#F0B774"/><stop offset="1" stop-color="#F6D6A2"/>
</linearGradient>
<radialGradient id="g" cx="0.5" cy="0.84" r="0.6">
<stop offset="0" stop-color="#FFD8A0" stop-opacity="0.75"/><stop offset="0.5" stop-color="#E7925A" stop-opacity="0.25"/><stop offset="1" stop-color="#E7925A" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="420" height="546" fill="url(#s)"/><rect width="420" height="546" fill="url(#g)"/>
<path transform="translate(137 120) scale(0.37)" fill="#F4F2ED" d="${H_PATH}"/>
<path d="M0 430L60 404L120 420L190 386L250 412L320 380L380 404L420 392V546H0Z" fill="#3A416E" opacity="0.75"/>
<path d="M0 470L70 440L140 462L210 428L280 458L350 432L420 456V546H0Z" fill="#20274A"/>
<path d="M0 512L90 482L170 500L260 474L340 502L420 484V546H0Z" fill="#0D1224"/>
</svg>`;

const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 394 492" width="34" height="42"><path fill="#191A1C" d="${H_PATH}"/></svg>`;

const svgSrc = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

async function font(pkg: string, file: string) {
  return readFile(join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const copy = COPY[locale === "ro" ? "ro" : "en"];

  const [serif, serifExt, sans, sansExt, mono, monoExt] = await Promise.all([
    font("newsreader", "newsreader-latin-400-normal.woff"),
    font("newsreader", "newsreader-latin-ext-400-normal.woff"),
    font("ibm-plex-sans", "ibm-plex-sans-latin-500-normal.woff"),
    font("ibm-plex-sans", "ibm-plex-sans-latin-ext-500-normal.woff"),
    font("ibm-plex-mono", "ibm-plex-mono-latin-400-normal.woff"),
    font("ibm-plex-mono", "ibm-plex-mono-latin-ext-400-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F4F2ED", padding: 42 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "22px 48px 18px 30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={svgSrc(MARK)} width={34} height={42} alt="" />
            <span style={{ fontFamily: "Plex, PlexExt", fontSize: 24, letterSpacing: 5.5, color: "#191A1C" }}>HANTARI</span>
          </div>
          <div style={{ display: "flex", fontFamily: "Newsreader, NewsreaderExt", fontSize: 60, lineHeight: 1.08, letterSpacing: -1, color: "#191A1C" }}>
            {copy.title}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Mono, MonoExt", fontSize: 21, color: "#5B5E63" }}>
            <span>{copy.line}</span>
            <span style={{ color: "#2E4FC4" }}>hantari.ro</span>
          </div>
        </div>
        <img src={svgSrc(DUSK)} width={420} height={546} alt="" style={{ borderRadius: 24 }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: serif, weight: 400, style: "normal" },
        { name: "NewsreaderExt", data: serifExt, weight: 400, style: "normal" },
        { name: "Plex", data: sans, weight: 500, style: "normal" },
        { name: "PlexExt", data: sansExt, weight: 500, style: "normal" },
        { name: "Mono", data: mono, weight: 400, style: "normal" },
        { name: "MonoExt", data: monoExt, weight: 400, style: "normal" },
      ],
    },
  );
}
