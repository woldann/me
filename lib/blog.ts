import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { getConfig } from "./config";

const postsDirectory = path.join(process.cwd(), "content/blog");

export type Post = {
  slug: string;
  locale: string;
  meta: {
    title: string;
    date: string;
    description: string;
    tags?: string[];
    [key: string]: unknown;
  };
  content: string;
};

// In-memory cache for all posts across all languages
let allPostsCache: Post[] | null = null;

export function invalidateBlogCache() {
  allPostsCache = null;
}

export function getPosts(): Post[] {
  if (allPostsCache) {
    return allPostsCache;
  }

  if (!fs.existsSync(postsDirectory)) {
    allPostsCache = [];
    return allPostsCache;
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts: Post[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".mdx")) continue;

    // Expected format: slug.locale.mdx
    const parts = fileName.split(".");
    if (parts.length < 3) continue;

    const locale = parts[parts.length - 2];
    const slug = parts.slice(0, -2).join(".");
    const fullPath = path.join(postsDirectory, fileName);

    try {
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      posts.push({
        slug,
        locale,
        meta: data as Post["meta"],
        content,
      });
    } catch (e) {
      console.error(`Error loading post ${fileName}:`, e);
    }
  }

  // Sort by date descending
  posts.sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));

  allPostsCache = posts;
  return allPostsCache;
}

export function getPostBySlug(slug: string, locale: string): Post | null {
  return getPosts().find((p) => p.slug === slug && p.locale === locale) || null;
}

export function getAllPosts(locale: string = getConfig().Languages[0]): Post[] {
  return getPosts().filter((p) => p.locale === locale);
}
