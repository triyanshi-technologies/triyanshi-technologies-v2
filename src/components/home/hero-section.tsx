import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { cn } from "@/lib/cn";
import { HeroSlider } from "./hero-slider";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

type Logo = { src: string; alt: string; width: number; height: number; className: string };
type Capability = { title: string; text: string; icon: ReactNode };
type Slide = {
  id: string;
  badge: string;
  title: ReactNode;
  logos: Logo[];
  /** Platform wordmarks (large) vs. square expertise icons (small). */
  logoStyle: "platform" | "expertise";
  subtitle: string;
  cardTitle: string;
  capabilities: Capability[];
  metrics: [{ value: string; label: string }, { value: string; label: string }];
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

const stroke = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const SLIDES: Slide[] = [
  {
    id: "ecommerce",
    badge: "eCommerce Development",
    title: (
      <>
        Commerce
        <br />
        <span className="inline-block text-primary">That Converts</span>
      </>
    ),
    logoStyle: "platform",
    logos: [
      {
        src: "/assets/shopify-logo.webp",
        alt: "Shopify",
        width: 172,
        height: 115,
        className: "max-w-43 max-md:max-w-35",
      },
      {
        src: "/assets/bigcommerce-logo.webp",
        alt: "BigCommerce",
        width: 208,
        height: 139,
        className: "max-w-52 max-md:max-w-41",
      },
      {
        src: "/assets/webflow-logo.webp",
        alt: "Webflow",
        width: 160,
        height: 160,
        className: "max-w-40 max-md:max-w-32",
      },
      {
        src: "/assets/volusion-logo.webp",
        alt: "Volusion",
        width: 144,
        height: 96,
        className: "max-w-36 max-md:max-w-29",
      },
    ],
    subtitle:
      "We partner with growth focused brands to build high performing commerce experiences that increase conversions, strengthen customer loyalty, and drive sustainable growth.",
    cardTitle: "Commerce Capabilities",
    capabilities: [
      {
        title: "Enterprise Commerce",
        text: "Scalable commerce solutions for B2B, D2C, wholesale, and multi brand businesses designed for long term growth.",
        icon: (
          <svg {...stroke}>
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
            <line x1="2" y1="20" x2="22" y2="20" />
          </svg>
        ),
      },
      {
        title: "Performance Optimization",
        text: "Conversion focused experiences engineered for speed, usability, accessibility, and measurable business outcomes.",
        icon: (
          <svg {...stroke}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
      },
      {
        title: "Future Ready Architecture",
        text: "Modern commerce solutions powered by headless architecture, API first integrations, and composable technologies.",
        icon: (
          <svg {...stroke}>
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
        ),
      },
    ],
    metrics: [
      { value: "2X", label: "Average Conversion Growth" },
      { value: "B2B + D2C", label: "Commerce Specialists" },
    ],
    primaryCta: { label: "Start Your Project", href: "/contact-us/contact-us" },
    secondaryCta: { label: "View Our Work", href: "#portfolio" },
  },
  {
    id: "enterprise",
    badge: "Enterprise Solutions & AI",
    title: (
      <>
        Systems <br />
        <span className="text-primary">That Scale</span>
      </>
    ),
    logoStyle: "expertise",
    logos: [
      { src: "/assets/erp.webp", alt: "ERP", width: 52, height: 47, className: "" },
      { src: "/assets/crm.webp", alt: "CRM", width: 52, height: 52, className: "" },
      { src: "/assets/AI-Automation.webp", alt: "AI Automation", width: 52, height: 52, className: "" },
      {
        src: "/assets/Business-Intelligence.webp",
        alt: "Business Intelligence",
        width: 52,
        height: 52,
        className: "",
      },
    ],
    subtitle:
      "We help growing businesses streamline operations through enterprise software, AI automation, ERP, CRM, and intelligent business systems that improve efficiency and accelerate better decisions.",
    cardTitle: "Intelligent Business Systems",
    capabilities: [
      {
        title: "Enterprise Applications",
        text: "Custom ERP, CRM, business portals, and operational platforms built around your unique processes.",
        icon: (
          <svg {...stroke}>
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </svg>
        ),
      },
      {
        title: "AI & Process Automation",
        text: "Intelligent workflows, system integrations, and AI powered automation that eliminate repetitive tasks and improve productivity.",
        icon: (
          <svg {...stroke}>
            <rect x="7" y="7" width="10" height="10" rx="2" />
            <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.64 5.64l1.41 1.41M16.95 16.95l1.41 1.41M5.64 18.36l1.41-1.41M16.95 7.05l1.41-1.41" />
          </svg>
        ),
      },
      {
        title: "Business Intelligence",
        text: "Real time dashboards, reporting, analytics, and actionable insights that empower better business decisions.",
        icon: (
          <svg {...stroke}>
            <path d="M3 3v18h18" />
            <path d="M7 15l4-4 3 3 5-6" />
          </svg>
        ),
      },
    ],
    metrics: [
      { value: "3X", label: "Operational Efficiency" },
      { value: "ERP + CRM", label: "Enterprise Solutions" },
    ],
    primaryCta: { label: "Book a Strategy Call", href: "/contact-us/contact-us" },
    secondaryCta: { label: "Explore Solutions", href: "#portfolio" },
  },
  // Compliance slide — hidden on the legacy site; uncomment to show.
  // {
  //   id: "compliance",
  //   badge: "Compliance Advisory",
  //   title: <>Compliance <span className="text-primary">That Builds Trust</span></>,
  //   logoStyle: "expertise",
  //   logos: [
  //     { src: "/assets/soc2.webp", alt: "SOC 2", width: 1254, height: 1254, className: "" },
  //     { src: "/assets/iso-27001.webp", alt: "ISO 27001", width: 1254, height: 1254, className: "" },
  //     { src: "/assets/gdpr.webp", alt: "GDPR", width: 1254, height: 1254, className: "" },
  //     { src: "/assets/compliance.webp", alt: "Compliance Automation", width: 64, height: 64, className: "" },
  //   ],
  //   subtitle:
  //     "We help organizations achieve compliance through structured processes, security governance, audit readiness, and automation. From SOC 2 and ISO 27001 to GDPR and industry specific frameworks, we simplify compliance so you can focus on growing your business.",
  //   cardTitle: "Compliance Framework",
  //   capabilities: [
  //     {
  //       title: "Audit Readiness",
  //       text: "Gap assessments, implementation guidance, evidence collection, and audit preparation for industry recognized frameworks.",
  //       icon: <svg {...stroke}><path d="M12 3l7 4v5c0 5-3.5 7.74-7 9-3.5-1.26-7-4-7-9V7l7-4z" /><path d="M9.5 12.5l1.8 1.8 3.7-4.3" /></svg>,
  //     },
  //     {
  //       title: "Policies & Governance",
  //       text: "Security policies, documentation, risk management, and internal controls tailored to your organization.",
  //       icon: <svg {...stroke}><path d="M8 3h7l4 4v14H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" /><path d="M15 3v5h5" /><path d="M10 13h6" /><path d="M10 17h6" /></svg>,
  //     },
  //     {
  //       title: "Compliance Automation",
  //       text: "Centralized tracking, automated reminders, evidence management, and continuous compliance monitoring.",
  //       icon: <svg {...stroke}><path d="M12 3l7 4v5c0 5-3.5 7.74-7 9-3.5-1.26-7-4-7-9V7l7-4z" /><path d="M12 8v4" /><path d="M12 16h.01" /><path d="M16 12a4 4 0 0 1-4 4" /></svg>,
  //     },
  //   ],
  //   metrics: [
  //     { value: "Audit Ready", label: "From Day One" },
  //     { value: "SOC 2 + ISO", label: "Compliance Specialists" },
  //   ],
  //   primaryCta: { label: "Talk to an Expert", href: "/contact-us/contact-us" },
  //   secondaryCta: { label: "See How It Works", href: "/services/compliance" },
  // },
];

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function HeroSection() {
  return (
    <section
      aria-label="Featured services"
      className="relative isolate flex min-h-screen items-center overflow-hidden pt-20 pb-28 max-md:min-h-0 max-md:overflow-visible max-md:pt-28 max-md:pb-16"
    >
      {/* Background + blurred glow shapes */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden bg-linear-135 from-ink/95 to-black/90"
      >
        <div className="absolute -top-[10%] -right-[5%] -z-10 size-[40vw] animate-float-slow rounded-full bg-primary opacity-25 blur-[80px]" />
        <div className="absolute -bottom-[10%] -left-[10%] -z-10 size-[30vw] animate-float-reverse rounded-full bg-accent opacity-25 blur-[80px]" />
      </div>

      <Container>
        <HeroSlider>
          {SLIDES.map((slide, i) => (
            <HeroSlide key={slide.id} slide={slide} isFirst={i === 0} />
          ))}
        </HeroSlider>
      </Container>
    </section>
  );
}

function HeroSlide({ slide, isFirst }: { slide: Slide; isFirst: boolean }) {
  // Only the first slide's title is the page <h1>.
  const Title = isFirst ? "h1" : "h2";
  const isPlatform = slide.logoStyle === "platform";

  return (
    <div className="grid w-full grid-cols-1 items-start gap-10 max-md:gap-8 lg:grid-cols-2 lg:items-center lg:gap-x-8 lg:gap-y-6">
      {/* Copy */}
      <div
        className={cn(
          "relative z-1 max-lg:pt-3 lg:col-start-1",
          isPlatform ? "lg:max-w-160" : "lg:max-w-200",
        )}
      >
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {slide.badge}
        </span>
        <Title
          className={cn(
            "text-heading-xl text-white max-md:text-display",
            isPlatform ? "mb-0 max-lg:mb-3" : "mb-6 max-lg:mb-3",
          )}
        >
          {slide.title}
        </Title>

        {/*
          The icon row is an <h2>: its text is the logos' alt text ("Shopify, BigCommerce, …").
          Headings only allow inline content, so no list markup; the hidden commas keep the
          names separate words for crawlers and screen readers.
        */}
        <h2
          className={cn(
            "mb-4 flex flex-wrap items-center max-lg:mb-3 max-md:mb-2.5",
            isPlatform ? "gap-4 max-lg:gap-3.5" : "gap-4",
          )}
        >
          {slide.logos.map((logo, i) => (
            <Fragment key={logo.src}>
              {i > 0 && (
                <>
                  <span className="sr-only">, </span>
                  <span
                    aria-hidden="true"
                    className="h-7.5 w-px bg-linear-to-b from-white/0 via-white/32 to-white/0"
                  />
                </>
              )}
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                loading={isFirst ? "eager" : "lazy"}
                className={cn(
                  "block h-auto w-auto object-contain",
                  isPlatform
                    ? cn("max-h-20 max-lg:max-h-16.5", logo.className)
                    : "max-h-13 max-w-13 max-lg:max-h-10 max-lg:max-w-10 max-sm:max-h-9 max-sm:max-w-9",
                )}
              />
            </Fragment>
          ))}
        </h2>

        <p className="mb-6 max-w-150 text-xl text-surface/90 max-lg:max-w-none max-md:text-base">
          {slide.subtitle}
        </p>
      </div>

      {/* Visual */}
      <div className="relative z-1 flex w-full items-center justify-center max-lg:pt-6 max-lg:pb-4 max-md:pt-5 max-md:pb-9 lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <SoftwareVisual slide={slide} />
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-4 self-start max-sm:w-full lg:col-start-1">
        <ButtonLink href={slide.primaryCta.href} className="max-sm:w-full">
          {slide.primaryCta.label}
        </ButtonLink>
        <ButtonLink href={slide.secondaryCta.href} variant="outline" className="max-sm:w-full">
          {slide.secondaryCta.label}
        </ButtonLink>
      </div>
    </div>
  );
}

const orbitDots = ["top-[12%] left-[28%]", "top-[54%] right-[2%]", "bottom-[8%] left-[20%]"];

/** Decorative capability card with orbit ring and floating metric cards. */
function SoftwareVisual({ slide }: { slide: Slide }) {
  const [top, bottom] = slide.metrics;

  return (
    <div
      aria-hidden="true"
      className="relative grid w-[min(100%,540px)] place-items-center max-lg:w-[min(100%,500px)] max-lg:grid-cols-2 max-lg:items-stretch max-lg:gap-4 max-lg:p-5.5 max-md:w-full max-md:grid-cols-1 max-md:gap-3.5 max-md:p-4 lg:aspect-[1.1/1]"
    >
      {/* Glow disc (circle on desktop, rounded panel below lg) */}
      <div className="absolute inset-[8%] rounded-full border border-primary/28 bg-linear-135 from-white/12 to-white/3 max-lg:inset-0 max-lg:rounded-3xl max-lg:from-white/7 max-lg:to-white/2" />
      <div className="absolute inset-[8%] rounded-full bg-radial from-primary/18 to-transparent to-34% max-lg:inset-0 max-lg:rounded-3xl max-lg:bg-radial-[at_50%_24%] max-lg:to-50%" />

      {/* Rotating dashed orbit with glowing dots */}
      <div className="absolute inset-0 animate-orbit rounded-full border border-dashed border-white/22 max-lg:inset-2.25 max-lg:rounded-[1.35rem] max-lg:opacity-72 max-md:inset-1.5">
        {orbitDots.map((position) => (
          <span
            key={position}
            className={cn(
              "absolute size-3.5 rounded-full bg-primary shadow-[0_0_28px_rgb(255_153_51/0.8)]",
              position,
            )}
          />
        ))}
      </div>

      {/* Capability card */}
      <div className="relative min-h-[52%] w-[74%] rounded-xl border border-white/14 bg-black/72 p-4 shadow-[0_24px_80px_rgb(0_0_0/0.5)] backdrop-blur-[14px] max-lg:z-2 max-lg:col-span-2 max-lg:mx-auto max-lg:min-h-0 max-lg:w-full max-lg:max-w-96 max-md:col-span-1">
        <p className="mb-4 text-sm font-bold text-surface/90">{slide.cardTitle}</p>
        <ul className="grid gap-3.5 max-sm:gap-3">
          {slide.capabilities.map((item) => (
            <li
              key={item.title}
              className={cn(
                "flex gap-3 rounded-lg border border-white/10 bg-white/5 p-3.5 max-sm:p-3",
                slide.logoStyle === "platform" ? "items-center" : "items-start",
              )}
            >
              <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                {item.icon}
              </span>
              <span className="min-w-0">
                <strong className="mb-1 block text-base text-primary">{item.title}</strong>
                <span className="block text-sm leading-snug text-surface/90">{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <MetricCard {...top} className="lg:-top-2.5 lg:right-0" />
      <MetricCard {...bottom} className="lg:-bottom-11 lg:left-0" />
    </div>
  );
}

function MetricCard({ value, label, className }: { value: string; label: string; className?: string }) {
  return (
    <div
      className={cn(
        "z-2 rounded-lg border border-primary/28 p-4 text-white lg:absolute lg:min-w-38 lg:bg-ink/82 lg:shadow-xl",
        "max-lg:relative max-lg:flex max-lg:w-full max-lg:flex-col max-lg:justify-between max-lg:gap-1 max-lg:bg-linear-to-b max-lg:from-ink/90 max-lg:to-black/82 max-lg:shadow-[0_20px_48px_rgb(0_0_0/0.28)] max-lg:backdrop-blur-lg max-sm:px-3 max-sm:py-3",
        className,
      )}
    >
      <strong className="block text-2xl leading-none text-cyan max-md:text-xl max-sm:text-lg">{value}</strong>
      <span className="mt-1.5 block text-sm font-semibold text-surface/90 max-sm:text-xs">{label}</span>
    </div>
  );
}
