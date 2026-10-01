import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ChevronDownIcon } from "./icons";

/*
 * Form controls. Validation state is driven by `aria-invalid`, so the same
 * attribute that informs screen readers also paints the error style.
 */
const control =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-base text-ink transition-[border-color,background-color,box-shadow] duration-300 placeholder:font-semibold placeholder:text-subtle focus:border-primary/60 focus:bg-white focus:ring-4 focus:ring-primary/12 focus:outline-none aria-invalid:border-danger/70 aria-invalid:bg-danger-soft disabled:opacity-60";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(control, "min-h-56 resize-y", className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(control, "cursor-pointer appearance-none pr-10", className)} {...props}>
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
    <div className={cn("grid gap-1.5", className)}>
      <label htmlFor={id} className={cn("text-sm font-semibold text-ink", hideLabel && "sr-only")}>
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
