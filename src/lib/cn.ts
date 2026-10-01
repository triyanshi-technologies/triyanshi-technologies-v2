import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/*
 * tailwind-merge must know the custom type scale, otherwise it reads
 * `text-heading-lg` as a colour and drops it when merged with `text-white`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["2xs", "heading-sm", "heading-md", "heading-lg", "heading-xl", "display"],
    },
  },
});

/** Join class names conditionally and resolve Tailwind conflicts (last wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
