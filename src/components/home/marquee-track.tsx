"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { cx } from "@/lib/cx";
import { iconButtonHover } from "@/lib/hover";

/**
 * Endless strip that drifts on its own and can be dragged with a mouse or
 * finger. `children` must be two identical copies side by side: the offset
 * wraps at half the track width, so the loop is seamless in both directions.
 * Drifts right (content moves left → right), also while hovered; a drag
 * holds it, and the play/pause button stops it for good. Starts paused
 * for visitors who prefer reduced motion.
 */
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const subscribeReducedMotion = (onChange: () => void) => {
  const query = matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

export function MarqueeTrack({
  pxPerSecond,
  label,
  children,
}: {
  pxPerSecond: number;
  label: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  // The visitor's own play/pause choice; until they make one, follow their motion preference.
  const [choice, setChoice] = useState<boolean | null>(null);
  const playing = choice ?? !reducedMotion;
  const [dragging, setDragging] = useState(false);

  // Live values read by the animation loop without re-rendering.
  const offset = useRef(0);
  const drag = useRef<{ id: number; x: number; offset: number } | null>(null);
  const playingRef = useRef(playing);
  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100) / 1000; // clamp: no jump after a background tab
      last = now;
      const half = track.scrollWidth / 2;
      if (half > 0) {
        if (playingRef.current && !drag.current) offset.current -= pxPerSecond * dt;
        offset.current = ((offset.current % half) + half) % half;
        track.style.transform = `translate3d(${-offset.current}px,0,0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [pxPerSecond]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    drag.current = { id: e.pointerId, x: e.clientX, offset: offset.current };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (d && d.id === e.pointerId) offset.current = d.offset - (e.clientX - d.x);
  };
  const endDrag = (e: React.PointerEvent) => {
    if (drag.current?.id !== e.pointerId) return;
    drag.current = null;
    setDragging(false);
  };

  return (
    <>
      <div
        role="region"
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cx(
          // pan-y: vertical swipes still scroll the page; horizontal ones drag the strip.
          "touch-pan-y overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] py-2 select-none [&_img]:pointer-events-none",
          dragging ? "cursor-grabbing" : "cursor-grab",
        )}
      >
        <div ref={trackRef} className="flex w-max will-change-transform">
          {children}
        </div>
      </div>

      <Container className="mt-6 flex justify-center">
        <button
          type="button"
          aria-label={playing ? "Pause testimonials" : "Play testimonials"}
          aria-pressed={!playing}
          onClick={() => setChoice(!playing)}
          className={cx(
            "flex size-11 items-center justify-center rounded-full border border-line bg-white text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            iconButtonHover,
          )}
        >
          {playing ? (
            // Pause bars — second bar is a 7px box-shadow; shift left by half the gap to centre the pair.
            <span className="block h-3 w-0.75 -translate-x-[3.5px] rounded-[1px] bg-current shadow-[7px_0_0_currentColor]" />
          ) : (
            // Play triangle — nudged 1px right so it reads optically centred.
            <span className="block size-0 translate-x-px border-y-[6px] border-l-[11px] border-y-transparent border-l-current" />
          )}
        </button>
      </Container>
    </>
  );
}
