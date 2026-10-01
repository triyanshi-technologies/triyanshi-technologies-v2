"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRightIcon, ChevronDownIcon } from "@/components/ui/icons";
import { contactLink, homeLink, primaryNav, type NavMenu } from "@/content/navigation";
import { cx } from "@/lib/cx";
import { isCurrent, isMenuActive } from "./nav-utils";

const CLOSE_DELAY_MS = 90;
const VIEWPORT_PADDING = 12;

const desktopQuery = "(min-width: 1024px)";
const hoverQuery = "(hover: hover) and (pointer: fine)";
const canHover = () => matchMedia(desktopQuery).matches && matchMedia(hoverQuery).matches;

const navLinkClass =
  "inline-flex items-center gap-1.25 rounded-md px-2 py-1.75 text-xs leading-[1.4] font-medium whitespace-nowrap transition-colors duration-200 hover:bg-white/8 hover:text-white focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary xl:px-2.75 xl:py-2 xl:text-sm";

/** Desktop primary navigation (≥1024px): links, hover/click dropdowns and the CTA. */
export function DesktopNav() {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const openedAt = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  const open = useCallback((id: string) => {
    clearTimeout(closeTimer.current);
    openedAt.current = Date.now();
    setOpenId(id);
  }, []);

  const close = useCallback(() => {
    clearTimeout(closeTimer.current);
    setOpenId(null);
  }, []);

  const closeSoon = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY_MS);
  }, []);

  // Close on route change (adjusting state during render, per React docs).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenId(null);
  }

  // Escape, outside click, and leaving desktop width all close the open menu.
  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      document.getElementById(`nav-${openId}-toggle`)?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) close();
    };
    const onResize = () => {
      if (!matchMedia(desktopQuery).matches) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
    };
  }, [openId, close]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <nav
      ref={navRef}
      aria-label="Primary navigation"
      className="hidden min-w-0 items-center gap-px lg:flex xl:gap-0.5"
    >
      <Link
        href={homeLink.href}
        aria-current={pathname === "/" ? "page" : undefined}
        className={cx(navLinkClass, pathname === "/" ? "text-primary" : "text-white/82")}
      >
        {homeLink.label}
      </Link>

      {primaryNav.map((menu) => (
        <NavDropdown
          key={menu.id}
          menu={menu}
          pathname={pathname}
          isOpen={openId === menu.id}
          onOpen={() => open(menu.id)}
          onClose={close}
          onCloseSoon={closeSoon}
          openedAt={openedAt}
        />
      ))}

      <ButtonLink href={contactLink.href} size="sm" className="ml-1">
        {contactLink.label}
      </ButtonLink>
    </nav>
  );
}

type DropdownProps = {
  menu: NavMenu;
  pathname: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onCloseSoon: () => void;
  openedAt: React.RefObject<number>;
};

function NavDropdown({ menu, pathname, isOpen, onOpen, onClose, onCloseSoon, openedAt }: DropdownProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const active = isMenuActive(menu, pathname);
  const panelId = `dd-${menu.id}`;

  // Keep the open panel inside the viewport.
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const measure = () => {
      const panel = panelRef.current;
      if (!panel) return;
      const parent = panel.offsetParent?.getBoundingClientRect();
      if (!parent) return;
      const left = parent.left;
      const right = left + panel.offsetWidth;
      if (right > innerWidth - VIEWPORT_PADDING) setShift(innerWidth - VIEWPORT_PADDING - right);
      else if (left < VIEWPORT_PADDING) setShift(VIEWPORT_PADDING - left);
      else setShift(0);
    };
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [isOpen]);

  const handleToggleClick = () => {
    // A hover may have opened the menu a moment before this click; don't immediately close it.
    const justOpened = Date.now() - openedAt.current < 50;
    if (isOpen && !justOpened) onClose();
    else if (!isOpen) onOpen();
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => canHover() && onOpen()}
      onMouseLeave={() => canHover() && onCloseSoon()}
      onFocus={() => !isOpen && onOpen()}
      onBlur={(e) => {
        if (canHover() && !e.currentTarget.contains(e.relatedTarget as Node)) onCloseSoon();
      }}
    >
      <button
        type="button"
        id={`nav-${menu.id}-toggle`}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={handleToggleClick}
        className={cx(
          navLinkClass,
          isOpen ? "bg-white/8 text-white" : active ? "text-primary" : "text-white/82",
        )}
      >
        {menu.label}
        <ChevronDownIcon
          size={12}
          className={cx("shrink-0 transition-transform duration-250", isOpen && "rotate-180")}
        />
      </button>

      <div
        ref={panelRef}
        id={panelId}
        inert={!isOpen}
        style={{ "--shift": `${shift}px` } as React.CSSProperties}
        className={cx(
          "absolute top-[calc(100%+10px)] left-0 z-1100 max-h-[calc(100vh-6rem)] w-max max-w-[min(44rem,calc(100vw-1.5rem))] overflow-hidden rounded-lg border border-white/10 bg-ink-raised shadow-dropdown transition-[opacity,visibility,translate] duration-220",
          isOpen
            ? "visible translate-x-(--shift) translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-2 opacity-0",
        )}
      >
        <div className="grid auto-cols-max grid-flow-col">
          {menu.columns.map((column, i) => (
            <div key={i} className={cx("px-2 pt-2 pb-2.5", i > 0 && "border-l border-white/7")}>
              {column.heading && <ColumnHeading heading={column.heading} />}
              <ul>
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      aria-current={isCurrent(link.href, pathname) ? "page" : undefined}
                      className="group flex items-center justify-between gap-2 rounded-md px-2.5 py-1.75 text-sm font-medium whitespace-nowrap text-white/62 transition-colors duration-150 hover:bg-white/7 hover:text-white focus-visible:bg-white/7 focus-visible:text-white focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                    >
                      <span>{link.label}</span>
                      <ArrowRightIcon
                        size={14}
                        className="shrink-0 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const headingClass =
  "mb-2.5 block border-b border-primary/20 pb-2 text-xs font-bold tracking-widest text-primary uppercase";

function ColumnHeading({ heading }: { heading: NonNullable<NavMenu["columns"][number]["heading"]> }) {
  if (typeof heading === "string") return <p className={headingClass}>{heading}</p>;
  return (
    <Link href={heading.href} className={cx(headingClass, "transition-opacity hover:opacity-75")}>
      {heading.label}
    </Link>
  );
}
