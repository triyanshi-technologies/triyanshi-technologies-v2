import { ThListIcon } from "@sanity/icons/ThList";
import { defineArrayMember, defineField, defineType } from "sanity";

/*
 * A showcase is the ordered list of projects for one place on the website
 * (a portfolio page or a service page's examples). Showcases are created by
 * the developers with fixed IDs; editors only drag projects in and out of them.
 */
export const showcase = defineType({
  name: "showcase",
  title: "Showcase",
  type: "document",
  icon: ThListIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "kind",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Portfolio page", value: "portfolio" },
          { title: "Service page examples", value: "service" },
        ],
      },
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "key",
      title: "Page key",
      type: "string",
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: "location",
      title: "Shown on",
      type: "url",
      readOnly: true,
      validation: (rule) => rule.uri({ allowRelative: true }),
    }),
    defineField({
      name: "projects",
      title: "Projects",
      type: "array",
      description: "Drag to reorder — the website shows projects in this order. Use “Add item” to include a project.",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "project" }],
          options: { disableNew: true },
        }),
      ],
      validation: (rule) => rule.unique(),
    }),
  ],
  preview: {
    select: { title: "title", projects: "projects" },
    prepare: ({ title, projects }) => {
      const count = Array.isArray(projects) ? projects.length : 0;
      return { title, subtitle: count === 1 ? "1 project" : `${count} projects` };
    },
  },
});
