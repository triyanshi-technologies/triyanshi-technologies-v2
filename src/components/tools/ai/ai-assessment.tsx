"use client";

import { LeadForm } from "@/components/tools/lead-form";
import { ToolCard, ToolCardTitle } from "@/components/tools/tool-ui";
import {
  QuestionWizard,
  ResultHeadline,
  ResultList,
  ResultsLayout,
  ResultTable,
  ResultTableHead,
  ScorePill,
  StartOver,
  type Answers,
} from "@/components/tools/wizard";
import { INTERESTS, QUESTIONS, assess, inferInterest, reviewSummary } from "./ai-model";

export function AiAssessment() {
  return (
    <QuestionWizard
      kicker="Free assessment"
      title="Score your AI readiness"
      intro="Answer one question at a time. Results stay in your browser until you choose to share them."
      questions={QUESTIONS}
      renderResults={(answers, startOver) => <AiResults answers={answers} onStartOver={startOver} />}
    />
  );
}

function AiResults({ answers, onStartOver }: { answers: Answers; onStartOver: () => void }) {
  const result = assess(answers);

  return (
    <ResultsLayout>
      <ToolCard>
        <ResultHeadline
          kicker="Readiness score"
          title={result.maturity.band}
          summary={result.maturity.summary}
          value={`${result.score}/100`}
          caption={result.maturity.label}
        />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ResultList title="Top gaps" items={result.gaps} />
          <ResultList title="Next actions" items={result.nextActions} ordered />
        </div>
        <div className="mt-4 rounded-lg border border-line bg-surface p-4">
          <h4 className="mb-3 text-[0.95rem] text-ink">Suggested starting path</h4>
          <p className="leading-relaxed">{result.startingPath}</p>
        </div>

        <ResultTableHead title="Readiness by dimension" />
        <ResultTable headers={["Dimension", "Score"]} minWidth="min-w-105">
          {result.dimensions.map((dimension) => (
            <tr key={dimension.id}>
              <td>{dimension.label}</td>
              <td>
                <ScorePill>{dimension.score}%</ScorePill>
              </td>
            </tr>
          ))}
        </ResultTable>
        <StartOver onClick={onStartOver} />
      </ToolCard>

      <ToolCard tone="plain" aria-label="Get AI readiness review">
        <ToolCardTitle kicker="Need the full roadmap?">Get AI Readiness Review</ToolCardTitle>
        <p className="mt-2 mb-5.5 leading-relaxed">
          Your AI readiness score is {result.score}/100 ({result.maturity.band}). Send it for a practical
          roadmap review.
        </p>
        <LeadForm
          source="ai-readiness-assessment"
          idPrefix="ai-review"
          className="grid gap-4"
          fields={[
            { name: "name", label: "Name", required: true, autoComplete: "name" },
            {
              name: "email",
              label: "Email",
              type: "email",
              required: true,
              autoComplete: "email",
              inputMode: "email",
            },
            { name: "company", label: "Company / Website", required: true, autoComplete: "organization" },
            {
              name: "tools",
              label: "Current tools",
              autoComplete: "off",
              placeholder: "Shopify, GA4, Klaviyo, ERP...",
            },
            {
              name: "interest",
              label: "Main AI interest",
              type: "select",
              required: true,
              options: INTERESTS,
            },
            { name: "message", label: "Message", type: "textarea", required: true },
          ]}
          prefill={{ interest: inferInterest(answers, result) }}
          summary={{ name: "summary", value: reviewSummary(answers, result) }}
          submitLabel="Request AI Review"
          success={{
            title: "Request Received!",
            message:
              "Our team will review your AI readiness assessment and follow up with practical next steps.",
            note: (email) => `We'll reply to ${email}.`,
          }}
        />
      </ToolCard>
    </ResultsLayout>
  );
}
