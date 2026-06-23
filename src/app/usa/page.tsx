import { CountryPage, countryMetadata } from "@/components/country-page";
export const metadata = countryMetadata("usa");
export default function UsaPage() { return <CountryPage countryKey="usa" />; }
