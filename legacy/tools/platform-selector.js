(function () {
  "use strict";

  var PLATFORM_ORDER = [
    "shopify",
    "bigcommerce",
    "shopify-plus",
    "volusion-modernization",
    "webflow-ecommerce",
    "custom-enterprise-commerce",
  ];

  var PLATFORMS = {
    shopify: {
      name: "Shopify",
      summary: "Best fit for fast D2C launches, manageable catalogs, app-led operations, and teams that want a simple commerce admin.",
      fit: {
        speedToLaunch: 5,
        operatingSimplicity: 5,
        b2bReadiness: 2,
        multiStorefront: 3,
        designFlexibility: 3,
        integrationDepth: 3,
        costFit: 4,
        scalability: 3,
        migrationRisk: 3,
      },
      why: [
        "Strong speed-to-launch profile for D2C stores.",
        "Operationally simple for lean teams and growth teams.",
        "Large app ecosystem for common marketing, payment, analytics, and fulfillment workflows.",
      ],
      watchOuts: [
        "Advanced B2B, checkout, and multi-entity workflows may require Shopify Plus.",
        "Heavy ERP or unusual pricing logic can outgrow an app-first setup.",
      ],
      path: [
        "Confirm catalog, payments, tax, shipping, and analytics requirements.",
        "Launch on a high-quality theme with conversion tracking and core apps.",
        "Add automation and custom integrations only where they reduce manual work.",
      ],
    },
    "shopify-plus": {
      name: "Shopify Plus",
      summary: "Best fit for scaling D2C and blended B2B brands that need advanced workflows, markets, catalogs, checkout extensibility, and enterprise support.",
      fit: {
        speedToLaunch: 4,
        operatingSimplicity: 4,
        b2bReadiness: 4,
        multiStorefront: 5,
        designFlexibility: 4,
        integrationDepth: 4,
        costFit: 2,
        scalability: 5,
        migrationRisk: 3,
      },
      why: [
        "Good balance of enterprise capability and managed platform operations.",
        "Useful for blended D2C/B2B growth, regional markets, and advanced checkout needs.",
        "Scales well when the team wants enterprise features without owning every commerce component.",
      ],
      watchOuts: [
        "Plus economics need enough GMV or operational complexity to justify the plan.",
        "Highly unusual pricing, approval, or fulfillment logic may still need custom services.",
      ],
      path: [
        "Map D2C, B2B, markets, catalogs, and checkout requirements.",
        "Design the Shopify Plus architecture, app stack, data migration, and launch phases.",
        "Implement automation, integrations, and QA around critical buying workflows.",
      ],
    },
    bigcommerce: {
      name: "BigCommerce",
      summary: "Best fit for B2B, complex catalogs, API flexibility, multi-storefront commerce, and integration-heavy operations - and a reliable, well-supported step up from Volusion for D2C too.",
      fit: {
        speedToLaunch: 3,
        operatingSimplicity: 3,
        b2bReadiness: 4,
        multiStorefront: 4,
        designFlexibility: 4,
        integrationDepth: 5,
        costFit: 3,
        scalability: 5,
        migrationRisk: 3,
      },
      why: [
        "Strong fit for B2B commerce, complex catalogs, and integration-heavy builds.",
        "API-first flexibility supports ERP, CRM, quoting, and custom storefront patterns.",
        "Multi-storefront capability helps brands manage multiple channels and regions.",
      ],
      watchOuts: [
        "Implementation planning matters more when catalog, B2B, and integration needs are deep.",
        "Lean teams may need an experienced partner for architecture and rollout.",
      ],
      path: [
        "Audit catalog, pricing, customer groups, B2B flows, and integration endpoints.",
        "Define storefront, APIs, ERP/CRM sync, and migration sequencing.",
        "Roll out with sandbox testing for orders, pricing, checkout, and fulfillment.",
      ],
    },
    "webflow-ecommerce": {
      name: "Webflow Ecommerce",
      summary: "Best fit for design-led small catalogs, brand-forward stores, and CMS-heavy commerce where visual control matters more than complex operations.",
      fit: {
        speedToLaunch: 4,
        operatingSimplicity: 4,
        b2bReadiness: 1,
        multiStorefront: 1,
        designFlexibility: 5,
        integrationDepth: 2,
        costFit: 4,
        scalability: 2,
        migrationRisk: 3,
      },
      why: [
        "Excellent fit for brand storytelling, CMS-heavy pages, and custom visual presentation.",
        "Works well when the catalog is small and commerce operations are straightforward.",
        "Keeps design and content workflows close to the site-building experience.",
      ],
      watchOuts: [
        "Not ideal for complex B2B, multi-region, or large-catalog commerce.",
        "Deep operational integrations can become limiting compared with commerce-first platforms.",
      ],
      path: [
        "Confirm the catalog is small, stable, and does not need complex pricing logic.",
        "Build the brand-forward CMS and product experience first.",
        "Connect payment, shipping, tax, analytics, and lightweight automation before launch.",
      ],
    },
    "volusion-modernization": {
      name: "Volusion modernization/migration",
      summary: "Best fit when the current store is Volusion and the immediate goal is stabilization, CRO cleanup, technical cleanup, or a controlled migration plan.",
      fit: {
        speedToLaunch: 3,
        operatingSimplicity: 3,
        b2bReadiness: 2,
        multiStorefront: 2,
        designFlexibility: 2,
        integrationDepth: 2,
        costFit: 4,
        scalability: 2,
        migrationRisk: 5,
      },
      why: [
        "Prioritizes practical cleanup when Volusion is the current platform.",
        "Reduces migration risk by separating urgent fixes from long-term platform decisions.",
        "Useful when the store needs stabilization before a larger rebuild.",
      ],
      watchOuts: [
        "Modernization is usually a bridge, not the final platform for aggressive scale.",
        "Teams should avoid over-investing in legacy customization when migration is likely.",
      ],
      path: [
        "Stabilize checkout, tracking, key templates, page speed, and conversion blockers.",
        "Document products, customers, orders, URLs, redirects, and integration dependencies.",
        "Choose the target platform and migrate in controlled phases.",
      ],
    },
    "custom-enterprise-commerce": {
      name: "Custom Enterprise Commerce",
      summary: "Best fit for highly custom workflows, deep ERP/CRM integration, multi-region logic, unusual catalog or pricing rules, and platform constraints.",
      fit: {
        speedToLaunch: 1,
        operatingSimplicity: 1,
        b2bReadiness: 5,
        multiStorefront: 5,
        designFlexibility: 5,
        integrationDepth: 5,
        costFit: 1,
        scalability: 5,
        migrationRisk: 2,
      },
      why: [
        "Fits unusual business rules that are hard to model inside a standard platform.",
        "Gives engineering teams full control over pricing, workflows, integrations, and regional logic.",
        "Appropriate when commerce is a strategic system rather than only a storefront.",
      ],
      watchOuts: [
        "Requires higher budget, deeper technical ownership, and a longer implementation timeline.",
        "Operational simplicity must be designed intentionally because the platform will not provide it out of the box.",
      ],
      path: [
        "Run discovery for domain rules, integration contracts, data ownership, and operating model.",
        "Define a composable architecture, implementation roadmap, and risk-controlled MVP.",
        "Build with automated testing, observability, and staged migration from day one.",
      ],
    },
  };

  var REQUIRED_FIELDS = [
    "businessStage",
    "monthlyRevenue",
    "catalogSize",
    "sellingModel",
    "designFlexibility",
    "integrationComplexity",
    "multiStorefront",
    "techCapacity",
    "launchTimeline",
    "budgetRange",
  ];

  var FIELD_LABELS = {
    businessStage: "Business stage",
    monthlyRevenue: "Monthly revenue range",
    catalogSize: "Product catalog size",
    sellingModel: "Selling model",
    designFlexibility: "Design flexibility needs",
    integrationComplexity: "Integration complexity",
    multiStorefront: "Multi-storefront / multi-region needs",
    techCapacity: "Team technical capacity",
    launchTimeline: "Launch timeline",
    budgetRange: "Budget range",
  };

  var WEIGHTS = {
    speedToLaunch: 14,
    operatingSimplicity: 12,
    b2bReadiness: 13,
    multiStorefront: 11,
    designFlexibility: 10,
    integrationDepth: 12,
    costFit: 10,
    scalability: 12,
    migrationRisk: 6,
  };

  var LABELS = {
    businessStage: {
      launch: "New launch / MVP",
      growth: "Growing brand",
      scale: "Scaling business",
      enterprise: "Enterprise transformation",
    },
    monthlyRevenue: {
      "pre-revenue": "Pre-revenue",
      "under-10l": "Under Rs 10L",
      "10l-50l": "Rs 10L - Rs 50L",
      "50l-2cr": "Rs 50L - Rs 2Cr",
      "2cr-plus": "Rs 2Cr+",
    },
    catalogSize: {
      small: "1 - 50 SKUs",
      medium: "51 - 500 SKUs",
      large: "501 - 5,000 SKUs",
      complex: "5,000+ SKUs / complex variants",
    },
    sellingModel: {
      b2c: "D2C",
      b2b: "B2B",
      blended: "Blended D2C + B2B",
    },
    designFlexibility: {
      standard: "Standard theme is fine",
      "custom-brand": "Brand-led custom design",
      "advanced-ux": "Advanced UX / headless-like control",
    },
    integrationComplexity: {
      low: "Light apps and analytics",
      moderate: "ERP, CRM, shipping, or POS",
      high: "Deep ERP/CRM, custom APIs, automation",
    },
    multiStorefront: {
      none: "Single storefront",
      regional: "Multiple regions / markets",
      complex: "Multiple storefronts, brands, or entities",
    },
    techCapacity: {
      lean: "Lean non-technical team",
      partner: "Agency / implementation partner",
      "in-house": "In-house engineering team",
    },
    launchTimeline: {
      urgent: "Under 8 weeks",
      planned: "2 - 4 months",
      strategic: "4+ months",
    },
    budgetRange: {
      starter: "Lean build budget",
      growth: "Growth build budget",
      enterprise: "Enterprise transformation budget",
    },
    currentPlatform: {
      shopify: "Shopify",
      "shopify-plus": "Shopify Plus",
      bigcommerce: "BigCommerce",
      webflow: "Webflow Ecommerce",
      volusion: "Volusion",
      custom: "Custom Enterprise Commerce",
      other: "Other",
    },
  };

  var QUESTION_TEXT = {
    businessStage: "What stage is your business at?",
    monthlyRevenue: "What's your monthly revenue range?",
    catalogSize: "How large is your product catalog?",
    sellingModel: "What's your primary selling model?",
    designFlexibility: "How much design flexibility do you need?",
    integrationComplexity: "How complex are your integration needs?",
    multiStorefront: "Do you need multiple storefronts or regions?",
    techCapacity: "What's your team's technical capacity?",
    launchTimeline: "What's your launch timeline?",
    budgetRange: "What's your budget range?",
    currentPlatform: "What platform are you on today?",
  };

  var QUESTIONS = REQUIRED_FIELDS.concat(["currentPlatform"]).map(function (name) {
    var optionSource = LABELS[name];
    var options = Object.keys(optionSource).map(function (value) {
      return { value: value, label: optionSource[value] };
    });
    return {
      name: name,
      question: QUESTION_TEXT[name],
      optional: name === "currentPlatform",
      options: options,
    };
  });

  function clampScore(value) {
    return Math.max(0, Math.min(100, Math.round(value)));
  }

  function fitPoints(platformFit, desired, weight) {
    return weight * (1 - Math.abs(platformFit - desired) / 4);
  }

  function average(values) {
    var total = values.reduce(function (sum, value) {
      return sum + value;
    }, 0);
    return total / values.length;
  }

  function getDesiredProfile(answers) {
    var stageScale = { launch: 1, growth: 2, scale: 4, enterprise: 5 };
    var revenueScale = { "pre-revenue": 1, "under-10l": 2, "10l-50l": 3, "50l-2cr": 4, "2cr-plus": 5 };
    var catalogScale = { small: 1, medium: 3, large: 4, complex: 5 };
    var timelineSpeed = { urgent: 5, planned: 3, strategic: 2 };
    var teamSimplicity = { lean: 5, partner: 3, "in-house": 2 };
    var b2bNeed = { b2c: 1, blended: 4, b2b: 5 };
    var multiNeed = { none: 1, regional: 4, complex: 5 };
    var designNeed = { standard: 2, "custom-brand": 5, "advanced-ux": 4 };
    var integrationNeed = { low: 1, moderate: 3, high: 5 };
    var costNeed = { starter: 5, growth: 3, enterprise: 1 };

    var simplicity = teamSimplicity[answers.techCapacity] || 3;
    if (answers.businessStage === "launch") simplicity += 1;
    if (answers.integrationComplexity === "low") simplicity += 1;

    return {
      speedToLaunch: timelineSpeed[answers.launchTimeline] || 3,
      operatingSimplicity: Math.max(1, Math.min(5, simplicity)),
      b2bReadiness: b2bNeed[answers.sellingModel] || 1,
      multiStorefront: multiNeed[answers.multiStorefront] || 1,
      designFlexibility: designNeed[answers.designFlexibility] || 3,
      integrationDepth: integrationNeed[answers.integrationComplexity] || 2,
      costFit: costNeed[answers.budgetRange] || 3,
      scalability: Math.round(average([
        stageScale[answers.businessStage] || 2,
        revenueScale[answers.monthlyRevenue] || 2,
        catalogScale[answers.catalogSize] || 2,
      ])),
      migrationRisk: answers.currentPlatform === "volusion" ? 5 : answers.currentPlatform ? 3 : 2,
    };
  }

  function getRuleAdjustment(platformId, answers) {
    var adjustment = 0;

    if (platformId === "shopify") {
      if (answers.businessStage === "launch") adjustment += 8;
      if (answers.sellingModel === "b2c") adjustment += 5;
      if (answers.launchTimeline === "urgent") adjustment += 5;
      if (answers.catalogSize === "small" || answers.catalogSize === "medium") adjustment += 3;
      if (answers.techCapacity === "lean") adjustment += 3;
      if (answers.integrationComplexity === "low" || answers.integrationComplexity === "moderate") adjustment += 2;
      if (answers.budgetRange === "starter" || answers.budgetRange === "growth") adjustment += 3;
      if (answers.sellingModel === "b2b") adjustment -= 8;
      if (answers.integrationComplexity === "high") adjustment -= 6;
      if (answers.multiStorefront === "complex") adjustment -= 6;
      if (answers.catalogSize === "complex") adjustment -= 5;
    }

    if (platformId === "shopify-plus") {
      if (answers.businessStage === "scale" || answers.businessStage === "enterprise") adjustment += 6;
      if (answers.sellingModel === "blended") adjustment += 6;
      if (answers.sellingModel === "b2b") adjustment += 3;
      if (answers.multiStorefront === "regional" || answers.multiStorefront === "complex") adjustment += 5;
      if (answers.monthlyRevenue === "50l-2cr" || answers.monthlyRevenue === "2cr-plus") adjustment += 5;
      if (answers.budgetRange === "enterprise") adjustment += 4;
      if (answers.designFlexibility === "advanced-ux") adjustment += 3;
      if (answers.budgetRange === "starter") adjustment -= 8;
      if (answers.businessStage === "launch" && answers.monthlyRevenue === "pre-revenue") adjustment -= 5;
    }

    if (platformId === "bigcommerce") {
      if (answers.sellingModel === "b2c") adjustment += 6;
      if (answers.sellingModel === "b2b") adjustment += 10;
      if (answers.sellingModel === "blended") adjustment += 4;
      if (answers.integrationComplexity === "high") adjustment += 9;
      if (answers.integrationComplexity === "moderate") adjustment += 4;
      if (answers.catalogSize === "large" || answers.catalogSize === "complex") adjustment += 7;
      if (answers.multiStorefront === "complex") adjustment += 5;
      if (answers.techCapacity === "in-house") adjustment += 4;
      if (answers.designFlexibility === "custom-brand" && answers.catalogSize === "small" && answers.integrationComplexity === "low") adjustment -= 7;
      if (answers.launchTimeline === "urgent") adjustment -= 2;
      if (answers.budgetRange === "starter") adjustment -= 5;
    }

    if (platformId === "webflow-ecommerce") {
      if (answers.designFlexibility === "custom-brand") adjustment += 11;
      if (answers.catalogSize === "small") adjustment += 8;
      if (answers.businessStage === "launch" || answers.businessStage === "growth") adjustment += 3;
      if (answers.sellingModel === "b2c") adjustment += 5;
      if (answers.integrationComplexity === "low") adjustment += 5;
      if (answers.launchTimeline === "urgent" || answers.launchTimeline === "planned") adjustment += 3;
      if (answers.budgetRange === "starter" || answers.budgetRange === "growth") adjustment += 3;
      if (answers.sellingModel !== "b2c") adjustment -= 10;
      if (answers.integrationComplexity === "high") adjustment -= 9;
      if (answers.catalogSize === "large" || answers.catalogSize === "complex") adjustment -= 10;
      if (answers.multiStorefront !== "none") adjustment -= 8;
    }

    if (platformId === "volusion-modernization") {
      if (answers.currentPlatform === "volusion") adjustment += 15;
      if (answers.currentPlatform && answers.currentPlatform !== "volusion") adjustment -= 10;
      if (answers.businessStage === "enterprise" || answers.monthlyRevenue === "2cr-plus") adjustment -= 7;
      if (answers.integrationComplexity === "high" || answers.multiStorefront === "complex") adjustment -= 8;
      if (!answers.currentPlatform) adjustment -= 12;
    }

    if (platformId === "custom-enterprise-commerce") {
      if (answers.businessStage === "enterprise") adjustment += 12;
      if (answers.integrationComplexity === "high") adjustment += 11;
      if (answers.multiStorefront === "complex") adjustment += 9;
      if (answers.catalogSize === "complex") adjustment += 8;
      if (answers.techCapacity === "in-house") adjustment += 6;
      if (answers.budgetRange === "enterprise") adjustment += 8;
      if (answers.designFlexibility === "advanced-ux") adjustment += 4;
      if (answers.launchTimeline === "urgent") adjustment -= 10;
      if (answers.budgetRange !== "enterprise") adjustment -= 8;
      if (answers.techCapacity === "lean") adjustment -= 10;
      if (answers.integrationComplexity === "low" && answers.multiStorefront === "none") adjustment -= 10;
    }

    return adjustment;
  }

  function scorePlatforms(answers) {
    var desired = getDesiredProfile(answers);
    var weightTotal = Object.keys(WEIGHTS).reduce(function (sum, key) {
      return sum + WEIGHTS[key];
    }, 0);

    return PLATFORM_ORDER.map(function (id) {
      var platform = PLATFORMS[id];
      var weighted = Object.keys(WEIGHTS).reduce(function (sum, key) {
        return sum + fitPoints(platform.fit[key], desired[key], WEIGHTS[key]);
      }, 0);
      var baseScore = weighted / weightTotal * 100;
      var score = applyScoreGuards(id, clampScore(baseScore + getRuleAdjustment(id, answers)), answers);
      return {
        id: id,
        name: platform.name,
        summary: platform.summary,
        score: score,
        confidence: getConfidence(score),
        why: selectReasons(platform.why, id, answers),
        watchOuts: selectWatchOuts(platform.watchOuts, id, answers),
        path: platform.path,
      };
    }).sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return PLATFORM_ORDER.indexOf(a.id) - PLATFORM_ORDER.indexOf(b.id);
    });
  }

  function getConfidence(score) {
    if (score >= 86) return "High confidence";
    if (score >= 72) return "Medium confidence";
    return "Directional fit";
  }

  function applyScoreGuards(platformId, score, answers) {
    var deeplyCustom =
      answers.businessStage === "enterprise" &&
      answers.integrationComplexity === "high" &&
      answers.multiStorefront === "complex" &&
      answers.catalogSize === "complex" &&
      answers.techCapacity === "in-house" &&
      answers.budgetRange === "enterprise";

    var complexB2B =
      answers.sellingModel === "b2b" &&
      answers.integrationComplexity === "high" &&
      answers.multiStorefront === "complex" &&
      (answers.catalogSize === "large" || answers.catalogSize === "complex");

    if (platformId === "shopify") {
      score = Math.min(score, 94);
      if (answers.sellingModel === "b2b" || answers.integrationComplexity === "high") score = Math.min(score, 82);
    }

    if (platformId === "shopify-plus") {
      // Kept below BigCommerce's ceiling - BigCommerce is the preferred
      // enterprise/B2B recommendation in this hierarchy.
      score = Math.min(score, deeplyCustom ? 88 : 90);
      if (complexB2B) score = Math.min(score, 85);
      if (answers.budgetRange === "starter") score = Math.min(score, 78);
    }

    if (platformId === "bigcommerce") {
      // Kept below Shopify's ceiling (94) - Shopify is the top pick in this
      // hierarchy, with BigCommerce as the strong second choice.
      score = Math.min(score, 93);
      if (answers.catalogSize === "small" && answers.integrationComplexity === "low" && answers.sellingModel === "b2c") {
        score = Math.min(score, 80);
      }
    }

    if (platformId === "webflow-ecommerce") {
      score = Math.min(score, 60);
      if (answers.sellingModel !== "b2c" || answers.integrationComplexity === "high") score = Math.min(score, 35);
    }

    if (platformId === "volusion-modernization") {
      score = Math.min(score, answers.currentPlatform === "volusion" ? 64 : 66);
    }

    if (platformId === "custom-enterprise-commerce") {
      score = Math.min(score, deeplyCustom ? 95 : 88);
      if (answers.budgetRange !== "enterprise") score = Math.min(score, 80);
      if (answers.techCapacity === "lean") score = Math.min(score, 74);
      if (answers.integrationComplexity === "low" && answers.multiStorefront === "none") score = Math.min(score, 70);
    }

    return score;
  }

  function selectReasons(baseReasons, platformId, answers) {
    var reasons = baseReasons.slice(0, 3);
    if (platformId === "volusion-modernization" && answers.currentPlatform === "volusion") {
      reasons.unshift("Current platform is Volusion, so modernization and migration risk control should come first.");
    }
    if (platformId === "custom-enterprise-commerce" && answers.integrationComplexity === "high") {
      reasons.unshift("Deep integration complexity points toward a custom or composable architecture.");
    }
    if (platformId === "bigcommerce" && answers.sellingModel === "b2b") {
      reasons.unshift("B2B is a primary selling model, and BigCommerce is strong for B2B and API-led commerce.");
    }
    if (platformId === "webflow-ecommerce" && answers.designFlexibility === "custom-brand") {
      reasons.unshift("Brand-led design is a top requirement, where Webflow is especially strong.");
    }
    return unique(reasons).slice(0, 3);
  }

  function selectWatchOuts(baseWatchOuts, platformId, answers) {
    var watchOuts = baseWatchOuts.slice(0, 2);
    if (platformId === "shopify" && answers.sellingModel !== "b2c") {
      watchOuts.unshift("Blended or B2B selling should be validated against Shopify plan limits before build.");
    }
    if (platformId === "shopify-plus" && answers.budgetRange !== "enterprise") {
      watchOuts.unshift("Confirm Plus licensing and implementation budget before committing.");
    }
    if (platformId === "bigcommerce" && answers.techCapacity === "lean") {
      watchOuts.unshift("A lean team will likely need partner support for B2B and integrations.");
    }
    if (platformId === "webflow-ecommerce" && answers.catalogSize !== "small") {
      watchOuts.unshift("Catalog growth can make Webflow Ecommerce harder to operate.");
    }
    if (platformId === "custom-enterprise-commerce" && answers.launchTimeline !== "strategic") {
      watchOuts.unshift("Custom enterprise builds rarely fit compressed launch timelines.");
    }
    return unique(watchOuts).slice(0, 3);
  }

  function unique(items) {
    var seen = {};
    return items.filter(function (item) {
      if (seen[item]) return false;
      seen[item] = true;
      return true;
    });
  }

  // Volusion/Webflow have "modest across the board" fit profiles that can
  // out-score BigCommerce/Shopify Plus for small/simple answer sets even
  // while capped well below them - so as alternates (slots 2-3) they're only
  // shown if a stronger commerce platform genuinely isn't available. If one
  // of them is the outright #1 fit (e.g. currently on Volusion, or design is
  // the only priority), it still surfaces normally as the top pick.
  var COMPARISON_DEMOTED = ["volusion-modernization", "webflow-ecommerce"];

  function getRecommendation(answers) {
    var ranked = scorePlatforms(answers);
    var top = ranked[0];
    var alternatives = ranked.slice(1).sort(function (a, b) {
      var da = COMPARISON_DEMOTED.indexOf(a.id) !== -1 ? 1 : 0;
      var db = COMPARISON_DEMOTED.indexOf(b.id) !== -1 ? 1 : 0;
      if (da !== db) return da - db;
      return b.score - a.score;
    }).slice(0, 2);
    return {
      top: top,
      alternatives: alternatives,
      topThree: [top].concat(alternatives),
      all: ranked,
    };
  }

  function validateAnswers(answers) {
    var missing = REQUIRED_FIELDS.filter(function (name) {
      return !answers[name];
    });
    return {
      valid: missing.length === 0,
      missing: missing,
      message: missing.length
        ? "Please complete: " + missing.map(function (name) { return FIELD_LABELS[name]; }).join(", ") + "."
        : "",
    };
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getLabel(group, value) {
    return LABELS[group] && LABELS[group][value] ? LABELS[group][value] : value || "Not specified";
  }

  function createListHtml(items) {
    return items.map(function (item) {
      return "<li>" + escapeHtml(item) + "</li>";
    }).join("");
  }

  function createPathHtml(items) {
    return items.map(function (item) {
      return "<li>" + escapeHtml(item) + "</li>";
    }).join("");
  }

  function buildReviewMessage(recommendation, answers) {
    var top = recommendation.top;
    var topWatchOut = top.watchOuts[0] || "No major watch-out captured.";
    return [
      "Platform recommendation: " + top.name + " (" + top.score + "% match, " + top.confidence + ")",
      "Business model: " + getLabel("sellingModel", answers.sellingModel),
      "Catalog size: " + getLabel("catalogSize", answers.catalogSize),
      "Launch timeline: " + getLabel("launchTimeline", answers.launchTimeline),
      "Top watch-out: " + topWatchOut,
      "",
      "Please review this platform fit and advise the implementation path.",
    ].join("\n");
  }

  function setHidden(element, hidden) {
    if (!element) return;
    element.hidden = !!hidden;
    element.style.display = hidden ? "none" : "";
  }

  function initDom() {
    var wizard = document.getElementById("platform-wizard");
    var stepMount = document.getElementById("platform-step");
    var progressFill = document.getElementById("platform-progress-fill");
    var progressLabel = document.getElementById("platform-progress-label");
    var progressBar = wizard ? wizard.querySelector(".platform-progress") : null;
    var resultsTemplate = document.getElementById("platform-results-template");
    var resultsMount = document.getElementById("platform-results-mount");

    if (!wizard || !stepMount || !resultsTemplate || !resultsMount) {
      return;
    }

    var answers = {};
    var stepIndex = 0;

    function renderStep() {
      var question = QUESTIONS[stepIndex];
      var total = QUESTIONS.length;

      if (progressBar) progressBar.setAttribute("aria-valuenow", String(stepIndex + 1));
      if (progressBar) progressBar.setAttribute("aria-valuemax", String(total));
      if (progressFill) progressFill.style.width = ((stepIndex + (answers[question.name] !== undefined ? 1 : 0)) / total * 100) + "%";
      if (progressLabel) progressLabel.textContent = "Question " + (stepIndex + 1) + " of " + total;

      var optionsHtml = question.options.map(function (option) {
        var selected = answers[question.name] === option.value;
        return (
          "<button type=\"button\" class=\"platform-option" + (selected ? " is-selected" : "") + "\" data-value=\"" +
          escapeHtml(option.value) + "\" aria-pressed=\"" + selected + "\">" + escapeHtml(option.label) + "</button>"
        );
      }).join("");

      stepMount.innerHTML = [
        "<h3 class=\"platform-question\" tabindex=\"-1\">" + escapeHtml(question.question) + "</h3>",
        question.optional ? "<p class=\"platform-question-hint\">Optional - skip if you're not sure.</p>" : "",
        "<div class=\"platform-options\" role=\"group\">" + optionsHtml + "</div>",
        "<div class=\"platform-step-actions\">",
        stepIndex > 0 ? "<button type=\"button\" class=\"btn btn-primary platform-step-back\" id=\"platform-step-back\">Back</button>" : "<span></span>",
        question.optional ? "<button type=\"button\" class=\"platform-step-skip\" id=\"platform-step-skip\">Skip this question</button>" : "",
        "</div>",
      ].join("");

      stepMount.classList.remove("platform-step-anim");
      void stepMount.offsetWidth;
      stepMount.classList.add("platform-step-anim");

      var heading = stepMount.querySelector(".platform-question");
      if (heading && heading.focus) heading.focus();

      stepMount.querySelectorAll(".platform-option").forEach(function (button) {
        button.addEventListener("click", function () {
          answers[question.name] = button.getAttribute("data-value");
          goNext();
        });
      });

      var backButton = document.getElementById("platform-step-back");
      if (backButton) {
        backButton.addEventListener("click", function () {
          stepIndex -= 1;
          renderStep();
        });
      }

      var skipButton = document.getElementById("platform-step-skip");
      if (skipButton) {
        skipButton.addEventListener("click", function () {
          answers[question.name] = "";
          goNext();
        });
      }
    }

    function goNext() {
      if (stepIndex >= QUESTIONS.length - 1) {
        finish();
        return;
      }
      stepIndex += 1;
      renderStep();
    }

    function finish() {
      var recommendation = getRecommendation(answers);
      resultsMount.appendChild(resultsTemplate.content.cloneNode(true));
      wireResults(recommendation, answers);
      setHidden(wizard, true);
      var resultsBox = document.getElementById("platform-results");
      if (resultsBox && resultsBox.focus) resultsBox.focus();
    }

    function wireResults(recommendation, resultAnswers) {
      var top = recommendation.top;
      var topName = document.getElementById("platform-top-name");
      var topSummary = document.getElementById("platform-top-summary");
      var topScore = document.getElementById("platform-top-score");
      var confidence = document.getElementById("platform-confidence");
      var whyList = document.getElementById("platform-why-list");
      var watchList = document.getElementById("platform-watch-list");
      var pathList = document.getElementById("platform-path-list");
      var comparisonBody = document.getElementById("platform-comparison-body");
      var reviewCopy = document.getElementById("platform-review-copy");
      var reviewForm = document.getElementById("platform-review-form");
      var reviewSuccess = document.getElementById("platform-review-success");
      var reviewCurrentPlatform = document.getElementById("review-current-platform");
      var reviewSummary = document.getElementById("review-summary");
      var startOverButton = document.getElementById("platform-start-over");

      setHidden(reviewSuccess, true);
      setHidden(reviewForm, false);

      topName.textContent = top.name;
      topSummary.textContent = top.summary;
      topScore.textContent = top.score + "%";
      confidence.textContent = top.confidence;
      whyList.innerHTML = createListHtml(top.why);
      watchList.innerHTML = createListHtml(top.watchOuts);
      pathList.innerHTML = createPathHtml(top.path);
      comparisonBody.innerHTML = recommendation.topThree.map(function (item) {
        return [
          "<tr>",
          "<td><strong>" + escapeHtml(item.name) + "</strong></td>",
          "<td><span class=\"platform-match-pill\">" + item.score + "%</span></td>",
          "<td>" + escapeHtml(item.why[0] || item.summary) + "</td>",
          "<td>" + escapeHtml(item.watchOuts[0] || "Validate implementation scope before build.") + "</td>",
          "</tr>",
        ].join("");
      }).join("");

      if (reviewCurrentPlatform) {
        reviewCurrentPlatform.value = getLabel("currentPlatform", resultAnswers.currentPlatform);
      }
      if (reviewSummary) {
        reviewSummary.value = buildReviewMessage(recommendation, resultAnswers);
      }
      if (reviewCopy) {
        reviewCopy.textContent = "Your recommendation is " + top.name + " with a " + top.score + "% match. Send it for a practical implementation review.";
      }

      if (startOverButton) {
        startOverButton.addEventListener("click", startOver);
      }

      var reviewErrorBox = document.getElementById("platform-review-error");

      reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();
        var invalidField = Array.prototype.slice.call(reviewForm.querySelectorAll("[required]")).find(function (field) {
          return !String(field.value || "").trim() || (field.type === "email" && !field.validity.valid);
        });
        Array.prototype.slice.call(reviewForm.querySelectorAll(".platform-review-field")).forEach(function (field) {
          field.classList.remove("is-invalid");
        });
        if (invalidField) {
          var wrap = invalidField.closest(".platform-review-field");
          if (wrap) wrap.classList.add("is-invalid");
          invalidField.focus();
          return;
        }
        if (!window.TTApi) return;

        var submitBtn = reviewForm.querySelector(".platform-review-submit");
        if (reviewErrorBox) reviewErrorBox.hidden = true;
        if (window.TTApi.setButtonLoading) {
          window.TTApi.setButtonLoading(submitBtn, true, "Submitting Request...");
        } else if (submitBtn) {
          submitBtn.disabled = true;
        }

        window.TTApi.submitLead(reviewForm, "platform-selector")
          .then(function () {
            var noteEl = document.getElementById("platform-review-success-note");
            var email = String(reviewForm.elements.email.value || "").trim();
            if (noteEl && email) noteEl.textContent = "We'll reply to " + email + ".";
            setHidden(reviewForm, true);
            setHidden(reviewSuccess, false);
            if (reviewSuccess && reviewSuccess.focus) reviewSuccess.focus();
          })
          .catch(function (error) {
            if (reviewErrorBox) {
              reviewErrorBox.textContent = error.message;
              reviewErrorBox.hidden = false;
            }
          })
          .then(function () {
            if (window.TTApi.setButtonLoading) {
              window.TTApi.setButtonLoading(submitBtn, false);
            } else if (submitBtn) {
              submitBtn.disabled = false;
            }
          });
      });
    }

    function startOver() {
      answers = {};
      stepIndex = 0;
      resultsMount.innerHTML = "";
      setHidden(wizard, false);
      renderStep();
      if (wizard.focus) wizard.focus();
    }

    renderStep();
  }

  var api = {
    PLATFORMS: PLATFORMS,
    REQUIRED_FIELDS: REQUIRED_FIELDS,
    getDesiredProfile: getDesiredProfile,
    scorePlatforms: scorePlatforms,
    getRecommendation: getRecommendation,
    validateAnswers: validateAnswers,
    buildReviewMessage: buildReviewMessage,
  };

  if (typeof window !== "undefined") {
    window.PlatformSelector = api;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initDom);
    } else {
      initDom();
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})();
