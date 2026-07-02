"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

type StoredOrder = {
  reference: string;
  status?: string;
};

const lastOrderStorageKey = "titlecheckpro:last-order";
const ordersStorageKey = "titlecheckpro:orders";

export function PaymentStatusToast({ paid, reference }: { paid: boolean; reference?: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 9000);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const status = paid ? "payment_confirmed" : "confirmation_pending";
      const stored = sessionStorage.getItem(lastOrderStorageKey);
      if (!stored) return;

      try {
        const order = { ...(JSON.parse(stored) as StoredOrder), status };
        sessionStorage.setItem(lastOrderStorageKey, JSON.stringify(order));
        const orders = JSON.parse(localStorage.getItem(ordersStorageKey) || "[]") as StoredOrder[];
        localStorage.setItem(ordersStorageKey, JSON.stringify(orders.map((item) => item.reference === order.reference ? { ...item, status } : item)));
      } catch (error) {
        console.warn("[payment-toast]", error);
      }
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [paid]);

  if (!visible) return null;

  return <div className="fixed right-4 top-4 z-[80] w-[calc(100vw-2rem)] max-w-sm rounded-xl border border-green-200 bg-white p-4 text-left shadow-2xl">
    <div className="flex gap-3">
      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-700" />
      <div className="min-w-0 flex-1">
        <p className="font-heading text-base font-black text-[#111]">{paid ? "Payment confirmed" : "Request confirmed"}</p>
        <p className="mt-1 text-sm leading-6 text-[#555]">Thank you. Your order is confirmed and a confirmation email will be sent shortly{reference ? ` for ${reference}` : ""}.</p>
      </div>
      <button type="button" onClick={() => setVisible(false)} aria-label="Close notification" className="rounded-md p-1 text-[#666] hover:bg-[#F5F5F5]"><X className="size-4" /></button>
    </div>
  </div>;
}
