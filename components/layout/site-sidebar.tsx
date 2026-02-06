import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface MobileNavProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
  locales: string[];
}

export function SiteSidebar({
  open,
  setOpen,
  onClose,
  locales,
}: MobileNavProps) {
  const t = useTranslations("Navigation");
  const tTheme = useTranslations("Theme");
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="flex h-[100dvh] w-[300px] flex-col overflow-y-auto sm:w-[400px]"
      >
        <SheetHeader className="mb-6 text-left">
          <SheetTitle className="sr-only">Mobile Menu</SheetTitle>{" "}
          {/* Accessibility */}
          <div className="flex items-center gap-2">
            {/* <span className="font-serif text-xl font-bold tracking-tighter">woldan<span className="text-primary">.dev</span></span> REMOVED AS PER USER REQUEST */}
          </div>
        </SheetHeader>

        <nav className="flex flex-col space-y-4">
          <Link
            href="/"
            className="hover:text-primary hover:bg-accent/50 rounded-xl px-3 py-2 text-lg font-medium transition-all"
            onClick={onClose}
          >
            {t("home")}
          </Link>
          <Link
            href="/blog"
            className="hover:text-primary hover:bg-accent/50 rounded-xl px-3 py-2 text-lg font-medium transition-all"
            onClick={onClose}
          >
            {t("blog")}
          </Link>
        </nav>

        <div className="mt-auto pb-8">
          <div className="border-t pt-8">
            <p className="text-muted-foreground mb-4 text-sm">Languages</p>
            <div className="flex flex-wrap gap-2">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={pathname}
                  locale={l}
                  className={`rounded-md px-3 py-1 text-sm uppercase transition-all ${
                    currentLocale === l
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                  onClick={onClose}
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4">
            <p className="text-muted-foreground mb-4 text-sm">
              {tTheme("title")}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTheme("light")}
                className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-sm transition-all ${
                  theme === "light"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <Sun className="h-4 w-4" />
                <span>{tTheme("light")}</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-sm transition-all ${
                  theme === "dark"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <Moon className="h-4 w-4" />
                <span>{tTheme("dark")}</span>
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`flex cursor-pointer items-center gap-2 rounded-md px-3 py-1 text-sm transition-all ${
                  theme === "system"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                <Laptop className="h-4 w-4" />
                <span>{tTheme("system")}</span>
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
