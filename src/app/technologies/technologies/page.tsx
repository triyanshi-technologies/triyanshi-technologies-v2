import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TECH_ICONS } from "@/components/technologies/tech-icons";
import { TechCta } from "@/components/technologies/tech-sections";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Highlight, Section, SectionTitle } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { technologies, technologiesHubSeo } from "@/content/technologies";
import { buildMetadata } from "@/lib/seo";
import { arrowNudge, cardHover } from "@/lib/hover";
import { cn } from "@/lib/cn";

// Hidden from the navigation (legacy), but the page stays live.
export const metadata = buildMetadata({ ...technologiesHubSeo, path: "/technologies/technologies" });

export default function TechnologiesPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Technologies" }]}
        eyebrow="Our Tech Stack"
        title={
          <>
            Quality code. <Highlight>Modern</Highlight> architecture.
          </>
        }
        description="We go deep on the technologies that power exceptional digital experiences for our clients worldwide."
      />

      <Section tone="light" aria-label="Our technology stack">
        <Reveal>
          <SectionTitle
            eyebrow="What We Build With"
            title={
              <>
                Our Technology <Highlight>Stack</Highlight>
              </>
            }
            description="From frontend to backend, AI to APIs - these are the tools we've mastered to deliver results."
          />
        </Reveal>
        <RevealGroup as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((tech) => {
            const Icon = TECH_ICONS[tech.slug as keyof typeof TECH_ICONS];
            return (
              <RevealItem
                as="li"
                key={tech.slug}
                className={cn(
                  "group/link relative flex flex-col gap-3.5 rounded-xl border border-line bg-white p-8",
                  cardHover,
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <Icon width={36} height={36} className="block text-ink" />
                  <span className="rounded-full border border-primary/18 bg-primary/8 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-primary-text">
                    {tech.card.badge}
                  </span>
                </div>
                <h3 className="text-xl leading-[1.3] text-ink">{tech.card.title}</h3>
                <p className="flex-1 text-sm leading-[1.7]">{tech.card.desc}</p>
                <Link
                  href={`/technologies/${tech.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 border-t border-line pt-3.5 text-sm font-semibold text-primary-text after:absolute after:inset-0 after:rounded-xl"
                >
                  Explore <span className="sr-only">{tech.card.title}</span>
                  <ArrowRightIcon size={14} className={cn("shrink-0", arrowNudge)} />
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      <TechCta
        description="Book a discovery call. We'll show you what's possible with the right tech stack for your business."
        secondary={{ label: "Learn About Us", href: "/company/about-us" }}
      />
    </>
  );
}
