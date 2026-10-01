import { AboutBento } from "@/components/home/about-bento";
import { AppPartners } from "@/components/home/app-partners";
import { BrandMarquee } from "@/components/home/brand-marquee";
import { ContactPromo } from "@/components/home/contact-promo";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { HeroSection } from "@/components/home/hero-section";
import { StatsStrip } from "@/components/home/stats-strip";
import { TeamSection } from "@/components/home/team-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { JsonLd, websiteSchema } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({ description: site.description, path: "/" });

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema} />
      <HeroSection />
      <StatsStrip />
      <BrandMarquee />
      <AboutBento />
      <FeaturedProjects />
      <AppPartners />
      <TeamSection />

      {/*
        Legacy "What Our Clients Say" section — disabled on the legacy site and
        replaced by <TestimonialsSection />. Its quote is kept in content/testimonials.ts.

        <Section>
          <SectionTitle eyebrow="Testimonials" title="What Our Clients Say" />
          …single rotating quote with author avatars…
        </Section>
      */}
      <TestimonialsSection />

      <ContactPromo />
    </>
  );
}
