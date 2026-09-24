/**
 * Sunrise — the coming-soon image. Night brightens into dawn once (~3.5s) and then stays still.
 * Pure SVG + CSS (no JavaScript). With "reduce motion" enabled it shows the final dawn immediately.
 * Animations live in globals.css under "Sunrise".
 */
export function SunriseScene({ className = "absolute inset-0 h-full w-full" }: { className?: string }) {
  return (
    <svg className={`sunrise ${className}`} viewBox="0 0 1248 620" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id="sr-night" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#060A16" />
          <stop offset="0.6" stopColor="#101938" />
          <stop offset="1" stopColor="#1A2550" />
        </linearGradient>
        <linearGradient id="sr-dawn" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0B1122" />
          <stop offset="0.38" stopColor="#1B2A55" />
          <stop offset="0.62" stopColor="#3F5596" />
          <stop offset="0.78" stopColor="#C98458" />
          <stop offset="0.9" stopColor="#F0B774" />
          <stop offset="1" stopColor="#F6D6A2" />
        </linearGradient>
        <radialGradient id="sr-glow" cx="0.5" cy="0.84" r="0.55">
          <stop offset="0" stopColor="#FFD8A0" stopOpacity="0.8" />
          <stop offset="0.5" stopColor="#E7925A" stopOpacity="0.25" />
          <stop offset="1" stopColor="#E7925A" stopOpacity="0" />
        </radialGradient>
        <filter id="sr-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      {/* Night, then dawn fading in over it */}
      <rect width="1248" height="620" fill="url(#sr-night)" />
      <rect className="sunrise-dawn" width="1248" height="620" fill="url(#sr-dawn)" />
      <rect className="sunrise-glow" width="1248" height="620" fill="url(#sr-glow)" />

      {/* Stars fade out as the light arrives */}
      <g className="sunrise-stars">
        <circle cx="673" cy="85" r="1.6" fill="#F4F2ED" opacity="0.9" />
        <circle cx="108" cy="45" r="0.8" fill="#F4F2ED" opacity="0.7" />
        <circle cx="1203" cy="37" r="1" fill="#F4F2ED" opacity="0.5" />
        <circle cx="186" cy="230" r="1.6" fill="#F4F2ED" opacity="0.5" />
        <circle cx="502" cy="54" r="1.6" fill="#F4F2ED" opacity="0.5" />
        <circle cx="1168" cy="71" r="1" fill="#F4F2ED" opacity="0.9" />
        <circle cx="1203" cy="39" r="1.6" fill="#F4F2ED" opacity="0.5" />
        <circle cx="462" cy="31" r="1" fill="#F4F2ED" opacity="0.7" />
        <circle cx="868" cy="81" r="0.8" fill="#F4F2ED" opacity="0.9" />
        <circle cx="641" cy="294" r="1" fill="#F4F2ED" opacity="0.5" />
        <circle cx="1201" cy="300" r="1" fill="#F4F2ED" opacity="0.7" />
        <circle cx="209" cy="288" r="0.8" fill="#F4F2ED" opacity="0.9" />
        <circle cx="132" cy="113" r="1.6" fill="#F4F2ED" opacity="0.9" />
        <circle cx="1098" cy="226" r="1.2" fill="#F4F2ED" opacity="0.7" />
        <circle cx="1209" cy="240" r="1.2" fill="#F4F2ED" opacity="0.7" />
        <circle cx="518" cy="100" r="1" fill="#F4F2ED" opacity="0.5" />
        <circle cx="1186" cy="161" r="1.6" fill="#F4F2ED" opacity="0.7" />
        <circle cx="929" cy="155" r="0.8" fill="#F4F2ED" opacity="0.5" />
        <circle cx="1058" cy="222" r="1" fill="#F4F2ED" opacity="0.7" />
        <circle cx="321" cy="258" r="1.6" fill="#F4F2ED" opacity="0.5" />
        <circle cx="168" cy="293" r="1.2" fill="#F4F2ED" opacity="0.7" />
        <circle cx="727" cy="262" r="1.6" fill="#F4F2ED" opacity="0.5" />
        <circle cx="201" cy="146" r="1.6" fill="#F4F2ED" opacity="0.9" />
        <circle cx="143" cy="39" r="1.2" fill="#F4F2ED" opacity="0.9" />
        <circle cx="1193" cy="236" r="1.2" fill="#F4F2ED" opacity="0.9" />
        <circle cx="800" cy="185" r="0.8" fill="#F4F2ED" opacity="0.7" />
        <circle cx="737" cy="94" r="0.8" fill="#F4F2ED" opacity="0.7" />
        <circle cx="130" cy="119" r="1.2" fill="#F4F2ED" opacity="0.5" />
        <circle cx="517" cy="211" r="1.6" fill="#F4F2ED" opacity="0.7" />
        <circle cx="175" cy="93" r="1.6" fill="#F4F2ED" opacity="0.7" />
        <circle cx="1135" cy="150" r="1" fill="#F4F2ED" opacity="0.7" />
        <circle cx="1136" cy="150" r="1.6" fill="#F4F2ED" opacity="0.7" />
        <circle cx="789" cy="126" r="1" fill="#F4F2ED" opacity="0.5" />
        <circle cx="370" cy="85" r="1" fill="#F4F2ED" opacity="0.9" />
        <circle cx="487" cy="14" r="1.6" fill="#F4F2ED" opacity="0.9" />
        <circle cx="383" cy="142" r="1.2" fill="#F4F2ED" opacity="0.5" />
        <circle cx="308" cy="222" r="1.2" fill="#F4F2ED" opacity="0.9" />
        <circle cx="1169" cy="171" r="1" fill="#F4F2ED" opacity="0.9" />
        <circle cx="1065" cy="35" r="1.6" fill="#F4F2ED" opacity="0.9" />
        <circle cx="1155" cy="208" r="1.6" fill="#F4F2ED" opacity="0.7" />
        <circle cx="817" cy="61" r="1.6" fill="#F4F2ED" opacity="0.9" />
        <circle cx="830" cy="39" r="1" fill="#F4F2ED" opacity="0.5" />
        <circle cx="437" cy="233" r="1" fill="#F4F2ED" opacity="0.5" />
        <circle cx="706" cy="34" r="0.8" fill="#F4F2ED" opacity="0.5" />
        <circle cx="1170" cy="85" r="0.8" fill="#F4F2ED" opacity="0.7" />
        <circle cx="62" cy="44" r="1" fill="#F4F2ED" opacity="0.9" />
      </g>

      {/* Ridges emerge from the dark, back to front */}
      <path className="sunrise-ridge sunrise-ridge-1" d="M0 470L90 430L170 452L260 400L340 436L430 392L520 428L600 380L690 420L780 388L870 430L960 396L1050 440L1140 404L1248 446V620H0Z" fill="#3A416E" />
      <path className="sunrise-ridge sunrise-ridge-2" d="M0 520L110 468L200 500L300 450L380 486L470 440L560 492L650 456L760 506L850 462L960 498L1060 452L1160 494L1248 470V620H0Z" fill="#20274A" />
      <path className="sunrise-ridge sunrise-ridge-3" d="M0 580L140 530L240 560L360 520L470 566L600 540L720 574L850 532L980 568L1100 536L1248 572V620H0Z" fill="#0D1224" />

      <rect width="1248" height="620" filter="url(#sr-grain)" opacity="0.12" style={{ mixBlendMode: "overlay" }} />
    </svg>
  );
}
