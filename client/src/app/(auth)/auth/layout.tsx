import type { Metadata } from "next";
import { CommonLayoutWrapper } from "@/_components/layout/common-layout-wrapper";
import '../../globals.css';

export const metadata: Metadata = {
  title: 'Connexion',
  description: 'Page de connexion utilisateur.',
  icons: {
    icon: '/favicon.ico'
  },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {

  return (
    <CommonLayoutWrapper>
      <main className="flex-1 h-dvh w-dvw overflow-x-hidden bg-[#FFFAE9]">
        {children}
      </main>
    </CommonLayoutWrapper>
  );
}
