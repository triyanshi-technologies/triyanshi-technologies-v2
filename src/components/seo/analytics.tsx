import Script from "next/script";
import { site } from "@/lib/site";

const { gaId, clarityId } = site.analytics;
const liveHost = new URL(site.url).hostname;

/*
 * GA4 + Microsoft Clarity bootstrap. Runs only on the live domain, so local
 * builds, previews and test runs never send visits to the real analytics.
 * gtag queues events in dataLayer until its library arrives.
 */
const bootstrap = `if (location.hostname === "${liveHost}") {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  gtag("config", "${gaId}");
  var ga = document.createElement("script");
  ga.async = true;
  ga.src = "https://www.googletagmanager.com/gtag/js?id=${gaId}";
  document.head.appendChild(ga);

  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", "${clarityId}");
}`;

/**
 * Google Analytics 4 + Microsoft Clarity, loaded once the page has finished
 * loading (lazyOnload) so neither competes with the page's own CSS, HTML and
 * hero image for bandwidth (the legacy site loaded them in <head>).
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <Script id="analytics" strategy="lazyOnload">
      {bootstrap}
    </Script>
  );
}
