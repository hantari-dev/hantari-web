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
    <svg className={`cave ${className}`} viewBox="0 0 612 320" preserveAspectRatio="xMidYMid slice" aria-hidden>
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
      <rect className="cave-light" width="612" height="320" fill={`url(#${idPrefix}-light)`} />
      <path className="cave-beam" d="M270 0H350L470 320H150Z" fill={`url(#${idPrefix}-beam)`} />
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
    <svg className={`strata ${className}`} viewBox="0 0 612 320" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="612" height="320" fill="#D9DEEB" />
      <path d="M0 60C120 30 220 90 330 70C440 50 520 20 612 40V320H0Z" fill="#B3BEDA" className="strata-band" style={{ animationDelay: "0.00s" }} />
      <path d="M0 120C110 90 230 150 340 128C450 106 530 84 612 100V320H0Z" fill="#8196CF" className="strata-band" style={{ animationDelay: "0.15s" }} />
      <path d="M0 180C130 150 230 206 350 186C460 168 540 146 612 160V320H0Z" fill="#4D68C6" className="strata-band" style={{ animationDelay: "0.30s" }} />
      <path d="M0 236C120 212 240 262 360 244C470 228 550 210 612 220V320H0Z" fill="#2E4FC4" className="strata-band" style={{ animationDelay: "0.45s" }} />
      <path d="M0 284C140 262 250 304 370 290C480 278 560 264 612 272V320H0Z" fill="#1A2B6A" className="strata-band" style={{ animationDelay: "0.60s" }} />
    </svg>
  );
}

/**
 * Ben's "AI" mark traced as ribbons of light — AI solutions.
 * Traced over his original design: one continuous "A" (crossbar → gold loop → blue base →
 * rising leg → apex → long diagonal), then a hook that sweeps into the open green–silver oval.
 */
export function LoopArt({ className = fill }: ArtProps) {
  const a =
    "M505 238C430 244 330 252 262 262C170 276 60 318 40 400C28 450 60 490 110 505C170 522 260 532 318 500C370 470 392 380 405 290C415 210 430 110 445 50C450 30 435 30 425 55C360 190 180 380 45 488";
  const oval =
    "M455 285C420 305 395 360 398 410C402 460 440 482 500 478C600 470 720 430 800 370C860 320 875 250 840 200C800 150 680 165 540 212";
  return (
    <svg className={`loop ${className}`} viewBox="-50 -20 1000 620" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id="loop-bg" cx="0.5" cy="0.55" r="0.75">
          <stop offset="0" stopColor="#18244F" />
          <stop offset="1" stopColor="#060A1A" />
        </radialGradient>
        <linearGradient id="loop-a" gradientUnits="userSpaceOnUse" x1="40" y1="0" x2="500" y2="0">
          <stop offset="0" stopColor="#E3B25E" />
          <stop offset="0.3" stopColor="#D9B878" />
          <stop offset="0.55" stopColor="#2F63D8" />
          <stop offset="0.85" stopColor="#56C6F2" />
          <stop offset="1" stopColor="#DCE2EE" />
        </linearGradient>
        <linearGradient id="loop-o" gradientUnits="userSpaceOnUse" x1="0" y1="480" x2="0" y2="170">
          <stop offset="0" stopColor="#3FBF5E" />
          <stop offset="0.45" stopColor="#2BA7A0" />
          <stop offset="1" stopColor="#E4E8F0" />
        </linearGradient>
        <filter id="loop-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      <rect x="-50" y="-20" width="1000" height="620" fill="url(#loop-bg)" />
      {/* soft glow */}
      <g fill="none" strokeLinecap="round" strokeWidth="26" opacity="0.45" filter="url(#loop-blur)">
        <path className="loop-a" d={a} stroke="url(#loop-a)" pathLength={1} />
        <path className="loop-oval" d={oval} stroke="url(#loop-o)" pathLength={1} />
      </g>
      {/* the ribbons */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="13">
        <path className="loop-a" d={a} stroke="url(#loop-a)" pathLength={1} />
        <path className="loop-oval" d={oval} stroke="url(#loop-o)" pathLength={1} />
      </g>
      {/* a thin highlight along each ribbon, like the metallic edge in the original */}
      <g fill="none" strokeLinecap="round" strokeWidth="2.5" stroke="#F4F2ED" opacity="0.55">
        <path className="loop-a" d={a} pathLength={1} />
        <path className="loop-oval" d={oval} pathLength={1} />
      </g>
    </svg>
  );
}

/** Two hills joined by a path — Integrations. */
export function BridgeArt({ className = fill }: ArtProps) {
  return (
    <svg className={`bridge ${className}`} viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden>
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
      <clipPath id="bridge-draw">
        <rect className="bridge-reveal" x="110" y="80" width="185" height="80" />
      </clipPath>
      <path d="M120 150C160 96 240 96 282 144" fill="none" stroke="#FFF7EA" strokeWidth="1.6" strokeDasharray="4 6" clipPath="url(#bridge-draw)" />
      <circle cx="120" cy="150" r="5" fill="#FFF7EA" />
      <circle className="bridge-arrive" cx="282" cy="144" r="5" fill="#FFF7EA" />
    </svg>
  );
}

/** Sunrise over old rock — Modernisation. */
export function SunriseArt({ className = fill }: ArtProps) {
  return (
    <svg className={`modern ${className}`} viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden>
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
      <circle className="modern-sun" cx="236" cy="170" r="54" fill="url(#sunrise-sun)" />
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

/** A city at dusk whose windows light up — Web & desktop apps (software that runs a place). */
export function CityArt({ className = fill }: ArtProps) {
  return (
    <svg className={`city ${className}`} viewBox="0 0 612 320" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="city-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B1122" />
          <stop offset="0.45" stopColor="#1E2F5C" />
          <stop offset="0.8" stopColor="#4B5A9A" />
          <stop offset="1" stopColor="#D79A68" />
        </linearGradient>
      </defs>
      <rect width="612" height="320" fill="url(#city-sky)" />
      <path className="city-net" d="M91 152 L195 122 L299 102 L500 112 L591 142" fill="none" stroke="#8FA6F0" strokeWidth="1.2" strokeDasharray="1" pathLength={1} />
      <path d="M91 170V152" stroke="#3A4A86" strokeWidth="1.5" />
      <circle className="city-node" cx="91" cy="152" r="3" fill="#F4F2ED" />
      <path d="M195 140V122" stroke="#3A4A86" strokeWidth="1.5" />
      <circle className="city-node" cx="195" cy="122" r="3" fill="#F4F2ED" />
      <path d="M299 120V102" stroke="#3A4A86" strokeWidth="1.5" />
      <circle className="city-node" cx="299" cy="102" r="3" fill="#F4F2ED" />
      <path d="M500 130V112" stroke="#3A4A86" strokeWidth="1.5" />
      <circle className="city-node" cx="500" cy="112" r="3" fill="#F4F2ED" />
      <path d="M591 160V142" stroke="#3A4A86" strokeWidth="1.5" />
      <circle className="city-node" cx="591" cy="142" r="3" fill="#F4F2ED" />
      <rect x="0" y="210" width="70" height="110" fill="#141B36" />
      <rect x="62" y="170" width="58" height="150" fill="#1B2446" />
      <rect x="112" y="235" width="64" height="85" fill="#141B36" />
      <rect x="168" y="140" width="54" height="180" fill="#1B2446" />
      <rect x="214" y="195" width="60" height="125" fill="#141B36" />
      <rect x="266" y="120" width="66" height="200" fill="#1B2446" />
      <rect x="324" y="180" width="52" height="140" fill="#141B36" />
      <rect x="368" y="155" width="62" height="165" fill="#1B2446" />
      <rect x="422" y="220" width="56" height="100" fill="#141B36" />
      <rect x="470" y="130" width="60" height="190" fill="#1B2446" />
      <rect x="522" y="190" width="52" height="130" fill="#141B36" />
      <rect x="566" y="160" width="50" height="160" fill="#1B2446" />
      <rect className="city-win" x="34" y="242" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.71s" }} />
      <rect className="city-win" x="8" y="260" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.42s" }} />
      <rect className="city-win" x="47" y="260" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "2.52s" }} />
      <rect className="city-win" x="34" y="278" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.47s" }} />
      <rect className="city-win" x="47" y="278" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.78s" }} />
      <rect className="city-win" x="8" y="296" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.26s" }} />
      <rect className="city-win" x="109" y="184" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "2.59s" }} />
      <rect className="city-win" x="96" y="202" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.89s" }} />
      <rect className="city-win" x="109" y="202" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.16s" }} />
      <rect className="city-win" x="83" y="220" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "2.23s" }} />
      <rect className="city-win" x="96" y="220" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.38s" }} />
      <rect className="city-win" x="83" y="238" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.71s" }} />
      <rect className="city-win" x="109" y="238" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.0s" }} />
      <rect className="city-win" x="96" y="256" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.44s" }} />
      <rect className="city-win" x="109" y="256" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.63s" }} />
      <rect className="city-win" x="96" y="274" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.51s" }} />
      <rect className="city-win" x="70" y="292" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.71s" }} />
      <rect className="city-win" x="83" y="292" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "2.13s" }} />
      <rect className="city-win" x="96" y="292" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "0.71s" }} />
      <rect className="city-win" x="109" y="292" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "1.74s" }} />
      <rect className="city-win" x="120" y="249" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "0.71s" }} />
      <rect className="city-win" x="133" y="249" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.99s" }} />
      <rect className="city-win" x="146" y="249" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.42s" }} />
      <rect className="city-win" x="120" y="267" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.09s" }} />
      <rect className="city-win" x="146" y="285" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.38s" }} />
      <rect className="city-win" x="176" y="154" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.97s" }} />
      <rect className="city-win" x="202" y="154" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "2.32s" }} />
      <rect className="city-win" x="202" y="172" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.51s" }} />
      <rect className="city-win" x="176" y="190" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.82s" }} />
      <rect className="city-win" x="176" y="208" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.93s" }} />
      <rect className="city-win" x="189" y="208" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.54s" }} />
      <rect className="city-win" x="189" y="226" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "0.69s" }} />
      <rect className="city-win" x="202" y="226" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.27s" }} />
      <rect className="city-win" x="176" y="244" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.09s" }} />
      <rect className="city-win" x="202" y="244" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.34s" }} />
      <rect className="city-win" x="189" y="280" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.24s" }} />
      <rect className="city-win" x="202" y="298" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.36s" }} />
      <rect className="city-win" x="235" y="209" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "0.38s" }} />
      <rect className="city-win" x="235" y="245" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.36s" }} />
      <rect className="city-win" x="261" y="245" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.27s" }} />
      <rect className="city-win" x="248" y="263" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.66s" }} />
      <rect className="city-win" x="261" y="263" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.58s" }} />
      <rect className="city-win" x="248" y="281" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.59s" }} />
      <rect className="city-win" x="235" y="299" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.27s" }} />
      <rect className="city-win" x="274" y="134" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.39s" }} />
      <rect className="city-win" x="313" y="134" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.92s" }} />
      <rect className="city-win" x="287" y="152" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.37s" }} />
      <rect className="city-win" x="287" y="170" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.68s" }} />
      <rect className="city-win" x="300" y="188" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.96s" }} />
      <rect className="city-win" x="313" y="188" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.21s" }} />
      <rect className="city-win" x="313" y="206" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.28s" }} />
      <rect className="city-win" x="274" y="224" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.19s" }} />
      <rect className="city-win" x="313" y="224" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "2.56s" }} />
      <rect className="city-win" x="287" y="242" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.29s" }} />
      <rect className="city-win" x="300" y="242" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.57s" }} />
      <rect className="city-win" x="313" y="242" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.25s" }} />
      <rect className="city-win" x="274" y="260" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.26s" }} />
      <rect className="city-win" x="300" y="260" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.31s" }} />
      <rect className="city-win" x="300" y="296" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.63s" }} />
      <rect className="city-win" x="313" y="296" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.91s" }} />
      <rect className="city-win" x="332" y="194" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.03s" }} />
      <rect className="city-win" x="358" y="212" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.37s" }} />
      <rect className="city-win" x="332" y="230" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "1.93s" }} />
      <rect className="city-win" x="345" y="230" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.7s" }} />
      <rect className="city-win" x="332" y="248" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.31s" }} />
      <rect className="city-win" x="358" y="266" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.16s" }} />
      <rect className="city-win" x="358" y="284" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "2.55s" }} />
      <rect className="city-win" x="415" y="169" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "2.25s" }} />
      <rect className="city-win" x="376" y="187" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.26s" }} />
      <rect className="city-win" x="376" y="205" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "0.35s" }} />
      <rect className="city-win" x="402" y="205" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.09s" }} />
      <rect className="city-win" x="415" y="205" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.44s" }} />
      <rect className="city-win" x="402" y="241" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.46s" }} />
      <rect className="city-win" x="415" y="241" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.73s" }} />
      <rect className="city-win" x="415" y="259" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.23s" }} />
      <rect className="city-win" x="389" y="277" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "2.52s" }} />
      <rect className="city-win" x="376" y="295" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.41s" }} />
      <rect className="city-win" x="402" y="295" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "1.44s" }} />
      <rect className="city-win" x="415" y="295" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "1.55s" }} />
      <rect className="city-win" x="456" y="234" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.19s" }} />
      <rect className="city-win" x="456" y="252" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.5s" }} />
      <rect className="city-win" x="443" y="288" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.68s" }} />
      <rect className="city-win" x="478" y="144" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.25s" }} />
      <rect className="city-win" x="491" y="144" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.85s" }} />
      <rect className="city-win" x="504" y="144" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.69s" }} />
      <rect className="city-win" x="517" y="144" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.49s" }} />
      <rect className="city-win" x="491" y="162" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.47s" }} />
      <rect className="city-win" x="517" y="162" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.47s" }} />
      <rect className="city-win" x="478" y="180" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.72s" }} />
      <rect className="city-win" x="504" y="198" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.15s" }} />
      <rect className="city-win" x="478" y="216" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.41s" }} />
      <rect className="city-win" x="491" y="216" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "2.33s" }} />
      <rect className="city-win" x="504" y="216" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.94s" }} />
      <rect className="city-win" x="517" y="216" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.2s" }} />
      <rect className="city-win" x="504" y="234" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.84s" }} />
      <rect className="city-win" x="517" y="234" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.84s" }} />
      <rect className="city-win" x="504" y="252" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.02s" }} />
      <rect className="city-win" x="491" y="270" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.45s" }} />
      <rect className="city-win" x="504" y="270" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.44s" }} />
      <rect className="city-win" x="478" y="288" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.69s" }} />
      <rect className="city-win" x="530" y="204" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.48s" }} />
      <rect className="city-win" x="530" y="222" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.44s" }} />
      <rect className="city-win" x="530" y="240" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "2.23s" }} />
      <rect className="city-win" x="543" y="240" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.97s" }} />
      <rect className="city-win" x="556" y="240" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.6s" }} />
      <rect className="city-win" x="543" y="258" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "2.12s" }} />
      <rect className="city-win" x="556" y="276" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.41s" }} />
      <rect className="city-win" x="556" y="294" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "1.99s" }} />
      <rect className="city-win" x="600" y="174" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "2.31s" }} />
      <rect className="city-win" x="574" y="210" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.37s" }} />
      <rect className="city-win" x="587" y="210" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.23s" }} />
      <rect className="city-win" x="600" y="210" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.7s" }} />
      <rect className="city-win" x="574" y="228" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "1.8s" }} />
      <rect className="city-win" x="587" y="228" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.57s" }} />
      <rect className="city-win" x="574" y="246" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "1.74s" }} />
      <rect className="city-win" x="587" y="264" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "1.97s" }} />
      <rect className="city-win" x="600" y="264" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.32s" }} />
      <rect className="city-win" x="574" y="282" width="6" height="8" rx="1" fill="#F6D6A2" style={{ animationDelay: "0.44s" }} />
      <rect className="city-win" x="587" y="282" width="6" height="8" rx="1" fill="#8FA6F0" style={{ animationDelay: "1.52s" }} />
    </svg>
  );
}
