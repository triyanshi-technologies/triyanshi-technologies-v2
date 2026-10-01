/*
 * Free tools (/tools/*), migrated from the legacy tools/*.html pages.
 * The tools hub, nav and footer link here; each tool page reads its SEO
 * and hub card from this list.
 */
import { site } from "@/lib/site";

export type ToolSlug =
  "roi-calculator" | "site-speed-grader" | "ai-readiness-assessment" | "platform-selector";

export type Tool = {
  slug: ToolSlug;
  /** Hub card title. */
  name: string;
  /** Breadcrumb label, when it differs from `name`. */
  crumb?: string;
  hubGroup: "eCommerce" | "Strategy Tools";
  summary: string;
  seo: { title: string; description: string };
};

export const tools: Tool[] = [
  {
    slug: "roi-calculator",
    name: "ROI Calculator",
    hubGroup: "eCommerce",
    summary:
      "Estimate the revenue impact of conversion rate and average order value optimization on your store, in INR or USD.",
    seo: {
      title: "eCommerce ROI Calculator",
      description:
        "Estimate the revenue impact of conversion rate and average order value optimization on your store, in INR or USD, using benchmark-backed ecommerce assumptions.",
    },
  },
  {
    slug: "site-speed-grader",
    name: "Site Speed Grader",
    hubGroup: "eCommerce",
    summary:
      "Grade your website speed performance, analyze core metrics, and get focused recommendations to improve load times.",
    seo: {
      title: "Site Speed Grader",
      description:
        "Grade your website speed performance, analyze core metrics, and get focused recommendations to improve load times.",
    },
  },
  {
    slug: "ai-readiness-assessment",
    name: "AI Readiness Assessment",
    hubGroup: "Strategy Tools",
    summary:
      "Check whether your commerce business is ready for AI across data, workflows, governance, team skills, and implementation capacity.",
    seo: {
      title: "AI Readiness Assessment",
      description:
        "Check whether your commerce business is ready for AI with a free AI readiness assessment for data, workflows, governance, team skills, and implementation capacity.",
    },
  },
  {
    slug: "platform-selector",
    name: "eCommerce Platform Selector",
    crumb: "Commerce Platform Selector",
    hubGroup: "Strategy Tools",
    summary:
      "Compare Shopify, Shopify Plus, BigCommerce, Webflow Ecommerce, Volusion modernization, and custom enterprise commerce.",
    seo: {
      title: "Commerce Platform Selector",
      description:
        "Compare Shopify, Shopify Plus, BigCommerce, Webflow Ecommerce, Volusion modernization, and custom enterprise commerce with a practical platform selector.",
    },
  },
];

export function getTool(slug: ToolSlug): Tool {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
}

export const toolHubGroups = ["eCommerce", "Strategy Tools"] as const;

export const toolsHubSeo = {
  title: "Free Tools",
  description:
    "Free interactive tools from Triyanshi Technologies: ROI calculator, site speed grader, AI readiness assessment, and commerce platform selector.",
};

/** schema.org WebApplication for a tool page (free, runs in the browser). */
export function toolSchema(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.seo.title,
    description: tool.seo.description,
    url: `${site.url}/tools/${tool.slug}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@id": `${site.url}/#organization` },
  };
}
