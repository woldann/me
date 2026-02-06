import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";
import fs from "fs";
import yaml from "js-yaml";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Read config.yaml for locales
const configPath = "./config.yaml";
let locales = ["en", "tr"];
let defaultLocale = "en";

try {
  if (fs.existsSync(configPath)) {
    const fileContents = fs.readFileSync(configPath, "utf8");
    const config = yaml.load(fileContents) as { Languages?: string[] };
    if (config && config.Languages && Array.isArray(config.Languages)) {
      locales = config.Languages;
      defaultLocale = locales[0];
    }
  }
} catch (e) {
  console.warn("Retaining default locales due to error reading config.yaml", e);
}

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_PUBLIC_LOCALES: locales.join(","),
    NEXT_PUBLIC_DEFAULT_LOCALE: defaultLocale,
  },
};

export default withNextIntl(nextConfig);
