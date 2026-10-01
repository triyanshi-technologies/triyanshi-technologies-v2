import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow, Section } from "@/components/ui/layout";
import { cn } from "@/lib/cn";
import { cardHover } from "@/lib/hover";

/*
 * Content sections shared by the eCommerce, Enterprise Solutions and
 * Compliance pages (and About Us): intro headings, value strips, capability
 * cards, logo/tech grids and the stats band.
 */

type IntroProps = { eyebrow: string; title: ReactNode; description?: ReactNode; className?: string };

/** Centered eyebrow + heading (+ paragraph). */
export function SectionIntro({ eyebrow, title, description, className }: IntroProps) {
  return (
    <div className={cn("mx-auto mb-8 text-center", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mb-4 text-heading-lg text-ink">{title}</h2>
      {description && <p className="mx-auto max-w-205 leading-7">{description}</p>}
    </div>
  );
}

/** Heading on the left, intro paragraph on the right. */
export function SplitHeading({ eyebrow, title, description, className }: IntroProps) {
  return (
    <Reveal className={cn("mb-10 grid items-center gap-5 lg:grid-cols-2 lg:gap-12", className)}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-heading-lg text-ink">{title}</h2>
      </div>
      {description && <p className="leading-7">{description}</p>}
    </Reveal>
  );
}

export type ValueItem = { icon: ReactNode; title: string; text: string };

/** Four short value statements separated by hairlines (4 → 2 → 1 columns). */
export function ValueStrip({ items }: { items: ValueItem[] }) {
  return (
    <div className="grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <div
          key={item.title}
          className={cn(
            "px-6 text-center",
            i > 0 && "sm:border-l sm:border-line",
            i === 2 && "sm:max-lg:border-l-0",
          )}
        >
          <span className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            {item.icon}
          </span>
          <h3 className="mb-1.5 text-base tracking-wide text-ink uppercase">{item.title}</h3>
          <p className="text-xs leading-normal">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

export function CheckBubble() {
  return (
    <span
      aria-hidden="true"
      className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 -0.5 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>
  );
}

export type Capability = { icon: ReactNode; title: string; subtitle: string; text: string; points: string[] };

/** Three capability cards with an icon, tagline, description and checklist. */
export function CapabilityGrid({ items }: { items: Capability[] }) {
  return (
    <RevealGroup className="grid items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <RevealItem
          key={item.title}
          className={cn("flex h-full flex-col rounded-xl border border-line bg-white px-7.5 py-9", cardHover)}
        >
          <span
            aria-hidden="true"
            className="mb-5 flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
          >
            {item.icon}
          </span>
          <h3 className="mb-1.5 text-lg leading-snug text-ink">{item.title}</h3>
          <p className="mb-4 text-sm font-semibold">{item.subtitle}</p>
          <p className="mb-6 leading-relaxed">{item.text}</p>
          <ul className="flex flex-col gap-3">
            {item.points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-ink">
                <CheckBubble />
                {point}
              </li>
            ))}
          </ul>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export type LogoCard =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | { kind: "icon"; icon: ReactNode; label: string; sublabel?: string };

const gridCols = {
  4: "grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  8: "grid-cols-2 sm:grid-cols-4 xl:grid-cols-8",
};

/** Bordered cards holding a logo image or an icon + label (platforms, standards, tech stack). */
/** `logoSize`: "sm" for wide wordmarks (2rem tall), "md" for square badges (4rem). */
export function LogoGrid({
  items,
  columns,
  logoSize = "md",
}: {
  items: LogoCard[];
  columns: keyof typeof gridCols;
  logoSize?: "sm" | "md";
}) {
  return (
    <RevealGroup className={cn("grid gap-3.5", gridCols[columns])}>
      {items.map((item) => (
        <RevealItem
          key={item.kind === "image" ? item.src : item.label}
          className={cn(
            "flex items-center justify-center gap-2.5 rounded-xl border border-line bg-white px-3 py-4 shadow-[0_2px_8px_rgb(0_0_0/0.03)]",
            cardHover,
            item.kind === "image" && "min-h-22",
          )}
        >
          {item.kind === "image" ? (
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className={cn(
                "h-auto w-auto max-w-full object-contain",
                logoSize === "sm" ? "max-h-8" : "max-h-16",
              )}
            />
          ) : (
            <>
              <span aria-hidden="true" className="inline-flex shrink-0">
                {item.icon}
              </span>
              {item.sublabel ? (
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-base font-bold tracking-tight text-ink">{item.label}</span>
                  <span className="text-xs font-semibold tracking-wider uppercase">{item.sublabel}</span>
                </span>
              ) : (
                <span className="text-base font-bold tracking-tight whitespace-nowrap text-ink">
                  {item.label}
                </span>
              )}
            </>
          )}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

export type StatItem = { icon: ReactNode; value: string; label: string };

/** "Built for growth" stats band: icon + figure + label, divided by hairlines. */
export function StatsBand({ title, items }: { title: ReactNode; items: StatItem[] }) {
  return (
    <Section className="py-8">
      <Reveal className="text-center">
        <h2 className="mb-6 text-heading-lg text-ink">{title}</h2>
        <div className="grid grid-cols-2 lg:flex lg:items-center lg:justify-between">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={cn(
                // 2×2 grid below lg, single row from lg; hairlines between items.
                "flex items-center gap-3.5 border-line px-5 py-6 text-left lg:border-t-0 lg:py-0",
                i % 2 === 0 ? "pl-0 lg:pl-5" : "border-l",
                i >= 2 && "border-t",
                i > 0 && "lg:border-l",
              )}
            >
              <span aria-hidden="true" className="inline-flex shrink-0 text-primary [&_svg]:size-8">
                {item.icon}
              </span>
              <span className="flex flex-col">
                <strong className="text-2xl leading-tight text-ink">{item.value}</strong>
                <span className="mt-1 text-sm leading-snug text-body">{item.label}</span>
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
