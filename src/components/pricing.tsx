import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { countries, CountryKey } from "@/data/countries";
import { plans, PlanKey } from "@/data/plans";
import { cn, formatPrice } from "@/lib/utils";
import { Button } from "./ui";

export function PricingCard({ countryKey, planKey, marketLabel }: { countryKey: CountryKey; planKey: PlanKey; marketLabel?: string }) {
  const country = countries[countryKey];
  const plan = plans[planKey];
  const price = country.plans[planKey];
  const featurePreview = plan.features.slice(0, planKey === "basic" ? 6 : 7);

  return <article className={cn(
    "relative flex h-full min-h-[560px] flex-col rounded-lg border bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl sm:p-7",
    plan.recommended ? "border-[#d8a600] shadow-[#111]/10 ring-2 ring-[#FFC400]/35" : "border-[#dedede]",
  )}>
    {plan.recommended && <div className="absolute right-5 top-0 -translate-y-1/2 rounded-md bg-[#111] px-3 py-1 text-xs font-black uppercase text-[#FFC400]">Best value</div>}
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-xs font-black uppercase text-[#777]">{marketLabel || `${country.flag} ${country.currency}`}</p>
        <h3 className="mt-3 font-heading text-2xl font-black text-[#090909]">{plan.name}</h3>
      </div>
      <div className={cn("grid size-11 shrink-0 place-items-center rounded-lg", plan.recommended ? "bg-[#FFC400] text-[#090909]" : "bg-[#F1F1F1] text-[#333]")}>
        <ShieldCheck className="size-5" aria-hidden="true" />
      </div>
    </div>
    <p className="mt-4 min-h-14 text-sm leading-6 text-[#666]">{plan.description}</p>
    <div className="mt-6 border-y border-[#ececec] py-5">
      <p className="font-heading text-4xl font-black text-[#090909]">{formatPrice(price, country.symbol, country.currency).replace(` ${country.currency}`, "")}</p>
      <p className="mt-1 text-xs font-bold uppercase text-[#777]">{country.currency} one-time report request</p>
    </div>
    <ul className="my-6 flex-1 space-y-3 text-sm text-[#333]">{featurePreview.map((feature) => <li key={feature} className="flex gap-2.5 leading-6"><Check className="mt-1 size-4 shrink-0 text-[#b48800]" aria-hidden="true" /><span>{feature}</span></li>)}</ul>
    <Button href={`/order/${countryKey}/${planKey}`} variant={plan.recommended ? "primary" : "dark"} className="group w-full justify-between">
      <span>Choose package</span>
      <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
    </Button>
  </article>;
}

export function PricingGrid({ countryKey, marketLabel }: { countryKey: CountryKey; marketLabel?: string }) {
  return <div className="grid items-stretch gap-6 lg:grid-cols-3">{(Object.keys(plans) as PlanKey[]).map((key) => <PricingCard key={key} countryKey={countryKey} planKey={key} marketLabel={marketLabel} />)}</div>;
}
