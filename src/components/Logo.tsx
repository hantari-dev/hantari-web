export function HMark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 394 492"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path fill="currentColor" d="M0 492V85L99 0V330L394 75V492H295V272L99 443V492Z" />
    </svg>
  );
}

export function Wordmark({ small = false }: { small?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <HMark className={small ? "h-[18px] w-auto" : "h-[24px] w-auto"} />
      <span
        className={`font-medium tracking-[0.22em] ${small ? "text-[12px]" : "text-[15px]"}`}
      >
        HANTARI
      </span>
    </span>
  );
}
