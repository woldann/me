import { getAllPosts } from "@/lib/blog";
import { getTranslations } from "next-intl/server";
import { getConfig } from "@/lib/config";
import { HomeLayout } from "@/components/home/home-layout";
import { MdxTranslation } from "@/components/mdx-translation";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const posts = getAllPosts(locale);
  const t = await getTranslations("Home");
  const { Languages, Nickname, FullName, Socials } = getConfig();

  const heroDescription = <MdxTranslation namespace="Hero" id="description" />;

  return (
    <HomeLayout
      locale={locale}
      posts={posts}
      latestWritingsTitle={t("latestWritings")}
      locales={Languages}
      nickname={Nickname}
      fullName={FullName}
      socials={Socials}
      heroDescription={heroDescription}
    />
  );
}
