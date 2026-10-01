"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon, ChevronDownIcon, CloseIcon } from "@/components/ui/icons";
import { cx } from "@/lib/cx";
import { arrowNudge, mediaCardHover } from "@/lib/hover";
import type { Project } from "@/lib/projects/types";
import { CASE_STUDY_HREF } from "./project-grid-card";

/*
 * Service page "Relevant Work" grid. Cards show name + industry; hovering
 * (pointer devices) or tapping a card reveals the description, tags, live
 * site and case-study link. One card is expanded at a time.
 */
export function ServiceProjectGrid({ projects }: { projects: Project[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!expanded) return;
    const onPointer = (e: PointerEvent) => {
      if (!(e.target as Element).closest("[data-service-card]")) setExpanded(null);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [expanded]);

  if (!projects.length) {
    return (
      <div className="flex min-h-55 flex-col items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed border-line p-8 text-center text-muted">
        <strong className="text-base font-semibold text-body">Projects coming soon</strong>
        <span>We are curating the best examples for this service.</span>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, i) => (
        <ServiceProjectCard
          key={project.slug}
          project={project}
          index={i}
          expanded={expanded === project.slug}
          onToggle={() => setExpanded((cur) => (cur === project.slug ? null : project.slug))}
          onClose={() => setExpanded(null)}
        />
      ))}
    </div>
  );
}

type CardProps = {
  project: Project;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onClose: () => void;
};

function ServiceProjectCard({ project, index, expanded, onToggle, onClose }: CardProps) {
  const detailsId = `service-project-${project.slug}`;

  return (
    <article
      data-service-card=""
      style={{ animationDelay: `${index * 90}ms` }}
      onClick={(e) => !(e.target as Element).closest("a") && onToggle()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      className={cx(
        `group/card relative min-h-85 w-full min-w-0 animate-card-up cursor-pointer overflow-hidden rounded-xl border bg-ink ${mediaCardHover}`,
        expanded ? "border-primary" : "border-transparent",
      )}
    >
      <Image
        src={project.image.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        placeholder={project.image.blurDataURL ? "blur" : "empty"}
        blurDataURL={project.image.blurDataURL}
        style={{ objectPosition: project.image.position }}
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-black/68 via-black/24 via-58% to-black/8" />

      <div className="absolute inset-x-4 bottom-4 z-2 rounded-lg bg-white px-4 py-2.75">
        <div className="grid grid-cols-[1fr_auto] items-start gap-x-2 gap-y-0.5">
          <h3 className="text-base leading-snug font-bold text-ink">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              aria-expanded={expanded}
              aria-controls={detailsId}
              className="text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {project.name}
            </button>
          </h3>
          <span aria-hidden="true" className="row-span-2 flex items-center self-center text-muted md:hidden">
            {expanded ? <CloseIcon size={14} strokeWidth={2.5} /> : <ChevronDownIcon size={14} />}
          </span>
          <span className="col-start-1 text-xs font-bold text-body">{project.category}</span>

          <div
            id={detailsId}
            className={cx(
              "col-span-2 grid transition-[grid-template-rows,opacity,padding] duration-400 ease-[ease] group-hover/card:grid-rows-[1fr] group-hover/card:pt-2 group-hover/card:opacity-100",
              expanded ? "grid-rows-[1fr] pt-2 opacity-100" : "grid-rows-[0fr] opacity-0",
            )}
          >
            <div className="relative z-1 flex min-h-0 flex-col gap-2 overflow-hidden">
              <p className="line-clamp-3 text-xs leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-1.25">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm bg-surface px-2 py-0.75 text-xs font-semibold text-body"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-2.75">
                {project.domain ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 truncate text-xs font-bold text-primary"
                  >
                    {project.domain}
                  </a>
                ) : (
                  <span className="text-xs font-bold text-primary">{project.category}</span>
                )}
                <Link
                  href={CASE_STUDY_HREF}
                  className="group/link inline-flex items-center gap-2 text-xs font-semibold whitespace-nowrap text-ink"
                >
                  View Case Study <ArrowRightIcon size={13} strokeWidth={2.5} className={arrowNudge} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
