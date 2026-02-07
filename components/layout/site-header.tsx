"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Menu } from "lucide-react";
import { SiteSidebar } from "@/components/layout/site-sidebar";
import { Button } from "@/components/ui/button";

import { Config } from "@/lib/config";
import { Github, Instagram, Linkedin, Mail, Disc } from "lucide-react";

interface SiteHeaderProps {
  locales: string[];
  nickname: string;
  domain: string;
  socials?: Config["Socials"];
}

export function SiteHeader({
  locales,
  nickname,
  domain,
  socials,
}: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const baseUrl = `https://${domain}`;

  const navSchema = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: ["Home", "Blog"],
    url: [`${baseUrl}/`, `${baseUrl}/blog`],
  };

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 grid w-full border-b backdrop-blur-md">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navSchema) }}
      />
      <div className="flex h-14 w-full items-center px-4 md:px-8">
        <div className="mr-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 cursor-pointer"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-xl font-bold">{nickname}</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center gap-1">
            {socials && (
              <div className="flex items-center gap-2">
                {socials.Github && (
                  <a
                    href={socials.Github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground p-2 transition-colors"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">Github</span>
                  </a>
                )}
                {socials.Linkedin && (
                  <a
                    href={socials.Linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground p-2 transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">Linkedin</span>
                  </a>
                )}
                {socials.Instagram && (
                  <a
                    href={socials.Instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground p-2 transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                )}
                {socials.Discord && (
                  <a
                    href={socials.Discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground p-2 transition-colors"
                  >
                    <Disc className="h-5 w-5" />
                    <span className="sr-only">Discord</span>
                  </a>
                )}
                {socials.Email && (
                  <a
                    href={`mailto:${socials.Email}`}
                    className="text-muted-foreground hover:text-foreground p-2 transition-colors"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </a>
                )}
              </div>
            )}
          </nav>
        </div>
      </div>
      <SiteSidebar
        open={isOpen}
        setOpen={setIsOpen}
        onClose={() => setIsOpen(false)}
        locales={locales}
      />
    </header>
  );
}
