import { enUS, tr } from "date-fns/locale";
import type { Locale } from "date-fns";

const locales: Record<string, Locale> = {
  en: enUS,
  tr: tr,
};

export function getDateLocale(localeCode: string): Locale {
  return locales[localeCode] || enUS;
}
