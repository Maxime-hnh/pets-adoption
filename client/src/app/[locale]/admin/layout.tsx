import AdminProtection from '@/_components/AdminProtection';
import { SidebarProvider } from "@/_components/ui/sidebar";
import { SidebarTrigger } from "@/_components/ui/sidebar";
import { AppSidebar } from "@/_components/ui/app-sidebar";
import Image from 'next/image';
import { Button } from '@/_components/ui/button';
import PageBreadcrumbs from '@/_components/PageBreadcrumbs';

export default function AdminLayout({
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
    <AdminProtection>
      <div className='w-full h-[60px]  border-b-2 flex items-center justify-between px-8'>
        <Image src="/favicon.ico" width={50} height={50} alt="logo" />
        <PageBreadcrumbs excludedPath={excludedPath} pathNameLabelMap={pathNameLabelMap} />
        <Button>Déconnexion</Button>

      </div>
      <div className="admin-layout">
        <SidebarProvider>
          <AppSidebar />
          {/* <SidebarTrigger /> */}
          {children}
        </SidebarProvider>
      </div>
    </AdminProtection>
  );
}
