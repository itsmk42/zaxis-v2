/**
 * Currency and formatting utilities for Indian market
 */

/**
 * Format a number as Indian Rupees (INR)
 * Uses the Indian numbering system (lakhs, crores)
 * 
 * @example
 * formatPrice(1500) // "₹1,500"
 * formatPrice(150000) // "₹1,50,000"
 * formatPrice(1234567) // "₹12,34,567"
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format price with decimals (for precise amounts)
 */
export function formatPriceWithDecimals(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a number in Indian numbering system (without currency symbol)
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

/**
 * Format price range
 */
export function formatPriceRange(min: number, max: number): string {
  if (min === max) {
    return formatPrice(min);
  }
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}

/**
 * Format discount percentage
 */
export function formatDiscount(originalPrice: number, salePrice: number): string {
  const discount = Math.round(((originalPrice - salePrice) / originalPrice) * 100);
  return `${discount}% off`;
}

/**
 * Calculate and format savings
 */
export function formatSavings(originalPrice: number, salePrice: number): string {
  const savings = originalPrice - salePrice;
  return `Save ${formatPrice(savings)}`;
}

