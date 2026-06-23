"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ContactInput, contactSchema } from "@/lib/validation";
import { Button, Field, inputClass, LoadingSpinner } from "./ui";

export function ContactForm() {
  const [message, setMessage] = useState("");
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: { website: "", phone: "" } });
  const submit = async (values: ContactInput) => {
    setMessage("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to send message");
      setMessage(result.delivery === "development-log" ? "Validated successfully. SMTP is not configured, so the message was logged for development." : "Your message has been sent.");
      reset();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to send message"); }
  };
  return <form onSubmit={handleSubmit(submit)} className="grid gap-5" noValidate>
    <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />
    <Field label="Full Name" error={errors.fullName?.message}><input className={inputClass} {...register("fullName")} /></Field>
    <div className="grid gap-5 sm:grid-cols-2"><Field label="Email" error={errors.email?.message}><input type="email" className={inputClass} {...register("email")} /></Field><Field label="Phone" error={errors.phone?.message}><input type="tel" className={inputClass} {...register("phone")} /></Field></div>
    <Field label="Subject" error={errors.subject?.message}><input className={inputClass} {...register("subject")} /></Field>
    <Field label="Message" error={errors.message?.message}><textarea rows={6} className={inputClass} {...register("message")} /></Field>
    <Button type="submit" disabled={isSubmitting}>{isSubmitting && <LoadingSpinner />}{isSubmitting ? "Sending…" : "Send Message"}</Button>
    <p aria-live="polite" className="text-sm font-semibold">{message}</p>
  </form>;
}
