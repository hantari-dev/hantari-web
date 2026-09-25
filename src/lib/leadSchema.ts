import { z } from "zod";
import { FORM_OPTIONS } from "./services";

export const TIMELINES = ["asap", "months", "later", "exploring"] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const leadSchema = z.object({
  services: z.array(z.enum(FORM_OPTIONS)).min(1, "services"),
  description: z.string().trim().min(20, "description").max(5000),
  tools: optionalText(500),
  timeline: z.enum(TIMELINES).default("asap"),
  name: z.string().trim().min(2, "name").max(120),
  email: z.email("email").max(200),
  company: optionalText(160),
  phone: optionalText(40),
  replyLang: z.enum(["en", "ro"]),
  consent: z.literal(true, "consent"),
});

export type LeadInput = z.infer<typeof leadSchema>;
