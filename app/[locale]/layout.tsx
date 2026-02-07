import { Inter, Merriweather } from "next/font/google";
import "../globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  variable: "--font-serif",
  subsets: ["latin"],
});

import { getIsoLocale } from "@/lib/iso-locale";
import { getConfig } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { Nickname, Domain, Languages, FullName } = getConfig();
  const url = `https://${Domain}`;

  const isoLocale = getIsoLocale(locale);

  const languages: Record<string, string> = {};
  Languages.forEach((lang) => {
    // Convert 'en' -> 'en-US' for alternates (hyphenated standard)
    const iso = getIsoLocale(lang).replace("_", "-");
    languages[iso] = `/${lang}`;
  });

  return {
    title: {
      default: `${Nickname} - Personal Blog`,
      template: `%s | ${Nickname}`,
    },
    description: "Personal website and blog.",
    keywords: [
      "Software Engineer",
      "Full Stack Developer",
      "Blog",
      "Technology",
      "Coding",
    ],
    authors: [{ name: FullName, url: url }],
    creator: FullName,
    metadataBase: new URL(url),
    alternates: {
      canonical: `${url}/${locale}`,
      languages: languages,
    },
    openGraph: {
      title: `${Nickname} - Personal Blog`,
      description: "Personal website and blog.",
      url: `${url}/${locale}`,
      siteName: `${Nickname} - Personal Blog`,
      locale: isoLocale,
      type: "website",
      images: [
        {
          url: "/icon.ico",
          alt: `${Nickname} - Personal Blog`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${Nickname} - Personal Blog`,
      description: "Personal website and blog.",
      creator: `@${Nickname}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/icon.ico",
    },
  };
}

import { ThemeProvider } from "@/components/theme-provider";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${merriweather.variable} bg-background text-foreground font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
