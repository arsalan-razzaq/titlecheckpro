import { NextRequest, NextResponse } from "next/server";
import { customerConfirmationEmail, orderEmail, sendMail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { requestReference, sanitize } from "@/lib/utils";
import { reportSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  if (!rateLimit(`report:${key}`, 3)) return NextResponse.json({ message: "Too many requests. Please wait and try again." }, { status: 429 });
  try {
    const json = await request.json();
    const parsed = reportSchema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ message: "Please correct the report details.", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    const clean = Object.fromEntries(Object.entries(parsed.data).map(([k, v]) => [k, typeof v === "string" ? sanitize(v) : v]));
    const reference = requestReference();
    const result = await sendMail(orderEmail(clean, reference));
    if (result.sent) await sendMail(customerConfirmationEmail(String(clean.email), reference));
    return NextResponse.json({ ok: true, reference, delivery: result.sent ? "email" : "development-log", payment: "pending-integration" });
  } catch (error) {
    const message = error instanceof Error && error.message === "Email service is not configured" ? "Email service is not configured. Your request was not sent." : "Unable to process the report request.";
    return NextResponse.json({ message }, { status: 503 });
  }
}
