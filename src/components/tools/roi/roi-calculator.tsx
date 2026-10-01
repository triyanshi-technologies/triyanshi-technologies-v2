"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { LeadForm } from "@/components/tools/lead-form";
import { StepNumber, ToolCard, ToolCardTitle } from "@/components/tools/tool-ui";
import { Select } from "@/components/ui/form-fields";
import { TweenedNumber } from "@/components/ui/tweened-number";
import { cx } from "@/lib/cx";
import {
  BENCHMARK_AOV_LIFT,
  CURRENCIES,
  INDUSTRIES,
  INITIAL_VALUES,
  clamp,
  computeRoi,
  moneyFormatter,
  roiSummary,
  targetCeilings,
  withTargetCeilings,
  type Currency,
  type RoiValues,
} from "./roi-model";

const valueBox =
  "inline-flex min-h-10.5 max-w-48 items-center overflow-hidden rounded-lg border border-line bg-surface text-ink transition-[border-color,background-color,box-shadow] duration-300 focus-within:border-primary/80 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/15 max-sm:w-full max-sm:max-w-none";

const numberInput =
  "w-[clamp(5.2rem,13vw,7.5rem)] [appearance:textfield] bg-transparent px-3 py-2 text-right text-sm font-semibold tabular-nums outline-none max-sm:w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

const affix = "shrink-0 text-sm leading-none font-semibold text-primary-text";

/* Native range input: orange fill up to the thumb (--fill), white-ringed orange thumb. */
const range = [
  "mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none",
  "bg-[linear-gradient(to_right,var(--color-primary)_var(--fill),var(--color-line)_var(--fill))]",
  "[&::-webkit-slider-thumb]:size-4.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgb(0_0_0/0.2)] [&::-webkit-slider-thumb]:transition-transform hover:[&::-webkit-slider-thumb]:scale-115 focus-visible:[&::-webkit-slider-thumb]:ring-4 focus-visible:[&::-webkit-slider-thumb]:ring-primary/30",
  "[&::-moz-range-thumb]:size-4.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:shadow-[0_2px_6px_rgb(0_0_0/0.2)] [&::-moz-range-track]:bg-transparent",
].join(" ");

type RangeFieldProps = {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  decimals?: number;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

/** Label + typed value + slider, kept in sync. Typing is applied live; out-of-range values snap back on blur. */
function RangeField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step,
  decimals = 0,
  prefix,
  suffix,
}: RangeFieldProps) {
  const [draft, setDraft] = useState<string | null>(null);
  const shown = clamp(value, min, max);
  const fill = ((shown - min) / (max - min)) * 100;

  return (
    <div className="min-w-0">
      <div className="mb-2.5 flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-stretch max-sm:gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-ink">
          {label}
        </label>
        <div className={valueBox}>
          {prefix && <span className={cx(affix, "pl-3")}>{prefix}</span>}
          <input
            type="number"
            aria-label={`${label} value`}
            className={numberInput}
            min={min}
            max={max}
            step={step}
            value={draft ?? (decimals ? value.toFixed(decimals) : String(Math.round(value)))}
            onChange={(e) => {
              setDraft(e.target.value);
              const n = parseFloat(e.target.value);
              if (Number.isFinite(n)) onChange(n);
            }}
            onBlur={() => {
              setDraft(null);
              onChange(clamp(value, min, max));
            }}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
          />
          {suffix && <span className={cx(affix, "pr-3")}>{suffix}</span>}
        </div>
      </div>
      <input
        id={id}
        type="range"
        className={range}
        style={{ "--fill": `${fill}%` } as CSSProperties}
        min={min}
        max={max}
        step={step}
        value={shown}
        onChange={(e) => {
          setDraft(null);
          onChange(parseFloat(e.target.value));
        }}
      />
    </div>
  );
}

function GroupHeader({ step, children }: { step: string; children: ReactNode }) {
  return (
    <h3 className="col-span-full mt-2 flex items-center gap-2.5 border-t border-dashed border-line pt-3 pb-1 text-sm font-semibold tracking-[0.02em] text-ink">
      <StepNumber>{step}</StepNumber> {children}
    </h3>
  );
}

export function RoiCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [values, setValues] = useState<RoiValues>(INITIAL_VALUES);
  const [industry, setIndustry] = useState<string>(INDUSTRIES[0].label);

  const config = CURRENCIES[currency];
  const money = moneyFormatter(currency);
  const ceilings = targetCeilings(values, currency);
  const { expected, investment, timeframe } = computeRoi(values);
  const achievable = Number.isFinite(expected.paybackMonths);
  const progress = achievable ? clamp((expected.paybackMonths / timeframe) * 100, 0, 100) : 100;

  const update = (patch: Partial<RoiValues>) =>
    setValues((prev) => withTargetCeilings({ ...prev, ...patch }, currency));
  const field = (key: keyof RoiValues) => ({
    value: values[key],
    onChange: (n: number) => update({ [key]: n }),
  });

  function changeCurrency(next: Currency) {
    if (next === currency) return;
    setCurrency(next);
    setValues((prev) => withTargetCeilings({ ...prev, ...CURRENCIES[next].defaults }, next));
  }

  function applyIndustry(label: string) {
    const preset = INDUSTRIES.find((i) => i.label === label);
    if (!preset) return;
    setIndustry(label);
    const aov = preset.aov[currency];
    setValues((prev) =>
      withTargetCeilings(
        {
          ...prev,
          currentAov: aov,
          currentCvr: preset.currentCvr,
          targetAov: aov * BENCHMARK_AOV_LIFT,
          targetCvr: preset.targetCvr,
        },
        currency,
      ),
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <ToolCard aria-label="Benchmark based ROI calculator">
        <div className="mb-7 flex items-start justify-between gap-4 border-b border-line pb-5 max-sm:flex-col max-sm:items-stretch">
          <ToolCardTitle kicker="Benchmark Model">Your Store Numbers</ToolCardTitle>
          <div role="group" aria-label="Currency" className="inline-flex shrink-0 gap-1.5">
            {(Object.keys(CURRENCIES) as Currency[]).map((code) => {
              const active = code === currency;
              return (
                <button
                  key={code}
                  type="button"
                  aria-pressed={active}
                  onClick={() => changeCurrency(code)}
                  className={cx(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-300",
                    active
                      ? "border-primary/25 bg-primary/10 text-primary-text"
                      : "border-line bg-surface text-body hover:border-ink hover:text-ink focus-visible:border-ink focus-visible:text-ink",
                  )}
                >
                  {active && <span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />}
                  {CURRENCIES[code].label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-7">
          <div className="mb-2.5 flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-start max-sm:gap-1">
            <label htmlFor="roi-industry" className="text-sm font-semibold text-ink">
              Industry preset
            </label>
            <span className="text-xs">Sets baseline AOV &amp; targets</span>
          </div>
          <Select id="roi-industry" value={industry} onChange={(e) => applyIndustry(e.target.value)}>
            {INDUSTRIES.map((preset) => (
              <option key={preset.label}>{preset.label}</option>
            ))}
          </Select>
        </div>

        {/*
          Quick benchmark chips — hidden on the legacy site. To restore, render a row of
          toggle buttons under the industry preset: "Conservative (+15%)", "Expected (+25%)",
          "Strong (+40%)" set target CVR to current × 1.15 / 1.25 / 1.4, and "+10% AOV" sets
          target AOV to current × 1.1. An active chip stays "stuck": moving the matching
          baseline re-applies its uplift, and touching the target directly releases it.
        */}

        <div className="grid gap-6 md:grid-cols-2">
          <GroupHeader step="01">Baseline Metrics</GroupHeader>
          <RangeField
            id="roi-visitors"
            label="Monthly visitors"
            min={1000}
            max={500_000}
            step={500}
            {...field("visitors")}
          />
          <RangeField
            id="roi-current-cvr"
            label="Current conversion rate"
            min={0.1}
            max={15}
            step={0.01}
            decimals={2}
            suffix="%"
            {...field("currentCvr")}
          />
          <RangeField
            id="roi-current-aov"
            label="Current AOV"
            {...config.aov}
            prefix={config.symbol}
            {...field("currentAov")}
          />
          <RangeField
            id="roi-margin"
            label="Gross margin"
            min={10}
            max={90}
            step={1}
            suffix="%"
            {...field("marginPercent")}
          />

          <GroupHeader step="02">Optimization Targets &amp; Investment</GroupHeader>
          <RangeField
            id="roi-target-cvr"
            label="Target conversion rate"
            min={0.1}
            max={ceilings.targetCvr}
            step={0.01}
            decimals={2}
            suffix="%"
            {...field("targetCvr")}
          />
          <RangeField
            id="roi-target-aov"
            label="Target AOV"
            min={config.aov.min}
            max={ceilings.targetAov}
            step={config.aov.step}
            prefix={config.symbol}
            {...field("targetAov")}
          />
          <RangeField
            id="roi-investment"
            label="Project investment"
            {...config.investment}
            prefix={config.symbol}
            {...field("investment")}
          />
          <TimeframeField value={values.timeframe} onChange={(timeframe) => update({ timeframe })} />
        </div>

        <h3 className="mt-9 border-t border-line pt-6 text-lg text-ink">Projected Performance Breakdown</h3>
        <div className="mt-5 rounded-[0.85rem] border-[1.5px] border-primary/35 bg-linear-[165deg] from-primary/10 to-primary/2 px-7 pt-8 pb-7 text-center shadow-[0_8px_24px_rgb(255_153_51/0.08)]">
          <span className="block text-sm font-semibold tracking-[0.06em] text-body uppercase">
            Estimated payback
          </span>
          <div className="mt-1.5 flex items-baseline justify-center gap-2">
            <TweenedNumber
              value={achievable ? expected.paybackMonths : timeframe}
              format={(n) => (achievable ? `~${Math.round(n)}` : "-")}
              duration={280}
              className="text-[clamp(3rem,8vw,4.5rem)] leading-none font-bold tracking-tight text-primary tabular-nums"
            />
            {achievable && <span className="text-lg font-semibold text-body">months</span>}
          </div>
          <p className="mt-2 font-medium">
            {achievable ? (
              <>
                to recover your <strong className="font-bold text-ink">{money(investment)}</strong> investment
              </>
            ) : (
              `doesn't break even within ${timeframe} months at these inputs`
            )}
          </p>
          <div aria-hidden="true" className="relative mt-9 h-1.5 rounded-full bg-line">
            <div
              className={cx(
                "h-full rounded-full transition-[width] duration-500",
                achievable ? "bg-primary" : "bg-danger",
              )}
              style={{ width: `${progress}%` }}
            />
            <div
              className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-[left] duration-500"
              style={{ left: `${progress}%` }}
            >
              <span
                className={cx(
                  "size-3.5 rounded-full border-3 bg-white",
                  achievable
                    ? "border-primary ring-4 ring-primary/15"
                    : "border-danger ring-4 ring-danger/15",
                )}
              />
              <span className="absolute -top-6 text-[0.72rem] font-semibold whitespace-nowrap text-body">
                Breakeven
              </span>
            </div>
          </div>
          <div aria-hidden="true" className="mt-2.5 flex justify-between text-xs font-medium text-body">
            <span>Today</span>
            <span>Month {timeframe}</span>
          </div>
        </div>
      </ToolCard>

      <ToolCard aria-label="Request a custom analysis" className="grid gap-5">
        <div>
          <ToolCardTitle kicker="Tailored Growth Audit">Want a Custom Analysis?</ToolCardTitle>
          <p className="mt-2 text-sm leading-relaxed">
            Get a personalized ROI &amp; conversion roadmap calculated directly from your store&apos;s live
            analytics.
          </p>
        </div>
        <LeadForm
          source="roi-calculator"
          idPrefix="roi-lead"
          fields={[
            {
              name: "name",
              label: "Your Name",
              required: true,
              placeholder: "e.g. John Doe",
              autoComplete: "name",
            },
            {
              name: "email",
              label: "Work Email",
              type: "email",
              required: true,
              placeholder: "name@company.com",
              autoComplete: "email",
              inputMode: "email",
            },
            {
              name: "store",
              label: "Store URL",
              type: "url",
              placeholder: "https://yourstore.com",
              autoComplete: "url",
            },
            {
              name: "message",
              label: "Message",
              type: "textarea",
              placeholder: "Anything else about your goals or numbers?",
            },
          ]}
          summary={{ name: "summary", value: roiSummary(values, currency) }}
          submitLabel="Get My Custom ROI Report"
          success={{
            title: "Request Received!",
            message:
              "Our ecommerce growth specialists will analyze your details and send your custom report shortly.",
            note: (email) => `We'll send it to ${email}.`,
          }}
        />
      </ToolCard>
    </div>
  );
}

/** Whole months, 1–36; typed values snap into range on blur. */
function TimeframeField({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [draft, setDraft] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="roi-timeframe" className="text-sm font-semibold text-ink">
        Timeframe
      </label>
      <div className={cx(valueBox, "max-w-44")}>
        <input
          id="roi-timeframe"
          type="number"
          className={numberInput}
          min={1}
          max={36}
          step={1}
          value={draft ?? String(value)}
          onChange={(e) => {
            setDraft(e.target.value);
            const n = parseFloat(e.target.value);
            if (Number.isFinite(n)) onChange(n);
          }}
          onBlur={() => {
            setDraft(null);
            onChange(Math.round(clamp(value, 1, 36)));
          }}
          onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
        />
        <span className={cx(affix, "pr-3")}>months</span>
      </div>
    </div>
  );
}
