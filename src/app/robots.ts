import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/studio/", "/_next/", "/vercel/", "/dashboard/"],
    },
    sitemap: "https://propertypledged.co.uk/sitemap.xml",
  };
}
