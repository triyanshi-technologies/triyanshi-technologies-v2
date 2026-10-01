"use client";

import { useEffect, useRef } from "react";

type TweenedNumberProps = {
  value: number;
  format: (n: number) => string;
  /** Tween length in ms (ease-out cubic). */
  duration?: number;
  className?: string;
};

/**
 * Number that eases from its previous value to the new one. Writes to the DOM
 * directly (no re-render per frame); jumps straight there with reduced motion.
 */
export function TweenedNumber({ value, format, duration = 220, className }: TweenedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);
  const formatRef = useRef(format);

  useEffect(() => {
    formatRef.current = format;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const from = shown.current;
    const render = (n: number) => {
      shown.current = n;
      el.textContent = formatRef.current(n);
    };
    if (from === value || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(value);
      return;
    }
    let frame = 0;
    let start: number | undefined;
    const step = (now: number) => {
      start ??= now;
      const progress = Math.min((now - start) / duration, 1);
      render(from + (value - from) * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
