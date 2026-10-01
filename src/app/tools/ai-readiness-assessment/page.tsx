import { JsonLd } from "@/components/seo/json-ld";
import { AiAssessment } from "@/components/tools/ai/ai-assessment";
import { ToolPage } from "@/components/tools/tool-page";
import { Highlight } from "@/components/ui/layout";
import { getTool, toolSchema } from "@/content/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getTool("ai-readiness-assessment");

export const metadata = buildMetadata({ ...tool.seo, path: `/tools/${tool.slug}` });

export default function AiReadinessAssessmentPage() {
  return (
    <ToolPage
      tool={tool}
      width="max-w-none"
      title={
        <>
          AI Readiness <Highlight>Assessment</Highlight>
        </>
      }
      description="Check how ready your commerce business is for practical AI across use cases, data, workflows, tools, team skills, governance, and implementation capacity."
    >
      <JsonLd data={toolSchema(tool)} />
      <AiAssessment />
    </ToolPage>
  );
}
