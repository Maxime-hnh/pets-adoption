import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { CommonLayoutWrapper } from "@/_core/common-layout-wrapper";
import { PublicProviders } from "@/_core/public-providers";
import '../globals.css';

export const metadata: Metadata = {
  title: "Title",
  description: "Description",
  icons: {
    icon: '/favicon.ico'
  },
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {

  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <CommonLayoutWrapper locale={locale}>
      <PublicProviders>
      {children}
      </PublicProviders>
    </CommonLayoutWrapper>
  );
}
