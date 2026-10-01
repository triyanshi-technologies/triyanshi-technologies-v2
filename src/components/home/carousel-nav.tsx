"use client";

import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cx } from "@/lib/cx";

const GAP_PX = 16;

/**
 * Prev/next buttons for a horizontally scrolling list rendered elsewhere
 * (found by id). Scrolls one item at a time and disables at either end.
 */
export function CarouselNav({
  targetId,
  label,
  className,
}: {
  targetId: string;
  label: string;
  className?: string;
}) {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = document.getElementById(targetId);
    if (!track) return;
    const sync = () => {
      setAtStart(track.scrollLeft <= 2);
      setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 2);
    };
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [targetId]);

  const scroll = (dir: -1 | 1) => {
    const track = document.getElementById(targetId);
    const item = track?.firstElementChild;
    if (!track || !item) return;
    track.scrollBy({ left: (item.getBoundingClientRect().width + GAP_PX) * dir, behavior: "smooth" });
  };

  const button =
    "inline-flex size-11 items-center justify-center rounded-full border border-ink/25 text-ink transition-[opacity,background-color,border-color] duration-250 hover:enabled:border-primary hover:enabled:bg-primary focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-primary disabled:cursor-default disabled:opacity-35";

  return (
    <div className={cx("mt-6 flex justify-center gap-3", className)}>
      <button
        type="button"
        className={button}
        onClick={() => scroll(-1)}
        disabled={atStart}
        aria-label={`Previous ${label}`}
      >
        <ChevronDownIcon size={18} className="rotate-90" />
      </button>
      <button
        type="button"
        className={button}
        onClick={() => scroll(1)}
        disabled={atEnd}
        aria-label={`Next ${label}`}
      >
        <ChevronDownIcon size={18} className="-rotate-90" />
      </button>
    </div>
  );
}
