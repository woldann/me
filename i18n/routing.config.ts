import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  // Values are populated by next.config.ts from config.yaml
  locales: process.env.NEXT_PUBLIC_LOCALES?.split(",") || ["en", "tr"],

  // Used when no locale matches.
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "en",

  // Optional: Disable locale detection if we want strictly to use the default for everyone on root
  // localeDetection: false,
});
