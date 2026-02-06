import { getTranslations } from "next-intl/server";
import { MdxRenderer } from "./mdx-renderer";

interface MdxTranslationProps {
  namespace: string;
  id: string;
  variables?: Record<string, string | number | boolean | undefined>;
}

/**
 * Renders a translation key as MDX, supporting variables and shared components.
 */
export async function MdxTranslation({
  namespace,
  id,
  variables,
}: MdxTranslationProps) {
  const t = await getTranslations(namespace);
  const rawContent = t.raw(id);

  if (typeof rawContent !== "string") {
    return <>{String(rawContent)}</>;
  }

  return <MdxRenderer content={rawContent} variables={variables} />;
}
