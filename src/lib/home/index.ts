import "server-only";
import { sanityFetch } from "@/lib/sanity/client";
import { toImage } from "@/lib/sanity/image";
import {
  HOME_QUERY,
  type SanityAppPartner,
  type SanityBrandLogo,
  type SanityHome,
  type SanityTestimonial,
} from "@/lib/sanity/queries";
import type { AppPartner, BrandLogo, BrandStrips, Testimonial } from "./types";

/*
 * Homepage sections from Sanity (Studio → Homepage), fetched at build time.
 * Items whose required images are missing are skipped rather than rendered
 * broken; an empty list hides its section.
 */

function toBrandLogo(doc: SanityBrandLogo): BrandLogo | undefined {
  const logo = toImage(doc.logo, doc.name);
  if (!logo) return undefined;
  return {
    id: doc._key,
    name: doc.name,
    logo,
    shape: doc.shape === "icon" || doc.shape === "wide" ? doc.shape : undefined,
  };
}

function toTestimonial(doc: SanityTestimonial): Testimonial | undefined {
  const logo = toImage(doc.companyLogo, doc.companyName);
  if (!logo) return undefined;
  return {
    id: doc._key,
    name: doc.name,
    role: doc.role,
    avatarColor: doc.avatarColor,
    rating: doc.rating,
    quote: doc.quote,
    company: { name: doc.companyName, logo },
    platform: doc.platform ?? undefined,
    badges: [
      ...(doc.highlightBadge ? [{ label: doc.highlightBadge, emphasis: true }] : []),
      ...(doc.badges ?? []).map((label) => ({ label })),
    ],
  };
}

function toAppPartner(doc: SanityAppPartner): AppPartner | undefined {
  const logo = toImage(doc.logo, "");
  if (!logo) return undefined;
  return { id: doc._key, name: doc.name, category: doc.category, description: doc.description, logo };
}

function mapList<In, Out>(items: In[] | null | undefined, map: (item: In) => Out | undefined): Out[] {
  return (items ?? []).flatMap((item) => map(item) ?? []);
}

/** One request for all sections; shared by the homepage components in a build, refetched in dev. */
let cached: Promise<SanityHome> | undefined;

function home() {
  if (process.env.NODE_ENV !== "production") return sanityFetch<SanityHome>(HOME_QUERY);
  return (cached ??= sanityFetch<SanityHome>(HOME_QUERY));
}

/** "Brands That Believe In Us" strips, in the editor's order. */
export async function getBrandStrips(): Promise<BrandStrips> {
  const { brands } = await home();
  return { top: mapList(brands?.top, toBrandLogo), bottom: mapList(brands?.bottom, toBrandLogo) };
}

/** Client testimonials, in slide order. */
export async function getTestimonials(): Promise<Testimonial[]> {
  return mapList((await home()).testimonials, toTestimonial);
}

/** "Our eCommerce App Partners" cards, in card order. */
export async function getAppPartners(): Promise<AppPartner[]> {
  return mapList((await home()).appPartners, toAppPartner);
}
