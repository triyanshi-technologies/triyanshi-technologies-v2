/*
 * Commerce Platform Selector model (legacy tools/platform-selector.js):
 * answers → desired profile → weighted fit per platform, then hand-tuned rule
 * adjustments and ceilings that encode the agency's platform hierarchy.
 */
import type { Answers, WizardQuestion } from "@/components/tools/wizard";

type Fit = {
  speedToLaunch: number;
  operatingSimplicity: number;
  b2bReadiness: number;
  multiStorefront: number;
  designFlexibility: number;
  integrationDepth: number;
  costFit: number;
  scalability: number;
  migrationRisk: number;
};

type PlatformId =
  | "shopify"
  | "bigcommerce"
  | "shopify-plus"
  | "volusion-modernization"
  | "webflow-ecommerce"
  | "custom-enterprise-commerce";

type Platform = {
  id: PlatformId;
  name: string;
  summary: string;
  fit: Fit;
  why: string[];
  watchOuts: string[];
  path: string[];
};

/** Order also breaks score ties. */
const PLATFORMS: Platform[] = [
  {
    id: "shopify",
    name: "Shopify",
    summary:
      "Best fit for fast D2C launches, manageable catalogs, app-led operations, and teams that want a simple commerce admin.",
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
  {
    id: "bigcommerce",
    name: "BigCommerce",
    summary:
      "Best fit for B2B, complex catalogs, API flexibility, multi-storefront commerce, and integration-heavy operations - and a reliable, well-supported step up from Volusion for D2C too.",
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
  {
    id: "shopify-plus",
    name: "Shopify Plus",
    summary:
      "Best fit for scaling D2C and blended B2B brands that need advanced workflows, markets, catalogs, checkout extensibility, and enterprise support.",
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
  {
    id: "volusion-modernization",
    name: "Volusion modernization/migration",
    summary:
      "Best fit when the current store is Volusion and the immediate goal is stabilization, CRO cleanup, technical cleanup, or a controlled migration plan.",
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
  {
    id: "webflow-ecommerce",
    name: "Webflow Ecommerce",
    summary:
      "Best fit for design-led small catalogs, brand-forward stores, and CMS-heavy commerce where visual control matters more than complex operations.",
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
  {
    id: "custom-enterprise-commerce",
    name: "Custom Enterprise Commerce",
    summary:
      "Best fit for highly custom workflows, deep ERP/CRM integration, multi-region logic, unusual catalog or pricing rules, and platform constraints.",
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
];

const WEIGHTS: Fit = {
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

const q = (
  name: string,
  question: string,
  options: Record<string, string>,
  optional = false,
): WizardQuestion => ({
  name,
  question,
  optional,
  options: Object.entries(options).map(([value, label]) => ({ value, label })),
});

export const QUESTIONS: WizardQuestion[] = [
  q("businessStage", "What stage is your business at?", {
    launch: "New launch / MVP",
    growth: "Growing brand",
    scale: "Scaling business",
    enterprise: "Enterprise transformation",
  }),
  q("monthlyRevenue", "What's your monthly revenue range?", {
    "pre-revenue": "Pre-revenue",
    "under-10l": "Under Rs 10L",
    "10l-50l": "Rs 10L - Rs 50L",
    "50l-2cr": "Rs 50L - Rs 2Cr",
    "2cr-plus": "Rs 2Cr+",
  }),
  q("catalogSize", "How large is your product catalog?", {
    small: "1 - 50 SKUs",
    medium: "51 - 500 SKUs",
    large: "501 - 5,000 SKUs",
    complex: "5,000+ SKUs / complex variants",
  }),
  q("sellingModel", "What's your primary selling model?", {
    b2c: "D2C",
    b2b: "B2B",
    blended: "Blended D2C + B2B",
  }),
  q("designFlexibility", "How much design flexibility do you need?", {
    standard: "Standard theme is fine",
    "custom-brand": "Brand-led custom design",
    "advanced-ux": "Advanced UX / headless-like control",
  }),
  q("integrationComplexity", "How complex are your integration needs?", {
    low: "Light apps and analytics",
    moderate: "ERP, CRM, shipping, or POS",
    high: "Deep ERP/CRM, custom APIs, automation",
  }),
  q("multiStorefront", "Do you need multiple storefronts or regions?", {
    none: "Single storefront",
    regional: "Multiple regions / markets",
    complex: "Multiple storefronts, brands, or entities",
  }),
  q("techCapacity", "What's your team's technical capacity?", {
    lean: "Lean non-technical team",
    partner: "Agency / implementation partner",
    "in-house": "In-house engineering team",
  }),
  q("launchTimeline", "What's your launch timeline?", {
    urgent: "Under 8 weeks",
    planned: "2 - 4 months",
    strategic: "4+ months",
  }),
  q("budgetRange", "What's your budget range?", {
    starter: "Lean build budget",
    growth: "Growth build budget",
    enterprise: "Enterprise transformation budget",
  }),
  q(
    "currentPlatform",
    "What platform are you on today?",
    {
      shopify: "Shopify",
      "shopify-plus": "Shopify Plus",
      bigcommerce: "BigCommerce",
      webflow: "Webflow Ecommerce",
      volusion: "Volusion",
      custom: "Custom Enterprise Commerce",
      other: "Other",
    },
    true,
  ),
];

/** Option label for an answer, or "Not specified" (skipped / unanswered). */
export function answerLabel(field: string, answers: Answers) {
  const value = answers[field];
  return (
    QUESTIONS.find((x) => x.name === field)?.options.find((o) => o.value === value)?.label ??
    (value || "Not specified")
  );
}

const average = (values: number[]) => values.reduce((a, b) => a + b, 0) / values.length;

function desiredProfile(a: Answers): Fit {
  const pick = (map: Record<string, number>, key: string, fallback: number) => map[a[key] ?? ""] ?? fallback;
  let simplicity = pick({ lean: 5, partner: 3, "in-house": 2 }, "techCapacity", 3);
  if (a.businessStage === "launch") simplicity += 1;
  if (a.integrationComplexity === "low") simplicity += 1;

  return {
    speedToLaunch: pick({ urgent: 5, planned: 3, strategic: 2 }, "launchTimeline", 3),
    operatingSimplicity: Math.max(1, Math.min(5, simplicity)),
    b2bReadiness: pick({ b2c: 1, blended: 4, b2b: 5 }, "sellingModel", 1),
    multiStorefront: pick({ none: 1, regional: 4, complex: 5 }, "multiStorefront", 1),
    designFlexibility: pick({ standard: 2, "custom-brand": 5, "advanced-ux": 4 }, "designFlexibility", 3),
    integrationDepth: pick({ low: 1, moderate: 3, high: 5 }, "integrationComplexity", 2),
    costFit: pick({ starter: 5, growth: 3, enterprise: 1 }, "budgetRange", 3),
    scalability: Math.round(
      average([
        pick({ launch: 1, growth: 2, scale: 4, enterprise: 5 }, "businessStage", 2),
        pick(
          { "pre-revenue": 1, "under-10l": 2, "10l-50l": 3, "50l-2cr": 4, "2cr-plus": 5 },
          "monthlyRevenue",
          2,
        ),
        pick({ small: 1, medium: 3, large: 4, complex: 5 }, "catalogSize", 2),
      ]),
    ),
    migrationRisk: a.currentPlatform === "volusion" ? 5 : a.currentPlatform ? 3 : 2,
  };
}

function ruleAdjustment(id: PlatformId, a: Answers) {
  let adj = 0;
  const add = (condition: boolean, points: number) => {
    if (condition) adj += points;
  };
  switch (id) {
    case "shopify":
      add(a.businessStage === "launch", 8);
      add(a.sellingModel === "b2c", 5);
      add(a.launchTimeline === "urgent", 5);
      add(a.catalogSize === "small" || a.catalogSize === "medium", 3);
      add(a.techCapacity === "lean", 3);
      add(a.integrationComplexity === "low" || a.integrationComplexity === "moderate", 2);
      add(a.budgetRange === "starter" || a.budgetRange === "growth", 3);
      add(a.sellingModel === "b2b", -8);
      add(a.integrationComplexity === "high", -6);
      add(a.multiStorefront === "complex", -6);
      add(a.catalogSize === "complex", -5);
      break;
    case "shopify-plus":
      add(a.businessStage === "scale" || a.businessStage === "enterprise", 6);
      add(a.sellingModel === "blended", 6);
      add(a.sellingModel === "b2b", 3);
      add(a.multiStorefront === "regional" || a.multiStorefront === "complex", 5);
      add(a.monthlyRevenue === "50l-2cr" || a.monthlyRevenue === "2cr-plus", 5);
      add(a.budgetRange === "enterprise", 4);
      add(a.designFlexibility === "advanced-ux", 3);
      add(a.budgetRange === "starter", -8);
      add(a.businessStage === "launch" && a.monthlyRevenue === "pre-revenue", -5);
      break;
    case "bigcommerce":
      add(a.sellingModel === "b2c", 6);
      add(a.sellingModel === "b2b", 10);
      add(a.sellingModel === "blended", 4);
      add(a.integrationComplexity === "high", 9);
      add(a.integrationComplexity === "moderate", 4);
      add(a.catalogSize === "large" || a.catalogSize === "complex", 7);
      add(a.multiStorefront === "complex", 5);
      add(a.techCapacity === "in-house", 4);
      add(
        a.designFlexibility === "custom-brand" &&
          a.catalogSize === "small" &&
          a.integrationComplexity === "low",
        -7,
      );
      add(a.launchTimeline === "urgent", -2);
      add(a.budgetRange === "starter", -5);
      break;
    case "webflow-ecommerce":
      add(a.designFlexibility === "custom-brand", 11);
      add(a.catalogSize === "small", 8);
      add(a.businessStage === "launch" || a.businessStage === "growth", 3);
      add(a.sellingModel === "b2c", 5);
      add(a.integrationComplexity === "low", 5);
      add(a.launchTimeline === "urgent" || a.launchTimeline === "planned", 3);
      add(a.budgetRange === "starter" || a.budgetRange === "growth", 3);
      add(a.sellingModel !== "b2c", -10);
      add(a.integrationComplexity === "high", -9);
      add(a.catalogSize === "large" || a.catalogSize === "complex", -10);
      add(a.multiStorefront !== "none", -8);
      break;
    case "volusion-modernization":
      add(a.currentPlatform === "volusion", 15);
      add(Boolean(a.currentPlatform) && a.currentPlatform !== "volusion", -10);
      add(a.businessStage === "enterprise" || a.monthlyRevenue === "2cr-plus", -7);
      add(a.integrationComplexity === "high" || a.multiStorefront === "complex", -8);
      add(!a.currentPlatform, -12);
      break;
    case "custom-enterprise-commerce":
      add(a.businessStage === "enterprise", 12);
      add(a.integrationComplexity === "high", 11);
      add(a.multiStorefront === "complex", 9);
      add(a.catalogSize === "complex", 8);
      add(a.techCapacity === "in-house", 6);
      add(a.budgetRange === "enterprise", 8);
      add(a.designFlexibility === "advanced-ux", 4);
      add(a.launchTimeline === "urgent", -10);
      add(a.budgetRange !== "enterprise", -8);
      add(a.techCapacity === "lean", -10);
      add(a.integrationComplexity === "low" && a.multiStorefront === "none", -10);
      break;
  }
  return adj;
}

/** Ceilings that keep the recommendation hierarchy (Shopify > BigCommerce > Shopify Plus …). */
function scoreGuard(id: PlatformId, score: number, a: Answers) {
  const deeplyCustom =
    a.businessStage === "enterprise" &&
    a.integrationComplexity === "high" &&
    a.multiStorefront === "complex" &&
    a.catalogSize === "complex" &&
    a.techCapacity === "in-house" &&
    a.budgetRange === "enterprise";
  const complexB2B =
    a.sellingModel === "b2b" &&
    a.integrationComplexity === "high" &&
    a.multiStorefront === "complex" &&
    (a.catalogSize === "large" || a.catalogSize === "complex");
  const cap = (condition: boolean, max: number) => {
    if (condition) score = Math.min(score, max);
  };

  switch (id) {
    case "shopify":
      cap(true, 94);
      cap(a.sellingModel === "b2b" || a.integrationComplexity === "high", 82);
      break;
    case "shopify-plus":
      cap(true, deeplyCustom ? 88 : 90);
      cap(complexB2B, 85);
      cap(a.budgetRange === "starter", 78);
      break;
    case "bigcommerce":
      cap(true, 93);
      cap(a.catalogSize === "small" && a.integrationComplexity === "low" && a.sellingModel === "b2c", 80);
      break;
    case "webflow-ecommerce":
      cap(true, 60);
      cap(a.sellingModel !== "b2c" || a.integrationComplexity === "high", 35);
      break;
    case "volusion-modernization":
      cap(true, a.currentPlatform === "volusion" ? 64 : 66);
      break;
    case "custom-enterprise-commerce":
      cap(true, deeplyCustom ? 95 : 88);
      cap(a.budgetRange !== "enterprise", 80);
      cap(a.techCapacity === "lean", 74);
      cap(a.integrationComplexity === "low" && a.multiStorefront === "none", 70);
      break;
  }
  return score;
}

function reasons(platform: Platform, a: Answers) {
  const list = platform.why.slice(0, 3);
  if (platform.id === "volusion-modernization" && a.currentPlatform === "volusion")
    list.unshift(
      "Current platform is Volusion, so modernization and migration risk control should come first.",
    );
  if (platform.id === "custom-enterprise-commerce" && a.integrationComplexity === "high")
    list.unshift("Deep integration complexity points toward a custom or composable architecture.");
  if (platform.id === "bigcommerce" && a.sellingModel === "b2b")
    list.unshift("B2B is a primary selling model, and BigCommerce is strong for B2B and API-led commerce.");
  if (platform.id === "webflow-ecommerce" && a.designFlexibility === "custom-brand")
    list.unshift("Brand-led design is a top requirement, where Webflow is especially strong.");
  return [...new Set(list)].slice(0, 3);
}

function watchOuts(platform: Platform, a: Answers) {
  const list = platform.watchOuts.slice(0, 2);
  if (platform.id === "shopify" && a.sellingModel !== "b2c")
    list.unshift("Blended or B2B selling should be validated against Shopify plan limits before build.");
  if (platform.id === "shopify-plus" && a.budgetRange !== "enterprise")
    list.unshift("Confirm Plus licensing and implementation budget before committing.");
  if (platform.id === "bigcommerce" && a.techCapacity === "lean")
    list.unshift("A lean team will likely need partner support for B2B and integrations.");
  if (platform.id === "webflow-ecommerce" && a.catalogSize !== "small")
    list.unshift("Catalog growth can make Webflow Ecommerce harder to operate.");
  if (platform.id === "custom-enterprise-commerce" && a.launchTimeline !== "strategic")
    list.unshift("Custom enterprise builds rarely fit compressed launch timelines.");
  return [...new Set(list)].slice(0, 3);
}

const confidence = (score: number) =>
  score >= 86 ? "High confidence" : score >= 72 ? "Medium confidence" : "Directional fit";

/**
 * Volusion/Webflow have modest, even fit profiles that can out-score stronger
 * platforms on simple answer sets, so as alternates they're only shown when
 * nothing stronger is available. As the outright #1 they still surface.
 */
const DEMOTED_ALTERNATES = new Set<PlatformId>(["volusion-modernization", "webflow-ecommerce"]);

export function recommend(answers: Answers) {
  const desired = desiredProfile(answers);
  const weightKeys = Object.keys(WEIGHTS) as (keyof Fit)[];
  const weightTotal = weightKeys.reduce((sum, key) => sum + WEIGHTS[key], 0);

  const ranked = PLATFORMS.map((platform, order) => {
    const weighted = weightKeys.reduce(
      (sum, key) => sum + WEIGHTS[key] * (1 - Math.abs(platform.fit[key] - desired[key]) / 4),
      0,
    );
    const base = Math.max(
      0,
      Math.min(100, Math.round((weighted / weightTotal) * 100 + ruleAdjustment(platform.id, answers))),
    );
    const score = scoreGuard(platform.id, base, answers);
    return {
      order,
      id: platform.id,
      name: platform.name,
      summary: platform.summary,
      score,
      confidence: confidence(score),
      why: reasons(platform, answers),
      watchOuts: watchOuts(platform, answers),
      path: platform.path,
    };
  }).sort((x, y) => y.score - x.score || x.order - y.order);

  const [top, ...rest] = ranked;
  if (!top) throw new Error("No platforms configured");
  const alternatives = rest
    .sort(
      (x, y) =>
        Number(DEMOTED_ALTERNATES.has(x.id)) - Number(DEMOTED_ALTERNATES.has(y.id)) || y.score - x.score,
    )
    .slice(0, 2);
  return { top, topThree: [top, ...alternatives] };
}

export type Recommendation = ReturnType<typeof recommend>;

/** Plain-text recap sent with the review form. */
export function reviewSummary(answers: Answers, { top }: Recommendation) {
  return [
    `Platform recommendation: ${top.name} (${top.score}% match, ${top.confidence})`,
    `Business model: ${answerLabel("sellingModel", answers)}`,
    `Catalog size: ${answerLabel("catalogSize", answers)}`,
    `Launch timeline: ${answerLabel("launchTimeline", answers)}`,
    `Top watch-out: ${top.watchOuts[0] || "No major watch-out captured."}`,
    "",
    "Please review this platform fit and advise the implementation path.",
  ].join("\n");
}
