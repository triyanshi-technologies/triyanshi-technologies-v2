import { Container, Eyebrow, Highlight, Section } from "@/components/ui/layout";
import { getTestimonials } from "@/lib/home";
import { TestimonialsMarquee } from "./testimonials-slider";

/** "Trust That Speaks For Itself" — one full-width auto-scrolling strip of client testimonial cards (Sanity: Homepage → Testimonials). */
export async function TestimonialsSection() {
  const testimonials = await getTestimonials();
  if (!testimonials.length) return null;

  return (
    <Section id="tt-review" tone="light" contained={false} className="overflow-hidden">
      {/* Desktop: heading left, intro right, bottoms aligned. */}
      <Container className="mb-8 grid gap-5 sm:mb-10 lg:grid-cols-[1fr_minmax(0,32rem)] lg:items-end lg:gap-16">
        <div>
          <Eyebrow className="mb-2.5 text-base">Client Testimonials</Eyebrow>
          <h2 className="text-heading-md leading-[1.18] font-extrabold text-balance text-ink">
            Trust That Speaks <Highlight>For Itself</Highlight>
          </h2>
        </div>

        <div className="lg:border-l lg:border-line lg:pl-8">
          <p className="text-sm leading-7 text-pretty sm:text-base">
            Businesses choose Triyanshi for measurable outcomes, transparent communication, and long term
            partnerships. Here&apos;s what they have to say.
          </p>
        </div>
      </Container>

      <TestimonialsMarquee testimonials={testimonials} />
    </Section>
  );
}
