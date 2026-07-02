"use client";

import { useEffect, useState } from "react";
import { countries } from "@/data/countries";
import { detectBrowserMarket, marketCountryKey, type MarketKey } from "@/lib/location";
import { PricingGrid } from "./pricing";

export function LocationAwarePricing() {
  const [market, setMarket] = useState<MarketKey | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => setMarket(detectBrowserMarket()), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!market) {
    return <div className="rounded-lg border border-[#e0e0e0] bg-white p-6 shadow-sm">
      <p className="text-xs font-black uppercase text-[#b48800]">Detected pricing</p>
      <h2 className="mt-3 font-heading text-4xl font-black text-[#090909]">Detecting your location</h2>
      <p className="mt-3 leading-7 text-[#666]">Your country-specific report options will appear automatically.</p>
    </div>;
  }

  const countryKey = marketCountryKey(market);
  const country = countries[countryKey];
  const isInternational = market === "international";
  const title = isInternational ? "USD pricing" : `${country.flag} ${country.name}`;
  const description = isInternational
    ? "Your location is outside Australia, Canada and the United States, so USD pricing is shown."
    : `Showing ${country.name} form links and USD pricing for your location.`;

  return <div>
    <div className="mb-8 rounded-lg border border-[#e0e0e0] bg-white p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-xs font-black uppercase text-[#b48800]">Detected pricing</p>
        <h2 className="mt-3 font-heading text-4xl font-black text-[#090909]">{title}</h2>
        <p className="mt-3 max-w-2xl leading-7 text-[#666]">{description}</p>
      </div>
      <div className="mt-6 grid gap-3 border-t border-[#ededed] pt-5 text-sm text-[#555] md:grid-cols-3">
        <p><strong className="text-[#111]">Currency:</strong> USD checkout</p>
        <p><strong className="text-[#111]">Delivery:</strong> submitted after request review</p>
        <p><strong className="text-[#111]">Payment:</strong> Stripe secure checkout</p>
      </div>
    </div>
    <PricingGrid countryKey={countryKey} marketLabel={isInternational ? "USD" : undefined} />
  </div>;
}
