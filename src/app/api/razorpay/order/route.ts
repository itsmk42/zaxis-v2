import { NextRequest, NextResponse } from "next/server";
import { razorpay, toPaise, generateReceiptId } from "@/lib/razorpay";
import { z } from "zod";

// ============================================
// REQUEST VALIDATION SCHEMA
// ============================================

const CartItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  unitPrice: z.number().positive(),
  quantity: z.number().int().positive(),
  customText: z.string().nullable().optional(),
  customFileUrl: z.string().nullable().optional(),
});

const CreateOrderSchema = z.object({
  cartItems: z.array(CartItemSchema).min(1, "Cart cannot be empty"),
  customerEmail: z.string().email().optional(),
  customerPhone: z.string().optional(),
  notes: z.record(z.string()).optional(),
});

// ============================================
// POST /api/razorpay/order
// Creates a new Razorpay order from cart items
// ============================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validationResult = CreateOrderSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "Invalid request body", 
          details: validationResult.error.flatten() 
        },
        { status: 400 }
      );
    }

    const { cartItems, customerEmail, customerPhone, notes } = validationResult.data;

    // Calculate total amount on the server (security: never trust client-side totals)
    const subtotal = cartItems.reduce(
      (total, item) => total + item.unitPrice * item.quantity,
      0
    );

    // TODO: Add GST calculation based on customer location
    // For now, assuming prices are inclusive of GST
    const totalAmount = subtotal;

    // Convert to paise (Razorpay requires smallest currency unit)
    const amountInPaise = toPaise(totalAmount);

    // Generate unique receipt ID
    const receiptId = generateReceiptId();

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: receiptId,
      notes: {
        ...notes,
        itemCount: String(cartItems.length),
        customerEmail: customerEmail || "",
        customerPhone: customerPhone || "",
        // Store cart summary for reference
        cartSummary: cartItems
          .map((item) => `${item.productName} x${item.quantity}`)
          .join(", ")
          .slice(0, 500), // Razorpay notes have character limits
      },
    });

    // Return order details to client
    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      // Include key for client-side initialization
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:", error);
    
    // Handle Razorpay-specific errors
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          error: "Failed to create payment order", 
          message: error.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

