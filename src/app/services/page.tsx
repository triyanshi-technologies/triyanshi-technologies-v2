import { CtaCentered, HubGrid } from "@/components/sections/cta";
import { CenteredHero } from "@/components/sections/dark-hero";
import { ButtonLink } from "@/components/ui/button";
import { Highlight } from "@/components/ui/layout";
import { getService, serviceHubGroups, servicesHubSeo } from "@/content/services";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...servicesHubSeo, path: "/services" });

const groups = serviceHubGroups.map((group) => ({
  title: group.title,
  cards: group.slugs.flatMap((slug) => {
    const service = getService(slug);
    return service ? [{ title: service.title, description: service.summary, href: `/services/${slug}` }] : [];
  }),
}));

export default function ServicesHubPage() {
  return (
    <>
      <CenteredHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Services" }]}
        title="Digital services for commerce, products, and compliance."
        description="Explore the full Triyanshi Technologies service portfolio. Each service page includes what we deliver, the stack we use, and relevant project examples."
        actions={
          <>
            <ButtonLink href="/contact-us/contact-us" className="max-sm:w-full">
              Start a Project
            </ButtonLink>
            <ButtonLink href="#all-services" variant="outline" className="max-sm:w-full">
              Explore Services
            </ButtonLink>
          </>
        }
      />
      <HubGrid id="all-services" groups={groups} linkLabel="View Service" />
      <CtaCentered
        title={
          <>
            Need help choosing the <Highlight>right service?</Highlight>
          </>
        }
        description="Share your goals and we will help you map the clearest path from idea to delivery."
      />
    </>
  );
}
