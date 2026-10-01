/*
 * Standard service pages (/services/[slug]) — migrated from the legacy
 * services/service-pages.js. The eCommerce, Enterprise Solutions and
 * Compliance landing pages have their own page files.
 *
 * sampleProjects: illustrative examples shown only when the page's Sanity
 * showcase is empty (legacy placeholder content).
 */
export type ServiceCategory = "eCommerce" | "Enterprise Solutions" | "Compliance";
export type Stat = { value: string; label: string };
export type SampleProject = { name: string; description: string; tags: string[]; metric: string };

export type ServiceContent = {
  slug: string;
  title: string;
  category: ServiceCategory;
  headline: string;
  summary: string;
  body: string;
  deliverables: string[];
  stack: string[];
  stats: Stat[];
  sampleProjects?: SampleProject[];
  seo: { title: string; description: string };
};

export const services: ServiceContent[] = [
  {
    slug: "shopify",
    title: "Shopify",
    category: "eCommerce",
    headline: "Shopify stores engineered for conversion and scale.",
    summary:
      "Custom Shopify and Shopify Plus development for D2C brands. We handle theme builds, Hydrogen storefronts, app integrations, migrations, and performance work with a conversion-first mindset.",
    body: "From a focused launch store to a complex Shopify Plus ecosystem, our team plans the customer journey, cleans up the technical architecture, and ships a storefront your operators can actually run.",
    deliverables: [
      "Custom theme development",
      "Shopify Plus enterprise builds",
      "App integration and custom app workflows",
      "Migration from Magento or BigCommerce",
      "Performance optimization and Core Web Vitals tuning",
      "Ongoing support and maintenance",
    ],
    stack: ["Liquid", "Hydrogen", "React", "GraphQL", "Shopify CLI", "Klaviyo"],
    stats: [
      {
        value: "4-8 weeks",
        label: "Typical launch window",
      },
      {
        value: "3x",
        label: "Faster headless storefronts",
      },
      {
        value: "Plus ready",
        label: "Enterprise commerce support",
      },
    ],
    seo: {
      title: "Shopify Development",
      description: "Custom Shopify and Shopify Plus development for high-converting commerce stores.",
    },
  },
  {
    slug: "bigcommerce",
    title: "BigCommerce",
    category: "eCommerce",
    headline: "Enterprise-grade BigCommerce for B2B and multi-storefront growth.",
    summary:
      "BigCommerce development for complex catalogs, B2B purchasing, multi-storefront operations, and headless commerce flexibility.",
    body: "We use BigCommerce where control, scale, and business rules matter. Our builds keep buyer flows clear while connecting pricing, inventory, ERP, CRM, and fulfillment systems behind the scenes.",
    deliverables: [
      "Multi-storefront setup",
      "B2B and wholesale portals",
      "Headless BigCommerce with Next.js",
      "Custom checkout flows",
      "ERP and CRM integrations",
      "Stencil theme customization",
    ],
    stack: ["Stencil", "Next.js", "BigCommerce API", "GraphQL", "Node.js"],
    stats: [
      {
        value: "B2B",
        label: "Wholesale-ready architecture",
      },
      {
        value: "API first",
        label: "Clean integration surface",
      },
      {
        value: "Multi-store",
        label: "Market and brand expansion",
      },
    ],
    seo: {
      title: "BigCommerce Development",
      description: "BigCommerce development for B2B, multi-storefront, and headless commerce.",
    },
  },
  {
    slug: "volusion",
    title: "Volusion",
    category: "eCommerce",
    headline: "Volusion storefronts, migrations, and custom commerce improvements.",
    summary:
      "Volusion development for merchants who need catalog cleanup, custom storefront behavior, checkout improvements, and migration planning.",
    body: "Whether you are improving an existing Volusion store or preparing a move to a modern commerce stack, we help stabilize the customer journey and protect revenue while the platform evolves.",
    deliverables: [
      "Volusion theme customization",
      "Catalog and product experience improvements",
      "Checkout and conversion optimization",
      "Subscription and gifting workflows",
      "Analytics and tracking setup",
      "Migration readiness planning",
    ],
    stack: ["Volusion", "JavaScript", "HTML", "CSS", "Analytics"],
    stats: [
      {
        value: "Fast wins",
        label: "Conversion-focused updates",
      },
      {
        value: "Legacy care",
        label: "Stable platform support",
      },
      {
        value: "Migration ready",
        label: "Clear future roadmap",
      },
    ],
    seo: {
      title: "Volusion Development",
      description:
        "Volusion storefront improvements, custom commerce workflows, and migration readiness planning.",
    },
  },
  {
    slug: "enterprise-solution",
    title: "Enterprise Solution",
    category: "eCommerce",
    headline: "Enterprise commerce built for scale, integration, and control.",
    summary:
      "Enterprise-grade commerce and software solutions for organizations running complex catalogs, multi-region storefronts, and deep ERP/CRM integrations.",
    body: "We design and build enterprise systems that hold up under real operational load: custom workflows, role-based access, and integrations that keep pricing, inventory, and fulfillment in sync across regions and business units.",
    deliverables: [
      "ERP and CRM integration",
      "Multi-region storefront architecture",
      "Custom B2B/B2C workflows",
      "Role-based access and approvals",
      "Legacy system modernization",
      "Dedicated support and SLAs",
    ],
    stack: ["Node.js", "React", "PostgreSQL", "GraphQL", "AWS", "Docker"],
    stats: [
      {
        value: "Enterprise",
        label: "Scale-ready architecture",
      },
      {
        value: "Integrated",
        label: "ERP, CRM, and fulfillment sync",
      },
      {
        value: "Global",
        label: "Multi-region deployments",
      },
    ],
    // No legacy HTML page existed (the hub linked to a 404); SEO built from its own copy.
    seo: {
      title: "Enterprise Solution",
      description:
        "Enterprise-grade commerce and software solutions for organizations running complex catalogs, multi-region storefronts, and deep ERP/CRM integrations.",
    },
  },
  {
    slug: "webflow",
    title: "Webflow",
    category: "eCommerce",
    headline: "Webflow sites where design freedom meets production quality.",
    summary:
      "Webflow development for brands that want polished websites, CMS platforms, eCommerce flows, and custom code without heavy maintenance.",
    body: "We use Webflow for fast-moving brand and commerce teams that care about visual quality. Our work includes clean CMS models, interaction systems, custom integrations, and SEO-ready implementation.",
    deliverables: [
      "Custom Webflow websites",
      "Webflow eCommerce stores",
      "CMS collection setup",
      "Custom interactions and animations",
      "Webflow plus Shopify integrations",
      "Webflow SEO optimization",
    ],
    stack: ["Webflow", "HTML", "CSS", "JavaScript", "Webflow API", "Zapier"],
    stats: [
      {
        value: "CMS ready",
        label: "Structured content workflows",
      },
      {
        value: "No-code",
        label: "With custom code where needed",
      },
      {
        value: "SEO tuned",
        label: "Launch-ready foundations",
      },
    ],
    seo: {
      title: "Webflow Development",
      description: "Webflow development for custom websites, CMS platforms, eCommerce, and integrations.",
    },
  },
  {
    slug: "headless",
    title: "Headless Commerce",
    category: "eCommerce",
    headline: "Headless commerce architecture for fast, flexible storefronts.",
    summary:
      "Decouple the frontend from the commerce backend for faster performance, design freedom, and scalable omnichannel experiences.",
    body: "We build headless storefronts with clear data contracts, modern frontend frameworks, and commerce APIs that support growth without trapping the brand in a rigid theme layer.",
    deliverables: [
      "Shopify Hydrogen storefronts",
      "Next.js plus Shopify or BigCommerce",
      "Remix plus commerce APIs",
      "Composable commerce architecture",
      "CDN-edge deployment",
      "Progressive Web App features",
    ],
    stack: ["Hydrogen", "Remix", "Next.js", "React", "GraphQL", "Vercel"],
    stats: [
      {
        value: "Sub-second",
        label: "Storefront experience target",
      },
      {
        value: "API first",
        label: "Composable architecture",
      },
      {
        value: "PWA ready",
        label: "Modern buyer experience",
      },
    ],
    seo: {
      title: "Headless Commerce",
      description: "Headless commerce storefronts with Hydrogen, Remix, Next.js, React, and commerce APIs.",
    },
  },
  {
    slug: "saas-mvp-development",
    title: "SaaS & MVP",
    category: "Enterprise Solutions",
    headline: "From validated MVP to scalable SaaS platform.",
    summary:
      "We design and build SaaS products, MVPs, internal platforms, and subscription software with clean architecture and a sharp product lens.",
    body: "Our team helps you move from idea to working product without overbuilding. We define the core workflow, build the first reliable version, and set up the foundation for growth.",
    deliverables: [
      "MVP discovery and feature prioritization",
      "Multi-tenant SaaS architecture",
      "Subscription and billing flows",
      "Admin dashboards and user roles",
      "API design and integrations",
      "Product analytics and launch support",
    ],
    stack: ["React", "Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    stats: [
      {
        value: "MVP first",
        label: "Focused product delivery",
      },
      {
        value: "Multi-tenant",
        label: "Built for SaaS scale",
      },
      {
        value: "Analytics",
        label: "Measure what matters",
      },
    ],
    seo: {
      title: "SaaS & MVP Development",
      description: "SaaS and MVP development for scalable product launches, dashboards, billing, and APIs.",
    },
  },
  {
    slug: "website-development",
    title: "Web Development",
    category: "Enterprise Solutions",
    headline: "High-performance websites built for real business workflows.",
    summary:
      "Website development for agencies, SaaS teams, service companies, and commerce brands that need fast, responsive, maintainable digital experiences.",
    body: "We build websites that are easy to manage, fast to load, and structured around how visitors actually evaluate your business. The result is a polished frontend backed by practical engineering.",
    deliverables: [
      "Responsive website development",
      "CMS and content modeling",
      "Landing pages and microsites",
      "Performance and accessibility improvements",
      "Third-party integrations",
      "Deployment and maintenance support",
    ],
    stack: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Webflow"],
    stats: [
      {
        value: "Responsive",
        label: "Mobile and desktop ready",
      },
      {
        value: "SEO aware",
        label: "Structured page foundations",
      },
      {
        value: "Maintainable",
        label: "Built for updates",
      },
    ],
    seo: {
      title: "Website Development",
      description:
        "Responsive website development for performance, CMS workflows, accessibility, and SEO foundations.",
    },
  },
  {
    slug: "ai-automation-solutions",
    title: "AI & Automation",
    category: "Enterprise Solutions",
    headline: "Practical AI automations that remove busywork and unlock revenue.",
    summary:
      "AI engineered into business workflows: product recommendations, intelligent search, document processing, support automation, and predictive models.",
    body: "We focus on AI use cases that can be measured. That means clean data inputs, clear human review paths, and automations that integrate with the systems your team already uses.",
    deliverables: [
      "AI product recommendations",
      "Intelligent NLP search",
      "Dynamic pricing engines",
      "Automated product descriptions",
      "Predictive inventory workflows",
      "AI customer segmentation",
    ],
    stack: ["OpenAI", "LangChain", "Python", "Node.js", "FastAPI", "AWS Lambda"],
    stats: [
      {
        value: "90%",
        label: "Manual work removed",
      },
      {
        value: "70%",
        label: "Ticket deflection target",
      },
      {
        value: "AI ready",
        label: "Human-in-the-loop controls",
      },
    ],
    seo: {
      title: "AI & Automation Solutions",
      description:
        "AI and automation solutions for recommendations, search, document workflows, and business process automation.",
    },
  },
  {
    slug: "erp-crm-development",
    title: "ERP & CRM",
    category: "Enterprise Solutions",
    headline: "Custom ERP and CRM systems aligned with how your teams operate.",
    summary:
      "We build operational software for inventory, sales, production, HR, customer management, reporting, and cross-team workflows.",
    body: "Off-the-shelf platforms often force teams into awkward workarounds. We map the real process, design the right data model, and build systems that reduce handoffs instead of creating more admin.",
    deliverables: [
      "Custom CRM and ERP modules",
      "Inventory and production workflows",
      "Role-based access controls",
      "Reporting and KPI dashboards",
      "Third-party API integrations",
      "Data migration and training support",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Docker", "Django", "REST API"],
    stats: [
      {
        value: "40%",
        label: "Efficiency improvement target",
      },
      {
        value: "Role based",
        label: "Secure access model",
      },
      {
        value: "Integrated",
        label: "Fewer manual handoffs",
      },
    ],
    seo: {
      title: "ERP & CRM Development",
      description:
        "Custom ERP and CRM development for operational workflows, reporting, inventory, sales, and integrations.",
    },
  },
  {
    slug: "ui-ux-product-design",
    title: "UI/UX & Product Design",
    category: "Enterprise Solutions",
    headline: "Product design that makes complex workflows feel simple.",
    summary:
      "User-centered design backed by research, interaction clarity, accessibility, and clean design systems for digital products and commerce experiences.",
    body: "We design interfaces for people who need to get things done. Our process turns product goals into wireframes, prototypes, visual systems, and implementation-ready screens.",
    deliverables: [
      "User research and journey mapping",
      "Wireframing and prototyping",
      "Design systems",
      "Responsive interface design",
      "Accessibility reviews",
      "Design-to-code handoff",
    ],
    stack: ["Figma", "Framer", "Maze", "Design Systems", "WCAG", "Prototyping"],
    stats: [
      {
        value: "Research led",
        label: "Decisions grounded in users",
      },
      {
        value: "WCAG aware",
        label: "Inclusive experience checks",
      },
      {
        value: "Handoff ready",
        label: "Cleaner build cycles",
      },
    ],
    seo: {
      title: "UI/UX & Product Design",
      description: "UI/UX and product design for research-led, responsive, accessible digital products.",
    },
  },
  {
    slug: "regulatory-consulting",
    title: "Regulatory Consulting",
    category: "Compliance",
    headline: "Regulatory guidance translated into practical operating controls.",
    summary:
      "We help growing teams understand compliance expectations, assess current gaps, and build pragmatic roadmaps for regulatory readiness.",
    body: "Compliance work should reduce business risk without freezing delivery. We turn requirements into clear responsibilities, operating checks, and documentation that teams can follow.",
    deliverables: [
      "Regulatory readiness assessment",
      "Control gap analysis",
      "Compliance roadmap planning",
      "Vendor and system risk review",
      "Stakeholder documentation",
      "Implementation support",
    ],
    stack: ["Risk Review", "Control Mapping", "Documentation", "Workshops", "Roadmaps"],
    stats: [
      {
        value: "Gap-first",
        label: "Clear remediation priorities",
      },
      {
        value: "Practical",
        label: "Designed for daily teams",
      },
      {
        value: "Audit aware",
        label: "Evidence-ready process",
      },
    ],
    sampleProjects: [
      {
        name: "ComplianceKey",
        description: "Automated regulatory compliance tracking platform built for fintech startups.",
        tags: ["Compliance", "Next.js", "Automation"],
        metric: "300+ Rules Automated",
      },
      {
        name: "FinCore Dashboard",
        description:
          "Risk reporting dashboard with role-based visibility and executive compliance summaries.",
        tags: ["Risk", "React", "Reporting"],
        metric: "10x Faster Reviews",
      },
    ],
    seo: {
      title: "Regulatory Consulting",
      description:
        "Regulatory consulting for compliance readiness, control mapping, risk review, and implementation roadmaps.",
    },
  },
  {
    slug: "audit-risk-management",
    title: "Audit & Risk Management",
    category: "Compliance",
    headline: "Risk programs that make audits clearer and operations safer.",
    summary:
      "Audit readiness, risk registers, control testing, and management reporting for teams that need stronger governance.",
    body: "We help identify where risk actually lives, define evidence expectations, and build repeatable review cycles that make audits less reactive.",
    deliverables: [
      "Audit readiness reviews",
      "Risk register setup",
      "Control testing plans",
      "Evidence collection workflows",
      "Management reporting",
      "Remediation tracking",
    ],
    stack: ["Risk Registers", "Control Testing", "Evidence Review", "Reporting", "Governance"],
    stats: [
      {
        value: "Repeatable",
        label: "Structured review cycles",
      },
      {
        value: "Evidence led",
        label: "Cleaner audit trails",
      },
      {
        value: "Actionable",
        label: "Clear remediation owners",
      },
    ],
    sampleProjects: [
      {
        name: "ComplianceKey",
        description:
          "Automated compliance tracking platform with risk rules, owners, and remediation status.",
        tags: ["Risk", "Automation", "Reporting"],
        metric: "300+ Rules Automated",
      },
    ],
    seo: {
      title: "Audit & Risk Management",
      description:
        "Audit and risk management support for readiness reviews, risk registers, control testing, and reporting.",
    },
  },
  {
    slug: "policy-documentation",
    title: "Policy & Documentation",
    category: "Compliance",
    headline: "Policies, SOPs, and documentation your team can actually use.",
    summary:
      "We create and improve policy libraries, SOPs, process maps, and implementation documentation for growing digital teams.",
    body: "Good documentation is not just a PDF archive. We design policy and process materials around ownership, clarity, versioning, and the decisions teams make every week.",
    deliverables: [
      "Policy library creation",
      "SOP and process documentation",
      "Control ownership matrices",
      "Training-ready documentation",
      "Versioning and review cadence",
      "Implementation checklists",
    ],
    stack: ["SOPs", "Policy Libraries", "Process Maps", "Training Docs", "Control Matrices"],
    stats: [
      {
        value: "Clear owners",
        label: "Less ambiguity",
      },
      {
        value: "Review ready",
        label: "Versioned documentation",
      },
      {
        value: "Team usable",
        label: "Plain-language process",
      },
    ],
    sampleProjects: [
      {
        name: "ComplianceKey",
        description:
          "Policy and control documentation workflow for a fintech compliance automation platform.",
        tags: ["Documentation", "Controls", "Fintech"],
        metric: "300+ Rules Automated",
      },
    ],
    seo: {
      title: "Policy & Documentation",
      description: "Policy, SOP, process, and compliance documentation for growing digital teams.",
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** "How We Work" steps shown on every standard service page. */
export const deliveryProcess = [
  {
    title: "Discover",
    text: "We clarify goals, users, constraints, and success metrics before shaping the solution.",
  },
  {
    title: "Design",
    text: "We turn requirements into architecture, flows, interfaces, and a realistic delivery plan.",
  },
  {
    title: "Deliver",
    text: "We build, test, launch, and support the service with transparent communication throughout.",
  },
];

/** Services hub (/services) groups, in display order. */
export const serviceHubGroups: { title: ServiceCategory; slugs: string[] }[] = [
  {
    title: "eCommerce",
    slugs: ["shopify", "bigcommerce", "volusion", "webflow", "headless", "enterprise-solution"],
  },
  {
    title: "Enterprise Solutions",
    slugs: [
      "saas-mvp-development",
      "website-development",
      "ai-automation-solutions",
      "erp-crm-development",
      "ui-ux-product-design",
    ],
  },
  { title: "Compliance", slugs: ["regulatory-consulting", "audit-risk-management", "policy-documentation"] },
];

export const servicesHubSeo = {
  title: "Services",
  description:
    "Explore Triyanshi Technologies services across eCommerce, SaaS, AI automation, design, and compliance.",
};
