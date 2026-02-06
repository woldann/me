import fs from "fs";
import path from "path";
import yaml from "js-yaml";

export interface Config {
  FirstName: string;
  LastName: string;
  Nickname: string;
  BornDate: string;
  Token: string;
  Languages: string[];
  FullName: string;
  Socials?: {
    Discord?: string;
    Email?: string;
    Linkedin?: string;
    Github?: string;
    Instagram?: string;
  };
  Age: number;
  Domain: string;
}

const configPath = path.join(process.cwd(), "config.yaml");
let cachedConfig: Config | null = null;

function calculateAge(bornDate: string): number {
  // Handle DD/MM/YYYY format
  const parts = bornDate.split("/");
  let birthDate: Date;

  if (parts.length === 3) {
    // Note: Month is 0-indexed in JS Date
    birthDate = new Date(
      parseInt(parts[2]),
      parseInt(parts[1]) - 1,
      parseInt(parts[0])
    );
  } else {
    birthDate = new Date(bornDate);
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function getConfig(): Config {
  if (cachedConfig) {
    return cachedConfig;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fileConfig: Omit<Config, "FullName" | "Age" | "Domain"> & {
    Domain?: string;
  } = {} as any;

  if (fs.existsSync(configPath)) {
    const fileContents = fs.readFileSync(configPath, "utf8");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fileConfig = yaml.load(fileContents) as any;
  }

  // Helper to get from Env or File
  const getVal = (
    envKey: string,
    fileKey: keyof Config | string,
    required = false
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const val = process.env[envKey] || (fileConfig as any)[fileKey];
    if (required && !val) {
      throw new Error(
        `Missing required configuration: ${envKey} (Env) or ${fileKey} (YAML)`
      );
    }
    return val;
  };

  const social = (
    envKey: string,
    fileKey: keyof NonNullable<Config["Socials"]>
  ) => {
    return process.env[`SOCIAL_${envKey}`] || fileConfig.Socials?.[fileKey];
  };

  const rawLanguages = process.env.LANGUAGES || fileConfig.Languages;
  // If Languages is string (from Env), split it. If array (from YAML), use as is.
  const languages =
    typeof rawLanguages === "string"
      ? rawLanguages.split(",").map((s) => s.trim())
      : rawLanguages;

  if (!languages || languages.length === 0) {
    throw new Error(
      "Missing required configuration: LANGUAGES (Env) or Languages (YAML)"
    );
  }

  const firstName = getVal("FIRST_NAME", "FirstName", true);
  const lastName = getVal("LAST_NAME", "LastName", true);
  const nickname = getVal("NICKNAME", "Nickname", true);
  const bornDate = getVal("BORN_DATE", "BornDate", true);
  const token = getVal("TOKEN", "Token", true);
  const domain =
    process.env.DOMAIN || fileConfig.Domain || `${nickname.toLowerCase()}.me`;

  cachedConfig = {
    FirstName: firstName,
    LastName: lastName,
    Nickname: nickname,
    BornDate: bornDate,
    Token: token,
    Languages: languages,
    FullName: `${firstName} ${lastName}`,
    Age: calculateAge(bornDate),
    Domain: domain,
    Socials: {
      Github: social("GITHUB", "Github"),
      Linkedin: social("LINKEDIN", "Linkedin"),
      Instagram: social("INSTAGRAM", "Instagram"),
      Discord: social("DISCORD", "Discord"),
      Email: social("EMAIL", "Email"),
    },
  } as Config;

  return cachedConfig;
}
