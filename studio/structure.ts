import { CaseIcon } from "@sanity/icons/Case";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { HomeIcon } from "@sanity/icons/Home";
import { TagsIcon } from "@sanity/icons/Tags";
import type { StructureResolver } from "sanity/structure";
import { HOME_DOCUMENTS } from "./schemaTypes/home";

/** Studio sidebar: Projects, the two groups of showcases, then the homepage sections. */
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
      S.divider(),
      S.listItem()
        .title("Homepage")
        .icon(HomeIcon)
        .child(
          S.list()
            .title("Homepage")
            .items(
              Object.values(HOME_DOCUMENTS).map(({ id, type, title }) =>
                S.listItem()
                  .id(id)
                  .title(title)
                  .schemaType(type)
                  .child(S.document().schemaType(type).documentId(id).title(title)),
              ),
            ),
        ),
    ]);
