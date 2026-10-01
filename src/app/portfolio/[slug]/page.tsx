import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { PortfolioHero } from "@/components/portfolio/portfolio-hero";
import { ProjectGridCard } from "@/components/projects/project-grid-card";
import { ShowMoreGrid } from "@/components/projects/show-more-grid";
import { CtaCentered } from "@/components/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { Highlight, Section } from "@/components/ui/layout";
import { getPortfolioPage, portfolioPages } from "@/content/portfolio-pages";
import { getPageProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const PAGE_SIZE = 6;

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolioPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getPortfolioPage((await params).slug);
  if (!page) return {};
  return buildMetadata({ ...page.seo, path: `/portfolio/${page.slug}` });
}

export default async function PortfolioPage({ params }: Props) {
  const page = getPortfolioPage((await params).slug);
  if (!page) notFound();

  const { projects, isSample } = await getPageProjects("portfolio", page.slug, page.sampleProjects);

  return (
    <>
      <PortfolioHero page={page} projects={projects} />

      <Section id="portfolio-work" aria-label="Project work">
        <Reveal className="mb-7">
          <span className="mb-2 block font-semibold tracking-widest text-primary uppercase">
            Featured Projects
          </span>
          <h2 className="text-heading-lg text-ink">
            Real Projects. <Highlight>Real Businesses.</Highlight>
          </h2>
        </Reveal>
        <ShowMoreGrid pageSize={PAGE_SIZE} className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectGridCard key={project.slug} project={project} index={i % PAGE_SIZE} />
          ))}
        </ShowMoreGrid>
      </Section>

      <CtaCentered
        title={
          <>
            Want Results Like <Highlight>These?</Highlight>
          </>
        }
        description="Share your goals and we will map the right technical path for your next build."
      />

      {!isSample && projects.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: page.seo.title,
            description: page.seo.description,
            url: `${site.url}/portfolio/${page.slug}`,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: projects.length,
              itemListElement: projects.map((project, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: project.name,
                url: project.url,
              })),
            },
          }}
        />
      )}
    </>
  );
}
