# hantari-web

The website for **Hantari — Software & AI** ([hantari.ro](https://hantari.ro)).

- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · next-intl (EN/RO)
- **Forms:** Server Action → Zod validation → Neon Postgres (Drizzle) → Resend emails
- **Hosting:** Vercel · DNS on Cloudflare

## Run locally

```bash
nvm use            # Node 22 (see .nvmrc)
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000 → redirects to /en
```

Without `DATABASE_URL` and `RESEND_API_KEY`, the "Start a project" form still works locally:
submissions are printed in the terminal instead of being saved and emailed.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Route types + TypeScript |
| `npm run db:push` | Create/update the `leads` table in Neon (needs `DATABASE_URL`) |
| `npm run db:studio` | Browse leads in Drizzle Studio |

## Structure

```
messages/            en.json, ro.json — all site copy (edit text here)
src/app/[locale]/    pages: home, about, start (form), privacy
src/app/[locale]/start/actions.ts   form server action (save → email)
src/components/      Header (menus), Footer, Logo, art/ (SVG illustrations)
src/lib/             services list, validation schema, db, email templates
src/proxy.ts         locale detection + /en, /ro routing (Next 16 "proxy", formerly middleware)
```

## How a project request flows

1. Visitor fills the 3-step form at `/[locale]/start` (links like `/start?service=ai` preselect a service).
2. Server action checks the honeypot + minimum fill time, validates with Zod.
3. Lead is **saved first** in Neon (`leads` table) and gets a reference like `HNT-2026-0007`.
4. Two emails go out through Resend: a notification to `LEADS_NOTIFY_TO` (reply goes straight to the
   customer) and a confirmation to the customer in the language they chose.
5. Email delivery is recorded on the lead (`owner_email_sent`, `customer_email_sent`).

## Deploy (Vercel)

1. Import `hantari-dev/hantari-web` in Vercel (repo must be public on the Hobby plan).
2. Add environment variables from `.env.example` (Production + Preview).
3. Neon: create a project in an EU region, copy the pooled connection string into `DATABASE_URL`,
   then run `npm run db:push` once from your machine.
4. Resend: add the domain `send.hantari.ro`, add its DNS records in Cloudflare, verify, create an API key.
5. Domains: add `hantari.ro` + `www.hantari.ro` in Vercel, create the records it shows in Cloudflare
   (DNS only / grey cloud).

## Before launch — to do

- [ ] Review the Romanian copy in `messages/ro.json`
- [ ] Confirm budget ranges in the form (`messages/*.json → start.budgetOptions`)
- [ ] Review the privacy policy draft; add legal entity details in the footer once registered
- [ ] Add Cloudflare Turnstile to the form if spam appears
