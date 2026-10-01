import { CtaCentered, HubGrid } from "@/components/sections/cta";
import { CenteredHero, highlightLastWord } from "@/components/sections/dark-hero";
import { ButtonLink } from "@/components/ui/button";
import { Highlight } from "@/components/ui/layout";
import { getPortfolioPage, portfolioHubGroups, portfolioHubSeo } from "@/content/portfolio-pages";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...portfolioHubSeo, path: "/portfolio" });

const groups = portfolioHubGroups.map((group) => ({
  title: group.title,
  cards: group.slugs.flatMap((slug) => {
    const page = getPortfolioPage(slug);
    return page ? [{ title: page.title, description: page.summary, href: `/portfolio/${slug}` }] : [];
  }),
}));

export default function PortfolioHubPage() {
  return (
    <>
      <CenteredHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Portfolio" }]}
        title={highlightLastWord("Selected work across commerce and digital product builds.")}
        description="Explore selected work across commerce, SaaS, AI automation, ERP/CRM, websites, and product design."
        actions={
          <>
            <ButtonLink href="/contact-us/contact-us" className="max-sm:w-full">
              Start a Project
            </ButtonLink>
            <ButtonLink href="#portfolio-work" variant="outline" className="max-sm:w-full">
              View Work
            </ButtonLink>
          </>
        }
      />
      <HubGrid id="portfolio-work" groups={groups} linkLabel="View Portfolio" />
      <CtaCentered
        title={
          <>
            Have a project we should <Highlight>showcase?</Highlight>
          </>
        }
        description="Let us build the next case study with you."
      />
    </>
  );
}
