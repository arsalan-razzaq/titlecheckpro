import type { Metadata } from "next";
import { LockKeyhole, Mail } from "lucide-react";
import { countries, CountryKey } from "@/data/countries";
import { FaqSection } from "./faq";
import { PageHero } from "./page-hero";
import { PricingGrid } from "./pricing";
import { ReportRequestForm } from "./report-form";
import { SectionHeading } from "./ui";

export function countryMetadata(countryKey: CountryKey): Metadata {
  const country = countries[countryKey];
  return {
    title: `Vehicle History Reports for ${country.name}`,
    description: `Request a ${country.name}-specific vehicle history report with local vehicle labels and USD pricing.`,
    alternates: { canonical: `/${countryKey}` },
  };
}

export function CountryPage({ countryKey }: { countryKey: CountryKey }) {
  const country = countries[countryKey];
  return <>
    <PageHero eyebrow={`${country.flag} USD report requests`} title={`${country.name} Vehicle History Reports`} description={`Enter vehicle details using labels configured for ${country.name}, compare packages and continue to secure Stripe checkout.`} />
    <section className="section bg-[#F5F5F5]"><div className="container"><SectionHeading title="Choose a report package" description="Prices are shown in USD and open the matching Stripe payment page." /><PricingGrid countryKey={countryKey} /></div></section>
    <section className="section"><div className="container grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-xs font-black uppercase tracking-[.2em] text-[#b48800]">Country-specific form</p><h2 className="mt-4 font-heading text-4xl font-black">Request your {country.name} report</h2><p className="mt-4 leading-7 text-[#666]">Your country is locked to this route. Complete the vehicle and customer details, select a package and agree to the policies.</p><div className="mt-8 space-y-4 text-sm"><p className="flex gap-3"><LockKeyhole className="size-5 text-[#b48800]" />Secure submission notice</p><p className="flex gap-3"><Mail className="size-5 text-[#b48800]" />Support: info@titlecheckpro.com</p></div></div><div className="rounded-2xl border border-[#E5E5E5] bg-white p-6 shadow-sm sm:p-8"><ReportRequestForm countryKey={countryKey} /></div></div></section>
    <section className="section bg-[#F5F5F5]"><div className="container"><SectionHeading title="Frequently Asked Questions" /><FaqSection country={country.name} /></div></section>
  </>;
}
