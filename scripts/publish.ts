import { getConfig } from "../lib/config";
import fs from "fs";
import path from "path";

const config = getConfig();
const slug = process.argv[2];

if (!slug) {
  console.error("Please provide a slug provided as an argument.");
  console.log("Usage: bun run publish <slug>");
  process.exit(1);
}

const posts: Record<string, string> = {};

console.log(`Publishing post: ${slug}`);

for (const lang of config.Languages) {
  const fileName = `${slug}.${lang}.mdx`;
  const filePath = path.join(process.cwd(), fileName);

  if (!fs.existsSync(filePath)) {
    console.error(`Error: Missing file for language '${lang}': ${fileName}`);
    process.exit(1);
  }

  console.log(`Reading: ${fileName}`);
  posts[lang] = fs.readFileSync(filePath, "utf8");
}

const payload = {
  token: config.Token,
  slug,
  posts,
};

// Use localhost:3000 by default, or an environment variable if set
const API_URL = process.env.API_URL || "http://localhost:3000/api/publish";

console.log(`Sending to ${API_URL}...`);

try {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Error from API:", data.error);
    process.exit(1);
  }

  console.log("Success!", data);
} catch (error) {
  console.error("Network error:", error);
  process.exit(1);
}
