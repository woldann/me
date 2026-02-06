"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return the provider properly so it can inject the theme script (preventing flash),
    // but render null for children until mounted (waiting for hydration).
    return (
      <NextThemesProvider {...props}>
        <div style={{ visibility: "hidden" }}>{children}</div>
      </NextThemesProvider>
    );
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
