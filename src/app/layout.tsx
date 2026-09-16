import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { GA4_MEASUREMENT_ID } from "@/lib/analytics";
import { Suspense } from "react";
import { AttributionBoot } from "@/components/attribution-boot";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "SmartComms NZ | IP paging, bell & PA system guidance for New Zealand",
    template: "%s | SmartComms NZ",
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SmartComms NZ - IP paging, PA, bell and intercom planning for New Zealand" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ" className={inter.variable}>
      <body className="flex min-h-screen flex-col" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        {GA4_MEASUREMENT_ID ? (
          <>
            {/* Internal-only routes must never load analytics or leak into browser history-linked URLs. */}
            <script
              dangerouslySetInnerHTML={{
                __html: `if(!location.pathname.startsWith('/insights')){var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}';document.head.appendChild(s);window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_MEASUREMENT_ID}',{anonymize_ip:true});}`,
              }}
            />
          </>
        ) : null}
        <Suspense>
          <AttributionBoot />
        </Suspense>
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
