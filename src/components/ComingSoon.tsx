import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/services";
import { HMark } from "./Logo";
import { DuskArt } from "./art/Art";

/** Temporary holding page, shown on every route while COMING_SOON=true. Bilingual on purpose. */
export function ComingSoon({ locale }: { locale: string }) {
  const ro = locale === "ro";
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <div className="container-page flex flex-1 flex-col justify-between gap-12 py-10 md:py-14">
        <div className="flex items-center gap-3">
          <HMark className="h-[26px] w-auto" />
          <span className="text-[15px] font-medium tracking-[0.22em]">HANTARI</span>
        </div>

        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="flex flex-col gap-7 lg:col-span-7">
            <p className="eyebrow">Software &amp; AI · Timișoara</p>
            <h1 className="font-display text-[56px] leading-[0.98] tracking-[-0.02em] md:text-[96px]">
              {ro ? "În curând." : "Coming soon."}
            </h1>
            <p className="max-w-[520px] font-display text-[20px] leading-[1.45] text-graphite md:text-[23px]">
              {ro
                ? "Un studio de software & AI pentru afaceri reale. Site-ul nostru este aproape gata."
                : "A software & AI studio for real businesses. Our new website is almost ready."}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="rounded-lg bg-ink px-[22px] py-3.5 text-[15px] font-medium text-paper transition-opacity hover:opacity-85"
              >
                {ro ? "Scrie-ne" : "Email us"} — {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <div className="relative h-[260px] overflow-hidden rounded-2xl md:h-[380px] lg:col-span-5">
            <DuskArt />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-hairline pt-6 text-sm text-graphite sm:flex-row">
          <span className="flex items-center gap-2.5">
            <span className="h-0.5 w-[22px] bg-signal" aria-hidden />
            {ro ? "Mai bine decât ieri." : "Better than yesterday."}
          </span>
          <span className="flex gap-4">
            <Link href="/en" className={ro ? "hover:text-ink" : "text-ink"} lang="en">English</Link>
            <Link href="/ro" className={ro ? "text-ink" : "hover:text-ink"} lang="ro">Română</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
