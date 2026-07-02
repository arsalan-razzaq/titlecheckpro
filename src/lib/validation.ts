import { z } from "zod";

const phone = z.string().trim().refine((value) => !value || /^[+()\d\s.-]{7,24}$/.test(value), "Enter a valid phone number");

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(100),
  email: z.email("Enter a valid email address"),
  phone,
  subject: z.string().trim().min(3, "Subject is required").max(150),
  message: z.string().trim().min(10, "Please enter at least 10 characters").max(5000),
  website: z.string().max(0, "Spam detected").optional().default(""),
});

export const reportSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(60),
  lastName: z.string().trim().min(1, "Last name is required").max(60),
  email: z.email("Enter a valid email address"),
  phone,
  country: z.enum(["australia", "canada", "usa"]),
  vin: z.string().trim().min(4, "VIN or chassis number is required").max(40).refine((value) => value.length !== 17 || /^[A-HJ-NPR-Z0-9]{17}$/i.test(value), "Enter a valid 17-character VIN"),
  plate: z.string().trim().max(20).optional().default(""),
  region: z.string().trim().min(1, "Select a region"),
  make: z.string().trim().min(1, "Vehicle make is required").max(80),
  model: z.string().trim().min(1, "Vehicle model is required").max(80),
  year: z.coerce.number().int("Enter a valid vehicle year").min(1886, "Enter a valid vehicle year").max(new Date().getFullYear() + 1, "Enter a valid vehicle year"),
  plan: z.enum(["basic", "standard", "premium"]),
  notes: z.string().trim().max(2000).optional().default(""),
  terms: z.boolean().refine((value) => value, "You must agree to the policies"),
  website: z.string().max(0, "Spam detected").optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ReportInput = z.input<typeof reportSchema>;
export type ReportData = z.output<typeof reportSchema>;
