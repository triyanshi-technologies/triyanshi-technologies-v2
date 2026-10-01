/*
 * The site's hover language: one effect per kind of element, so every card,
 * link and icon button responds the same way. Keyboard focus mirrors hover
 * (`focus-visible` on the element itself, `has-focus-visible` when a link
 * inside a card is focused).
 *
 * Plain class strings: safe in server and client components alike. Don't add
 * other transition/translate/border/shadow hover classes next to these, and
 * keep `opacity` out of the transition lists: a transition outranks the
 * reveal animation and would cut its staggered fade short.
 */

const focusLift = "focus-visible:-translate-y-1 has-focus-visible:-translate-y-1";

/** Cards on light surfaces: lift 4px, orange border, soft shadow. */
export const cardHover = [
  "transition-[translate,border-color,box-shadow] duration-300 ease-out",
  "hover:-translate-y-1 hover:border-primary hover:shadow-card-hover",
  focusLift,
  "focus-visible:border-primary focus-visible:shadow-card-hover has-focus-visible:border-primary has-focus-visible:shadow-card-hover",
].join(" ");

/** Cards on dark surfaces: same lift, orange-tinted border and fill. */
export const cardHoverDark = [
  "transition-[translate,border-color,background-color] duration-300 ease-out",
  "hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/8",
  focusLift,
  "focus-visible:border-primary/40 focus-visible:bg-primary/8 has-focus-visible:border-primary/40 has-focus-visible:bg-primary/8",
].join(" ");

/** Image cards whose overlay does the talking: border only, no lift. */
export const mediaCardHover =
  "transition-colors duration-300 hover:border-primary has-focus-visible:border-primary";

/**
 * Forward arrow: nudges 3px right when its `group/link` ancestor is hovered or
 * focused. Put `group/link` on the link/button, or on the whole card when the
 * card is one big link. Buttons (ui/button) carry `group/link` already.
 */
export const arrowNudge =
  "transition-transform duration-300 group-hover/link:translate-x-0.75 group-focus-visible/link:translate-x-0.75 group-has-focus-visible/link:translate-x-0.75";

/** Round icon buttons (socials, slider arrows): fill orange and lift 2px. */
export const iconButtonHover =
  "transition-[translate,background-color,border-color,color] duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white focus-visible:-translate-y-0.5 focus-visible:border-primary focus-visible:bg-primary focus-visible:text-white";
