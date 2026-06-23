"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { countries, CountryKey, regions } from "@/data/countries";
import { plans, PlanKey } from "@/data/plans";
import { ReportInput, reportSchema } from "@/lib/validation";
import { Button, Field, inputClass, LoadingSpinner } from "./ui";

export function ReportRequestForm({ countryKey, defaultPlan, redirectOnSuccess = false }: { countryKey: CountryKey; defaultPlan?: PlanKey; redirectOnSuccess?: boolean }) {
  const country = countries[countryKey];
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ReportInput>({
    resolver: zodResolver(reportSchema),
    defaultValues: { country: countryKey, plan: defaultPlan || "standard", terms: false, website: "" },
  });
  const submit = async (values: ReportInput) => {
    setMessage("");
    try {
      const response = await fetch("/api/report-request", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to submit your request");
      if (redirectOnSuccess) router.push(`/order/success?ref=${encodeURIComponent(result.reference)}&delivery=${result.delivery}`);
      else setMessage(`Request received. Reference: ${result.reference}${result.delivery === "development-log" ? " (development email logging only)" : ""}`);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to submit your request"); }
  };
  return <form onSubmit={handleSubmit(submit)} className="grid gap-5" noValidate>
    <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register("website")} />
    <input type="hidden" {...register("country")} value={countryKey} />
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="First Name" error={errors.firstName?.message}><input className={inputClass} {...register("firstName")} /></Field>
      <Field label="Last Name" error={errors.lastName?.message}><input className={inputClass} {...register("lastName")} /></Field>
      <Field label="Email Address" error={errors.email?.message}><input type="email" className={inputClass} {...register("email")} /></Field>
      <Field label="Phone Number" error={errors.phone?.message}><input type="tel" className={inputClass} {...register("phone")} /></Field>
      <Field label={country.vinLabel} error={errors.vin?.message}><input className={inputClass} {...register("vin")} /></Field>
      <Field label={country.plateLabel} error={errors.plate?.message}><input className={inputClass} {...register("plate")} /></Field>
      <Field label={country.regionLabel} error={errors.region?.message}><select className={inputClass} {...register("region")}><option value="">Select {country.regionLabel}</option>{regions[countryKey].map((region) => <option key={region}>{region}</option>)}</select></Field>
      <Field label="Vehicle Make" error={errors.make?.message}><input className={inputClass} {...register("make")} /></Field>
      <Field label="Vehicle Model" error={errors.model?.message}><input className={inputClass} {...register("model")} /></Field>
      <Field label="Vehicle Year" error={errors.year?.message}><input type="number" min="1886" max={new Date().getFullYear() + 1} className={inputClass} {...register("year")} /></Field>
      <Field label="Selected Package" error={errors.plan?.message}><select className={inputClass} {...register("plan")}>{(Object.keys(plans) as PlanKey[]).map((key) => <option key={key} value={key}>{plans[key].name}</option>)}</select></Field>
    </div>
    <Field label="Additional Notes" error={errors.notes?.message}><textarea rows={4} className={inputClass} {...register("notes")} /></Field>
    <label className="flex items-start gap-3 text-sm text-[#555]"><input type="checkbox" className="mt-1 size-4 accent-[#FFC400]" {...register("terms")} /><span>I agree to the Terms & Conditions, Privacy Policy and Refund & Dispute Policy.</span></label>
    {errors.terms && <p className="text-xs text-red-700">{errors.terms.message}</p>}
    <p className="rounded-lg bg-[#FFF8D8] p-4 text-sm text-[#604b00]">Secure request submission. Payment integration is pending; this form creates an order enquiry only.</p>
    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">{isSubmitting && <LoadingSpinner />}{isSubmitting ? "Submitting…" : "Submit Report Request"}</Button>
    <p aria-live="polite" className="text-sm font-semibold text-[#555]">{message}</p>
  </form>;
}
