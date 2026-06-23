import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui";

export const metadata: Metadata = { title: "Request Received", robots: { index: false, follow: false } };
export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ ref?: string; delivery?: string }> }) {
  const query = await searchParams;
  return <section className="section min-h-[65vh] bg-[#F5F5F5]"><div className="container max-w-2xl"><div className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12"><CheckCircle2 className="mx-auto size-16 text-green-700" /><h1 className="mt-6 font-heading text-4xl font-black">Report request received</h1><p className="mt-5 leading-7 text-[#666]">Your temporary request reference is <strong className="text-[#111]">{query.ref || "Pending"}</strong>.</p><p className="mt-4 rounded-xl bg-[#FFF8D8] p-4 text-sm text-[#604b00]">Payment integration is pending. No payment was completed. {query.delivery === "development-log" ? "SMTP is not configured, so this development submission was logged rather than emailed." : "The enquiry was submitted for email delivery."}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button href="/">Return Home</Button><Button href="/contact" variant="dark">Contact Support</Button></div></div></div></section>;
}
