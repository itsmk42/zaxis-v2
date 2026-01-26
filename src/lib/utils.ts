import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in INR
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Calculate GST breakdown
 */
export function calculateGST(
  amount: number,
  gstRate: number,
  isInterState: boolean
): {
  cgst: number;
  sgst: number;
  igst: number;
  totalGst: number;
  grandTotal: number;
} {
  const totalGst = (amount * gstRate) / 100;

  if (isInterState) {
    return {
      cgst: 0,
      sgst: 0,
      igst: totalGst,
      totalGst,
      grandTotal: amount + totalGst,
    };
  }

  const halfGst = totalGst / 2;
  return {
    cgst: halfGst,
    sgst: halfGst,
    igst: 0,
    totalGst,
    grandTotal: amount + totalGst,
  };
}

