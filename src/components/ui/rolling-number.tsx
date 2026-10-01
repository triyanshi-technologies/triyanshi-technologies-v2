"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/lib/cx";

type RollingNumberProps = {
  value: number;
  suffix?: string;
  /** Extra delay (ms) before rolling, e.g. to stagger a row of counters. */
  delay?: number;
  className?: string;
};

/*
 * Odometer-style counter (legacy "digit roll"). Each digit is a vertical strip
 * of numerals; the strip slides up to the final digit when scrolled into view.
 * Server HTML shows the final number in place, so it is correct without JS and
 * for crawlers; JS rewinds the strips to 0 and rolls them in.
 */
export function RollingNumber({ value, suffix = "", delay = 0, className }: RollingNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const digits = String(value).split("").map(Number);

  useEffect(() => {
    const root = ref.current;
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tracks = Array.from(root.querySelectorAll<HTMLElement>("[data-track]"));
    // Jump (no transition) back to 0 so the roll starts from zero.
    root.dataset.state = "ready";
    tracks.forEach((t) => {
      t.style.transition = "none";
      t.style.translate = "0 0";
    });
    void root.offsetHeight; // commit the jump before re-enabling transitions
    tracks.forEach((t) => (t.style.transition = ""));

    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        timer = setTimeout(() => {
          root.dataset.state = "rolling";
          tracks.forEach((t) => (t.style.translate = t.dataset.final ?? ""));
        }, delay);
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <span ref={ref} role="img" aria-label={`${value}${suffix}`} className={cx("group/roll", className)}>
      <span aria-hidden="true" className="inline-flex items-end gap-[0.04em]">
        {digits.map((digit, i) => {
          // Each digit spins (i + 1) full cycles before landing, so later digits roll longer.
          const steps = (i + 1) * 10 + digit;
          return (
            <span key={i} className="inline-flex h-[1em] w-[0.7em] justify-center overflow-hidden">
              <span
                data-track=""
                data-final={`0 -${steps}em`}
                className="flex flex-col transition-[translate] duration-1350 ease-[cubic-bezier(0.2,0.85,0.2,1)] will-change-transform"
                style={{ translate: `0 -${steps}em`, transitionDelay: `${i * 90}ms` }}
              >
                {Array.from({ length: steps + 1 }, (_, n) => (
                  <span key={n} className="block h-[1em] leading-none">
                    {n % 10}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
        {suffix && (
          <span className="inline-block transition-[opacity,translate] duration-450 group-data-[state=ready]/roll:translate-y-[0.12em] group-data-[state=ready]/roll:opacity-72">
            {suffix}
          </span>
        )}
      </span>
    </span>
  );
}
