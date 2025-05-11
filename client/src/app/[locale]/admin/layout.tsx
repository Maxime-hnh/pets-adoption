import AdminProtection from '@/_components/AdminProtection';
import { SidebarProvider } from "@/_components/ui/sidebar";
import { SidebarTrigger } from "@/_components/ui/sidebar";
import { AppSidebar } from "@/_components/ui/app-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProtection>
      <div className="admin-layout">
        <SidebarProvider>
          <AppSidebar />
          <main>
            {/* <SidebarTrigger /> */}
            {children}
          </main>
        </SidebarProvider>
      </div>
    </AdminProtection>
  );
}
