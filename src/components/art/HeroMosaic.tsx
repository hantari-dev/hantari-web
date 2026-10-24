"use client";

/**
 * HeroMosaic: a slowly drifting field of the things Hantari builds (web apps, booking flows,
 * AI chat, voice agents, automations, integrations, dashboards) floating in three depth layers.
 * Inspired by the america.gov hero tile. Pure CSS animation, no images, no libraries.
 *
 * - Pause / play button (WCAG 2.2.2): bottom-right of the tile.
 * - Starts paused when the visitor prefers reduced motion.
 * - Pauses itself while the tile is off-screen (saves battery).
 *
 */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ─────────────── mini UI building blocks (drawn at a 900 × 900 px design size) ─────────────── */

const ink = "#191A1C";
const signal = "#2E4FC4";
const SANS = "var(--hm-sans, 'IBM Plex Sans', system-ui, sans-serif)";
const SERIF = "var(--hm-serif, 'Newsreader', Georgia, serif)";
const MONO = "var(--hm-mono, 'IBM Plex Mono', ui-monospace, monospace)";

function Browser({ url, children, dark = false, w, h }: { url: string; children: ReactNode; dark?: boolean; w: number; h: number }) {
  return (
    <div className="hm-win" style={{ width: w, height: h, background: dark ? "#10131C" : "#FFFFFF" }}>
      <div className="hm-bar" style={{ background: dark ? "#1A1E2A" : "#F1EFEA" }}>
        <i style={{ background: "#E8695E" }} /><i style={{ background: "#E9B949" }} /><i style={{ background: "#5DBB63" }} />
        <span style={{ background: dark ? "#252A38" : "#FFFFFF", color: dark ? "#8C93A8" : "#7A7C80" }}>{url}</span>
      </div>
      <div style={{ position: "relative", height: h - 22, overflow: "hidden" }}>{children}</div>
    </div>
  );
}

function Phone({ children, bg = "#FFFFFF", w = 150, h = 300 }: { children: ReactNode; bg?: string; w?: number; h?: number }) {
  return (
    <div className="hm-phone" style={{ width: w, height: h, background: bg }}>
      <div className="hm-notch" />
      {children}
    </div>
  );
}

const Line = ({ w, c = "#E4E1DA", h = 6, mt = 6, r = 3 }: { w: number | string; c?: string; h?: number; mt?: number; r?: number }) => (
  <div style={{ width: w, height: h, background: c, borderRadius: r, marginTop: mt }} />
);

/* ─────────────── the screens ─────────────── */

// Lacta: booking flow
const LactaBooking = () => (
  <Browser url="lacta.ro/programare" w={300} h={200}>
    <div style={{ background: "#FDF1E8", height: "100%", padding: "12px 14px", fontFamily: SANS }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <b style={{ fontFamily: SERIF, fontSize: 15, color: "#BD5B83", fontStyle: "italic" }}>Lacta</b>
        <span style={{ fontSize: 7, color: "#9A6B7E", letterSpacing: ".12em" }}>PASUL 2 DIN 3</span>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#4A2A38", marginTop: 8 }}>Alege ziua consultației</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 4, marginTop: 8 }}>
        {Array.from({ length: 21 }, (_, i) => (
          <div key={i} className={i === 10 ? "hm-pick" : undefined}
            style={{ height: 15, borderRadius: 4, fontSize: 7, display: "grid", placeItems: "center", color: i === 10 ? "#fff" : i % 7 > 4 ? "#C9B3BC" : "#6B4A57", background: i === 10 ? "#BD5B83" : "#FFFFFF" }}>{i + 3}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 5, marginTop: 9 }}>
        {["10:00", "11:30", "14:00", "16:30"].map((t, i) => (
          <span key={t} style={{ fontSize: 7.5, padding: "3px 6px", borderRadius: 10, border: "1px solid #E6C9D4", color: i === 1 ? "#fff" : "#8A5A6E", background: i === 1 ? "#D9956B" : "transparent" }}>{t}</span>
        ))}
      </div>
    </div>
  </Browser>
);

// Lacta: AI assistant chat (phone)
const LactaChat = () => (
  <Phone bg="#FFF8F3">
    <div style={{ padding: "26px 10px 0", fontFamily: SANS }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 18, height: 18, borderRadius: 9, background: "linear-gradient(135deg,#BD5B83,#D9956B)" }} />
        <div><div style={{ fontSize: 8.5, fontWeight: 600, color: "#4A2A38" }}>Asistent Lacta</div><div style={{ fontSize: 6.5, color: "#5DBB63" }}>● online</div></div>
      </div>
      <div className="hm-bub" style={{ marginTop: 12, background: "#F3E3EA", color: "#4A2A38", borderRadius: "10px 10px 10px 3px" }}>Bună! Cu ce te pot ajuta azi?</div>
      <div className="hm-bub" style={{ marginLeft: "auto", background: "#BD5B83", color: "#fff", borderRadius: "10px 10px 3px 10px" }}>Când pot programa o consultație?</div>
      <div className="hm-bub" style={{ background: "#F3E3EA", color: "#4A2A38", borderRadius: "10px 10px 10px 3px" }}>Joi la 11:30 e liber. Îl rezerv?</div>
      <div className="hm-typing"><i /><i /><i /></div>
    </div>
  </Phone>
);

// Pflege mit Kopf und Herz: presentation site
const Pflege = () => (
  <Browser url="pflegemitkopfundherz.at" w={310} h={210}>
    <div style={{ fontFamily: SANS, height: "100%", background: "#FAF7F2" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", fontSize: 7.5, color: "#3D5A50" }}>
        <b style={{ fontFamily: SERIF, fontSize: 10 }}>Pflege mit Kopf und Herz</b>
        <span>Leistungen · Über uns · Kontakt</span>
      </div>
      <div style={{ margin: "0 12px", height: 82, borderRadius: 8, background: "linear-gradient(120deg,#E7D3B8 0%,#C9B08C 45%,#8FA88E 100%)", padding: 12, position: "relative" }}>
        <div style={{ fontFamily: SERIF, fontSize: 14, color: "#24372F", maxWidth: 150, lineHeight: 1.1 }}>Betreuung zu Hause, mit Herz.</div>
        <span style={{ position: "absolute", left: 12, bottom: 10, fontSize: 7, background: "#2F6B5C", color: "#fff", padding: "4px 8px", borderRadius: 10 }}>Anfrage senden</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, margin: "8px 12px" }}>
        {["24h-Betreuung", "Pflegeberatung", "Haushalt"].map((t) => (
          <div key={t} style={{ background: "#fff", borderRadius: 6, padding: 7, fontSize: 7, color: "#24372F", fontWeight: 600 }}>{t}<Line w="80%" h={4} mt={5} /><Line w="55%" h={4} mt={3} /></div>
        ))}
      </div>
    </div>
  </Browser>
);

// Hantari site
const HantariSite = () => (
  <Browser url="hantari.ro" w={300} h={190}>
    <div style={{ height: "100%", background: "linear-gradient(180deg,#0B1122 0%,#1B2A55 40%,#3F5596 62%,#7F8BDA 84%,#DDE2FF 100%)", position: "relative", fontFamily: SERIF, textAlign: "center", color: "#F4F2ED" }}>
      <div style={{ fontFamily: MONO, fontSize: 6, letterSpacing: ".25em", paddingTop: 30, opacity: 0.8 }}>SOFTWARE &amp; AI</div>
      <div style={{ fontSize: 17, lineHeight: 1.05, marginTop: 6 }}>Software inteligent<br />pentru idei reale.</div>
      <svg viewBox="0 0 300 70" style={{ position: "absolute", left: 0, bottom: 0, width: "100%" }} preserveAspectRatio="none">
        <path d="M0 40L40 22L80 34L130 12L170 30L220 10L260 26L300 18V70H0Z" fill="#3A416E" opacity=".8" />
        <path d="M0 55L50 36L100 50L150 30L200 48L250 34L300 46V70H0Z" fill="#20274A" />
      </svg>
    </div>
  </Browser>
);

// Analytics dashboard
const Dashboard = () => (
  <Browser url="app.client.ro/raport" w={320} h={210}>
    <div style={{ display: "flex", height: "100%", fontFamily: SANS }}>
      <div style={{ width: 54, background: "#F4F2ED", padding: 8 }}>{[1, 2, 3, 4, 5].map((i) => <Line key={i} w="100%" h={5} mt={i === 1 ? 2 : 9} c={i === 2 ? signal : "#DDD9D0"} />)}</div>
      <div style={{ flex: 1, padding: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
          {[["Comenzi", "1.284", "+12%"], ["Venit", "86.4k", "+8%"], ["Timp economisit", "41 h", "AI"]].map(([k, v, d]) => (
            <div key={k} style={{ border: "1px solid #ECE9E2", borderRadius: 6, padding: 6 }}>
              <div style={{ fontSize: 6, color: "#8A8C90" }}>{k}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: ink, marginTop: 2 }}>{v}</div>
              <div style={{ fontSize: 6, color: "#3C9A5F" }}>{d}</div>
            </div>
          ))}
        </div>
        <svg viewBox="0 0 240 90" style={{ width: "100%", marginTop: 8 }}>
          {[0, 1, 2, 3].map((i) => <line key={i} x1="0" x2="240" y1={10 + i * 25} y2={10 + i * 25} stroke="#F0EDE6" />)}
          {[18, 30, 26, 44, 38, 52, 47, 63, 58, 72].map((v, i) => <rect key={i} className="hm-barup" style={{ animationDelay: `${i * 0.12}s` }} x={6 + i * 23.5} y={85 - v} width="13" height={v} rx="2" fill={i === 9 ? signal : "#C9D2F2"} />)}
          <path className="hm-draw" d="M12 62L36 55L60 58L84 42L108 46L132 34L156 38L180 24L204 28L228 14" fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  </Browser>
);

// AI voice agent
const Voice = () => (
  <div className="hm-card" style={{ width: 210, height: 210, background: "radial-gradient(circle at 50% 38%,#24356F 0%,#10162B 62%)", color: "#F4F2ED", fontFamily: SANS, textAlign: "center", padding: 16 }}>
    <div style={{ fontSize: 7, letterSpacing: ".22em", color: "#8FA6F0" }}>AGENT VOCAL AI</div>
    <div className="hm-orb" />
    <div style={{ display: "flex", gap: 3, justifyContent: "center", alignItems: "center", height: 28, marginTop: 6 }}>
      {Array.from({ length: 17 }, (_, i) => <i key={i} className="hm-wave" style={{ animationDelay: `${(i * 0.13) % 1}s` }} />)}
    </div>
    <div style={{ fontSize: 9, marginTop: 8 }}>Apel în curs · 02:14</div>
    <div style={{ fontSize: 7, color: "#9FA7BF", marginTop: 3 }}>„Da, am notat programarea pentru joi.”</div>
  </div>
);

// Integrations hub
const Integrations = () => {
  const nodes: [number, number, string][] = [[40, 40, "CRM"], [210, 34, "Email"], [232, 150, "Facturi"], [36, 160, "Calendar"], [126, 196, "ERP"]];
  return (
    <div className="hm-card" style={{ width: 270, height: 230, background: "#FBFAF7", fontFamily: SANS, position: "relative" }}>
      <svg viewBox="0 0 270 230" style={{ position: "absolute", inset: 0 }}>
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <line x1="135" y1="112" x2={x} y2={y} stroke="#D6D2C8" strokeWidth="1.5" strokeDasharray="3 4" />
            <circle r="3" fill={signal} className="hm-pulse-dot" style={{ offsetPath: `path('M135 112L${x} ${y}')`, animationDelay: `${i * 0.5}s` } as CSSProperties} />
          </g>
        ))}
      </svg>
      <div style={{ position: "absolute", left: 135, top: 112, transform: "translate(-50%,-50%)", width: 54, height: 54, borderRadius: 16, background: ink, display: "grid", placeItems: "center", boxShadow: "0 0 0 6px rgba(46,79,196,.12)" }}>
        <svg viewBox="0 0 66 76" width="22"><path d={MARK_PATH} fill="#F4F2ED" /></svg>
      </div>
      {nodes.map(([x, y, t]) => (
        <span key={t} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%,-50%)", fontSize: 8, fontWeight: 600, color: ink, background: "#fff", border: "1px solid #E4E1DA", borderRadius: 8, padding: "5px 8px", boxShadow: "0 2px 6px rgba(0,0,0,.05)" }}>{t}</span>
      ))}
    </div>
  );
};

// Automation flow
const Automation = () => (
  <div className="hm-card" style={{ width: 230, height: 220, background: "#FFFFFF", fontFamily: SANS, padding: 14 }}>
    <div style={{ fontSize: 7, letterSpacing: ".2em", color: "#8A8C90" }}>AUTOMATIZARE</div>
    {[["Formular nou primit", "#E9EEFC"], ["AI clasifică cererea", "#EEE7FB"], ["Ofertă trimisă pe email", "#E7F5EC"], ["Client adăugat în CRM", "#FDF1E8"]].map(([t, c], i) => (
      <div key={t}>
        {i > 0 && <div style={{ width: 2, height: 10, background: "#E4E1DA", marginLeft: 13 }} />}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: i ? 0 : 10, background: c, borderRadius: 8, padding: "7px 8px" }}>
          <span className="hm-check" style={{ animationDelay: `${i * 0.9}s` }}>✓</span>
          <span style={{ fontSize: 8.5, color: ink, fontWeight: 500 }}>{t}</span>
        </div>
      </div>
    ))}
  </div>
);

// Code editor
const Code = () => (
  <Browser url="api/programari.ts" dark w={280} h={180}>
    <div style={{ fontFamily: MONO, fontSize: 7.5, lineHeight: 1.75, padding: "8px 12px", color: "#C9D1E8" }}>
      {[
        [["#8FA6F0", "export async function "], ["#B9A8FF", "rezerva"], ["#C9D1E8", "(slot) {"]],
        [["#6E7896", "  // verifică disponibilitatea"]],
        [["#8FA6F0", "  const "], ["#C9D1E8", "liber = "], ["#8FA6F0", "await "], ["#B9A8FF", "calendar"], ["#C9D1E8", ".check(slot)"]],
        [["#8FA6F0", "  if "], ["#C9D1E8", "(!liber) "], ["#8FA6F0", "return "], ["#9BD89F", "'ocupat'"]],
        [["#8FA6F0", "  await "], ["#B9A8FF", "email"], ["#C9D1E8", ".confirmare(slot)"]],
        [["#8FA6F0", "  return "], ["#9BD89F", "'confirmat'"]],
        [["#C9D1E8", "}"]],
      ].map((ln, i) => (
        <div key={i}><span style={{ color: "#4A5270", marginRight: 10 }}>{i + 1}</span>{ln.map(([c, t], j) => <span key={j} style={{ color: c }}>{t}</span>)}{i === 5 && <span className="hm-caret" />}</div>
      ))}
    </div>
  </Browser>
);

// Mobile app: appointments list
const AppList = () => (
  <Phone>
    <div style={{ padding: "26px 10px 0", fontFamily: SANS }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: ink }}>Programări azi</div>
      <div style={{ fontSize: 7, color: "#8A8C90", marginTop: 2 }}>Joi · 6 clienți</div>
      {[["09:00", "Ana M.", signal], ["10:30", "Radu P.", "#0E8A7E"], ["12:00", "Ioana T.", "#5DBB63"], ["14:30", "Mihai C.", signal], ["16:00", "Elena V.", "#BD5B83"]].map(([h, n, c]) => (
        <div key={h} style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 8, padding: 6, borderRadius: 8, background: "#F7F6F2" }}>
          <span style={{ width: 4, height: 20, borderRadius: 2, background: c }} />
          <div><div style={{ fontSize: 8, fontWeight: 600, color: ink }}>{n}</div><div style={{ fontSize: 6.5, color: "#8A8C90" }}>{h}</div></div>
        </div>
      ))}
    </div>
  </Phone>
);

// Modernisation: old vs new
const Modern = () => (
  <div className="hm-card" style={{ width: 300, height: 170, display: "grid", gridTemplateColumns: "1fr 1fr", fontFamily: SANS, overflow: "hidden" }}>
    <div style={{ background: "#D4D0C8", padding: 8, fontFamily: "Tahoma, Verdana, sans-serif" }}>
      <div style={{ background: "#0A246A", color: "#fff", fontSize: 7, padding: "2px 4px" }}>Gestiune v2.3</div>
      {Array.from({ length: 7 }, (_, i) => <div key={i} style={{ display: "flex", gap: 2, marginTop: 3 }}>{[30, 22, 26].map((w, j) => <span key={j} style={{ width: w, height: 8, background: "#fff", border: "1px solid #808080" }} />)}</div>)}
      <div style={{ fontSize: 6, color: "#444", marginTop: 6 }}>ÎNAINTE</div>
    </div>
    <div style={{ background: "#FFFFFF", padding: 10 }}>
      <div style={{ fontSize: 9, fontWeight: 600, color: ink }}>Stocuri</div>
      {[78, 54, 91, 36].map((v, i) => (
        <div key={i} style={{ marginTop: 8 }}>
          <Line w="50%" h={4} mt={0} />
          <div style={{ height: 5, borderRadius: 3, background: "#EEF1FB", marginTop: 3 }}><div className="hm-grow" style={{ width: `${v}%`, height: "100%", borderRadius: 3, background: i === 3 ? "#E0485A" : signal, animationDelay: `${i * 0.2}s` }} /></div>
        </div>
      ))}
      <div style={{ fontSize: 6, color: signal, marginTop: 8 }}>DUPĂ</div>
    </div>
  </div>
);

// Messaging bot
const Bot = () => (
  <div className="hm-card" style={{ width: 210, height: 190, background: "#ECE5DD", fontFamily: SANS, padding: 0 }}>
    <div style={{ background: "#1F6F5C", color: "#fff", fontSize: 8.5, padding: "8px 10px", fontWeight: 600 }}>Service Auto · bot<div style={{ fontSize: 6.5, fontWeight: 400, opacity: 0.8 }}>răspunde 24/7</div></div>
    <div style={{ padding: 8 }}>
      <div className="hm-bub" style={{ marginLeft: "auto", background: "#DCF8C6", color: ink, borderRadius: 8 }}>Aveți loc mâine pentru revizie?</div>
      <div className="hm-bub" style={{ background: "#fff", color: ink, borderRadius: 8 }}>Da 🙂 la 9:00 sau 13:00. Pe care o preferi?</div>
      <div className="hm-bub" style={{ marginLeft: "auto", background: "#DCF8C6", color: ink, borderRadius: 8 }}>13:00</div>
    </div>
  </div>
);

// Notification toast
const Toast = ({ title, text, color }: { title: string; text: string; color: string }) => (
  <div className="hm-card" style={{ width: 210, padding: "9px 11px", background: "#FFFFFF", fontFamily: SANS, display: "flex", gap: 9, alignItems: "center" }}>
    <span style={{ width: 22, height: 22, borderRadius: 7, background: color, flex: "none" }} />
    <div><div style={{ fontSize: 8.5, fontWeight: 600, color: ink }}>{title}</div><div style={{ fontSize: 7, color: "#6B6E73", marginTop: 2 }}>{text}</div></div>
  </div>
);

// Kanban
const Kanban = () => (
  <Browser url="proiect.hantari.ro" w={290} h={180}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7, padding: 9, fontFamily: SANS, background: "#F7F6F2", height: "100%" }}>
      {[["De făcut", 3], ["În lucru", 2], ["Gata", 3]].map(([t, n], c) => (
        <div key={t as string}>
          <div style={{ fontSize: 7, fontWeight: 600, color: "#5B5E63" }}>{t}</div>
          {Array.from({ length: n as number }, (_, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 5, padding: 6, marginTop: 5, borderLeft: `3px solid ${[signal, "#7B5BD6", "#5DBB63"][c]}` }}><Line w="85%" h={4} mt={0} /><Line w="55%" h={4} mt={4} /></div>
          ))}
        </div>
      ))}
    </div>
  </Browser>
);

const MARK_PATH = "M1.933 2.532A2.6 2.6 0 0 1 4.532 0L12.468 0A2.6 2.6 0 0 1 15.067 2.532L15.75 28.495A3.6 3.6 0 0 0 19.349 32L46.651 32A3.6 3.6 0 0 0 50.25 28.495L50.933 2.532A2.6 2.6 0 0 1 53.532 0L61.468 0A2.6 2.6 0 0 1 64.067 2.532L65.93 73.332A2.6 2.6 0 0 1 63.331 76L51.669 76A2.6 2.6 0 0 1 49.07 73.332L49.745 47.695A3.6 3.6 0 0 0 46.146 44L19.854 44A3.6 3.6 0 0 0 16.255 47.695L16.93 73.332A2.6 2.6 0 0 1 14.331 76L2.669 76A2.6 2.6 0 0 1 0.07 73.332Z";

/* ─────────────── layout of the field: x / y = centre in a 900 × 900 world, layer 0 far … 2 near ─────────────── */

type Item = { x: number; y: number; layer: 0 | 1 | 2; el: ReactNode; tilt?: number };
const ITEMS: Item[] = [
  // far layer: smaller, darker, fills the gaps and the edges the camera drifts towards
  { x: 60, y: 80, layer: 0, el: <Kanban /> },
  { x: 450, y: 420, layer: 0, el: <Modern /> },
  { x: 960, y: 640, layer: 0, el: <AppList /> },
  { x: 40, y: 690, layer: 0, el: <Toast title="Plată primită" text="Factura #2041 · 1.250 lei" color="#5DBB63" /> },
  { x: 120, y: 300, layer: 0, el: <Toast title="Raport trimis" text="Luni, 08:00 · automat" color="#7B5BD6" /> },
  { x: 720, y: -10, layer: 0, el: <Code /> },
  { x: 990, y: 260, layer: 0, el: <Kanban /> },
  { x: -10, y: 960, layer: 0, el: <Bot /> },
  { x: 640, y: 1000, layer: 0, el: <Pflege /> },
  { x: 300, y: -40, layer: 0, el: <Dashboard /> },
  // middle layer
  { x: 470, y: 80, layer: 1, el: <Pflege /> },
  { x: 860, y: 430, layer: 1, el: <Integrations /> },
  { x: 50, y: 470, layer: 1, el: <Automation /> },
  { x: 210, y: 860, layer: 1, el: <Code /> },
  { x: 790, y: 850, layer: 1, el: <Bot /> },
  { x: 470, y: 800, layer: 1, el: <Toast title="Programare confirmată" text="Joi, 11:30 · email trimis" color="#BD5B83" /> },
  { x: 850, y: 110, layer: 1, el: <Toast title="Cerere nouă" text="Formular site · acum 2 min" color={signal} /> },
  // near layer: the hero pieces
  { x: 280, y: 265, layer: 2, el: <Dashboard /> },
  { x: 630, y: 255, layer: 2, el: <HantariSite /> },
  { x: 235, y: 600, layer: 2, el: <LactaBooking /> },
  { x: 465, y: 560, layer: 2, el: <LactaChat /> },
  { x: 680, y: 600, layer: 2, el: <Voice /> },
];

const LAYER = [
  { scale: 0.62, dim: 0.42, amp: 0.45 },
  { scale: 0.8, dim: 0.72, amp: 0.75 },
  { scale: 1, dim: 1, amp: 1 },
];

/* ─────────────── styles (scoped by the .hm prefix) ─────────────── */

const CSS = `
.hm{position:relative;overflow:hidden;isolation:isolate;container-type:inline-size;background:#05070D;border-radius:clamp(28px,7cqw,48px);aspect-ratio:1/1;width:100%}
.hm-stage{position:absolute;left:50%;top:50%;width:900px;height:900px;margin:-450px 0 0 -450px;transform:scale(var(--hm-k,0.8));transform-origin:50% 50%}
.hm-intro{position:absolute;inset:0;animation:hm-intro 2.6s cubic-bezier(.2,.7,.2,1) both}
.hm-layer{position:absolute;inset:0;animation:hm-cam 46s ease-in-out infinite alternate;will-change:transform}
.hm-item{position:absolute;transform:translate(-50%,-50%) scale(var(--s));animation:hm-in 1.2s cubic-bezier(.2,.7,.2,1) both,hm-float var(--fd,9s) ease-in-out var(--fdl,0s) infinite alternate}
.hm-item>*{box-shadow:0 18px 40px -14px rgba(0,0,0,.65),0 2px 6px rgba(0,0,0,.35)}
.hm-win,.hm-card,.hm-phone{border-radius:10px;overflow:hidden;position:relative}
.hm-phone{border-radius:24px;border:5px solid #0E0F13}
.hm-notch{position:absolute;left:50%;top:5px;width:44px;height:11px;margin-left:-22px;border-radius:8px;background:#0E0F13}
.hm-bar{height:22px;display:flex;align-items:center;gap:4px;padding:0 8px}
.hm-bar i{width:6px;height:6px;border-radius:50%;display:block}
.hm-bar span{margin-left:8px;flex:1;height:13px;border-radius:7px;font:400 6.5px/13px ${MONO};padding:0 8px;white-space:nowrap;overflow:hidden}
.hm-bub{font-size:7.5px;line-height:1.35;padding:6px 8px;max-width:78%;margin-top:6px;width:fit-content;animation:hm-pop .5s both}
.hm-bub:nth-of-type(2){animation-delay:.6s}.hm-bub:nth-of-type(3){animation-delay:1.2s}
.hm-typing{display:flex;gap:3px;margin-top:6px;padding:6px 8px;background:#F3E3EA;border-radius:10px;width:fit-content}
.hm-typing i{width:4px;height:4px;border-radius:50%;background:#BD5B83;animation:hm-dot 1.2s infinite}
.hm-typing i:nth-child(2){animation-delay:.2s}.hm-typing i:nth-child(3){animation-delay:.4s}
.hm-orb{width:62px;height:62px;border-radius:50%;margin:14px auto 0;background:radial-gradient(circle at 35% 35%,#C9D5FF,#5F7DE0 45%,#2E4FC4 75%);box-shadow:0 0 0 0 rgba(143,166,240,.5);animation:hm-ring 2.4s ease-out infinite}
.hm-wave{display:block;width:3px;height:26px;border-radius:2px;background:#8FA6F0;transform-origin:center;animation:hm-wave 1.1s ease-in-out infinite alternate}
.hm-draw{stroke-dasharray:320;animation:hm-draw 6s ease-in-out infinite alternate}
.hm-barup{transform-box:fill-box;transform-origin:bottom;animation:hm-barup 1.2s cubic-bezier(.2,.7,.2,1) both}
.hm-grow{transform-origin:left;animation:hm-grow 4s ease-in-out infinite alternate}
.hm-check{width:14px;height:14px;border-radius:50%;background:${ink};color:#fff;font-size:8px;display:grid;place-items:center;flex:none;animation:hm-check 3.6s ease-in-out infinite}
.hm-pulse-dot{animation:hm-move 2.4s linear infinite}
.hm-pick{animation:hm-pick 2.4s ease-in-out infinite}
.hm-caret{display:inline-block;width:5px;height:9px;background:#B9A8FF;margin-left:2px;vertical-align:-1px;animation:hm-blink 1s steps(1) infinite}
.hm-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(60% 50% at 50% 50%,rgba(46,79,196,.16),transparent 70%),radial-gradient(120% 90% at 50% 50%,transparent 55%,rgba(5,7,13,.85) 100%)}
.hm-btn{position:absolute;right:clamp(14px,4cqw,26px);bottom:clamp(14px,4cqw,26px);width:44px;height:44px;border-radius:50%;border:0;cursor:pointer;display:grid;place-items:center;background:rgba(40,42,50,.72);color:#fff;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);transition:background .2s,transform .2s;z-index:3}
.hm-btn:hover{background:rgba(60,63,74,.85);transform:scale(1.05)}
.hm-btn:focus-visible{outline:2px solid #8FA6F0;outline-offset:3px}
.hm[data-paused] *{animation-play-state:paused!important}
@keyframes hm-intro{from{transform:scale(1.45);opacity:0}to{transform:none;opacity:1}}
@keyframes hm-cam{
 0%{transform:translate(0,0) scale(1)}
 30%{transform:translate(calc(var(--a)*-46px),calc(var(--a)*30px)) scale(calc(1 + var(--a)*.08))}
 65%{transform:translate(calc(var(--a)*40px),calc(var(--a)*-24px)) scale(calc(1 + var(--a)*.17))}
 100%{transform:translate(calc(var(--a)*-18px),calc(var(--a)*-46px)) scale(calc(1 + var(--a)*.26))}}
@keyframes hm-in{from{opacity:0;transform:translate(-50%,-50%) scale(calc(var(--s)*.86))}to{opacity:var(--o);transform:translate(-50%,-50%) scale(var(--s))}}
@keyframes hm-float{from{translate:0 0}to{translate:var(--fx,6px) var(--fy,-8px)}}
@keyframes hm-pop{from{opacity:0;transform:translateY(4px) scale(.96)}to{opacity:1;transform:none}}
@keyframes hm-dot{0%,60%,100%{transform:none;opacity:.4}30%{transform:translateY(-3px);opacity:1}}
@keyframes hm-ring{0%{box-shadow:0 0 0 0 rgba(143,166,240,.45)}100%{box-shadow:0 0 0 22px rgba(143,166,240,0)}}
@keyframes hm-wave{from{transform:scaleY(.18)}to{transform:scaleY(1)}}
@keyframes hm-draw{from{stroke-dashoffset:320}to{stroke-dashoffset:0}}
@keyframes hm-barup{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes hm-grow{from{transform:scaleX(.55)}to{transform:scaleX(1)}}
@keyframes hm-check{0%,15%{background:#D6D2C8;transform:scale(.85)}25%,100%{background:${ink};transform:none}}
@keyframes hm-move{from{offset-distance:0%;opacity:0}15%{opacity:1}85%{opacity:1}to{offset-distance:100%;opacity:0}}
@keyframes hm-pick{0%,100%{box-shadow:0 0 0 0 rgba(189,91,131,.5)}50%{box-shadow:0 0 0 5px rgba(189,91,131,0)}}
@keyframes hm-blink{50%{opacity:0}}
@media (prefers-reduced-motion:reduce){.hm-intro,.hm-item{animation-duration:.01s!important}}
`;

/* ─────────────── component ─────────────── */

export function HeroMosaic({ label, labels, className = "" }: { label: string; labels: { pause: string; play: string }; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // visitors who prefer reduced motion start paused (they can still press play)
    const raf = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? requestAnimationFrame(() => setUserPaused(true)) : 0;
    // scale the 900 px design world to the tile: at 560 px wide the world shows at 0.8
    const ro = new ResizeObserver(([e]) => el.style.setProperty("--hm-k", String((e.contentRect.width / 560) * 0.8)));
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => setOffscreen(!e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  const paused = userPaused || offscreen;
  return (
    <div ref={ref} className={`hm ${className}`} data-paused={paused ? "" : undefined} role="img" aria-label={label}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="hm-stage" aria-hidden>
        <div className="hm-intro">
          {LAYER.map((L, li) => (
            <div key={li} className="hm-layer" style={{ "--a": L.amp, zIndex: li } as CSSProperties}>
              {ITEMS.map((it, i) => it.layer === li && (
                <div key={i} className="hm-item" style={{
                  left: it.x, top: it.y, filter: L.dim < 1 ? `brightness(${L.dim}) saturate(${0.6 + L.dim * 0.4})` : undefined,
                  "--s": L.scale, "--o": 1,
                  "--fd": `${7 + (i % 5) * 1.3}s`, "--fdl": `${-(i * 1.7) % 9}s`,
                  "--fx": `${(i % 2 ? 1 : -1) * (4 + (i % 3) * 3)}px`, "--fy": `${(i % 3 ? -1 : 1) * (5 + (i % 4) * 2)}px`,
                  animationDelay: `${0.25 + li * 0.25 + (i % 6) * 0.08}s, ${-(i * 1.7) % 9}s`,
                } as CSSProperties}>{it.el}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="hm-glow" />
      <button type="button" className="hm-btn" onClick={() => setUserPaused((p) => !p)} aria-label={userPaused ? labels.play : labels.pause} aria-pressed={userPaused}>
        {userPaused
          ? <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><path d="M4 2.5v11l9.5-5.5z" fill="currentColor" /></svg>
          : <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden><rect x="3.5" y="2.5" width="3" height="11" rx="1" fill="currentColor" /><rect x="9.5" y="2.5" width="3" height="11" rx="1" fill="currentColor" /></svg>}
      </button>
    </div>
  );
}
