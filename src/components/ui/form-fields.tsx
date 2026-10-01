import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { ChevronDownIcon } from "./icons";

/*
 * Form controls (used inside client forms, hence `cx`, not `cn`). `className`
 * is for layout only. Validation state is driven by `aria-invalid`, so the
 * same attribute that informs screen readers also paints the error style.
 *
 *  md — compact fields (tool lead forms)
 *  lg — roomy fields (contact form)
 */
export type FieldSize = "md" | "lg";

const control =
  "w-full rounded-lg border border-line bg-surface text-base text-ink transition-[border-color,background-color,box-shadow] duration-300 placeholder:font-semibold placeholder:text-subtle focus:border-primary/60 focus:bg-white focus:ring-4 focus:ring-primary/12 focus:outline-none aria-invalid:border-danger/70 aria-invalid:bg-danger-soft disabled:opacity-60";

const sizes: Record<FieldSize, string> = {
  md: "px-3.5 py-3",
  lg: "px-4.5 py-4",
};

type SizeProp = { size?: FieldSize };

export function Input({
  size = "md",
  className,
  ...props
}: Omit<ComponentProps<"input">, "size"> & SizeProp) {
  return <input className={cx(control, sizes[size], className)} {...props} />;
}

export function Textarea({ size = "md", className, ...props }: ComponentProps<"textarea"> & SizeProp) {
  return (
    <textarea
      className={cx(control, sizes[size], size === "lg" ? "min-h-56" : "min-h-28", "resize-y", className)}
      {...props}
    />
  );
}

export function Select({
  size = "md",
  className,
  children,
  ...props
}: Omit<ComponentProps<"select">, "size"> & SizeProp) {
  return (
    <div className={cx("relative", className)}>
      <select className={cx(control, sizes[size], "cursor-pointer appearance-none pr-10")} {...props}>
        {children}
      </select>
      <ChevronDownIcon
        size={14}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-subtle"
      />
    </div>
  );
}

type FieldProps = {
  id: string;
  label: ReactNode;
  required?: boolean;
  /** Visually hide the label (placeholder carries it), keeping it for screen readers. */
  hideLabel?: boolean;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** Label + control + optional hint. The control itself must carry `id={id}`. */
export function Field({ id, label, required, hideLabel, hint, className, children }: FieldProps) {
  return (
    <div className={cx("grid gap-1.5", className)}>
      <label htmlFor={id} className={hideLabel ? "sr-only" : "text-sm font-semibold text-ink"}>
        {label}
        {required && (
          <span className="ml-0.5 font-semibold text-danger" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {hint && <p className="text-xs">{hint}</p>}
    </div>
  );
}

/** Form-level error message, announced to screen readers. */
export function FormError({ id, children }: { id?: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-2.5 text-sm text-danger">
      {children}
    </p>
  );
}
