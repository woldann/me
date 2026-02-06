"use client";

import { useTranslations } from "next-intl";
import { Config } from "@/lib/config";

interface SiteFooterProps {
  fullName: string;
  socials?: Config["Socials"];
}

export function SiteFooter({ fullName, socials }: SiteFooterProps) {
  const t = useTranslations("Footer");

  return (
    <footer className="mt-auto border-t py-6 md:px-8 md:py-0">
      <div className="flex w-full flex-col items-center justify-between gap-4 px-6 md:h-24 md:flex-row md:px-12">
        <p className="text-muted-foreground text-center text-sm leading-loose text-balance md:text-left">
          {t.rich("builtBy", {
            name: fullName,
            link: (chunks) => (
              <a
                href="https://github.com/woldann/me"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4"
              >
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>
    </footer>
  );
}
