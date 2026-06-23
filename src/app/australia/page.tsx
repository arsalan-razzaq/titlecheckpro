import { CountryPage, countryMetadata } from "@/components/country-page";
export const metadata = countryMetadata("australia");
export default function AustraliaPage() { return <CountryPage countryKey="australia" />; }
