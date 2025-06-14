"use client"
import { SidebarProvider } from "@/_components/ui/sidebar";
import { AppSidebar } from "@/app/(admin)/admin/app-sidebar";
import Image from 'next/image';
import { Button } from '@/_components/ui/button';
import PageBreadcrumbs from '@/_components/PageBreadcrumbs';
import { CommonLayoutWrapper } from "@/_components/layout/common-layout-wrapper";
import { AdminProviders } from './admin-providers';
import "../../globals.css";
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/_core/query-client';
export default function AdminLayout({ children }: { children: React.ReactNode }) {


  const pathNameLabelMap: Record<string, string> = {
    'admin': 'Dashboard',
    'animals': 'Animaux',
    'create': 'Création'
  }
//h-[calc(100dvh-60px)]

  return (
    <CommonLayoutWrapper>
      <header className='w-full h-[60px]  border-b-2 flex items-center justify-between px-8'>
        <Image src="/favicon.ico" width={50} height={50} alt="logo" />
        <PageBreadcrumbs pathNameLabelMap={pathNameLabelMap} />
        <Button>Déconnexion</Button>

      </header>
      <main className="admin-layout overflow-y-auto ">
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <AppSidebar />
            <AdminProviders>
              {children}
            </AdminProviders>
          </SidebarProvider>
        </QueryClientProvider>
      </main>
    </CommonLayoutWrapper>
  );
}
