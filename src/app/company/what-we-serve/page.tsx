import {
  BoltIcon,
  CartIcon,
  EducationIcon,
  FinanceIcon,
  HealthcareIcon,
  ManufacturingIcon,
  RealEstateIcon,
  RetailIcon,
  ShieldIcon,
} from "@/components/company/company-icons";
import { IndustryGrid, NumberedSteps } from "@/components/company/company-sections";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaCentered } from "@/components/sections/cta";
import { Badge, Highlight, Section, SectionTitle } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { buildMetadata } from "@/lib/seo";
import { cardHover } from "@/lib/hover";
import { cn } from "@/lib/cn";

// Hidden from the navigation (legacy), but the page stays live.
export const metadata = buildMetadata({
  title: "What We Serve",
  description:
    "Explore Triyanshi Technologies' full service portfolio - eCommerce development, custom SaaS, AI automation, compliance advisory, and UI/UX design.",
  path: "/company/what-we-serve",
});

const OFFERINGS = [
  {
    icon: <CartIcon />,
    title: "eCommerce Solutions",
    text: "We build high-converting, scalable online stores tailored to your brand - from theme customisation to fully headless storefronts that deliver blazing performance.",
    tags: ["Shopify", "BigCommerce", "Volusion", "Webflow", "Headless"],
  },
  {
    icon: <BoltIcon />,
    title: "Enterprise Solutions",
    text: "We design and develop custom software - SaaS products, MVPs, AI-powered tools, ERP/CRM systems, and web applications - engineered to scale with your business.",
    tags: ["SaaS & MVP", "Web Development", "AI & Automation", "ERP / CRM", "UI/UX Design"],
  },
  {
    icon: <ShieldIcon />,
    title: "Compliance Advisory",
    text: "We help businesses navigate complex regulatory landscapes - delivering audit readiness, policy documentation, and risk management frameworks that keep you protected.",
    tags: ["Regulatory Consulting", "Audit & Risk", "Policy Documentation"],
  },
];

export default function WhatWeServePage() {
  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/company/about-us" },
          { label: "What We Serve" },
        ]}
        title={
          <>
            What We <Highlight>Serve</Highlight>
          </>
        }
        description="From scalable eCommerce storefronts to enterprise SaaS platforms - we deliver end-to-end digital solutions built for growth."
      />

      <Section aria-label="Our service areas">
        <Reveal>
          <SectionTitle
            eyebrow="Services"
            title={
              <>
                Our <Highlight>Core Offerings</Highlight>
              </>
            }
            className="mb-0"
          />
        </Reveal>
        <RevealGroup className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {OFFERINGS.map((offering) => (
            <RevealItem
              key={offering.title}
              className={cn("rounded-xl border border-line bg-white px-8 py-10", cardHover)}
            >
              <span
                aria-hidden="true"
                className="mb-5 flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary"
              >
                {offering.icon}
              </span>
              <h3 className="mb-3 text-xl text-ink">{offering.title}</h3>
              <p className="mb-5 leading-relaxed">{offering.text}</p>
              <ul className="flex flex-wrap gap-2">
                {offering.tags.map((tag) => (
                  <li key={tag}>
                    <Badge className="mb-0 px-2.5">{tag}</Badge>
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <Section tone="light" aria-label="Our process">
        <Reveal>
          <SectionTitle
            eyebrow="How We Work"
            title={
              <>
                Our <Highlight>Delivery Process</Highlight>
              </>
            }
            className="mb-0"
          />
        </Reveal>
        <NumberedSteps
          steps={[
            {
              title: "Discovery & Scoping",
              text: "We deep-dive into your goals, constraints, and market - aligning technical strategy with business outcomes before a single line of code is written.",
            },
            {
              title: "Design & Build",
              text: "Our engineers and designers work in tight collaboration, shipping iterative builds with full transparency, frequent demos, and zero surprises.",
            },
            {
              title: "Launch & Scale",
              text: "We ensure a smooth go-live, monitor performance post-launch, and stay on as long-term partners ready to scale what we've built together.",
            },
          ]}
        />
      </Section>

      <Section tone="light" aria-label="Industries we serve">
        <Reveal>
          <SectionTitle
            eyebrow="Industries"
            title={
              <>
                We <Highlight>Work With</Highlight>
              </>
            }
            className="mb-0"
          />
        </Reveal>
        <IndustryGrid
          items={[
            { icon: <RetailIcon />, label: "Retail & eCommerce" },
            { icon: <HealthcareIcon />, label: "Healthcare & Life Sciences" },
            { icon: <FinanceIcon />, label: "Finance & Fintech" },
            { icon: <EducationIcon />, label: "Education & EdTech" },
            { icon: <ManufacturingIcon />, label: "Manufacturing & Logistics" },
            { icon: <RealEstateIcon />, label: "Real Estate & PropTech" },
          ]}
        />
      </Section>

      <CtaCentered
        title={
          <>
            Have a project in <Highlight>Mind?</Highlight>
          </>
        }
        description="Tell us what you're building and we'll tell you how we can help."
      />
    </>
  );
}
