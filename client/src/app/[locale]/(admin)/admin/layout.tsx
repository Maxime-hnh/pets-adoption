import { SidebarProvider } from "@/_components/ui/sidebar";
import { AppSidebar } from "@/app/[locale]/(admin)/admin/app-sidebar";
import Image from 'next/image';
import { Button } from '@/_components/ui/button';
import PageBreadcrumbs from '@/_components/PageBreadcrumbs';
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { CommonLayoutWrapper } from "@/_core/common-layout-wrapper";
import { AdminProviders } from './admin-providers';
import "../../globals.css";

export default async function AdminLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const excludedPath = ['', 'fr'];
  const pathNameLabelMap: Record<string, string> = {
    'admin': 'Dashboard',
    'animals': 'Animaux',
    'create': 'Création'
  }


  return (
    <CommonLayoutWrapper locale={locale}>
      <header className='w-full h-[60px]  border-b-2 flex items-center justify-between px-8'>
        <Image src="/favicon.ico" width={50} height={50} alt="logo" />
        <PageBreadcrumbs excludedPath={excludedPath} pathNameLabelMap={pathNameLabelMap} />
        <Button>Déconnexion</Button>

      </header>
      <main className="admin-layout">
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
