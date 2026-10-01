import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { AiOrbit } from "@/components/sections/ai-orbit";
import { CtaSplit } from "@/components/sections/cta";
import { SplitHero } from "@/components/sections/dark-hero";
import { CapabilityGrid, LogoGrid, SectionIntro, StatsBand } from "@/components/sections/feature-sections";
import {
  AiMlIcon,
  AnalyzeIcon,
  ApiIcon,
  AutomateIcon,
  BoltIcon,
  BrainIcon,
  BuildIcon,
  ClockIcon,
  CloudIcon,
  CpuIcon,
  DatabaseIcon,
  GlobeIcon,
  IntegrationsIcon,
  MernIcon,
  NodeIcon,
  PackageIcon,
  ReactIcon,
  SlidersIcon,
  UsersIcon,
} from "@/components/services/landing-icons";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, Highlight, Section } from "@/components/ui/layout";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Enterprise Solutions",
  description:
    "We design and build enterprise software, SaaS products, AI automation, and ERP/CRM systems that streamline operations, connect data, and scale with your business.",
  path: "/services/enterprise-solutions",
});

export default function EnterpriseSolutionsPage() {
  return (
    <>
      <SplitHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Enterprise Solutions" }]}
        badge="Enterprise Solutions & AI"
        title={
          <>
            Systems That
            <br />
            <Highlight>Scale</Highlight>
          </>
        }
        description="We design and build enterprise software, intelligent automation, and connected business systems that help teams work smarter, reduce manual effort, and scale with confidence."
        actions={
          <>
            <ButtonLink href="/contact-us/contact-us">Start a Project</ButtonLink>
            <ButtonLink href="#solutions" variant="outline">
              Explore Our Work
            </ButtonLink>
          </>
        }
        image={{
          src: "/assets/enterprise-solutions.webp",
          alt: "Enterprise Solutions, Intelligent Automation, and Connected Systems",
          width: 1376,
          height: 768,
        }}
      />

      <Section className="py-8" aria-label="A Business System Built Around How You Work">
        <SectionIntro
          eyebrow="More Than Software"
          title={
            <>
              A Business System <Highlight>Built Around How You Work</Highlight>
            </>
          }
          description="Every business has processes that become harder to manage as it grows, spreadsheets, repetitive tasks, disconnected systems, manual approvals, scattered data and inefficient workflows."
        />
        <CapabilityGrid
          items={[
            {
              icon: <BuildIcon />,
              title: "Build",
              subtitle: "Software Built Around Your Workflows.",
              text: "We design and build custom software and business portals tailored to how your operations actually run.",
              points: [
                "Custom Software Development",
                "ERP & CRM Solutions",
                "Business Portals",
                "Internal Tools & Applications",
                "Scalable System Architecture",
                "API-First Development",
              ],
            },
            {
              icon: <AutomateIcon />,
              title: "Automate",
              subtitle: "Less Manual Work. More Momentum.",
              text: "We automate repetitive processes and connect your systems so information flows without manual work.",
              points: [
                "AI-Powered Automation",
                "Workflow Automation",
                "API Development & Integrations",
                "Third-Party System Connections",
                "Data Synchronization",
                "Process Automation",
              ],
            },
            {
              icon: <AnalyzeIcon />,
              title: "Analyze & Scale",
              subtitle: "Insights That Drive Better Decisions.",
              text: "We turn business data into dashboards and analytics that help you make faster, smarter decisions as you grow.",
              points: [
                "Analytics & Dashboards",
                "Business Intelligence",
                "Reporting & Data Visualization",
                "Performance Monitoring",
                "Data-Driven Insights",
                "Cloud & Scalable Infrastructure",
              ],
            },
          ]}
        />
      </Section>

      <Section id="solutions" className="py-8" aria-label="Intelligent Automation">
        <Eyebrow>Put AI to Work</Eyebrow>
        <RevealGroup className="grid items-start gap-10 xl:grid-cols-2 xl:gap-14">
          <RevealItem>
            <h2 className="mb-6 text-heading-lg text-ink">
              Turn AI Into a <Highlight>Business Advantage.</Highlight>
            </h2>
            <p className="mb-5 leading-7">
              We help businesses identify where AI can create measurable impact, by reducing manual work,
              accelerating decisions, improving customer experiences, and making teams more productive.
            </p>
            <p className="mb-5 leading-7">
              From intelligent automation to AI-powered assistants and decision-support systems, we integrate
              AI into the workflows your business already depends on.
            </p>
          </RevealItem>
          <RevealItem>
            <AiOrbit
              nodes={[
                { label: "AI Automation", icon: <BoltIcon /> },
                { label: "AI-Powered Insights", icon: <SlidersIcon /> },
                { label: "AI-Assisted Operations", icon: <CpuIcon /> },
                { label: "AI-Driven Intelligence", icon: <BrainIcon /> },
              ]}
            />
          </RevealItem>
        </RevealGroup>
      </Section>

      <Section className="py-8 text-center" aria-label="Built Around Your Technology Ecosystem">
        <Reveal>
          <SectionIntro
            eyebrow="Built Around Your Technology Ecosystem"
            title={
              <>
                Connect the Systems <Highlight>You Already Use</Highlight>
              </>
            }
          />
        </Reveal>
        <LogoGrid
          columns={8}
          items={[
            { kind: "icon", icon: <ReactIcon />, label: "React" },
            { kind: "icon", icon: <NodeIcon />, label: "Node.js" },
            { kind: "icon", icon: <MernIcon />, label: "MERN", sublabel: "Stack" },
            { kind: "icon", icon: <ApiIcon />, label: "APIs" },
            { kind: "icon", icon: <AiMlIcon />, label: "AI / ML" },
            { kind: "icon", icon: <CloudIcon />, label: "Cloud" },
            { kind: "icon", icon: <DatabaseIcon />, label: "Databases" },
            { kind: "icon", icon: <IntegrationsIcon />, label: "Integrations" },
          ]}
        />
        <Reveal as="p" className="mx-auto mt-9 max-w-170 leading-7">
          Your business doesn&apos;t need another isolated application.
          <br />
          We build systems that integrate with the tools, platforms and data your business already relies on.
        </Reveal>
      </Section>

      <StatsBand
        title={
          <>
            Built Through <Highlight>Real-World Experience</Highlight>
          </>
        }
        items={[
          { icon: <PackageIcon />, value: "250+", label: "Solutions Delivered" },
          { icon: <GlobeIcon />, value: "15+", label: "Countries Served" },
          { icon: <UsersIcon />, value: "30+", label: "Long-Term Client Partnerships" },
          { icon: <ClockIcon />, value: "99%", label: "On-Time Execution" },
        ]}
      />

      <CtaSplit
        title={
          <>
            Is Technology Holding
            <br />
            <Highlight>Your Business Back?</Highlight>
          </>
        }
        description="Tell us where your processes, systems or data are creating friction. We'll help you identify what can be improved, automated or built."
      />
    </>
  );
}
