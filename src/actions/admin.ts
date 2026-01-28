"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";
import { z } from "zod";

import { resend } from "@/lib/resend";
import OrderProcessingEmail from "@/components/emails/order-processing";
import OrderShippedEmail from "@/components/emails/order-shipped";

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
    try {
        // 1. Update the order
        const order = await prisma.order.update({
            where: { id: orderId },
            data: { status },
            include: { user: true } // Fetch user to get email
        });

        revalidatePath("/admin/orders");

        // 2. Trigger Emails based on status
        if (!order.user?.email) {
            console.warn(`⚠️ No user email found for order ${orderId}, skipping email.`);
            return { success: true };
        }

        const emailData = {
            customerName: order.shippingName || "Customer",
            orderNumber: order.orderNumber,
        };

        try {
            if (status === "PROCESSING") {
                await resend.emails.send({
                    from: 'Z Axis Studio <orders@zaxisstudio.com>',
                    to: order.user.email,
                    subject: `Update: Your Order ${order.orderNumber} is in Production 🛠️`,
                    react: OrderProcessingEmail(emailData),
                });
                console.log(`✅ Order processing email sent to ${order.user.email}`);
            } else if (status === "SHIPPED") {
                await resend.emails.send({
                    from: 'Z Axis Studio <orders@zaxisstudio.com>',
                    to: order.user.email,
                    subject: `Update: Your Order ${order.orderNumber} has Shipped! 🚀`,
                    react: OrderShippedEmail(emailData),
                });
                console.log(`✅ Order shipped email sent to ${order.user.email}`);
            }
        } catch (emailError) {
            console.error(`❌ Failed to send status update email for ${orderId}:`, emailError);
            // Don't fail the action, just log
        }

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
