import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Breadcrumb, type Crumb } from "./breadcrumb";
import { Container } from "./container";
import { Eyebrow } from "./layout";

type PageHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: Crumb[];
  /** Small orange label above the title. */
  eyebrow?: string;
  /** Logo/illustration above the title (technology pages). */
  icon?: ReactNode;
  /** Buttons under the description. */
  actions?: ReactNode;
  /** Extra content under the description (meta rows…). */
  children?: ReactNode;
  className?: string;
  /** Overrides for the h1 (e.g. a smaller heading size). */
  titleClassName?: string;
  /** Layout tweaks for the description (e.g. a wider max-width). */
  descriptionClassName?: string;
};

/** Dark, centered page header used at the top of inner pages (legacy .project-header). */
export function PageHeader({
  title,
  description,
  breadcrumb,
  eyebrow,
  icon,
  actions,
  children,
  className,
  titleClassName,
  descriptionClassName,
}: PageHeaderProps) {
  return (
    <section className={cn("bg-ink pt-page-top pb-20 text-center tone-dark", className)}>
      <Container>
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
        {icon && <span className="mb-2 inline-block">{icon}</span>}
        <h1 className={cn("text-heading-xl text-white", titleClassName)}>{title}</h1>
        {description && (
          <p className={cn("mx-auto mt-6 max-w-150 text-lg leading-relaxed", descriptionClassName)}>
            {description}
          </p>
        )}
        {actions && <div className="mt-8 flex flex-wrap justify-center gap-4">{actions}</div>}
        {children}
      </Container>
    </section>
  );
}
