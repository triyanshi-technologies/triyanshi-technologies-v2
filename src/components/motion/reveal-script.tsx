/*
 * Animate-on-scroll driver, as an inline script at the end of <body>.
 *
 * It runs as soon as the HTML is parsed, without waiting for the React bundle
 * to download and hydrate, so content in the first viewport (often the LCP
 * element) is revealed immediately instead of seconds later on slow phones.
 *
 * One IntersectionObserver marks [data-reveal] elements and <RevealItem>s
 * ([data-reveal-item]) with `data-revealed` when they scroll into view (once).
 * Items that come into view in the same batch (a row of cards, a carousel
 * slide) get --reveal-delay 0, 100, 200ms… so they fade in one by one, in
 * reading order. A MutationObserver picks up elements added later (client-side
 * navigation, tab switches). With reduced motion everything is revealed at once.
 */
const script = `(() => {
  const SELECTOR = "[data-reveal]:not([data-revealed]),[data-reveal-item]:not([data-revealed])";
  const STAGGER_MS = 100;
  const MAX_STEPS = 6;
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
      let step = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        if (el.hasAttribute("data-reveal-item")) {
          el.style.setProperty("--reveal-delay", Math.min(step++, MAX_STEPS) * STAGGER_MS + "ms");
        }
        reveal(el);
        io.unobserve(el);
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
