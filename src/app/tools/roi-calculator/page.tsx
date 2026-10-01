import { JsonLd } from "@/components/seo/json-ld";
import { RoiCalculator } from "@/components/tools/roi/roi-calculator";
import { ToolPage } from "@/components/tools/tool-page";
import { Highlight } from "@/components/ui/layout";
import { getTool, toolSchema } from "@/content/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getTool("roi-calculator");

export const metadata = buildMetadata({ ...tool.seo, path: `/tools/${tool.slug}` });

export default function RoiCalculatorPage() {
  return (
    <ToolPage
      tool={tool}
      title={
        <>
          eCommerce ROI <Highlight>Calculator</Highlight>
        </>
      }
      description="Estimate monthly revenue lift, net ROI, and payback period in INR or USD using your store numbers and current ecommerce benchmarks."
    >
      <JsonLd data={toolSchema(tool)} />
      <RoiCalculator />
    </ToolPage>
  );
}
