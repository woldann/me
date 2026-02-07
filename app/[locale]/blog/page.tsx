import { SiteHeader } from "@/components/layout/site-header";
import { getAllPosts } from "@/lib/blog";
import { PostListItem } from "@/components/blog/post-list-item";
import { TypographyH1 } from "@/components/ui/typography";
import { getTranslations } from "next-intl/server";
import { getConfig } from "@/lib/config";
import { SiteFooter } from "@/components/layout/site-footer";

import { getBaseUrl } from "@/lib/base-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { Nickname } = getConfig();
  const url = getBaseUrl();

  return {
    title: `Blog - ${Nickname}`,
    description: "Read my latest thoughts on web development and more.",
    alternates: {
      canonical: `${url}/${locale}/blog`,
    },
    openGraph: {
      title: `Blog - ${Nickname}`,
      description: "Read my latest thoughts on web development and more.",
      url: `${url}/${locale}/blog`,
      type: "website",
    },
  };
}

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const posts = getAllPosts(locale);
  const t = await getTranslations("Blog");
  const { Languages, Nickname, FullName, Socials, Domain } = getConfig();

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader locales={Languages} nickname={Nickname} domain={Domain} />
      <main className="container mx-auto max-w-screen-md flex-1 px-4 py-12">
        <div className="mb-12">
          <TypographyH1 className="mb-4">{t("title")}</TypographyH1>
          <p className="text-muted-foreground font-serif text-xl">
            {t("subtitle")}
          </p>
        </div>
        <div className="grid gap-10">
          {posts.map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </div>
      </main>
      <SiteFooter fullName={FullName} socials={Socials} />
    </div>
  );
}
