import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/pricing", "/services", "/about", "/contact", "/refund-dispute-policy", "/terms", "/privacy", "/australia", "/canada", "/usa"];
  return routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : .7 }));
}
