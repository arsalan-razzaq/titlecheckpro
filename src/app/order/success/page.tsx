import type { Metadata } from "next";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { PaymentStatusToast } from "@/components/payment-status-toast";
import { StoredOrderSummary } from "@/components/stored-order-summary";
import { Button } from "@/components/ui";
import { retrieveCheckoutSession } from "@/lib/payment";

export const metadata: Metadata = { title: "Payment Status", robots: { index: false, follow: false } };

async function getCheckoutStatus(sessionId?: string) {
  if (!sessionId) return null;
  try {
    const session = await retrieveCheckoutSession(sessionId);
    return {
      amount: session.amount_total ? session.amount_total / 100 : null,
      currency: session.currency?.toUpperCase() || "",
      email: session.customer_details?.email || session.customer_email || "",
      paymentStatus: session.payment_status,
      reference: session.metadata?.reference || "",
    };
  } catch (error) {
    console.error("[checkout-success]", error);
    return { error: true };
  }
}

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ ref?: string; session_id?: string }> }) {
  const query = await searchParams;
  const checkout = await getCheckoutStatus(query.session_id);
  const failedLookup = checkout && "error" in checkout;
  const paid = checkout && !("error" in checkout) && checkout.paymentStatus === "paid";
  const reference = checkout && !("error" in checkout) ? checkout.reference : query.ref;

  return <><PaymentStatusToast paid={Boolean(paid)} reference={reference} /><section className="section min-h-[65vh] bg-[#F5F5F5]"><div className="container max-w-2xl"><div className="rounded-3xl bg-white p-8 text-center shadow-sm sm:p-12">{paid ? <CheckCircle2 className="mx-auto size-16 text-green-700" /> : <AlertCircle className="mx-auto size-16 text-[#c29200]" />}<h1 className="mt-6 font-heading text-4xl font-black">{paid ? "Payment received" : "Checkout status"}</h1><p className="mt-5 leading-7 text-[#666]">Your request reference is <strong className="text-[#111]">{reference || "Pending"}</strong>.</p>{checkout && !("error" in checkout) && <div className="mt-6 rounded-xl bg-[#F8F8F8] p-4 text-sm text-[#555]"><p><strong className="text-[#111]">Payment status:</strong> {checkout.paymentStatus}</p>{checkout.amount !== null && <p><strong className="text-[#111]">Amount:</strong> {checkout.currency} {checkout.amount.toFixed(2)}</p>}{checkout.email && <p><strong className="text-[#111]">Email:</strong> {checkout.email}</p>}</div>}<StoredOrderSummary show={!paid} />{failedLookup && <p className="mt-4 rounded-xl bg-[#FFF8D8] p-4 text-sm text-[#604b00]">Stripe checkout returned, but the session could not be verified. Please contact support with your reference.</p>}{!query.session_id && <p className="mt-4 rounded-xl bg-[#FFF8D8] p-4 text-sm text-[#604b00]">If Stripe does not return a session, your saved order details appear above after checkout.</p>}<div className="mt-8 flex flex-wrap justify-center gap-3"><Button href="/">Return Home</Button><Button href="/contact" variant="dark">Contact Support</Button></div></div></div></section></>;
}
