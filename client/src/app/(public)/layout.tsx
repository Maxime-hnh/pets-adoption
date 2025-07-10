import type { Metadata } from "next";
import { CommonLayoutWrapper } from "@/_components/layout/common-layout-wrapper";
import { PublicProviders } from "@/_core/public-providers";
import '../globals.css';
import { authServerService } from "@/_services/auth-server.service";
import { use } from "react";
import { AuthStoreHydrator } from "@/_core/auth-store-hydrator";

export const metadata: Metadata = {
  title: "Title",
  description: "Description",
  icons: {
    icon: '/favicon.ico'
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const user = use(authServerService.meServer())

  return (
    <CommonLayoutWrapper>
      <PublicProviders user={user}>
        {children}
      </PublicProviders>
    </CommonLayoutWrapper>
  );
}
