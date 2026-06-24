import type { Metadata } from "next";
import Image from "next/image";
import { Car, ClipboardCheck, Gauge, SearchCheck, ShieldCheck, Wrench } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui";

export const metadata: Metadata = { title: "Our Services", description: "Explore vehicle history, mileage, specifications, damage, safety and VIN validation services.", alternates: { canonical: "/services" } };
const services = [
  [Car, "Vehicle History", "A structured request for available identity, registration, title and recorded event information."],
  [Gauge, "Mileage Review", "Available odometer readings and rollback indicators can be included depending on records."],
  [Wrench, "Specifications", "Vehicle make, model, year, engine and identifying specification information."],
  [ClipboardCheck, "Damage Indicators", "Accident, collision, fire, water and other available damage-related indicators."],
  [ShieldCheck, "Safety Information", "Available safety recall information and related vehicle safety details."],
  [SearchCheck, "VIN Validation", "Standard 17-character VIN formatting checks plus flexible regional chassis workflows."],
] as const;
export default function ServicesPage() { return <><PageHero title="Vehicle information services" description="Practical vehicle report request categories designed for buyers and sellers across three supported countries." /><section className="section"><div className="container"><SectionHeading title="What you can request" /><Image src="/images/services-diagnostics.webp" width={1536} height={1024} alt="Automotive technician running vehicle diagnostics and reviewing report data" className="mb-10 aspect-[16/7] w-full rounded-2xl object-cover shadow-lg" /><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{services.map(([Icon, title, text]) => <article key={title} className="rounded-2xl border border-[#E5E5E5] p-7"><Icon className="size-10 rounded-lg bg-[#FFC400] p-2" /><h2 className="mt-6 font-heading text-2xl font-black">{title}</h2><p className="mt-3 leading-7 text-[#666]">{text}</p></article>)}</div><p className="mt-10 rounded-xl bg-[#F5F5F5] p-5 text-sm text-[#666]">Data availability varies by vehicle and location. TitleCheckPro does not guarantee that every report category will contain a record.</p></div></section></>; }
