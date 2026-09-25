"use client";

import { startTransition, useActionState, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FORM_OPTIONS, type FormOption } from "@/lib/services";
import { TIMELINES } from "@/lib/leadSchema";
import { submitLead, type FieldError, type SubmitState } from "./actions";

const input =
  "w-full rounded-[10px] border border-[#C9C4B8] bg-white px-4 py-[13px] text-[15px] text-ink placeholder:text-[#8A8C90] focus:border-ink focus:outline-none";
const labelCls = "flex flex-col gap-2 text-sm font-medium";

function StepForm({ initial, onRestart }: { initial: FormOption[]; onRestart: () => void }) {
  const t = useTranslations("start");
  const ts = useTranslations("services");
  const locale = useLocale();
  const [state, action, pending] = useActionState<SubmitState, FormData>(submitLead, { status: "idle" });
  const [step, setStep] = useState(1);
  const [picked, setPicked] = useState<Set<FormOption>>(new Set(initial));
  const [clientErrors, setClientErrors] = useState<FieldError[]>([]);
  const startedRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  // Records when the form was opened (simple bot check on the server).
  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);

  // When the server reports errors, jump to the first step that has one.
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    if (state.status === "error") {
      const f = state.fields;
      if (f.includes("services")) setStep(1);
      else if (f.includes("description")) setStep(2);
      else if (f.length) setStep(3);
    }
  }

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [step, state.status]);

  const errors = new Set<FieldError>([...clientErrors, ...(state.status === "error" && !pending ? state.fields : [])]);
  const err = (f: FieldError) =>
    errors.has(f) ? (
      <span role="alert" className="text-[13px] font-normal text-[#B42318]">
        {t(`errors.${f}`)}
      </span>
    ) : null;

  const toggle = (id: FormOption) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setClientErrors((e) => e.filter((x) => x !== "services"));
  };

  const next = () => {
    if (step === 1 && picked.size === 0) return setClientErrors(["services"]);
    if (step === 2 && (descRef.current?.value.trim().length ?? 0) < 20) return setClientErrors(["description"]);
    setClientErrors([]);
    setStep((s) => Math.min(3, s + 1));
  };

  if (state.status === "ok") {
    const first = state.name.split(/\s+/)[0];
    return (
      <div ref={topRef} className="flex flex-col gap-7 py-3" aria-live="polite">
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-ink">
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
            <path d="M5 11.5L9.5 16L17 7" fill="none" stroke="#F4F2ED" strokeWidth="2" />
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-[34px] leading-[1.05] md:text-[44px]">
            {t("doneTitle", { name: first ? `, ${first}` : "" })}
          </h2>
          <p className="text-[17px] leading-relaxed text-graphite">
            {t("doneText", { email: state.email || "—" })}
          </p>
        </div>
        <dl className="grid border-t border-hairline text-[15px] sm:grid-cols-[180px_1fr]">
          <dt className="border-hairline pt-4 text-graphite sm:border-b sm:py-4">{t("reference")}</dt>
          <dd className="border-b border-hairline pb-4 font-mono sm:py-4">{state.reference}</dd>
          <dt className="border-hairline pt-4 text-graphite sm:border-b sm:py-4">{t("askedAbout")}</dt>
          <dd className="border-b border-hairline pb-4 sm:py-4">
            {state.services.length ? state.services.map((s) => ts(`${s}.name`)).join(", ") : t("notSpecified")}
          </dd>
        </dl>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className="rounded-lg bg-ink px-[22px] py-3.5 text-[15px] font-medium text-paper">
            {t("backToSite")}
          </Link>
          <button type="button" onClick={onRestart} className="rounded-lg border border-[#C9C4B8] px-[22px] py-[13px] text-[15px] hover:border-ink">
            {t("another")}
          </button>
        </div>
      </div>
    );
  }

  const stepName = t(`stepNames.${step as 1 | 2 | 3}`);

  return (
    <form
      noValidate
      className="flex flex-col gap-9"
      onSubmit={(e) => {
        // Submit manually so React doesn't reset the fields if the server reports an error.
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
    >
      <div ref={topRef} className="flex flex-col gap-3.5">
        <div className="flex justify-between font-mono text-xs uppercase tracking-[0.12em] text-graphite">
          <span>{t("stepOf", { step })}</span>
          <span>{stepName}</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5" aria-hidden>
          {[1, 2, 3].map((n) => (
            <div key={n} className={`h-[3px] rounded-sm transition-colors ${step >= n ? "bg-ink" : "bg-[#DDD9CF]"}`} />
          ))}
        </div>
      </div>

      <input type="hidden" name="locale" value={locale} />
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />
      {/* Honeypot — hidden from people, tempting for bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Step 1 */}
      <fieldset hidden={step !== 1} aria-labelledby="s1-title" className="flex flex-col gap-7">
        <div className="flex flex-col gap-2">
          <h2 id="s1-title" className="font-display text-[30px] leading-tight md:text-4xl">{t("s1Title")}</h2>
          <p className="text-[15px] text-graphite">{t("s1Text")}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {FORM_OPTIONS.map((id) => {
            const on = picked.has(id);
            return (
              <label
                key={id}
                className={`flex min-h-[84px] cursor-pointer flex-col gap-1 rounded-xl px-5 py-[18px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-signal ${
                  on ? "border-[1.5px] border-ink bg-[#F1EFE9]" : "border border-hairline bg-white hover:border-[#B9B4A8]"
                }`}
              >
                <input type="checkbox" name="services" value={id} checked={on} onChange={() => toggle(id)} className="sr-only" />
                <span className="flex items-center justify-between font-medium">
                  {ts(`${id}.name`)}
                  <span
                    aria-hidden
                    className={`flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border-[1.5px] ${on ? "border-ink bg-ink" : "border-[#B9B4A8]"}`}
                  >
                    {on && (
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <path d="M2 5.2L4.2 7.4L8 3" fill="none" stroke="#F4F2ED" strokeWidth="1.6" />
                      </svg>
                    )}
                  </span>
                </span>
                <span className="text-[13px] leading-snug text-graphite">{ts(`${id}.line`)}</span>
              </label>
            );
          })}
        </div>
        {err("services")}
      </fieldset>

      {/* Step 2 */}
      <fieldset hidden={step !== 2} aria-labelledby="s2-title" className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 id="s2-title" className="font-display text-[30px] leading-tight md:text-4xl">{t("s2Title")}</h2>
          <p className="text-[15px] text-graphite">{t("s2Text")}</p>
        </div>
        <label className={labelCls}>
          {t("description")}
          <textarea
            ref={descRef}
            name="description"
            rows={6}
            maxLength={5000}
            placeholder={t("descriptionPlaceholder")}
            aria-invalid={errors.has("description")}
            onChange={() => setClientErrors((e) => e.filter((x) => x !== "description"))}
            className={`${input} resize-y font-normal leading-relaxed`}
          />
          {err("description")}
        </label>
        <label className={labelCls}>
          <span>
            {t("tools")} <span className="font-normal text-graphite">{t("optional")}</span>
          </span>
          <input type="text" name="tools" maxLength={500} placeholder={t("toolsPlaceholder")} className={`${input} font-normal`} />
        </label>
        <label className={`${labelCls} sm:max-w-[50%]`}>
          {t("timeline")}
          <select name="timeline" defaultValue="asap" className={`${input} font-normal`}>
            {TIMELINES.map((v) => (
              <option key={v} value={v}>{t(`timelineOptions.${v}`)}</option>
            ))}
          </select>
        </label>
      </fieldset>

      {/* Step 3 */}
      <fieldset hidden={step !== 3} aria-labelledby="s3-title" className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 id="s3-title" className="font-display text-[30px] leading-tight md:text-4xl">{t("s3Title")}</h2>
          <p className="text-[15px] text-graphite">{t("s3Text")}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className={labelCls}>
            {t("name")}
            <input type="text" name="name" autoComplete="name" maxLength={120} placeholder={t("namePlaceholder")} aria-invalid={errors.has("name")} className={`${input} font-normal`} />
            {err("name")}
          </label>
          <label className={labelCls}>
            {t("emailLabel")}
            <input type="email" name="email" autoComplete="email" maxLength={200} placeholder={t("emailPlaceholder")} aria-invalid={errors.has("email")} className={`${input} font-normal`} />
            {err("email")}
          </label>
          <label className={labelCls}>
            <span>
              {t("company")} <span className="font-normal text-graphite">{t("optional")}</span>
            </span>
            <input type="text" name="company" autoComplete="organization" maxLength={160} placeholder={t("companyPlaceholder")} className={`${input} font-normal`} />
          </label>
          <label className={labelCls}>
            <span>
              {t("phone")} <span className="font-normal text-graphite">{t("optional")}</span>
            </span>
            <input type="tel" name="phone" autoComplete="tel" maxLength={40} placeholder="+40 …" className={`${input} font-normal`} />
          </label>
        </div>
        {/* Replies go out in the language the visitor is browsing in */}
        <input type="hidden" name="replyLang" value={locale} />
        <label className="flex items-start gap-3 pt-1 text-sm leading-relaxed text-graphite">
          <input type="checkbox" name="consent" className="mt-0.5 h-[18px] w-[18px] shrink-0 accent-ink" aria-invalid={errors.has("consent")} />
          <span>
            {t("consent")}{" "}
            <Link href="/privacy" target="_blank" className="border-b border-ink text-ink">
              {t("privacyLink")}
            </Link>
            .
          </span>
        </label>
        {err("consent")}
      </fieldset>

      {state.status === "error" && state.form && (
        <p role="alert" className="rounded-lg border border-[#F1C9C4] bg-[#FDF3F2] px-4 py-3 text-sm text-[#B42318]">
          {t(`errors.${state.form}`)}
        </p>
      )}

      <div className="flex items-center justify-between gap-4 border-t border-[#E6E2D9] pt-7">
        {step > 1 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="px-1 py-3 text-[15px] text-graphite hover:text-ink">
            ← {t("backBtn")}
          </button>
        ) : (
          <span className="text-[13px] text-graphite">{t("selected", { count: picked.size })}</span>
        )}
        {step < 3 ? (
          <button key="next" type="button" onClick={next} className="rounded-lg bg-ink px-[26px] py-3.5 text-[15px] font-medium text-paper hover:opacity-85">
            {t("continue")}
          </button>
        ) : (
          <button key="submit" type="submit" disabled={pending} className="rounded-lg bg-ink px-[26px] py-3.5 text-[15px] font-medium text-paper hover:opacity-85 disabled:opacity-60">
            {pending ? t("sending") : t("send")}
          </button>
        )}
      </div>
    </form>
  );
}

export function StartForm({ initial }: { initial: FormOption[] }) {
  const [run, setRun] = useState(0);
  return <StepForm key={run} initial={run === 0 ? initial : []} onRestart={() => setRun((r) => r + 1)} />;
}
