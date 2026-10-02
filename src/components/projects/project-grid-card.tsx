import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { arrowNudge, cardHover } from "@/lib/hover";
import type { Project } from "@/lib/projects/types";

export const CASE_STUDY_HREF = "/portfolio-detail/portfolio-detail";

type ProjectGridCardProps = {
  project: Project;
  /** Position within its batch, for the staggered entrance. */
  index?: number;
  /**
   * Make the whole card clickable (live site, or the case study for sample
   * projects). Off for static showcases such as eCommerce "Selected Work".
   */
  linked?: boolean;
};

function FeatureArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.72"
      aria-hidden="true"
      className="size-6 shrink-0 text-primary"
    >
      <path d="M21.71,11.29l-3-3a1,1,0,0,0-1.42,1.42L18.59,11H3a1,1,0,0,0,0,2H18.59l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3A1,1,0,0,0,21.71,11.29Z" />
    </svg>
  );
}

/** Screenshot card with industry badge, feature list and links (portfolio pages, eCommerce). */
export function ProjectGridCard({ project, index = 0, linked = true }: ProjectGridCardProps) {
  const isSample = !project.url;
  const stretched = "after:absolute after:inset-0 after:rounded-xl after:content-['']";

  return (
    <article
      style={{ animationDelay: `${index * 70}ms` }}
      className={cn(
        "group/link relative flex animate-card-up flex-col rounded-xl border border-line bg-white",
        linked && cardHover,
      )}
    >
      <div className="relative aspect-[1904/945] overflow-hidden rounded-t-[calc(var(--radius-xl)-1px)] border-b border-line bg-surface">
        <Image
          src={project.image.src}
          alt=""
          fill
          sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          placeholder={project.image.blurDataURL ? "blur" : "empty"}
          blurDataURL={project.image.blurDataURL}
          style={{ objectPosition: project.image.position }}
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-5.5 pt-5 pb-6">
        <div className="flex flex-wrap items-baseline gap-2">
          <h3 className="text-lg leading-snug font-bold text-ink">{project.name}</h3>
          {project.category && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.75 text-xs font-bold tracking-wide text-primary uppercase">
              {project.category}
            </span>
          )}
        </div>

        <ul className="grid gap-1.5">
          {project.features.slice(0, 6).map((feature) => (
            <li key={feature} className="flex min-w-0 items-center gap-1.5 text-sm leading-normal text-body">
              <FeatureArrow />
              <span className="min-w-0">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-6 pt-1.5">
          {project.domain ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-1 min-w-0 truncate text-xs font-semibold text-ink"
            >
              {project.domain}
            </a>
          ) : (
            <span />
          )}

          {linked &&
            (isSample ? (
              <Link
                href={CASE_STUDY_HREF}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-primary",
                  stretched,
                )}
              >
                View Case Study <ArrowRightIcon size={13} strokeWidth={2.5} className={arrowNudge} />
              </Link>
            ) : (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live site for ${project.name}`}
                className={cn(
                  "inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-primary",
                  stretched,
                )}
              >
                View Live Site <ArrowRightIcon size={13} strokeWidth={2.5} className={arrowNudge} />
              </a>
            ))}
        </div>
      </div>
    </article>
  );
}
