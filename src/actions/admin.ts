"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";
import { z } from "zod";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { status },
        });
        revalidatePath("/admin/orders");
        return { success: true };
    } catch (error) {
        console.error("Failed to update order status:", error);
        return { error: "Failed to update order status" };
    }
}

export async function updateStoreSettings(data: {
    upiId: string;
    deliveryFee: number;
    isStoreOpen: boolean;
    bannerMessage?: string | null;
}) {
    try {
        // Singleton pattern: always ID 1
        await prisma.storeSettings.upsert({
            where: { id: 1 },
            update: data,
            create: { ...data, id: 1 },
        });
        revalidatePath("/admin/settings");
        revalidatePath("/"); // revalidate globally as store open/close affects everything
        return { success: true };
    } catch (error) {
        console.error("Failed to update settings:", error);
        return { error: "Failed to update settings" };
    }
}
