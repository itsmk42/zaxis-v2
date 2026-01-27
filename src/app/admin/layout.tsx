import { checkAdmin } from "@/lib/check-admin";
import { AdminMobileHeader } from "@/components/admin/admin-mobile-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata = {
  title: "Admin Dashboard | Z Axis Studio",
  description: "Manage products, orders, and inquiries",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await checkAdmin();

  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 md:pl-64">
        {/* Mobile Header (visible on mobile) */}
        <AdminMobileHeader />

        {/* Page Content */}
        <div className="p-4 md:p-8 pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}

