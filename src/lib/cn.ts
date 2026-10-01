import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
 * tailwind-merge must know the custom type scale, otherwise it reads
 * `text-heading-lg` as a colour and drops it when merged with `text-white`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["heading-sm", "heading-md", "heading-lg", "heading-xl", "display"],
    },
  },
});

/**
 * Join class names and resolve Tailwind conflicts (last wins), so callers can
 * override a component's defaults. Use in SERVER components only — importing
 * it into a client component ships tailwind-merge (~17 KB gz) to the browser.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
