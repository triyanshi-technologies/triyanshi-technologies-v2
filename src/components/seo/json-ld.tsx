import { site } from "@/lib/site";

type JsonLdProps = { data: Record<string, unknown> };

/** Renders a schema.org JSON-LD block. `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Organization schema rendered on every page (same as the legacy site). */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: `${site.url}/`,
  logo: { "@type": "ImageObject", url: `${site.url}${site.logo}` },
  image: `${site.url}${site.logo}`,
  description:
    "Triyanshi Technologies is a technology partner focused on eCommerce development and enterprise solutions & AI, delivering 250+ solutions across 15+ countries.",
  email: site.contact.email,
  telephone: site.contact.phone,
  areaServed: { "@type": "Place", name: "Worldwide" },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: site.contact.phone,
      email: site.contact.email,
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  ],
  sameAs: [site.socials.linkedin, site.socials.facebook, "https://www.instagram.com/triyanshi_technologies"],
  knowsAbout: [
    "eCommerce Development",
    "Shopify",
    "BigCommerce",
    "Volusion",
    "Webflow",
    "Enterprise Solutions Development",
    "AI-Powered Automation",
    "ERP, CRM & Business Portals",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Technology Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "eCommerce Development & Growth",
          description:
            "Store development, redesign, platform migration, CRO/UX, SEO, and ongoing maintenance for commerce experiences.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Enterprise Solutions & AI",
          description:
            "Custom software development, AI-powered automation, ERP/CRM/business portals, integrations & APIs, analytics & dashboards.",
        },
      },
    ],
  },
};
