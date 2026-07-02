import type { CountryKey } from "@/data/countries";

export type MarketKey = CountryKey | "international";

const countryByRegion: Record<string, MarketKey> = {
  AU: "australia",
  CA: "canada",
  US: "usa",
};

const canadianTimeZones = new Set([
  "America/Atikokan",
  "America/Blanc-Sablon",
  "America/Cambridge_Bay",
  "America/Creston",
  "America/Dawson",
  "America/Dawson_Creek",
  "America/Edmonton",
  "America/Fort_Nelson",
  "America/Glace_Bay",
  "America/Goose_Bay",
  "America/Halifax",
  "America/Inuvik",
  "America/Iqaluit",
  "America/Moncton",
  "America/Rankin_Inlet",
  "America/Regina",
  "America/Resolute",
  "America/St_Johns",
  "America/Swift_Current",
  "America/Toronto",
  "America/Vancouver",
  "America/Whitehorse",
  "America/Winnipeg",
  "America/Yellowknife",
]);

const usTimeZones = new Set([
  "America/Adak",
  "America/Anchorage",
  "America/Boise",
  "America/Chicago",
  "America/Denver",
  "America/Detroit",
  "America/Indiana/Indianapolis",
  "America/Indiana/Knox",
  "America/Indiana/Marengo",
  "America/Indiana/Petersburg",
  "America/Indiana/Tell_City",
  "America/Indiana/Vevay",
  "America/Indiana/Vincennes",
  "America/Indiana/Winamac",
  "America/Juneau",
  "America/Kentucky/Louisville",
  "America/Kentucky/Monticello",
  "America/Los_Angeles",
  "America/Menominee",
  "America/Metlakatla",
  "America/New_York",
  "America/Nome",
  "America/North_Dakota/Beulah",
  "America/North_Dakota/Center",
  "America/North_Dakota/New_Salem",
  "America/Phoenix",
  "America/Sitka",
  "America/Yakutat",
  "Pacific/Honolulu",
]);

function marketFromLocale(locale: string): MarketKey | null {
  const region = locale.match(/[-_]([A-Z]{2})\b/i)?.[1]?.toUpperCase();
  return region ? countryByRegion[region] || null : null;
}

export function detectBrowserMarket(): MarketKey {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timeZone) {
    if (timeZone.startsWith("Australia/")) return "australia";
    if (canadianTimeZones.has(timeZone)) return "canada";
    if (usTimeZones.has(timeZone)) return "usa";
    return "international";
  }

  if (typeof navigator !== "undefined") {
    for (const locale of navigator.languages || [navigator.language]) {
      const market = marketFromLocale(locale);
      if (market) return market;
    }
  }

  return "international";
}

export function marketCountryKey(market: MarketKey): CountryKey {
  return market === "international" ? "usa" : market;
}
