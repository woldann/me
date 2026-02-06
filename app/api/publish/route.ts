import { NextRequest, NextResponse } from "next/server";
import { getConfig } from "@/lib/config";
import fs from "fs";
import path from "path";
import { invalidateBlogCache } from "@/lib/blog";
import { invalidateMdxCache } from "@/lib/i18n-server";

interface PublishRequest {
  token: string;
  slug: string;
  posts: Record<string, string>; // language -> content
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as PublishRequest;
    const config = getConfig();

    // 1. Validate Token
    if (body.token !== config.Token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // 2. Validate Slug (only alphanumeric and hyphens)
    const slugRegex = /^[a-z0-9-]+$/;
    if (!slugRegex.test(body.slug)) {
      return NextResponse.json(
        {
          error:
            "Invalid slug. Only lowercase alphanumeric characters and hyphens are allowed.",
        },
        { status: 400 }
      );
    }

    // 3. Validate Languages
    const providedLanguages = Object.keys(body.posts);
    const missingLanguages = config.Languages.filter(
      (lang) => !providedLanguages.includes(lang)
    );

    if (missingLanguages.length > 0) {
      return NextResponse.json(
        {
          error: `Missing content for languages: ${missingLanguages.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // 4. Write Files
    const blogDir = path.join(process.cwd(), "content/blog");
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }

    const savedFiles = [];

    for (const lang of config.Languages) {
      const content = body.posts[lang];
      if (!content) continue; // Should be caught by missingLanguages validation but safe check

      const fileName = `${body.slug}.${lang}.mdx`;
      const filePath = path.join(blogDir, fileName);

      fs.writeFileSync(filePath, content, "utf8");
      savedFiles.push(fileName);
    }

    // 5. Invalidate in-memory caches
    invalidateBlogCache();
    invalidateMdxCache();

    return NextResponse.json({ success: true, files: savedFiles });
  } catch (error) {
    console.error("Publish error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
