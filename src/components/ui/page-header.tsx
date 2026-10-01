import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";
import { Breadcrumb, type Crumb } from "./breadcrumb";
import { Container } from "./layout";

type PageHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  breadcrumb?: Crumb[];
  /** Extra content under the description (meta rows, CTAs…). */
  children?: ReactNode;
  className?: string;
};

/** Dark, centered page header used at the top of every inner page (legacy .project-header). */
export function PageHeader({ title, description, breadcrumb, children, className }: PageHeaderProps) {
  return (
    <section className={cn("bg-ink pt-page-top pb-20 text-center tone-dark", className)}>
      <Container>
        <Reveal>
          {breadcrumb && <Breadcrumb items={breadcrumb} />}
          <h1 className="mb-4 text-heading-lg text-white">{title}</h1>
          {description && <p className="mx-auto max-w-150 text-lg">{description}</p>}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
