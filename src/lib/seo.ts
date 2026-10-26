import type { Metadata } from "next";
import { site } from "./site";

/** Primary social share image — 1200×630 for Facebook, LinkedIn, Slack, etc. */
export const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
  type: "image/jpeg",
} as const;

export const siteKeywords = [
  "The Scepter",
  "The Scepter Christian Ministries",
  "Pastor Precious Alo",
  "Precious Alo",
  "Christian formation",
  "kings and priests",
  "royal priesthood",
  "discipleship",
  "formation theology",
  "Christian ministry",
] as const;

type PageSeoInput = {
  title?: string;
  description: string;
  path: string;
  image?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  };
};

export function absoluteUrl(path: string) {
  const base = site.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description,
  path,
  image = ogImage,
}: PageSeoInput): Metadata {
  const pageTitle = title
    ? `${title} | ${site.name}`
    : `${site.name} | ${site.tagline}`;
  const canonical = path === "/" ? "/" : path;

  return {
    title: title ?? undefined,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName: site.legalName,
      locale: "en_GB",
      type: "website",
      images: [
        {
          url: image.url,
          width: image.width ?? ogImage.width,
          height: image.height ?? ogImage.height,
          alt: image.alt ?? ogImage.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [
        {
          url: image.url,
          alt: image.alt ?? ogImage.alt,
        },
      ],
    },
  };
}
