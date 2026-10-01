import type { NavMenu } from "@/content/navigation";

/** Normalise a pathname: drop a trailing slash and ".html" so legacy-style URLs still match. */
export function normalizePath(pathname: string) {
  const path = pathname.replace(/\.html$/, "").replace(/\/+$/, "");
  return path === "" ? "/" : path;
}

export function isMenuActive(menu: NavMenu, pathname: string) {
  return menu.match.some((prefix) => pathname.startsWith(prefix));
}

export function isCurrent(href: string, pathname: string) {
  return normalizePath(href) === normalizePath(pathname);
}
