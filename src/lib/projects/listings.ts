/*
 * Every place on the website that lists projects. Each has a Sanity
 * "showcase" document (created by scripts/sanity-import.ts) whose project
 * order editors control by drag and drop.
 *
 * IDs use hyphens, not dots: Sanity treats dotted IDs as private, and the
 * website reads the public dataset without a token.
 */
export type ListingKind = "portfolio" | "service";

export type Listing = {
  kind: ListingKind;
  key: string;
  title: string;
  path: string;
  /** Initial project slugs for the import, when not derivable from the legacy data. */
  seed?: string[];
};

const portfolio = (key: string, title: string): Listing => ({
  kind: "portfolio",
  key,
  title,
  path: `/portfolio/${key}`,
});
const service = (key: string, title: string, seed?: string[]): Listing => ({
  kind: "service",
  key,
  title,
  path: `/services/${key}`,
  ...(seed && { seed }),
});

export const LISTINGS: Listing[] = [
  portfolio("shopify", "Shopify"),
  portfolio("bigcommerce", "BigCommerce"),
  portfolio("volusion", "Volusion"),
  portfolio("webflow", "Webflow"),
  portfolio("headless", "Headless Commerce"),
  portfolio("website-development", "Website Development"),
  portfolio("enterprise-solution", "Enterprise Solution"),
  portfolio("saas-mvp-development", "SaaS & MVP Development"),
  portfolio("ai-automation-solutions", "AI & Automation"),
  portfolio("erp-crm-development", "ERP & CRM"),
  portfolio("ui-ux-product-design", "UI/UX & Product Design"),

  service("shopify", "Shopify Development"),
  service("bigcommerce", "BigCommerce Development"),
  service("volusion", "Volusion Development"),
  service("webflow", "Webflow Development"),
  service("headless", "Headless Commerce"),
  service("website-development", "Website Development"),
  service("ai-automation-solutions", "AI & Automation Solutions"),
  service("erp-crm-development", "ERP & CRM Development"),
  service("ui-ux-product-design", "UI/UX & Product Design"),
  service("enterprise-solution", "Enterprise Solution"),
  service("saas-mvp-development", "SaaS & MVP Development"),
  service("regulatory-consulting", "Regulatory Consulting"),
  service("audit-risk-management", "Audit & Risk Management"),
  service("policy-documentation", "Policy & Documentation"),
  // eCommerce landing page "Selected Commerce Work" (hard-coded on the legacy page).
  service("ecommerce", "eCommerce — Selected Work", ["usa-light", "geroo-jaipur", "emmalou-s-kitchen"]),
];

export const showcaseId = (kind: ListingKind, key: string) => `showcase-${kind}-${key}`;
export const projectId = (slug: string) => `project-${slug}`;
