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
import { QUESTIONS, answerLabel, recommend, reviewSummary } from "./platform-model";

export function PlatformSelector() {
  return (
    <QuestionWizard
      kicker="Deterministic selector"
      title="Find the best fit"
      intro="Answer one question at a time. Results stay in your browser until you choose to share them."
      questions={QUESTIONS}
      renderResults={(answers, startOver) => <PlatformResults answers={answers} onStartOver={startOver} />}
    />
  );
}

function PlatformResults({ answers, onStartOver }: { answers: Answers; onStartOver: () => void }) {
  const recommendation = recommend(answers);
  const { top, topThree } = recommendation;

  return (
    <ResultsLayout>
      <ToolCard>
        <ResultHeadline
          kicker="Top recommendation"
          title={top.name}
          summary={top.summary}
          value={`${top.score}%`}
          caption={top.confidence}
        />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ResultList title="Why this fits" items={top.why} />
          <ResultList title="Watch-outs" items={top.watchOuts} />
        </div>
        <ResultList title="Recommended implementation path" items={top.path} ordered className="mt-4" />

        <ResultTableHead title="Top 3 comparison" />
        <ResultTable headers={["Platform", "Match", "Strength", "Watch-out"]} minWidth="min-w-160">
          {topThree.map((item) => (
            <tr key={item.id}>
              <td>
                <strong className="text-ink">{item.name}</strong>
              </td>
              <td>
                <ScorePill>{item.score}%</ScorePill>
              </td>
              <td>{item.why[0] || item.summary}</td>
              <td>{item.watchOuts[0] || "Validate implementation scope before build."}</td>
            </tr>
          ))}
        </ResultTable>
        <StartOver onClick={onStartOver} />
      </ToolCard>

      <ToolCard tone="plain" aria-label="Get platform recommendation review">
        <ToolCardTitle kicker="Need a second look?">Get Platform Recommendation Review</ToolCardTitle>
        <p className="mt-2 mb-5.5 leading-relaxed">
          Your recommendation is {top.name} with a {top.score}% match. Send it for a practical implementation
          review.
        </p>
        <LeadForm
          source="platform-selector"
          idPrefix="review"
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
            { name: "store", label: "Company / Store URL", required: true, autoComplete: "organization" },
            { name: "currentPlatform", label: "Current platform", autoComplete: "off" },
            { name: "message", label: "Message", type: "textarea", required: true },
          ]}
          prefill={{ currentPlatform: answerLabel("currentPlatform", answers) }}
          summary={{ name: "summary", value: reviewSummary(answers, recommendation) }}
          submitLabel="Request Review"
          success={{
            title: "Request Received!",
            message: "Our team will review your platform match and outline an implementation path.",
            note: (email) => `We'll reply to ${email}.`,
          }}
        />
      </ToolCard>
    </ResultsLayout>
  );
}
