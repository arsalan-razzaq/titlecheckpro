"use client";

import type { FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { BarChart3, CheckCircle2, LockKeyhole, LogOut, Mail, Search } from "lucide-react";
import { Button, inputClass } from "./ui";

type AdminOrder = {
  reference: string;
  country: string;
  plan: string;
  price: string;
  email: string;
  vin: string;
  vehicle: string;
  status?: string;
  createdAt?: string;
};

const adminEmail = "admin@titlecheckpro.com";
const adminPassword = "TitleCheckPro@2026";
const adminSessionKey = "titlecheckpro:admin-auth";
const ordersStorageKey = "titlecheckpro:orders";

const demoOrder: AdminOrder = {
  reference: "TCP-DEMO-2026",
  country: "United States",
  plan: "Standard Report",
  price: "$95.00 USD",
  email: "customer@example.com",
  vin: "1HGCM82633A004352",
  vehicle: "2022 Honda Accord",
  status: "payment_confirmed",
  createdAt: new Date().toISOString(),
};

function statusLabel(status?: string) {
  if (status === "payment_confirmed") return "Payment confirmed";
  if (status === "checkout_opened") return "Checkout opened";
  if (status === "confirmation_pending") return "Confirmation pending";
  return "Saved locally";
}

export function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setAuthenticated(localStorage.getItem(adminSessionKey) === "true");
      const stored = JSON.parse(localStorage.getItem(ordersStorageKey) || "[]") as AdminOrder[];
      setOrders(stored.length ? stored : [demoOrder]);
    }, 0);
    return () => window.clearTimeout(timeout);
  }, []);

  const filteredOrders = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return orders;
    return orders.filter((order) => [order.reference, order.email, order.vin, order.country, order.plan, order.vehicle].some((value) => value.toLowerCase().includes(term)));
  }, [orders, query]);

  const paidCount = orders.filter((order) => order.status === "payment_confirmed").length;

  function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("email") === adminEmail && form.get("password") === adminPassword) {
      localStorage.setItem(adminSessionKey, "true");
      setAuthenticated(true);
      setError("");
      return;
    }
    setError("Invalid local demo credentials.");
  }

  function logout() {
    localStorage.removeItem(adminSessionKey);
    setAuthenticated(false);
  }

  if (!authenticated) {
    return <section className="section min-h-[75vh] bg-[#F5F5F5]"><div className="container max-w-md"><form onSubmit={login} className="rounded-2xl border border-[#E5E5E5] bg-white p-7 shadow-sm">
      <LockKeyhole className="size-10 text-[#b48800]" />
      <h1 className="mt-5 font-heading text-3xl font-black">Admin Login</h1>
      <p className="mt-2 text-sm leading-6 text-[#666]">Frontend demo access for the client review flow.</p>
      <div className="mt-6 rounded-lg bg-[#FFF8D8] p-4 text-sm text-[#604b00]">
        <p><strong>Email:</strong> {adminEmail}</p>
        <p><strong>Password:</strong> {adminPassword}</p>
      </div>
      <label className="mt-5 block text-sm font-semibold text-[#222]">Email<input name="email" type="email" className={inputClass} defaultValue={adminEmail} /></label>
      <label className="mt-4 block text-sm font-semibold text-[#222]">Password<input name="password" type="password" className={inputClass} defaultValue={adminPassword} /></label>
      {error && <p className="mt-3 text-sm font-semibold text-red-700">{error}</p>}
      <Button type="submit" className="mt-6 w-full">Open Admin Panel</Button>
    </form></div></section>;
  }

  return <section className="section min-h-[75vh] bg-[#F5F5F5]"><div className="container">
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p className="text-xs font-black uppercase tracking-[.2em] text-[#b48800]">TitleCheckPro</p>
        <h1 className="mt-3 font-heading text-4xl font-black">Admin Panel</h1>
      </div>
      <button type="button" onClick={logout} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#ddd] bg-white px-4 text-sm font-bold hover:border-[#FFC400]"><LogOut className="size-4" />Logout</button>
    </div>

    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl bg-white p-6 shadow-sm"><BarChart3 className="mb-4 size-6 text-[#b48800]" /><p className="text-sm font-bold text-[#666]">Total Orders</p><p className="mt-2 font-heading text-3xl font-black">{orders.length}</p></div>
      <div className="rounded-2xl bg-white p-6 shadow-sm"><CheckCircle2 className="mb-4 size-6 text-green-700" /><p className="text-sm font-bold text-[#666]">Confirmed</p><p className="mt-2 font-heading text-3xl font-black">{paidCount}</p></div>
      <div className="rounded-2xl bg-white p-6 shadow-sm"><Mail className="mb-4 size-6 text-[#b48800]" /><p className="text-sm font-bold text-[#666]">Support Inbox</p><p className="mt-2 font-heading text-xl font-black">info@titlecheckpro.com</p></div>
    </div>

    <div className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
      <label className="flex items-center gap-3 rounded-lg border border-[#ddd] px-4"><Search className="size-5 text-[#777]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search reference, email, VIN or country" className="min-h-12 w-full bg-transparent text-sm outline-none" /></label>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="border-b text-xs uppercase tracking-[.12em] text-[#777]"><tr><th className="py-3">Reference</th><th>Customer</th><th>Vehicle</th><th>Package</th><th>Country</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>{filteredOrders.map((order) => <tr key={order.reference} className="border-b last:border-0"><td className="py-4 font-bold text-[#111]">{order.reference}</td><td>{order.email}</td><td>{order.vehicle}<span className="block text-xs text-[#777]">{order.vin}</span></td><td>{order.plan}</td><td>{order.country}</td><td className="font-bold">{order.price}</td><td><span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">{statusLabel(order.status)}</span></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  </div></section>;
}
