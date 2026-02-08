import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { SiteHeader } from "@/components/layout/site-header";
import { format } from "date-fns";
import { getDateLocale } from "@/lib/date-locale";
import { MdxRenderer } from "@/components/mdx-renderer";
import { TypographyH1 } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getConfig } from "@/lib/config";
import { SiteFooter } from "@/components/layout/site-footer";
import { getTranslations } from "next-intl/server";
import { getIsoLocale } from "@/lib/iso-locale";
import { getBaseUrl } from "@/lib/base-url";
import { defaultLocale } from "@/lib/locales";

interface BlogPostProps {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: BlogPostProps) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return;
  }

  const { FullName } = getConfig();
  const url = getBaseUrl();
  const isoLocale = getIsoLocale(locale);

  return {
    title: post.meta.title,
    description: post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.description,
      type: "article",
      url: `${url}/${locale}/blog/${slug}`,
      publishedTime: post.meta.date,
      authors: [FullName],
      locale: isoLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: post.meta.title,
      description: post.meta.description,
    },
    alternates: {
      canonical:
        locale === defaultLocale
          ? `${url}/blog/${slug}`
          : `${url}/${locale}/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const { Languages } = getConfig();
  const params = [];

  for (const locale of Languages) {
    const posts = getAllPosts(locale);
    for (const post of posts) {
      params.push({ slug: post.slug, locale });
    }
  }

  return params;
}
//...
// Inside component:
export default async function BlogPost({ params }: BlogPostProps) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);
  const t = await getTranslations("Blog");
  const { Languages, Nickname, FullName, Socials } = getConfig();

  const dateLocale = getDateLocale(locale);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader
        locales={Languages}
        nickname={Nickname}
        domain={getConfig().Domain}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.meta.title,
            datePublished: post.meta.date,
            description: post.meta.description,
            author: {
              "@type": "Person",
              name: FullName,
              url: `https://${getConfig().Domain}`,
            },
          }),
        }}
      />
      <main className="container mx-auto max-w-screen-md flex-1 px-4 py-12">
        <Link
          href="/blog"
          className="text-muted-foreground hover:text-foreground mb-8 inline-flex items-center text-sm transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("backToAll")}
        </Link>

        <article className="prose prose-zinc dark:prose-invert max-w-none">
          <div className="not-prose mb-10 text-center">
            <div className="mb-4 flex justify-center gap-2">
              {post.meta.tags?.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <TypographyH1 className="mb-4 text-4xl leading-tight lg:text-5xl">
              {post.meta.title}
            </TypographyH1>
            <time className="text-muted-foreground font-serif">
              {format(new Date(post.meta.date), "d MMMM yyyy", {
                locale: dateLocale,
              })}
            </time>
          </div>

          <div className="font-serif text-lg leading-loose">
            <MdxRenderer content={post.content} />
          </div>
        </article>
      </main>
      <SiteFooter fullName={FullName} socials={Socials} />
    </div>
  );
}
