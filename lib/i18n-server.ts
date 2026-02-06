import fs from "fs";
import path from "path";

const cachedMdxMessages: Record<
  string,
  Record<string, Record<string, string>>
> = {};

export function invalidateMdxCache() {
  for (const key in cachedMdxMessages) {
    delete cachedMdxMessages[key];
  }
}

export function getMdxTranslations(locale: string) {
  // Return cached version if available
  if (cachedMdxMessages[locale]) {
    return cachedMdxMessages[locale];
  }

  const translationsDir = path.join(process.cwd(), "content/translations");
  const mdxMessages: Record<string, Record<string, string>> = {}; // Changed type to be more specific

  if (fs.existsSync(translationsDir)) {
    const files = fs.readdirSync(translationsDir);

    for (const file of files) {
      if (!file.endsWith(`.${locale}.mdx`)) continue;

      const parts = file.split(".");
      // Ensure there are at least 3 parts: namespace.key.locale.mdx
      if (parts.length < 4) continue; // Changed from 3 to 4 to correctly handle namespace.key.locale.mdx

      const key = parts[parts.length - 3]; // This is 'key' from 'namespace.key.locale.mdx'
      const namespace = parts.slice(0, -3).join("."); // This is 'namespace' from 'namespace.key.locale.mdx'

      if (!namespace || !key) continue;

      try {
        const fullPath = path.join(translationsDir, file);
        const content = fs.readFileSync(fullPath, "utf8");
        const cleanContent = content.replace(/^---[\s\S]*?---/, "").trim();

        if (!mdxMessages[namespace]) {
          mdxMessages[namespace] = {};
        }
        mdxMessages[namespace][key] = cleanContent;
      } catch (e) {
        console.error(`Error loading translation file ${file}:`, e);
      }
    }
  }

  cachedMdxMessages[locale] = mdxMessages;
  return mdxMessages;
}
