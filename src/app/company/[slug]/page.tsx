import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType, SVGProps } from "react";
import {
  BarChartIcon,
  BriefcaseIcon,
  ClockIcon,
  DepartmentIcon,
  MapPinIcon,
} from "@/components/company/company-icons";
import { JobGrid } from "@/components/company/company-sections";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Highlight, Section, SectionTitle } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { getJob, jobs, type Job } from "@/content/jobs";
import { buildMetadata } from "@/lib/seo";

/*
 * Job pages: /company/full-stack-developer, /company/ui-ux-designer,
 * /company/business-dev-executive. The other company pages are static
 * routes, which take precedence over this dynamic segment.
 */
type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const job = getJob((await params).slug);
  if (!job) return {};
  return buildMetadata({ ...job.seo, title: `${job.title} | Careers`, path: `/company/${job.slug}` });
}

const META: { key: keyof Job["meta"]; label: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  { key: "role", label: "Role", Icon: BriefcaseIcon },
  { key: "location", label: "Location", Icon: MapPinIcon },
  { key: "type", label: "Type", Icon: ClockIcon },
  { key: "experience", label: "Experience", Icon: BarChartIcon },
  { key: "department", label: "Department", Icon: DepartmentIcon },
];

export default async function JobPage({ params }: Props) {
  const job = getJob((await params).slug);
  if (!job) notFound();

  const lead = job.title.slice(0, job.title.length - job.titleAccent.length).trimEnd();
  const otherJobs = jobs.filter((other) => other.slug !== job.slug);

  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Careers", href: "/company/careers" },
          { label: job.breadcrumbLabel },
        ]}
        title={
          <>
            {lead} <Highlight>{job.titleAccent}</Highlight>
          </>
        }
        description={job.intro}
      />

      <Section aria-label="Job details">
        <div className="grid items-start gap-14 lg:grid-cols-[1fr_280px]">
          <Reveal className="space-y-10">
            {job.sections.map((section, i) => (
              <div key={section.title} className={i > 0 ? "border-t border-line pt-10" : undefined}>
                <h2 className="text-2xl text-ink">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)} className="mt-3 leading-[1.8]">
                    {paragraph}
                  </p>
                ))}
                {section.items && (
                  <ul className="mt-3 flex flex-col gap-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3.5 leading-relaxed text-body">
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-primary"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </Reveal>

          <Reveal as="aside" className="lg:sticky lg:top-[calc(var(--spacing-nav)+2rem)]">
            <div className="rounded-xl border border-line bg-surface p-7">
              <h3 className="mb-5 border-b border-line pb-3 text-base text-ink">Role Summary</h3>
              <dl className="flex flex-col gap-4">
                {META.map(({ key, label, Icon }) => (
                  <div key={key} className="flex items-start gap-3">
                    <Icon width={18} height={18} className="mt-0.75 shrink-0 text-primary" />
                    <div>
                      <dt className="mb-0.5 text-xs font-bold tracking-wider text-subtle uppercase">
                        {label}
                      </dt>
                      <dd className="font-semibold text-ink">{job.meta[key]}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              <ButtonLink href={job.applyHref} className="mt-6 flex w-full">
                Apply Now
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="light" aria-label="Other open roles">
        <Reveal>
          <SectionTitle
            eyebrow="Also Hiring"
            title={
              <>
                Other Open <Highlight>Roles</Highlight>
              </>
            }
            className="mb-0"
          />
        </Reveal>
        <JobGrid jobs={otherJobs} compact />
      </Section>
    </>
  );
}
