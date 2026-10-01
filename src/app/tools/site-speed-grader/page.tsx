import { JsonLd } from "@/components/seo/json-ld";
import { SpeedGrader } from "@/components/tools/speed/speed-grader";
import { ToolPage } from "@/components/tools/tool-page";
import { Highlight } from "@/components/ui/layout";
import { getTool, toolSchema } from "@/content/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getTool("site-speed-grader");

export const metadata = buildMetadata({ ...tool.seo, path: `/tools/${tool.slug}` });

export default function SiteSpeedGraderPage() {
  return (
    <ToolPage
      tool={tool}
      width="max-w-none"
      title={
        <>
          Site Speed <Highlight>Grader</Highlight>
        </>
      }
      description="Run a comprehensive speed audit, see the metrics that are slowing your page down, and get a short fix list you can act on."
    >
      <JsonLd data={toolSchema(tool)} />
      <SpeedGrader />
    </ToolPage>
  );
}
