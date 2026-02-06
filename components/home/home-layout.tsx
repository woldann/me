"use client";

import { useState } from "react";
import { Hero } from "@/components/home/hero";
import { SiteHeader } from "@/components/layout/site-header";
import { PostListItem } from "@/components/blog/post-list-item";
import { TypographyH2 } from "@/components/ui/typography";
import { Post } from "@/lib/blog";
import { motion } from "framer-motion";
import { SiteFooter } from "@/components/layout/site-footer";
import { Config } from "@/lib/config";

interface HomeLayoutProps {
  locale: string;
  posts: Post[];
  latestWritingsTitle: string;
  locales: string[];
  nickname: string;
  fullName: string;
  heroDescription: React.ReactNode;
  socials?: Config["Socials"];
}

export function HomeLayout({
  posts,
  latestWritingsTitle,
  locales,
  nickname,
  fullName,
  heroDescription,
  socials,
}: HomeLayoutProps) {
  const [isIntroDone, setIsIntroDone] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isIntroDone ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        <SiteHeader locales={locales} nickname={nickname} />
      </motion.div>

      <main className="container mx-auto max-w-screen-md flex-1 px-4">
        <Hero
          onIntroComplete={() => setIsIntroDone(true)}
          showDescription={isIntroDone}
          description={heroDescription}
        />

        <motion.section
          className="py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isIntroDone ? 1 : 0, y: isIntroDone ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TypographyH2 className="mb-10 font-serif">
            {latestWritingsTitle}
          </TypographyH2>
          <div className="grid gap-10">
            {posts.map((post) => (
              <PostListItem key={post.slug} post={post} />
            ))}
          </div>
        </motion.section>
      </main>
      <SiteFooter fullName={fullName} socials={socials} />
    </div>
  );
}
