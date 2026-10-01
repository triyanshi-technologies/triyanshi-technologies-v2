import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Badge } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/cn";
import { arrowNudge } from "@/lib/hover";
import { buildMetadata } from "@/lib/seo";

/*
 * Case-study placeholder (legacy portfolio-detail.html). Every "View Case
 * Study" link points here until real case studies exist, so the sample
 * content is kept out of search results.
 */
export const metadata = buildMetadata({
  title: "FinTech Dashboard",
  description:
    "A high-performance financial analytics platform built by Triyanshi Technologies for an enterprise client.",
  path: "/portfolio-detail/portfolio-detail",
  index: false,
});

const IMAGE = { src: "/assets/sample-image.webp", width: 1536, height: 1024 };

const META = [
  { label: "Client", value: "Finova Corp" },
  { label: "Role", value: "Full-Stack Dev & UI/UX" },
  { label: "Timeline", value: "6 Months" },
];

const STORY = [
  {
    title: "The Challenge",
    alt: "FinTech dashboard challenge context",
    paragraphs: [
      "Finova Corp was struggling with their legacy reporting system, which took hours to generate end-of-day financial reports. They needed a robust, real-time analytics dashboard capable of handling millions of transactions daily without latency issues.",
      "Furthermore, the existing user interface was cluttered and non-intuitive, leading to a high learning curve for new analysts and frequent errors during data interpretation.",
    ],
  },
  {
    title: "Our Solution",
    alt: "FinTech dashboard solution showcase",
    paragraphs: [
      "Triyanshi Technologies re-architected the entire backend using Node.js and a highly optimized PostgreSQL database with advanced indexing and caching layers.",
      "On the frontend, we designed a sleek, dark-mode focused React application featuring dynamic, real-time charts (via WebSockets) that allowed analysts to visualize data trends instantaneously. The new UI/UX was meticulously crafted to ensure maximum readability of dense data tables.",
    ],
  },
];

export default function PortfolioDetailPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "FinTech Dashboard" },
        ]}
        title="FinTech Analytics Dashboard"
        titleClassName="text-heading-lg"
        description="A high-performance financial analytics platform designed to process millions of transactions in real-time."
        descriptionClassName="mt-4"
      >
        <dl className="mt-8 flex flex-wrap justify-center gap-8 text-left">
          {META.map((item) => (
            <div key={item.label}>
              <dt className="mb-1 text-sm text-muted">{item.label}</dt>
              <dd className="font-semibold text-white">{item.value}</dd>
            </div>
          ))}
          <div>
            <dt className="mb-1 text-sm text-muted">Tech Stack</dt>
            <dd className="mt-1 flex gap-1">
              {["React", "Node.js", "PostgreSQL"].map((tech) => (
                <Badge key={tech} className="mb-0">
                  {tech}
                </Badge>
              ))}
            </dd>
          </div>
        </dl>
      </PageHeader>

      <section className="py-16">
        <Container>
          <Reveal className="mb-12 aspect-16/7 overflow-hidden rounded-xl">
            <Image
              {...IMAGE}
              alt="Portfolio Project"
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="size-full object-cover"
            />
          </Reveal>

          <div className="my-12 grid gap-12">
            {STORY.map((row, i) => {
              const reverse = i % 2 === 1;
              return (
                <RevealGroup
                  as="article"
                  key={row.title}
                  className={cn(
                    "grid items-center gap-6 md:gap-8",
                    reverse
                      ? "md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
                      : "md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]",
                  )}
                >
                  <RevealItem className={cn("max-w-160 space-y-6", reverse && "md:order-2")}>
                    <h2 className="text-heading-md text-ink">{row.title}</h2>
                    {row.paragraphs.map((text) => (
                      <p key={text.slice(0, 24)}>{text}</p>
                    ))}
                  </RevealItem>
                  <RevealItem className="aspect-video overflow-hidden rounded-xl border border-line shadow-[0_16px_36px_rgb(0_0_0/0.1)]">
                    <Image
                      {...IMAGE}
                      alt={row.alt}
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="size-full object-cover"
                    />
                  </RevealItem>
                </RevealGroup>
              );
            })}
          </div>

          <Reveal className="mx-auto max-w-200 text-center">
            <h2 className="mb-4 text-heading-md text-ink">Results</h2>
            <p className="mb-4 text-lg font-medium text-primary-text">
              Report generation time reduced from 4 hours to 3 seconds.
            </p>
            <p>
              The new dashboard increased overall productivity by 40% and drastically reduced data
              misinterpretation. Finova Corp successfully deployed the solution across all 5 of their
              international branches.
            </p>
          </Reveal>

          {/* Placeholder navigation — wire to real case studies when they exist. */}
          <Reveal
            as="nav"
            aria-label="More projects"
            className="mt-20 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <ButtonLink href="/portfolio" variant="outlineDark">
              <ArrowRightIcon size={20} className="hidden rotate-180 sm:block" />
              Previous Project
            </ButtonLink>
            <ButtonLink href="/portfolio">
              Next Project
              <ArrowRightIcon size={20} className={cn("hidden sm:block", arrowNudge)} />
            </ButtonLink>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
