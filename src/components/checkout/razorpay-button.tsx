"use client";

import { useState, useEffect, useCallback } from "react";
import { CreditCard, Loader2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, type CartItem } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";

// ============================================
// TYPES
// ============================================

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
  close: () => void;
  on: (event: string, callback: () => void) => void;
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayButtonProps {
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  onSuccess?: (response: RazorpayResponse) => void;
  onError?: (error: Error) => void;
  disabled?: boolean;
  className?: string;
}

// ============================================
// RAZORPAY BUTTON COMPONENT
// ============================================

export function RazorpayButton({
  customerName,
  customerEmail,
  customerPhone,
  onSuccess,
  onError,
  disabled = false,
  className,
}: RazorpayButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const { items, getSubtotal, clearCart } = useCart();
  const subtotal = getSubtotal();
  const isEmpty = items.length === 0;

  // Load Razorpay SDK script on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if script is already loaded
    if (window.Razorpay) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay SDK");
      onError?.(new Error("Failed to load payment gateway"));
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup only if we added the script
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [onError]);

  const handlePayment = useCallback(async () => {
    if (!isScriptLoaded || isEmpty) return;

    setIsLoading(true);

    try {
      // Step 1: Create order on our server
      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            customText: item.customText,
            customFileUrl: item.customFileUrl,
          })),
          customerEmail,
          customerPhone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create order");
      }

      const orderData = await response.json();

      // Step 2: Initialize Razorpay checkout
      const options: RazorpayOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Z Axis Studio",
        description: "3D Printed Goods",
        order_id: orderData.orderId,
        handler: (paymentResponse) => {
          // Payment successful
          console.log("Payment successful:", paymentResponse);
          console.log("Payment ID:", paymentResponse.razorpay_payment_id);
          console.log("Order ID:", paymentResponse.razorpay_order_id);
          console.log("Signature:", paymentResponse.razorpay_signature);

          // Clear the cart
          clearCart();

          // Call success callback
          onSuccess?.(paymentResponse);
        },
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: {
          color: "#ffffff", // Z Axis Studio brand color (white on dark)
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Payment initialization failed:", error);
      onError?.(error instanceof Error ? error : new Error("Payment failed"));
    } finally {
      setIsLoading(false);
    }
  }, [
    isScriptLoaded,
    isEmpty,
    items,
    customerEmail,
    customerPhone,
    customerName,
    clearCart,
    onSuccess,
    onError,
  ]);

  return (
    <Button
      size="lg"
      onClick={handlePayment}
      disabled={disabled || isEmpty || isLoading || !isScriptLoaded}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <Smartphone className="mr-2 h-5 w-5" />
          Pay {formatPrice(subtotal)}
        </>
      )}
    </Button>
  );
}

