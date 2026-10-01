import Link from "next/link";
import { Fragment } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import { BreadcrumbChevron } from "./icons";

export type Crumb = { label: string; href?: string };

/**
 * Breadcrumb for dark page headers. The last crumb is the current page.
 * Also emits BreadcrumbList structured data.
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${site.url}${item.href === "/" ? "" : item.href}` } : {}),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center justify-center gap-2 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              {isLast || !item.href ? (
                <span aria-current={isLast ? "page" : undefined} className="font-semibold text-primary">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="text-muted transition-colors hover:text-primary">
                  {item.label}
                </Link>
              )}
              {!isLast && <BreadcrumbChevron className="size-3 text-subtle select-none" />}
            </Fragment>
          );
        })}
      </nav>
      <JsonLd data={schema} />
    </>
  );
}
