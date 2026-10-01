/*
 * AI Readiness Assessment model (legacy tools/ai-readiness-assessment.js):
 * 8 questions → 7 weighted dimensions → overall score, maturity band, top
 * gaps and next actions. Deterministic; nothing leaves the browser until the
 * visitor submits the review form.
 */

type Option = { value: string; label: string; score: number };
type Question = { name: string; question: string; options: Option[] };

export const QUESTIONS: Question[] = [
  {
    name: "businessGoal",
    question: "How clear is your AI use case?",
    options: [
      { value: "vague", label: "No clear AI use case yet", score: 1 },
      { value: "ideas", label: "A few ideas, no priority", score: 2 },
      { value: "clear", label: "One clear workflow to improve", score: 4 },
      { value: "measured", label: "Clear use case with success metrics", score: 5 },
    ],
  },
  {
    name: "commercePain",
    question: "What's your main commerce operations pain point?",
    options: [
      { value: "not-sure", label: "Not sure where AI should help", score: 1 },
      { value: "support-content", label: "Support, FAQs, content, or product copy", score: 3 },
      { value: "marketing-merchandising", label: "Marketing, merchandising, or personalization", score: 4 },
      { value: "inventory-ops", label: "Inventory, reporting, catalog, or operations", score: 4 },
      { value: "multiple-priority", label: "Multiple high-priority workflows", score: 3 },
    ],
  },
  {
    name: "dataQuality",
    question: "How would you rate your data quality and accessibility?",
    options: [
      { value: "scattered", label: "Scattered or hard to trust", score: 1 },
      { value: "spreadsheets", label: "Mostly spreadsheets/manual exports", score: 2 },
      { value: "analytics", label: "Analytics and store data are usable", score: 3 },
      { value: "clean-crm", label: "Clean customer/product/order data", score: 4 },
      { value: "unified", label: "Unified, governed, and reusable data", score: 5 },
    ],
  },
  {
    name: "toolStack",
    question: "How integrated is your tool stack?",
    options: [
      { value: "manual", label: "Mostly manual tools", score: 1 },
      { value: "basic", label: "Storefront plus basic apps", score: 2 },
      { value: "connected", label: "Core tools are connected", score: 3 },
      { value: "api-ready", label: "APIs or automation tools are available", score: 4 },
      { value: "modern", label: "Modern stack with reliable integrations", score: 5 },
    ],
  },
  {
    name: "aiLiteracy",
    question: "How would you describe your team's AI literacy?",
    options: [
      { value: "no-literacy", label: "No shared AI understanding", score: 1 },
      { value: "curious", label: "Team is curious but untrained", score: 2 },
      { value: "trained-users", label: "Some trained AI tool users", score: 3 },
      { value: "owner", label: "Clear internal AI owner", score: 4 },
      { value: "champions", label: "AI champions across functions", score: 5 },
    ],
  },
  {
    name: "automationMaturity",
    question: "How mature are your workflow automations?",
    options: [
      { value: "manual", label: "Mostly manual workflows", score: 1 },
      { value: "templates", label: "Templates or checklists only", score: 2 },
      { value: "simple", label: "Simple automations in place", score: 3 },
      { value: "integrated", label: "Integrated workflow automations", score: 4 },
      { value: "measured", label: "Measured automations with ownership", score: 5 },
    ],
  },
  {
    name: "governance",
    question: "What governance, privacy, and security controls do you have?",
    options: [
      { value: "none", label: "No AI or data usage rules", score: 1 },
      { value: "informal", label: "Informal rules only", score: 2 },
      { value: "privacy", label: "Privacy/security basics exist", score: 3 },
      { value: "documented", label: "Documented AI usage and approval process", score: 4 },
      { value: "monitored", label: "Monitored controls and risk reviews", score: 5 },
    ],
  },
  {
    name: "implementationCapacity",
    question: "What's your budget and implementation capacity?",
    options: [
      { value: "none", label: "No budget or owner yet", score: 1 },
      { value: "explore", label: "Small exploration budget", score: 2 },
      { value: "pilot", label: "Pilot budget and part-time owner", score: 3 },
      { value: "roadmap", label: "Roadmap budget and implementation support", score: 4 },
      { value: "scale", label: "Dedicated budget and delivery team", score: 5 },
    ],
  },
];

export type Answers = Record<string, string>;

const DIMENSIONS = [
  {
    id: "strategy",
    label: "Use Case",
    weight: 16,
    fields: ["businessGoal", "commercePain"],
    gap: "Prioritize one AI use case with a clear owner, workflow boundary, and success metric.",
    action: "Choose one commerce workflow, define the before/after process, and set a measurable target.",
  },
  {
    id: "data",
    label: "Data",
    weight: 18,
    fields: ["dataQuality"],
    gap: "Improve data quality, access, and trust before expecting reliable AI output.",
    action:
      "Clean product, order, customer, and analytics data; document where each source lives and who owns it.",
  },
  {
    id: "integrations",
    label: "Tools",
    weight: 13,
    fields: ["toolStack"],
    gap: "Connect the tools AI needs to read from or write back into your commerce workflow.",
    action: "Map storefront, CRM, email, support, analytics, and ERP connections before picking AI tooling.",
  },
  {
    id: "people",
    label: "Team",
    weight: 13,
    fields: ["aiLiteracy"],
    gap: "Build basic AI literacy and assign an internal owner for experimentation and rollout.",
    action:
      "Train the team on safe AI usage, prompt quality, data privacy, and workflow-specific review steps.",
  },
  {
    id: "automation",
    label: "Workflow",
    weight: 14,
    fields: ["automationMaturity"],
    gap: "Stabilize the workflow before adding AI, especially if the current process is mostly manual.",
    action:
      "Document the workflow, remove avoidable manual handoffs, then automate the repeatable parts first.",
  },
  {
    id: "governance",
    label: "Governance",
    weight: 16,
    fields: ["governance"],
    gap: "Create clear rules for AI usage, privacy, approvals, and human review.",
    action: "Define an AI usage policy, sensitive-data rules, approval checkpoints, and escalation paths.",
  },
  {
    id: "capacity",
    label: "Capacity",
    weight: 10,
    fields: ["implementationCapacity"],
    gap: "Assign enough budget, ownership, and implementation time to move beyond experiments.",
    action: "Set a pilot budget, appoint a business owner, and commit to a 30-60 day implementation window.",
  },
];

export const INTERESTS = [
  "Commerce workflow automation",
  "Customer support AI",
  "Marketing and personalization",
  "Data cleanup and reporting",
  "AI governance and policy",
  "Not sure",
];

function option(field: string, value: string | undefined) {
  return QUESTIONS.find((q) => q.name === field)?.options.find((o) => o.value === value);
}

const average = (values: number[]) => (values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0);

function maturity(score: number) {
  if (score < 40)
    return {
      band: "Not Ready",
      label: "Poor foundation",
      summary:
        "AI would likely create noise before value. Focus first on use case clarity, data cleanup, and basic controls.",
    };
  if (score < 60)
    return {
      band: "Foundation Needed",
      label: "Needs foundation work",
      summary:
        "There is real opportunity, but the business needs stronger data, workflow, governance, or ownership before a reliable pilot.",
    };
  if (score < 80)
    return {
      band: "Pilot Ready",
      label: "Pilot ready",
      summary:
        "You can likely run a focused AI pilot if scope is tight, success metrics are clear, and human review stays in the loop.",
    };
  return {
    band: "Scale Ready",
    label: "Scale ready",
    summary: "Your foundation can support a more structured AI roadmap across multiple commerce workflows.",
  };
}

export type Assessment = ReturnType<typeof assess>;

export function assess(answers: Answers) {
  const dimensions = DIMENSIONS.map((d) => {
    const raw = average(d.fields.map((field) => option(field, answers[field])?.score ?? 0));
    return { ...d, score: Math.round((raw / 5) * 100) };
  });

  const weightTotal = dimensions.reduce((sum, d) => sum + d.weight, 0);
  let score = Math.round(dimensions.reduce((sum, d) => sum + d.score * d.weight, 0) / weightTotal);
  // Hard caps: one weak foundation holds the whole score back.
  if (answers.businessGoal === "vague") score = Math.min(score, 49);
  if (answers.dataQuality === "scattered") score = Math.min(score, 55);
  if (answers.governance === "none") score = Math.min(score, 59);
  if (answers.implementationCapacity === "none") score = Math.min(score, 58);
  if (
    answers.dataQuality === "unified" &&
    answers.governance === "monitored" &&
    answers.aiLiteracy === "champions"
  ) {
    score = Math.max(score, 82);
  }
  score = Math.max(0, Math.min(100, score));

  const level = maturity(score);
  const topGaps = [...dimensions].sort((a, b) => a.score - b.score || b.weight - a.weight).slice(0, 3);
  const top = topGaps[0];

  let startingPath =
    "Start with a focused pilot workflow and keep the scope narrow enough to measure within 30-60 days.";
  if (!top)
    startingPath =
      "Start with a short discovery sprint to confirm your AI opportunity, data readiness, and implementation constraints.";
  else if (top.id === "data") startingPath = "Start with a data cleanup sprint before building the AI pilot.";
  else if (top.id === "governance")
    startingPath =
      "Start with an AI governance and safe-use setup before exposing customer or business data to AI tools.";
  else if (top.id === "strategy")
    startingPath = "Start with an AI opportunity workshop and pick one measurable commerce workflow.";
  else if (top.id === "automation")
    startingPath = "Start with a workflow automation roadmap, then layer AI into the highest-volume steps.";
  else if (level.band === "Scale Ready")
    startingPath = "Start with a 90-day AI roadmap that prioritizes the highest-ROI commerce workflows.";

  return {
    score,
    maturity: level,
    gaps: topGaps.map((g) => g.gap),
    nextActions: topGaps.map((g) => g.action),
    startingPath,
    dimensions: dimensions.map(({ id, label, score: s }) => ({ id, label, score: s })),
  };
}

/** Pre-selects the review form's "Main AI interest". */
export function inferInterest(answers: Answers, result: Assessment) {
  const weakest = [...result.dimensions].sort((a, b) => a.score - b.score)[0];
  if (weakest?.id === "data") return "Data cleanup and reporting";
  if (weakest?.id === "governance") return "AI governance and policy";
  if (answers.commercePain === "support-content") return "Customer support AI";
  if (answers.commercePain === "marketing-merchandising") return "Marketing and personalization";
  if (answers.commercePain === "not-sure") return "Not sure";
  return "Commerce workflow automation";
}

/** Plain-text recap sent with the review form. */
export function reviewSummary(answers: Answers, result: Assessment) {
  const label = (field: string) =>
    option(field, answers[field])?.label ?? (answers[field] || "Not specified");
  return [
    `AI readiness score: ${result.score}/100`,
    `Maturity level: ${result.maturity.band} - ${result.maturity.label}`,
    `Business goal: ${label("businessGoal")}`,
    `Main commerce pain point: ${label("commercePain")}`,
    `Top gap: ${result.gaps[0] || "No major gap captured."}`,
    `Recommended next step: ${result.nextActions[0] || result.startingPath}`,
    "",
    "Please review our AI readiness and recommend a practical implementation roadmap.",
  ].join("\n");
}
