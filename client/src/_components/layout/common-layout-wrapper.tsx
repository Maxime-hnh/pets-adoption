import { Geist, Geist_Mono, Poppins, Sora, IBM_Plex_Sans, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  subsets: ['latin']
});

const sora = Sora({
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sora',
  subsets: ["latin"]
});
const ibmPlexSans = IBM_Plex_Sans({
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  subsets: ["latin"]
});
const inter = Inter({
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  subsets: ['latin']
});

export async function CommonLayoutWrapper({
  children,
  locale
}: {
  children: React.ReactNode;
  locale: string;
}) {


  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} ${sora.variable} ${ibmPlexSans.variable} ${inter.variable} light`}
      >
       <NextIntlClientProvider>
          {children}
       </NextIntlClientProvider>
      </body>
    </html>
  );
}
