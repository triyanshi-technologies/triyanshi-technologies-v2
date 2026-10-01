import { BarChartIcon, BoltIcon, RemoteIcon } from "@/components/company/company-icons";
import { IconCardGrid, TeamGrid } from "@/components/company/company-sections";
import { Reveal } from "@/components/motion/reveal";
import { CtaCentered } from "@/components/sections/cta";
import { ButtonLink } from "@/components/ui/button";
import { Highlight, Section, SectionTitle } from "@/components/ui/layout";
import { PageHeader } from "@/components/ui/page-header";
import { buildMetadata } from "@/lib/seo";

// Hidden from the navigation (legacy), but the page stays live.
export const metadata = buildMetadata({
  title: "Our Team",
  description:
    "Meet the engineers, designers, and strategists at Triyanshi Technologies who collaborate every day to build meaningful digital products.",
  path: "/company/our-team",
});

export default function OurTeamPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/company/about-us" },
          { label: "Our Team" },
        ]}
        title={
          <>
            Our <Highlight>Team</Highlight>
          </>
        }
        description="Talented people, shared values, and a genuine passion for craft - this is the Triyanshi team."
      />

      <Section aria-label="Leadership team">
        <Reveal>
          <SectionTitle
            eyebrow="Leadership"
            title={
              <>
                The People <Highlight>Behind the Work</Highlight>
              </>
            }
            className="mb-0"
          />
        </Reveal>
        <TeamGrid
          members={[
            {
              name: "Founder & CEO",
              role: "Founder & Chief Executive",
              bio: "Visionary leader driving Triyanshi's strategic direction, client relationships, and culture of excellence since 2018. 12+ years in enterprise software and digital commerce.",
            },
            {
              name: "Chief Technology Officer",
              role: "Engineering & Architecture",
              bio: "Architect of Triyanshi's technical foundation - overseeing engineering standards, platform choices, and scalability across all client engagements. Specialises in Node.js, React, and cloud infrastructure.",
            },
            {
              name: "Head of Design",
              role: "UI/UX & Product Design",
              bio: "Champion of human-centric design at Triyanshi - leading UX research, design systems, and product direction to ensure every interface is both beautiful and intuitive.",
            },
          ]}
        />
      </Section>

      <Section tone="light" aria-label="Company culture">
        <Reveal>
          <SectionTitle
            eyebrow="Life at Triyanshi"
            title={
              <>
                How We <Highlight>Work Together</Highlight>
              </>
            }
            className="mb-0"
          />
        </Reveal>
        <IconCardGrid
          columns={3}
          items={[
            {
              icon: <BarChartIcon />,
              title: "Continuous Growth",
              text: "We invest in our people - dedicated learning budgets, internal knowledge-sharing sessions, and access to industry conferences keep every team member sharp.",
            },
            {
              icon: <RemoteIcon />,
              title: "Remote Collaboration",
              text: "Our team spans multiple cities and time zones. We've built async-first workflows and tight communication rituals that keep everyone aligned, no matter where they sit.",
            },
            {
              icon: <BoltIcon />,
              title: "Ownership & Impact",
              text: "Every person at Triyanshi owns their domain. We don't create passive contributors - we create engineers and designers who lead decisions and feel the impact of their work.",
            },
          ]}
        />
      </Section>

      <CtaCentered
        title={
          <>
            Want to join the <Highlight>Team?</Highlight>
          </>
        }
        description="We're always looking for talented people who care deeply about craft and want to build things that matter."
        actions={
          <>
            <ButtonLink href="/company/careers">See Open Roles</ButtonLink>
            <ButtonLink href="/contact-us/contact-us" variant="outline">
              Say Hello
            </ButtonLink>
          </>
        }
      />
    </>
  );
}
