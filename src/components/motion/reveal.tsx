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

/**
 * Wrapper for a list of <RevealItem>s. Each item reveals on its own as it
 * scrolls into view; items that appear together (a row of cards, a carousel
 * slide) are staggered 100ms apart by <RevealScript />. That works for any
 * length and any number of columns, unlike a fixed nth-child delay table.
 */
export function RevealGroup({ as: Tag = "div", className, children, ...props }: GroupProps) {
  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
}

/*
 * Fades up when the item itself enters the viewport. The stagger delay comes
 * from --reveal-delay (set per item by the reveal script); `!` keeps it from
 * being reset by the `animation` shorthand of animate-reveal-item.
 */
const itemBase =
  "opacity-0 data-revealed:animate-reveal-item data-revealed:opacity-100 data-revealed:[animation-delay:var(--reveal-delay,0ms)]!";

export function RevealItem({ as: Tag = "div", className, children, ...props }: GroupProps) {
  return (
    <Tag data-reveal-item="" suppressHydrationWarning className={cn(itemBase, className)} {...props}>
      {children}
    </Tag>
  );
}
