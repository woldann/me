import { MetadataRoute } from "next";
import { getConfig } from "@/lib/config";
import { getPosts } from "@/lib/blog";
import { getBaseUrl } from "@/lib/base-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getConfig();
  const baseUrl = getBaseUrl();
  const posts = getPosts();

  const defaultLocale = config.Languages[0];

  // Static routes (Homepage & Blog Index)
  const staticRoutes = config.Languages.flatMap((lang) => {
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
