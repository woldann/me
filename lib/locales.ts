// Avoid importing the full config module to prevent potential circular dependencies or side effects during build
// We only need LANGUAGES here.
import fs from "fs";
import path from "path";
import yaml from "js-yaml";

let locales = ["en", "tr"];
let defaultLocale = "en";

try {
  // Priority: Env > Config File > Default
  if (process.env.LANGUAGES) {
    locales = process.env.LANGUAGES.split(",").map((s) => s.trim());
  } else {
    // Fallback to reading config.yaml manually if env is not set
    // This duplicates some logic but isolates the dependency
    const configPath = path.join(process.cwd(), "config.yaml");
    if (fs.existsSync(configPath)) {
      const fileContents = fs.readFileSync(configPath, "utf8");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const config = yaml.load(fileContents) as any;
      if (config.Languages && Array.isArray(config.Languages)) {
        locales = config.Languages;
      }
    }
  }

  if (locales.length > 0) {
    defaultLocale = locales[0];
  }
} catch (e) {
  console.warn("Failed to load locales in lib/locales.ts", e);
}

export { locales, defaultLocale };
