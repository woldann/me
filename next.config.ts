import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import { locales, defaultLocale } from "./lib/locales";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_LOCALES: locales.join(","),
    NEXT_PUBLIC_DEFAULT_LOCALE: defaultLocale,
  },
};

export default withNextIntl(nextConfig);
