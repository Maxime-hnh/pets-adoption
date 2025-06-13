import type { Metadata } from "next";
import { CommonLayoutWrapper } from "@/_components/layout/common-layout-wrapper";
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
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <CommonLayoutWrapper>
      <PublicProviders>
      {children}
      </PublicProviders>
    </CommonLayoutWrapper>
  );
}
