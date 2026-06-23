import { NextRequest, NextResponse } from "next/server";
import { contactEmail, sendMail } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { sanitize } from "@/lib/utils";
import { contactSchema } from "@/lib/validation";

export async function POST(request: NextRequest) {
  const key = request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  if (!rateLimit(`contact:${key}`)) return NextResponse.json({ message: "Too many requests. Please wait and try again." }, { status: 429 });
  try {
    const json = await request.json();
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ message: "Please correct the highlighted fields.", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
    const clean = Object.fromEntries(Object.entries(parsed.data).map(([k, v]) => [k, typeof v === "string" ? sanitize(v) : v]));
    const result = await sendMail(contactEmail(clean));
    return NextResponse.json({ ok: true, delivery: result.sent ? "email" : "development-log" });
  } catch (error) {
    const message = error instanceof Error && error.message === "Email service is not configured" ? "Email service is not configured. Please contact info@titlecheckpro.com directly." : "Unable to process your message.";
    return NextResponse.json({ message }, { status: 503 });
  }
}
