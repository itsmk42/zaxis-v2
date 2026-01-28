"use server";

import { prisma } from "@/lib/db";

export async function trackOrder(orderId: string) {
    try {
        const order = await prisma.order.findUnique({
            where: { orderNumber: orderId },
            select: {
                orderNumber: true,
                status: true,
                createdAt: true,
                shippingName: true,
                shippingPhone: true,
                shippingLine1: true,
                shippingLine2: true,
                shippingCity: true,
                shippingState: true,
                shippingPincode: true,
                subtotal: true,
                totalGst: true,
                shippingCost: true,
                grandTotal: true,
                paymentMethod: true,
                trackingNumber: true,
                courierName: true,
            },
        });

        if (!order) {
            return { error: "Order not found. Please check your order ID and try again." };
        }

        return { order };
    } catch (error) {
        console.error("Track order error:", error);
        return { error: "Failed to track order. Please try again later." };
    }
}
