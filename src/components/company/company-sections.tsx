import Link from "next/link";
import type { ReactNode } from "react";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/layout";
import type { Job } from "@/content/jobs";
import { cn } from "@/lib/cn";
import { arrowNudge, cardHover } from "@/lib/hover";
import { BriefcaseIcon, ClockIcon, MapPinIcon, UserIcon } from "./company-icons";

/*
 * Building blocks for the Company pages (Our Story, What We Serve, Our Team,
 * Careers, job pages). Content lives in the page files / content/jobs.ts.
 */

const cardBase = cn("rounded-xl border border-line bg-white", cardHover);
const iconCircle = "flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary";

export type IconItem = { icon: ReactNode; title: string; text: string };

const cols = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** Centered icon cards: core values, culture. */
export function IconCardGrid({ items, columns }: { items: IconItem[]; columns: keyof typeof cols }) {
  return (
    <RevealGroup className={cn("mt-10 grid gap-6", cols[columns])}>
      {items.map((item) => (
        <RevealItem key={item.title} className={cn(cardBase, "px-6 py-8 text-center")}>
          <span aria-hidden="true" className={cn(iconCircle, "mx-auto mb-4")}>
            {item.icon}
          </span>
          <h3 className="mb-2 text-lg text-ink">{item.title}</h3>
          <p className="text-sm leading-relaxed">{item.text}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Icon-left rows: careers perks. */
export function PerkGrid({ items }: { items: IconItem[] }) {
  return (
    <RevealGroup className="mt-10 grid gap-6 md:grid-cols-2">
      {items.map((item) => (
        <RevealItem key={item.title} className={cn(cardBase, "flex gap-5 p-7")}>
          <span
            aria-hidden="true"
            className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
          >
            {item.icon}
          </span>
          <div>
            <h3 className="mb-1.5 text-base text-ink">{item.title}</h3>
            <p className="text-sm leading-relaxed">{item.text}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Numbered process steps. */
export function NumberedSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <RevealGroup as="ol" className="mt-8 grid gap-8 md:grid-cols-3">
      {steps.map((step, i) => (
        <RevealItem as="li" key={step.title} className="p-2 text-center">
          <span
            aria-hidden="true"
            className="mx-auto mb-5 flex size-12 items-center justify-center rounded-full bg-primary text-xl font-extrabold text-white"
          >
            {i + 1}
          </span>
          <h3 className="mb-2 text-lg text-ink">{step.title}</h3>
          <p className="text-sm leading-relaxed">{step.text}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Industry tiles: icon circle + label. */
export function IndustryGrid({ items }: { items: { icon: ReactNode; label: string }[] }) {
  return (
    <RevealGroup as="ul" className="mt-10 grid gap-6 md:grid-cols-3">
      {items.map((item) => (
        <RevealItem
          as="li"
          key={item.label}
          className={cn(
            cardBase,
            "flex min-h-37.5 flex-col items-center justify-center gap-3.5 rounded-lg px-5 py-6 text-center font-semibold text-ink",
          )}
        >
          <span
            aria-hidden="true"
            className="grid size-14 shrink-0 place-items-center rounded-full bg-primary/10 text-primary [&_svg]:size-7"
          >
            {item.icon}
          </span>
          {item.label}
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Leadership cards with a placeholder avatar. */
export function TeamGrid({ members }: { members: { name: string; role: string; bio: string }[] }) {
  return (
    <RevealGroup className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <RevealItem as="article" key={member.name} className={cn(cardBase, "overflow-hidden")}>
          <div
            aria-hidden="true"
            className="flex aspect-4/3 w-full items-center justify-center bg-linear-135 from-primary/8 to-primary/2 text-primary/40"
          >
            <UserIcon width={64} height={64} />
          </div>
          <div className="p-6">
            <h3 className="text-lg text-ink">{member.name}</h3>
            <p className="mt-1 text-sm font-semibold text-primary">{member.role}</p>
            <p className="mt-3 text-sm leading-relaxed">{member.bio}</p>
          </div>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

const jobCard = cn(cardBase, "group/link flex h-full flex-col gap-4 p-8");

function ViewRole() {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-primary">
      View Role <ArrowRightIcon size={14} className={arrowNudge} />
    </span>
  );
}

const TAG_ICONS = [MapPinIcon, BriefcaseIcon];

/** Careers page job cards. `compact` = "Other open roles" variant. */
export function JobGrid({ jobs, compact = false }: { jobs: Job[]; compact?: boolean }) {
  return (
    <RevealGroup className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <RevealItem key={job.slug} className="grid">
          <Link href={`/company/${job.slug}`} className={jobCard}>
            {!compact && (
              <Badge className="mb-0 inline-flex items-center gap-1.5 px-2.5">
                <ClockIcon width={12} height={12} /> Actively Hiring
              </Badge>
            )}
            <h3 className="text-xl text-ink">{job.title}</h3>
            <p className="flex-1 leading-relaxed">{compact ? job.shortSummary : job.summary}</p>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4">
              {compact ? (
                <span className="text-xs font-medium text-body">
                  {job.listingTags.map((tag) => tag.replace(" exp", "")).join(" · ")}
                </span>
              ) : (
                <span className="flex flex-wrap gap-2">
                  {job.listingTags.map((tag, i) => {
                    const Icon = TAG_ICONS[i];
                    return (
                      <span key={tag} className="flex items-center gap-1.25 text-xs font-medium text-body">
                        {Icon && <Icon width={12} height={12} />}
                        {tag}
                      </span>
                    );
                  })}
                </span>
              )}
              <ViewRole />
            </div>
          </Link>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

/** Two bordered statements (Vision & Mission). */
export function StatementPair({ items }: { items: { title: string; text: string }[] }) {
  return (
    <RevealGroup className="grid gap-8 md:grid-cols-2 md:gap-16">
      {items.map((item) => (
        <RevealItem
          key={item.title}
          className="border-l-4 border-line pl-4 transition-colors duration-300 hover:border-primary"
        >
          <h3 className="mb-6 text-heading-md text-ink">{item.title}</h3>
          <p className="text-lg leading-8">{item.text}</p>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
