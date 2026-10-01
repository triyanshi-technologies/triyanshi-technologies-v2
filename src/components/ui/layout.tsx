import type { ComponentProps, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Centered 1280px content column with the standard 1rem gutter. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-site px-4", className)} {...props} />;
}

export type SectionTone = "white" | "light" | "dark" | "black";

const tones: Record<SectionTone, string> = {
  white: "bg-white",
  light: "bg-surface",
  dark: "bg-ink tone-dark",
  black: "bg-black tone-dark",
};

type SectionProps = ComponentProps<"section"> & {
  tone?: SectionTone;
  /** Wrap children in a <Container>. Default true. */
  contained?: boolean;
  containerClassName?: string;
};

/** Page section with the standard vertical rhythm (3rem) and background tone. */
export function Section({
  tone = "white",
  contained = true,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("overflow-x-clip py-12", tones[tone], className)} {...props}>
      {contained ? <Container className={containerClassName}>{children}</Container> : children}
    </section>
  );
}

/** Small orange uppercase label shown above section headings. */
export function Eyebrow({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn("mb-2 block text-sm font-semibold tracking-widest text-primary uppercase", className)}
      {...props}
    />
  );
}

type SectionTitleProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  as?: ElementType;
  align?: "center" | "left";
  className?: string;
};

/** Eyebrow + heading (+ optional intro) block that opens most sections. */
export function SectionTitle({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div className={cn("mb-12", align === "center" && "text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading className="mb-4 text-heading-lg">{title}</Heading>
      {description && (
        <p className={cn("text-lg", align === "center" && "mx-auto max-w-2xl")}>{description}</p>
      )}
    </div>
  );
}

/** Orange accent for part of a heading, e.g. <>Our <Highlight>Work</Highlight></>. */
export function Highlight({ className, ...props }: ComponentProps<"span">) {
  return <span className={cn("text-primary", className)} {...props} />;
}

/** Small pill label. */
export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "mb-4 inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
        className,
      )}
      {...props}
    />
  );
}

type CardProps = ComponentProps<"div"> & { interactive?: boolean };

/** White bordered card. `interactive` adds the lift-on-hover effect. */
export function Card({ interactive = false, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-md",
        interactive && "transition duration-300 hover:-translate-y-1.25 hover:shadow-xl",
        className,
      )}
      {...props}
    />
  );
}
