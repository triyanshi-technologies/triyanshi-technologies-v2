import { CtaCentered, HubGrid } from "@/components/sections/cta";
import { CenteredHero } from "@/components/sections/dark-hero";
import { ButtonLink } from "@/components/ui/button";
import { Highlight } from "@/components/ui/layout";
import { toolHubGroups, tools, toolsHubSeo } from "@/content/tools";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...toolsHubSeo, path: "/tools" });

const groups = toolHubGroups.map((title) => ({
  title,
  cards: tools
    .filter((tool) => tool.hubGroup === title)
    .map((tool) => ({ title: tool.name, description: tool.summary, href: `/tools/${tool.slug}` })),
}));

export default function ToolsHubPage() {
  return (
    <>
      <CenteredHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Tools" }]}
        title="Free tools to plan your next commerce move."
        description="Quick, self-serve calculators and assessments we built from real client work, use them to sanity-check a decision before you bring it to us."
        actions={
          <>
            <ButtonLink href="/contact-us/contact-us" className="max-sm:w-full">
              Start a Project
            </ButtonLink>
            <ButtonLink href="#all-tools" variant="outline" className="max-sm:w-full">
              Explore Tools
            </ButtonLink>
          </>
        }
      />
      <HubGrid id="all-tools" groups={groups} linkLabel="Open Tool" />
      <CtaCentered
        title={
          <>
            Want a plan built around your <Highlight>results?</Highlight>
          </>
        }
        description="Share what a tool turned up and we will help you turn it into a scoped project."
      />
    </>
  );
}
