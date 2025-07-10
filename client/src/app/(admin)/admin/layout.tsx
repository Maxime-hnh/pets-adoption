"use client"

import { SidebarProvider } from "@/_components/ui/sidebar";
import { AppSidebar } from "@/app/(admin)/admin/app-sidebar";
import Image from 'next/image';
import { Button } from '@/_components/ui/button';
import PageBreadcrumbs from '@/_components/PageBreadcrumbs';
import { CommonLayoutWrapper } from "@/_components/layout/common-layout-wrapper";
import "../../globals.css";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/_core/query-client';
import { useRouter } from "next/navigation";
import IsMobileObserver from "@/_core/is-mobile-observer";
import { Toaster } from "@/_components/ui/sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { authService } from "@/_services/auth.service";

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  const router = useRouter();
  const { logout } = authService;
  
  const handleLogout = () => {
    logout();
    router.replace('/')
  };

  const pathNameLabelMap: Record<string, string> = {
    'admin': 'Dashboard',
    'events': 'Événements',
    'users': 'Utilisateurs',
    'settings': 'Paramètres',

    'animals': 'Animaux',
    'create': 'Création',
    'form': 'Formulaire'
  }


  return (
    <CommonLayoutWrapper>
      <IsMobileObserver />
      <Toaster richColors />
      <header className='w-full h-[60px]  border-b-2 flex items-center justify-between px-8'>
        <Image src="/favicon.ico" width={50} height={50} alt="logo" />
        <PageBreadcrumbs pathNameLabelMap={pathNameLabelMap} />
        <Button type="button" onClick={handleLogout}>Déconnexion</Button>

      </header>
      <main className="admin-layout overflow-y-auto ">
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <SidebarProvider>
            <AppSidebar />
            {children}
          </SidebarProvider>
        </QueryClientProvider>
      </main>
    </CommonLayoutWrapper>
  );
}
