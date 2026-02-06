import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing.config";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // 1. Load base JSON messages
  const baseMessages = (await import(`../messages/${locale}.json`)).default;

  // 2. Load MDX overrides from content/translations (Server-side only)
  let mdxMessages: Record<string, any> = {};

  // Gating Node.js specific code
  if (
    typeof process !== "undefined" &&
    process.versions &&
    process.versions.node
  ) {
    try {
      // Using dynamic import to prevent static analysis from pulling this into Edge/Middleware
      const { getMdxTranslations } = await import("@/lib/i18n-server");
      mdxMessages = getMdxTranslations(locale);
    } catch (e) {
      console.error("Failed to load MDX translations:", e);
    }
  }

  // 3. Merge: MDX overrides JSON
  const finalMessages = { ...baseMessages };
  for (const ns in mdxMessages) {
    finalMessages[ns] = {
      ...(finalMessages[ns] || {}),
      ...mdxMessages[ns],
    };
  }

  return {
    locale,
    messages: finalMessages,
  };
});
