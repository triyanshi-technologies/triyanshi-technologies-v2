import { CommentIcon } from "@sanity/icons/Comment";
import { ImagesIcon } from "@sanity/icons/Images";
import { PlugIcon } from "@sanity/icons/Plug";
import { defineArrayMember, defineField, defineType } from "sanity";

/*
 * Homepage sections. Each is a single document with a fixed ID (see
 * HOME_DOCUMENTS) holding an ordered list — editors drag items to reorder.
 */

/** Fixed document IDs the website reads. Keep in sync with src/lib/home (website). */
export const HOME_DOCUMENTS = {
  brands: { id: "home-brands", type: "homeBrands", title: "Brand logos" },
  testimonials: { id: "home-testimonials", type: "homeTestimonials", title: "Testimonials" },
  appPartners: { id: "home-app-partners", type: "homeAppPartners", title: "App partners" },
} as const;

/** Platforms with a logo on the testimonial card. Keep in sync with PLATFORM_LOGOS in testimonials-slider.tsx. */
const TESTIMONIAL_PLATFORMS = [
  { title: "Shopify", value: "shopify" },
  { title: "BigCommerce", value: "bigcommerce" },
  { title: "Volusion", value: "volusion" },
];

const brandLogo = defineArrayMember({
  name: "brandLogo",
  title: "Brand logo",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Brand name",
      type: "string",
      description: "Used as the logo's alternative text.",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Transparent PNG/WebP or SVG, trimmed to the logo edges. Shown greyscale until hovered.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shape",
      title: "Logo shape",
      type: "string",
      description: "Controls the display size so square marks and long wordmarks look balanced.",
      options: {
        list: [
          { title: "Standard", value: "default" },
          { title: "Square / icon mark (smaller)", value: "icon" },
          { title: "Wide wordmark (wider, shorter)", value: "wide" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "default",
    }),
  ],
  preview: { select: { title: "name", subtitle: "shape", media: "logo" } },
});

const brandRow = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    type: "array",
    description,
    of: [brandLogo],
  });

export const homeBrands = defineType({
  name: HOME_DOCUMENTS.brands.type,
  title: "Homepage: Brand logos",
  type: "document",
  icon: ImagesIcon,
  description: "“Brands That Believe In Us” logo strips on the homepage.",
  fields: [
    brandRow("top", "Top strip", "Scrolls left. Drag to reorder."),
    brandRow("bottom", "Bottom strip", "Scrolls right. Drag to reorder."),
  ],
  preview: { prepare: () => ({ title: HOME_DOCUMENTS.brands.title }) },
});

export const homeTestimonials = defineType({
  name: HOME_DOCUMENTS.testimonials.type,
  title: "Homepage: Testimonials",
  type: "document",
  icon: CommentIcon,
  description: "“Trust That Speaks For Itself” slider on the homepage.",
  fields: [
    defineField({
      name: "items",
      title: "Testimonials",
      type: "array",
      description: "Slide order. Drag to reorder.",
      of: [
        defineArrayMember({
          name: "testimonial",
          title: "Testimonial",
          type: "object",
          groups: [
            { name: "person", title: "Person", default: true },
            { name: "company", title: "Company" },
            { name: "tags", title: "Platform & badges" },
          ],
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              group: "person",
              description: "The avatar shows its first letter.",
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: "role",
              title: "Role",
              type: "string",
              group: "person",
              description: "e.g. Co-Founder.",
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: "avatarColor",
              title: "Avatar colour",
              type: "string",
              group: "person",
              description: "Hex colour of the initial's circle, e.g. #1abc9c.",
              initialValue: "#ff9933",
              validation: (rule) =>
                rule.required().regex(/^#[0-9a-f]{6}$/i, { name: "hex colour like #1abc9c" }),
            }),
            defineField({
              name: "rating",
              title: "Rating",
              type: "number",
              group: "person",
              options: { list: [5, 4, 3, 2, 1], layout: "radio", direction: "horizontal" },
              initialValue: 5,
              validation: (rule) => rule.required().integer().min(1).max(5),
            }),
            defineField({
              name: "quote",
              title: "Quote",
              type: "text",
              rows: 5,
              group: "person",
              validation: (rule) => rule.required().max(500),
            }),
            defineField({
              name: "companyName",
              title: "Company name",
              type: "string",
              group: "company",
              validation: (rule) => rule.required().max(60),
            }),
            defineField({
              name: "companyLogo",
              title: "Company logo",
              type: "image",
              group: "company",
              description: "Transparent logo, shown at most 32 px tall on the card.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              group: "tags",
              description: "Shows the platform logo as the first badge. Leave empty for other platforms.",
              options: { list: TESTIMONIAL_PLATFORMS, layout: "dropdown" },
            }),
            defineField({
              name: "highlightBadge",
              title: "Highlighted badge",
              type: "string",
              group: "tags",
              description: "Optional badge shown first in bold black, e.g. Custom.",
              validation: (rule) => rule.max(30),
            }),
            defineField({
              name: "badges",
              title: "Badges",
              type: "array",
              group: "tags",
              description: "Services delivered, e.g. Redesign, CRO.",
              of: [defineArrayMember({ type: "string" })],
              options: { layout: "tags" },
              validation: (rule) => rule.unique().max(4),
            }),
          ],
          preview: {
            select: { name: "name", company: "companyName", rating: "rating", media: "companyLogo" },
            prepare: ({ name, company, rating, media }) => ({
              title: [name, company].filter(Boolean).join(" · "),
              subtitle: rating ? "★".repeat(rating) : undefined,
              media,
            }),
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: HOME_DOCUMENTS.testimonials.title }) },
});

export const homeAppPartners = defineType({
  name: HOME_DOCUMENTS.appPartners.type,
  title: "Homepage: App partners",
  type: "document",
  icon: PlugIcon,
  description: "“Our eCommerce App Partners” cards on the homepage.",
  fields: [
    defineField({
      name: "items",
      title: "App partners",
      type: "array",
      description: "Card order (4 per row on desktop). Drag to reorder.",
      of: [
        defineArrayMember({
          name: "appPartner",
          title: "App partner",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "App name",
              type: "string",
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              description: "e.g. Reviews, Payments & Checkout.",
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              description: "Square app icon (at least 112 × 112 px).",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              description: "One sentence, about 100 characters.",
              validation: (rule) => [
                rule.required(),
                rule.max(140).warning("Long descriptions make cards uneven."),
              ],
            }),
          ],
          preview: { select: { title: "name", subtitle: "category", media: "logo" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: HOME_DOCUMENTS.appPartners.title }) },
});
