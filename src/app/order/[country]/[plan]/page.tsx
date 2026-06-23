import type { Metadata } from "next";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { ReportRequestForm } from "@/components/report-form";
import { countries, isCountryKey } from "@/data/countries";
import { isPlanKey, plans } from "@/data/plans";
import { formatPrice } from "@/lib/utils";

type Props = { params: Promise<{ country: string; plan: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country, plan } = await params;
  if (!isCountryKey(country) || !isPlanKey(plan)) return { title: "Order not found" };
  return { title: `${plans[plan].name} for ${countries[country].name}`, description: `Submit a ${plans[plan].name} enquiry for a vehicle in ${countries[country].name}.`, robots: { index: false, follow: true } };
}

export default async function OrderPage({ params }: Props) {
  const { country, plan } = await params;
  if (!isCountryKey(country) || !isPlanKey(plan)) notFound();
  const countryData = countries[country];
  const planData = plans[plan];
  return <><PageHero eyebrow={`${countryData.flag} Secure enquiry`} title={`${planData.name} — ${countryData.name}`} description="Review your selection, complete the customer and vehicle fields, and submit an order enquiry. No payment is processed at this stage." /><section className="section bg-[#F5F5F5]"><div className="container grid gap-8 lg:grid-cols-[1.35fr_.65fr]"><div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8"><h2 className="font-heading text-2xl font-black">Customer and vehicle details</h2><div className="mt-7"><ReportRequestForm countryKey={country} defaultPlan={plan} redirectOnSuccess /></div></div><aside className="h-fit rounded-2xl bg-[#111] p-7 text-white lg:sticky lg:top-28"><p className="text-xs font-black uppercase tracking-[.18em] text-[#FFC400]">Order summary</p><h2 className="mt-4 font-heading text-3xl font-black">{planData.name}</h2><p className="mt-2 text-white/60">{countryData.flag} {countryData.name} · {countryData.currency}</p><p className="mt-7 text-2xl font-black text-[#FFC400]">{formatPrice(countryData.plans[plan], countryData.symbol, countryData.currency)}</p><ul className="mt-7 space-y-3 text-sm text-white/65">{planData.features.slice(0, 6).map((feature) => <li className="flex gap-2" key={feature}><ShieldCheck className="size-4 shrink-0 text-[#FFC400]" />{feature}</li>)}</ul><div className="mt-7 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/65"><LockKeyhole className="mb-3 text-[#FFC400]" />Secure payment notice: gateway credentials have not been supplied. Submitting creates an enquiry and temporary reference only.</div></aside></div></section></>;
}
