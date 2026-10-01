"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { cx } from "@/lib/cx";
import { site } from "@/lib/site";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";

/** Fixed top navbar: logo, desktop navigation and the mobile drawer toggle. */
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobile = useCallback((restoreFocus: boolean) => {
    setMobileOpen(false);
    // The button is hidden while the drawer is open; focus it once it is visible again.
    if (restoreFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, []);

  // Close the drawer after navigating (adjusting state during render, per React docs).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <>
      <header
        className={cx(
          "fixed inset-x-0 top-0 z-1000 min-h-nav border-b border-white/10 py-4 backdrop-blur-[10px] transition-[background-color,box-shadow] duration-300",
          scrolled ? "bg-ink/98 shadow-md" : "bg-ink/95",
        )}
      >
        <Container className="flex min-h-13.75 items-center justify-between">
          <Link href="/" aria-label={`${site.name} Home`} className="flex shrink-0 items-center">
            <Image
              src={site.logo}
              alt={site.name}
              width={150}
              height={40}
              loading="eager"
              fetchPriority="high"
              className="h-12 w-auto max-w-37.5 object-contain"
            />
          </Link>

          <DesktopNav />

          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
            className={cx(
              "relative z-1201 ml-auto flex size-10 shrink-0 flex-col justify-center gap-1.25 rounded-md p-2 transition-colors hover:bg-white/10 lg:hidden",
              mobileOpen && "invisible opacity-0",
            )}
          >
            <span className="block h-0.5 w-5.5 rounded-xs bg-white" />
            <span className="block h-0.5 w-5.5 rounded-xs bg-white" />
            <span className="block h-0.5 w-5.5 rounded-xs bg-white" />
          </button>
        </Container>
      </header>

      <MobileNav open={mobileOpen} onClose={closeMobile} />
    </>
  );
}
