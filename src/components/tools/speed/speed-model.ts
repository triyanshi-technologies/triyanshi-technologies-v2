/*
 * Site Speed Grader model (legacy tools/site-speed-grader.js): URL checks,
 * PageSpeed Insights parsing and the "top 3 fixes" ranking. Pure functions.
 */

export type Strategy = "desktop" | "mobile";
export const STRATEGIES: Strategy[] = ["desktop", "mobile"];
export const strategyLabel = (s: Strategy) => (s === "desktop" ? "Desktop" : "Mobile");

export const CATEGORIES = [
  { id: "performance", title: "Performance Score" },
  { id: "accessibility", title: "Accessibility" },
  { id: "best-practices", title: "Best Practices" },
  { id: "seo", title: "SEO Audit" },
] as const;
export type CategoryId = (typeof CATEGORIES)[number]["id"];

const METRICS = [
  { id: "first-contentful-paint", label: "FCP", guide: "< 1.8s optimal" },
  { id: "largest-contentful-paint", label: "LCP", guide: "< 2.5s optimal" },
  { id: "total-blocking-time", label: "TBT", guide: "< 200ms optimal" },
  { id: "cumulative-layout-shift", label: "CLS", guide: "< 0.1 optimal" },
  { id: "speed-index", label: "Speed Index", guide: "< 3.4s optimal" },
];

/** Audits that always rank first when they fail. */
const PRIORITY_AUDITS = new Set([
  "render-blocking-resources",
  "largest-contentful-paint-element",
  "lcp-lazy-loaded",
  "lcp-discovery",
  "server-response-time",
  "uses-responsive-images",
  "uses-optimized-images",
  "modern-image-formats",
  "offscreen-images",
  "unused-javascript",
  "legacy-javascript",
  "unminified-javascript",
  "unused-css-rules",
  "unminified-css",
  "total-byte-weight",
  "third-party-summary",
  "mainthread-work-breakdown",
  "bootup-time",
  "dom-size",
  "redirects",
]);

/** Fake-but-honest progress copy while PageSpeed runs (it gives no real progress). */
export const LOADING_STEPS = [
  { delay: 0, text: "Connecting to your website...", pct: 12 },
  { delay: 3000, text: "Fetching desktop & mobile  data...", pct: 30 },
  { delay: 9000, text: "Running Core Web Vitals audit...", pct: 50 },
  { delay: 18000, text: "Analyzing render-blocking resources & JS payload...", pct: 68 },
  { delay: 28000, text: "Compiling prioritized fix list...", pct: 80 },
  { delay: 40000, text: "This page is heavier than most - still auditing...", pct: 88 },
  { delay: 55000, text: "Almost there, finishing final checks...", pct: 94 },
];
/** After the last step, creep 1% every 10s up to 97%. */
export const LOADING_TRAIL = { stepMs: 10_000, maxPct: 97 };

export type SpeedMetric = { id: string; label: string; guide: string; value: string; score: number | null };
export type SpeedSuggestion = { id: string; title: string; description: string; displayValue: string };
export type SpeedReport = {
  strategy: Strategy;
  finalUrl: string;
  scores: Record<CategoryId, number | null>;
  metrics: SpeedMetric[];
  suggestions: SpeedSuggestion[];
};

/* The slice of the PageSpeed Insights v5 response we read. */
type PsiAudit = {
  title?: string;
  description?: string;
  explanation?: string;
  displayValue?: string;
  score?: number | null;
  details?: { type?: string; overallSavingsMs?: number; overallSavingsBytes?: number };
};
export type PsiResponse = {
  id?: string;
  lighthouseResult?: {
    finalUrl?: string;
    requestedUrl?: string;
    runtimeError?: { message?: string };
    categories?: Partial<Record<CategoryId, { score?: number | null }>>;
    audits?: Record<string, PsiAudit>;
  };
};

/** Adds https:// when missing and rejects non-public URLs. Throws a user-facing Error. */
export function normalizeUrl(raw: string) {
  let value = raw.trim();
  if (!value) throw new Error("Enter a website URL to grade.");
  if (!/^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value)) value = `https://${value}`;

  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error("Enter a valid website URL, for example https://yourstore.com.");
  }
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error("Only public HTTP and HTTPS URLs can be graded.");
  }
  if (parsed.username || parsed.password) {
    throw new Error("Remove the username or password from the URL before grading it.");
  }
  if (isPrivateHost(parsed.hostname)) {
    throw new Error("Use a public website URL. Localhost and private network URLs cannot be graded.");
  }
  parsed.hash = "";
  return parsed.href;
}

function isPrivateHost(hostname: string) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (!host || host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) return true;
  if (host.includes(":")) {
    return host === "::1" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80:");
  }
  const match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (!match) return false;
  const [a = 0, b = 0, ...rest] = match.slice(1).map(Number);
  if ([a, b, ...rest].some((part) => part > 255)) return true;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  );
}

/** Lighthouse bands: 0–49 poor, 50–89 needs improvement, 90–100 good. */
export function scoreLabel(score: number | null) {
  if (score === null) return "Not available";
  if (score < 50) return "Poor";
  if (score < 90) return "Needs Improvement";
  return "Good";
}

const toScore = (score: number | null | undefined) =>
  typeof score === "number" ? Math.round(score * 100) : null;
const savings = (audit: PsiAudit) =>
  audit.details?.overallSavingsMs || audit.details?.overallSavingsBytes || 0;
/** Strips markdown links and code ticks from Lighthouse descriptions. */
const cleanText = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`/g, "")
    .trim();

function collectSuggestions(audits: Record<string, PsiAudit>): SpeedSuggestion[] {
  return Object.entries(audits)
    .flatMap(([id, audit]) => {
      const score = typeof audit.score === "number" ? audit.score : null;
      const priority = PRIORITY_AUDITS.has(id);
      const actionable =
        audit.title &&
        score !== null &&
        score < 0.9 &&
        (audit.details?.type === "opportunity" || savings(audit) > 0 || priority);
      if (!actionable) return [];
      return [{ id, audit, score, priority: priority ? 1 : 0, savings: savings(audit) }];
    })
    .sort((a, b) => b.priority - a.priority || b.savings - a.savings || a.score - b.score)
    .slice(0, 3)
    .map(({ id, audit }) => ({
      id,
      title: audit.title ?? id,
      description: cleanText(
        audit.description ||
          audit.explanation ||
          "Review this performance audit and apply the recommended fix.",
      ),
      displayValue: audit.displayValue ?? "",
    }));
}

export function parsePageSpeed(data: PsiResponse, requestedUrl: string, strategy: Strategy): SpeedReport {
  const lighthouse = data.lighthouseResult;
  if (!lighthouse) throw new Error("Unable to retrieve a speed report for this URL.");
  if (lighthouse.runtimeError?.message) throw new Error(lighthouse.runtimeError.message);

  const categories = lighthouse.categories ?? {};
  const audits = lighthouse.audits ?? {};
  return {
    strategy,
    finalUrl: lighthouse.finalUrl || lighthouse.requestedUrl || data.id || requestedUrl,
    scores: {
      performance: toScore(categories.performance?.score),
      accessibility: toScore(categories.accessibility?.score),
      "best-practices": toScore(categories["best-practices"]?.score),
      seo: toScore(categories.seo?.score),
    },
    metrics: METRICS.map((metric) => {
      const audit = audits[metric.id];
      return { ...metric, value: audit?.displayValue ?? "Not available", score: toScore(audit?.score) };
    }),
    suggestions: collectSuggestions(audits),
  };
}

export const CONCERNS = [
  "Slow speed score",
  "Poor Core Web Vitals",
  "Heavy JavaScript",
  "Image optimization",
  "Not sure",
];

/** Picks the fix form's "Main concern" from the top issue titles. */
export function inferConcern(titles: string[]) {
  const text = titles.join(" ").toLowerCase();
  if (/image|picture|webp|avif|offscreen/.test(text)) return "Image optimization";
  if (/javascript|main-thread|third-party|boot-up|script/.test(text)) return "Heavy JavaScript";
  if (/largest contentful paint|layout shift|blocking time|core web vital/.test(text))
    return "Poor Core Web Vitals";
  return "Slow speed score";
}
