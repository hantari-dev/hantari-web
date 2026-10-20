/**
 * The Hantari mark: an H drawn as a bridge between two banks — business (left, ink) and
 * AI (right, blue) — joined by a span that carries one colour into the other.
 *
 * One continuous shape on a 66 × 76 grid: two piers that flare out towards their base,
 * softly rounded outer corners and curved joints where the span meets the piers, filled
 * with a single gradient (no seams). The OG image and icon generators use the same path.
 *
 * tone: "duo" (ink → blue, for light backgrounds), "duo-dark" (cream → light blue, for dark
 * backgrounds) or "mono" (one colour, follows the text colour).
 */
export const BRIDGE_VIEWBOX = "0 0 66 76";
export const BRIDGE_PATH =
  "M1.933 2.532A2.6 2.6 0 0 1 4.532 0L12.468 0A2.6 2.6 0 0 1 15.067 2.532L15.75 28.495A3.6 3.6 0 0 0 19.349 32L46.651 32A3.6 3.6 0 0 0 50.25 28.495L50.933 2.532A2.6 2.6 0 0 1 53.532 0L61.468 0A2.6 2.6 0 0 1 64.067 2.532L65.93 73.332A2.6 2.6 0 0 1 63.331 76L51.669 76A2.6 2.6 0 0 1 49.07 73.332L49.745 47.695A3.6 3.6 0 0 0 46.146 44L19.854 44A3.6 3.6 0 0 0 16.255 47.695L16.93 73.332A2.6 2.6 0 0 1 14.331 76L2.669 76A2.6 2.6 0 0 1 0.07 73.332Z";

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
          <stop offset="0.258" stopColor={left} />
          <stop offset="0.742" stopColor={right} />
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
