import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/cx";

/*
 * Shared building blocks for the /tools pages. Plain `cx` (no tailwind-merge)
 * so they can be used inside the client-side tool widgets. `className` is for
 * layout only.
 */

/** White tool panel: orange-tinted border (`accent`, the tool itself) or grey (`plain`, side panels). */
export function ToolCard({
  tone = "accent",
  className,
  ...props
}: ComponentProps<"div"> & { tone?: "accent" | "plain" }) {
  return (
    <div
      className={cx(
        "w-full min-w-0 rounded-xl border bg-white p-6 shadow-xl md:p-8 lg:p-10",
        tone === "accent" ? "border-primary/22" : "border-line",
        className,
      )}
      {...props}
    />
  );
}

/** Small uppercase orange label above a card title. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="mb-1.5 inline-block text-xs font-semibold tracking-[0.06em] text-primary uppercase">
      {children}
    </span>
  );
}

/** Card heading (h2) with optional kicker. */
export function ToolCardTitle({ kicker, children }: { kicker?: string; children: ReactNode }) {
  return (
    <div>
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2 className="text-[clamp(1.3rem,2vw,1.5rem)] text-ink">{children}</h2>
    </div>
  );
}

/** Step badge ("01") used by numbered groups and questions. */
export function StepNumber({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex size-5.5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[0.72rem] font-bold text-primary-text">
      {children}
    </span>
  );
}
