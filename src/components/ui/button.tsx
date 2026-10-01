import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/cx";

/*
 * `className` is for layout only (margins, width, alignment). It is joined,
 * not merged, so don't use it to override colours/sizes — add a variant or size.
 *
 * Buttons share one look: a translucent "glass" pill whose gradient fill
 * sweeps in from the left on hover/focus (the legacy .btn-primary/.btn-outline).
 *
 *  primary  — orange tint, fills orange          (any background)
 *  outline  — white tint, fills white            (dark backgrounds)
 *  light    — solid white, text turns orange      (dark backgrounds)
 *  solid    — filled orange gradient, dark text    (high-emphasis CTA)
 */
export type ButtonVariant = "primary" | "outline" | "light" | "solid";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg text-center font-semibold whitespace-nowrap transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-85 aria-busy:pointer-events-none aria-busy:opacity-85";

/* The ::before layer is the sweeping fill. */
const sweep =
  "backdrop-blur-md before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:rounded-[inherit] before:transition-transform before:duration-[475ms] before:ease-[ease] hover:before:scale-x-100 focus-visible:before:scale-x-100";

const variants: Record<ButtonVariant, string> = {
  primary: cx(
    sweep,
    "border border-primary/35 bg-primary/8 text-primary hover:text-white focus-visible:text-white",
    "before:bg-linear-135 before:from-accent before:via-primary before:to-primary-hover",
  ),
  outline: cx(
    sweep,
    "border border-white/50 bg-white/6 text-white hover:text-ink focus-visible:text-ink",
    "before:bg-linear-135 before:from-white before:via-surface-2 before:to-line",
  ),
  light: "border-2 border-transparent bg-white text-ink hover:bg-surface hover:text-primary",
  solid:
    "border border-primary/82 bg-linear-135 from-accent via-primary via-58% to-primary-hover text-ink shadow-[0_16px_28px_rgb(255_153_51/0.22),inset_0_1px_0_rgb(255_255_255/0.24)] hover:brightness-105",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-12 px-3.5 text-xs xl:px-5 xl:text-sm", // navbar CTA (tightens on small desktops)
  md: "h-12 px-8 text-base",
  lg: "h-14 gap-3 rounded-xl px-5 text-base", // icon + label + arrow CTAs
};

type StyleProps = { variant?: ButtonVariant; size?: ButtonSize; className?: string };

export function buttonStyles({ variant = "primary", size = "md", className }: StyleProps = {}) {
  return cx(base, variants[variant], sizes[size], className);
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="inline-block size-[0.9em] animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );
}

type ButtonProps = ComponentProps<"button"> &
  StyleProps & {
    /** Shows a spinner, disables the button and swaps the label for `loadingText`. */
    loading?: boolean;
    loadingText?: ReactNode;
  };

export function Button({
  variant,
  size,
  className,
  loading = false,
  loadingText = "Submitting...",
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <>
          <Spinner /> {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

type ButtonLinkProps = ComponentProps<typeof Link> & StyleProps;

/** A link styled as a button. External URLs (http/mailto/tel) render a plain <a>. */
export function ButtonLink({ variant, size, className, href, ...props }: ButtonLinkProps) {
  const classes = buttonStyles({ variant, size, className });
  if (typeof href === "string" && /^(https?:|mailto:|tel:)/.test(href)) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(props as ComponentProps<"a">)}
      />
    );
  }
  return <Link href={href} className={classes} {...props} />;
}
