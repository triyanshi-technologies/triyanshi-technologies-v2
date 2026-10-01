import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/*
 * Animate-on-scroll, AOS-style.
 *
 *   <Reveal>…</Reveal>                         fade up (default)
 *   <Reveal variant="zoom" delay={150}>…</Reveal>
 *   <RevealGroup>                              children animate in sequence
 *     <RevealItem>…</RevealItem>
 *   </RevealGroup>
 *
 * These are server components: they only add `data-reveal` + Tailwind classes.
 * <RevealObserver /> (mounted once in the root layout) sets `data-revealed`
 * when the element scrolls into view. Without JS, a <noscript> style in the
 * layout shows everything.
 */

export type RevealVariant = "up" | "down" | "from-left" | "from-right" | "fade" | "zoom";

const hidden: Record<RevealVariant, string> = {
  up: "translate-y-7.5",
  down: "-translate-y-7.5",
  "from-left": "-translate-x-7.5",
  "from-right": "translate-x-7.5",
  fade: "",
  zoom: "scale-95",
};

const revealBase =
  "opacity-0 transition-[opacity,translate,scale] duration-800 ease-[ease] data-revealed:translate-x-0 data-revealed:translate-y-0 data-revealed:scale-100 data-revealed:opacity-100";

type RevealProps = {
  as?: ElementType;
  variant?: RevealVariant;
  /** Delay in ms before the animation starts. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
};

export function Reveal({
  as: Tag = "div",
  variant = "up",
  delay,
  className,
  style,
  children,
  ...props
}: RevealProps) {
  return (
    <Tag
      data-reveal=""
      className={cn(revealBase, hidden[variant], className)}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
      {...props}
    >
      {children}
    </Tag>
  );
}

type GroupProps = Omit<RevealProps, "variant" | "delay">;

/** Parent that triggers its <RevealItem> children together, staggered 100ms apart. */
export function RevealGroup({ as: Tag = "div", className, children, ...props }: GroupProps) {
  return (
    <Tag data-reveal="" className={cn("group/reveal", className)} {...props}>
      {children}
    </Tag>
  );
}

/* Stagger: the nth sibling waits n × 100ms (legacy .reveal-group behaviour, first 6 items). */
const itemBase =
  "translate-y-5 opacity-0 transition-[opacity,translate] duration-500 ease-[ease] group-data-revealed/reveal:translate-y-0 group-data-revealed/reveal:opacity-100 group-data-revealed/reveal:nth-1:delay-100 group-data-revealed/reveal:nth-2:delay-200 group-data-revealed/reveal:nth-3:delay-300 group-data-revealed/reveal:nth-4:delay-400 group-data-revealed/reveal:nth-5:delay-500 group-data-revealed/reveal:nth-6:delay-600";

export function RevealItem({ as: Tag = "div", className, children, ...props }: GroupProps) {
  return (
    <Tag className={cn(itemBase, className)} {...props}>
      {children}
    </Tag>
  );
}
