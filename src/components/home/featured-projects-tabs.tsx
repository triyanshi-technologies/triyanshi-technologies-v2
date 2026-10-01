"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { cx } from "@/lib/cx";
import type { HomeShowcaseCategory } from "@/lib/projects/types";

/** Slide an absolutely positioned indicator onto `target` (both inside the same positioned parent). */
function moveIndicator(
  indicator: HTMLElement | null,
  target: HTMLElement | null,
  animate: boolean,
  fullBox = false,
) {
  if (!indicator || !target) return;
  indicator.style.transitionDuration = animate ? "" : "0s";
  indicator.style.left = `${target.offsetLeft}px`;
  indicator.style.width = `${target.offsetWidth}px`;
  if (fullBox) {
    indicator.style.top = `${target.offsetTop}px`;
    indicator.style.height = `${target.offsetHeight}px`;
  }
}

/*
 * Featured Projects: category tabs -> service chips -> project grid.
 * Data is prepared on the server; this component only handles selection,
 * the sliding indicators and the expanded-card state.
 */
export function FeaturedProjectsTabs({ categories }: { categories: HomeShowcaseCategory[] }) {
  const [catId, setCatId] = useState(categories[0]?.id);
  const category = categories.find((c) => c.id === catId) ?? categories[0];
  const [groupId, setGroupId] = useState(category?.groups[0]?.id);
  const group = category?.groups.find((g) => g.id === groupId) ?? category?.groups[0];
  const [expanded, setExpanded] = useState<string | null>(null);

  const catBar = useRef<HTMLSpanElement>(null);
  const chipBg = useRef<HTMLSpanElement>(null);
  const catTabs = useRef<HTMLDivElement>(null);
  const chips = useRef<HTMLDivElement>(null);
  const firstPaint = useRef(true);

  // Position the tab underline and chip pill (no animation on first paint / resize).
  useLayoutEffect(() => {
    const animate = !firstPaint.current;
    firstPaint.current = false;
    moveIndicator(catBar.current, catTabs.current?.querySelector('[aria-selected="true"]') ?? null, animate);
    moveIndicator(
      chipBg.current,
      chips.current?.querySelector('[aria-selected="true"]') ?? null,
      animate,
      true,
    );
  }, [catId, groupId]);

  useEffect(() => {
    const onResize = () => {
      moveIndicator(catBar.current, catTabs.current?.querySelector('[aria-selected="true"]') ?? null, false);
      moveIndicator(
        chipBg.current,
        chips.current?.querySelector('[aria-selected="true"]') ?? null,
        false,
        true,
      );
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Collapse an expanded card when tapping/clicking anywhere outside the grid's cards.
  useEffect(() => {
    if (!expanded) return;
    const onPointer = (e: PointerEvent) => {
      if (!(e.target as Element).closest("article")) setExpanded(null);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [expanded]);

  if (!category || !group) return null;

  const selectCategory = (id: HomeShowcaseCategory["id"]) => {
    setCatId(id);
    setGroupId(categories.find((c) => c.id === id)?.groups[0]?.id);
    setExpanded(null);
  };

  const selectGroup = (id: string) => {
    setGroupId(id);
    setExpanded(null);
  };

  const panelId = "featured-projects-panel";

  return (
    <>
      {/* Level 1: categories */}
      <div className="relative mb-8 [scrollbar-width:none] overflow-x-auto border-b border-line [&::-webkit-scrollbar]:hidden">
        <div
          ref={catTabs}
          role="tablist"
          aria-label="Project categories"
          className="relative inline-flex min-w-full"
        >
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={c.id === category.id}
              aria-controls={panelId}
              onClick={() => selectCategory(c.id)}
              className={cx(
                "shrink-0 px-7 py-3.5 text-base font-semibold whitespace-nowrap transition-colors duration-200 hover:text-ink",
                c.id === category.id ? "text-ink" : "text-body",
              )}
            >
              {c.label}
            </button>
          ))}
          <span
            ref={catBar}
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-px left-0 h-0.5 rounded-t-xs bg-primary transition-[left,width] duration-300"
          />
        </div>
      </div>

      {/* Level 2: platform / service chips */}
      <div
        ref={chips}
        role="tablist"
        aria-label={`${category.label} services`}
        className="relative mb-10 flex flex-wrap gap-2 max-md:snap-x max-md:snap-mandatory max-md:[scrollbar-width:none] max-md:flex-nowrap max-md:overflow-x-auto max-md:[&::-webkit-scrollbar]:hidden"
      >
        <span
          ref={chipBg}
          aria-hidden="true"
          className="pointer-events-none absolute z-0 rounded-full bg-ink transition-[left,top,width,height] duration-300"
        />
        {category.groups.map((g) => {
          const active = g.id === group.id;
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={panelId}
              onClick={() => selectGroup(g.id)}
              className={cx(
                "relative z-1 shrink-0 snap-start rounded-full border px-4.5 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200",
                active
                  ? "border-transparent text-white"
                  : "border-line text-body hover:border-ink/40 hover:text-ink",
              )}
            >
              {g.label}
            </button>
          );
        })}
      </div>

      {/* Level 3: projects (keyed so cards replay their entrance animation on change) */}
      <div
        key={`${category.id}-${group.id}`}
        id={panelId}
        role="tabpanel"
        aria-label={`${group.label} projects`}
        className="grid min-h-70 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {group.projects.length ? (
          group.projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              expanded={expanded === project.slug}
              onToggle={() => setExpanded((cur) => (cur === project.slug ? null : project.slug))}
            />
          ))
        ) : (
          <div className="col-span-full flex min-h-55 flex-col items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed border-line p-8 text-center text-muted">
            <strong className="text-base font-semibold text-body">Projects coming soon</strong>
            <span>We&apos;re curating our best work for this service.</span>
          </div>
        )}

        {group.total > group.projects.length && (
          <div className="col-span-full mt-2 flex justify-center">
            <ButtonLink href={group.href}>
              View All Projects <ArrowRightIcon size={14} strokeWidth={2.5} />
            </ButtonLink>
          </div>
        )}
      </div>
    </>
  );
}
