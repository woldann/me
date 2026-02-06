import { Link } from "@/i18n/routing";
import { format } from "date-fns";
import { getDateLocale } from "@/lib/date-locale";
import { Post } from "@/lib/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslations, useLocale } from "next-intl";

interface PostListItemProps {
  post: Post;
}

export function PostListItem({ post }: PostListItemProps) {
  const t = useTranslations("Home");
  const locale = useLocale();
  const dateLocale = getDateLocale(locale);

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="hover:bg-muted/50 h-full border-none p-4 shadow-none transition-all hover:shadow-sm">
        <CardHeader className="">
          <div className="text-muted-foreground mb-2 flex items-center gap-2 text-sm">
            <time dateTime={post.meta.date}>
              {format(new Date(post.meta.date), "d MMMM yyyy", {
                locale: dateLocale,
              })}
            </time>
            {post.meta.tags && (
              <div className="flex gap-1">
                {post.meta.tags.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-1 py-0 text-[10px]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <CardTitle className="font-serif text-2xl leading-tight font-bold">
            {post.meta.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="mt-2">
          <p className="text-muted-foreground line-clamp-3 font-serif leading-relaxed">
            {post.meta.description}
          </p>
          <div className="text-primary decoration-primary mt-4 text-sm font-medium underline-offset-4 group-hover:underline">
            {t("readMore")}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
