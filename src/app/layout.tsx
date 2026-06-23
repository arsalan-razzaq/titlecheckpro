import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "TitleCheckPro | Vehicle History Reports for Australia, Canada and USA", template: "%s | TitleCheckPro" },
  description: "Request country-specific vehicle history information before buying or selling a used vehicle in Australia, Canada or the USA.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: { type: "website", siteName: siteConfig.name, title: "TitleCheckPro Vehicle History Reports", description: siteConfig.tagline, url: siteConfig.url },
  twitter: { card: "summary_large_image", title: "TitleCheckPro Vehicle History Reports", description: siteConfig.tagline },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteConfig.url, email: siteConfig.email };
  return <html lang="en"><body><Header /><main>{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
