import Link from "next/link";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ProjectGridCard } from "@/components/projects/project-grid-card";
import { CtaSplit } from "@/components/sections/cta";
import { SplitHero } from "@/components/sections/dark-hero";
import {
  CapabilityGrid,
  LogoGrid,
  SectionIntro,
  SplitHeading,
  StatsBand,
  ValueStrip,
} from "@/components/sections/feature-sections";
import {
  BarChartIcon,
  GlobeIcon,
  GrowthIcon,
  PackageIcon,
  PaletteIcon,
  RepeatIcon,
  ShoppingBagIcon,
  SwapIcon,
  TrendUpIcon,
  TruckIcon,
  UsersIcon,
} from "@/components/services/landing-icons";
import { ButtonLink } from "@/components/ui/button";
import { Highlight, Section } from "@/components/ui/layout";
import { getProjectsFor } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "eCommerce Development",
  description:
    "End-to-end eCommerce development across Shopify, BigCommerce, Volusion, Webflow, and headless architectures - built to convert.",
  path: "/services/ecommerce",
});

export default async function EcommercePage() {
  // "Selected Commerce Work" — Sanity showcase "eCommerce — Selected Work".
  const projects = await getProjectsFor("service", "ecommerce");

  return (
    <>
      <SplitHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "eCommerce" }]}
        badge="eCommerce Development & Growth"
        title={
          <>
            Commerce That
            <br />
            <Highlight>Converts</Highlight>
          </>
        }
        description="We build, redesign, and optimize commerce experiences that are fast, user-friendly, and built to convert - from platform selection and migration to ongoing performance and growth work."
        actions={
          <>
            <ButtonLink href="/contact-us/contact-us">Let&apos;s Build Your Store</ButtonLink>
            <ButtonLink href="/portfolio" variant="outline">
              Explore Our Work
            </ButtonLink>
          </>
        }
        image={{ src: "/assets/eCommerce.webp", alt: "", width: 1774, height: 887 }}
      />

      <Section className="py-8" aria-label="A Commerce Engine Built to Grow">
        <SectionIntro
          eyebrow="More Than a Store"
          title={
            <>
              A Commerce Engine <Highlight>Built to Grow</Highlight>
            </>
          }
          description="Your eCommerce store is more than a website. It's where your brand, customers, technology and revenue come together."
        />
        <ValueStrip
          items={[
            { icon: <ShoppingBagIcon />, title: "Build", text: "New stores & custom experiences" },
            { icon: <SwapIcon />, title: "Migrate", text: "Move platforms without losing momentum" },
            { icon: <TrendUpIcon />, title: "Optimize", text: "Improve UX, CRO & performance" },
            { icon: <BarChartIcon />, title: "Grow", text: "SEO, analytics & continuous improvement" },
          ]}
        />
      </Section>

      <Section className="py-8" aria-label="eCommerce Expertise">
        <SplitHeading
          eyebrow="eCommerce Expertise"
          title={
            <>
              More Than Building a Store. <Highlight>We Design, Migrate &amp; Grow It.</Highlight>
            </>
          }
          description="We work across the entire eCommerce lifecycle - from strategy and design to development, migration and ongoing growth."
          className="mb-12"
        />
        <CapabilityGrid
          items={[
            {
              icon: <PaletteIcon />,
              title: "Store Redesign & Development",
              subtitle: "Better Experience. Higher Conversions.",
              text: "We redesign stores based on UX, conversion principles and user behavior - not just visuals.",
              points: [
                "UX/UI Strategy & Design",
                "Product & Collection Page Optimization",
                "Mobile-First & Speed Optimization",
                "CRO, A/B Testing & Analytics",
                "Theme Development",
                "Headless Commerce",
              ],
            },
            {
              icon: <RepeatIcon />,
              title: "Migration",
              subtitle: "Move Platforms Without Losing Momentum.",
              text: "We migrate your data, design, SEO and functionality with zero data loss and minimal downtime.",
              points: [
                "Lossless Data Migration (Products, Customers, Orders, Content & More)",
                "SEO Migration (301, Meta, URLs, Sitemap)",
                "Integrations & Custom Functionality",
                "Testing, Validation",
                "Go-Live Support",
              ],
            },
            {
              icon: <GrowthIcon />,
              title: "Optimize & Grow",
              subtitle: "Continuous Improvement. Real Results.",
              text: "We optimize your store for performance, visibility and revenue - every month.",
              points: [
                "Conversion Rate Optimization (CRO)",
                "Performance & Core Web Vitals",
                "SEO, AEO & Content Optimization",
                "Analytics, Tracking & Insights",
                "Growth Strategy & Roadmap",
                "A/B Testing",
              ],
            },
          ]}
        />
      </Section>

      <Section className="py-8 text-center" aria-label="Platforms We Work With">
        <Reveal as="h2" className="mb-8 text-heading-lg text-ink">
          Built Across the Platforms You Already Use
        </Reveal>
        <LogoGrid
          columns={5}
          logoSize="sm"
          items={[
            { kind: "image", src: "/assets/shopify_logo_black.webp", alt: "Shopify", width: 112, height: 32 },
            {
              kind: "image",
              src: "/assets/Shopify-Plus-Logo.webp",
              alt: "Shopify Plus",
              width: 129,
              height: 32,
            },
            {
              kind: "image",
              src: "/assets/BigCommerce-logo-dark.webp",
              alt: "BigCommerce",
              width: 142,
              height: 32,
            },
            {
              kind: "image",
              src: "/assets/volusion-seeklogo-dark.webp",
              alt: "Volusion",
              width: 165,
              height: 32,
            },
            { kind: "image", src: "/assets/headless.webp", alt: "Headless Commerce", width: 89, height: 32 },
          ]}
        />
        <Reveal as="p" className="mt-7 text-sm">
          Need a different platform?{" "}
          <Link href="/contact-us/contact-us" className="font-bold text-primary">
            Let&apos;s talk.
          </Link>
        </Reveal>
      </Section>

      <StatsBand
        title={
          <>
            Built for Growth. <Highlight>Proven Through Execution.</Highlight>
          </>
        }
        items={[
          { icon: <PackageIcon />, value: "250+", label: "Solutions Delivered" },
          { icon: <GlobeIcon />, value: "15+", label: "Countries Served" },
          { icon: <UsersIcon />, value: "30+", label: "Long-Term Client Partnerships" },
          { icon: <TruckIcon />, value: "140K+", label: "Orders Migrated" },
        ]}
      />

      {projects.length > 0 && (
        <Section className="py-8" aria-label="Selected Commerce Work">
          <Reveal className="mx-auto mb-10 max-w-160 text-center">
            <span className="mb-3 block text-xs font-semibold tracking-widest text-primary uppercase">
              Selected Commerce Work
            </span>
            <h2 className="text-heading-lg text-ink">
              Real Results. <Highlight>Real Impact.</Highlight>
            </h2>
          </Reveal>
          <RevealGroup className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {projects.map((project) => (
              <RevealItem key={project.slug} className="grid">
                <ProjectGridCard project={project} linked={false} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-10 flex justify-center">
            <ButtonLink href="/portfolio/shopify" variant="outlineDark">
              Explore Projects
            </ButtonLink>
          </Reveal>
        </Section>
      )}

      <CtaSplit
        title={
          <>
            Ready to Build a Better
            <br />
            <Highlight>Commerce Experience?</Highlight>
          </>
        }
        description="Maybe you're looking to optimize conversions, migrate to a scalable platform, or build custom functionality. Let's explore what's possible for your brand."
      />
    </>
  );
}
