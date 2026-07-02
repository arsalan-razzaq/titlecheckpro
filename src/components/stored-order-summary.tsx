"use client";

import { useEffect, useState } from "react";

type StoredOrder = {
  reference: string;
  country: string;
  plan: string;
  price: string;
  email: string;
  vin: string;
  vehicle: string;
};

const lastOrderStorageKey = "titlecheckpro:last-order";

export function StoredOrderSummary({ show }: { show: boolean }) {
  const [order, setOrder] = useState<StoredOrder | null>(null);

  useEffect(() => {
    if (!show) return;
    const timeout = window.setTimeout(() => {
      const stored = sessionStorage.getItem(lastOrderStorageKey);
      if (!stored) return;

      try {
        setOrder(JSON.parse(stored) as StoredOrder);
      } catch (error) {
        console.warn("[stored-order]", error);
      }
    }, 0);
    return () => window.clearTimeout(timeout);
  }, [show]);

  if (!show || !order) return null;

  return <div className="mt-6 rounded-xl bg-[#F8F8F8] p-4 text-left text-sm text-[#555]">
    <p><strong className="text-[#111]">Reference:</strong> {order.reference}</p>
    <p><strong className="text-[#111]">Package:</strong> {order.plan}</p>
    <p><strong className="text-[#111]">Country:</strong> {order.country}</p>
    <p><strong className="text-[#111]">Amount:</strong> {order.price}</p>
    <p><strong className="text-[#111]">Vehicle:</strong> {order.vehicle}</p>
    <p><strong className="text-[#111]">VIN:</strong> {order.vin}</p>
    <p><strong className="text-[#111]">Email:</strong> {order.email}</p>
  </div>;
}
