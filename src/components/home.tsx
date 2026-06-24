import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Car, CheckCircle2, ClipboardCheck, FileSearch, Gauge, Laptop, Mail, MapPinned, SearchCheck, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import { countries } from "@/data/countries";
import { siteConfig } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { Button, SectionHeading } from "./ui";

const services = [
  [Car, "Vehicle History", "Review core recorded events that may help explain a vehicle’s past."],
  [Gauge, "Vehicle Mileage", "Request available mileage and odometer-related history indicators."],
  [Wrench, "Vehicle Specifications", "Check identifying specifications supplied for the vehicle."],
  [ClipboardCheck, "Damage Report", "Look for available accident, collision and damage indicators."],
  [ShieldCheck, "Safety Ratings", "Review available safety and recall information in one place."],
  [SearchCheck, "VIN Validation", "Check standard VIN formatting while supporting regional workflows."],
] as const;

const reportCards = ["Accident History", "Title and Registration Status", "Odometer Reading", "Theft Records", "Insurance Information", "Safety and Recall Information"];

export function HeroSection() {
  return <section className="hero-grid min-h-[720px] text-white">
    <div className="container grid min-h-[720px] items-center gap-12 py-20 lg:grid-cols-[1.1fr_.9fr]">
      <div>
        <p className="mb-5 inline-flex rounded-full border border-[#FFC400]/35 bg-[#FFC400]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[.18em] text-[#FFC400]">Your Vehicle’s Trusted History Partner</p>
        <h1 className="font-heading text-5xl font-black leading-[.98] tracking-tight sm:text-6xl lg:text-7xl">Discover the car that <span className="text-[#FFC400]">fits you best</span></h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">Get detailed vehicle history information before you buy or sell a used vehicle.</p>
        <ul className="mt-7 flex flex-wrap gap-4 text-sm text-white/80">{["Accurate vehicle data", "Fast report delivery", "Secure ordering"].map((item) => <li key={item} className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#FFC400]" />{item}</li>)}</ul>
        <div className="mt-9 flex flex-wrap gap-3"><Button href="/pricing">Get Report Now</Button><Button href="/pricing" variant="outline">View Pricing</Button></div>
        <div className="mt-10 flex flex-wrap gap-3">{Object.entries(countries).map(([key, country]) => <Link className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold backdrop-blur hover:border-[#FFC400]" href={`/${key}`} key={key}>{country.flag} {country.name}</Link>)}</div>
      </div>
      <ReportPreview />
    </div>
  </section>;
}

function ReportPreview() {
  return <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/15 bg-white p-5 text-[#111] shadow-2xl">
    <div className="flex items-center justify-between border-b pb-4"><div><p className="text-xs font-bold text-[#8B8B8B]">SAMPLE INTERFACE</p><p className="font-heading text-xl font-black">Vehicle Report</p></div><span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">VIN checked</span></div>
    <div className="mt-5 rounded-2xl bg-[#111] p-5 text-white"><p className="text-xs text-white/50">VEHICLE OVERVIEW</p><p className="mt-2 text-xl font-black">2021 Example Sedan</p><div className="mt-5 h-2 rounded-full bg-white/10"><div className="h-2 w-4/5 rounded-full bg-[#FFC400]" /></div></div>
    <div className="mt-4 grid grid-cols-2 gap-3">{["Title status", "Mileage", "Damage", "Recalls"].map((item) => <div key={item} className="rounded-xl bg-[#F5F5F5] p-4"><BadgeCheck className="mb-2 size-5 text-[#b48800]" /><p className="text-xs font-bold">{item}</p><p className="mt-1 text-[11px] text-[#8B8B8B]">Review available data</p></div>)}</div>
  </div>;
}

export function HomeSections() {
  return <>
    <section className="bg-[#171717] text-white"><div className="container flex flex-col items-center justify-center gap-5 py-7 text-center sm:flex-row"><span className="font-heading text-xl font-black text-[#FFC400]">Buyer</span><span className="hidden h-5 w-px bg-white/20 sm:block" /><span className="font-heading text-xl font-black text-[#FFC400]">Seller</span><p className="max-w-2xl text-sm text-white/65">Trust starts with transparency. Check a vehicle’s history before completing a sale.</p></div></section>
    <section className="section bg-white"><div className="container"><SectionHeading title="What We Do" description="Vehicle insights that help you make informed decisions" /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{services.map(([Icon, title, description]) => <article key={title} className="group rounded-2xl border border-[#E5E5E5] p-6 transition hover:-translate-y-1 hover:border-[#FFC400] hover:shadow-lg"><div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-[#FFC400]"><Icon className="size-6" /></div><h3 className="font-heading text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-[#666]">{description}</p></article>)}</div></div></section>
    <section className="section bg-[#F5F5F5]"><div className="container"><SectionHeading eyebrow="Inside a report" title="Important vehicle information, clearly organized" /><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{reportCards.map((title, index) => <article key={title} className="rounded-2xl bg-white p-6 shadow-sm"><span className="font-heading text-4xl font-black text-[#FFC400]">0{index + 1}</span><h3 className="mt-5 font-heading text-xl font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-[#707070]">Review available records and indicators without digging through an overloaded interface.</p></article>)}</div></div></section>
    <section className="section dot-grid bg-[#090909] text-white"><div className="container grid items-center gap-14 lg:grid-cols-2"><div><p className="text-xs font-black uppercase tracking-[.2em] text-[#FFC400]">Why TitleCheckPro</p><h2 className="mt-4 font-heading text-4xl font-black">Built for clear decisions, not information overload.</h2><div className="mt-8 grid gap-4 sm:grid-cols-2">{["Accurate vehicle information", "Country-specific report forms", "Secure ordering process", "Fast report request submission", "Clear and simple interface", "Email support"].map((item) => <div className="flex gap-3 text-sm text-white/75" key={item}><CheckCircle2 className="size-5 shrink-0 text-[#FFC400]" />{item}</div>)}</div></div><div className="relative min-h-80"><div className="absolute inset-x-0 top-0 rounded-2xl border border-white/15 bg-[#222] p-5 shadow-2xl"><div className="flex items-center gap-2 border-b border-white/10 pb-4"><Laptop className="text-[#FFC400]" /><span className="font-bold">Desktop report preview</span></div><div className="mt-5 grid grid-cols-3 gap-3">{["Identity", "History", "Safety"].map((x) => <div key={x} className="rounded-lg bg-white/5 p-4 text-xs text-white/60">{x}<div className="mt-3 h-1.5 rounded bg-[#FFC400]" /></div>)}</div></div><div className="absolute bottom-0 right-5 w-40 rounded-2xl border-4 border-[#111] bg-white p-4 text-[#111] shadow-xl"><Smartphone className="mx-auto text-[#b48800]" /><p className="mt-5 text-center text-xs font-bold">Mobile-ready summary</p></div></div></div></section>
    <section className="section"><div className="container"><SectionHeading title="How It Works" description="Four straightforward steps from country selection to report delivery." /><div className="grid gap-5 md:grid-cols-4">{[["01", MapPinned, "Select your country"], ["02", FileSearch, "Enter vehicle details"], ["03", ClipboardCheck, "Choose a report package"], ["04", Mail, "Receive your vehicle report"]].map(([num, Icon, title]) => { const C = Icon as typeof MapPinned; return <article key={String(num)} className="relative rounded-2xl border border-[#E5E5E5] p-6"><span className="font-heading text-4xl font-black text-[#FFC400]">{String(num)}</span><C className="mt-8 size-8" /><h3 className="mt-4 font-heading text-lg font-black">{String(title)}</h3></article>; })}</div></div></section>
    <section className="section bg-[#F5F5F5]"><div className="container"><SectionHeading title="Choose Your Country" description="The selected country comes directly from the page URL, including labels and currency." /><div className="grid gap-6 md:grid-cols-3">{Object.entries(countries).map(([key, country]) => <article className="rounded-2xl border border-[#E5E5E5] bg-white p-7 text-center shadow-sm" key={key}><div className="text-6xl" aria-hidden="true">{country.flag}</div><h3 className="mt-5 font-heading text-2xl font-black">{country.name}</h3><p className="mt-2 text-sm text-[#777]">{country.currency} · {country.symbol}</p><Button href={`/${key}`} className="mt-6 w-full">Start Report</Button></article>)}</div></div></section>
    <section className="bg-[#FFC400] py-10"><div className="container grid gap-5 text-center sm:grid-cols-2 lg:grid-cols-4">{Object.entries(siteConfig.claims).map(([key, value]) => <div key={key}><p className="font-heading text-xl font-black">{value}</p></div>)}</div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="Development placeholders" title="Sample testimonial layout" description="These are clearly labeled samples and must be replaced with genuine, permissioned testimonials before launch." /><div className="grid gap-5 lg:grid-cols-3">{testimonials.map((item) => <blockquote key={item.quote} className="rounded-2xl border border-[#E5E5E5] p-6"><p className="text-lg leading-8">“{item.quote}”</p><footer className="mt-5 text-xs font-bold uppercase tracking-wider text-[#8B8B8B]">{item.attribution}</footer></blockquote>)}</div></div></section>
    <section className="section bg-[#F5F5F5]"><div className="container grid items-center gap-10 lg:grid-cols-2"><Image src="/images/vin-inspection.webp" width={1536} height={1024} alt="Vehicle inspector reviewing a VIN and digital vehicle report" className="aspect-[3/2] w-full rounded-2xl object-cover shadow-lg" /><div><h2 className="font-heading text-4xl font-black">Why Check a Vehicle Identification Number?</h2><p className="mt-5 leading-7 text-[#666]">Vehicle identification details can help connect a vehicle to available specifications and recorded events. Depending on the vehicle and location, a report may include registration information, accidents, mileage history, theft records, damage indicators and safety recalls. Not every data point is guaranteed to be available.</p></div></div></section>
    <section className="section"><div className="container"><div className="rounded-3xl bg-[#090909] px-7 py-12 text-center text-white sm:px-12"><h2 className="font-heading text-3xl font-black">Don’t take unnecessary risks. Check before you buy.</h2><Button href="/pricing" className="mt-7">Get Report Now</Button></div></div></section>
  </>;
}
