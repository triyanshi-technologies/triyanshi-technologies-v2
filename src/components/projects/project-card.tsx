"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowRightIcon, ChevronDownIcon, CloseIcon } from "@/components/ui/icons";
import { cx } from "@/lib/cx";
import type { Project } from "@/lib/projects/types";

type ProjectCardProps = {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
  /** Stagger for the entrance animation. */
  index?: number;
  sizes?: string;
};

/*
 * Screenshot card. The whole card links to the live site; the white label
 * reveals the feature list on hover (pointer devices) or via the toggle
 * button (touch). The domain link and toggle sit above the card link.
 */
export function ProjectCard({ project, expanded, onToggle, index = 0, sizes }: ProjectCardProps) {
  const detailsId = `project-${project.slug}-details`;

  return (
    <article
      style={{ animationDelay: `${index * 90}ms` } as CSSProperties}
      onKeyDown={(e) => e.key === "Escape" && expanded && onToggle()}
      className={cx(
        "group/card relative min-h-85 w-full min-w-0 animate-card-up overflow-hidden rounded-xl border border-transparent transition-colors duration-250 hover:border-primary/42",
        expanded && "border-primary/42",
      )}
    >
      <Image
        src={project.image.src}
        alt=""
        fill
        sizes={sizes ?? "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
        className="object-cover"
      />
      {/* Bottom scrim (always) + darker wash on hover */}
      <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-black/68 via-black/24 via-58% to-black/8" />
      <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-black/16 via-black/24 via-62% to-black/14 opacity-0 transition-opacity duration-220 group-hover/card:opacity-100" />

      {/* Card-wide link to the live site */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit live site for ${project.name}`}
        className="absolute inset-0 z-2 rounded-[inherit] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-primary"
      />

      <div className="pointer-events-none absolute inset-x-4 bottom-4 z-3 rounded-lg bg-white px-4 py-2.75">
        <div className="flex items-baseline gap-2">
          <h3 className="min-w-0 flex-1 truncate text-base leading-snug font-bold text-ink">
            {project.name}
          </h3>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto -mx-1 -my-1.5 shrink-0 truncate px-1 py-1.5 text-xs font-bold text-primary"
          >
            {project.domain}
          </a>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={expanded}
            aria-controls={detailsId}
            aria-label={expanded ? `Hide ${project.name} details` : `Show ${project.name} details`}
            className="pointer-events-auto flex items-center self-center text-muted md:hidden"
          >
            {expanded ? <CloseIcon size={14} strokeWidth={2.5} /> : <ChevronDownIcon size={14} />}
          </button>
        </div>

        <div
          id={detailsId}
          className={cx(
            "grid transition-[grid-template-rows,opacity,padding] duration-400 ease-[ease] group-hover/card:grid-rows-[1fr] group-hover/card:pt-2 group-hover/card:opacity-100",
            expanded ? "grid-rows-[1fr] pt-2 opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <ul className="flex min-h-0 flex-col gap-1.25 overflow-hidden">
            {project.features.slice(0, 4).map((feature) => (
              <li key={feature} className="flex min-w-0 items-center gap-1.5 text-xs leading-snug text-body">
                <ArrowRightIcon size={13} strokeWidth={2.5} className="shrink-0 text-primary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
