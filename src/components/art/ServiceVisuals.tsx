"use client";

/**
 * Service visuals in the openai.com/solutions style: a soft, painterly gradient with one crisp,
 * realistic piece of product UI floating on it. Minimal, but with details clients recognise.
 *
 *   <AppsVisual/> <AutomationVisual/> <AIVisual/> <IntegrationsVisual/> <ModernVisual/> <IdeasBanner/>
 *
 * Each fills its parent (give the parent a size / aspect ratio). Copy comes in RO / EN / ES via `locale`.
 * Calm CSS motion only; it pauses off-screen and for visitors who prefer reduced motion.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale } from "next-intl";

type Locale = "ro" | "en" | "es";
const SANS = "var(--sv-sans, 'IBM Plex Sans', system-ui, sans-serif)";
const SERIF = "var(--sv-serif, 'Newsreader', Georgia, serif)";
const MONO = "var(--sv-mono, 'IBM Plex Mono', ui-monospace, monospace)";
const ink = "#191A1C";
const signal = "#2E4FC4";

/* ─────────────── copy ─────────────── */
const T = {
  ro: {
    apps: { url: "app.florariairis.ro/comenzi", title: "Comenzi", today: "Azi · 24 oct", cols: ["Client", "Livrare", "Total", "Status"], st: ["Nouă", "În lucru", "Livrată"], nav: ["Panou", "Comenzi", "Produse", "Clienți", "Rapoarte"], phone: "Comanda #1042", phoneSub: "Livrare azi, 16:00", phoneBtn: "Confirmă", lines: ["Buchet 15 trandafiri", "Felicitare"], cur: "lei", fx: 1 },
    auto: { head: "Flux automat", steps: ["Email nou de la client", "AI extrage datele", "Factură creată", "Trimisă la contabilitate"], meta: ["acum", "0,8 s", "1,2 s", "2,0 s"], done: "Rulat de 1.284 ori luna aceasta" },
    ai: { title: "Agent vocal AI", live: "În apel", biz: "Clinica Dentară Zâmbet", caller: "Apel primit · 07•• ••• 214", tr: "Transcriere live", lines: ["Bună ziua, aș vrea o programare pentru detartraj.", "Sigur! Am liber joi la 11:30 sau vineri la 15:00.", "Joi la 11:30 e perfect.", "Gata, v-am trimis confirmarea prin SMS. O zi bună!"], done: "Programare creată", doneSub: "Joi, 11:30 · SMS trimis · calendar actualizat" },
    int: { ok: "sincronizat", msg: { hantari: ["Totul conectat", "Aplicațiile tale lucrează împreună"], mail: ["Email", "Cerere nouă → client creat în CRM"], inv: ["Facturare", "Comandă plătită → factură emisă"], cal: ["Calendar", "Programare nouă → reminder trimis"], chat: ["Mesagerie", "Mesaj de la client → răspuns cu AI"], db: ["Bază de date", "Stocuri actualizate în timp real"], pay: ["Plăți", "Plată primită → comandă confirmată"], shop: ["Magazin online", "Comandă nouă → factură → email"] } },
    mod: { old: "Gestiune v2.3", neu: "Stocuri", before: "Înainte", after: "După", items: ["Trandafiri roșii", "Lalele albe", "Ambalaj kraft"], unit: "buc", menu: "Fișier  Editare  Rapoarte  Ajutor", cols: ["Denumire", "Cod", "Cant.", "Preț"], rows: ["Trandafir roșu", "Lalea albă", "Ambalaj", "Crizantemă", "Panglică", "Felicitare", "Vas", "Burete"] },
    idea: { note: "Idee: rezervări online pentru salon, cu reminder pe SMS", app: "Salon Ana", slot: "Alege ora", btn: "Rezervă", step: "De la idee la aplicație", svc: "Tuns · Vopsit · Coafat" },
  },
  en: {
    apps: { url: "app.irisflowers.com/orders", title: "Orders", today: "Today · Oct 24", cols: ["Customer", "Delivery", "Total", "Status"], st: ["New", "In progress", "Delivered"], nav: ["Overview", "Orders", "Products", "Customers", "Reports"], phone: "Order #1042", phoneSub: "Delivery today, 4:00 pm", phoneBtn: "Confirm", lines: ["Bouquet of 15 roses", "Greeting card"], cur: "€", fx: 5 },
    auto: { head: "Automated flow", steps: ["New email from a customer", "AI extracts the details", "Invoice created", "Sent to accounting"], meta: ["now", "0.8 s", "1.2 s", "2.0 s"], done: "Ran 1,284 times this month" },
    ai: { title: "AI voice agent", live: "On call", biz: "Smile Dental Clinic", caller: "Incoming call · ••• ••• 214", tr: "Live transcript", lines: ["Hi, I'd like to book a dental cleaning.", "Of course! I have Thursday at 11:30 or Friday at 3 pm.", "Thursday at 11:30 is perfect.", "Done, I've sent you a confirmation by SMS. Have a nice day!"], done: "Appointment booked", doneSub: "Thu, 11:30 · SMS sent · calendar updated" },
    int: { ok: "synced", msg: { hantari: ["All connected", "Your apps working together"], mail: ["Email", "New enquiry → customer added to CRM"], inv: ["Invoicing", "Order paid → invoice issued"], cal: ["Calendar", "New booking → reminder sent"], chat: ["Messaging", "Customer message → AI reply"], db: ["Database", "Stock updated in real time"], pay: ["Payments", "Payment received → order confirmed"], shop: ["Online shop", "New order → invoice → email"] } },
    mod: { old: "Inventory v2.3", neu: "Stock", before: "Before", after: "After", items: ["Red roses", "White tulips", "Kraft wrapping"], unit: "pcs", menu: "File  Edit  Reports  Help", cols: ["Item", "Code", "Qty", "Price"], rows: ["Red rose", "White tulip", "Wrapping", "Chrysanthemum", "Ribbon", "Card", "Vase", "Foam"] },
    idea: { note: "Idea: online booking for the salon, with SMS reminders", app: "Salon Ana", slot: "Pick a time", btn: "Book", step: "From idea to app", svc: "Cut · Colour · Styling" },
  },
  es: {
    apps: { url: "app.floreriairis.com/pedidos", title: "Pedidos", today: "Hoy · 24 oct", cols: ["Cliente", "Entrega", "Total", "Estado"], st: ["Nuevo", "En curso", "Entregado"], nav: ["Panel", "Pedidos", "Productos", "Clientes", "Informes"], phone: "Pedido #1042", phoneSub: "Entrega hoy, 16:00", phoneBtn: "Confirmar", lines: ["Ramo de 15 rosas", "Tarjeta"], cur: "€", fx: 5 },
    auto: { head: "Flujo automático", steps: ["Nuevo email de un cliente", "La IA extrae los datos", "Factura creada", "Enviada a contabilidad"], meta: ["ahora", "0,8 s", "1,2 s", "2,0 s"], done: "Ejecutado 1.284 veces este mes" },
    ai: { title: "Agente de voz IA", live: "En llamada", biz: "Clínica Dental Sonrisa", caller: "Llamada entrante · ••• ••• 214", tr: "Transcripción en vivo", lines: ["Buenos días, quisiera una cita para una limpieza.", "¡Claro! Tengo libre el jueves a las 11:30 o el viernes a las 15:00.", "El jueves a las 11:30 me viene perfecto.", "Listo, le envié la confirmación por SMS. ¡Que tenga un buen día!"], done: "Cita creada", doneSub: "Jue, 11:30 · SMS enviado · calendario actualizado" },
    int: { ok: "sincronizado", msg: { hantari: ["Todo conectado", "Tus aplicaciones trabajando juntas"], mail: ["Email", "Consulta nueva → cliente creado en el CRM"], inv: ["Facturación", "Pedido pagado → factura emitida"], cal: ["Calendario", "Reserva nueva → recordatorio enviado"], chat: ["Mensajería", "Mensaje del cliente → respuesta con IA"], db: ["Base de datos", "Inventario actualizado en tiempo real"], pay: ["Pagos", "Pago recibido → pedido confirmado"], shop: ["Tienda online", "Pedido nuevo → factura → email"] } },
    mod: { old: "Gestión v2.3", neu: "Inventario", before: "Antes", after: "Después", items: ["Rosas rojas", "Tulipanes blancos", "Papel kraft"], unit: "uds", menu: "Archivo  Editar  Informes  Ayuda", cols: ["Artículo", "Código", "Cant.", "Precio"], rows: ["Rosa roja", "Tulipán blanco", "Envoltorio", "Crisantemo", "Cinta", "Tarjeta", "Jarrón", "Esponja"] },
    idea: { note: "Idea: reservas online para el salón, con recordatorio por SMS", app: "Salón Ana", slot: "Elige la hora", btn: "Reservar", step: "De la idea a la app", svc: "Corte · Color · Peinado" },
  },
} as const;

/* ─────────────── shared frame: gradient + grain, content scaled to fit ─────────────── */

const GRAIN = `url("data:image/svg+xml;utf8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .55 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>')}")`;

const BG = {
  sky: "radial-gradient(70% 90% at 18% 20%,#FFFFFF 0%,rgba(255,255,255,0) 60%),radial-gradient(60% 80% at 85% 85%,#3D6BFF 0%,rgba(61,107,255,0) 70%),radial-gradient(80% 90% at 70% 10%,#9CC3FF 0%,rgba(156,195,255,0) 70%),linear-gradient(135deg,#DDE9FF 0%,#7FA4F5 55%,#3557D6 100%)",
  sage: "radial-gradient(70% 80% at 80% 15%,#FBFDF6 0%,rgba(251,253,246,0) 60%),radial-gradient(70% 90% at 10% 95%,#4F8466 0%,rgba(79,132,102,0) 70%),radial-gradient(60% 70% at 40% 40%,#D3E6C4 0%,rgba(211,230,196,0) 70%),linear-gradient(160deg,#F0F6E9 0%,#A9C9A0 55%,#3F6E55 100%)",
  violet: "radial-gradient(60% 80% at 25% 15%,#F3EEFF 0%,rgba(243,238,255,0) 60%),radial-gradient(70% 80% at 85% 90%,#5B47D6 0%,rgba(91,71,214,0) 70%),radial-gradient(60% 70% at 70% 30%,#B9A8FF 0%,rgba(185,168,255,0) 70%),linear-gradient(140deg,#E7E1FF 0%,#9E8CF2 55%,#4B3BC2 100%)",
  mint: "radial-gradient(70% 80% at 20% 85%,#FFFFFF 0%,rgba(255,255,255,0) 55%),radial-gradient(60% 80% at 90% 10%,#2FB5A8 0%,rgba(47,181,168,0) 70%),radial-gradient(70% 70% at 55% 50%,#A6EADF 0%,rgba(166,234,223,0) 70%),linear-gradient(150deg,#E2FAF5 0%,#8FDCD0 50%,#2E9C93 100%)",
  stone: "radial-gradient(70% 80% at 15% 15%,#FFFFFF 0%,rgba(255,255,255,0) 60%),radial-gradient(70% 80% at 90% 90%,#7B8AA8 0%,rgba(123,138,168,0) 70%),linear-gradient(145deg,#EEF0F4 0%,#C3CAD8 55%,#6C7A97 100%)",
  mist: "radial-gradient(70% 80% at 20% 15%,#FFFFFF 0%,rgba(255,255,255,0) 60%),radial-gradient(70% 90% at 90% 95%,#7F8BDA 0%,rgba(127,139,218,0) 70%),linear-gradient(150deg,#F2F4FF 0%,#C9D1F6 55%,#8494DE 100%)",
  dawn: "radial-gradient(40% 110% at 74% 0%,#FFFFFF 0%,rgba(255,255,255,0) 70%),radial-gradient(60% 90% at 96% 100%,#C9D2FF 0%,rgba(201,210,255,0) 70%),radial-gradient(60% 100% at 8% 100%,#3F5596 0%,rgba(63,85,150,0) 70%),linear-gradient(120deg,#141E44 0%,#33407E 38%,#7F8BDA 72%,#DDE2FF 100%)",
};

type Narrow = { below: number; crop: [number, number]; cx: number; cy: number };
function Visual({ bg, w = 640, h = 400, crop, narrow, children, label }: { bg: string; w?: number; h?: number; crop?: [number, number]; narrow?: Narrow; children: ReactNode; label: string }) {
  const [isNarrow, setNarrow] = useState(false);
  const n = isNarrow && narrow ? narrow : null;
  const [cw, ch] = n ? n.crop : crop ?? [w, h];
  const ox = n ? cw / 2 - n.cx : (cw - w) / 2, oy = n ? ch / 2 - n.cy : (ch - h) / 2;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      if (narrow) setNarrow(width / height < narrow.below);
      el.style.setProperty("--sv-k", String(Math.min(width / cw, height / ch)));
    });
    ro.observe(el);
    const io = new IntersectionObserver(([e]) => el.toggleAttribute("data-paused", !e.isIntersecting));
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, [cw, ch, narrow]);
  return (
    <div ref={ref} className="sv" role="img" aria-label={label} style={{ background: bg }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="sv-grain" style={{ backgroundImage: GRAIN }} />
      <div className="sv-stage" style={{ width: cw, height: ch, marginLeft: -cw / 2, marginTop: -ch / 2 }} aria-hidden>
        <div style={{ position: "absolute", width: w, height: h, left: ox, top: oy }}>{children}</div>
      </div>
    </div>
  );
}

const Av = ({ n, c }: { n: string; c: string }) => (
  <span style={{ width: 18, height: 18, borderRadius: 9, background: c, color: "#fff", fontSize: 8, fontWeight: 600, display: "inline-grid", placeItems: "center", flex: "none" }}>{n}</span>
);

/* ─────────────── 01 · Apps web & desktop ─────────────── */
export function AppsVisual({ locale }: { locale?: Locale }) {
  const active = useLocale() as Locale;
  locale = locale ?? active;
  const c = T[locale].apps;
  const money = (v: number) => `${Math.round(v / c.fx)} ${c.cur}`;
  const rows: [string, string, string, string, 0 | 1 | 2][] = [
    ["Maria Popescu", "MP", "14:00", money(320), 0], ["Andrei Ionescu", "AI", "15:30", money(185), 1],
    ["Elena Dumitru", "ED", "16:00", money(450), 1], ["Radu Stan", "RS", "11:00", money(210), 2], ["Ioana Marin", "IM", "10:30", money(95), 2],
  ];
  const pill = ["#E9EEFC|#2E4FC4", "#F1ECFF|#5B3FD0", "#E6F5EC|#2F7D4F"];
  return (
    <Visual bg={BG.sky} label={c.title}>
      <div className="sv-win sv-float" style={{ left: 38, top: 58, width: 430, height: 290 }}>
        <div className="sv-chrome"><i /><i /><i /><span>{c.url}</span></div>
        <div style={{ display: "flex", height: 266 }}>
          <div style={{ width: 92, background: "#F7F7F5", borderRight: "1px solid #EEECE7", padding: "12px 10px", fontSize: 8.5, color: "#5B5E63" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontWeight: 600, color: ink, fontSize: 9, marginBottom: 12 }}><span style={{ width: 14, height: 14, borderRadius: 4, background: "linear-gradient(135deg,#E86B8C,#B05BD6)" }} />Iris</div>
            {c.nav.map((n, i) => <div key={n} style={{ padding: "5px 6px", borderRadius: 5, marginTop: 2, background: i === 1 ? "#FFFFFF" : "transparent", color: i === 1 ? ink : undefined, fontWeight: i === 1 ? 600 : 400, boxShadow: i === 1 ? "0 1px 2px rgba(0,0,0,.06)" : undefined }}>{n}</div>)}
          </div>
          <div style={{ flex: 1, padding: "14px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: ink }}>{c.title}</div>
              <div style={{ fontSize: 8, color: "#8A8C90" }}>{c.today}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr .8fr .8fr .9fr", fontSize: 7.5, color: "#8A8C90", marginTop: 12, paddingBottom: 6, borderBottom: "1px solid #EEECE7" }}>{c.cols.map((h) => <span key={h}>{h}</span>)}</div>
            {rows.map(([name, ini, t, sum, s], i) => {
              const [pb, pc] = pill[s].split("|");
              return (
                <div key={name} className={i === 0 ? "sv-newrow" : undefined} style={{ display: "grid", gridTemplateColumns: "1.6fr .8fr .8fr .9fr", alignItems: "center", fontSize: 8.5, color: ink, padding: "7px 0", borderBottom: "1px solid #F3F2EE" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Av n={ini} c={["#E86B8C", "#2E4FC4", "#0E8A7E", "#2F7D4F", "#7B5BD6"][i]} />{name}</span>
                  <span style={{ color: "#5B5E63" }}>{t}</span><span style={{ fontWeight: 500 }}>{sum}</span>
                  <span><span style={{ fontSize: 7, padding: "2px 7px", borderRadius: 9, background: pb, color: pc, fontWeight: 500 }}>{c.st[s]}</span></span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="sv-phone sv-float2" style={{ left: 482, top: 100, width: 132, height: 262 }}>
        <div className="sv-notch" />
        <div style={{ padding: "30px 11px 0", fontSize: 8 }}>
          <div style={{ fontSize: 7, color: "#8A8C90" }}>Iris</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: ink, marginTop: 2 }}>{c.phone}</div>
          <div style={{ fontSize: 7.5, color: "#5B5E63", marginTop: 2 }}>{c.phoneSub}</div>
          <div style={{ height: 70, borderRadius: 10, marginTop: 10, background: "radial-gradient(circle at 30% 40%,#F7B2C4,transparent 45%),radial-gradient(circle at 70% 60%,#E86B8C,transparent 45%),radial-gradient(circle at 50% 30%,#FBD2DC,transparent 50%),#F6E4D8" }} />
          {c.lines.map((x, i) => <div key={x} style={{ display: "flex", justifyContent: "space-between", marginTop: 8, color: ink }}><span>{x}</span><b style={{ fontWeight: 500 }}>{money(i ? 15 : 305)}</b></div>)}
          <div style={{ marginTop: 14, background: ink, color: "#fff", textAlign: "center", borderRadius: 8, padding: "7px 0", fontWeight: 500 }}>{c.phoneBtn}</div>
        </div>
      </div>
    </Visual>
  );
}

/* ─────────────── 02 · Automation ─────────────── */
export function AutomationVisual({ locale }: { locale?: Locale }) {
  const active = useLocale() as Locale;
  locale = locale ?? active;
  const c = T[locale].auto;
  const icons = [
    <svg key="m" viewBox="0 0 16 16" width="12"><rect x="1.5" y="3" width="13" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M2 4l6 5 6-5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>,
    <svg key="a" viewBox="0 0 16 16" width="12"><path d="M8 1.5l1.6 4.2 4.4.3-3.4 2.8 1.1 4.3L8 10.7l-3.7 2.4 1.1-4.3L2 6l4.4-.3z" fill="currentColor" /></svg>,
    <svg key="f" viewBox="0 0 16 16" width="12"><path d="M4 1.5h5.5L12.5 4.5v10h-8.5z" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M6 8h5M6 10.5h5" stroke="currentColor" strokeWidth="1.2" /></svg>,
    <svg key="s" viewBox="0 0 16 16" width="12"><path d="M1.5 8l13-6-4 13-3-5z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>,
  ];
  const tint = [["#EEF2FF", signal], ["#F3EEFF", "#6A4FD8"], ["#E8F4FB", "#1F7BB8"], ["#E9F7EF", "#2F7D4F"]];
  return (
    <Visual bg={BG.sage} label={c.head}>
      <div className="sv-card sv-float" style={{ left: 150, top: 46, width: 340, padding: "16px 18px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: ink }}>{c.head}</span>
          <span style={{ fontSize: 7.5, color: "#2F7D4F", display: "flex", alignItems: "center", gap: 4 }}><i className="sv-live" />Live</span>
        </div>
        <div style={{ position: "relative", marginTop: 12 }}>
          <div style={{ position: "absolute", left: 15, top: 16, bottom: 16, width: 2, background: "#EEECE7", borderRadius: 1 }}><div className="sv-progress" /></div>
          {c.steps.map((s, i) => (
            <div key={s} className="sv-step" style={{ animationDelay: `${i * 1.1}s`, display: "flex", alignItems: "center", gap: 10, padding: "7px 0" }}>
              <span style={{ width: 32, height: 32, borderRadius: 10, background: tint[i][0], color: tint[i][1], display: "grid", placeItems: "center", position: "relative", zIndex: 1, border: "1px solid rgba(0,0,0,.04)" }}>{icons[i]}</span>
              <span style={{ flex: 1, fontSize: 9.5, color: ink, fontWeight: 500 }}>{s}</span>
              <span style={{ fontSize: 7.5, color: "#8A8C90", fontFamily: MONO }}>{c.meta[i]}</span>
              <span className="sv-tick" style={{ animationDelay: `${i * 1.1 + 0.5}s` }}>✓</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8, paddingTop: 10, borderTop: "1px solid #F1EFEA", fontSize: 7.5, color: "#5B5E63" }}>{c.done}</div>
      </div>
    </Visual>
  );
}

/* ─────────────── 03 · AI solutions: a voice agent taking a booking call ─────────────── */
export function AIVisual({ locale }: { locale?: Locale }) {
  const active = useLocale() as Locale;
  locale = locale ?? active;
  const c = T[locale].ai;
  return (
    <Visual bg={BG.violet} label={c.title} crop={[520, 325]}>
      {/* the call */}
      <div className="sv-call sv-float" style={{ left: 86, top: 52, width: 214, height: 284 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 7.5, color: "#AEB6E8" }}>
          <span style={{ letterSpacing: ".16em" }}>{c.title.toUpperCase()}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4, color: "#7BE3A6" }}><i className="sv-live" />{c.live}</span>
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, color: "#F4F2ED", marginTop: 8 }}>{c.biz}</div>
        <div style={{ fontSize: 7.5, color: "#9AA3CF", marginTop: 2 }}>{c.caller}</div>
        <div className="sv-orb"><span /><span /><span /></div>
        <div style={{ display: "flex", gap: 2.5, justifyContent: "center", alignItems: "center", height: 26, marginTop: 4 }}>
          {Array.from({ length: 21 }, (_, i) => <i key={i} className="sv-wave" style={{ animationDelay: `${((i * 0.137) % 0.9).toFixed(2)}s`, animationDuration: `${0.7 + (i % 5) * 0.12}s` }} />)}
        </div>
        <div style={{ textAlign: "center", fontFamily: MONO, fontSize: 9, color: "#DDE2FF", marginTop: 8 }}>01:42</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 12 }}>
          {[["#2A3160", <path key="m" d="M8 2.5a2 2 0 0 1 2 2v3.5a2 2 0 0 1-4 0V4.5a2 2 0 0 1 2-2zM4.5 7.5a3.5 3.5 0 0 0 7 0M8 11v2.5" fill="none" stroke="#DDE2FF" strokeWidth="1.3" strokeLinecap="round" />],
            ["#E0485A", <path key="e" d="M2.5 9.2c3.3-2.6 7.7-2.6 11 0l-1.3 1.6-2.4-.9V8.4a6.6 6.6 0 0 0-3.6 0v1.5l-2.4.9z" fill="#fff" />]].map(([bg, icon], i) => (
            <span key={i} style={{ width: 28, height: 28, borderRadius: 14, background: bg as string, display: "grid", placeItems: "center" }}><svg viewBox="0 0 16 16" width="13">{icon}</svg></span>
          ))}
        </div>
      </div>
      {/* live transcript */}
      <div className="sv-card sv-float2" style={{ left: 316, top: 64, width: 238, padding: "12px 12px 10px", minHeight: 198 }}>
        <div style={{ fontSize: 8, fontWeight: 600, color: ink, display: "flex", justifyContent: "space-between" }}>{c.tr}<span style={{ fontWeight: 400, color: "#8A8C90" }}>{locale.toUpperCase()} · AI</span></div>
        {c.lines.map((l, i) => {
          const ai = i % 2 === 1;
          return (
            <div key={i} className={`sv-l${i}`} style={{ display: "flex", gap: 6, marginTop: 8, flexDirection: ai ? "row" : "row-reverse" }}>
              <span style={{ width: 16, height: 16, borderRadius: 8, flex: "none", display: "grid", placeItems: "center", background: ai ? ink : "#E9E4FF", color: ai ? "#fff" : "#4B3BC2", fontSize: 7, fontWeight: 600 }}>
                {ai ? <svg viewBox="0 0 66 76" width="7"><path d={MARK} fill="#F4F2ED" /></svg> : "C"}
              </span>
              <span style={{ fontSize: 8, lineHeight: 1.4, color: ink, background: ai ? "#F3F2EF" : "#EFEBFF", padding: "5px 8px", borderRadius: ai ? "3px 10px 10px 10px" : "10px 3px 10px 10px", maxWidth: 176 }}>{l}</span>
            </div>
          );
        })}
      </div>
      {/* result */}
      <div className="sv-card sv-l4" style={{ left: 316, top: 280, width: 238, padding: "9px 11px", display: "flex", alignItems: "center", gap: 9, borderRadius: 12 }}>
        <span style={{ width: 24, height: 24, borderRadius: 7, background: "#E9E4FF", color: "#4B3BC2", display: "grid", placeItems: "center", flex: "none" }}>
          <svg viewBox="0 0 16 16" width="12"><rect x="2" y="3" width="12" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.4" /></svg>
        </span>
        <div style={{ fontSize: 8, color: ink }}><div style={{ fontWeight: 600 }}>{c.done}</div><div style={{ color: "#5B5E63", marginTop: 2 }}>{c.doneSub}</div></div>
      </div>
    </Visual>
  );
}

/* ─────────────── 04 · Integrations: the apps take turns in the middle ─────────────── */
type Kind = "hantari" | "cal" | "mail" | "inv" | "shop" | "chat" | "db" | "pay";
const AppIcon = ({ kind, size = 34 }: { kind: Kind; size?: number }) => {
  if (kind === "hantari") return <svg viewBox="0 0 36 36" width={size} height={size}><rect width="36" height="36" rx="9" fill={ink} /><svg x="10.5" y="9" width="15" height="18" viewBox="0 0 66 76"><path d={MARK} fill="#F4F2ED" /></svg></svg>;
  const k = {
    cal: ["#FFFFFF", <g key="c"><rect x="7" y="9" width="22" height="20" rx="4" fill="#fff" stroke="#E4E1DA" /><rect x="7" y="9" width="22" height="7" rx="3" fill="#E34B3F" /><text x="18" y="26.5" textAnchor="middle" fontSize="10" fontWeight="700" fill={ink} fontFamily="system-ui">24</text></g>],
    mail: ["#2D7FF9", <g key="m"><rect x="7" y="10" width="22" height="16" rx="3" fill="#fff" /><path d="M8 11.5l10 7.5 10-7.5" fill="none" stroke="#2D7FF9" strokeWidth="2" /></g>],
    inv: ["#1F9D6B", <g key="i"><path d="M11 7h11l5 5v17H11z" fill="#fff" /><path d="M14 17h10M14 21h10M14 25h6" stroke="#1F9D6B" strokeWidth="1.8" /></g>],
    shop: ["#E0B000", <g key="s"><path d="M9 14h18l-2 13H11z" fill="#fff" /><path d="M14 14a4 4 0 0 1 8 0" fill="none" stroke="#fff" strokeWidth="2" /></g>],
    chat: ["#25C16F", <g key="h"><path d="M18 8c6 0 10 4 10 9s-4 9-10 9c-1.6 0-3-.3-4.3-.8L9 27l1.4-4.2C9 21.2 8 19.2 8 17c0-5 4-9 10-9z" fill="#fff" /></g>],
    db: ["#6A4FD8", <g key="d"><ellipse cx="18" cy="11" rx="8" ry="3" fill="#fff" /><path d="M10 11v14c0 1.7 3.6 3 8 3s8-1.3 8-3V11" fill="none" stroke="#fff" strokeWidth="2" /><path d="M10 18c0 1.7 3.6 3 8 3s8-1.3 8-3" fill="none" stroke="#fff" strokeWidth="2" /></g>],
    pay: ["#1B1F3B", <g key="p"><rect x="7" y="11" width="22" height="15" rx="3" fill="#fff" /><rect x="7" y="14" width="22" height="3" fill="#1B1F3B" /><rect x="10" y="20" width="7" height="2.5" rx="1" fill="#8FA6F0" /></g>],
  }[kind];
  return <svg viewBox="0 0 36 36" width={size} height={size}><rect width="36" height="36" rx="9" fill={k[0] as string} />{k[1]}</svg>;
};

const ORDER: Kind[] = ["hantari", "mail", "inv", "cal", "chat", "db", "pay", "shop"];

export function IntegrationsVisual({ locale }: { locale?: Locale }) {
  const active = useLocale() as Locale;
  locale = locale ?? active;
  const c = T[locale].int;
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (ref.current?.closest("[data-paused]")) return; // off-screen: hold still
      setIdx((i) => (i + 1) % ORDER.length);
    }, 2600);
    return () => clearInterval(t);
  }, []);
  const N = ORDER.length;
  const centre = ORDER[idx];
  return (
    <Visual bg={BG.mint} label={c.msg.hantari[1]} crop={[520, 325]}>
      <div ref={ref} className="sv-rail">
        {ORDER.map((k, i) => {
          let d = (((i - idx) % N) + N) % N; // 0 … N-1
          if (d > 4) d -= N;                // -3 … 4 (4 = parked off to the right)
          const a = Math.abs(d);
          const wrap = d === 4;
          return (
            <div key={k} className={`sv-slot${d === 0 ? " is-centre" : ""}`} style={{
              left: 320 + d * 84,
              transform: `translate(-50%,-50%) scale(${[1.42, 0.92, 0.78, 0.64, 0.5][a]})`,
              opacity: [1, 1, 0.82, 0.38, 0][a],
              transition: wrap ? "none" : undefined,
              zIndex: 5 - a,
            }}><AppIcon kind={k} /></div>
          );
        })}
      </div>
      <div className="sv-card sv-float2" style={{ left: 180, top: 254, width: 280, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10, borderRadius: 14 }}>
        <span style={{ flex: "none" }}><AppIcon kind={centre} size={26} /></span>
        <div key={centre} className="sv-swap" style={{ fontSize: 8.5, color: ink }}>
          <div style={{ fontWeight: 600 }}>{c.msg[centre][0]} · <span style={{ fontWeight: 400, color: "#5B5E63" }}>{c.ok}</span></div>
          <div style={{ color: "#5B5E63", marginTop: 2 }}>{c.msg[centre][1]}</div>
        </div>
      </div>
    </Visual>
  );
}

/* ─────────────── 05 · Modernisation ─────────────── */
export function ModernVisual({ locale }: { locale?: Locale }) {
  const active = useLocale() as Locale;
  locale = locale ?? active;
  const c = T[locale].mod;
  const stock = [[78, `126 ${c.unit}`], [42, `54 ${c.unit}`], [91, `310 ${c.unit}`]] as const;
  return (
    <Visual bg={BG.stone} label={c.neu} crop={[520, 325]}>
      <div style={{ position: "absolute", left: 92, top: 70, width: 290, height: 230, background: "#D4D0C8", border: "2px solid", borderColor: "#FFFFFF #808080 #808080 #FFFFFF", boxShadow: "0 22px 40px -18px rgba(20,24,40,.5)", fontFamily: "Tahoma, Verdana, sans-serif", transform: "rotate(-3deg)", filter: "saturate(.9)" }}>
        <div style={{ background: "linear-gradient(90deg,#0A246A,#A6CAF0)", color: "#fff", fontSize: 8, fontWeight: 700, padding: "3px 5px", display: "flex", justifyContent: "space-between" }}>{c.old}<span>_ □ ×</span></div>
        <div style={{ fontSize: 7, padding: "3px 5px", borderBottom: "1px solid #808080" }}>{c.menu}</div>
        <div style={{ padding: 6 }}>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} style={{ display: "flex", gap: 2, marginTop: 2 }}>
              {[96, 50, 40, 60].map((w, j) => <span key={j} style={{ width: w, height: 13, background: i === 0 ? "#D4D0C8" : "#fff", border: "1px solid #808080", fontSize: 6.5, lineHeight: "12px", paddingLeft: 2, overflow: "hidden", whiteSpace: "nowrap" }}>{i === 0 ? c.cols[j] : j === 0 ? c.rows[i - 1] : ""}</span>)}
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", left: 6, bottom: -18, fontSize: 8, fontFamily: SANS, color: "#3A4255", letterSpacing: ".12em" }}>{c.before.toUpperCase()}</div>
      </div>
      <div className="sv-card sv-float" style={{ left: 300, top: 92, width: 250, padding: "14px 16px", borderRadius: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontSize: 12, fontWeight: 600, color: ink }}>{c.neu}</span><span style={{ fontSize: 7, color: signal, letterSpacing: ".12em" }}>{c.after.toUpperCase()}</span></div>
        {c.items.map((name, i) => (
          <div key={name} style={{ marginTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 8.5, color: ink }}><span>{name}</span><span style={{ color: "#5B5E63", fontFamily: MONO, fontSize: 7.5 }}>{stock[i][1]}</span></div>
            <div style={{ height: 6, borderRadius: 3, background: "#EEF1FB", marginTop: 5, overflow: "hidden" }}><div className="sv-grow" style={{ width: `${stock[i][0]}%`, height: "100%", borderRadius: 3, background: i === 1 ? "#E0485A" : signal, animationDelay: `${i * 0.25}s` }} /></div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
          {["Excel", "PDF", "API"].map((x) => <span key={x} style={{ fontSize: 7.5, color: "#5B5E63", border: "1px solid #E4E1DA", borderRadius: 7, padding: "3px 8px" }}>{x}</span>)}
        </div>
      </div>
    </Visual>
  );
}

/* ─────────────── Banner · ideas into light ─────────────── */
const NARROW_BANNER: Narrow = { below: 1.4, crop: [560, 600], cx: 755, cy: 236 };
export function IdeasBanner({ locale, title }: { locale?: Locale; title: ReactNode }) {
  const active = useLocale() as Locale;
  locale = locale ?? active;
  const c = T[locale].idea;
  return (
    <div className="sv-banner">
      <Visual bg={BG.dawn} w={1100} h={360} narrow={NARROW_BANNER} label={typeof title === "string" ? title : c.step}>
        <div className="sv-note sv-float" style={{ left: 520, top: 92, width: 170 }}>
          <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, lineHeight: 1.2, color: "#2A2A33" }}>{c.note}</div>
          <svg viewBox="0 0 120 40" width="110" style={{ marginTop: 6 }}><rect x="4" y="6" width="30" height="26" rx="3" fill="none" stroke="#2A2A33" strokeWidth="1.4" /><path d="M10 14h18M10 20h12" stroke="#2A2A33" strokeWidth="1.2" /><path d="M44 19c12-8 26-8 38 0" fill="none" stroke="#2A2A33" strokeWidth="1.4" strokeDasharray="3 3" /><circle cx="98" cy="19" r="9" fill="none" stroke="#2A2A33" strokeWidth="1.4" /><path d="M98 13v6l4 3" stroke="#2A2A33" strokeWidth="1.2" fill="none" /></svg>
        </div>
        <svg viewBox="0 0 120 60" width="120" style={{ position: "absolute", left: 700, top: 150 }} className="sv-arrow"><path d="M4 40C34 6 74 4 112 26" fill="none" stroke="#FFF7E6" strokeWidth="2" strokeDasharray="4 5" strokeLinecap="round" /><path d="M104 18l9 8-11 4" fill="none" stroke="#FFF7E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div className="sv-phone sv-float2" style={{ left: 842, top: 44, width: 150, height: 290 }}>
          <div className="sv-notch" />
          <div style={{ padding: "30px 12px 0", fontSize: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: ink, fontFamily: SERIF }}>{c.app}</div>
            <div style={{ fontSize: 7.5, color: "#8A8C90", marginTop: 2 }}>{c.svc}</div>
            <div style={{ fontSize: 8.5, fontWeight: 600, color: ink, marginTop: 12 }}>{c.slot}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5, marginTop: 7 }}>
              {["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"].map((t, i) => <span key={t} className={i === 3 ? "sv-pick" : undefined} style={{ fontSize: 7.5, textAlign: "center", padding: "5px 0", borderRadius: 7, border: "1px solid #E4E1DA", background: i === 3 ? ink : "#fff", color: i === 3 ? "#fff" : i === 1 ? "#C8C5BE" : ink }}>{t}</span>)}
            </div>
            <div style={{ marginTop: 12, background: "#F7F6F2", borderRadius: 9, padding: 8, display: "flex", gap: 7, alignItems: "center" }}>
              <span style={{ width: 22, height: 22, borderRadius: 11, background: "linear-gradient(135deg,#D9956B,#BD5B83)" }} />
              <div><div style={{ fontWeight: 600, color: ink }}>Ana</div><div style={{ fontSize: 7, color: "#8A8C90" }}>★ 4,9 · 128</div></div>
            </div>
            <div style={{ marginTop: 14, background: ink, color: "#fff", textAlign: "center", borderRadius: 9, padding: "8px 0", fontWeight: 500 }}>{c.btn}</div>
          </div>
        </div>
      </Visual>
      <div className="sv-banner-copy"><div className="sv-banner-eyebrow">{c.step}</div><div className="sv-banner-title">{title}</div></div>
    </div>
  );
}

const MARK = "M1.933 2.532A2.6 2.6 0 0 1 4.532 0L12.468 0A2.6 2.6 0 0 1 15.067 2.532L15.75 28.495A3.6 3.6 0 0 0 19.349 32L46.651 32A3.6 3.6 0 0 0 50.25 28.495L50.933 2.532A2.6 2.6 0 0 1 53.532 0L61.468 0A2.6 2.6 0 0 1 64.067 2.532L65.93 73.332A2.6 2.6 0 0 1 63.331 76L51.669 76A2.6 2.6 0 0 1 49.07 73.332L49.745 47.695A3.6 3.6 0 0 0 46.146 44L19.854 44A3.6 3.6 0 0 0 16.255 47.695L16.93 73.332A2.6 2.6 0 0 1 14.331 76L2.669 76A2.6 2.6 0 0 1 0.07 73.332Z";

/* ─────────────── styles ─────────────── */
const CSS = `
.sv{position:absolute;inset:0;overflow:hidden;isolation:isolate;font-family:${SANS}}
.sv-grain{position:absolute;inset:0;opacity:.22;mix-blend-mode:overlay;pointer-events:none;z-index:0}
.sv-stage{position:absolute;left:50%;top:50%;transform:scale(var(--sv-k,.5));transform-origin:50% 50%;z-index:1}
.sv-stage>div>*{position:absolute}
.sv-win,.sv-card,.sv-phone,.sv-note{box-shadow:0 1px 1px rgba(16,24,40,.04),0 4px 10px -2px rgba(16,24,40,.08),0 26px 50px -18px rgba(16,24,40,.38)}
.sv-win{background:#fff;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.7)}
.sv-chrome{height:24px;display:flex;align-items:center;gap:5px;padding:0 10px;background:#F4F3F0;border-bottom:1px solid #ECEAE5}
.sv-chrome i{width:7px;height:7px;border-radius:50%;background:#E8695E}.sv-chrome i:nth-child(2){background:#E9B949}.sv-chrome i:nth-child(3){background:#5DBB63}
.sv-chrome span{margin-left:10px;flex:1;max-width:220px;height:15px;border-radius:8px;background:#fff;font:400 7.5px/15px ${MONO};color:#7A7C80;padding:0 9px}
.sv-card{background:rgba(255,255,255,.96);border-radius:14px;border:1px solid rgba(255,255,255,.9);backdrop-filter:blur(6px)}
.sv-phone{background:#fff;border-radius:26px;border:5px solid #121317;overflow:hidden}
.sv-notch{position:absolute;left:50%;top:6px;width:42px;height:12px;margin-left:-21px;border-radius:7px;background:#121317}
.sv-note{background:#FFF6C9;padding:14px 14px 10px;border-radius:3px;transform:rotate(-4deg)}
.sv-float{animation:sv-float 7s ease-in-out infinite alternate}
.sv-float2{animation:sv-float 8s ease-in-out -3s infinite alternate}
.sv-newrow{animation:sv-newrow 5s ease-in-out infinite}
.sv-live{width:6px;height:6px;border-radius:50%;background:#2FB36A;display:inline-block;animation:sv-pulse 1.8s ease-out infinite}
.sv-progress{width:100%;background:${signal};border-radius:1px;animation:sv-progress 4.4s ease-in-out infinite}
.sv-tick{width:15px;height:15px;border-radius:50%;background:#2FB36A;color:#fff;font-size:8px;display:grid;place-items:center;animation:sv-tick 4.4s ease-in-out infinite}
.sv-stream{animation:sv-stream 5s ease-in-out infinite}
.sv-caret{display:inline-block;width:1.5px;height:11px;background:${ink};margin-left:2px;vertical-align:-2px;animation:sv-blink 1s steps(1) infinite}
.sv-rail{left:0;top:0;width:640px;height:400px}
.sv-slot{position:absolute;top:150px;width:74px;height:74px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.5);border:1px solid rgba(255,255,255,.8);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:0 14px 30px -14px rgba(16,60,60,.45);transition:left .9s cubic-bezier(.6,0,.2,1),transform .9s cubic-bezier(.6,0,.2,1),opacity .9s,background .9s,box-shadow .9s}
.sv-slot.is-centre{background:#fff;box-shadow:0 0 0 8px rgba(255,255,255,.35),0 24px 50px -18px rgba(16,60,60,.5)}
.sv-swap{animation:sv-swap .6s both}
.sv-call{background:radial-gradient(120% 80% at 50% 35%,#2B3577 0%,#141833 72%);border-radius:18px;padding:14px;border:1px solid rgba(255,255,255,.08);box-shadow:0 1px 1px rgba(16,24,40,.04),0 26px 50px -18px rgba(16,16,60,.55)}
.sv-orb{position:relative;width:70px;height:70px;margin:16px auto 0}
.sv-orb span{position:absolute;inset:0;border-radius:50%;background:radial-gradient(circle at 35% 32%,#EEF0FF,#9C8CFF 42%,#4B3BC2 80%)}
.sv-orb span:nth-child(1),.sv-orb span:nth-child(2){animation:sv-ring 2.6s ease-out infinite}
.sv-orb span:nth-child(2){animation-delay:1.3s}
.sv-orb span:nth-child(3){animation:sv-breathe 1.4s ease-in-out infinite alternate;box-shadow:0 0 30px rgba(156,140,255,.55)}
.sv-wave{display:block;width:3px;height:24px;border-radius:2px;background:linear-gradient(#C9BEFF,#7BE3A6);animation:sv-wave .9s ease-in-out infinite alternate}
.sv-l0{animation:sv-l0 14s ease-out infinite}@keyframes sv-l0{0%,2.9%{opacity:0;transform:translateY(6px)}5.9%,91%{opacity:1;transform:none}96%,100%{opacity:0;transform:none}}
.sv-l1{animation:sv-l1 14s ease-out infinite}@keyframes sv-l1{0%,18.6%{opacity:0;transform:translateY(6px)}21.6%,91%{opacity:1;transform:none}96%,100%{opacity:0;transform:none}}
.sv-l2{animation:sv-l2 14s ease-out infinite}@keyframes sv-l2{0%,34.3%{opacity:0;transform:translateY(6px)}37.3%,91%{opacity:1;transform:none}96%,100%{opacity:0;transform:none}}
.sv-l3{animation:sv-l3 14s ease-out infinite}@keyframes sv-l3{0%,50.0%{opacity:0;transform:translateY(6px)}53.0%,91%{opacity:1;transform:none}96%,100%{opacity:0;transform:none}}
.sv-l4{animation:sv-l4 14s ease-out infinite}@keyframes sv-l4{0%,64.3%{opacity:0;transform:translateY(6px)}67.3%,91%{opacity:1;transform:none}96%,100%{opacity:0;transform:none}}
.sv-chip{font-size:8.5px;padding:6px 10px;border-radius:14px;border:1px solid;transition:background .3s,color .3s,border-color .3s}
.sv-field{display:flex;align-items:center;min-height:26px;margin-top:5px;padding:6px 9px;border:1px solid #E4E1DA;border-radius:8px;background:#fff;font-size:9px;color:${ink}}
.sv-btn{font-size:9px;font-weight:500;background:${ink};color:#fff;padding:8px 13px;border-radius:8px;transition:transform .15s,background .15s}
.sv-btn.is-send{background:${signal}}
.sv-btn.is-press{transform:scale(.94);background:#3A3C42}
.sv-btn.is-send.is-press{background:#2440A6}
.sv-okring{width:46px;height:46px;border-radius:50%;background:#2FB36A;display:grid;place-items:center;animation:sv-okring 1.6s ease-out infinite}
@keyframes sv-okring{0%{box-shadow:0 0 0 0 rgba(47,179,106,.45)}100%{box-shadow:0 0 0 14px rgba(47,179,106,0)}}
.sv-grow{transform-origin:left;animation:sv-grow 5s ease-in-out infinite alternate}
.sv-pick{animation:sv-pick 2.6s ease-in-out infinite}
.sv-arrow path:first-child{animation:sv-dash 3s linear infinite}
.sv-banner{position:relative;width:100%;height:100%;overflow:hidden}
.sv-banner-copy{position:absolute;left:clamp(20px,4%,44px);bottom:clamp(18px,9%,40px);z-index:3;color:#FFF7EC;max-width:46%}
.sv-banner-eyebrow{font:400 11px/1 ${MONO};letter-spacing:.2em;text-transform:uppercase;opacity:.75}
.sv-banner-title{font:400 clamp(22px,3vw,40px)/1.08 ${SERIF};margin-top:10px}
.sv[data-paused] *{animation-play-state:paused!important}
@keyframes sv-float{from{translate:0 0}to{translate:0 -7px}}
@keyframes sv-newrow{0%,8%{background:rgba(46,79,196,.0)}14%,40%{background:rgba(46,79,196,.07)}60%,100%{background:rgba(46,79,196,0)}}
@keyframes sv-pulse{0%{box-shadow:0 0 0 0 rgba(47,179,106,.5)}100%{box-shadow:0 0 0 6px rgba(47,179,106,0)}}
@keyframes sv-progress{0%{height:0}75%,100%{height:100%}}
@keyframes sv-tick{0%,10%{opacity:0;transform:scale(.6)}20%,100%{opacity:1;transform:none}}
@keyframes sv-stream{0%,8%{opacity:0;transform:translateY(3px)}18%,100%{opacity:1;transform:none}}
@keyframes sv-blink{50%{opacity:0}}
@keyframes sv-swap{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
@keyframes sv-ring{from{transform:scale(1);opacity:.45}to{transform:scale(1.75);opacity:0}}
@keyframes sv-breathe{from{transform:scale(.94)}to{transform:scale(1.05)}}
@keyframes sv-wave{from{transform:scaleY(.15)}to{transform:scaleY(1)}}
@keyframes sv-grow{from{transform:scaleX(.6)}to{transform:scaleX(1)}}
@keyframes sv-pick{0%,100%{box-shadow:0 0 0 0 rgba(25,26,28,.35)}50%{box-shadow:0 0 0 4px rgba(25,26,28,0)}}
@keyframes sv-dash{to{stroke-dashoffset:-36}}
@media (max-width:700px){.sv-banner-copy{max-width:86%}}
@media (prefers-reduced-motion:reduce){.sv *{animation:none!important}}
`;

export const SERVICE_VISUALS = { apps: AppsVisual, automation: AutomationVisual, ai: AIVisual, integrations: IntegrationsVisual, modernisation: ModernVisual } as const;
export type { Locale as ServiceVisualLocale };

/* ─────────────── Start page · the project form filling itself in ─────────────── */
const F = {
  ro: { step: "Pasul {n} din 3", s1: "Cu ce te putem ajuta?", opts: ["Aplicații", "Automatizare", "Soluții AI", "Integrări", "Modernizare"], next: "Continuă", s2: "Povestește-ne.", label2: "Ce ai în minte?", text: "Vrem ca clienții să-și facă singuri programările online și să primească reminder pe SMS.", s3: "Cum te putem contacta?", name: "Nume", nameV: "Andreea Popa", emailV: "andreea@salon-ana.ro", send: "Trimite", ok: "Mulțumim!", okSub: "Îți răspundem în cel mult o zi lucrătoare.", toast: "Email de confirmare trimis", label: "Formularul de proiect, completat pas cu pas" },
  en: { step: "Step {n} of 3", s1: "How can we help?", opts: ["Apps", "Automation", "AI solutions", "Integrations", "Modernisation"], next: "Continue", s2: "Tell us about it.", label2: "What do you have in mind?", text: "We'd like customers to book online by themselves and get an SMS reminder.", s3: "How can we reach you?", name: "Name", nameV: "Anna Becker", emailV: "anna@salon-ana.com", send: "Send", ok: "Thank you!", okSub: "We'll reply within one business day.", toast: "Confirmation email sent", label: "The project form, filled in step by step" },
  es: { step: "Paso {n} de 3", s1: "¿Cómo podemos ayudarte?", opts: ["Aplicaciones", "Automatización", "IA", "Integraciones", "Modernización"], next: "Continuar", s2: "Cuéntanos.", label2: "¿Qué tienes en mente?", text: "Queremos que los clientes reserven online solos y reciban un recordatorio por SMS.", s3: "¿Cómo te contactamos?", name: "Nombre", nameV: "Lucía Gómez", emailV: "lucia@salon-ana.es", send: "Enviar", ok: "¡Gracias!", okSub: "Te respondemos en un día laborable como máximo.", toast: "Correo de confirmación enviado", label: "El formulario de proyecto, completado paso a paso" },
} as const;

// one loop, in ms: step 1 → step 2 (typing) → step 3 (contact) → sent
const LOOP = 15500;
const typed = (s: string, t: number, from: number, to: number) => s.slice(0, Math.max(0, Math.min(s.length, Math.round(((t - from) / (to - from)) * s.length))));

export function FormFillVisual({ locale }: { locale?: Locale }) {
  const active = useLocale() as Locale;
  const c = F[locale ?? active];
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(10900); // server render & reduced motion: the filled-in last step
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let now = 0;
    const id = setInterval(() => {
      if (ref.current?.closest("[data-paused]")) return;
      now = (now + 50) % LOOP;
      setT(now);
    }, 50);
    return () => clearInterval(id);
  }, []);

  const step = t < 3200 ? 1 : t < 8200 ? 2 : t < 11800 ? 3 : 4;
  const picked = [t > 900, t > 1700];
  const press = (at: number) => (t > at && t < at + 350 ? " is-press" : "");
  const caret = <span className="sv-caret" />;

  return (
    <Visual bg={BG.mist} label={c.label} crop={[360, 300]}>
      <div ref={ref} className="sv-card" style={{ left: 150, top: 62, width: 340, minHeight: 270, padding: "16px 18px", borderRadius: 16 }}>
        {step < 4 ? (
          <>
            <div style={{ fontFamily: MONO, fontSize: 7.5, letterSpacing: ".18em", color: "#5B5E63" }}>{c.step.replace("{n}", String(step)).toUpperCase()}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 4, marginTop: 8 }}>
              {[1, 2, 3].map((n) => <span key={n} style={{ height: 3, borderRadius: 2, background: n <= step ? ink : "#E4E1DA", transition: "background .4s" }} />)}
            </div>
            <div key={step} className="sv-swap">
              {step === 1 && (
                <>
                  <div style={{ fontFamily: SERIF, fontSize: 21, color: ink, marginTop: 16 }}>{c.s1}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                    {c.opts.map((o, i) => {
                      const on = (i === 1 && picked[0]) || (i === 2 && picked[1]);
                      return <span key={o} className="sv-chip" style={{ background: on ? ink : "#fff", color: on ? "#fff" : ink, borderColor: on ? ink : "#E4E1DA" }}>{on ? "✓ " : ""}{o}</span>;
                    })}
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 46 }}><span className={`sv-btn${press(2700)}`}>{c.next} →</span></div>
                </>
              )}
              {step === 2 && (
                <>
                  <div style={{ fontFamily: SERIF, fontSize: 21, color: ink, marginTop: 16 }}>{c.s2}</div>
                  <div style={{ fontSize: 8.5, fontWeight: 500, color: ink, marginTop: 12 }}>{c.label2}</div>
                  <div className="sv-field" style={{ minHeight: 70, alignItems: "flex-start", lineHeight: 1.5 }}><span>{typed(c.text, t, 3600, 7200)}{caret}</span></div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}><span className={`sv-btn${press(7700)}`}>{c.next} →</span></div>
                </>
              )}
              {step === 3 && (
                <>
                  <div style={{ fontFamily: SERIF, fontSize: 21, color: ink, marginTop: 16 }}>{c.s3}</div>
                  <div style={{ fontSize: 8.5, fontWeight: 500, color: ink, marginTop: 12 }}>{c.name}</div>
                  <div className="sv-field"><span>{typed(c.nameV, t, 8500, 9400)}{t < 9450 && caret}</span></div>
                  <div style={{ fontSize: 8.5, fontWeight: 500, color: ink, marginTop: 9 }}>Email</div>
                  <div className="sv-field"><span>{typed(c.emailV, t, 9600, 10700)}{t >= 9450 && caret}</span></div>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}><span className={`sv-btn is-send${press(11300)}`}>{c.send} →</span></div>
                </>
              )}
            </div>
          </>
        ) : (
          <div className="sv-swap" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: 54 }}>
            <span className="sv-okring"><svg viewBox="0 0 24 24" width="22"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
            <div style={{ fontFamily: SERIF, fontSize: 24, color: ink, marginTop: 16 }}>{c.ok}</div>
            <div style={{ fontSize: 9, color: "#5B5E63", marginTop: 6, maxWidth: 220 }}>{c.okSub}</div>
          </div>
        )}
      </div>
      {step === 4 && (
        <div className="sv-card sv-swap" style={{ left: 186, top: 300, width: 248, padding: "9px 11px", display: "flex", alignItems: "center", gap: 9, borderRadius: 12 }}>
          <span style={{ width: 24, height: 24, borderRadius: 7, background: "#E9EEFC", color: signal, display: "grid", placeItems: "center", flex: "none" }}>
            <svg viewBox="0 0 16 16" width="12"><rect x="1.5" y="3" width="13" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M2 4l6 5 6-5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
          </span>
          <div style={{ fontSize: 8.5, color: ink }}><div style={{ fontWeight: 600 }}>{c.toast}</div><div style={{ color: "#5B5E63", marginTop: 2 }}>{c.emailV}</div></div>
        </div>
      )}
    </Visual>
  );
}
