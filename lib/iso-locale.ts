export const isoLocales: Record<string, string> = {
  en: "en_US",
  tr: "tr_TR",
};

export function getIsoLocale(locale: string): string {
  return isoLocales[locale] || "en_US";
}
