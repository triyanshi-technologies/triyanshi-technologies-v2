import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaCentered } from "@/components/sections/cta";
import { CenteredHero } from "@/components/sections/dark-hero";
import {
  ServiceOverview,
  ServiceProcess,
  ServiceProjects,
  ServiceStack,
} from "@/components/services/service-sections";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Highlight } from "@/components/ui/layout";
import { getService, services } from "@/content/services";
import { getPageProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

// Only the slugs below are generated; anything else is a 404 (static export).
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return buildMetadata({ ...service.seo, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const { projects } = await getPageProjects("service", service.slug, service.sampleProjects);

  return (
    <>
      <CenteredHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
        title={service.headline}
        description={service.summary}
        actions={
          <>
            <ButtonLink href="/contact-us/contact-us" className="max-sm:w-full">
              Start a Project
            </ButtonLink>
            <ButtonLink href="#service-projects" variant="outline" className="max-sm:w-full">
              View Projects
            </ButtonLink>
          </>
        }
      />
      <ServiceOverview service={service} />
      <ServiceStack stack={service.stack} />
      <ServiceProcess />
      <ServiceProjects projects={projects} />
      <CtaCentered
        title={
          <>
            Ready To Build Your <Highlight>{service.title}</Highlight> Project?
          </>
        }
        description="Tell us what you are planning. We will help you scope the right version, timeline, and technical direction."
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.seo.title,
          description: service.seo.description,
          serviceType: service.title,
          category: service.category,
          provider: { "@id": `${site.url}/#organization` },
          url: `${site.url}/services/${service.slug}`,
        }}
      />
    </>
  );
}
