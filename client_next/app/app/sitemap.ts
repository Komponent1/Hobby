import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "/",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "/article",
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "/information",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "/game",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "/steam",
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
