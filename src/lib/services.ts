export const SERVICE_IDS = [
  "apps",
  "automation",
  "ai",
  "integrations",
  "modernisation",
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

/** Options offered in the "Start a project" form (services + "not sure"). */
export const FORM_OPTIONS = [...SERVICE_IDS, "unsure"] as const;
export type FormOption = (typeof FORM_OPTIONS)[number];

export const CONTACT_EMAIL = "hello@hantari.ro";
