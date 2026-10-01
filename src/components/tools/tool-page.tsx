import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import type { Tool } from "@/content/tools";
import { cn } from "@/lib/cn";

type ToolPageProps = {
  tool: Tool;
  title: ReactNode;
  description: string;
  /** Max width of the tool column ("max-w-none" for full container width). */
  width?: string;
  children: ReactNode;
};

/** Tool page shell: dark header with breadcrumb, then the tool on a light surface. */
export function ToolPage({ tool, title, description, width = "max-w-260", children }: ToolPageProps) {
  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Tools", href: "/tools" },
          { label: tool.crumb ?? tool.name },
        ]}
        title={title}
        description={description}
        className="pb-16"
        descriptionClassName="mt-5 max-w-165"
      />
      <section aria-label={tool.name} className="bg-surface pt-18 pb-24 max-sm:pt-12 max-sm:pb-18">
        <Container>
          <Reveal className={cn("mx-auto", width)}>{children}</Reveal>
        </Container>
      </section>
    </>
  );
}
