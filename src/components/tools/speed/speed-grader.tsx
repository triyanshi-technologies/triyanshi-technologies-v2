"use client";

import { useEffect, useReducer, useRef, useState, type FormEvent } from "react";
import { LeadForm } from "@/components/tools/lead-form";
import { Kicker, ToolCard, ToolCardTitle } from "@/components/tools/tool-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form-fields";
import { ArrowRightIcon } from "@/components/ui/icons";
import { getPageSpeed } from "@/lib/api";
import { cx } from "@/lib/cx";
import { arrowNudge } from "@/lib/hover";
import {
  CATEGORIES,
  CONCERNS,
  LOADING_STEPS,
  LOADING_TRAIL,
  STRATEGIES,
  inferConcern,
  normalizeUrl,
  parsePageSpeed,
  scoreLabel,
  strategyLabel,
  type PsiResponse,
  type SpeedReport,
  type Strategy,
} from "./speed-model";

/*
 * One "run" grades the URL on desktop and mobile in parallel. Each strategy
 * settles independently; the visitor can switch tabs while the other is
 * still loading. Results from an older run are ignored (run id check).
 */
type Run = {
  id: number;
  reports: Partial<Record<Strategy, SpeedReport>>;
  errors: Partial<Record<Strategy, string>>;
  pending: Record<Strategy, boolean>;
  active: Strategy;
  /** The visitor chose a tab; don't auto-switch for them. */
  userPicked: boolean;
};

type RunAction =
  | { type: "start"; id: number }
  | { type: "settle"; id: number; strategy: Strategy; report?: SpeedReport; error?: string }
  | { type: "pick"; strategy: Strategy };

const other = (s: Strategy): Strategy => (s === "desktop" ? "mobile" : "desktop");

function runReducer(run: Run, action: RunAction): Run {
  switch (action.type) {
    case "start":
      return {
        id: action.id,
        reports: {},
        errors: {},
        pending: { desktop: true, mobile: true },
        active: "desktop",
        userPicked: false,
      };
    case "pick":
      return { ...run, active: action.strategy, userPicked: true };
    case "settle": {
      if (action.id !== run.id) return run;
      const next: Run = {
        ...run,
        pending: { ...run.pending, [action.strategy]: false },
        reports: action.report ? { ...run.reports, [action.strategy]: action.report } : run.reports,
        errors: action.error ? { ...run.errors, [action.strategy]: action.error } : run.errors,
      };
      // Both done and the default tab failed: show the one that worked.
      const done = !next.pending.desktop && !next.pending.mobile;
      if (done && !next.userPicked && !next.reports[next.active] && next.reports[other(next.active)]) {
        next.active = other(next.active);
      }
      return next;
    }
  }
}

const IDLE_RUN: Run = {
  id: 0,
  reports: {},
  errors: {},
  pending: { desktop: false, mobile: false },
  active: "desktop",
  userPicked: false,
};

/** Fetches one strategy, retrying once (PageSpeed is flaky on cold starts). */
async function fetchReport(url: string, strategy: Strategy, signal: AbortSignal) {
  const attempt = async () => {
    try {
      return await getPageSpeed<PsiResponse>(url, strategy, signal);
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error(
          `${strategyLabel(strategy)} request failed - check the site is publicly reachable and try again.`,
        );
      }
      throw error;
    }
  };
  let data: PsiResponse;
  try {
    data = await attempt();
  } catch {
    if (signal.aborted) throw new DOMException("Aborted", "AbortError");
    data = await attempt();
  }
  return parsePageSpeed(data, url, strategy);
}

/** Scripted progress copy + bar while a run is in flight (PageSpeed reports no real progress). */
function useLoadingTimeline(runId: number, active: boolean) {
  const [progress, setProgress] = useState({ text: LOADING_STEPS[0]?.text ?? "", pct: 0 });
  useEffect(() => {
    if (!active) return;
    const timers = LOADING_STEPS.map((step) => window.setTimeout(() => setProgress(step), step.delay));
    let trail = 0;
    const last = LOADING_STEPS[LOADING_STEPS.length - 1];
    if (last) {
      timers.push(
        window.setTimeout(() => {
          trail = window.setInterval(
            () => setProgress((p) => ({ ...p, pct: Math.min(p.pct + 1, LOADING_TRAIL.maxPct) })),
            LOADING_TRAIL.stepMs,
          );
        }, last.delay + LOADING_TRAIL.stepMs),
      );
    }
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearInterval(trail);
    };
  }, [runId, active]);
  return progress;
}

export function SpeedGrader() {
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [run, dispatch] = useReducer(runReducer, IDLE_RUN);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const grading = run.pending.desktop || run.pending.mobile;
  const progress = useLoadingTimeline(run.id, grading);
  useEffect(() => () => abortRef.current?.abort(), []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let target: string;
    try {
      target = normalizeUrl(url);
    } catch (error) {
      setUrlError((error as Error).message);
      inputRef.current?.focus();
      return;
    }
    setUrlError(null);
    setUrl(target);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const id = run.id + 1;
    dispatch({ type: "start", id });
    for (const strategy of STRATEGIES) {
      fetchReport(target, strategy, controller.signal)
        .then((report) => dispatch({ type: "settle", id, strategy, report }))
        .catch((error: Error) => {
          if (!controller.signal.aborted) dispatch({ type: "settle", id, strategy, error: error.message });
        });
    }
  }

  const report = run.reports[run.active];
  const activePending = run.pending[run.active];
  const failedOther = run.errors[other(run.active)];

  let message = urlError;
  if (!message && run.id) {
    if (report) {
      if (failedOther) message = `${failedOther} Showing ${strategyLabel(run.active)} results only.`;
    } else if (!activePending) {
      const { desktop, mobile } = run.errors;
      message = grading
        ? (run.errors[run.active] ?? null)
        : desktop && mobile && desktop !== mobile
          ? `${desktop} ${mobile}`
          : desktop || mobile || "Unable to grade this URL right now.";
    }
  }

  const performance = report?.scores.performance ?? null;
  const lowScore = performance !== null && performance < 90;
  const topIssues = report?.suggestions.map((s) => s.title) ?? [];
  const fixUrl = report?.finalUrl ?? url.trim();

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(330px,0.55fr)]">
      <ToolCard>
        <div className="mb-7 flex items-start justify-between gap-4 border-b border-line pb-5">
          <ToolCardTitle kicker="Speed Benchmark">Grade a Page</ToolCardTitle>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary-text">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />
            Core Web Vitals
          </span>
        </div>

        <form noValidate onSubmit={onSubmit} aria-busy={grading}>
          <label htmlFor="speed-url" className="mb-2 block text-sm font-semibold text-ink">
            Website URL
            <span aria-hidden="true" className="ml-0.5 text-danger">
              *
            </span>
          </label>
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
            <Input
              ref={inputRef}
              id="speed-url"
              name="url"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://yourstore.com"
              required
              aria-describedby="speed-url-help speed-error"
              aria-invalid={urlError ? true : undefined}
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setUrlError(null);
              }}
            />
            <Button type="submit" loading={grading} loadingText="Grading Speed...">
              Grade Speed <ArrowRightIcon size={16} className={arrowNudge} />
            </Button>
          </div>
          <p id="speed-url-help" className="mt-2 text-sm leading-normal">
            Enter a public HTTP or HTTPS page URL to analyze performance.
          </p>
        </form>

        <div id="speed-error" role="alert" aria-live="assertive">
          {message && (
            <p className="mt-5 rounded-lg border border-danger/30 bg-danger-soft px-4.5 py-3.5 text-sm leading-normal font-semibold text-danger">
              {message}
            </p>
          )}
        </div>

        {run.id > 0 && activePending ? (
          <LoadingPanel
            compact={run.userPicked}
            title={run.userPicked ? "Waiting for this report" : "Running full performance audit"}
            text={run.userPicked ? `Fetching the ${strategyLabel(run.active)} report...` : progress.text}
            pct={progress.pct}
          />
        ) : report ? (
          <SpeedResults
            run={run}
            report={report}
            onPick={(strategy) => dispatch({ type: "pick", strategy })}
          />
        ) : (
          <div className="mt-7 grid justify-items-center gap-2.5 rounded-xl border-[1.5px] border-dashed border-primary/30 bg-surface px-5 py-10 text-center">
            <span
              aria-hidden="true"
              className="inline-flex size-12 items-center justify-center rounded-lg bg-primary/12 text-primary"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2 3 14h7l-1 8 11-14h-7l0-6z" />
              </svg>
            </span>
            <h3 className="text-[1.05rem] text-ink">Ready when your URL is.</h3>
            <p className="max-w-115 text-sm leading-relaxed">
              Score benchmark ranges: 0-49 poor, 50-89 needs improvement, and 90-100 good.
            </p>
          </div>
        )}
      </ToolCard>

      <ToolCard tone="plain" aria-label="Fix my speed score" className="lg:sticky lg:top-25">
        <ToolCardTitle kicker="Need help fixing it?">Fix My Speed Score</ToolCardTitle>
        <p className="mt-2 mb-5.5 text-sm leading-relaxed">
          {!report
            ? "Run a grade first. If the score is below 90, this form will include your result and top issues."
            : lowScore
              ? "Your performance score is below optimal range. Share this report and we will help prioritize the fastest fixes."
              : "Your performance score is in good shape. You can still request a review if you want help protecting the score during future changes."}
        </p>
        <LeadForm
          key={run.id}
          source="site-speed-grader"
          idPrefix="fix"
          className="grid gap-5"
          fields={[
            {
              name: "name",
              label: "Name",
              required: true,
              placeholder: "e.g. John Doe",
              autoComplete: "name",
            },
            {
              name: "email",
              label: "Email",
              type: "email",
              required: true,
              placeholder: "name@company.com",
              autoComplete: "email",
              inputMode: "email",
            },
            {
              name: "website",
              label: "Website URL",
              type: "url",
              required: true,
              placeholder: "https://yourstore.com",
              autoComplete: "url",
              inputMode: "url",
            },
            { name: "concern", label: "Main Concern", type: "select", required: true, options: CONCERNS },
            {
              name: "message",
              label: "Message",
              type: "textarea",
              required: true,
              placeholder: "Describe your performance goals...",
            },
          ]}
          prefill={{
            website: fixUrl,
            ...(topIssues.length ? { concern: inferConcern(topIssues) } : {}),
          }}
          summary={{
            name: "reportSummary",
            value: report
              ? [
                  `URL: ${fixUrl || "N/A"}`,
                  `Strategy: ${strategyLabel(report.strategy)}`,
                  `Performance score: ${performance ?? "Not available"}`,
                  `Top issues: ${topIssues.length ? topIssues.join("; ") : "No major performance bottlenecks found"}`,
                ].join("\n")
              : fixUrl
                ? [
                    `URL: ${fixUrl}`,
                    "Strategy: Desktop & Mobile",
                    "Performance score: Pending Grade",
                    "Top issues: Run a grade to analyze bottlenecks.",
                  ].join("\n")
                : "",
          }}
          submitLabel="Request Speed Fix"
          success={{
            title: "Request Received!",
            message: "Our performance engineer will review your report and prioritize the fastest fixes.",
            note: (email) => `We'll reply to ${email}.`,
          }}
        />
      </ToolCard>
    </div>
  );
}

function LoadingPanel({
  compact,
  title,
  text,
  pct,
}: {
  compact: boolean;
  title: string;
  text: string;
  pct: number;
}) {
  return (
    <div
      aria-live="polite"
      className="mt-6 flex items-start gap-4 rounded-xl border border-primary/30 bg-primary/6 p-5 text-ink"
    >
      <span
        aria-hidden="true"
        className="size-7 shrink-0 animate-spin rounded-full border-3 border-primary/20 border-t-primary"
      />
      <div className="min-w-0 flex-1">
        <strong className="text-sm font-semibold">{title}</strong>
        <span className="mt-0.5 block text-sm text-body">{text}</span>
        {!compact && (
          <>
            <div className="mt-3 h-1.25 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-1200 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-2.5 text-xs leading-normal font-medium">
              Grading desktop &amp; mobile can take 20-45 seconds. Keep this tab open closing it will cancel
              the scan.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

const panel =
  "rounded-xl border border-line bg-surface transition-colors duration-300 hover:border-primary/35";
const scoreBadge =
  "inline-block max-w-full rounded-md bg-primary/12 px-2.5 py-1 text-[0.76rem] font-semibold tracking-[0.03em] text-primary-text uppercase";
/** Results section heading: kicker + title, hint on the right. */
function SectionHead({ kicker, title, hint }: { kicker: string; title: string; hint: string }) {
  return (
    <div className="mt-8 mb-4 flex items-end justify-between gap-4 border-b border-dashed border-line pb-2">
      <div>
        <Kicker>{kicker}</Kicker>
        <h3 className="text-lg text-ink">{title}</h3>
      </div>
      <span className="text-right text-xs font-semibold text-body sm:whitespace-nowrap">{hint}</span>
    </div>
  );
}
const IMPACT = ["High Impact", "Medium Impact", "Opportunity"];

function SpeedResults({
  run,
  report,
  onPick,
}: {
  run: Run;
  report: SpeedReport;
  onPick: (s: Strategy) => void;
}) {
  const performance = report.scores.performance;
  const pct = performance === null ? 0 : Math.min(Math.max(performance, 0), 100);

  return (
    <section aria-label="Speed report" className="mt-8 border-t border-line pt-7">
      <div className="mb-7 flex flex-col gap-5 rounded-[0.85rem] border border-primary/20 bg-linear-135 from-primary/8 to-ink/3 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3.5">
          <span
            aria-hidden="true"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow-[0_4px_12px_rgb(255_153_51/0.3)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </span>
          <div>
            <h3 className="text-lg text-ink">Speed Report</h3>
            <p className="mt-0.5 text-[0.82rem] font-medium">Technical audit and Core Web Vitals analysis</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="min-w-30 rounded-md border border-line bg-white px-3.5 py-1.5">
            <span className="block text-[0.72rem] font-semibold tracking-[0.03em] text-body uppercase">
              Analyzed URL
            </span>
            <strong className="mt-0.5 block max-w-55 truncate text-sm font-semibold text-ink">
              {report.finalUrl}
            </strong>
          </div>
          <div className="rounded-md border border-line bg-white px-3.5 py-1.5">
            <span className="block text-[0.72rem] font-semibold tracking-[0.03em] text-body uppercase">
              Strategy
            </span>
            <div
              role="tablist"
              aria-label="Switch device report"
              className="mt-1 inline-flex gap-1 rounded-md bg-surface p-0.5"
            >
              {STRATEGIES.map((strategy) => {
                const active = strategy === run.active;
                const failed =
                  !run.pending[strategy] && !run.reports[strategy] && Boolean(run.errors[strategy]);
                return (
                  <button
                    key={strategy}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    disabled={failed}
                    title={failed ? run.errors[strategy] : undefined}
                    onClick={() => !active && onPick(strategy)}
                    className={cx(
                      "min-h-7 rounded-sm px-3 py-1 text-xs font-semibold transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-45",
                      active
                        ? "bg-primary text-white shadow-[0_2px_8px_rgb(255_153_51/0.3)]"
                        : "text-body hover:text-ink",
                    )}
                  >
                    {strategyLabel(strategy)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 grid gap-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)]">
        <div className="flex flex-col items-center justify-center rounded-[0.85rem] border-[1.5px] border-primary/30 bg-white px-6 py-7 text-center shadow-md">
          <div className="relative mb-3.5 size-29">
            <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
              <circle cx="50" cy="50" r="42" fill="none" strokeWidth="7" className="stroke-surface" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * pct) / 100}
                className="stroke-primary transition-[stroke-dashoffset] duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <strong className="text-[2.1rem] leading-none font-bold text-ink tabular-nums">
                {performance ?? "-"}
              </strong>
              <span className="mt-0.5 text-[0.72rem] font-semibold text-body">/ 100</span>
            </div>
          </div>
          <span className="text-sm font-semibold text-ink">Performance Score</span>
          <span className={cx(scoreBadge, "mt-1.5")}>{scoreLabel(performance)}</span>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-3">
          {CATEGORIES.slice(1).map((category) => {
            const score = report.scores[category.id];
            return (
              <div key={category.id} className={cx(panel, "flex flex-col justify-between p-4.5")}>
                <div className="mb-2 flex flex-col items-center gap-1.5 text-center">
                  <span className="text-sm font-semibold text-ink">{category.title}</span>
                  <span className={scoreBadge}>{scoreLabel(score)}</span>
                </div>
                <div className="mt-1 mb-3 flex items-baseline gap-1">
                  <strong className="text-[1.7rem] leading-none font-bold text-ink tabular-nums">
                    {score ?? "-"}
                  </strong>
                  <span className="text-xs font-medium text-body">/ 100</span>
                </div>
                <div className="h-1.25 w-full overflow-hidden rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-800 ease-in-out"
                    style={{ width: `${score === null ? 0 : Math.min(Math.max(score, 0), 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SectionHead
        kicker="Lab Benchmarks"
        title="Core Web Vitals & Performance Metrics"
        hint="Measured via lab test"
      />
      <div className="grid gap-3.5 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
        {report.metrics.map((metric) => (
          <div key={metric.id} className={cx(panel, "flex flex-col justify-between p-4")}>
            <div className="mb-1.5 flex items-center justify-between gap-1.5">
              <span className="text-sm font-semibold text-ink">{metric.label}</span>
              <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 text-[0.72rem] font-semibold text-primary-text">
                {scoreLabel(metric.score)}
              </span>
            </div>
            <strong className="my-1 block text-xl font-bold text-ink tabular-nums">{metric.value}</strong>
            <span className="block text-[0.74rem] font-medium text-body">{metric.guide}</span>
          </div>
        ))}
      </div>

      <SectionHead
        kicker="Action Plan"
        title="Priority Optimization Opportunities"
        hint="Ranked by potential impact"
      />
      <div className="mt-4 grid gap-4">
        {report.suggestions.length ? (
          report.suggestions.map((item, i) => (
            <article
              key={item.id}
              className="flex flex-col gap-2.5 rounded-xl border border-line bg-white p-5 shadow-sm transition-[border-color,box-shadow] duration-150 hover:border-primary/35 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center rounded-md bg-primary/12 px-2.5 py-1 text-[0.76rem] font-semibold tracking-[0.04em] text-primary-text uppercase">
                  {IMPACT[i]}
                </span>
                {item.displayValue && (
                  <span className="rounded-md bg-primary/12 px-2.5 py-1 text-[0.8rem] font-semibold text-primary-text">
                    ⚡ {item.displayValue}
                  </span>
                )}
              </div>
              <h4 className="text-base leading-snug text-ink">{item.title}</h4>
              <p className="text-sm leading-relaxed">{item.description}</p>
              <div className="mt-0.5">
                <span className="rounded-sm border border-line bg-surface px-2 py-0.5 text-xs font-semibold text-body">
                  Technical Fix Required
                </span>
              </div>
            </article>
          ))
        ) : (
          <div className="flex flex-col gap-2.5 rounded-xl border border-line bg-white p-5 shadow-sm">
            <span className="w-fit rounded-md bg-primary/12 px-2.5 py-1 text-[0.76rem] font-semibold text-primary-text">
              Status: Optimal
            </span>
            <h4 className="text-base text-ink">No Critical Bottlenecks Detected</h4>
            <p className="text-sm leading-relaxed">
              Your site passed major performance checks. Continue monitoring regularly after core code
              deployments.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
