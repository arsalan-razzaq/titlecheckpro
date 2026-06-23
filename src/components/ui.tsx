import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function Button({ href, children, variant = "primary", className = "", type = "button", disabled = false }: {
  href?: string; children: React.ReactNode; variant?: "primary" | "dark" | "outline"; className?: string; type?: "button" | "submit"; disabled?: boolean;
}) {
  const styles = cn("inline-flex min-h-12 items-center justify-center rounded-lg px-5 py-3 text-sm font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFC400] disabled:cursor-not-allowed disabled:opacity-60",
    variant === "primary" && "bg-[#FFC400] text-[#090909] hover:bg-[#E6B000]",
    variant === "dark" && "bg-[#090909] text-white hover:bg-[#222]",
    variant === "outline" && "border border-white/30 bg-transparent text-white hover:border-[#FFC400] hover:text-[#FFC400]", className);
  return href ? <Link href={href} className={styles}>{children}</Link> : <button type={type} disabled={disabled} className={styles}>{children}</button>;
}

export function SectionHeading({ eyebrow, title, description, light = false }: { eyebrow?: string; title: string; description?: string; light?: boolean }) {
  return <div className="mx-auto mb-10 max-w-2xl text-center">
    {eyebrow && <p className="mb-3 text-xs font-extrabold uppercase tracking-[.22em] text-[#E6B000]">{eyebrow}</p>}
    <h2 className={cn("font-heading text-3xl font-black tracking-tight sm:text-4xl", light ? "text-white" : "text-[#090909]")}>{title}</h2>
    {description && <p className={cn("mt-4 leading-7", light ? "text-white/65" : "text-[#5d5d5d]")}>{description}</p>}
  </div>;
}

export function LoadingSpinner() {
  return <LoaderCircle className="mr-2 size-4 animate-spin" aria-hidden="true" />;
}

export function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-[#222]">{label}{children}{error && <span className="mt-1 block text-xs text-red-700">{error}</span>}</label>;
}

export const inputClass = "mt-2 min-h-12 w-full rounded-lg border border-[#d5d5d5] bg-white px-4 text-[#111] outline-none transition placeholder:text-[#8B8B8B] focus:border-[#FFC400] focus:ring-2 focus:ring-[#FFC400]/25";
