"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { detectBrowserMarket } from "@/lib/location";

const redirectStorageKey = "titlecheckpro:geo-home-redirected";

export function GeoHomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem(redirectStorageKey)) return;

    const market = detectBrowserMarket();
    if (market === "international") return;

    sessionStorage.setItem(redirectStorageKey, market);
    router.replace(`/${market}`);
  }, [router]);

  return null;
}
