import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";

/** Centered 1280px content column with the standard 1rem gutter. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cx("mx-auto w-full max-w-site px-4", className)} {...props} />;
}
