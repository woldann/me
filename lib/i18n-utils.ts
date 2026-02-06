import { getConfig } from "./config";

/**
 * Simple interpolation for raw translation strings to avoid next-intl's ICU tag parser
 * which chokes on MDX tags like <Badge />.
 * Automatically injects all variables from config.yaml.
 */
export function interpolate(
  template: string,
  values: Record<string, string | number | boolean | undefined> = {}
): string {
  const config = getConfig() as unknown as Record<
    string,
    string | number | boolean | undefined
  >;
  const allValues = { ...config, ...values };

  // Create a lowercase map for easier matching
  const lowerCaseValues: Record<string, string | number | boolean | undefined> =
    {};
  for (const [key, val] of Object.entries(allValues)) {
    lowerCaseValues[key.toLowerCase()] = val;
  }

  return template.replace(/{(\w+)}/g, (match, key) => {
    const val =
      allValues[key] !== undefined
        ? allValues[key]
        : lowerCaseValues[key.toLowerCase()];
    return val !== undefined ? String(val) : match;
  });
}
