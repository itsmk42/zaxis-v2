"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AdminSidebar } from "./admin-sidebar";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function AdminMobileHeader() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    // Close sheet on route change
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <div className="flex items-center border-b border-white/10 bg-zinc-950 p-4 md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 border-r border-white/10 bg-black w-72">
                    <AdminSidebar />
                </SheetContent>
            </Sheet>
            <span className="ml-4 text-lg font-bold text-white">Admin Dashboard</span>
        </div>
    );
}
