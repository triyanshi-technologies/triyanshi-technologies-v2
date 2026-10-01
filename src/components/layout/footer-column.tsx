"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Footer link column: an accordion below 768px, always open above.
 * The panel is not `inert` because desktop must keep it reachable; collapsed
 * mobile panels use `invisible` so their links leave the tab order.
 */
export function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b border-white/8 py-2 last:border-b-0 md:border-0 md:p-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold text-white md:pointer-events-none md:mb-6 md:block md:w-auto md:cursor-default md:py-0"
      >
        <span>{title}</span>
        <ChevronDownIcon
          size={12}
          className={cn(
            "text-muted transition-[rotate,color] duration-250 md:hidden",
            open && "rotate-180 text-primary",
          )}
        />
      </button>
      <div
        id={panelId}
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows] duration-300 md:flex md:overflow-visible",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div
          className={cn(
            "flex min-h-0 flex-col gap-3 md:visible",
            open ? "visible pb-5 md:pb-0" : "invisible",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
