"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    FileText,
    Settings,
    LogOut,
} from "lucide-react";

export const NAV_ITEMS = [
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

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-full flex-col border-r border-white/10 bg-black">
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
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                                isActive
                                    ? "bg-white/10 text-white font-medium"
                                    : "text-white/60 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <Icon className="h-5 w-5" />
                            {item.label}
                        </Link>
                    )
                })}
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
    );
}
