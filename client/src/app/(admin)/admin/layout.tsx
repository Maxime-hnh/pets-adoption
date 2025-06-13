import { SidebarProvider } from "@/_components/ui/sidebar";
import { AppSidebar } from "@/app/(admin)/admin/app-sidebar";
import Image from 'next/image';
import { Button } from '@/_components/ui/button';
import PageBreadcrumbs from '@/_components/PageBreadcrumbs';
import { CommonLayoutWrapper } from "@/_components/layout/common-layout-wrapper";
import { AdminProviders } from './admin-providers';
import "../../globals.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  const excludedPath = ['', 'fr'];
  const pathNameLabelMap: Record<string, string> = {
    'admin': 'Dashboard',
    'animals': 'Animaux',
    'create': 'Création'
  }


  return (
    <CommonLayoutWrapper>
      <header className='w-full h-[60px]  border-b-2 flex items-center justify-between px-8'>
        <Image src="/favicon.ico" width={50} height={50} alt="logo" />
        <PageBreadcrumbs excludedPath={excludedPath} pathNameLabelMap={pathNameLabelMap} />
        <Button>Déconnexion</Button>

      </header>
      <main className="admin-layout overflow-y-auto h-[calc(100dvh-60px)]">
        <SidebarProvider>
          <AppSidebar />
          <AdminProviders>
            {children}
          </AdminProviders>
        </SidebarProvider>
      </main>
    </CommonLayoutWrapper>
  );
}
