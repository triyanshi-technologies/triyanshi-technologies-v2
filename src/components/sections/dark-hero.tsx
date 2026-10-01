import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Badge, Highlight } from "@/components/ui/layout";
import { cn } from "@/lib/cn";

/*
 * Dark page heroes shared by service and portfolio pages: a warm top-left
 * glow over a dark gradient, with an orange hairline along the bottom edge.
 */
export function HeroBackdrop({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <section
      className={cn("relative overflow-hidden bg-linear-to-b from-ink-raised to-ink tone-dark", className)}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-[circle_at_18%_12%] from-primary/14 to-transparent to-30%"
      />
      <div className="relative z-1">{children}</div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/75 to-transparent"
      />
    </section>
  );
}

/** Wraps the last word of a headline in the accent colour (trailing period dropped). */
export function highlightLastWord(text: string): ReactNode {
  const clean = text.replace(/\.+$/, "");
  const cut = clean.lastIndexOf(" ");
  if (cut === -1) return <Highlight>{clean}</Highlight>;
  return (
    <>
      {clean.slice(0, cut)} <Highlight>{clean.slice(cut + 1)}</Highlight>
    </>
  );
}

const descriptionClass = "text-lg leading-7 text-white/68";

type CenteredHeroProps = {
  breadcrumb: Crumb[];
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
};

/** Centered hero: services/portfolio hubs and standard service pages. */
export function CenteredHero({ breadcrumb, title, description, actions }: CenteredHeroProps) {
  return (
    <HeroBackdrop className="pt-page-top pb-20 text-center">
      <Container>
        <Breadcrumb items={breadcrumb} />
        <h1 className="mx-auto max-w-205 text-heading-xl text-white">{title}</h1>
        <p className={cn("mx-auto mt-5 max-w-170", descriptionClass)}>{description}</p>
        {actions && <div className="mt-8 flex flex-wrap justify-center gap-3.5">{actions}</div>}
      </Container>
    </HeroBackdrop>
  );
}

type SplitHeroProps = {
  breadcrumb: Crumb[];
  badge: string;
  title: ReactNode;
  description: ReactNode;
  actions: ReactNode;
  image: { src: string; alt: string; width: number; height: number };
};

/** Two-column hero with a framed image: eCommerce, Enterprise Solutions, Compliance. */
export function SplitHero({ breadcrumb, badge, title, description, actions, image }: SplitHeroProps) {
  return (
    <HeroBackdrop className="pt-[calc(var(--spacing-nav)+2rem)] pb-8 max-sm:pt-[calc(var(--spacing-nav)+4rem)]">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.95fr)]">
        <div>
          <Breadcrumb items={breadcrumb} align="start" />
          <Badge>{badge}</Badge>
          <h1 className="mb-5 text-heading-xl text-white">{title}</h1>
          <p className={cn("mb-8 lg:max-w-120", descriptionClass)}>{description}</p>
          <div className="flex flex-wrap gap-3.5">{actions}</div>
        </div>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          preload
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="block h-auto w-full rounded-2xl shadow-xl"
        />
      </Container>
    </HeroBackdrop>
  );
}
