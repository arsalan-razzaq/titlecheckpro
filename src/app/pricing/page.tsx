import type { Metadata } from "next";
import { LocationAwarePricing } from "@/components/location-aware-pricing";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Compare TitleCheckPro Basic, Standard and Premium report request packages with location-aware USD pricing.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return <>
    <PageHero title="Simple, country-specific packages" description="Compare Basic, Standard and Premium report requests with location-aware USD pricing." />
    <section className="section bg-[#F5F5F5]"><div className="container"><LocationAwarePricing /></div></section>
  </>;
}
