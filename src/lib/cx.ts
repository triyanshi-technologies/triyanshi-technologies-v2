/**
 * Join class names conditionally (clsx), without Tailwind conflict resolution.
 * Use in client components and wherever classes never override each other —
 * it costs <1 KB, unlike `cn` (tailwind-merge).
 */
export { clsx as cx } from "clsx";
