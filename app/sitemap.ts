import { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { getBaseUrl } from "@/lib/base-url";

import { defaultLocale, locales } from "@/lib/locales";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const posts = getPosts();

  // Static routes (Homepage & Blog Index)
  const staticRoutes = locales.flatMap((lang) => {
    const localePath = lang === defaultLocale ? "" : `/${lang}`;

    return [
      {
        url: `${baseUrl}${localePath}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily" as const,
        priority: 1,
      },
      {
        url: `${baseUrl}${localePath}/blog`,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      },
    ];
  });

  // Blog posts
  const postRoutes = posts.map((post) => {
    const localePath = post.locale === defaultLocale ? "" : `/${post.locale}`;
    return {
      url: `${baseUrl}${localePath}/blog/${post.slug}`,
      lastModified: new Date(post.meta.date).toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...postRoutes];
}
