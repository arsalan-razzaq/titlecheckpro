import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = { title: "Contact Us", description: "Contact TitleCheckPro by email or submit a secure enquiry.", alternates: { canonical: "/contact" } };
export default function ContactPage() { return <><PageHero title="Contact TitleCheckPro" description="Questions about a report request, package or existing reference? Send us a message and include as much useful detail as possible." /><section className="section bg-[#F5F5F5]"><div className="container grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><aside className="rounded-2xl bg-[#111] p-8 text-white"><Mail className="size-10 text-[#FFC400]" /><h2 className="mt-6 font-heading text-3xl font-black">Email support</h2><a className="mt-4 block text-[#FFC400]" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><p className="mt-5 text-sm leading-6 text-white/60">{siteConfig.availability}. Phone and physical address are intentionally hidden until real details are configured.</p></aside><div className="rounded-2xl bg-white p-7 shadow-sm"><ContactForm /></div></div></section></>; }
