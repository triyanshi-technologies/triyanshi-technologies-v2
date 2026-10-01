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
 * <RevealScript /> (inline, end of <body> in the root layout) sets
 * `data-revealed` when the element scrolls into view — before hydration, so
 * `suppressHydrationWarning` tells React that attribute is expected. Without JS, a <noscript> style in the
 * layout shows everything.
 */

export type RevealVariant = "up" | "down" | "from-left" | "from-right" | "fade" | "zoom";

/*
 * Hidden until revealed, then a one-shot keyframe animation (globals.css).
 * Animations rather than transitions: their delays don't leak into hover
 * transitions, and once finished they leave `translate` free for hover lifts.
 */
const animations: Record<RevealVariant, string> = {
  up: "data-revealed:animate-reveal-up",
  down: "data-revealed:animate-reveal-down",
  "from-left": "data-revealed:animate-reveal-from-left",
  "from-right": "data-revealed:animate-reveal-from-right",
  fade: "data-revealed:animate-reveal-fade",
  zoom: "data-revealed:animate-reveal-zoom",
};

const revealBase = "opacity-0 data-revealed:opacity-100";

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
  const timing = delay ? { ...style, animationDelay: `${delay}ms` } : style;
  return (
    <Tag
      data-reveal=""
      suppressHydrationWarning
      className={cn(revealBase, animations[variant], className)}
      style={timing}
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
    <Tag data-reveal="" suppressHydrationWarning className={cn("group/reveal", className)} {...props}>
      {children}
    </Tag>
  );
}

/* Stagger: the nth sibling waits n × 100ms (legacy .reveal-group behaviour, first 6 items). */
const itemBase = [
  "opacity-0 group-data-revealed/reveal:animate-reveal-item group-data-revealed/reveal:opacity-100",
  "group-data-revealed/reveal:nth-1:[animation-delay:100ms] group-data-revealed/reveal:nth-2:[animation-delay:200ms]",
  "group-data-revealed/reveal:nth-3:[animation-delay:300ms] group-data-revealed/reveal:nth-4:[animation-delay:400ms]",
  "group-data-revealed/reveal:nth-5:[animation-delay:500ms] group-data-revealed/reveal:nth-6:[animation-delay:600ms]",
].join(" ");

export function RevealItem({ as: Tag = "div", className, children, ...props }: GroupProps) {
  return (
    <Tag data-reveal-item="" className={cn(itemBase, className)} {...props}>
      {children}
    </Tag>
  );
}
