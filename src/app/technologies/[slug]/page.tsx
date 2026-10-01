import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { TECH_ICONS } from "@/components/technologies/tech-icons";
import { TechCta, TechTitle } from "@/components/technologies/tech-sections";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { getTechnology, technologies } from "@/content/technologies";
import { buildMetadata } from "@/lib/seo";
import { cardHover } from "@/lib/hover";
import { cn } from "@/lib/cn";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return technologies.map((tech) => ({ slug: tech.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tech = getTechnology((await params).slug);
  if (!tech) return {};
  return buildMetadata({ ...tech.seo, path: `/technologies/${tech.slug}` });
}

export default async function TechnologyPage({ params }: Props) {
  const tech = getTechnology((await params).slug);
  if (!tech) notFound();

  const Icon = TECH_ICONS[tech.slug as keyof typeof TECH_ICONS];

  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Technologies", href: "/technologies/technologies" },
          { label: tech.card.title },
        ]}
        icon={<Icon width={70} height={70} className="block text-white" />}
        title={<TechTitle segments={tech.title} />}
      >
        <span className="mt-4 mb-6 inline-flex items-center rounded-full border border-primary/30 bg-primary/12 px-4 py-1.5 text-sm font-semibold text-primary">
          {tech.badge}
        </span>
        <p className="mx-auto max-w-145 text-lg leading-[1.7]">{tech.intro}</p>
      </PageHeader>

      <Section tone="light" aria-label={tech.expertiseTitle}>
        <RevealGroup className="grid items-start gap-12 md:grid-cols-[3fr_2fr] md:gap-16">
          <RevealItem>
            <h2 className="mb-6 text-[clamp(1.375rem,2.5vw,1.75rem)] text-ink">{tech.expertiseTitle}</h2>
            <ul className="flex flex-col gap-2.5">
              {tech.expertise.map((item) => (
                <li
                  key={item}
                  className={cn(
                    "flex items-center gap-3.5 rounded-lg border border-line bg-white px-5 py-3.5 font-medium text-ink",
                    cardHover,
                  )}
                >
                  <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealItem>
          <RevealItem
            as="aside"
            className="rounded-2xl border border-primary/25 bg-white px-8 py-10 md:sticky md:top-[calc(var(--spacing-nav)+2rem)]"
          >
            <div
              aria-hidden="true"
              className="mb-6 h-1 w-12 rounded-xs bg-linear-to-r from-primary to-accent"
            />
            <h3 className="mb-3 text-[1.375rem] leading-[1.3] text-ink">{tech.ctaBox.title}</h3>
            <p className="mb-7 leading-[1.7]">{tech.ctaBox.text}</p>
            <ButtonLink href="/contact-us/contact-us">Get Started</ButtonLink>
          </RevealItem>
        </RevealGroup>
      </Section>

      <TechCta
        description={tech.ctaText}
        secondary={{ label: "View All Technologies", href: "/technologies/technologies" }}
      />
    </>
  );
}
