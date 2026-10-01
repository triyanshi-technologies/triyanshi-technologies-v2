/*
 * Site navigation — single source for the desktop mega menu, the mobile
 * menu and the footer.
 *
 * Hidden links are kept as comments, exactly as on the legacy site.
 * To publish one, uncomment it (and its column/heading if it has one).
 *
 * Desktop: each menu renders its columns side by side; a column `heading`
 *          is the small orange label (or a link when it has an href).
 * Mobile:  a column with a heading becomes a nested accordion; columns
 *          without a heading render their links directly.
 */

export type NavLink = { label: string; href: string };
export type NavColumn = { heading?: string | NavLink; links: NavLink[] };
export type NavMenu = {
  id: string;
  label: string;
  /** Path prefixes that mark this menu as active, e.g. "/services/". */
  match: string[];
  columns: NavColumn[];
};

export const homeLink: NavLink = { label: "Home", href: "/" };
export const contactLink: NavLink = { label: "Contact Us", href: "/contact-us/contact-us" };

export const primaryNav: NavMenu[] = [
  {
    id: "company",
    label: "Company",
    match: ["/company/"],
    columns: [
      {
        // heading: "About Triyanshi",
        links: [
          { label: "About Us", href: "/company/about-us" },
          // { label: "What We Serve", href: "/company/what-we-serve" },
          // { label: "Our Story", href: "/company/our-story" },
          // { label: "Our Team", href: "/company/our-team" },
        ],
      },
      // {
      //   heading: { label: "Careers", href: "/company/careers" },
      //   links: [
      //     { label: "Full Stack Development", href: "/company/full-stack-developer" },
      //     { label: "UI/UX Designing", href: "/company/ui-ux-designer" },
      //     { label: "Business Development Executive", href: "/company/business-dev-executive" },
      //   ],
      // },
    ],
  },
  {
    id: "services",
    label: "Services",
    match: ["/services/"],
    columns: [
      {
        links: [
          { label: "eCommerce", href: "/services/ecommerce" },
          // Mobile grouped these under an "eCommerce" sub-accordion:
          // { label: "Shopify", href: "/services/shopify" },
          // { label: "BigCommerce", href: "/services/bigcommerce" },
          // { label: "Volusion", href: "/services/volusion" },
          // { label: "Webflow", href: "/services/webflow" },
          // { label: "Enterprise Solution", href: "/services/enterprise-solution" },
          { label: "Enterprise Solutions", href: "/services/enterprise-solutions" },
          // Mobile grouped these under an "Innovation Lab" sub-accordion:
          // { label: "SaaS & MVP Development", href: "/services/saas-mvp-development" },
          // { label: "Website Development", href: "/services/website-development" },
          // { label: "AI & Automation Solutions", href: "/services/ai-automation-solutions" },
          // { label: "ERP & CRM Development", href: "/services/erp-crm-development" },
          // { label: "UI/UX & Product Design", href: "/services/ui-ux-product-design" },
          // { label: "Compliance", href: "/services/compliance" },
          // Mobile grouped these under a "Compliance" sub-accordion:
          // { label: "Regulatory Consulting", href: "/services/regulatory-consulting" },
          // { label: "Audit & Risk Management", href: "/services/audit-risk-management" },
          // { label: "Policy & Documentation", href: "/services/policy-documentation" },
        ],
      },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    match: ["/portfolio/", "/portfolio-detail/"],
    columns: [
      {
        // heading: "eCommerce",
        links: [
          { label: "Shopify", href: "/portfolio/shopify" },
          { label: "BigCommerce", href: "/portfolio/bigcommerce" },
          { label: "Volusion", href: "/portfolio/volusion" },
          { label: "Webflow", href: "/portfolio/webflow" },
          // { label: "Enterprise Solution", href: "/portfolio/enterprise-solution" },
        ],
      },
      // {
      //   heading: "Case Studies",
      //   links: [
      //     { label: "Hydrogen Migration", href: "/portfolio-detail/portfolio-detail" }, // Stone & Tile
      //     { label: "CRO Focused Redesign", href: "/portfolio-detail/portfolio-detail" }, // Geroo Jaipur
      //     { label: "B2B Portal Build", href: "/portfolio-detail/portfolio-detail" }, // Coosje Bright
      //     { label: "AI Automation", href: "/portfolio-detail/portfolio-detail" }, // Bumbo Stationeries
      //     { label: "Webflow Design", href: "/portfolio-detail/portfolio-detail" }, // Data Sketches
      //   ],
      // },
    ],
  },
  // Technologies — temporarily disabled from nav; re-enable by uncommenting.
  // {
  //   id: "technologies",
  //   label: "Technologies",
  //   match: ["/technologies/"],
  //   columns: [
  //     {
  //       heading: "Frontend",
  //       links: [
  //         { label: "React & Next.js", href: "/technologies/react-nextjs" },
  //         { label: "TypeScript", href: "/technologies/typescript" },
  //         { label: "Hydrogen & Remix", href: "/technologies/hydrogen-remix" },
  //       ],
  //     },
  //     {
  //       heading: "Backend & AI",
  //       links: [
  //         { label: "Node.js", href: "/technologies/nodejs" },
  //         { label: "GraphQL", href: "/technologies/graphql" },
  //         { label: "AI & Machine Learning", href: "/technologies/ai-ml" },
  //       ],
  //     },
  //   ],
  // },
  {
    id: "tools",
    label: "Tools",
    match: ["/tools/"],
    columns: [
      // Previously split into two columns: heading "eCommerce" (ROI Calculator,
      // Site Speed Grader) and heading "Strategy Tools" (the other two).
      {
        links: [
          { label: "ROI Calculator", href: "/tools/roi-calculator" },
          { label: "Site Speed Grader", href: "/tools/site-speed-grader" },
          { label: "AI Readiness Assessment", href: "/tools/ai-readiness-assessment" },
          { label: "eCommerce Platform Selectors", href: "/tools/platform-selector" },
        ],
      },
    ],
  },
];

export type FooterColumn = { id: string; title: string; links: NavLink[] };

export const footerNav: FooterColumn[] = [
  {
    id: "services",
    title: "Services",
    links: [
      { label: "eCommerce", href: "/services/ecommerce" },
      { label: "Enterprise Solutions", href: "/services/enterprise-solutions" },
      // { label: "Compliance", href: "/services/compliance" },
    ],
  },
  {
    id: "tools",
    title: "Free Tools",
    links: [
      { label: "eCommerce ROI Calculator", href: "/tools/roi-calculator" },
      { label: "Site Speed Grader", href: "/tools/site-speed-grader" },
      { label: "AI Readiness Assessment", href: "/tools/ai-readiness-assessment" },
      { label: "eCommerce Platform Selectors", href: "/tools/platform-selector" },
    ],
  },
  {
    id: "company",
    title: "Company",
    links: [
      { label: "About Us", href: "/company/about-us" },
      { label: "Shopify", href: "/portfolio/shopify" },
      { label: "BigCommerce", href: "/portfolio/bigcommerce" },
      { label: "Volusion", href: "/portfolio/volusion" },
      { label: "Webflow", href: "/portfolio/webflow" },
      // { label: "Careers", href: "/company/careers" },
      // { label: "Blog", href: "#" },
    ],
  },
];
