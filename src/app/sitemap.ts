import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/doctrine", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/formation", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/teachings", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly" as const, priority: 0.6 },
  { path: "/clay", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/clay/register", changeFrequency: "weekly" as const, priority: 0.7 },
  { path: "/clay/volunteer", changeFrequency: "weekly" as const, priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: path === "/" ? site.url : `${site.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
