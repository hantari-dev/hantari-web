/**
 * Hantari illustration set — drawn in SVG so it stays sharp, light and on-brand.
 * Each piece fills its container (use a sized, overflow-hidden parent).
 * Themes come from the brand moodboard: dusk ridges, cave light, strata, the loop.
 */

type ArtProps = { className?: string };

const fill = "absolute inset-0 h-full w-full";

function Grain({ id, opacity = 0.13 }: { id: string; opacity?: number }) {
  return (
    <>
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} opacity={opacity} style={{ mixBlendMode: "overlay" }} />
    </>
  );
}

/** Wide dusk landscape — homepage feature card. */
export function DuskArt({ className = fill }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 1248 620" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="dusk-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B1122" />
          <stop offset="0.38" stopColor="#1B2A55" />
          <stop offset="0.62" stopColor="#3F5596" />
          <stop offset="0.78" stopColor="#C98458" />
          <stop offset="0.9" stopColor="#F0B774" />
          <stop offset="1" stopColor="#F6D6A2" />
        </linearGradient>
        <radialGradient id="dusk-glow" cx="0.5" cy="0.82" r="0.55">
          <stop offset="0" stopColor="#FFD8A0" stopOpacity="0.75" />
          <stop offset="0.5" stopColor="#E7925A" stopOpacity="0.25" />
          <stop offset="1" stopColor="#E7925A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1248" height="620" fill="url(#dusk-sky)" />
      <rect width="1248" height="620" fill="url(#dusk-glow)" />
      <path d="M0 470L90 430L170 452L260 400L340 436L430 392L520 428L600 380L690 420L780 388L870 430L960 396L1050 440L1140 404L1248 446V620H0Z" fill="#3A416E" opacity="0.75" />
      <path d="M0 520L110 468L200 500L300 450L380 486L470 440L560 492L650 456L760 506L850 462L960 498L1060 452L1160 494L1248 470V620H0Z" fill="#20274A" />
      <path d="M0 580L140 530L240 560L360 520L470 566L600 540L720 574L850 532L980 568L1100 536L1248 572V620H0Z" fill="#0D1224" />
      <Grain id="dusk-grain" />
    </svg>
  );
}

/** Night band with a warm glow — contact call-to-action. */
export function NightArt({ className = fill }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 1248 460" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="night-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0A0F1E" />
          <stop offset="0.55" stopColor="#16214A" />
          <stop offset="0.85" stopColor="#2E4FC4" />
          <stop offset="1" stopColor="#8FA6F0" />
        </linearGradient>
        <radialGradient id="night-glow" cx="0.78" cy="1" r="0.5">
          <stop offset="0" stopColor="#F0B774" stopOpacity="0.7" />
          <stop offset="1" stopColor="#F0B774" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1248" height="460" fill="url(#night-sky)" />
      <rect width="1248" height="460" fill="url(#night-glow)" />
      <Grain id="night-grain" opacity={0.12} />
    </svg>
  );
}

/** Light falling into a cave — Web & desktop apps; also the About image. */
export function CaveArt({ className = fill, idPrefix = "cave" }: ArtProps & { idPrefix?: string }) {
  return (
    <svg className={className} viewBox="0 0 612 320" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id={`${idPrefix}-light`} cx="0.5" cy="0.12" r="0.6">
          <stop offset="0" stopColor="#F6E7C6" />
          <stop offset="0.35" stopColor="#B9A987" stopOpacity="0.7" />
          <stop offset="1" stopColor="#14171C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${idPrefix}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6E7C6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#F6E7C6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="612" height="320" fill="#15181D" />
      <rect width="612" height="320" fill={`url(#${idPrefix}-light)`} />
      <path d="M270 0H350L470 320H150Z" fill={`url(#${idPrefix}-beam)`} />
      <path d="M0 0H250C228 40 214 70 190 110C160 170 120 210 0 240Z" fill="#0C0E12" />
      <path d="M612 0H372C400 50 420 90 452 130C490 180 540 220 612 236Z" fill="#0C0E12" />
      <path d="M0 320V262C120 250 210 272 306 266C410 260 500 244 612 258V320Z" fill="#0A0B0E" />
      <path d="M300 262V244H304V238H308V244H312V262Z" fill="#0A0B0E" />
      <Grain id={`${idPrefix}-grain`} opacity={0.1} />
    </svg>
  );
}

/** Layered blue strata — Automation. */
export function StrataArt({ className = fill }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 612 320" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="612" height="320" fill="#D9DEEB" />
      <path d="M0 60C120 30 220 90 330 70C440 50 520 20 612 40V320H0Z" fill="#B3BEDA" />
      <path d="M0 120C110 90 230 150 340 128C450 106 530 84 612 100V320H0Z" fill="#8196CF" />
      <path d="M0 180C130 150 230 206 350 186C460 168 540 146 612 160V320H0Z" fill="#4D68C6" />
      <path d="M0 236C120 212 240 262 360 244C470 228 550 210 612 220V320H0Z" fill="#2E4FC4" />
      <path d="M0 284C140 262 250 304 370 290C480 278 560 264 612 272V320H0Z" fill="#1A2B6A" />
    </svg>
  );
}

/** The Hantari loop as one glowing line — AI solutions. */
export function LoopArt({ className = fill }: ArtProps) {
  const d =
    "M92 176C120 90 176 48 196 70C214 92 160 178 120 186C90 192 110 150 170 136C240 120 300 104 316 136C332 168 284 196 246 180C214 166 236 122 272 110";
  return (
    <svg className={className} viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="loop-bg" cx="0.5" cy="0.55" r="0.7">
          <stop offset="0" stopColor="#26356E" />
          <stop offset="1" stopColor="#0E1430" />
        </radialGradient>
        <linearGradient id="loop-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F0B774" />
          <stop offset="0.5" stopColor="#FFF4DF" />
          <stop offset="1" stopColor="#7F9BF0" />
        </linearGradient>
        <filter id="loop-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <rect width="400" height="250" fill="url(#loop-bg)" />
      <path d={d} fill="none" stroke="url(#loop-stroke)" strokeWidth="10" strokeLinecap="round" opacity="0.55" filter="url(#loop-blur)" />
      <path d={d} fill="none" stroke="url(#loop-stroke)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/** Two hills joined by a path — Integrations. */
export function BridgeArt({ className = fill }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="bridge-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9FB0DA" />
          <stop offset="0.55" stopColor="#E7C3A2" />
          <stop offset="1" stopColor="#F4DDBF" />
        </linearGradient>
      </defs>
      <rect width="400" height="250" fill="url(#bridge-sky)" />
      <path d="M0 250V170C50 150 90 140 140 160C170 172 180 196 180 250Z" fill="#5A6594" />
      <path d="M400 250V160C350 138 300 132 250 154C220 168 214 196 214 250Z" fill="#46507F" />
      <path d="M0 250V206C80 196 150 214 200 222C260 212 330 196 400 204V250Z" fill="#2B3257" />
      <path d="M120 150C160 96 240 96 282 144" fill="none" stroke="#FFF7EA" strokeWidth="1.6" strokeDasharray="4 6" />
      <circle cx="120" cy="150" r="5" fill="#FFF7EA" />
      <circle cx="282" cy="144" r="5" fill="#FFF7EA" />
    </svg>
  );
}

/** Sunrise over old rock — Modernisation. */
export function SunriseArt({ className = fill }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="sunrise-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6B3A3A" />
          <stop offset="0.5" stopColor="#C8643B" />
          <stop offset="1" stopColor="#F0B774" />
        </linearGradient>
        <radialGradient id="sunrise-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF1D6" />
          <stop offset="1" stopColor="#F7C98A" />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill="url(#sunrise-sky)" />
      <circle cx="236" cy="170" r="54" fill="url(#sunrise-sun)" />
      <path d="M0 250V150L60 118L110 140L170 96L230 150L290 128L350 152L400 138V250Z" fill="#3B2230" />
      <path d="M0 250V204L90 184L160 204L250 180L330 202L400 190V250Z" fill="#1F1319" />
    </svg>
  );
}

/** Abstract browser window in Lacta's palette — case study card. */
export function LactaArt({ className = fill }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 716 420" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="lacta-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FCF2ED" />
          <stop offset="0.6" stopColor="#EBCFD9" />
          <stop offset="1" stopColor="#D99AB2" />
        </linearGradient>
      </defs>
      <rect width="716" height="420" fill="url(#lacta-bg)" />
      <rect x="150" y="70" width="416" height="300" rx="12" fill="#FFFDFB" opacity="0.92" />
      <rect x="150" y="70" width="416" height="34" rx="12" fill="#F4E8EC" />
      <circle cx="172" cy="87" r="4" fill="#D9B3C2" />
      <circle cx="186" cy="87" r="4" fill="#D9B3C2" />
      <circle cx="200" cy="87" r="4" fill="#D9B3C2" />
      <rect x="180" y="134" width="180" height="16" rx="4" fill="#BD5B83" opacity="0.85" />
      <rect x="180" y="162" width="240" height="8" rx="4" fill="#E2C7D2" />
      <rect x="180" y="178" width="210" height="8" rx="4" fill="#E2C7D2" />
      <rect x="180" y="206" width="96" height="26" rx="6" fill="#BD5B83" />
      <rect x="180" y="258" width="112" height="84" rx="8" fill="#F8EDF1" />
      <rect x="302" y="258" width="112" height="84" rx="8" fill="#F8EDF1" />
      <rect x="424" y="258" width="112" height="84" rx="8" fill="#F8EDF1" />
    </svg>
  );
}

/** Small ridge at dusk — the Services menu side panel. */
export function MenuArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 260 170" preserveAspectRatio="xMidYMax slice" aria-hidden>
      <defs>
        <linearGradient id="menu-glow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1A2446" stopOpacity="0" />
          <stop offset="1" stopColor="#E39A57" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect width="260" height="170" fill="url(#menu-glow)" />
      <path d="M0 170V120L40 96L70 112L110 80L150 108L190 90L260 122V170Z" fill="#101629" />
    </svg>
  );
}

/** Compact dusk — the Start a project page. */
export function SmallDuskArt({ className = fill }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 416 220" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="sdusk-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B1122" />
          <stop offset="0.5" stopColor="#2A3C78" />
          <stop offset="0.8" stopColor="#C98458" />
          <stop offset="1" stopColor="#F6D6A2" />
        </linearGradient>
      </defs>
      <rect width="416" height="220" fill="url(#sdusk-sky)" />
      <path d="M0 170L60 146L110 160L170 132L230 156L290 136L350 158L416 142V220H0Z" fill="#20274A" />
      <path d="M0 200L90 178L180 196L270 176L416 198V220H0Z" fill="#0D1224" />
    </svg>
  );
}
