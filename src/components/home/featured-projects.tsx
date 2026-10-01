import { Reveal } from "@/components/motion/reveal";
import { Section, SectionTitle } from "@/components/ui/layout";
import { getHomeShowcase } from "@/lib/projects";
import { FeaturedProjectsTabs } from "./featured-projects-tabs";

/** "Featured Projects": three-level navigation over the portfolio (data fetched at build time). */
export async function FeaturedProjects() {
  const categories = await getHomeShowcase();

  return (
    <Section id="portfolio">
      <Reveal>
        <SectionTitle eyebrow="Our Work" title="Featured Projects" />
      </Reveal>
      <Reveal>
        <FeaturedProjectsTabs categories={categories} />
      </Reveal>
    </Section>
  );
}
