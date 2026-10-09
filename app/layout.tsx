import type { Metadata, Viewport } from "next";
import "@fontsource-variable/lora/wght-italic.css";
import "@fontsource/dm-mono/400.css";
import "lenis/dist/lenis.css";
import "@/styles/globals.css";

import { site } from "@/content/site";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Analytics } from "@/components/Analytics";
import { TvNoise } from "@/components/motion/TvNoise";
import { SoundFx } from "@/components/motion/SoundFx";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "AURA — Websites and software for businesses that have outgrown their presence",
    template: "%s — AURA",
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "AURA",
    locale: "en_ZA",
    url: site.url,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

/** Runs before paint: enables reveal states only when motion is welcome. */
const motionGate = `try{if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion')}}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "AURA",
  description: site.description,
  url: site.url,
  email: site.email,
  founder: { "@type": "Person", name: site.founder },
  address: { "@type": "PostalAddress", addressLocality: "Johannesburg", addressCountry: "ZA" },
  areaServed: "ZA",
  knowsAbout: ["Web design", "Web development", "Next.js", "Custom business software", "SEO"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        {/* Satoshi (Fontshare). To self-host, see README → Fonts. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <SmoothScroll>
          <Navigation />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <TvNoise />
        <SoundFx />
        <Analytics />
      </body>
    </html>
  );
}
