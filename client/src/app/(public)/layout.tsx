import type { Metadata } from "next";
import { CommonLayoutWrapper } from "@/_components/layout/common-layout-wrapper";
import { PublicProviders } from "@/_core/public-providers";
import '../globals.css';
import { authServerService } from "@/_services/auth-server.service";
import { use } from "react";

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
    <CommonLayoutWrapper user={user}>
      <PublicProviders>
        {children}
      </PublicProviders>
    </CommonLayoutWrapper>
  );
}
