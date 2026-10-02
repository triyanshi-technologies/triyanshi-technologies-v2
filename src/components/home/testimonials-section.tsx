import { Eyebrow, Highlight } from "@/components/ui/layout";
import { getTestimonials } from "@/lib/home";
import { TestimonialsSlider } from "./testimonials-slider";

/** "Trust That Speaks For Itself" — client testimonial slider with laptop mockup (Sanity: Homepage → Testimonials). */
export async function TestimonialsSection() {
  const testimonials = await getTestimonials();
  if (!testimonials.length) return null;

  return (
    <section id="tt-review" className="overflow-hidden bg-surface py-12.5 sm:py-15 lg:py-22.5">
      <TestimonialsSlider
        testimonials={testimonials}
        intro={
          <>
            <Eyebrow className="mb-2.5 text-base">Client Testimonials</Eyebrow>
            <h2 className="mb-3 text-heading-md leading-[1.18] font-extrabold text-ink sm:mb-4">
              Trust That Speaks <Highlight>For Itself</Highlight>
            </h2>
            <p className="mb-6 max-w-130 text-sm leading-7 sm:mb-8 sm:text-base">
              Businesses choose Triyanshi for measurable outcomes, transparent communication, and long term
              partnerships. Here&apos;s what they have to say.
            </p>
          </>
        }
      />
    </section>
  );
}
