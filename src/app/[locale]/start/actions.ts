"use server";

import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { getDb } from "@/lib/db";
import { leads } from "@/lib/db/schema";
import { leadSchema, type LeadInput } from "@/lib/leadSchema";
import { customerEmail, ownerEmail } from "@/lib/email/templates";
import { CONTACT_EMAIL } from "@/lib/services";

export type FieldError = "services" | "description" | "name" | "email" | "consent";

export type SubmitState =
  | { status: "idle" }
  | { status: "error"; fields: FieldError[]; form?: "generic" | "tooFast" }
  | { status: "ok"; reference: string; name: string; email: string; services: string[] };

const MIN_FILL_MS = 3000;

function fallbackReference() {
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HNT-${new Date().getFullYear()}-${rand}`;
}

async function saveLead(lead: LeadInput, locale: string): Promise<{ id: number; reference: string } | null> {
  const db = getDb();
  if (!db) return null;
  const [row] = await db
    .insert(leads)
    .values({
      reference: `tmp-${crypto.randomUUID()}`,
      locale,
      services: lead.services,
      description: lead.description,
      tools: lead.tools,
      timeline: lead.timeline,
      budget: lead.budget,
      name: lead.name,
      email: lead.email,
      company: lead.company,
      phone: lead.phone,
      replyLang: lead.replyLang,
    })
    .returning({ id: leads.id });
  const reference = `HNT-${new Date().getFullYear()}-${String(row.id).padStart(4, "0")}`;
  await db.update(leads).set({ reference }).where(eq(leads.id, row.id));
  return { id: row.id, reference };
}

async function sendEmails(lead: LeadInput, reference: string, locale: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.info(`[lead ${reference}] RESEND_API_KEY not set — skipping emails.`);
    return { owner: false, customer: false, configured: false };
  }
  const resend = new Resend(key);
  const from = process.env.EMAIL_FROM ?? "Hantari <notifications@send.hantari.ro>";
  const notifyTo = process.env.LEADS_NOTIFY_TO ?? CONTACT_EMAIL;

  const owner = ownerEmail(lead, reference, locale);
  const customer = customerEmail(lead, reference);

  const [o, c] = await Promise.allSettled([
    resend.emails.send({ from, to: notifyTo, replyTo: lead.email, ...owner }),
    resend.emails.send({ from, to: lead.email, replyTo: CONTACT_EMAIL, ...customer }),
  ]);
  const ok = (r: PromiseSettledResult<{ error: unknown }>) => r.status === "fulfilled" && !r.value.error;
  if (!ok(o) || !ok(c)) console.error(`[lead ${reference}] email problem`, o, c);
  return { owner: ok(o), customer: ok(c), configured: true };
}

export async function submitLead(_prev: SubmitState, formData: FormData): Promise<SubmitState> {
  // Honeypot: real people never see or fill this field. Pretend success for bots.
  if (String(formData.get("website") ?? "").trim()) {
    return { status: "ok", reference: fallbackReference(), name: "", email: "", services: [] };
  }

  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (startedAt && Date.now() - startedAt < MIN_FILL_MS) {
    return { status: "error", fields: [], form: "tooFast" };
  }

  const locale = formData.get("locale") === "ro" ? "ro" : "en";
  const parsed = leadSchema.safeParse({
    services: formData.getAll("services"),
    description: formData.get("description") ?? "",
    tools: formData.get("tools") ?? undefined,
    timeline: formData.get("timeline") ?? undefined,
    budget: formData.get("budget") ?? undefined,
    name: formData.get("name") ?? "",
    email: String(formData.get("email") ?? "").trim(),
    company: formData.get("company") ?? undefined,
    phone: formData.get("phone") ?? undefined,
    replyLang: formData.get("replyLang") ?? locale,
    consent: formData.get("consent") === "on",
  });

  if (!parsed.success) {
    const fields = new Set<FieldError>();
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (["services", "description", "name", "email", "consent"].includes(key)) fields.add(key as FieldError);
    }
    return { status: "error", fields: [...fields] };
  }

  const lead = parsed.data;

  try {
    // 1. Save first — the database is the source of truth.
    const saved = await saveLead(lead, locale);
    const reference = saved?.reference ?? fallbackReference();

    // 2. Then email both sides. A failed email never loses the lead.
    const sent = await sendEmails(lead, reference, locale);

    if (saved) {
      const db = getDb();
      await db?.update(leads).set({ ownerEmailSent: sent.owner, customerEmailSent: sent.customer }).where(eq(leads.id, saved.id));
    }

    // Nothing stored and nothing sent: in production that means the lead would be lost — tell the visitor.
    if (!saved && !sent.owner) {
      if (process.env.NODE_ENV === "production") {
        console.error(`[lead ${reference}] not stored and not emailed`, { name: lead.name, email: lead.email });
        return { status: "error", fields: [], form: "generic" };
      }
      console.info(`[lead ${reference}] dev mode — would have saved and emailed:`, lead);
    }

    return { status: "ok", reference, name: lead.name, email: lead.email, services: lead.services };
  } catch (err) {
    console.error("[lead] submit failed", err);
    return { status: "error", fields: [], form: "generic" };
  }
}
