"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ToolCard, ToolCardTitle } from "@/components/tools/tool-ui";
import { Button } from "@/components/ui/button";
import { cx } from "@/lib/cx";

/*
 * One-question-at-a-time wizard shared by the AI Readiness Assessment and the
 * Platform Selector: progress bar, option buttons, Back / Skip, then a results
 * view rendered by the tool. Answers never leave the browser here.
 */

export type WizardQuestion = {
  name: string;
  question: string;
  options: { value: string; label: string }[];
  /** Shows a hint and a "Skip this question" button (answer recorded as ""). */
  optional?: boolean;
};

export type Answers = Record<string, string>;

type FocusTarget = "question" | "results" | "wizard";

type QuestionWizardProps = {
  kicker: string;
  title: string;
  intro: string;
  questions: WizardQuestion[];
  /** Results view; `startOver` resets the wizard. */
  renderResults: (answers: Answers, startOver: () => void) => ReactNode;
};

export function QuestionWizard({ kicker, title, intro, questions, renderResults }: QuestionWizardProps) {
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  // Move focus only after a visitor action (never on page load).
  const [focusRequest, setFocusRequest] = useState<{ target: FocusTarget; tick: number } | null>(null);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const wizardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!focusRequest) return;
    ({ question: questionRef, results: resultsRef, wizard: wizardRef })[focusRequest.target].current?.focus();
  }, [focusRequest]);
  const moveFocus = (target: FocusTarget) => setFocusRequest((r) => ({ target, tick: (r?.tick ?? 0) + 1 }));

  function answer(name: string, value: string) {
    setAnswers((prev) => ({ ...prev, [name]: value }));
    if (step >= questions.length - 1) {
      setDone(true);
      moveFocus("results");
    } else {
      setStep(step + 1);
      moveFocus("question");
    }
  }

  function startOver() {
    setAnswers({});
    setStep(0);
    setDone(false);
    moveFocus("wizard");
  }

  if (done) {
    return (
      <div ref={resultsRef} tabIndex={-1} aria-live="polite" className="animate-step-in outline-none">
        {renderResults(answers, startOver)}
      </div>
    );
  }

  const question = questions[step];
  if (!question) return null;
  const total = questions.length;
  const progress = ((step + (answers[question.name] !== undefined ? 1 : 0)) / total) * 100;

  return (
    <div ref={wizardRef} tabIndex={-1} className="mx-auto max-w-180 outline-none">
      <ToolCard>
        <div className="mb-6">
          <ToolCardTitle kicker={kicker}>{title}</ToolCardTitle>
          <p className="mt-2 leading-relaxed">{intro}</p>
        </div>

        <div
          role="progressbar"
          aria-label="Question progress"
          aria-valuemin={1}
          aria-valuemax={total}
          aria-valuenow={step + 1}
          className="mb-8 grid gap-2"
        >
          <div className="h-1.5 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[0.82rem] font-medium text-body">
            Question {step + 1} of {total}
          </span>
        </div>

        <div key={step} className="animate-step-in">
          <h3
            ref={questionRef}
            tabIndex={-1}
            className="mb-6 text-[clamp(1.15rem,2vw,1.4rem)] leading-snug text-ink outline-none"
          >
            {question.question}
          </h3>
          {question.optional && (
            <p className="-mt-4.5 mb-5 text-sm">Optional - skip if you&apos;re not sure.</p>
          )}
          <div role="group" aria-label={question.question} className="grid gap-2.5">
            {question.options.map((option) => {
              const selected = answers[question.name] === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => answer(question.name, option.value)}
                  className={cx(
                    "w-full rounded-lg border px-4.5 py-3.5 text-left font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    selected
                      ? "border-primary bg-primary/10 text-primary-text"
                      : "border-line bg-surface text-ink hover:border-primary/50 hover:bg-primary/6",
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          {(step > 0 || question.optional) && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              {step > 0 ? (
                <Button
                  onClick={() => {
                    setStep(step - 1);
                    moveFocus("question");
                  }}
                >
                  Back
                </Button>
              ) : (
                <span />
              )}
              {question.optional && (
                <button
                  type="button"
                  onClick={() => answer(question.name, "")}
                  className="py-2 text-sm font-medium text-body transition-colors duration-300 hover:text-primary-text focus-visible:text-primary-text"
                >
                  Skip this question
                </button>
              )}
            </div>
          )}
        </div>
      </ToolCard>
    </div>
  );
}

/* ── Results building blocks ─────────────────────────────────────────── */

/** Results card + review card side by side (stacked below 900px). */
export function ResultsLayout({ children }: { children: ReactNode }) {
  return (
    <section
      aria-label="Your results"
      className="grid items-start gap-6 min-[900px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]"
    >
      {children}
    </section>
  );
}

/** Headline result: title + summary with a score badge. */
export function ResultHeadline({
  kicker,
  title,
  summary,
  value,
  caption,
}: {
  kicker: string;
  title: string;
  summary: string;
  value: string;
  caption: string;
}) {
  return (
    <div className="grid items-center gap-4 rounded-lg border border-primary/28 bg-primary/6 p-5 md:grid-cols-[minmax(0,1fr)_auto]">
      <div className="min-w-0 wrap-anywhere">
        <ToolCardTitle kicker={kicker}>{title}</ToolCardTitle>
        <p className="mt-1.5 leading-relaxed">{summary}</p>
      </div>
      <div className="grid min-w-27 justify-items-start rounded-lg border border-line bg-white p-3.5 md:justify-items-center">
        <strong className="text-[1.75rem] leading-none font-bold text-primary-text">{value}</strong>
        <span className="mt-1 text-xs font-semibold text-body md:text-center">{caption}</span>
      </div>
    </div>
  );
}

/** Grey sub-panel with a heading and a bulleted (`ul`) or numbered (`ol`) list. */
export function ResultList({
  title,
  items,
  ordered = false,
  className,
}: {
  title: string;
  items: string[];
  ordered?: boolean;
  className?: string;
}) {
  const List = ordered ? "ol" : "ul";
  return (
    <div className={cx("min-w-0 rounded-lg border border-line bg-surface p-4", className)}>
      <h4 className="mb-3 text-[0.95rem] text-ink">{title}</h4>
      <List
        className={cx(
          "grid gap-2 pl-4.5 text-sm leading-normal text-body",
          ordered ? "list-decimal" : "list-disc",
        )}
      >
        {items.map((item) => (
          <li key={item} className="pl-1">
            {item}
          </li>
        ))}
      </List>
    </div>
  );
}

/** Heading + caption above a results table. */
export function ResultTableHead({ title }: { title: string }) {
  return (
    <>
      <h3 className="mt-6 text-base text-ink">{title}</h3>
      <p className="mt-1 mb-3 text-sm">Scores are advisory and deterministic based on your answers.</p>
    </>
  );
}

/** Horizontally scrollable table shell; `minWidth` keeps columns readable on phones. */
export function ResultTable({
  headers,
  minWidth,
  children,
}: {
  headers: string[];
  minWidth: string;
  children: ReactNode;
}) {
  return (
    <div className="[scrollbar-width:none] overflow-x-auto rounded-lg border border-line">
      <table className={cx("w-full border-collapse bg-white text-left text-sm leading-snug", minWidth)}>
        <thead>
          <tr className="bg-surface text-ink">
            {headers.map((header) => (
              <th key={header} scope="col" className="border-b border-line p-3.5 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-body [&_td]:p-3.5 [&_td]:align-top [&_tr]:border-b [&_tr]:border-line [&_tr:last-child]:border-b-0">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export function ScorePill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex min-h-7 items-center rounded-lg bg-primary/10 px-2.5 font-semibold whitespace-nowrap text-primary-text">
      {children}
    </span>
  );
}

export function StartOver({ onClick }: { onClick: () => void }) {
  return (
    <div className="mt-6 border-t border-line pt-6">
      <Button onClick={onClick}>Start over</Button>
    </div>
  );
}
