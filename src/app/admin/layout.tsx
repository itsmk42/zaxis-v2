import { Metadata } from "next";
import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// METADATA
// ============================================

export const metadata: Metadata = {
  title: "Admin Dashboard | Z Axis Studio",
  description: "Manage products, orders, and inquiries",
};

// ============================================
// NAVIGATION ITEMS
// ============================================

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Bulk Inquiries",
    href: "/admin/inquiries",
    icon: FileText,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

// ============================================
// ADMIN LAYOUT
// ============================================

// TODO: Add Auth Check - Verify user is admin before rendering
// Example with NextAuth:
// const session = await getServerSession(authOptions);
// if (!session || session.user.role !== 'admin') {
//   redirect('/login');
// }

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      {/* Fixed Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-white/10 bg-black">
        {/* Logo */}
        <div className="flex h-16 items-center border-b border-white/10 px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
              <span className="text-sm font-bold text-black">Z</span>
            </div>
            <span className="text-lg font-bold text-white">Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-white/10 bg-zinc-950/80 px-8 backdrop-blur-xl">
          <Breadcrumb />
        </header>

        {/* Page Content */}
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}

// ============================================
// NAV LINK COMPONENT
// ============================================

interface NavLinkProps {
  item: (typeof NAV_ITEMS)[number];
}

function NavLink({ item }: NavLinkProps) {
  // TODO: Use usePathname() to determine active state
  // For now, we'll just render the link without active state
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
        "text-white/60 hover:bg-white/5 hover:text-white"
        // Add active state: "bg-white/10 text-white" when pathname matches
      )}
    >
      <Icon className="h-5 w-5" />
      {item.label}
    </Link>
  );
}

// ============================================
// BREADCRUMB COMPONENT
// ============================================

function Breadcrumb() {
  // TODO: Generate breadcrumb from pathname
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-white/40">Admin</span>
      <ChevronRight className="h-4 w-4 text-white/20" />
      <span className="text-white">Dashboard</span>
    </div>
  );
}

