import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { PricingGrid } from "@/components/pricing";
import { SectionHeading } from "@/components/ui";
import { countries, CountryKey } from "@/data/countries";

export const metadata: Metadata = { title: "Pricing", description: "Compare TitleCheckPro Basic, Standard and Premium report request packages by country.", alternates: { canonical: "/pricing" } };
export default function PricingPage() {
  return <><PageHero title="Simple, country-specific packages" description="Compare report contents now. Final prices remain centrally configured and will be published when supplied by the client." /><section className="section bg-[#F5F5F5]"><div className="container space-y-20">{(Object.keys(countries) as CountryKey[]).map((key) => <div key={key} id={key}><SectionHeading title={`${countries[key].flag} ${countries[key].name}`} description={`${countries[key].currency} pricing — no placeholder zero values.`} /><PricingGrid countryKey={key} /></div>)}</div></section></>;
}
