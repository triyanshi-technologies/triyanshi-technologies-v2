import { CaseIcon } from "@sanity/icons/Case";
import { defineArrayMember, defineField, defineType } from "sanity";

/** Keep in sync with PLATFORMS in src/lib/projects/types.ts (website). */
export const PLATFORMS = ["Shopify", "BigCommerce", "Volusion", "Webflow", "Wix", "WordPress", "WooCommerce"];

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  icon: CaseIcon,
  description:
    "A client website. After publishing, add it to the showcases (Portfolio pages / Service pages) where it should appear.",
  fields: [
    defineField({
      name: "name",
      title: "Project name",
      type: "string",
      description: "Shown on project cards, e.g. USA LIGHT.",
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Unique ID used internally. Generate it from the name.",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "domain",
      title: "Website domain",
      type: "string",
      description: "Without https://, e.g. usalight.com. Cards link to this live site.",
      validation: (rule) =>
        rule
          .required()
          .regex(/^(?!https?:\/\/)[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i, { name: "domain without https://" }),
    }),
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: { list: PLATFORMS, layout: "dropdown" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Industry",
      type: "string",
      description: "e.g. Lighting, Fashion, Pet Nutrition.",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "image",
      title: "Website screenshot",
      type: "image",
      description: "Full-width homepage screenshot (about 1900 × 945 px). Use the hotspot to choose the focal point.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describe the screenshot for screen readers. Defaults to “<Project name> website”.",
        }),
      ],
      validation: (rule) => rule.required().warning("Without a screenshot the site shows a placeholder image."),
    }),
    defineField({
      name: "features",
      title: "Key features",
      type: "array",
      description: "What we delivered. The first 4 are shown on project cards.",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.required().min(1).unique(),
    }),
    defineField({
      name: "tags",
      title: "Technology tags",
      type: "array",
      description: "e.g. Shopify, Liquid, JavaScript.",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
  ],
  orderings: [
    { title: "Name", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
    { title: "Platform", name: "platformAsc", by: [{ field: "platform", direction: "asc" }, { field: "name", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", platform: "platform", domain: "domain", media: "image" },
    prepare: ({ title, platform, domain, media }) => ({
      title,
      subtitle: [platform, domain].filter(Boolean).join(" · "),
      media,
    }),
  },
});
