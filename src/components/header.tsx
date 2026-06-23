"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { countries, isCountryKey } from "@/data/countries";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "./ui";

export function TopBar() {
  return <div className="bg-[#090909] text-xs text-white/75">
    <div className="container flex min-h-9 flex-wrap items-center justify-between gap-2 py-2">
      <span>Your Needs, Our Priority — 24/7 Service!</span>
      <a className="flex items-center gap-2 hover:text-[#FFC400]" href={`mailto:${siteConfig.email}`}><Mail className="size-3.5" />{siteConfig.email}</a>
      {siteConfig.phone && <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>}
    </div>
  </div>;
}

export function CountrySelector() {
  const pathname = usePathname();
  const router = useRouter();
  const parts = pathname.split("/");
  const segment = parts[1] === "order" ? parts[2] : parts[1];
  const selected = isCountryKey(segment) ? segment : "";
  return <label className="sr-only">Select country
    <select aria-label="Select country" value={selected} onChange={(event) => event.target.value && router.push(`/${event.target.value}`)} className="min-h-11 rounded-lg border border-[#ddd] bg-white px-3 text-sm font-semibold text-[#111] focus:outline-2 focus:outline-[#FFC400]">
      <option value="">Country</option>
      {Object.entries(countries).map(([key, country]) => <option key={key} value={key}>{country.flag} {country.shortName}</option>)}
    </select>
  </label>;
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return <>
    <TopBar />
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="container flex min-h-20 items-center gap-5">
        <Link href="/" aria-label="TitleCheckPro home" className="shrink-0">
          <Image src="/logo/titlecheckpro-logo.svg" width={216} height={60} alt="TitleCheckPro Vehicle History Reports" priority />
        </Link>
        <nav className="ml-auto hidden items-center gap-4 xl:flex" aria-label="Primary navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href} className={cn("text-[13px] font-bold hover:text-[#b48800]", pathname === item.href && "text-[#a67d00]")}>{item.label}</Link>)}
        </nav>
        <div className="ml-auto hidden items-center gap-3 sm:flex xl:ml-0">
          <CountrySelector /><Button href="/pricing">Get Report</Button>
        </div>
        <button aria-label="Open navigation menu" aria-expanded={open} onClick={() => setOpen(!open)} className="ml-auto rounded-lg p-2 hover:bg-[#F5F5F5] xl:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && <div className="border-t bg-white px-4 py-5 xl:hidden">
        <nav className="container grid gap-1" aria-label="Mobile navigation">
          {navigation.map((item) => <Link onClick={() => setOpen(false)} key={item.href} href={item.href} className={cn("rounded-lg px-3 py-3 text-sm font-bold hover:bg-[#F5F5F5]", pathname === item.href && "bg-[#FFC400]")}>{item.label}</Link>)}
          <div className="mt-3 flex gap-3"><CountrySelector /><Button href="/pricing" className="flex-1">Get Report</Button></div>
        </nav>
      </div>}
    </header>
  </>;
}
