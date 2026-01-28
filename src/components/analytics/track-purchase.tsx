"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        gtag?: (
            command: string,
            eventName: string,
            params?: Record<string, any>
        ) => void;
    }
}

interface PurchaseEventProps {
    orderId: string;
    value: number;
    currency?: string;
    items?: Array<{
        id: string;
        name: string;
        quantity: number;
        price: number;
    }>;
}

export function TrackPurchase({
    orderId,
    value,
    currency = "INR",
    items = [],
}: PurchaseEventProps) {
    useEffect(() => {
        // Only track if Google Analytics is loaded
        if (typeof window !== "undefined" && window.gtag) {
            window.gtag("event", "purchase", {
                transaction_id: orderId,
                value: value,
                currency: currency,
                items: items.map((item) => ({
                    item_id: item.id,
                    item_name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                })),
            });

            console.log("Purchase event tracked:", {
                orderId,
                value,
                currency,
                items,
            });
        }
    }, [orderId, value, currency, items]);

    return null; // This component doesn't render anything
}
