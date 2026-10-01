import { CaseIcon } from "@sanity/icons/Case";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { TagsIcon } from "@sanity/icons/Tags";
import type { StructureResolver } from "sanity/structure";

/** Studio sidebar: Projects, then the two groups of showcases. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("project").title("Projects").icon(CaseIcon),
      S.divider(),
      S.listItem()
        .title("Portfolio pages")
        .icon(DocumentsIcon)
        .child(
          S.documentList()
            .title("Portfolio pages")
            .schemaType("showcase")
            .filter('_type == "showcase" && kind == "portfolio"')
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
      S.listItem()
        .title("Service page examples")
        .icon(TagsIcon)
        .child(
          S.documentList()
            .title("Service page examples")
            .schemaType("showcase")
            .filter('_type == "showcase" && kind == "service"')
            .defaultOrdering([{ field: "title", direction: "asc" }]),
        ),
    ]);
