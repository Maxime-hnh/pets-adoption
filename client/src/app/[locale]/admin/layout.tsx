import AdminProtection from '@/_components/AdminProtection';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProtection>
      <div className="admin-layout">
        {children}
      </div>
    </AdminProtection>
  );
}
