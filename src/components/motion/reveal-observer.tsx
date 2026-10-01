"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = "[data-reveal]:not([data-revealed])";

/** Event fired on an element when it is revealed (used by e.g. rolling counters). */
export const REVEAL_EVENT = "reveal";

/**
 * Single IntersectionObserver for every [data-reveal] element on the page.
 * Elements are revealed once, then unobserved. Elements added later (tab
 * switches, client navigation) are picked up by a MutationObserver.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (el: Element) => {
      el.setAttribute("data-revealed", "");
      el.dispatchEvent(new CustomEvent(REVEAL_EVENT));
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !("IntersectionObserver" in window)) {
      const revealAll = () => document.querySelectorAll(SELECTOR).forEach(reveal);
      revealAll();
      const mutations = new MutationObserver(revealAll);
      mutations.observe(document.body, { childList: true, subtree: true });
      return () => mutations.disconnect();
    }

    const intersections = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
    );

    const observeAll = () => document.querySelectorAll(SELECTOR).forEach((el) => intersections.observe(el));
    observeAll();

    // Batch bursts of DOM changes into one re-scan per frame.
    let frame = 0;
    const mutations = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(observeAll);
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      intersections.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);

  return null;
}
