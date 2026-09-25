import type { LeadInput } from "../leadSchema";

type Lang = "en" | "ro";

const SERVICE_NAMES: Record<Lang, Record<string, string>> = {
  en: {
    apps: "Web & desktop apps",
    automation: "Automation",
    ai: "AI solutions",
    integrations: "Integrations",
    modernisation: "Modernisation",
    unsure: "Not sure yet",
  },
  ro: {
    apps: "Aplicații web & desktop",
    automation: "Automatizare",
    ai: "Soluții AI",
    integrations: "Integrări",
    modernisation: "Modernizare",
    unsure: "Nu știu încă",
  },
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

function layout(inner: string, preheader: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;background:#F4F2ED;font-family:Helvetica,Arial,sans-serif;color:#191A1C">
<span style="display:none;max-height:0;overflow:hidden">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F2ED;padding:32px 16px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#FFFFFF;border:1px solid #D6D2C8;border-radius:14px">
<tr><td style="padding:28px 32px 8px;font-size:13px;font-weight:bold;letter-spacing:0.22em">HANTARI</td></tr>
<tr><td style="padding:8px 32px 32px;font-size:15px;line-height:1.6">${inner}</td></tr>
</table>
<p style="font-size:12px;color:#5B5E63;margin:20px 0 0">Hantari · Software &amp; AI · From Timișoara, for anywhere · <a href="https://hantari.ro" style="color:#5B5E63">hantari.ro</a></p>
</td></tr></table></body></html>`;
}

function row(label: string, value?: string) {
  if (!value) return "";
  return `<tr><td style="padding:10px 0;border-top:1px solid #E6E2D9;color:#5B5E63;width:150px;vertical-align:top">${esc(label)}</td><td style="padding:10px 0;border-top:1px solid #E6E2D9">${nl2br(value)}</td></tr>`;
}

/** Internal notification to Hantari — always in English. */
export function ownerEmail(lead: LeadInput, reference: string, locale: string) {
  const services = lead.services.map((s) => SERVICE_NAMES.en[s]).join(", ");
  const subject = `New project request ${reference} — ${lead.name}${lead.company ? ` (${lead.company})` : ""}`;
  const html = layout(
    `<h1 style="font-size:22px;font-weight:normal;margin:0 0 16px">New project request <span style="font-family:monospace">${reference}</span></h1>
<p style="margin:0 0 16px">Hit reply to answer ${esc(lead.name)} directly.</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">
${row("Name", lead.name)}${row("Email", lead.email)}${row("Company", lead.company)}${row("Phone", lead.phone)}
${row("Services", services)}${row("Description", lead.description)}${row("Tools today", lead.tools)}
${row("Timeline", lead.timeline)}${row("Reply in", lead.replyLang.toUpperCase())}${row("Site language", locale.toUpperCase())}
</table>`,
    `${lead.name}: ${services}`,
  );
  const text = [
    `New project request ${reference}`,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.company && `Company: ${lead.company}`,
    lead.phone && `Phone: ${lead.phone}`,
    `Services: ${services}`,
    `Timeline: ${lead.timeline} · Reply in: ${lead.replyLang}`,
    ``,
    lead.description,
    lead.tools && `\nTools today: ${lead.tools}`,
  ]
    .filter(Boolean)
    .join("\n");
  return { subject, html, text };
}

const COPY = {
  en: {
    subject: (ref: string) => `We’ve received your request (${ref})`,
    hello: (name: string) => `Hi ${name},`,
    body: "Thanks for getting in touch with Hantari. We’ve received your request and will reply within 1 business day — usually with a few questions or a first idea.",
    summary: "Here’s what you sent us:",
    ref: "Reference",
    services: "You asked about",
    desc: "Your message",
    reply: "If you’d like to add anything, just reply to this email.",
    sign: "Ben — Hantari",
    ethos: "Better than yesterday.",
  },
  ro: {
    subject: (ref: string) => `Am primit cererea ta (${ref})`,
    hello: (name: string) => `Bună, ${name},`,
    body: "Îți mulțumim că ne-ai scris. Am primit cererea ta și îți răspundem în cel mult o zi lucrătoare — de obicei cu câteva întrebări sau o primă idee.",
    summary: "Iată ce ne-ai trimis:",
    ref: "Referință",
    services: "Ai întrebat despre",
    desc: "Mesajul tău",
    reply: "Dacă vrei să adaugi ceva, răspunde direct la acest email.",
    sign: "Ben — Hantari",
    ethos: "Mai bine decât ieri.",
  },
} as const;

/** Confirmation to the customer, in the language they chose. */
export function customerEmail(lead: LeadInput, reference: string) {
  const lang: Lang = lead.replyLang;
  const c = COPY[lang];
  const first = lead.name.split(/\s+/)[0];
  const services = lead.services.map((s) => SERVICE_NAMES[lang][s]).join(", ");
  const html = layout(
    `<p style="margin:0 0 14px">${esc(c.hello(first))}</p>
<p style="margin:0 0 20px">${esc(c.body)}</p>
<p style="margin:0 0 8px;color:#5B5E63">${esc(c.summary)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;margin-bottom:20px">
<tr><td style="padding:10px 0;border-top:1px solid #E6E2D9;color:#5B5E63;width:150px">${esc(c.ref)}</td><td style="padding:10px 0;border-top:1px solid #E6E2D9;font-family:monospace">${reference}</td></tr>
${row(c.services, services)}${row(c.desc, lead.description)}
</table>
<p style="margin:0 0 20px">${esc(c.reply)}</p>
<p style="margin:0">${esc(c.sign)}<br><span style="color:#5B5E63">— ${esc(c.ethos)}</span></p>`,
    c.body,
  );
  const text = `${c.hello(first)}\n\n${c.body}\n\n${c.ref}: ${reference}\n${c.services}: ${services}\n\n${c.desc}:\n${lead.description}\n\n${c.reply}\n\n${c.sign}\n— ${c.ethos}`;
  return { subject: c.subject(reference), html, text };
}
