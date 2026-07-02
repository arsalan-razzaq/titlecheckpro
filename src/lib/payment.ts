import Stripe from "stripe";
import { countries } from "@/data/countries";
import { plans } from "@/data/plans";
import type { ReportData } from "@/lib/validation";

export class PaymentConfigurationError extends Error {}
export class PricingUnavailableError extends Error {}

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new PaymentConfigurationError("Stripe is not configured.");
  return new Stripe(secretKey);
}

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
}

export async function createReportCheckout(data: ReportData, reference: string) {
  const country = countries[data.country];
  const plan = plans[data.plan];
  const price = country.plans[data.plan];
  if (price === null) throw new PricingUnavailableError("Pricing is not available for this report package.");

  const metadata = {
    reference,
    country: data.country,
    plan: data.plan,
    email: data.email,
    vin: data.vin,
  };

  const session = await getStripe().checkout.sessions.create({
    mode: "payment",
    customer_email: data.email,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: country.currency.toLowerCase(),
        unit_amount: Math.round(price * 100),
        product_data: {
          name: `${plan.name} - ${country.name}`,
          description: `Vehicle history report request for ${data.vin}`,
        },
      },
    }],
    metadata,
    payment_intent_data: { metadata },
    success_url: `${siteUrl()}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl()}/order/${data.country}/${data.plan}?cancelled=1`,
  });

  return { checkoutUrl: session.url, sessionId: session.id };
}

export async function retrieveCheckoutSession(sessionId: string) {
  return getStripe().checkout.sessions.retrieve(sessionId);
}
