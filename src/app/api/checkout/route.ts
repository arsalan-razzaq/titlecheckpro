import { NextRequest, NextResponse } from "next/server";
import { createReportCheckout, PaymentConfigurationError, PricingUnavailableError } from "@/lib/payment";
import { rateLimit } from "@/lib/rate-limit";
import { requestReference, sanitize } from "@/lib/utils";
import { reportSchema, type ReportData } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  if (!rateLimit(`checkout:${key}`, 5)) {
    return NextResponse.json({ message: "Too many checkout attempts. Please wait and try again." }, { status: 429 });
  }

  try {
    const json = await request.json();
    const parsed = reportSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ message: "Please correct the report details.", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    }

    const clean = Object.fromEntries(Object.entries(parsed.data).map(([k, v]) => [k, typeof v === "string" ? sanitize(v) : v])) as ReportData;
    const reference = requestReference();
    const checkout = await createReportCheckout(clean, reference);

    return NextResponse.json({ ok: true, reference, ...checkout });
  } catch (error) {
    if (error instanceof PricingUnavailableError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (error instanceof PaymentConfigurationError) {
      return NextResponse.json({ message: "Payment is not configured yet." }, { status: 503 });
    }

    console.error("[checkout]", error);
    return NextResponse.json({ message: "Unable to start secure checkout." }, { status: 503 });
  }
}
