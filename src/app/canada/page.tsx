import { CountryPage, countryMetadata } from "@/components/country-page";
export const metadata = countryMetadata("canada");
export default function CanadaPage() { return <CountryPage countryKey="canada" />; }
