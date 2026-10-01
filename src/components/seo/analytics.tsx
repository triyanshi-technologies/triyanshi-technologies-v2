import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Google Analytics 4 + Microsoft Clarity.
 * Loaded after hydration so neither blocks first paint (the legacy site loaded them in <head>).
 */
export function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;

  const { gaId, clarityId } = site.analytics;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
      <Script id="clarity-init" strategy="lazyOnload">
        {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${clarityId}");`}
      </Script>
    </>
  );
}
