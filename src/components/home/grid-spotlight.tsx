"use client";

import { useEffect } from "react";

const RADIUS = "220px";

/**
 * Pointer spotlight for a `grid-spotlight` grid rendered elsewhere (found by
 * id): while a fine pointer is over it, every cell gets the pointer position
 * relative to itself, so the dividers near the cursor glow across cells.
 */
export function GridSpotlight({ targetId }: { targetId: string }) {
  useEffect(() => {
    const grid = document.getElementById(targetId);
    if (!grid || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const cells = () => Array.from(grid.children) as HTMLElement[];
    let frame = 0;

    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        for (const cell of cells()) {
          const r = cell.getBoundingClientRect();
          cell.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
          cell.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
          cell.style.setProperty("--spot-size", RADIUS);
        }
      });
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      for (const cell of cells()) cell.style.setProperty("--spot-size", "0px");
    };

    grid.addEventListener("pointermove", move, { passive: true });
    grid.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      grid.removeEventListener("pointermove", move);
      grid.removeEventListener("pointerleave", leave);
    };
  }, [targetId]);

  return null;
}
