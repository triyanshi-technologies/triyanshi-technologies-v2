import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  BoxIcon,
  CartIcon,
  CompassIcon,
  ImpactIcon,
  LayersIcon,
  LightbulbIcon,
  SearchIcon,
  ShieldIcon,
  TargetIcon,
  TrendUpIcon,
  UserIcon,
} from "@/components/company/company-icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaSplit } from "@/components/sections/cta";
import { CheckBubble } from "@/components/sections/feature-sections";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Badge, Eyebrow, Highlight, Section } from "@/components/ui/layout";
import { cn } from "@/lib/cn";
import { buildMetadata } from "@/lib/seo";
import { arrowNudge, cardHover } from "@/lib/hover";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Triyanshi Technologies helps businesses build better digital experiences, scale eCommerce platforms, and solve complex operational challenges.",
  path: "/company/about-us",
});

const APPROACH = [
  {
    icon: <SearchIcon />,
    title: "Understand",
    text: "Your business, customers, processes, systems, challenges, and goals.",
  },
  {
    icon: <TargetIcon />,
    title: "Define",
    text: "The real problem, the priorities, and the right solution.",
  },
  { icon: <BoxIcon />, title: "Build", text: "Thoughtful technology designed around your business." },
  { icon: <TrendUpIcon />, title: "Improve", text: "Use data, feedback, and performance to make it better." },
  { icon: <LayersIcon />, title: "Scale", text: "Create a foundation that can evolve with your business." },
];

type Capability = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  text: string;
  points: string[];
  tags: string[];
  link: { label: string; href: string };
};

const CAPABILITIES: Capability[] = [
  {
    icon: <CartIcon />,
    title: "Commerce That Converts",
    subtitle: "eCommerce Development & Growth",
    text: "We build, redesign and optimize commerce experiences that are fast, user-friendly and built to convert.",
    points: [
      "Store Development & Redesign",
      "Platform Migration",
      "CRO, UX & Performance",
      "SEO & Growth Optimization",
      "Ongoing Maintenance & Support",
    ],
    tags: ["Shopify", "BigCommerce", "Volusion", "Webflow"],
    link: { label: "Explore eCommerce Solutions", href: "/services/ecommerce" },
  },
  {
    icon: <LayersIcon />,
    title: "Systems That Scale",
    subtitle: "Enterprise Solutions & AI",
    text: "We build custom software and intelligent systems that automate operations, streamline processes and unlock growth.",
    points: [
      "Custom Software Development",
      "AI-Powered Automation",
      "ERP, CRM & Business Portals",
      "Integrations & APIs",
      "Analytics & Dashboards",
    ],
    tags: ["Software", "Automation", "AI", "Integrations"],
    link: { label: "Explore Enterprise Solutions", href: "/services/enterprise-solutions" },
  },
  // Compliance card — hidden on the legacy site; uncomment to show (and switch the grid to 3 columns).
  // {
  //   icon: <ShieldIcon />,
  //   title: "Compliance That Builds Trust",
  //   subtitle: "Compliance Advisory",
  //   text: "We help organizations become audit-ready and security-conscious with the right processes and controls.",
  //   points: ["SOC 2 Readiness", "ISO 27001 Readiness", "GDPR Advisory", "Risk & Compliance Management", "Policy & Documentation"],
  //   tags: ["SOC 2", "ISO 27001", "GDPR", "Security"],
  //   link: { label: "Explore Compliance Advisory", href: "/services/compliance" },
  // },
];

const VALUES = [
  {
    icon: <TargetIcon />,
    title: "Business First",
    text: "We think like business owners and focus on outcomes that matter.",
  },
  {
    icon: <CompassIcon />,
    title: "Strategy",
    text: "We bridge strategy with execution from start to finish.",
  },
  { icon: <LightbulbIcon />, title: "Clarity", text: "Complex technology should be explained simply." },
  {
    icon: <UserIcon />,
    title: "Ownership",
    text: "We take responsibility for outcomes, not just deliverables.",
  },
  {
    icon: <SearchIcon />,
    title: "Curiosity",
    text: "We keep learning, questioning, and finding better ways forward.",
  },
  { icon: <ShieldIcon />, title: "Integrity", text: "We communicate honestly and do what we commit to." },
  { icon: <ImpactIcon />, title: "Impact", text: "The goal isn't to build more. It's to create more value." },
];

const STATS = [
  { value: "250+", label: "Solutions Delivered" },
  { value: "15+", label: "Countries Served" },
  { value: "30+", label: "Long-Term Partnerships" },
  { value: "99%", label: "On Time Execution" },
];

const iconTile = "flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary";

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <Reveal className="mx-auto mb-10 text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mb-4 text-heading-lg leading-tight text-ink">{title}</h2>
      {description && <p className="text-lg leading-[1.7]">{description}</p>}
    </Reveal>
  );
}

export default function AboutUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink pt-[calc(var(--spacing-nav)+4rem)] pb-16 tone-dark md:pt-page-top md:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-radial-[circle_at_80%_20%] from-primary/15 to-transparent to-50%"
        />
        <Container className="relative">
          <Breadcrumb
            align="start"
            items={[
              { label: "Home", href: "/" },
              { label: "Company", href: "/company/about-us" },
              { label: "About Us" },
            ]}
          />
          <div className="relative z-2 grid items-center gap-10 xl:grid-cols-[1.1fr_0.9fr] xl:gap-12">
            <div>
              <h1 className="mt-4 mb-6 text-heading-xl text-white">
                Technology Built <br /> Around <Highlight>Your Business</Highlight>
              </h1>
              <p className="mb-10 max-w-[50ch] text-lg leading-[1.7]">
                We are a technology partner focused on eCommerce, enterprise solution &amp; AI.
                <br /> We combine strategy, design, and engineering to build digital solutions that help
                businesses grow faster, operate smarter, and build with confidence.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/contact-us/contact-us">
                  LET&apos;S TALK <ArrowRightIcon size={16} className={arrowNudge} />
                </ButtonLink>
                <ButtonLink href="/portfolio" variant="outline">
                  Explore Our Work
                </ButtonLink>
              </div>
            </div>
            <Image
              src="/assets/about-us.webp"
              alt="Triyanshi Technologies innovation"
              width={1536}
              height={1024}
              preload
              sizes="(min-width: 1280px) 45vw, 100vw"
              className="block h-auto w-full rounded-xl"
            />
          </div>
        </Container>
      </section>

      {/* Our approach */}
      <Section className="py-8" aria-label="Our Approach">
        <SectionHeader
          eyebrow="Our Approach"
          title={
            <>
              We Don&apos;t Start With Technology. <br />
              <Highlight>We Start With the Problem.</Highlight>
            </>
          }
          description="Technology should make a business faster, smarter, and easier to operate, not create another layer of complexity."
        />
        <RevealGroup as="ol" className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {APPROACH.map((step, i) => (
            <RevealItem
              as="li"
              key={step.title}
              className={cn(
                "flex flex-col gap-1.5 rounded-xl border border-line bg-surface px-5 py-6",
                cardHover,
              )}
            >
              <span aria-hidden="true" className={cn(iconTile, "mb-2")}>
                {step.icon}
              </span>
              <span className="text-xs font-bold text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-0.5 text-base text-ink">{step.title}</h3>
              <p className="text-xs leading-normal">{step.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* What we do */}
      <Section className="py-8" aria-label="What We Do">
        <SectionHeader
          eyebrow="What We Do"
          title={
            <>
              Two Capabilities. <Highlight>One Technology Partner.</Highlight>
            </>
          }
          description="We offer end-to-end technology solutions across two core areas that drive real business impact and sustainable growth."
        />
        <RevealGroup className="grid items-stretch gap-7 sm:grid-cols-2">
          {CAPABILITIES.map((item) => (
            <RevealItem
              key={item.title}
              className={cn(
                "flex h-full flex-col rounded-xl border border-line bg-white px-8 py-9",
                cardHover,
              )}
            >
              <span aria-hidden="true" className={cn(iconTile, "mb-6 size-12")}>
                {item.icon}
              </span>
              <h3 className="mb-1.5 text-xl leading-snug text-ink">{item.title}</h3>
              <p className="mb-4 text-sm font-semibold text-primary">{item.subtitle}</p>
              <p className="mb-6 leading-relaxed">{item.text}</p>
              <ul className="mb-7 flex flex-col gap-3">
                {item.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-ink">
                    <CheckBubble />
                    {point}
                  </li>
                ))}
              </ul>
              <ul className="mb-5 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <li key={tag}>
                    <Badge className="mb-0 px-2.5">{tag}</Badge>
                  </li>
                ))}
              </ul>
              <Link
                href={item.link.href}
                className="group/link mt-auto inline-flex items-center gap-2 self-start rounded-lg border border-line px-5 py-2.5 text-sm font-bold text-ink transition-colors duration-300 hover:border-primary hover:bg-primary/6 hover:text-primary-text focus-visible:border-primary focus-visible:text-primary-text"
              >
                {item.link.label}
                <ArrowRightIcon size={18} className={arrowNudge} />
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Why Triyanshi */}
      <Section className="py-8" aria-label="Why Triyanshi">
        <SectionHeader eyebrow="More than a technology vendor" title="Why Triyanshi" />
        <RevealGroup
          as="ul"
          className="grid grid-cols-2 gap-y-8 md:grid-cols-3 lg:-mx-4 lg:grid-cols-7 lg:gap-y-0"
        >
          {VALUES.map((value, i) => (
            <RevealItem
              as="li"
              key={value.title}
              className={cn(
                "flex flex-col items-center gap-1 px-2 text-center lg:px-4",
                i < VALUES.length - 1 && "lg:border-r lg:border-line",
              )}
            >
              <span aria-hidden="true" className={cn(iconTile, "mb-2")}>
                {value.icon}
              </span>
              <h3 className="mt-2 text-base text-ink">{value.title}</h3>
              <p className="text-xs leading-normal">{value.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Experience */}
      <Section className="pt-8 pb-16" aria-label="Built Through Real-World Experience">
        <Reveal as="h2" className="mb-10 text-center text-heading-lg text-ink">
          Built Through <Highlight>Real-World Experience</Highlight>
        </Reveal>
        <RevealGroup className="grid items-center gap-10 xl:grid-cols-[1.5fr_1fr]">
          <RevealItem as="dl" className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col-reverse justify-end text-center lg:px-4 lg:text-left",
                  i < STATS.length - 1 && "lg:border-r lg:border-line",
                )}
              >
                <dt className="mt-2 text-xs font-medium tracking-wider text-body uppercase">{stat.label}</dt>
                <dd className="text-3xl leading-tight font-extrabold text-primary">{stat.value}</dd>
              </div>
            ))}
          </RevealItem>
          <RevealItem as="p" className="leading-7">
            We&apos;ve worked across different businesses, technologies, platforms, and operational
            challenges, giving us a broader perspective than a team focused on a single technology or service.
          </RevealItem>
        </RevealGroup>
      </Section>

      <CtaSplit
        eyebrow={null}
        title={
          <>
            Have a Business Problem
            <br />
            You&apos;re Trying to Solve?
          </>
        }
        description="Maybe you're trying to improve an existing digital experience. Maybe your technology has become difficult to manage. Maybe you're preparing for your next stage of growth. Or maybe you simply know there's a better way to do things."
      />
    </>
  );
}
