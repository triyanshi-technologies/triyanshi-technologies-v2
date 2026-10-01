(function () {
  "use strict";

  var PORTFOLIOS = {
    shopify: {
      title: "Shopify",
      category: "eCommerce",
      headline: "Shopify Stores Built To Grow.",
      summary:
        "Real Shopify stores we've designed, engineered and optimized for brands across multiple industries.",
      stats: [
        ["box", "100+", "Shopify Stores Launched"],
        ["trend", "2X", "Avg Conversion Lift"],
        ["clock", "99%", "On-Time Delivery"],
        ["globe", "15+", "Countries Served"],
      ],
      projects: [
        [
          "Artisan & Co.",
          "Custom Shopify Plus theme with immersive 3D product viewer and one-click checkout.",
          ["Shopify Plus", "Custom Theme", "Liquid"],
          "200% AOV Increase",
        ],
        [
          "NordicHome Store",
          "Headless Shopify storefront powered by Next.js for sub-second page loads.",
          ["Shopify Headless", "Next.js", "GraphQL"],
          "3x Faster Load Time",
        ],
        [
          "FitFuel Supplements",
          "Subscription commerce platform with loyalty reward engine and smart reorder flows.",
          ["Shopify", "ReCharge", "Klaviyo"],
          "45% Repeat Purchase Rate",
        ],
      ],
    },
    bigcommerce: {
      title: "BigCommerce",
      category: "eCommerce",
      headline:
        "BigCommerce implementations for B2B, ERP, and multi-channel commerce.",
      summary:
        "Examples of BigCommerce projects with B2B portals, ERP sync, multi-channel inventory, custom themes, and checkout optimization.",
      stats: [
        ["box", "50+", "BigCommerce Builds"],
        ["trend", "1.8X", "Avg Conversion Lift"],
        ["clock", "98%", "On-Time Delivery"],
        ["globe", "15+", "Countries Served"],
      ],
      projects: [],
    },
    volusion: {
      title: "Volusion",
      category: "eCommerce",
      headline:
        "Volusion projects focused on retention, catalog clarity, and conversion.",
      summary:
        "Selected Volusion work covering subscription boxes, fashion storefronts, custom tooling, analytics, and customer experience improvements.",
      stats: [
        ["box", "50+", "Volusion Projects"],
        ["trend", "35%", "Avg Retention Lift"],
        ["clock", "8-12 wks", "Avg Launch Timeline"],
        ["globe", "15+", "Countries Served"],
      ],
      projects: [],
    },
    "enterprise-solution": {
      title: "Enterprise Solution Portfolio",
      category: "eCommerce",
      headline:
        "Enterprise commerce and software builds for complex, multi-region operations.",
      summary:
        "Selected enterprise projects covering ERP integration, multi-region storefronts, and custom B2B/B2C commerce workflows.",
      stats: [
        ["box", "2+", "Enterprise Builds"],
        ["trend", "40%", "Avg Efficiency Gain"],
        ["clock", "99%", "On-Time Delivery"],
        ["globe", "3+", "Regions Served"],
      ],
      projects: [],
    },
    webflow: {
      title: "Webflow",
      category: "eCommerce",
      headline:
        "Webflow projects with CMS structure, commerce, and polished brand interactions.",
      summary:
        "Webflow builds combining brand-forward frontend design with CMS architecture, custom code, commerce integrations, and performance discipline.",
      stats: [
        ["box", "10+", "Webflow Builds"],
        ["trend", "96", "Avg PageSpeed Score"],
        ["clock", "99%", "On-Time Delivery"],
        ["globe", "15+", "Countries Served"],
      ],
      projects: [],
    },
    "saas-mvp-development": {
      title: "SaaS & MVP Portfolio",
      category: "Enterprise Solutions",
      headline: "SaaS products and MVPs built from first release to scale.",
      summary:
        "Product builds covering workflow automation, analytics, white-label dashboards, multi-tenant systems, and compliance automation.",
      stats: [
        ["box", "6+", "Products Shipped"],
        ["trend", "99.9%", "Uptime SLA"],
        ["clock", "8-12 wks", "Avg MVP Timeline"],
        ["globe", "500+", "Enterprise Users"],
      ],
      projects: [
        [
          "FlowSync",
          "Team workflow automation SaaS with drag-and-drop pipeline builder and Slack integration.",
          ["React", "Node.js", "Stripe", "AWS"],
          "500+ Enterprise Users",
        ],
        [
          "InsightHub",
          "B2B analytics SaaS with white-label dashboards and multi-tenant architecture.",
          ["Vue.js", "Python", "PostgreSQL"],
          "99.9% Uptime SLA",
        ],
        [
          "ComplianceKey",
          "Automated regulatory compliance tracking platform built for fintech startups.",
          ["Next.js", "Node.js", "MongoDB"],
          "300+ Rules Automated",
        ],
      ],
    },
    "website-development": {
      title: "Website Development Portfolio",
      category: "Enterprise Solutions",
      headline:
        "Website projects built for speed, clarity, and maintainability.",
      summary:
        "Responsive website work for brands, SaaS teams, and operational tools, including CMS builds, performance cleanups, and structured content systems.",
      stats: [
        ["box", "9+", "Websites Delivered"],
        ["trend", "96", "Avg PageSpeed Score"],
        ["clock", "99%", "On-Time Delivery"],
        ["globe", "8+", "Industries Served"],
      ],
      projects: [
        [
          "Axiom Agency",
          "Hybrid CMS website with scroll interactions, editorial content, and conversion-focused pages.",
          ["Webflow", "CMS", "Custom Code"],
          "96 / 100 PageSpeed",
        ],
        [
          "FinCore Dashboard",
          "Frontend performance audit and re-architecture reducing load time from 8s to 0.8s.",
          ["React", "Bundle Optimization", "CDN"],
          "10x Performance Gain",
        ],
      ],
    },
    "ai-automation-solutions": {
      title: "AI & Automation Portfolio",
      category: "Enterprise Solutions",
      headline:
        "AI automation projects tied to measurable operational outcomes.",
      summary:
        "Applied AI projects across document processing, support automation, predictive scoring, recommendations, and workflow automation.",
      stats: [
        ["box", "3+", "AI Systems Deployed"],
        ["trend", "70%", "Avg Ticket Deflection"],
        ["clock", "90%", "Manual Work Eliminated"],
        ["globe", "3+", "Industries Served"],
      ],
      projects: [
        [
          "DocuFlow AI",
          "Intelligent document processing pipeline that extracts, classifies, and routes with high accuracy.",
          ["Python", "OpenAI", "AWS Lambda"],
          "90% Manual Work Eliminated",
        ],
        [
          "SupportAI",
          "Conversational AI agent trained on client docs to handle Tier-1 support tickets.",
          ["LangChain", "GPT-4", "Node.js"],
          "70% Ticket Deflection",
        ],
        [
          "LeadScore AI",
          "Predictive lead scoring model integrated into CRM with real-time sales recommendations.",
          ["Python", "scikit-learn", "FastAPI"],
          "35% Sales Cycle Reduction",
        ],
      ],
    },
    "erp-crm-development": {
      title: "ERP & CRM Portfolio",
      category: "Enterprise Solutions",
      headline:
        "Operational systems for sales, production, inventory, and teams.",
      summary:
        "ERP and CRM case studies covering manufacturing operations, insurance workflows, inventory control, reporting, and role-based access.",
      stats: [
        ["box", "2+", "Enterprise Systems"],
        ["trend", "40%", "Avg Efficiency Gain"],
        ["clock", "3,000+", "Agent Users Supported"],
        ["globe", "2+", "Industries Served"],
      ],
      projects: [
        [
          "NexusERP",
          "Custom manufacturing ERP with production scheduling, inventory control, and HR modules.",
          ["Node.js", "PostgreSQL", "React", "Docker"],
          "40% Efficiency Gain",
        ],
        [
          "ClientFlow CRM",
          "Insurance sector CRM built for 3,000+ agents with policy tracking and claims management.",
          ["Django", "React", "PostgreSQL"],
          "3,000+ Agent Users",
        ],
      ],
    },
    "ui-ux-product-design": {
      title: "UI/UX & Product Design Portfolio",
      category: "Enterprise Solutions",
      headline:
        "Product design work for dashboards, commerce, and complex workflows.",
      summary:
        "Design projects focused on information hierarchy, responsive interfaces, user flows, dashboards, and implementation-ready systems.",
      stats: [
        ["box", "2+", "Products Designed"],
        ["trend", "200+", "Metrics Tracked"],
        ["clock", "50+", "Live Data Sources"],
        ["globe", "2+", "Industries Served"],
      ],
      projects: [
        [
          "SalesMatrix",
          "Executive KPI dashboard with drill-down analytics and automated PDF report exports.",
          ["UX Design", "Dashboard", "Analytics"],
          "200+ Metrics Tracked",
        ],
        [
          "OpsVision",
          "Real-time operations dashboard with clear information hierarchy across 50+ data sources.",
          ["Product Design", "D3.js", "WebSockets"],
          "50+ Live Data Sources",
        ],
      ],
    },
  };

  var GROUPS = [
    ["eCommerce", ["shopify", "bigcommerce", "volusion", "webflow", "enterprise-solution"]],
  ];
  var PROJECT_PAGE_SIZE = 6;

  (function buildPortfolioProjectsFromData() {
    var data = window.PORTFOLIO_DATA;
    if (!data) return;

    var pageProjects = {};
    Object.keys(data.projects).forEach(function (slug) {
      var proj = data.projects[slug];
      proj.pages.forEach(function (membership) {
        if (!pageProjects[membership.key]) pageProjects[membership.key] = [];
        var position =
          membership.position !== undefined
            ? membership.position
            : proj.position;
        pageProjects[membership.key].push([
          proj.name,
          proj.desc,
          proj.tags,
          proj.category,
          proj.domain,
          position,
          proj.features,
        ]);
      });
    });

    Object.keys(pageProjects).forEach(function (key) {
      if (PORTFOLIOS[key]) PORTFOLIOS[key].projects = pageProjects[key];
    });
  })();

  Object.keys(PORTFOLIOS).forEach(function (key) {
    if (PORTFOLIOS[key].projects) {
      PORTFOLIOS[key].projects = PORTFOLIOS[key].projects
        .slice()
        .sort(function (a, b) {
          return (a[5] || 0) - (b[5] || 0);
        });
    }
  });

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

  function headingText(text) {
    return esc(String(text).replace(/\.+$/, ""));
  }

  /* Wrap the final word of a headline in the accent color. */
  function heroHighlight(text) {
    var escaped = headingText(text);
    var lastSpace = escaped.lastIndexOf(" ");
    if (lastSpace === -1)
      return '<span class="text-primary">' + escaped + "</span>";
    return (
      escaped.slice(0, lastSpace) +
      ' <span class="text-primary">' +
      escaped.slice(lastSpace + 1) +
      "</span>"
    );
  }

  var HERO_STAT_ICONS = {
    box: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.73Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
    trend:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>',
    clock:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    globe:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  };

  var HERO_STATS = [
    ["box", "30+", "Projects Delivered"],
    ["trend", "2X", "Avg Conversion Lift"],
    ["clock", "99%", "On-Time Delivery"],
    ["globe", "10+", "Countries Served"],
  ];

  function formatStatNumber(value) {
    var match = /^([\d.,]+)(x)$/i.exec(value);
    if (!match) return esc(value);
    return (
      esc(match[1]) +
      '<span class="pf-hero-stat-suffix">' +
      esc(match[2]) +
      "</span>"
    );
  }

  function renderHeroStats(stats) {
    return (stats || HERO_STATS).map(function (stat) {
      return (
        '<div class="pf-hero-stat">' +
        '<span class="pf-hero-stat-icon" aria-hidden="true">' +
        HERO_STAT_ICONS[stat[0]] +
        "</span>" +
        '<strong class="pf-hero-stat-number">' +
        formatStatNumber(stat[1]) +
        "</strong>" +
        '<span class="pf-hero-stat-label">' +
        esc(stat[2]) +
        "</span>" +
        "</div>"
      );
    }).join("");
  }

  /* Two-column, endlessly auto-scrolling project screenshot gallery for the hero */
  function renderHeroGallery(portfolio) {
    var pool = (portfolio.projects || []).map(function (project) {
      return { name: project[0], domain: project[4] };
    });

    if (pool.length < 6 && window.PORTFOLIO_DATA) {
      var seen = {};
      pool.forEach(function (p) {
        seen[p.name] = true;
      });
      Object.keys(window.PORTFOLIO_DATA.projects).forEach(function (slug) {
        var proj = window.PORTFOLIO_DATA.projects[slug];
        if (seen[proj.name]) return;
        var belongsToPage = proj.pages.some(function (m) {
          return m.key === key;
        });
        if (!belongsToPage) return;
        pool.push({ name: proj.name, domain: proj.domain });
        seen[proj.name] = true;
      });
    }

    if (!pool.length) return "";

    var colA = [];
    var colB = [];
    pool.forEach(function (project, index) {
      (index % 2 === 0 ? colA : colB).push(project);
    });
    if (!colB.length) colB = colA.slice();

    function renderCard(project) {
      var displayDomain = project.domain
        ? project.domain.replace(/^www\./, "").toLowerCase()
        : "";
      return (
        '<div class="pf-gallery-card">' +
        '<div class="browser-header">' +
        '<div class="browser-dots">' +
        '<span class="dot red"></span>' +
        '<span class="dot yellow"></span>' +
        '<span class="dot green"></span>' +
        "</div>" +
        '<div class="browser-address-bar">' +
        esc(displayDomain) +
        "</div>" +
        "</div>" +
        '<div class="browser-content">' +
        "<img " +
        projectImageAttrs(project.domain || "") +
        ' alt="" loading="eager" fetchpriority="low" decoding="async">' +
        "</div>" +
        "</div>"
      );
    }

    var isMobile = window.matchMedia("(max-width: 560px)").matches;
    var SEC_PER_CARD = isMobile ? 3.5 : 8.75;
    var MIN_DURATION = isMobile ? 16 : 30;

    function renderColumn(items, extraClass) {
      var cards = items.map(renderCard).join("");
      var duration = Math.max(MIN_DURATION, items.length * SEC_PER_CARD).toFixed(1);
      
      return (
        '<div class="pf-gallery-col' +
        (extraClass ? " " + extraClass : "") +
        '">' +
        '<div class="pf-gallery-track" style="--gallery-duration:' +
        duration +
        's">' +
        cards +
        cards +
        "</div></div>"
      );
    }

    return (
      '<div class="pf-hero-gallery" aria-hidden="true">' +
      renderColumn(colA, "") +
      renderColumn(colB, "pf-gallery-col-alt") +
      "</div>"
    );
  }

  function renderPortfolioHero(portfolio) {
    var decorHTML = "";
    if (key === "shopify") {
      decorHTML =
        '<div class="pf-hero-decor" aria-hidden="true">' +
        '<div class="circle circle-1"></div>' +
        '<div class="circle circle-2"></div>' +
        '<div class="circle circle-3"></div>' +
        '<div class="circle glow-1"></div>' +
        '<div class="circle glow-2"></div>' +
        "</div>";
    }

    return (
      '<section class="pf-hero" aria-label="' +
      esc(portfolio.title) +
      '">' +
      decorHTML +
      '<div class="container">' +
      '<nav class="page-breadcrumb" aria-label="Breadcrumb">' +
      '<a href="/">Home</a><span class="sep" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="#9e9e9e" stroke-width="0.84" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      '<a href="./">Portfolio</a><span class="sep" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="#9e9e9e" stroke-width="0.84" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      '<span aria-current="page">' +
      esc(portfolio.title) +
      "</span></nav>" +
      '<div class="pf-hero-grid">' +
      '<div class="pf-hero-left">' +
      '<span class="badge">' +
      esc(portfolio.title) +
      "</span>" +
      '<h1 class="heading-xl pf-hero-title">' +
      heroHighlight(portfolio.headline) +
      "</h1>" +
      '<p class="pf-hero-desc">' +
      esc(portfolio.summary) +
      "</p>" +
      '<div class="pf-hero-stats-row">' +
      renderHeroStats(portfolio.stats) +
      "</div>" +
      '<div class="pf-hero-actions pf-hero-actions-desktop">' +
      '<a href="../contact-us/contact-us" class="btn btn-primary">Start Your Project ' +
      arrow() +
      "</a>" +
      "</div>" +
      "</div>" +
      renderHeroGallery(portfolio) +
      '<div class="pf-hero-actions pf-hero-actions-mobile">' +
      '<a href="../contact-us/contact-us" class="btn btn-primary">Start Your Project ' +
      arrow() +
      "</a>" +
      "</div>" +
      "</div>" +
      "</div></section>"
    );
  }

  function domainHref(domain) {
    if (!domain) return "#";
    return /^https?:\/\//i.test(domain) ? domain : "https://" + domain;
  }

  function normalizeDomain(domain, keepWww) {
    if (!domain) return "";
    var clean = domain
      .replace(/^https?:\/\//i, "")
      .replace(/^NZ\s*-\s*/i, "")
      .replace(/^US\s*-\s*/i, "")
      .split(/[/?#]/)[0]
      .replace(/\/$/, "")
      .toLowerCase();
    return keepWww ? clean : clean.replace(/^www\./, "");
  }

  function projectImageAttrs(domain) {
    var normalized = normalizeDomain(domain);
    var fallback = "../assets/sample-image.webp";
    var primary = normalized
      ? "../project-images/full website/" + normalized + ".webp"
      : fallback;

    return (
      'src="' +
      esc(primary) +
      '" data-fallback-src="' +
      esc(fallback) +
      '" onerror="this.onerror=null;this.src=this.dataset.fallbackSrc;"'
    );
  }

  function featureIcon() {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="0.72" aria-hidden="true"><path d="M21.71,11.29l-3-3a1,1,0,0,0-1.42,1.42L18.59,11H3a1,1,0,0,0,0,2H18.59l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l3-3A1,1,0,0,0,21.71,11.29Z"/></svg>';
  }

  function renderFeatureList(project) {
    var features = (project[6] && project[6].length ? project[6] : [project[1]])
      .slice(0, 6);
    return (
      '<ul class="pf-proj-features">' +
      features.map(function (item) {
        return (
          "<li><span class=\"pf-proj-feature-icon\" aria-hidden=\"true\">" +
          featureIcon() +
          "</span><span class=\"pf-proj-feature-text\">" +
          esc(item) +
          "</span></li>"
        );
      }).join("") +
      "</ul>"
    );
  }

  function renderProjectCards(projects) {
    return projects
      .map(function (project, index) {
        var domain = project[4] || "";
        var category = project[3] || "";
        var liveHref = domain ? domainHref(domain) : "";

        var cardHref = liveHref || "../portfolio-detail/portfolio-detail";
        var cardNavTarget = liveHref ? "live" : "case-study";
        var cardAriaLabel = liveHref
          ? "Visit live site for " + project[0]
          : "View case study for " + project[0];

        return (
          '<article class="pf-proj-card" data-href="' +
          esc(cardHref) +
          '" data-nav-target="' +
          cardNavTarget +
          '" tabindex="0" role="link" aria-label="' +
          esc(cardAriaLabel) +
          '" style="animation-delay:' +
          index * 70 +
          'ms">' +
          '<div class="pf-proj-media">' +
          "<img " +
          projectImageAttrs(domain) +
          ' alt="" loading="lazy" decoding="async">' +
          "</div>" +
          '<div class="pf-proj-body">' +
          '<div class="pf-proj-top"><h3 class="pf-proj-name">' +
          esc(project[0]) +
          "</h3>" +
          (category
            ? '<span class="pf-proj-badge">' + esc(category) + "</span>"
            : "") +
          "</div>" +
          renderFeatureList(project) +
          '<div class="pf-proj-footer">' +
          (domain
            ? '<a class="pf-proj-domain" href="' +
            esc(liveHref) +
            '" target="_blank" rel="noopener noreferrer">' +
            esc(domain) +
            "</a>"
            : "<span></span>") +
          (domain
            ? '<a class="pf-proj-link" href="' +
            esc(liveHref) +
            '" target="_blank" rel="noopener noreferrer">View Live Site ' +
            arrow() +
            "</a>"
            : '<span class="pf-proj-link" aria-hidden="true">View Live Site ' +
            arrow() +
            "</span>") +
          "</div>" +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderShowMore(total, visibleCount) {
    if (!total) {
      return '<div class="pf-proj-empty">No projects match this filter yet.</div>';
    }
    if (visibleCount >= total) return "";
    return (
      '<button class="btn btn-primary pf-show-more-btn" type="button">Show More ' +
      arrow() +
      "</button>"
    );
  }

  function header(title, headline, summary, breadcrumbCurrent) {
    var breadcrumb = breadcrumbCurrent
      ? '<a href="./">Portfolio</a><span class="sep" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="#9e9e9e" stroke-width="0.84" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span aria-current="page">' +
      esc(title) +
      "</span>"
      : '<span aria-current="page">Portfolio</span>';

    return (
      '<section class="project-header pf-header" aria-label="' +
      esc(title) +
      '"><div class="container">' +
      '<nav class="page-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span class="sep" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008" stroke="#9e9e9e" stroke-width="0.84" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/></svg></span>' +
      breadcrumb +
      "</nav>" +
      '<h1 class="heading-xl">' +
      heroHighlight(headline) +
      "</h1><p>" +
      esc(summary) +
      '</p><div class="pf-header-actions"><a href="../contact-us/contact-us" class="btn btn-primary">Start a Project</a><a href="#portfolio-work" class="btn btn-outline">View Work</a></div></div></section>'
    );
  }

  function renderPage(portfolio) {
    return (
      renderPortfolioHero(portfolio) +
      '<section class="pf-projects" id="portfolio-work" aria-label="Project work"><div class="container">' +
      '<div class="pf-proj-header reveal"><span class="pf-proj-eyebrow">Featured Projects</span><h2 class="heading-lg pf-proj-title">Real Projects. <span class="text-primary">Real Businesses.</span></h2></div>' +
      '<div class="pf-proj-grid" id="pf-project-grid"></div>' +
      '<div class="pf-show-more" id="pf-show-more"></div>' +
      "</div></section>" +
      '<section class="pf-cta" aria-label="Contact call to action"><div class="container"><h2 class="heading-lg reveal">Want Results Like <span class="text-primary">These?</span></h2><p class="reveal">Share your goals and we will map the right technical path for your next build.</p><div class="reveal"><a href="../contact-us/contact-us" class="btn btn-primary">Start a Conversation</a></div></div></section>'
    );
  }

  function renderHub() {
    var summary =
      "Explore selected work across commerce, SaaS, AI automation, ERP/CRM, websites, and product design.";
    return (
      header(
        "Portfolio",
        "Selected work across commerce and digital product builds.",
        summary,
        false,
      ) +
      '<section class="pf-hub" id="portfolio-work" aria-label="Portfolio categories"><div class="container">' +
      GROUPS.map(function (group) {
        return (
          '<div class="pf-hub-group reveal"><div class="pf-hub-heading"><h2 class="heading-lg">' +
          esc(group[0]) +
          '</h2></div><div class="pf-hub-grid">' +
          group[1]
            .map(function (key) {
              var item = PORTFOLIOS[key];
              return (
                '<a class="pf-hub-card" href="' +
                key +
                '"><span class="pf-hub-card-title">' +
                esc(item.title) +
                '</span><span class="pf-hub-card-desc">' +
                esc(item.summary) +
                '</span><span class="pf-hub-card-meta">View Portfolio ' +
                arrow() +
                "</span></a>"
              );
            })
            .join("") +
          "</div></div>"
        );
      }).join("") +
      "</div></section>" +
      '<section class="pf-cta" aria-label="Contact call to action"><div class="container"><h2 class="heading-lg reveal">Have a project we should <span class="text-primary">showcase?</span></h2><p class="reveal">Let us build the next case study with you.</p><div class="reveal"><a href="../contact-us/contact-us" class="btn btn-primary">Start a Conversation</a></div></div></section>'
    );
  }

  function initProjectsSection(portfolio) {
    var grid = document.getElementById("pf-project-grid");
    var controls = document.getElementById("pf-show-more");
    if (!grid || !controls) return;

    var visibleCount = PROJECT_PAGE_SIZE;

    function navigateToCaseStudy(card) {
      var href = card.getAttribute("data-href");
      if (!href) return;
      if (card.getAttribute("data-nav-target") === "live") {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = href;
      }
    }

    function render() {
      var visible = portfolio.projects.slice(0, visibleCount);
      grid.innerHTML = renderProjectCards(visible);
      controls.innerHTML = renderShowMore(
        portfolio.projects.length,
        visible.length,
      );
    }

    function appendMore() {
      var previousCount = visibleCount;
      visibleCount = Math.min(
        visibleCount + PROJECT_PAGE_SIZE,
        portfolio.projects.length,
      );
      var newItems = portfolio.projects.slice(previousCount, visibleCount);
      grid.insertAdjacentHTML("beforeend", renderProjectCards(newItems));
      controls.innerHTML = renderShowMore(
        portfolio.projects.length,
        visibleCount,
      );
    }

    grid.addEventListener("click", function (event) {
      if (event.target.closest(".pf-proj-domain") || event.target.closest(".pf-proj-link"))
        return;
      var card = event.target.closest(".pf-proj-card");
      if (!card) return;
      navigateToCaseStudy(card);
    });

    grid.addEventListener("keydown", function (event) {
      if (event.target.closest(".pf-proj-domain") || event.target.closest(".pf-proj-link"))
        return;
      var card = event.target.closest(".pf-proj-card");
      if (!card) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        navigateToCaseStudy(card);
      }
    });

    controls.addEventListener("click", function (event) {
      if (!event.target.closest(".pf-show-more-btn")) return;
      event.preventDefault();
      appendMore();
    });

    render();
  }

  var mount = document.getElementById("portfolio-page-root");
  if (!mount) return;

  var key = document.body.getAttribute("data-portfolio");
  var isHub = document.body.hasAttribute("data-portfolio-index");
  var portfolio = PORTFOLIOS[key];

  if (isHub) {
    document.title = "Portfolio | Triyanshi Technologies";
    mount.innerHTML = renderHub();
    return;
  }

  if (!portfolio) return;
  document.title = portfolio.title + " | Triyanshi Technologies";
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", portfolio.summary);
  mount.innerHTML = renderPage(portfolio);
  initProjectsSection(portfolio);
})();
