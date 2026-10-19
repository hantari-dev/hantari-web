/**
 * The Hantari mark: an H drawn as a bridge between two banks — business (left, ink) and
 * AI (right, blue) — joined by a span that carries one colour into the other.
 * Geometry lives on a 66 × 76 grid; the OG image and icon generators use the same numbers.
 *
 * tone: "duo" (ink → blue, for light backgrounds), "duo-dark" (cream → light blue, for dark
 * backgrounds) or "mono" (one colour, follows the text colour).
 */
export const BRIDGE_VIEWBOX = "0 0 66 76";
export const BRIDGE_LEFT = "M2 0H15L17 76H0Z";
export const BRIDGE_RIGHT = "M51 0H64L66 76H49Z";
export const BRIDGE_SPAN = { x: 15.5, y: 32, width: 35, height: 12 };

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
        <linearGradient id={grad} gradientUnits="userSpaceOnUse" x1="15.5" y1="0" x2="50.5" y2="0">
          <stop offset="0" stopColor={left} />
          <stop offset="1" stopColor={right} />
        </linearGradient>
      </defs>
      <path d={BRIDGE_LEFT} fill={left} />
      <path d={BRIDGE_RIGHT} fill={right} />
      <rect {...BRIDGE_SPAN} fill={tone === "mono" ? left : `url(#${grad})`} />
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
