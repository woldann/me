import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import { interpolate } from "@/lib/i18n-utils";

interface MdxRendererProps {
  content: string;
  variables?: Record<string, string | number | boolean | undefined>;
}

/**
 * A unified component to render MDX content consistently across the site.
 * Handles interpolation with provided variables (and global config) and
 * provides the shared UI component registry.
 */
export function MdxRenderer({ content, variables }: MdxRendererProps) {
  const interpolated = interpolate(content, variables);

  return <MDXRemote source={interpolated} components={mdxComponents} />;
}
