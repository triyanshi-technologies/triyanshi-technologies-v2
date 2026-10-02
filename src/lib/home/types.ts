import type { ProjectImage } from "@/lib/projects/types";

/*
 * Homepage sections edited in Sanity (Studio → Homepage), shaped for
 * rendering. Type-only module, so client components can import it.
 */

/** "icon" for square marks (rendered smaller), "wide" for long wordmarks. */
export type LogoShape = "icon" | "wide";

export type BrandLogo = { id: string; name: string; logo: ProjectImage; shape?: LogoShape };

export type BrandStrips = { top: BrandLogo[]; bottom: BrandLogo[] };

/** Platforms with a logo on the testimonial card (PLATFORM_LOGOS in testimonials-slider.tsx). */
export type TestimonialPlatform = "shopify" | "bigcommerce" | "volusion";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  /** Avatar circle colour (initial is taken from the name). */
  avatarColor: string;
  rating: number;
  quote: string;
  company: { name: string; logo: ProjectImage };
  screenshot: ProjectImage;
  platform?: TestimonialPlatform;
  /** `emphasis` renders the badge in bold black (legacy "Custom" badge). */
  badges: { label: string; emphasis?: boolean }[];
};

export type AppPartner = {
  id: string;
  name: string;
  category: string;
  logo: ProjectImage;
  description: string;
};
