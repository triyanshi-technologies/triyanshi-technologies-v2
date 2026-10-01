import { CheckCircleIcon, BoltIcon, ShieldIcon, UsersIcon } from "@/components/company/company-icons";
import { IconCardGrid, StatementPair } from "@/components/company/company-sections";
import { Reveal } from "@/components/motion/reveal";
import { CtaCentered } from "@/components/sections/cta";
import { ButtonLink } from "@/components/ui/button";
import { Highlight, Section, SectionTitle } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { buildMetadata } from "@/lib/seo";

// Hidden from the navigation (legacy), but the page stays live.
export const metadata = buildMetadata({
  title: "Our Story",
  description:
    "The Triyanshi Technologies story - from a small team with a big vision in 2018 to a globally trusted IT partner delivering 250+ projects across 15+ countries.",
  path: "/company/our-story",
});

export default function OurStoryPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/company/about-us" },
          { label: "Our Story" },
        ]}
        title={
          <>
            Our <Highlight>Story</Highlight>
          </>
        }
        description="Built on curiosity, grown through trust, and guided by a relentless drive to make technology work better for people."
      />

      <Section tone="light" aria-label="Our founding story">
        <div className="mx-auto max-w-192">
          <Reveal>
            <SectionTitle
              eyebrow="The Beginning"
              title={
                <>
                  Where It <Highlight>All Started</Highlight>
                </>
              }
              className="mb-0"
            />
          </Reveal>
          <Reveal className="mt-6 space-y-5 text-lg leading-8">
            <p>
              Triyanshi Technologies was founded in 2018 with a belief that great software is not just
              functional - it&apos;s transformative. A small group of engineers and designers came together
              with a shared conviction: that the gap between what technology can do and what businesses are
              actually experiencing was far too wide.
            </p>
            <p>
              In our early days, we focused on building eCommerce solutions for growing brands - and doing it
              exceptionally well. Word spread quickly. Clients returned. Referrals followed. By 2020, we had
              expanded our reach to North America and Europe, and our team had grown alongside the ambitions
              of the businesses we were helping.
            </p>
            <p>
              Today, Triyanshi Technologies operates as a globally trusted partner for 250+ brands across 15+
              countries. We still hold onto the values that got us here - deep technical rigour, honest
              collaboration, and a relentless focus on outcomes that actually matter to our clients.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section aria-label="Vision and Mission">
        <Reveal>
          <SectionTitle eyebrow="Our Purpose" title="Vision & Mission" />
        </Reveal>
        <StatementPair
          items={[
            {
              title: "Our Vision",
              text: "To be the global leader in digital innovation, empowering businesses to thrive in a technology-driven world through intuitive, reliable, and cutting-edge solutions. We envision a future where technology seamlessly integrates with human potential.",
            },
            {
              title: "Our Mission",
              text: "To consistently deliver high-quality, scalable IT products that exceed client expectations, while fostering a culture of creativity, continuous learning, and human-centric design. We bridge the gap between complex engineering and elegant user experiences.",
            },
          ]}
        />
      </Section>

      {/*
        Company timeline — hidden on the legacy site. To restore, add a <Section tone="light">
        with SectionTitle eyebrow "Our Timeline" / title "The Triyanshi Journey" and these milestones
        (the legacy layout alternated left/right along a vertical line that fills as you scroll):

        2018 — The Inception: Triyanshi Technologies was founded with a small team of passionate developers
               and a big vision - to revolutionise digital solutions for modern businesses.
        2020 — Global Reach: Expanded operations internationally, serving clients across North America and
               Europe. Delivered our first 50 enterprise projects with a 100% satisfaction rate.
        2023 — Excellence Recognised: Recognised for outstanding UI/UX design and scalable architecture.
               Surpassed the 100+ projects milestone and launched our AI & Automation practice.
        2026 — Shaping the Future: Leading the industry in AI integrations and next-gen web applications.
               Triyanshi continues to grow, innovate, and empower digital transformation worldwide.
      */}

      <Section tone="light" aria-label="Our core values">
        <Reveal>
          <SectionTitle
            eyebrow="What Drives Us"
            title={
              <>
                Our Core <Highlight>Values</Highlight>
              </>
            }
            className="mb-0"
          />
        </Reveal>
        <IconCardGrid
          columns={4}
          items={[
            {
              icon: <BoltIcon />,
              title: "Innovation",
              text: "We challenge assumptions, adopt emerging technologies early, and continuously evolve our craft to stay ahead of what's possible.",
            },
            {
              icon: <CheckCircleIcon />,
              title: "Excellence",
              text: "Good enough is never good enough. We hold ourselves to a higher standard on every engagement, no matter the project size.",
            },
            {
              icon: <ShieldIcon />,
              title: "Integrity",
              text: "We are honest about timelines, transparent about trade-offs, and accountable for every decision we make on behalf of our clients.",
            },
            {
              icon: <UsersIcon />,
              title: "Client First",
              text: "Every technical decision begins with a business question. We measure our success by the outcomes our clients achieve, not just the deliverables we ship.",
            },
          ]}
        />
      </Section>

      <CtaCentered
        title={
          <>
            Be Part Of The Next <Highlight>Chapter</Highlight>
          </>
        }
        description="Whether you want to partner with us or join our team, we'd love to hear from you."
        actions={
          <>
            <ButtonLink href="/contact-us/contact-us">Get in Touch</ButtonLink>
            <ButtonLink href="/company/careers" variant="outline">
              View Open Roles
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
