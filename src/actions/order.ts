"use server";

import { prisma } from "@/lib/db"; // Assuming you have a prisma instance export
import { checkoutSchema } from "@/lib/validators/checkout";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";

// Helper to calculate totals (simplified logic - mirroring cart)
// Ideally this should reuse a shared calculation utility
async function calculateCartTotal(userId: string) {
    const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: { product: true }
    });

    if (!cartItems.length) return null;

    let subtotal = 0;

    // In a real app, you'd verify prices again here
    cartItems.forEach(item => {
        // Handle potentially different prices (sale vs regular)
        const price = item.product.compareAtPrice && Number(item.product.compareAtPrice) < Number(item.product.basePrice)
            ? Number(item.product.compareAtPrice)
            : Number(item.product.basePrice);
        subtotal += price * item.quantity;
    });

    const gstRate = 0.18; // 18% Standard
    const gstAmount = subtotal * gstRate;
    const shippingCost = subtotal > 1000 ? 0 : 100; // Free shipping over 1000
    const grandTotal = subtotal + gstAmount + shippingCost;

    return { subtotal, gstAmount, shippingCost, grandTotal, cartItems };
}

export async function createOrder(data: z.infer<typeof checkoutSchema>) {
    const { userId } = auth();
    if (!userId) {
        throw new Error("You must be logged in to place an order.");
    }

    // Server-side validation
    const result = checkoutSchema.safeParse(data);
    if (!result.success) {
        return { error: "Invalid form data" };
    }

    const {
        fullName, phone, email,
        addressLine1, addressLine2, city, state, pincode, landmark,
        paymentMethod, transactionId
    } = result.data;

    try {
        // 1. Get Cart Logic
        const cartData = await calculateCartTotal(userId);
        if (!cartData) {
            return { error: "Your cart is empty" };
        }

        // 2. Create Order
        // Generate Order Number: ZA-YYYYMMDD-XXXX
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, "");
        const count = await prisma.order.count();
        const orderNumber = `ZA-${dateStr}-${(count + 1).toString().padStart(4, "0")}`;

        const order = await prisma.order.create({
            data: {
                orderNumber,
                userId,
                // Denormalized address
                shippingName: fullName,
                shippingPhone: phone,
                shippingLine1: addressLine1,
                shippingLine2: addressLine2,
                shippingCity: city,
                shippingState: state,
                shippingPincode: pincode,
                shippingLandmark: landmark,

                // Totals
                subtotal: cartData.subtotal,
                totalGst: cartData.gstAmount,
                shippingCost: cartData.shippingCost,
                grandTotal: cartData.grandTotal,
                placeOfSupply: "29", // Default to Karnataka code for now or derive from state

                // Status
                status: paymentMethod === "COD" ? "PENDING_COD" : "PENDING_VERIFICATION",
                paymentMethod: paymentMethod,
                transactionId: transactionId,

                // Items
                items: {
                    create: cartData.cartItems.map(item => ({
                        productId: item.productId,
                        productName: item.product.name,
                        productType: item.product.productType,
                        productSlug: item.product.slug,
                        productImage: "", // Ideally fetch the first image
                        unitPrice: item.product.basePrice, // Should verify price
                        quantity: item.quantity,
                        lineTotal: Number(item.product.basePrice) * item.quantity,
                        gstRate: 18,
                        gstAmount: (Number(item.product.basePrice) * item.quantity) * 0.18,
                    }))
                }
            }
        });

        // 3. Clear Cart
        await prisma.cartItem.deleteMany({
            where: { userId }
        });

        // 4. Redirect
        // Note: In server actions, redirect throws an error, so do it last or catch it
    } catch (error) {
        console.error("Order creation failed:", error);
        return { error: "Something went wrong while creating your order." };
    }

    redirect("/checkout/success");
}
