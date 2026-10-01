/*
 * ROI calculator model (legacy tools/roi-calculator.js): benchmark presets,
 * currency limits and the payback maths. Pure functions, no React.
 */

export type Currency = "INR" | "USD";

export type RoiValues = {
  visitors: number;
  currentCvr: number;
  currentAov: number;
  marginPercent: number;
  targetCvr: number;
  targetAov: number;
  investment: number;
  timeframe: number;
};

export const CURRENCIES: Record<
  Currency,
  {
    label: string;
    symbol: string;
    locale: string;
    aov: { min: number; max: number; step: number };
    investment: { min: number; max: number; step: number };
    defaults: { currentAov: number; targetAov: number; investment: number };
  }
> = {
  INR: {
    label: "INR (₹)",
    symbol: "₹",
    locale: "en-IN",
    aov: { min: 100, max: 500_000, step: 1 },
    investment: { min: 10_000, max: 10_000_000, step: 10_000 },
    defaults: { currentAov: 1500, targetAov: 1650, investment: 500_000 },
  },
  USD: {
    label: "USD ($)",
    symbol: "$",
    locale: "en-US",
    aov: { min: 5, max: 10_000, step: 1 },
    investment: { min: 500, max: 200_000, step: 500 },
    defaults: { currentAov: 60, targetAov: 66, investment: 6000 },
  },
};

/** Industry presets: baseline AOV per currency + current/target conversion benchmarks. */
export const INDUSTRIES = [
  { label: "Fashion / Apparel", aov: { INR: 1800, USD: 75 }, currentCvr: 2.2, targetCvr: 2.8 },
  { label: "Beauty / Personal Care", aov: { INR: 1000, USD: 45 }, currentCvr: 3.2, targetCvr: 4.0 },
  { label: "Electronics", aov: { INR: 10_000, USD: 220 }, currentCvr: 1.2, targetCvr: 1.5 },
  { label: "Grocery / Quick Commerce", aov: { INR: 600, USD: 35 }, currentCvr: 3.5, targetCvr: 4.3 },
  { label: "Home / Furniture", aov: { INR: 7500, USD: 180 }, currentCvr: 1.3, targetCvr: 1.6 },
  { label: "Health / Wellness", aov: { INR: 1400, USD: 55 }, currentCvr: 2.5, targetCvr: 3.1 },
  { label: "Other", aov: { INR: 1500, USD: 60 }, currentCvr: 2.0, targetCvr: 2.5 },
] as const;

/** Page-load values (legacy HTML defaults, INR). */
export const INITIAL_VALUES: RoiValues = {
  visitors: 10_000,
  currentCvr: 1.74,
  currentAov: 1500,
  marginPercent: 40,
  targetCvr: 2.61,
  targetAov: 1650,
  investment: 500_000,
  timeframe: 12,
};

export const BENCHMARK_AOV_LIFT = 1.1;
/** Targets can't exceed 2× current CVR / 1.5× current AOV (keeps projections plausible). */
const TARGET_CVR_CEILING = 2;
const TARGET_AOV_CEILING = 1.5;
const TARGET_CVR_HARD_MAX = 20;
/** Low/high scenarios scale the expected uplift. */
const SCENARIOS = { conservative: 0.6, expected: 1, optimistic: 1.4 };

/*
 * Quick-benchmark chips — hidden on the legacy site (markup commented out in
 * roi-calculator.tsx). Their uplift factors, for when they come back:
 *   Conservative ×1.15 / Expected ×1.25 / Strong ×1.4 on target CVR, +10% AOV.
 */

export const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

export function targetCeilings(values: RoiValues, currency: Currency) {
  return {
    targetCvr: Math.min(values.currentCvr * TARGET_CVR_CEILING, TARGET_CVR_HARD_MAX),
    targetAov: Math.min(values.currentAov * TARGET_AOV_CEILING, CURRENCIES[currency].aov.max),
  };
}

/** Re-clamps the targets after a baseline change (legacy updateTargetCeilings). */
export function withTargetCeilings(values: RoiValues, currency: Currency): RoiValues {
  const max = targetCeilings(values, currency);
  return {
    ...values,
    targetCvr: clamp(values.targetCvr, 0.1, max.targetCvr),
    targetAov: clamp(values.targetAov, CURRENCIES[currency].aov.min, max.targetAov),
  };
}

function scenario(values: RoiValues, factor: number) {
  const investment = Math.max(values.investment, 1);
  const timeframe = Math.max(values.timeframe, 1);
  const currentRevenue = values.visitors * (values.currentCvr / 100) * values.currentAov;
  const cvr = values.currentCvr + (values.targetCvr - values.currentCvr) * factor;
  const aov = values.currentAov + (values.targetAov - values.currentAov) * factor;
  const monthlyProfitLift =
    (values.visitors * (cvr / 100) * aov - currentRevenue) * (values.marginPercent / 100);
  const netGain = monthlyProfitLift * timeframe - investment;
  return {
    roiPercent: (netGain / investment) * 100,
    paybackMonths: monthlyProfitLift > 0 ? investment / monthlyProfitLift : Infinity,
  };
}

export function computeRoi(values: RoiValues) {
  return {
    investment: Math.max(values.investment, 1),
    timeframe: Math.max(values.timeframe, 1),
    conservative: scenario(values, SCENARIOS.conservative),
    expected: scenario(values, SCENARIOS.expected),
    optimistic: scenario(values, SCENARIOS.optimistic),
  };
}

export function moneyFormatter(currency: Currency) {
  const { locale } = CURRENCIES[currency];
  const format = new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 });
  return (n: number) => format.format(Math.round(n));
}

/** Plain-text recap sent with the lead form. */
export function roiSummary(values: RoiValues, currency: Currency) {
  const money = moneyFormatter(currency);
  const result = computeRoi(values);
  const payback = Number.isFinite(result.expected.paybackMonths)
    ? `~${Math.round(result.expected.paybackMonths)} months`
    : "No payback";
  return [
    `Monthly visitors: ${new Intl.NumberFormat("en-IN").format(Math.round(values.visitors))}`,
    `Current CVR: ${values.currentCvr}% -> Target CVR: ${values.targetCvr}%`,
    `Current AOV: ${money(values.currentAov)} -> Target AOV: ${money(values.targetAov)}`,
    `Gross margin: ${values.marginPercent}%`,
    `Investment: ${money(result.investment)} over ${result.timeframe} months`,
    `Expected ROI: ${Math.round(result.expected.roiPercent)}% (payback ${payback})`,
    `Range: ${Math.round(result.conservative.roiPercent)}% conservative to ${Math.round(result.optimistic.roiPercent)}% optimistic`,
  ].join("\n");
}
