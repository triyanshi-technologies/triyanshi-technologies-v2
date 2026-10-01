/*
 * Animate-on-scroll driver, as an inline script at the end of <body>.
 *
 * It runs as soon as the HTML is parsed, without waiting for the React bundle
 * to download and hydrate, so content in the first viewport (often the LCP
 * element) is revealed immediately instead of seconds later on slow phones.
 *
 * One IntersectionObserver marks [data-reveal] elements with `data-revealed`
 * when they scroll into view (once). A MutationObserver picks up elements
 * added later (client-side navigation, tab switches). With reduced motion
 * everything is revealed straight away.
 */
const script = `(() => {
  const SELECTOR = "[data-reveal]:not([data-revealed])";
  const reveal = (el) => el.setAttribute("data-revealed", "");
  const watch = (fn) => new MutationObserver(fn).observe(document.body, { childList: true, subtree: true });

  if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    const revealAll = () => document.querySelectorAll(SELECTOR).forEach(reveal);
    revealAll();
    watch(revealAll);
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        reveal(entry.target);
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
  );
  const scan = () => document.querySelectorAll(SELECTOR).forEach((el) => io.observe(el));
  scan();
  let frame = 0;
  watch(() => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(scan);
  });
})();`
  .replace(/\n\s*/g, "")
  .trim();

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
