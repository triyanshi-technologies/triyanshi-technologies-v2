import type { MetadataRoute } from "next";
import { portfolioPages } from "@/content/portfolio-pages";
import { services } from "@/content/services";
import { tools } from "@/content/tools";
import { site } from "@/lib/site";

/*
 * sitemap.xml, generated at build time from the same content the routes use.
 * Lists the pages reachable from the navigation. Pages hidden from the nav
 * (Our Story, Our Team, What We Serve, Careers + jobs, Technologies) stay out,
 * as on the legacy site, and the noindex case-study placeholder too.
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number) => ({ url: `${site.url}${path}`, lastModified, priority });

  return [
    page("/", 1),
    page("/company/about-us", 0.8),
    page("/services", 0.8),
    page("/services/ecommerce", 0.9),
    page("/services/enterprise-solutions", 0.9),
    ...services.map((service) => page(`/services/${service.slug}`, 0.8)),
    page("/portfolio", 0.7),
    ...portfolioPages.map((p) => page(`/portfolio/${p.slug}`, 0.7)),
    page("/tools", 0.7),
    ...tools.map((tool) => page(`/tools/${tool.slug}`, 0.7)),
    page("/contact-us/contact-us", 0.6),
  ];
}
