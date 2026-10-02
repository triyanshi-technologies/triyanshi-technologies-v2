import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { HOME_DOCUMENTS } from "./schemaTypes/home";
import { structure } from "./structure";

/**
 * Showcases and homepage sections have fixed IDs the website relies on —
 * editors can edit them but not create, delete or unpublish them.
 */
const FIXED_TYPES = new Set<string>(["showcase", ...Object.values(HOME_DOCUMENTS).map((doc) => doc.type)]);
const LOCKED_ACTIONS = new Set(["delete", "duplicate", "unpublish"]);

export default defineConfig({
  name: "default",
  title: "Triyanshi Technologies",
  projectId: "eb7crcip",
  dataset: "production",
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    // No "create new" templates: the documents are created by scripts/sanity-import.ts.
    templates: (prev) => prev.filter((template) => !FIXED_TYPES.has(template.schemaType)),
  },
  document: {
    actions: (prev, { schemaType }) =>
      FIXED_TYPES.has(schemaType) ? prev.filter((action) => !LOCKED_ACTIONS.has(action.action ?? "")) : prev,
  },
});
