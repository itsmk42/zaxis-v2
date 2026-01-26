import Razorpay from "razorpay";

// ============================================
// RAZORPAY SERVER-SIDE CLIENT
// ============================================

if (!process.env.RAZORPAY_KEY_ID) {
  throw new Error("Missing RAZORPAY_KEY_ID environment variable");
}

if (!process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("Missing RAZORPAY_KEY_SECRET environment variable");
}

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ============================================
// TYPES
// ============================================

export interface RazorpayOrderOptions {
  amount: number; // Amount in paise (smallest currency unit)
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: "created" | "attempted" | "paid";
  notes: Record<string, string>;
  created_at: number;
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Convert INR amount to paise (Razorpay requires amount in smallest currency unit)
 */
export function toPaise(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Convert paise to INR
 */
export function toRupees(paise: number): number {
  return paise / 100;
}

/**
 * Generate a unique receipt ID for orders
 */
export function generateReceiptId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `rcpt_${timestamp}_${random}`;
}

