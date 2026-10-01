import type { NavMenu } from "@/content/navigation";

/** Normalise a pathname: drop a trailing slash and ".html" so legacy-style URLs still match. */
export function normalizePath(pathname: string) {
  const path = pathname.replace(/\.html$/, "").replace(/\/+$/, "");
  return path === "" ? "/" : path;
}

/** A menu is active on any page under its prefixes, including the hub itself ("/tools" for "/tools/"). */
export function isMenuActive(menu: NavMenu, pathname: string) {
  const path = normalizePath(pathname);
  return menu.match.some((prefix) => path.startsWith(prefix) || path === normalizePath(prefix));
}

export function isCurrent(href: string, pathname: string) {
  return normalizePath(href) === normalizePath(pathname);
}
