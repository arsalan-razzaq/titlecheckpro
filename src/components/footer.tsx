import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";

export function Footer() {
  return <footer className="bg-[#090909] text-white">
    <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <Image src="/logo/titlecheckpro-logo.svg" width={250} height={70} alt="TitleCheckPro" />
        <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">Clear, country-specific vehicle report request tools for buyers and sellers in Australia, Canada and the United States.</p>
        <div className="mt-5 flex gap-3 text-white/45" aria-label="Social media placeholders">
          <span title="Facebook link coming soon"><Facebook /></span><span title="Instagram link coming soon"><Instagram /></span><span title="LinkedIn link coming soon"><Linkedin /></span>
        </div>
      </div>
      <div><h3 className="font-heading text-lg font-black text-[#FFC400]">Quick links</h3><ul className="mt-4 space-y-2 text-sm text-white/65">{navigation.slice(0, 5).map((item) => <li key={item.href}><Link className="hover:text-white" href={item.href}>{item.label}</Link></li>)}</ul></div>
      <div><h3 className="font-heading text-lg font-black text-[#FFC400]">Location Based</h3><p className="mt-4 text-sm leading-6 text-white/65">Your report country is selected automatically. Other countries continue with USD checkout.</p><Link className="mt-4 inline-flex text-sm font-bold text-[#FFC400] hover:text-white" href="/pricing">View detected pricing</Link></div>
      <div><h3 className="font-heading text-lg font-black text-[#FFC400]">Contact</h3><a className="mt-4 flex items-center gap-2 text-sm text-white/70 hover:text-white" href={`mailto:${siteConfig.email}`}><Mail className="size-4 text-[#FFC400]" />{siteConfig.email}</a><p className="mt-3 text-sm text-white/50">{siteConfig.availability}</p></div>
    </div>
    <div className="border-t border-white/10">
      <div className="container flex flex-col gap-3 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} TitleCheckPro. All rights reserved.</p>
        <div className="flex flex-wrap gap-4"><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms & Conditions</Link><Link href="/refund-dispute-policy">Refund & Dispute Policy</Link></div>
      </div>
    </div>
  </footer>;
}
