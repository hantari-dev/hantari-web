/**
 * The Hantari mark: an H drawn as a bridge between two banks — business (left, ink) and
 * AI (right, blue) — joined by a span that carries one colour into the other.
 *
 * One continuous shape on a 66 × 76 grid: straight pillars (crisp at every size), softly
 * rounded outer corners and curved joints where the span meets the pillars, filled with a
 * single gradient (no seams). The OG image and icon generators use the same path.
 *
 * tone: "duo" (ink → blue, for light backgrounds), "duo-dark" (cream → light blue, for dark
 * backgrounds) or "mono" (one colour, follows the text colour).
 */
export const BRIDGE_VIEWBOX = "0 0 66 76";
export const BRIDGE_PATH =
  "M3 0H12C13.657 0 15 1.343 15 3V28C15 30.21 16.79 32 19 32H47C49.21 32 51 30.21 51 28V3C51 1.343 52.343 0 54 0H63C64.657 0 66 1.343 66 3V73C66 74.657 64.657 76 63 76H54C52.343 76 51 74.657 51 73V48C51 45.79 49.21 44 47 44H19C16.79 44 15 45.79 15 48V73C15 74.657 13.657 76 12 76H3C1.343 76 0 74.657 0 73V3C0 1.343 1.343 0 3 0Z";

const TONES = {
  duo: ["#191A1C", "#2E4FC4"],
  "duo-dark": ["#F4F2ED", "#8FA6F0"],
  mono: ["currentColor", "currentColor"],
} as const;

export function HMark({
  className = "",
  title,
  tone = "duo",
}: {
  className?: string;
  title?: string;
  tone?: keyof typeof TONES;
}) {
  const [left, right] = TONES[tone];
  const grad = `hantari-span-${tone}`;
  return (
    <svg
      viewBox={BRIDGE_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <defs>
        <linearGradient id={grad} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="66" y2="0">
          <stop offset="0" stopColor={left} />
          <stop offset="0.24" stopColor={left} />
          <stop offset="0.76" stopColor={right} />
          <stop offset="1" stopColor={right} />
        </linearGradient>
      </defs>
      <path d={BRIDGE_PATH} fill={tone === "mono" ? left : `url(#${grad})`} />
    </svg>
  );
}

export function Wordmark({ small = false }: { small?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <HMark className={small ? "h-[18px] w-auto" : "h-[24px] w-auto"} />
      <span
        className={`font-medium tracking-[0.22em] ${small ? "text-[12px]" : "text-[15px]"}`}
      >
        HANTARI
      </span>
    </span>
  );
}
