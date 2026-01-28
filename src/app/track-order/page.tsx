"use client";

import { useState } from "react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("");
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState<any>(null);
    const [error, setError] = useState("");

    const handleTrackOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setOrder(null);

        try {
            const response = await fetch("/api/track-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId: orderId.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Order not found");
                return;
            }

            setOrder(data.order);
        } catch (err) {
            setError("Failed to track order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "PENDING_COD":
            case "PENDING_VERIFICATION":
                return <Clock className="h-8 w-8 text-amber-400" />;
            case "CONFIRMED":
                return <CheckCircle className="h-8 w-8 text-green-400" />;
            case "PROCESSING":
                return <Package className="h-8 w-8 text-blue-400" />;
            case "SHIPPED":
                return <Truck className="h-8 w-8 text-purple-400" />;
            case "DELIVERED":
                return <CheckCircle className="h-8 w-8 text-green-500" />;
            default:
                return <Package className="h-8 w-8 text-white/40" />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "PENDING_COD":
                return "Pending - Cash on Delivery";
            case "PENDING_VERIFICATION":
                return "Pending Payment Verification";
            case "CONFIRMED":
                return "Order Confirmed";
            case "PROCESSING":
                return "Processing Your Order";
            case "SHIPPED":
                return "Shipped";
            case "DELIVERED":
                return "Delivered";
            case "CANCELLED":
                return "Cancelled";
            default:
                return status;
        }
    };

    return (
        <main className="min-h-screen bg-black pt-28 pb-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Track Your Order</h1>
                    <p className="text-white/60">
                        Enter your order ID to check the status of your order
                    </p>
                </div>

                {/* Search Form */}
                <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-sm mb-8">
                    <CardHeader>
                        <CardTitle className="text-white">Order Tracking</CardTitle>
                        <CardDescription className="text-white/60">
                            Your order ID can be found in your confirmation email (e.g., ZA-20260127-0001)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleTrackOrder} className="flex gap-3">
                            <Input
                                type="text"
                                placeholder="Enter Order ID (e.g., ZA-20260127-0001)"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                className="flex-1 border-white/20 bg-white/5 text-white placeholder:text-white/40"
                                required
                            />
                            <Button
                                type="submit"
                                disabled={loading}
                                className="bg-white text-black hover:bg-white/90"
                            >
                                {loading ? (
                                    "Searching..."
                                ) : (
                                    <>
                                        <Search className="mr-2 h-4 w-4" />
                                        Track
                                    </>
                                )}
                            </Button>
                        </form>

                        {error && (
                            <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                                <p className="text-sm text-red-400">{error}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Order Details */}
                {order && (
                    <Card className="border-white/10 bg-zinc-900/50 backdrop-blur-sm">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-white">Order #{order.orderNumber}</CardTitle>
                                    <CardDescription className="text-white/60">
                                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                                    </CardDescription>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    {getStatusIcon(order.status)}
                                    <span className="text-sm font-medium text-white">
                                        {getStatusText(order.status)}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Shipping Address */}
                            <div>
                                <h3 className="text-sm font-semibold text-white mb-2">Shipping Address</h3>
                                <div className="text-sm text-white/70">
                                    <p>{order.shippingName}</p>
                                    <p>{order.shippingLine1}</p>
                                    {order.shippingLine2 && <p>{order.shippingLine2}</p>}
                                    <p>
                                        {order.shippingCity}, {order.shippingState} - {order.shippingPincode}
                                    </p>
                                    <p className="mt-2">Phone: {order.shippingPhone}</p>
                                </div>
                            </div>

                            {/* Tracking Information */}
                            {order.trackingNumber && (
                                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                                    <h3 className="text-sm font-semibold text-white mb-2">Tracking Information</h3>
                                    <p className="text-white/70">
                                        <span className="text-white/40">Tracking Number: </span>
                                        <span className="font-mono text-white">{order.trackingNumber}</span>
                                    </p>
                                    {order.courierName && (
                                        <p className="text-white/70 mt-1">
                                            <span className="text-white/40">Courier: </span>
                                            <span className="text-white">{order.courierName}</span>
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Order Summary */}
                            <div>
                                <h3 className="text-sm font-semibold text-white mb-3">Order Summary</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/60">Subtotal</span>
                                        <span className="text-white">₹{Number(order.subtotal).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/60">GST</span>
                                        <span className="text-white">₹{Number(order.totalGst).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/60">Shipping</span>
                                        <span className="text-white">₹{Number(order.shippingCost).toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-white/10 pt-2 mt-2">
                                        <div className="flex justify-between font-semibold">
                                            <span className="text-white">Total</span>
                                            <span className="text-white">₹{Number(order.grandTotal).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                                <p className="text-sm text-white/70">
                                    <span className="text-white/40">Payment Method: </span>
                                    <span className="text-white">{order.paymentMethod}</span>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Help Section */}
                <div className="mt-8 text-center">
                    <p className="text-white/60 text-sm">
                        Need help with your order?{" "}
                        <a href="/contact" className="text-white hover:underline">
                            Contact Us
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
