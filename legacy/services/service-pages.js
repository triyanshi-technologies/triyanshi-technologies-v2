(function () {
  "use strict";

  var SERVICES = {
    shopify: {
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
      stack: [
        "Liquid",
        "Hydrogen",
        "React",
        "GraphQL",
        "Shopify CLI",
        "Klaviyo",
      ],
      stats: [
        ["4-8 weeks", "Typical launch window"],
        ["3x", "Faster headless storefronts"],
        ["Plus ready", "Enterprise commerce support"],
      ],
      projects: [],
    },
    bigcommerce: {
      title: "BigCommerce",
      category: "eCommerce",
      headline:
        "Enterprise-grade BigCommerce for B2B and multi-storefront growth.",
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
        ["B2B", "Wholesale-ready architecture"],
        ["API first", "Clean integration surface"],
        ["Multi-store", "Market and brand expansion"],
      ],
      projects: [],
    },
    volusion: {
      title: "Volusion",
      category: "eCommerce",
      headline:
        "Volusion storefronts, migrations, and custom commerce improvements.",
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
        ["Fast wins", "Conversion-focused updates"],
        ["Legacy care", "Stable platform support"],
        ["Migration ready", "Clear future roadmap"],
      ],
      projects: [],
    },
    "enterprise-solution": {
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
        ["Enterprise", "Scale-ready architecture"],
        ["Integrated", "ERP, CRM, and fulfillment sync"],
        ["Global", "Multi-region deployments"],
      ],
      projects: [],
    },
    webflow: {
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
        ["CMS ready", "Structured content workflows"],
        ["No-code", "With custom code where needed"],
        ["SEO tuned", "Launch-ready foundations"],
      ],
      projects: [],
    },
    headless: {
      title: "Headless Commerce",
      category: "eCommerce",
      headline:
        "Headless commerce architecture for fast, flexible storefronts.",
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
        ["Sub-second", "Storefront experience target"],
        ["API first", "Composable architecture"],
        ["PWA ready", "Modern buyer experience"],
      ],
      projects: [],
    },
    "saas-mvp-development": {
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
        ["MVP first", "Focused product delivery"],
        ["Multi-tenant", "Built for SaaS scale"],
        ["Analytics", "Measure what matters"],
      ],
      projects: [],
    },
    "website-development": {
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
        ["Responsive", "Mobile and desktop ready"],
        ["SEO aware", "Structured page foundations"],
        ["Maintainable", "Built for updates"],
      ],
      projects: [],
    },
    "ai-automation-solutions": {
      title: "AI & Automation",
      category: "Enterprise Solutions",
      headline:
        "Practical AI automations that remove busywork and unlock revenue.",
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
      stack: [
        "OpenAI",
        "LangChain",
        "Python",
        "Node.js",
        "FastAPI",
        "AWS Lambda",
      ],
      stats: [
        ["90%", "Manual work removed"],
        ["70%", "Ticket deflection target"],
        ["AI ready", "Human-in-the-loop controls"],
      ],
      projects: [],
    },
    "erp-crm-development": {
      title: "ERP & CRM",
      category: "Enterprise Solutions",
      headline:
        "Custom ERP and CRM systems aligned with how your teams operate.",
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
        ["40%", "Efficiency improvement target"],
        ["Role based", "Secure access model"],
        ["Integrated", "Fewer manual handoffs"],
      ],
      projects: [],
    },
    "ui-ux-product-design": {
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
      stack: [
        "Figma",
        "Framer",
        "Maze",
        "Design Systems",
        "WCAG",
        "Prototyping",
      ],
      stats: [
        ["Research led", "Decisions grounded in users"],
        ["WCAG aware", "Inclusive experience checks"],
        ["Handoff ready", "Cleaner build cycles"],
      ],
      projects: [],
    },
    "regulatory-consulting": {
      title: "Regulatory Consulting",
      category: "Compliance",
      headline:
        "Regulatory guidance translated into practical operating controls.",
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
      stack: [
        "Risk Review",
        "Control Mapping",
        "Documentation",
        "Workshops",
        "Roadmaps",
      ],
      stats: [
        ["Gap-first", "Clear remediation priorities"],
        ["Practical", "Designed for daily teams"],
        ["Audit aware", "Evidence-ready process"],
      ],
      projects: [
        {
          name: "ComplianceKey",
          desc: "Automated regulatory compliance tracking platform built for fintech startups.",
          tags: ["Compliance", "Next.js", "Automation"],
          metric: "300+ Rules Automated",
        },
        {
          name: "FinCore Dashboard",
          desc: "Risk reporting dashboard with role-based visibility and executive compliance summaries.",
          tags: ["Risk", "React", "Reporting"],
          metric: "10x Faster Reviews",
        },
      ],
    },
    "audit-risk-management": {
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
      stack: [
        "Risk Registers",
        "Control Testing",
        "Evidence Review",
        "Reporting",
        "Governance",
      ],
      stats: [
        ["Repeatable", "Structured review cycles"],
        ["Evidence led", "Cleaner audit trails"],
        ["Actionable", "Clear remediation owners"],
      ],
      projects: [
        {
          name: "ComplianceKey",
          desc: "Automated compliance tracking platform with risk rules, owners, and remediation status.",
          tags: ["Risk", "Automation", "Reporting"],
          metric: "300+ Rules Automated",
        },
      ],
    },
    "policy-documentation": {
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
      stack: [
        "SOPs",
        "Policy Libraries",
        "Process Maps",
        "Training Docs",
        "Control Matrices",
      ],
      stats: [
        ["Clear owners", "Less ambiguity"],
        ["Review ready", "Versioned documentation"],
        ["Team usable", "Plain-language process"],
      ],
      projects: [
        {
          name: "ComplianceKey",
          desc: "Policy and control documentation workflow for a fintech compliance automation platform.",
          tags: ["Documentation", "Controls", "Fintech"],
          metric: "300+ Rules Automated",
        },
      ],
    },
    ecommerce: {
      title: "eCommerce",
      category: "eCommerce",
      headline: "Commerce experiences built to convert.",
      summary:
        "End-to-end eCommerce development across Shopify, BigCommerce, Volusion, Webflow, and headless architectures - built to launch faster, convert better, and scale with your business.",
      body: "We build, redesign, and optimize commerce experiences that are fast, user-friendly, and built to convert - from platform selection and migration to ongoing performance and growth work.",
      deliverables: [
        "Store development and redesign",
        "Platform migration",
        "CRO, UX and performance optimization",
        "SEO and growth optimization",
        "Ongoing maintenance and support",
        "Multi-platform integrations",
      ],
      stack: ["Shopify", "BigCommerce", "Volusion", "Webflow", "Headless", "GraphQL"],
      stats: [
        ["4-8 weeks", "Typical launch window"],
        ["3x", "Faster headless storefronts"],
        ["Plus ready", "Enterprise commerce support"],
      ],
      projects: [],
      skipStandardSections: true,
    },
    "enterprise-solutions": {
      title: "Enterprise Solutions",
      category: "Enterprise Solutions",
      headline: "Enterprise-grade software and intelligent systems built to scale.",
      summary:
        "We design and build enterprise software, SaaS products, AI automation, and ERP/CRM systems that streamline operations, connect data, and scale with your business.",
      body: "From MVPs to enterprise-grade systems, our Enterprise Solutions team builds the software your business actually needs - automating operations, connecting data, and unlocking growth.",
      deliverables: [
        "Custom software development",
        "AI-powered automation",
        "ERP, CRM and business portals",
        "Integrations and APIs",
        "Analytics and dashboards",
        "MVP and SaaS product development",
      ],
      stack: ["React", "Node.js", "Next.js", "Python", "PostgreSQL", "OpenAI"],
      stats: [
        ["MVP first", "Focused product delivery"],
        ["90%", "Manual work removed"],
        ["Integrated", "Fewer manual handoffs"],
      ],
      projects: [],
      skipStandardSections: true,
    },
    compliance: {
      title: "Compliance",
      category: "Compliance",
      headline: "Compliance and security built into how you operate.",
      summary:
        "We help organizations become audit-ready and security-conscious with the right processes and controls - from SOC 2 and ISO 27001 readiness to GDPR advisory and ongoing risk management.",
      body: "We work across the full compliance lifecycle - from readiness assessments and audits to ongoing risk management and documentation - so you can focus on running your business with confidence.",
      deliverables: [
        "SOC 2 readiness",
        "ISO 27001 readiness",
        "GDPR advisory",
        "Risk and compliance management",
        "Policy and documentation",
        "Audit readiness reviews",
      ],
      stack: ["Risk Review", "Control Mapping", "Documentation", "Workshops", "Roadmaps", "Governance"],
      stats: [
        ["Gap-first", "Clear remediation priorities"],
        ["Practical", "Designed for daily teams"],
        ["Audit aware", "Evidence-ready process"],
      ],
      projects: [
        {
          name: "ComplianceKey",
          desc: "Automated regulatory compliance tracking platform built for fintech startups.",
          tags: ["Compliance", "Next.js", "Automation"],
          metric: "300+ Rules Automated",
        },
        {
          name: "FinCore Dashboard",
          desc: "Risk reporting dashboard with role-based visibility and executive compliance summaries.",
          tags: ["Risk", "React", "Reporting"],
          metric: "10x Faster Reviews",
        },
      ],
      skipStandardSections: true,
    },
  };

  (function buildServiceProjectsFromData() {
    var data = window.PORTFOLIO_DATA;
    if (!data) return;

    var serviceProjects = {};
    Object.keys(data.projects).forEach(function (slug) {
      var proj = data.projects[slug];
      (proj.services || []).forEach(function (membership) {
        if (!serviceProjects[membership.key])
          serviceProjects[membership.key] = [];
        var position =
          membership.position !== undefined
            ? membership.position
            : proj.position;
        serviceProjects[membership.key].push({
          name: proj.name,
          desc: proj.desc,
          tags: proj.tags,
          metric: proj.category,
          domain: proj.domain,
          position: position,
        });
      });
    });

    Object.keys(serviceProjects).forEach(function (key) {
      if (!SERVICES[key]) return;
      SERVICES[key].projects = serviceProjects[key]
        .slice()
        .sort(function (a, b) {
          return a.position - b.position;
        });
    });
  })();

  var PROCESS = [
    [
      "Discover",
      "We clarify goals, users, constraints, and success metrics before shaping the solution.",
    ],
    [
      "Design",
      "We turn requirements into architecture, flows, interfaces, and a realistic delivery plan.",
    ],
    [
      "Deliver",
      "We build, test, launch, and support the service with transparent communication throughout.",
    ],
  ];

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function arrow() {
    return '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  }

  function renderList(items) {
    return items
      .map(function (item) {
        return "<li>" + esc(item) + "</li>";
      })
      .join("");
  }

  function renderChips(items) {
    return items
      .map(function (item) {
        return '<span class="svc-chip">' + esc(item) + "</span>";
      })
      .join("");
  }

  function renderStats(items) {
    return items
      .map(function (item) {
        return (
          '<div class="svc-stat"><strong>' +
          esc(item[0]) +
          "</strong><span>" +
          esc(item[1]) +
          "</span></div>"
        );
      })
      .join("");
  }

  function projectImgAttrs(domain) {
    var fallback = "../assets/sample-image.webp";
    if (!domain) return 'src="' + fallback + '"';
    var clean = domain
      .replace(/^https?:\/\//i, "")
      .split(/[/?#]/)[0]
      .replace(/^www\./, "")
      .toLowerCase();
    var primary = "../project-images/new/" + clean + ".webp";
    return (
      'src="' +
      primary +
      '" data-fallback-src="' +
      fallback +
      '" onerror="this.onerror=null;this.src=this.dataset.fallbackSrc;"'
    );
  }

  function renderProjects(projects) {
    if (!projects || !projects.length) {
      return '<div class="fp-empty"><strong>Projects coming soon</strong><span>We are curating the best examples for this service.</span></div>';
    }

    return projects
      .map(function (project, index) {
        var num = "Project " + String(index + 1).padStart(2, "0");
        var category = project.metric || num;
        var domain = project.domain || "";
        var tags = project.tags
          .map(function (tag) {
            return '<span class="fp-tag">' + esc(tag) + "</span>";
          })
          .join("");

        return (
          '<div class="fp-card" role="group" aria-label="' +
          esc(num + ": " + project.name) +
          '" aria-expanded="false" tabindex="0" style="animation-delay:' +
          index * 90 +
          'ms">' +
          "<img " +
          projectImgAttrs(domain) +
          ' alt="" class="fp-card-bg" loading="lazy" aria-hidden="true">' +
          '<div class="fp-card-label">' +
          '<strong class="fp-card-name">' +
          esc(project.name) +
          "</strong>" +
          '<span class="fp-card-num">' +
          esc(category) +
          "</span>" +
          '<span class="fp-card-toggle" aria-hidden="true">' +
          '<span class="fp-toggle-expand"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg></span>' +
          '<span class="fp-toggle-collapse"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>' +
          "</span>" +
          '<div class="fp-card-detail">' +
          '<p class="fp-card-desc">' +
          esc(project.desc) +
          "</p>" +
          '<div class="fp-card-tags">' +
          tags +
          "</div>" +
          '<div class="fp-card-footer">' +
          (domain
            ? '<a class="fp-domain" href="https://' +
              esc(domain) +
              '" target="_blank" rel="noopener noreferrer">' +
              esc(domain) +
              "</a>"
            : '<span class="fp-metric">' + esc(category) + "</span>") +
          '<a href="../portfolio-detail/portfolio-detail" class="fp-cta-link">View Case Study ' +
          arrow() +
          "</a>" +
          "</div></div></div></div>"
        );
      })
      .join("");
  }

  function renderPage(service) {
    var headerActions = service.skipStandardSections
      ? '<div class="svc-header-actions"><a href="../contact-us/contact-us" class="btn btn-primary">Start a Project</a></div>'
      : '<div class="svc-header-actions"><a href="../contact-us/contact-us" class="btn btn-primary">Start a Project</a><a href="#service-projects" class="btn btn-outline">View Projects</a></div>';

    var standardSections = service.skipStandardSections
      ? ""
      : '<section class="svc-overview" aria-label="Service overview"><div class="container"><div class="svc-overview-grid">' +
        '<div class="svc-copy reveal"><h2 class="heading-lg">What We <span class="text-primary">Deliver</span></h2><p>' +
        esc(service.body) +
        '</p><div class="svc-stats">' +
        renderStats(service.stats) +
        "</div></div>" +
        '<aside class="svc-panel reveal" aria-label="What is included"><h2>What is included</h2><ul class="svc-list">' +
        renderList(service.deliverables) +
        "</ul></aside>" +
        "</div></div></section>" +
        '<section class="svc-stack" aria-label="Tools and technologies"><div class="container"><div class="svc-stack-grid">' +
        '<div class="svc-stack-intro reveal"><span class="subtitle">Stack</span><h2 class="heading-lg">Tools We <span class="text-primary">Use</span></h2><p>We pick the stack around your goals, existing systems, and long-term maintainability.</p></div>' +
        '<div class="svc-chip-grid reveal">' +
        renderChips(service.stack) +
        "</div>" +
        "</div></div></section>" +
        '<section class="svc-process" aria-label="Delivery process"><div class="container"><div class="section-title reveal"><span class="subtitle">Process</span><h2 class="heading-lg">How We <span class="text-primary">Work</span></h2></div><div class="svc-process-grid reveal-group">' +
        PROCESS.map(function (step, index) {
          return (
            '<article class="svc-process-card reveal-item"><span class="svc-process-number">' +
            (index + 1) +
            "</span><h3>" +
            esc(step[0]) +
            "</h3><p>" +
            esc(step[1]) +
            "</p></article>"
          );
        }).join("") +
        "</div></div></section>" +
        '<section class="svc-projects fp-section" id="service-projects" aria-label="Relevant projects"><div class="container">' +
        '<div class="fp-header reveal"><div><span class="subtitle">Projects</span><h2 class="heading-lg">Relevant <span class="text-primary">Work</span></h2></div></div>' +
        '<div class="fp-grid" id="svc-project-grid">' +
        renderProjects(service.projects) +
        '</div><div class="fp-cta-mobile" style="margin-top:2rem"><a href="../contact-us/contact-us" class="btn btn-outline">Discuss Similar Work</a></div>' +
        "</div></section>";

    return (
      '<section class="project-header svc-header" aria-label="' +
      esc(service.title) +
      '">' +
      '<div class="container">' +
      '<nav class="page-breadcrumb" aria-label="Breadcrumb">' +
      '<a href="/">Home</a><span class="sep" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="#9e9e9e" stroke-width="0.84" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      (service.skipStandardSections
        ? ""
        : '<a href="./">Services</a><span class="sep" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="#9e9e9e" stroke-width="0.84" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></span>') +
      '<span aria-current="page">' +
      esc(service.title) +
      "</span></nav>" +
      '<h1 class="heading-xl">' +
      esc(service.headline) +
      "</h1>" +
      "<p>" +
      esc(service.summary) +
      "</p>" +
      headerActions +
      "</div></section>" +
      (service.extraAfterHeader || "") +
      standardSections +
      '<section class="svc-cta" aria-label="Contact call to action"><div class="container"><h2 class="heading-lg reveal">Ready To Build Your <span class="text-primary">' +
      esc(service.title) +
      '</span> Project?</h2><p class="reveal">Tell us what you are planning. We will help you scope the right version, timeline, and technical direction.</p><div class="reveal"><a href="../contact-us/contact-us" class="btn btn-primary">Start a Conversation</a></div></div></section>'
    );
  }

  function serviceHref(key) {
    return key;
  }

  function renderHub() {
    var groups = [
      [
        "eCommerce",
        ["shopify", "bigcommerce", "volusion", "webflow", "headless", "enterprise-solution"],
      ],
      [
        "Enterprise Solutions",
        [
          "saas-mvp-development",
          "website-development",
          "ai-automation-solutions",
          "erp-crm-development",
          "ui-ux-product-design",
        ],
      ],
      [
        "Compliance",
        [
          "regulatory-consulting",
          "audit-risk-management",
          "policy-documentation",
        ],
      ],
    ];

    return (
      '<section class="project-header svc-header" aria-label="Services">' +
      '<div class="container">' +
      '<nav class="page-breadcrumb" aria-label="Breadcrumb">' +
      '<a href="/">Home</a><span class="sep" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="#9e9e9e" stroke-width="0.84" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      '<span aria-current="page">Services</span></nav>' +
      '<h1 class="heading-xl">Digital services for commerce, products, and compliance.</h1>' +
      "<p>Explore the full Triyanshi Technologies service portfolio. Each service page includes what we deliver, the stack we use, and relevant project examples.</p>" +
      '<div class="svc-header-actions"><a href="../contact-us/contact-us" class="btn btn-primary">Start a Project</a><a href="#all-services" class="btn btn-outline">Explore Services</a></div>' +
      "</div></section>" +
      '<section class="svc-hub" id="all-services" aria-label="All services"><div class="container">' +
      groups
        .map(function (group) {
          return (
            '<div class="svc-hub-group reveal">' +
            '<div class="svc-hub-heading"><h2 class="heading-lg">' +
            esc(group[0]) +
            "</h2></div>" +
            '<div class="svc-hub-grid">' +
            group[1]
              .map(function (key) {
                var service = SERVICES[key];
                return (
                  '<a class="svc-hub-card" href="' +
                  serviceHref(key) +
                  '">' +
                  '<span class="svc-hub-card-title">' +
                  esc(service.title) +
                  "</span>" +
                  '<span class="svc-hub-card-desc">' +
                  esc(service.summary) +
                  "</span>" +
                  '<span class="svc-hub-card-meta">View Service ' +
                  arrow() +
                  "</span>" +
                  "</a>"
                );
              })
              .join("") +
            "</div></div>"
          );
        })
        .join("") +
      "</div></section>" +
      '<section class="svc-cta" aria-label="Contact call to action"><div class="container"><h2 class="heading-lg reveal">Need help choosing the <span class="text-primary">right service?</span></h2><p class="reveal">Share your goals and we will help you map the clearest path from idea to delivery.</p><div class="reveal"><a href="../contact-us/contact-us" class="btn btn-primary">Start a Conversation</a></div></div></section>'
    );
  }

  function bindProjectCards() {
    var grid = document.getElementById("svc-project-grid");
    if (!grid) return;

    function collapseAll() {
      grid.querySelectorAll(".fp-card.is-expanded").forEach(function (card) {
        card.classList.remove("is-expanded");
        card.setAttribute("aria-expanded", "false");
      });
    }

    grid.addEventListener("click", function (event) {
      var card = event.target.closest(".fp-card");
      if (!card || event.target.closest(".fp-cta-link")) return;
      if (card.classList.contains("is-expanded")) {
        card.classList.remove("is-expanded");
        card.setAttribute("aria-expanded", "false");
        return;
      }
      collapseAll();
      card.classList.add("is-expanded");
      card.setAttribute("aria-expanded", "true");
    });

    grid.querySelectorAll(".fp-card").forEach(function (card) {
      card.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          card.click();
        }
        if (event.key === "Escape") {
          card.classList.remove("is-expanded");
          card.setAttribute("aria-expanded", "false");
        }
      });
    });

    document.addEventListener("click", function (event) {
      if (!event.target.closest(".fp-card")) collapseAll();
    });
  }

  var key = document.body.getAttribute("data-service");
  var isHub = document.body.hasAttribute("data-service-index");
  var mount = document.getElementById("service-page-root");
  var service = SERVICES[key];

  if (!mount) return;

  if (isHub) {
    document.title = "Services | Triyanshi Technologies";
    var hubMeta = document.querySelector('meta[name="description"]');
    if (hubMeta) {
      hubMeta.setAttribute(
        "content",
        "Explore Triyanshi Technologies services across eCommerce, SaaS, AI automation, design, and compliance.",
      );
    }
    mount.innerHTML = renderHub();
    return;
  }

  if (!service) return;

  document.title = service.title + " | Triyanshi Technologies";
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", service.summary);
  mount.innerHTML = renderPage(service);
  bindProjectCards();
})();
