import { JsonLd } from "@/components/seo/json-ld";
import { PlatformSelector } from "@/components/tools/platform/platform-selector";
import { ToolPage } from "@/components/tools/tool-page";
import { Highlight } from "@/components/ui/layout";
import { getTool, toolSchema } from "@/content/tools";
import { buildMetadata } from "@/lib/seo";

const tool = getTool("platform-selector");

export const metadata = buildMetadata({ ...tool.seo, path: `/tools/${tool.slug}` });

export default function PlatformSelectorPage() {
  return (
    <ToolPage
      tool={tool}
      width="max-w-none"
      title={
        <>
          Commerce Platform <Highlight>Selector</Highlight>
        </>
      }
      description="Answer a few practical commerce questions and get a ranked platform fit across Shopify, Shopify Plus, BigCommerce, Webflow Ecommerce, Volusion modernization, and custom commerce."
    >
      <JsonLd data={toolSchema(tool)} />
      <PlatformSelector />
    </ToolPage>
  );
}
