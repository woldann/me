import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { LucideProps } from "lucide-react";
import React from "react";

type IconName = keyof typeof dynamicIconImports;
const iconCache: Record<string, React.ComponentType<LucideProps>> = {};

export function getDynamicIcon(name: string): React.ComponentType<LucideProps> {
  const iconName = (
    name in dynamicIconImports ? name : "help-circle"
  ) as IconName;

  if (!iconCache[iconName]) {
    iconCache[iconName] = dynamic(dynamicIconImports[iconName]);
  }

  return iconCache[iconName];
}
