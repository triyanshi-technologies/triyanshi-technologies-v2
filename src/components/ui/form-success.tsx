"use client";

import { useEffect, useRef, type ReactNode } from "react";

type FormSuccessProps = {
  title: string;
  message: ReactNode;
  /** Small follow-up line, e.g. "We'll reply to you@example.com." */
  note?: ReactNode;
  /** Extra content under the note (next-step lists on the tool forms). */
  children?: ReactNode;
};

/** "Request received" panel that replaces a form after a successful submit. Takes focus on mount. */
export function FormSuccess({ title, message, note, children }: FormSuccessProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);

  return (
    <div
      ref={ref}
      role="status"
      tabIndex={-1}
      className="grid animate-[card-in_420ms_ease-out_both] justify-items-center gap-4.5 rounded-[14px] border border-line bg-white bg-radial-[120%_140%_at_50%_-10%] from-primary/10 to-transparent to-60% px-6 py-11 text-center focus:outline-none"
    >
      <span
        aria-hidden="true"
        className="relative grid size-15 place-items-center text-primary before:absolute before:inset-0 before:animate-seal-pulse before:rounded-full before:bg-primary/12"
      >
        <svg
          width="52"
          height="52"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            pathLength="1"
            className="animate-draw [stroke-dasharray:1] [stroke-dashoffset:1]"
          />
          <path
            d="m9 12 2 2 4-4"
            pathLength="1"
            className="animate-draw-late [stroke-dasharray:1] [stroke-dashoffset:1]"
          />
        </svg>
      </span>
      <h3 className="text-xl text-ink">{title}</h3>
      <p className="max-w-105">{message}</p>
      {note && <p className="max-w-105 text-sm">{note}</p>}
      {children}
    </div>
  );
}
