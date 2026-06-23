import { Check } from "lucide-react";
import { countries, CountryKey } from "@/data/countries";
import { plans, PlanKey } from "@/data/plans";
import { formatPrice } from "@/lib/utils";
import { Button } from "./ui";

export function PricingCard({ countryKey, planKey }: { countryKey: CountryKey; planKey: PlanKey }) {
  const country = countries[countryKey];
  const plan = plans[planKey];
  return <article className={`relative flex h-full flex-col rounded-2xl border bg-white p-7 shadow-sm ${plan.recommended ? "border-[#FFC400] ring-2 ring-[#FFC400]/25" : "border-[#E5E5E5]"}`}>
    {plan.recommended && <span className="absolute -top-3 right-5 rounded-full bg-[#FFC400] px-3 py-1 text-xs font-black text-[#090909]">RECOMMENDED</span>}
    <p className="text-sm font-extrabold uppercase tracking-wider text-[#8B8B8B]">{country.flag} {country.currency}</p>
    <h3 className="mt-3 font-heading text-2xl font-black">{plan.name}</h3>
    <p className="mt-3 min-h-12 text-sm leading-6 text-[#666]">{plan.description}</p>
    <p className="mt-6 text-xl font-black text-[#9a7400]">{formatPrice(country.plans[planKey], country.symbol, country.currency)}</p>
    <ul className="my-7 flex-1 space-y-3 text-sm">{plan.features.map((feature) => <li key={feature} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-[#c29200]" />{feature}</li>)}</ul>
    <Button href={`/order/${countryKey}/${planKey}`} className="w-full">Choose {plan.name}</Button>
  </article>;
}

export function PricingGrid({ countryKey }: { countryKey: CountryKey }) {
  return <div className="grid gap-6 lg:grid-cols-3">{(Object.keys(plans) as PlanKey[]).map((key) => <PricingCard key={key} countryKey={countryKey} planKey={key} />)}</div>;
}
