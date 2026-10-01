"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";

const AUTOPLAY_MS = 10_000;
const TRANSITION_LOCK_MS = 700;

/*
 * Hero carousel behaviour (legacy js/hero.js): 10s autoplay, prev/next,
 * pause/resume, autoplay suspended while the tab is hidden, and a short
 * lock so rapid clicks can't interrupt a transition.
 * Slides are server-rendered children; this only toggles which one is active.
 */
export function HeroSlider({ children }: { children: ReactNode }) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const locked = useRef(false);

  const go = useCallback(
    (delta: number) => {
      if (locked.current || count < 2) return;
      locked.current = true;
      setActive((i) => (i + delta + count) % count);
      setTimeout(() => (locked.current = false), TRANSITION_LOCK_MS);
    },
    [count],
  );

  // Autoplay: restarts after every slide change; stops when paused or the tab is hidden.
  useEffect(() => {
    if (paused || count < 2) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      clearTimeout(timer);
      if (!document.hidden) timer = setTimeout(() => go(1), AUTOPLAY_MS);
    };
    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [active, paused, count, go]);

  return (
    <div className="relative max-lg:flex max-lg:flex-col">
      <div aria-live={paused ? "polite" : "off"} className="grid max-lg:overflow-hidden lg:min-h-147.5">
        {slides.map((slide, i) => {
          const isActive = i === active;
          return (
            <div
              key={i}
              aria-hidden={!isActive}
              inert={!isActive}
              className={cx(
                "col-start-1 row-start-1 mt-5 grid items-center transition-[opacity,translate] duration-650 ease-[ease] max-lg:items-start",
                isActive ? "z-2 translate-x-0 opacity-100" : "pointer-events-none translate-x-8 opacity-0",
              )}
            >
              {slide}
            </div>
          );
        })}
      </div>

      {count > 1 && (
        <div
          role="group"
          aria-label="Hero slider controls"
          className="relative z-5 mt-8 inline-flex items-center justify-center gap-3.5 max-lg:w-full max-lg:self-center max-md:mt-3 max-md:mb-4"
        >
          <ControlButton label="Show previous hero slide" onClick={() => go(-1)}>
            <span className="block size-1.5 [transform:rotate(-135deg)_translate(-1px,1px)] border-t-2 border-r-2 border-current" />
          </ControlButton>

          <ControlButton
            label={paused ? "Resume hero slider" : "Pause hero slider"}
            pressed={paused}
            onClick={() => setPaused((p) => !p)}
          >
            {paused ? (
              // Play triangle — nudged 1px right so it reads optically centred.
              <span className="block size-0 translate-x-px border-y-[6px] border-l-[11px] border-y-transparent border-l-current" />
            ) : (
              // Pause bars — second bar is a 7px box-shadow; shift left by half the gap to centre the pair.
              <span className="block h-3 w-0.75 -translate-x-[3.5px] rounded-[1px] bg-current shadow-[7px_0_0_currentColor]" />
            )}
          </ControlButton>

          <ControlButton label="Show next hero slide" onClick={() => go(1)}>
            <span className="block size-1.5 [transform:rotate(45deg)_translate(-1px,1px)] border-t-2 border-r-2 border-current" />
          </ControlButton>
        </div>
      )}
    </div>
  );
}

type ControlButtonProps = { label: string; pressed?: boolean; onClick: () => void; children: ReactNode };

function ControlButton({ label, pressed, onClick, children }: ControlButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
      className="inline-flex size-9 items-center justify-center rounded-full border border-white/22 bg-white/8 text-white transition-colors duration-300 hover:border-primary hover:text-primary focus-visible:border-primary focus-visible:text-primary"
    >
      {children}
    </button>
  );
}
