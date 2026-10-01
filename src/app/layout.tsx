import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { RevealScript } from "@/components/motion/reveal-script";
import { Analytics } from "@/components/seo/analytics";
import { JsonLd, organizationSchema } from "@/components/seo/json-ld";
import { site } from "@/lib/site";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  verification: { google: site.googleSiteVerification },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Without JS nothing would ever be revealed — show it all. */}
        <noscript>
          <style>{`[data-reveal],[data-reveal-item]{opacity:1!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-2000 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealScript />
        <JsonLd data={organizationSchema} />
        <Analytics />
      </body>
    </html>
  );
}
