import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

/** Showcases have fixed IDs the website relies on — editors can edit them but not create or delete them. */
const LOCKED_ACTIONS = new Set(["delete", "duplicate", "unpublish"]);

export default defineConfig({
  name: "default",
  title: "Triyanshi Technologies",
  projectId: "eb7crcip",
  dataset: "production",
  plugins: [structureTool({ structure })],
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId !== "showcase"),
    actions: (prev, { schemaType }) =>
      schemaType === "showcase" ? prev.filter((action) => !LOCKED_ACTIONS.has(action.action ?? "")) : prev,
  },
});
