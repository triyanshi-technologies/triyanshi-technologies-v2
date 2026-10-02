/*
 * Portfolio pages (/portfolio/[slug]) — migrated from the legacy
 * portfolio/portfolio-pages.js. Projects come from Sanity showcases;
 * sampleProjects are the legacy placeholders shown only when a showcase is empty.
 */
import type { SampleProject } from "./services";

export type PortfolioStatIcon = "box" | "trend" | "clock" | "globe";
export type PortfolioStat = { icon: PortfolioStatIcon; value: string; label: string };

export type PortfolioPageContent = {
  slug: string;
  title: string;
  category: "eCommerce" | "Enterprise Solutions";
  headline: string;
  summary: string;
  stats: PortfolioStat[];
  sampleProjects?: SampleProject[];
  seo: { title: string; description: string };
};

export const portfolioPages: PortfolioPageContent[] = [
  {
    slug: "shopify",
    title: "Shopify",
    category: "eCommerce",
    headline: "Shopify Stores Built To Grow.",
    summary:
      "Real Shopify stores we've designed, engineered and optimized for brands across multiple industries.",
    stats: [
      {
        icon: "box",
        value: "100+",
        label: "Shopify Stores Launched",
      },
      {
        icon: "trend",
        value: "2X",
        label: "Avg Conversion Lift",
      },
      {
        icon: "clock",
        value: "99%",
        label: "On-Time Delivery",
      },
      {
        icon: "globe",
        value: "15+",
        label: "Countries Served",
      },
    ],
    sampleProjects: [
      {
        name: "Artisan & Co.",
        description: "Custom Shopify Plus theme with immersive 3D product viewer and one-click checkout.",
        tags: ["Shopify Plus", "Custom Theme", "Liquid"],
        metric: "200% AOV Increase",
      },
      {
        name: "NordicHome Store",
        description: "Headless Shopify storefront powered by Next.js for sub-second page loads.",
        tags: ["Shopify Headless", "Next.js", "GraphQL"],
        metric: "3x Faster Load Time",
      },
      {
        name: "FitFuel Supplements",
        description: "Subscription commerce platform with loyalty reward engine and smart reorder flows.",
        tags: ["Shopify", "ReCharge", "Klaviyo"],
        metric: "45% Repeat Purchase Rate",
      },
    ],
    seo: {
      title: "Shopify Portfolio",
      description: "Shopify and Shopify Plus portfolio examples from Triyanshi Technologies.",
    },
  },
  {
    slug: "bigcommerce",
    title: "BigCommerce",
    category: "eCommerce",
    headline: "BigCommerce implementations for B2B, ERP, and multi-channel commerce.",
    summary:
      "Examples of BigCommerce projects with B2B portals, ERP sync, multi-channel inventory, custom themes, and checkout optimization.",
    stats: [
      {
        icon: "box",
        value: "50+",
        label: "BigCommerce Builds",
      },
      {
        icon: "trend",
        value: "1.8X",
        label: "Avg Conversion Lift",
      },
      {
        icon: "clock",
        value: "98%",
        label: "On-Time Delivery",
      },
      {
        icon: "globe",
        value: "15+",
        label: "Countries Served",
      },
    ],
    seo: {
      title: "BigCommerce Portfolio",
      description: "BigCommerce portfolio examples for B2B, ERP sync, and custom commerce.",
    },
  },
  {
    slug: "volusion",
    title: "Volusion",
    category: "eCommerce",
    headline: "Volusion projects focused on retention, catalog clarity, and conversion.",
    summary:
      "Selected Volusion work covering subscription boxes, fashion storefronts, custom tooling, analytics, and customer experience improvements.",
    stats: [
      {
        icon: "box",
        value: "50+",
        label: "Volusion Projects",
      },
      {
        icon: "trend",
        value: "35%",
        label: "Avg Retention Lift",
      },
      {
        icon: "clock",
        value: "8-12 wks",
        label: "Avg Launch Timeline",
      },
      {
        icon: "globe",
        value: "15+",
        label: "Countries Served",
      },
    ],
    seo: {
      title: "Volusion Portfolio",
      description: "Volusion portfolio examples for subscriptions, analytics, and conversion improvements.",
    },
  },
  {
    slug: "enterprise-solution",
    title: "Enterprise Solution Portfolio",
    category: "eCommerce",
    headline: "Enterprise commerce and software builds for complex, multi-region operations.",
    summary:
      "Selected enterprise projects covering ERP integration, multi-region storefronts, and custom B2B/B2C commerce workflows.",
    stats: [
      {
        icon: "box",
        value: "2+",
        label: "Enterprise Builds",
      },
      {
        icon: "trend",
        value: "40%",
        label: "Avg Efficiency Gain",
      },
      {
        icon: "clock",
        value: "99%",
        label: "On-Time Delivery",
      },
      {
        icon: "globe",
        value: "3+",
        label: "Regions Served",
      },
    ],
    seo: {
      title: "Enterprise Solution Portfolio",
      description:
        "Enterprise Solution portfolio examples covering ERP integration, multi-region storefronts, and custom B2B/B2C commerce workflows.",
    },
  },
  {
    slug: "headless",
    title: "Headless Commerce",
    category: "eCommerce",
    headline: "Headless commerce architecture for fast, flexible storefronts.",
    summary: "Headless commerce portfolio examples using Next.js, GraphQL, APIs, and composable storefronts.",
    stats: [
      {
        icon: "box",
        value: "30+",
        label: "Projects Delivered",
      },
      {
        icon: "trend",
        value: "2X",
        label: "Avg Conversion Lift",
      },
      {
        icon: "clock",
        value: "99%",
        label: "On-Time Delivery",
      },
      {
        icon: "globe",
        value: "10+",
        label: "Countries Served",
      },
    ],
    seo: {
      title: "Headless Commerce Portfolio",
      description:
        "Headless commerce portfolio examples using Next.js, GraphQL, APIs, and composable storefronts.",
    },
  },
  {
    slug: "webflow",
    title: "Webflow",
    category: "eCommerce",
    headline: "Webflow projects with CMS structure, commerce, and polished brand interactions.",
    summary:
      "Webflow builds combining brand-forward frontend design with CMS architecture, custom code, commerce integrations, and performance discipline.",
    stats: [
      {
        icon: "box",
        value: "10+",
        label: "Webflow Builds",
      },
      {
        icon: "trend",
        value: "96",
        label: "Avg PageSpeed Score",
      },
      {
        icon: "clock",
        value: "99%",
        label: "On-Time Delivery",
      },
      {
        icon: "globe",
        value: "15+",
        label: "Countries Served",
      },
    ],
    seo: {
      title: "Webflow Portfolio",
      description: "Webflow portfolio examples for CMS, eCommerce, custom code, and brand interactions.",
    },
  },
  {
    slug: "saas-mvp-development",
    title: "SaaS & MVP Portfolio",
    category: "Enterprise Solutions",
    headline: "SaaS products and MVPs built from first release to scale.",
    summary:
      "Product builds covering workflow automation, analytics, white-label dashboards, multi-tenant systems, and compliance automation.",
    stats: [
      {
        icon: "box",
        value: "6+",
        label: "Products Shipped",
      },
      {
        icon: "trend",
        value: "99.9%",
        label: "Uptime SLA",
      },
      {
        icon: "clock",
        value: "8-12 wks",
        label: "Avg MVP Timeline",
      },
      {
        icon: "globe",
        value: "500+",
        label: "Enterprise Users",
      },
    ],
    sampleProjects: [
      {
        name: "FlowSync",
        description:
          "Team workflow automation SaaS with drag-and-drop pipeline builder and Slack integration.",
        tags: ["React", "Node.js", "Stripe", "AWS"],
        metric: "500+ Enterprise Users",
      },
      {
        name: "InsightHub",
        description: "B2B analytics SaaS with white-label dashboards and multi-tenant architecture.",
        tags: ["Vue.js", "Python", "PostgreSQL"],
        metric: "99.9% Uptime SLA",
      },
      {
        name: "ComplianceKey",
        description: "Automated regulatory compliance tracking platform built for fintech startups.",
        tags: ["Next.js", "Node.js", "MongoDB"],
        metric: "300+ Rules Automated",
      },
    ],
    seo: {
      title: "SaaS & MVP Portfolio",
      description:
        "SaaS and MVP portfolio examples for workflow automation, analytics, and multi-tenant platforms.",
    },
  },
  {
    slug: "website-development",
    title: "Website Development Portfolio",
    category: "Enterprise Solutions",
    headline: "Website projects built for speed, clarity, and maintainability.",
    summary:
      "Responsive website work for brands, SaaS teams, and operational tools, including CMS builds, performance cleanups, and structured content systems.",
    stats: [
      {
        icon: "box",
        value: "9+",
        label: "Websites Delivered",
      },
      {
        icon: "trend",
        value: "96",
        label: "Avg PageSpeed Score",
      },
      {
        icon: "clock",
        value: "99%",
        label: "On-Time Delivery",
      },
      {
        icon: "globe",
        value: "8+",
        label: "Industries Served",
      },
    ],
    sampleProjects: [
      {
        name: "Axiom Agency",
        description:
          "Hybrid CMS website with scroll interactions, editorial content, and conversion-focused pages.",
        tags: ["Webflow", "CMS", "Custom Code"],
        metric: "96 / 100 PageSpeed",
      },
      {
        name: "FinCore Dashboard",
        description: "Frontend performance audit and re-architecture reducing load time from 8s to 0.8s.",
        tags: ["React", "Bundle Optimization", "CDN"],
        metric: "10x Performance Gain",
      },
    ],
    seo: {
      title: "Website Development Portfolio",
      description:
        "Website development portfolio examples for CMS builds, performance improvements, and responsive websites.",
    },
  },
  {
    slug: "ai-automation-solutions",
    title: "AI & Automation Portfolio",
    category: "Enterprise Solutions",
    headline: "AI automation projects tied to measurable operational outcomes.",
    summary:
      "Applied AI projects across document processing, support automation, predictive scoring, recommendations, and workflow automation.",
    stats: [
      {
        icon: "box",
        value: "3+",
        label: "AI Systems Deployed",
      },
      {
        icon: "trend",
        value: "70%",
        label: "Avg Ticket Deflection",
      },
      {
        icon: "clock",
        value: "90%",
        label: "Manual Work Eliminated",
      },
      {
        icon: "globe",
        value: "3+",
        label: "Industries Served",
      },
    ],
    sampleProjects: [
      {
        name: "DocuFlow AI",
        description:
          "Intelligent document processing pipeline that extracts, classifies, and routes with high accuracy.",
        tags: ["Python", "OpenAI", "AWS Lambda"],
        metric: "90% Manual Work Eliminated",
      },
      {
        name: "SupportAI",
        description: "Conversational AI agent trained on client docs to handle Tier-1 support tickets.",
        tags: ["LangChain", "GPT-4", "Node.js"],
        metric: "70% Ticket Deflection",
      },
      {
        name: "LeadScore AI",
        description:
          "Predictive lead scoring model integrated into CRM with real-time sales recommendations.",
        tags: ["Python", "scikit-learn", "FastAPI"],
        metric: "35% Sales Cycle Reduction",
      },
    ],
    seo: {
      title: "AI & Automation Portfolio",
      description:
        "AI automation portfolio examples for document processing, support automation, and predictive workflows.",
    },
  },
  {
    slug: "erp-crm-development",
    title: "ERP & CRM Portfolio",
    category: "Enterprise Solutions",
    headline: "Operational systems for sales, production, inventory, and teams.",
    summary:
      "ERP and CRM case studies covering manufacturing operations, insurance workflows, inventory control, reporting, and role-based access.",
    stats: [
      {
        icon: "box",
        value: "2+",
        label: "Enterprise Systems",
      },
      {
        icon: "trend",
        value: "40%",
        label: "Avg Efficiency Gain",
      },
      {
        icon: "clock",
        value: "3,000+",
        label: "Agent Users Supported",
      },
      {
        icon: "globe",
        value: "2+",
        label: "Industries Served",
      },
    ],
    sampleProjects: [
      {
        name: "NexusERP",
        description:
          "Custom manufacturing ERP with production scheduling, inventory control, and HR modules.",
        tags: ["Node.js", "PostgreSQL", "React", "Docker"],
        metric: "40% Efficiency Gain",
      },
      {
        name: "ClientFlow CRM",
        description:
          "Insurance sector CRM built for 3,000+ agents with policy tracking and claims management.",
        tags: ["Django", "React", "PostgreSQL"],
        metric: "3,000+ Agent Users",
      },
    ],
    seo: {
      title: "ERP & CRM Portfolio",
      description:
        "ERP and CRM portfolio examples for operations, manufacturing, insurance, reporting, and inventory workflows.",
    },
  },
  {
    slug: "ui-ux-product-design",
    title: "UI/UX & Product Design Portfolio",
    category: "Enterprise Solutions",
    headline: "Product design work for dashboards, commerce, and complex workflows.",
    summary:
      "Design projects focused on information hierarchy, responsive interfaces, user flows, dashboards, and implementation-ready systems.",
    stats: [
      {
        icon: "box",
        value: "2+",
        label: "Products Designed",
      },
      {
        icon: "trend",
        value: "200+",
        label: "Metrics Tracked",
      },
      {
        icon: "clock",
        value: "50+",
        label: "Live Data Sources",
      },
      {
        icon: "globe",
        value: "2+",
        label: "Industries Served",
      },
    ],
    sampleProjects: [
      {
        name: "SalesMatrix",
        description: "Executive KPI dashboard with drill-down analytics and automated PDF report exports.",
        tags: ["UX Design", "Dashboard", "Analytics"],
        metric: "200+ Metrics Tracked",
      },
      {
        name: "OpsVision",
        description:
          "Real-time operations dashboard with clear information hierarchy across 50+ data sources.",
        tags: ["Product Design", "D3.js", "WebSockets"],
        metric: "50+ Live Data Sources",
      },
    ],
    seo: {
      title: "UI/UX & Product Design Portfolio",
      description:
        "UI/UX and product design portfolio examples for dashboards, product workflows, and information design.",
    },
  },
];

// Note: "headless" had no entry in the legacy script (its page rendered empty);
// it is built from the headless service headline, its meta description and the default stats.

export const getPortfolioPage = (slug: string) => portfolioPages.find((p) => p.slug === slug);

/** Portfolio hub (/portfolio) groups, in display order. */
export const portfolioHubGroups = [
  // "enterprise-solution" removed from the hub (not in use); its URL 301s to /portfolio (vercel.json).
  {
    title: "eCommerce",
    slugs: ["shopify", "bigcommerce", "volusion", "webflow" /* , "enterprise-solution" */],
  },
];

export const portfolioHubSeo = {
  title: "Portfolio",
  description:
    "Explore Triyanshi Technologies portfolio across eCommerce, SaaS, AI automation, ERP/CRM, websites, and product design.",
};
