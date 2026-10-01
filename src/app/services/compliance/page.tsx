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
  AuditIcon,
  BadgeCheckIcon,
  ClipboardCheckIcon,
  ClockAltIcon,
  GlobeIcon,
  PackageIcon,
  PrivacyIcon,
  RiskDocumentIcon,
  ShieldIcon,
  TrendUpIcon,
  UsersIcon,
} from "@/components/services/landing-icons";
import { ButtonLink } from "@/components/ui/button";
import { Highlight, Section } from "@/components/ui/layout";
import { buildMetadata } from "@/lib/seo";

// Compliance is hidden from the navigation (legacy), but the page stays live.
export const metadata = buildMetadata({
  title: "Compliance",
  description:
    "We help organizations become audit-ready and security-conscious with the right processes and controls - from SOC 2 and ISO 27001 readiness to GDPR advisory and ongoing risk management.",
  path: "/services/compliance",
});

export default function CompliancePage() {
  return (
    <>
      <SplitHero
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Compliance" }]}
        badge="Compliance Advisory"
        title={
          <>
            Compliance That
            <br />
            <Highlight>Builds Trust</Highlight>
          </>
        }
        description="We help businesses build strong compliance foundations, prepare for global standards, and demonstrate the security, privacy and reliability your customers trust."
        actions={
          <>
            <ButtonLink href="/contact-us/contact-us">Get Compliant</ButtonLink>
            <ButtonLink href="#compliance-approach" variant="outline">
              Explore Our Approach
            </ButtonLink>
          </>
        }
        image={{ src: "/assets/compliance hero.webp", alt: "", width: 1672, height: 941 }}
      />

      <Section className="py-8" aria-label="A Compliance Program Built Around Your Business">
        <SectionIntro
          eyebrow="More Than Checklists"
          title={
            <>
              A Compliance Program <Highlight>Built Around Your Business</Highlight>
            </>
          }
          description="Compliance is not just about meeting requirements. It is about protecting data, reducing risk, building customer trust and preparing your business for the future."
        />
        <ValueStrip
          items={[
            { icon: <ShieldIcon />, title: "Protect", text: "Strengthen security & protect sensitive data" },
            {
              icon: <ClipboardCheckIcon />,
              title: "Prepare",
              text: "Prepare for global standards with confidence",
            },
            {
              icon: <BadgeCheckIcon />,
              title: "Demonstrate",
              text: "Show customers & partners you can be trusted",
            },
            { icon: <TrendUpIcon />, title: "Improve", text: "Continuously improve your compliance posture" },
          ]}
        />
      </Section>

      <Section id="compliance-approach" className="py-8" aria-label="Compliance Advisory">
        <SplitHeading
          eyebrow="Compliance Advisory"
          title={
            <>
              Built for Audits.
              <br />
              <Highlight>Designed for Trust.</Highlight>
            </>
          }
          description="We work across the full compliance lifecycle - from readiness assessments and audits to ongoing risk management and documentation."
        />
        <CapabilityGrid
          items={[
            {
              icon: <AuditIcon />,
              title: "Audit Readiness",
              subtitle: "Get Audit-Ready With Confidence.",
              text: "We prepare your organization for SOC 2 and ISO 27001 audits with the right controls, evidence, and processes in place.",
              points: [
                "SOC 2 Readiness",
                "ISO 27001 Readiness",
                "Security Controls Implementation",
                "Audit Evidence & Documentation",
                "Gap Assessments",
              ],
            },
            {
              icon: <PrivacyIcon />,
              title: "Privacy & Regulatory Advisory",
              subtitle: "Navigate Regulations With Clarity.",
              text: "We guide you through GDPR and other regulatory requirements so your data practices stay compliant as you grow.",
              points: [
                "GDPR Advisory",
                "Data Privacy Assessments",
                "Regulatory Consulting",
                "Cross-Border Data Compliance",
                "Consent & Data Handling Policies",
              ],
            },
            {
              icon: <RiskDocumentIcon />,
              title: "Risk & Documentation",
              subtitle: "Governance That Holds Up Under Scrutiny.",
              text: "We build the risk management processes and policy documentation that keep your compliance program consistent and defensible.",
              points: [
                "Risk & Compliance Management",
                "Policy & Documentation",
                "Vendor Risk Assessments",
                "Incident Response Planning",
                "Ongoing Compliance Monitoring",
              ],
            },
          ]}
        />
      </Section>

      <Section className="py-8" aria-label="Standards We Work With">
        <SectionIntro
          eyebrow="Standards We Work With"
          title={
            <>
              Aligned With <Highlight>Global Standards</Highlight>
            </>
          }
        />
        <LogoGrid
          columns={4}
          items={[
            { kind: "image", src: "/assets/SOC-2.webp", alt: "SOC 2", width: 62, height: 64 },
            { kind: "image", src: "/assets/iso27001.webp", alt: "ISO 27001", width: 62, height: 64 },
            { kind: "image", src: "/assets/gdrp.webp", alt: "GDPR", width: 64, height: 64 },
            { kind: "image", src: "/assets/nist.webp", alt: "NIST", width: 113, height: 64 },
          ]}
        />
      </Section>

      <StatsBand
        title={
          <>
            Proven Through <Highlight>Execution</Highlight>
          </>
        }
        items={[
          { icon: <PackageIcon />, value: "250+", label: "Solutions Delivered" },
          { icon: <GlobeIcon />, value: "15+", label: "Countries Served" },
          { icon: <UsersIcon />, value: "30+", label: "Long-Term Client Partnerships" },
          { icon: <ClockAltIcon />, value: "99%", label: "On-Time Execution" },
        ]}
      />

      <CtaSplit
        title={
          <>
            Build Trust{" "}
            <Highlight>
              Stay Compliant
              <br />
              Grow with Confidence
            </Highlight>
          </>
        }
        description="Let us help you strengthen your compliance foundation and prepare your business for what's next."
        buttonLabel="Start a Conversation"
      />
    </>
  );
}
