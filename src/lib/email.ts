import nodemailer from "nodemailer";
import { siteConfig } from "@/data/site";

type Mail = { subject: string; html: string; text: string; replyTo?: string; to?: string };

export async function sendMail(mail: Mail) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM, EMAIL_TO, NODE_ENV } = process.env;
  const configured = SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS;
  if (!configured) {
    if (NODE_ENV !== "production") {
      console.info("[TitleCheckPro development email]", { subject: mail.subject, to: EMAIL_TO || siteConfig.email });
      return { sent: false, development: true };
    }
    throw new Error("Email service is not configured");
  }
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST, port: Number(SMTP_PORT), secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  await transporter.sendMail({
    from: EMAIL_FROM || `no-reply@${siteConfig.domain}`,
    to: mail.to || EMAIL_TO || siteConfig.email,
    replyTo: mail.replyTo,
    ...mail,
  });
  return { sent: true, development: false };
}

export const contactEmail = (data: Record<string, unknown>) => ({
  subject: `TitleCheckPro contact: ${data.subject}`,
  html: `<h1>New contact message</h1><p><strong>Name:</strong> ${data.fullName}</p><p><strong>Email:</strong> ${data.email}</p><p><strong>Phone:</strong> ${data.phone || "Not supplied"}</p><p><strong>Message:</strong></p><p>${data.message}</p>`,
  text: `New contact message\nName: ${data.fullName}\nEmail: ${data.email}\nPhone: ${data.phone || "Not supplied"}\nMessage: ${data.message}`,
  replyTo: String(data.email),
});

export const orderEmail = (data: Record<string, unknown>, reference: string) => ({
  subject: `TitleCheckPro report request ${reference}`,
  html: `<h1>New report request</h1><p><strong>Reference:</strong> ${reference}</p>${Object.entries(data).filter(([key]) => !["terms", "website"].includes(key)).map(([key, value]) => `<p><strong>${key}:</strong> ${String(value || "Not supplied")}</p>`).join("")}`,
  text: `New report request ${reference}\n${Object.entries(data).filter(([key]) => !["terms", "website"].includes(key)).map(([key, value]) => `${key}: ${String(value || "Not supplied")}`).join("\n")}`,
  replyTo: String(data.email),
});

export const customerConfirmationEmail = (email: string, reference: string) => ({
  to: email,
  subject: `We received your TitleCheckPro request ${reference}`,
  html: `<h1>Request received</h1><p>Your temporary reference is <strong>${reference}</strong>.</p><p>This is an order enquiry only. Payment integration is pending, and no payment has been completed through the website.</p>`,
  text: `Request received\nReference: ${reference}\nThis is an order enquiry only. Payment integration is pending, and no payment has been completed through the website.`,
});
