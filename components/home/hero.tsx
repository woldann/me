"use client";

import { motion } from "framer-motion";
import { TypographyH1 } from "@/components/ui/typography";
import { useTranslations } from "next-intl";
import Typewriter from "typewriter-effect";

interface HeroProps {
  onIntroComplete?: () => void;
  showDescription?: boolean;
  description: React.ReactNode;
}

export function Hero({
  onIntroComplete,
  showDescription,
  description,
}: HeroProps) {
  const t = useTranslations("Hero");
  const greeting = t("greeting");

  return (
    <section className="space-y-8 py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <TypographyH1 className="mb-6 font-serif">
          <span className="inline-block">
            <Typewriter
              component="span"
              onInit={(typewriter) => {
                typewriter
                  .typeString(greeting)
                  .callFunction((state) => {
                    if (onIntroComplete) {
                      onIntroComplete();
                    }
                    // Fade out cursor after 3 seconds
                    setTimeout(() => {
                      if (state.elements.cursor) {
                        state.elements.cursor.style.transition =
                          "color 1s ease-out";
                        state.elements.cursor.style.color = "transparent";

                        // Completely remove after transition
                        setTimeout(() => {
                          if (state.elements.cursor) {
                            state.elements.cursor.style.display = "none";
                          }
                        }, 1000);
                      }
                    }, 3000);
                  })
                  .start();
              }}
              options={{
                cursor: "▍",
                delay: 50,
                cursorClassName:
                  "text-foreground opacity-80 animate-pulse ml-1",
              }}
            />
          </span>
        </TypographyH1>
        <div className="text-muted-foreground min-h-[3.5rem] max-w-2xl leading-relaxed">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showDescription ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="prose prose-sm dark:prose-invert prose-p:leading-relaxed"
          >
            {description}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
