"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRightIcon, ChevronDownIcon, CloseIcon } from "@/components/ui/icons";
import { contactLink, homeLink, primaryNav, type NavLink } from "@/content/navigation";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { isCurrent } from "./nav-utils";

type MobileNavProps = {
  open: boolean;
  /** `restoreFocus` returns focus to the menu button (Escape / close / overlay, not link clicks). */
  onClose: (restoreFocus: boolean) => void;
};

/** Slide-in mobile navigation drawer (<1024px) with nested accordions. */
export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose(true);
    const onResize = () => matchMedia("(min-width: 1024px)").matches && onClose(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => onClose(true)}
        className={cn(
          "fixed inset-0 z-1300 bg-black/60 transition-opacity duration-350",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <nav
        ref={drawerRef}
        id="mobile-nav"
        aria-label="Mobile navigation"
        inert={!open}
        onClick={(e) => (e.target as Element).closest("a") && onClose(false)}
        className={cn(
          "fixed top-0 left-0 z-1400 flex h-dvh w-[min(85vw,380px)] flex-col overflow-hidden bg-white transition-[translate,visibility] duration-350 ease-in-out",
          open ? "visible translate-x-0 shadow-drawer" : "invisible -translate-x-full",
        )}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-ink px-5 py-4">
          <Link href="/" aria-label={`${site.name} Home`}>
            <Image
              src={site.logo}
              alt={site.name}
              width={301}
              height={81}
              className="h-12 w-auto max-w-37.5 object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={() => onClose(true)}
            aria-label="Close navigation menu"
            className="flex rounded-md p-1.5 text-white/75 transition-colors hover:bg-white/10 hover:text-white"
          >
            <CloseIcon size={22} />
          </button>
        </div>

        {/* Keyed on `open` so every accordion starts collapsed each time the drawer opens. */}
        <div key={String(open)} className="flex flex-1 flex-col overflow-y-auto overscroll-contain pt-2 pb-8">
          <Link
            href={homeLink.href}
            aria-current={pathname === "/" ? "page" : undefined}
            className="flex w-full items-center justify-between border-b border-line px-5 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-primary/4 hover:text-primary"
          >
            {homeLink.label}
          </Link>

          {primaryNav.map((menu) => (
            <div key={menu.id} className="border-b border-line">
              <Accordion
                label={menu.label}
                buttonClassName="px-5 py-3.5 text-base font-semibold text-ink hover:bg-primary/4 hover:text-primary"
                panelClassName="bg-surface"
              >
                {menu.columns.map((column, i) =>
                  column.heading ? (
                    <div key={i} className="border-t border-black/6 first:border-t-0">
                      <Accordion
                        label={typeof column.heading === "string" ? column.heading : column.heading.label}
                        chevronSize={12}
                        buttonClassName="py-2.5 pr-5 pl-6 text-sm font-semibold text-body hover:bg-black/3 hover:text-ink"
                        panelClassName="bg-surface-2"
                      >
                        <LeafLinks links={column.links} pathname={pathname} />
                      </Accordion>
                    </div>
                  ) : (
                    <LeafLinks key={i} links={column.links} pathname={pathname} />
                  ),
                )}
              </Accordion>
            </div>
          ))}

          <ButtonLink href={contactLink.href} className="mx-5 mt-6">
            {contactLink.label}
          </ButtonLink>
        </div>
      </nav>
    </>
  );
}

type AccordionProps = {
  label: string;
  children: ReactNode;
  buttonClassName: string;
  panelClassName: string;
  chevronSize?: number;
};

function Accordion({ label, children, buttonClassName, panelClassName, chevronSize = 14 }: AccordionProps) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();

  return (
    <>
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((v) => !v)}
        className={cn(
          "flex w-full items-center justify-between text-left transition-colors",
          buttonClassName,
        )}
      >
        {label}
        <ChevronDownIcon
          size={chevronSize}
          className={cn(
            "shrink-0 text-muted transition-[rotate,color] duration-250",
            expanded && "rotate-180 text-primary",
          )}
        />
      </button>
      <div
        id={panelId}
        inert={!expanded}
        className={cn(
          "grid transition-[grid-template-rows] duration-300",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className={cn("min-h-0 overflow-hidden", panelClassName)}>{children}</div>
      </div>
    </>
  );
}

function LeafLinks({ links, pathname }: { links: NavLink[]; pathname: string }) {
  return links.map((link) => (
    <Link
      key={link.href + link.label}
      href={link.href}
      aria-current={isCurrent(link.href, pathname) ? "page" : undefined}
      className="flex items-center gap-2 border-t border-black/4 py-2.25 pr-5 pl-7 text-sm font-medium text-body transition-colors first:border-t-0 hover:bg-primary/4 hover:text-primary"
    >
      <ArrowRightIcon size={12} className="shrink-0 text-primary" />
      <span>{link.label}</span>
    </Link>
  ));
}
