import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { site } from "@/lib/site";

const { gaId, clarityId } = site.analytics;

/*
 * Who gets tracked is decided at build time:
 * - GA4 + Clarity: real visitors only — the production deployment on Vercel
 *   (VERCEL_ENV=production), or any build with ENABLE_ANALYTICS=true (e.g. a
 *   non-Vercel host). Preview deployments and local builds stay out of the reports.
 * - Vercel Web Analytics + Speed Insights: every Vercel deployment (their
 *   scripts are served from /_vercel/*, which only exists there; Vercel
 *   reports production and preview separately).
 */
const trackVisitors = process.env.VERCEL_ENV === "production" || process.env.ENABLE_ANALYTICS === "true";
const onVercel = process.env.VERCEL === "1";

/**
 * Site analytics (production builds only). GA4 and Clarity use the standard
 * snippets via next/script `lazyOnload`: they load once the page has finished
 * loading, so they never compete with the page's own CSS, HTML and hero image.
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;
  return (
    <>
      {trackVisitors && (
        <>
          {/* Google tag (gtag.js) */}
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="lazyOnload" />
          <Script id="gtag-init" strategy="lazyOnload">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
          </Script>

          {/* Microsoft Clarity */}
          <Script id="clarity-init" strategy="lazyOnload">
            {`(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${clarityId}");`}
          </Script>
        </>
      )}
      {onVercel && (
        <>
          <VercelAnalytics />
          <SpeedInsights />
        </>
      )}
    </>
  );
}
