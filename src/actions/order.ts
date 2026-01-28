"use server";

import { prisma } from "@/lib/db"; // Assuming you have a prisma instance export
import { checkoutSchema } from "@/lib/validators/checkout";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { resend } from "@/lib/resend";
import OrderReceipt from "@/components/emails/order-receipt";

// Helper to calculate totals (simplified logic - mirroring cart)
// Ideally this should reuse a shared calculation utility
// Minimized type definition to avoid circular deps
interface CartItemPayload {
    productId: string;
    quantity: number;
    productName?: string; // Optional context
}

async function calculateTotalFromItems(items: CartItemPayload[]) {
    if (!items.length) return null;

    // Fetch products from DB to get authoritative prices
    const productIds = items.map(i => i.productId);
    const products = await prisma.product.findMany({
        where: { id: { in: productIds } }
    });

    let subtotal = 0;
    const verifiedItems = [];

    for (const item of items) {
        const product = products.find(p => p.id === item.productId);
        if (!product) continue; // Skip invalid items

        const price = product.compareAtPrice && Number(product.compareAtPrice) < Number(product.basePrice)
            ? Number(product.compareAtPrice)
            : Number(product.basePrice);

        subtotal += price * item.quantity;

        verifiedItems.push({
            ...item,
            product,
            price
        });
    }

    const gstRate = 0.18;
    const gstAmount = subtotal * gstRate;
    const shippingCost = subtotal > 1000 ? 0 : 100;
    const grandTotal = subtotal + gstAmount + shippingCost;

    return { subtotal, gstAmount, shippingCost, grandTotal, items: verifiedItems };
}

export async function createOrder(data: z.infer<typeof checkoutSchema>, clientItems: CartItemPayload[]) {
    const { userId } = await auth();
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
        // 0. Ensure User Exists (Sync Clerk User to DB)
        // This solves the foreign key constraint error P2003
        await prisma.user.upsert({
            where: { id: userId },
            update: {
                name: fullName,
                phone: phone,
                // We typically don't update email blindly as it's sensitive, 
                // but for this MVP sync it helps if the user changed it in Clerk but not here.
                // However, if email causes conflict, we might want to skip.
                // For now, let's just make sure the ID exists.
            },
            create: {
                id: userId,
                email: email,
                name: fullName,
                phone: phone
            }
        });

        // 1. Calculate Totals from passed items
        const cartData = await calculateTotalFromItems(clientItems);
        if (!cartData || cartData.items.length === 0) {
            return { error: "Your cart is empty or contains invalid items" };
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
                    create: cartData.items.map(item => ({
                        productId: item.productId,
                        productName: item.product.name,
                        productType: item.product.productType,
                        productSlug: item.product.slug,
                        productImage: "", // Ideally fetch the first image
                        unitPrice: item.price, // Should verify price
                        quantity: item.quantity,
                        lineTotal: Number(item.price) * item.quantity,
                        gstRate: 18,
                        gstAmount: (Number(item.price) * item.quantity) * 0.18,
                    }))
                }
            },
            include: {
                items: true
            }
        });

        // 3. Send Email Receipt
        try {
            await resend.emails.send({
                from: 'Z Axis Studio <orders@zaxisstudio.in>',
                to: email,
                subject: `Order Confirmation - ${orderNumber}`,
                react: OrderReceipt({
                    customerName: fullName,
                    orderNumber: orderNumber,
                    items: order.items.map(item => ({
                        productName: item.productName,
                        quantity: item.quantity,
                        unitPrice: Number(item.unitPrice),
                        lineTotal: Number(item.lineTotal),
                    })),
                    subtotal: Number(order.subtotal),
                    totalGst: Number(order.totalGst),
                    shippingCost: Number(order.shippingCost),
                    grandTotal: Number(order.grandTotal),
                    paymentMethod: paymentMethod,
                    paymentStatus: order.status,
                    shippingAddress: {
                        name: fullName,
                        line1: addressLine1,
                        line2: addressLine2,
                        city: city,
                        state: state,
                        pincode: pincode,
                    },
                }),
            });
            console.log(`✅ Order receipt email sent to ${email} for order ${orderNumber}`);
        } catch (emailError) {
            // Don't fail the order if email fails - just log it
            console.error(`❌ Failed to send order receipt email for ${orderNumber}:`, emailError);
        }

        // 4. Clear Cart
        // Note: Client side must also clear. We'll return success to trigger that.

    } catch (error) {
        console.error("Order creation failed:", error);
        return { error: "Something went wrong while creating your order." };
    }

    // Allow client to redirect
    return { success: true };
}
