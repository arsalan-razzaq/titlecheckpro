"use client";

import { useEffect, useState } from "react";
import { countries } from "@/data/countries";
import { detectBrowserMarket, marketCountryKey, type MarketKey } from "@/lib/location";
import { Button } from "./ui";

export function DetectedCountryCta({ compact = false }: { compact?: boolean }) {
  const [market, setMarket] = useState<MarketKey | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => setMarket(detectBrowserMarket()), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!market) {
    return <div className={compact ? "mt-10 text-sm text-white/70" : "text-center text-sm text-[#666]"}>Detecting your location...</div>;
  }

  const countryKey = marketCountryKey(market);
  const country = countries[countryKey];
  const isInternational = market === "international";
  const label = isInternational ? "USD report request" : `${country.flag} ${country.name} report`;
  const description = isInternational
    ? "Your location is outside Australia, Canada and the United States, so USD checkout will be shown."
    : `Your ${country.name} form and USD checkout are selected automatically.`;

  if (compact) {
    return <div className="mt-10 inline-flex flex-wrap items-center gap-3 rounded-lg border border-white/15 bg-white/5 p-3 backdrop-blur">
      <span className="px-2 text-sm font-bold text-white/85">{label}</span>
      <Button href={`/${countryKey}`}>Start Report</Button>
    </div>;
  }

  return <article className="mx-auto max-w-xl rounded-2xl border border-[#E5E5E5] bg-white p-7 text-center shadow-sm">
    <div className="text-6xl" aria-hidden="true">{isInternational ? "$" : country.flag}</div>
    <h3 className="mt-5 font-heading text-2xl font-black">{label}</h3>
    <p className="mt-3 text-sm leading-6 text-[#666]">{description}</p>
    <Button href={`/${countryKey}`} className="mt-6 w-full sm:w-auto">Start Report</Button>
  </article>;
}
