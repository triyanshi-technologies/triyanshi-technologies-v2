import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { HeroBackdrop, highlightLastWord } from "@/components/sections/dark-hero";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/layout";
import type { PortfolioPageContent, PortfolioStatIcon } from "@/content/portfolio-pages";
import { cn } from "@/lib/cn";
import { arrowNudge } from "@/lib/hover";
import type { Project } from "@/lib/projects/types";

const statIcon = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const STAT_ICONS: Record<PortfolioStatIcon, ReactNode> = {
  box: (
    <svg {...statIcon}>
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  ),
  trend: (
    <svg {...statIcon}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  clock: (
    <svg {...statIcon}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  globe: (
    <svg {...statIcon}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

/** "2X" → "2" + smaller "X" (legacy formatting for multiplier stats). */
function StatValue({ value }: { value: string }) {
  const match = /^([\d.,]+)(x)$/i.exec(value);
  if (!match) return value;
  return (
    <>
      {match[1]}
      <span className="text-[0.65em] font-bold">{match[2]}</span>
    </>
  );
}

function StartProject({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-3.5", className)}>
      <ButtonLink href="/contact-us/contact-us" className="max-sm:w-full">
        Start Your Project <ArrowRightIcon size={14} strokeWidth={2.5} className={arrowNudge} />
      </ButtonLink>
    </div>
  );
}

type PortfolioHeroProps = { page: PortfolioPageContent; projects: Project[] };

export function PortfolioHero({ page, projects }: PortfolioHeroProps) {
  return (
    <HeroBackdrop className="pt-[calc(var(--spacing-nav)+2.5rem)] pb-16 md:pt-[calc(var(--spacing-nav)+3rem)]">
      {page.slug === "shopify" && <ShopifyDecor />}
      <Container className="relative">
        <Breadcrumb
          align="start"
          items={[
            { label: "Home", href: "/" },
            { label: "Portfolio", href: "/portfolio" },
            { label: page.title },
          ]}
        />
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)] lg:gap-14">
          <div className="max-w-144">
            <Badge>{page.title}</Badge>
            <h1 className="text-heading-xl text-white">{highlightLastWord(page.headline)}</h1>
            <p className="mt-4.5 max-w-136 text-lg leading-7 text-white/68">{page.summary}</p>

            <div className="mt-9 grid max-w-140 grid-cols-2 gap-y-6 md:grid-cols-4 md:gap-y-0">
              {page.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={cn(
                    "flex flex-col items-center px-2 text-center md:px-3",
                    i % 2 === 0 && "border-r border-white/10",
                    i === 1 && "md:border-r md:border-white/10",
                    i === 0 && "md:pl-0",
                    i === page.stats.length - 1 && "md:border-r-0 md:pr-0",
                  )}
                >
                  <span className="mb-3 inline-flex text-primary">{STAT_ICONS[stat.icon]}</span>
                  <strong className="mb-1.5 block text-2xl leading-tight font-extrabold text-white">
                    <StatValue value={stat.value} />
                  </strong>
                  <span className="block text-xs leading-snug font-medium text-white/60">{stat.label}</span>
                </div>
              ))}
            </div>

            <StartProject className="mt-9 max-md:hidden" />
          </div>

          <ProjectGallery projects={projects} />
          <StartProject className="mt-2 md:hidden" />
        </div>
      </Container>
    </HeroBackdrop>
  );
}

/** Two auto-scrolling columns of browser-window screenshots (one column below 640px). */
function ProjectGallery({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  const left = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 === 1);

  return (
    <div
      aria-hidden="true"
      className="group/gallery relative z-2 mt-6 grid h-65 [transform:perspective(1200px)_rotateX(4deg)_rotateY(-10deg)_rotateZ(6deg)_scale(1.02)_translateY(-35px)] grid-cols-1 gap-5 [transform-style:preserve-3d] sm:h-80 sm:grid-cols-2 md:h-105 lg:mt-0 lg:h-145"
    >
      <GalleryColumn projects={left} direction="up" />
      <GalleryColumn
        projects={right.length ? right : left}
        direction="down"
        className="mt-6 max-sm:hidden md:mt-8"
      />
    </div>
  );
}

function GalleryColumn({
  projects,
  direction,
  className,
}: {
  projects: Project[];
  direction: "up" | "down";
  className?: string;
}) {
  // Legacy pacing: ~8.75s per card (min 30s) on desktop, 3.5s (min 16s) on phones.
  const style = {
    "--gallery-duration-lg": `${Math.max(30, projects.length * 8.75)}s`,
    "--gallery-duration-sm": `${Math.max(16, projects.length * 3.5)}s`,
  } as CSSProperties;
  // "up" starts on the first copy, "down" (reversed) on the second: load those cards first.
  const firstVisible = direction === "up" ? 0 : projects.length;

  return (
    <div
      className={cn(
        "h-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div
        style={style}
        className={cn(
          "flex w-full flex-col gap-5 pb-5 will-change-transform [--gallery-duration:var(--gallery-duration-lg)] group-hover/gallery:[animation-play-state:paused] motion-reduce:animate-none max-sm:[--gallery-duration:var(--gallery-duration-sm)]",
          // Duration comes from the per-column CSS variable, so it must be set here, not in a theme token.
          direction === "up"
            ? "animate-[gallery-up_var(--gallery-duration)_linear_infinite]"
            : "animate-[gallery-up_var(--gallery-duration)_linear_infinite_reverse]",
        )}
      >
        {/* Cards are rendered twice so the track can loop seamlessly. */}
        {[...projects, ...projects].map((project, i) => (
          <BrowserCard
            key={`${project.slug}-${i}`}
            project={project}
            eager={i >= firstVisible && i < firstVisible + 2}
          />
        ))}
      </div>
    </div>
  );
}

/** `eager`: in view on load (often the LCP image), so skip lazy loading. */
function BrowserCard({ project, eager = false }: { project: Project; eager?: boolean }) {
  return (
    <div className="group/card flex shrink-0 flex-col overflow-hidden rounded-lg border border-white/12 bg-ink-raised transition-[opacity,border-color] duration-300 group-hover/gallery:not-hover:opacity-40 hover:border-white/28">
      <div className="relative flex h-6.5 shrink-0 items-center border-b border-white/8 bg-ink-raised px-2.5">
        <div className="flex gap-1.25">
          <span className="size-1.25 rounded-full bg-window-close" />
          <span className="size-1.25 rounded-full bg-window-minimize" />
          <span className="size-1.25 rounded-full bg-window-zoom" />
        </div>
        {project.domain && (
          <span className="absolute left-1/2 max-w-32.5 -translate-x-1/2 truncate rounded-sm border border-white/5 bg-ink px-4 py-px text-center text-xs leading-tight text-cyan lowercase">
            {project.domain.replace(/^www\./, "")}
          </span>
        )}
      </div>
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-deep">
        <Image
          src={project.image.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
          loading={eager ? "eager" : "lazy"}
          style={{ objectPosition: project.image.position ?? "top" }}
          className="object-cover transition-transform duration-300 group-hover/card:scale-108"
        />
      </div>
    </div>
  );
}

/** Concentric rings + glows behind the Shopify portfolio hero. */
function ShopifyDecor() {
  const ring = "absolute top-[47%] right-[21%] translate-x-1/2 -translate-y-1/2 rounded-full";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className={cn(ring, "size-150 border border-dashed border-primary/12")} />
      <div className={cn(ring, "size-200 border border-primary/7")} />
      <div className={cn(ring, "size-250 border border-primary/3")} />
      <div className={cn(ring, "size-125 bg-radial from-primary/18 to-transparent to-70% blur-[60px]")} />
      <div className="absolute -bottom-25 left-[5%] size-87.5 rounded-full bg-radial from-primary/10 to-transparent to-70% blur-[50px]" />
    </div>
  );
}
