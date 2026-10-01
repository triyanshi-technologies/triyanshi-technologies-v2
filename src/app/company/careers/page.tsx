import { ActivityIcon, BarChartIcon, BookIcon, RemoteIcon } from "@/components/company/company-icons";
import { JobGrid, NumberedSteps, PerkGrid } from "@/components/company/company-sections";
import { Reveal } from "@/components/motion/reveal";
import { CtaCentered } from "@/components/sections/cta";
import { ButtonLink } from "@/components/ui/button";
import { Highlight, Section, SectionTitle } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { jobs, openApplicationHref } from "@/content/jobs";
import { buildMetadata } from "@/lib/seo";

// Hidden from the navigation (legacy), but the page stays live.
export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Join the Triyanshi Technologies team. We're hiring Full Stack Developers, UI/UX Designers, and Business Development Executives - remote-friendly, growth-focused roles.",
  path: "/company/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Careers" }]}
        title={
          <>
            Join Our <Highlight>Team</Highlight>
          </>
        }
        description="We're building a company where talented people do the best work of their careers. Come build with us."
      />

      <Section tone="light" aria-label="Why work with us">
        <Reveal>
          <SectionTitle
            eyebrow="Why Us"
            title={
              <>
                Why Work at <Highlight>Triyanshi?</Highlight>
              </>
            }
            className="mb-0"
          />
        </Reveal>
        <PerkGrid
          items={[
            {
              icon: <BarChartIcon />,
              title: "Fast Career Growth",
              text: "We're a growing company where ambitious people rise quickly. There's no bureaucracy between good ideas and real impact.",
            },
            {
              icon: <RemoteIcon />,
              title: "Remote-Friendly Culture",
              text: "Work from anywhere. Our async-first processes and flexible schedules mean you do your best work on your own terms.",
            },
            {
              icon: <BookIcon />,
              title: "Learning & Development",
              text: "Dedicated learning budgets, conference access, internal tech talks, and mentorship from seniors who genuinely invest in your growth.",
            },
            {
              icon: <ActivityIcon />,
              title: "Meaningful Work",
              text: "You'll work on real products for real clients, not endless internal tools. Every project shipped has a measurable impact on a business and its customers.",
            },
          ]}
        />
      </Section>

      <Section aria-label="Open positions">
        <Reveal>
          <SectionTitle
            eyebrow="Open Roles"
            title={
              <>
                Current <Highlight>Openings</Highlight>
              </>
            }
            className="mb-0"
          />
        </Reveal>
        <JobGrid jobs={jobs} />
      </Section>

      <Section tone="light" aria-label="Application process">
        <Reveal>
          <SectionTitle
            eyebrow="How It Works"
            title={
              <>
                The Application <Highlight>Process</Highlight>
              </>
            }
            className="mb-0"
          />
        </Reveal>
        <NumberedSteps
          steps={[
            {
              title: "Apply Online",
              text: "Submit your application via email with your CV and portfolio (if applicable). We review every submission personally - no black holes here.",
            },
            {
              title: "Interviews",
              text: "A short intro call, then a technical or portfolio review with the relevant team lead. We keep it focused and respectful of your time - max two rounds.",
            },
            {
              title: "Offer & Onboarding",
              text: "Successful candidates receive a clear offer within 48 hours. Onboarding is structured, well-documented, and paced to set you up for success from day one.",
            },
          ]}
        />
      </Section>

      <CtaCentered
        title={
          <>
            Don&apos;t see the right <Highlight>Fit?</Highlight>
          </>
        }
        description="We're always open to hearing from exceptional people. Send us your CV and tell us what you're great at."
        actions={<ButtonLink href={openApplicationHref}>Send an Open Application</ButtonLink>}
      />
    </>
  );
}
