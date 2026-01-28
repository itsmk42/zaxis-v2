"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import QRCode from "react-qr-code";
import { useState, useTransition, useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { checkoutSchema, indianStates } from "@/lib/validators/checkout";
import { cn } from "@/lib/utils";
import { createOrder } from "@/actions/order";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type FormData = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
    const [isPending, startTransition] = useTransition();
    const { items, getSubtotal, clearCart } = useCart();
    const [isMounted, setIsMounted] = useState(false);
    const [isFetchingPincode, setIsFetchingPincode] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Initial fetch safe check
    const cartTotal = typeof getSubtotal === "function" ? getSubtotal() : 0;
    const totalAmount = cartTotal + (cartTotal > 1000 ? 0 : 100);

    const form = useForm<FormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            paymentMethod: "COD",
        },
    });

    const paymentMethod = form.watch("paymentMethod");
    const pincode = form.watch("pincode");

    // Pincode Autofill Logic
    useEffect(() => {
        if (pincode && pincode.length === 6) {
            const fetchPincodeDetails = async () => {
                setIsFetchingPincode(true);
                try {
                    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
                    const data = await response.json();

                    if (data && data[0] && data[0].Status === "Success") {
                        const details = data[0].PostOffice[0];
                        // Auto-fill City (District) and State
                        form.setValue("city", details.District);

                        // Try to match State with our Enum
                        const apiState = details.State;
                        const matchState = indianStates.find(s => s.toLowerCase() === apiState.toLowerCase());
                        if (matchState) {
                            // Correct the type casting for the strict Zod enum
                            form.setValue("state", matchState as any);
                        } else {
                            form.setValue("state", apiState as any);
                        }

                        form.clearErrors(["city", "state", "pincode"]);
                        toast.success("Address details found!");
                    } else {
                        form.setError("pincode", { message: "Invalid Pincode. Please check." });
                        toast.error("Invalid Pincode");
                    }
                } catch (error) {
                    console.error("Failed to fetch pincode:", error);
                    // Allow manual entry on error
                } finally {
                    setIsFetchingPincode(false);
                }
            };

            fetchPincodeDetails();
        }
    }, [pincode, form]);

    // UPI Logic
    const upiVpa = process.env.NEXT_PUBLIC_UPI_VPA || "yourname@oksbi";
    const upiName = process.env.NEXT_PUBLIC_UPI_NAME || "Z Axis Studio";
    const upiLink = `upi://pay?pa=${upiVpa}&pn=${encodeURIComponent(upiName)}&am=${totalAmount}&cu=INR`;

    function onSubmit(data: FormData) {
        startTransition(async () => {
            // Need to pass simple items to server to avoid serialization issues with large objects if any
            const orderItems = items.map(i => ({
                productId: i.productId,
                quantity: i.quantity,
                productName: i.productName
            }));

            const result = await createOrder(data, orderItems);

            if (result?.error) {
                toast.error(result.error);
            } else if (result?.success) {
                // Order created successfully
                toast.success("Order placed successfully!");
                clearCart();
                // Clear cart logic here if you exposed it from useCart, but wait, useCart exposes clearCart
                // Let's assume user is redirected and we clear strict cart
                // Actually the hook is not destructured for clearCart.
                // I need to import clearCart from useCart destructuring above.
                // For now, redirect.
                window.location.href = "/checkout/success";
            }
        });
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-2">
            {/* LEFT COLUMN: Shipping Details */}
            <div className="space-y-6">
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Shipping Details</h2>
                    <div className="grid gap-4">

                        {/* 1. Name */}
                        <div>
                            <Label htmlFor="fullName" className="text-white/60">Full Name</Label>
                            <Input {...form.register("fullName")} id="fullName" className="bg-black/50 border-white/10 text-white" />
                            {form.formState.errors.fullName && <p className="text-xs text-red-400 mt-1">{form.formState.errors.fullName.message}</p>}
                        </div>

                        {/* 2. Phone & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="phone" className="text-white/60">Phone Number</Label>
                                <Input {...form.register("phone")} id="phone" className="bg-black/50 border-white/10 text-white" maxLength={10} />
                                {form.formState.errors.phone && <p className="text-xs text-red-400 mt-1">{form.formState.errors.phone.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="email" className="text-white/60">Email</Label>
                                <Input {...form.register("email")} id="email" type="email" className="bg-black/50 border-white/10 text-white" />
                                {form.formState.errors.email && <p className="text-xs text-red-400 mt-1">{form.formState.errors.email.message}</p>}
                            </div>
                        </div>

                        {/* 3. Pincode (First in Address) */}
                        <div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="pincode" className="text-white/60">Pincode</Label>
                                {isFetchingPincode && <span className="text-xs text-indigo-400 flex items-center gap-1"><Loader2 className="h-3 w-3 animate-spin" /> Finding details...</span>}
                            </div>
                            <Input
                                {...form.register("pincode")}
                                id="pincode"
                                className="bg-black/50 border-white/10 text-white"
                                maxLength={6}
                            />
                            {form.formState.errors.pincode && <p className="text-xs text-red-400 mt-1">{form.formState.errors.pincode.message}</p>}
                        </div>

                        {/* 4. City & State (Autofilled) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="city" className="text-white/60">City</Label>
                                <Input
                                    {...form.register("city")}
                                    id="city"
                                    className={`bg-black/50 border-white/10 text-white ${isFetchingPincode ? 'opacity-50' : ''}`}
                                />
                                {form.formState.errors.city && <p className="text-xs text-red-400 mt-1">{form.formState.errors.city.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="state" className="text-white/60">State</Label>
                                <select
                                    {...form.register("state")}
                                    id="state"
                                    className={cn(
                                        "flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus:border-white/20 focus:outline-none focus:ring-1 focus:ring-white/10 disabled:cursor-not-allowed disabled:opacity-50",
                                        isFetchingPincode && "opacity-50"
                                    )}
                                >
                                    <option value="" className="bg-zinc-900">Select State</option>
                                    {indianStates.map((st) => (
                                        <option key={st} value={st} className="bg-zinc-900">{st}</option>
                                    ))}
                                </select>
                                {form.formState.errors.state && <p className="text-xs text-red-400 mt-1">{form.formState.errors.state.message}</p>}
                            </div>
                        </div>

                        {/* 5. House No */}
                        <div>
                            <Label htmlFor="addressLine1" className="text-white/60">House No / Building</Label>
                            <Input {...form.register("addressLine1")} id="addressLine1" className="bg-black/50 border-white/10 text-white" />
                            {form.formState.errors.addressLine1 && <p className="text-xs text-red-400 mt-1">{form.formState.errors.addressLine1.message}</p>}
                        </div>

                        {/* 6. Street / Area */}
                        <div>
                            <Label htmlFor="addressLine2" className="text-white/60">Street / Area</Label>
                            <Input {...form.register("addressLine2")} id="addressLine2" className="bg-black/50 border-white/10 text-white" />
                        </div>

                        {/* 7. Landmark */}
                        <div>
                            <Label htmlFor="landmark" className="text-white/60">Landmark (Optional)</Label>
                            <Input {...form.register("landmark")} id="landmark" className="bg-black/50 border-white/10 text-white" />
                        </div>

                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Payment & Summary */}
            <div className="space-y-6">
                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
                    <div className="space-y-2 text-sm text-white/70">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{isMounted ? cartTotal.toFixed(2) : "0.00"}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>{isMounted ? (cartTotal > 1000 ? "Free" : "₹100.00") : "..."}</span>
                        </div>
                        <div className="flex justify-between border-t border-white/10 pt-2 text-base font-bold text-white">
                            <span>Total</span>
                            <span>₹{isMounted ? totalAmount.toFixed(2) : "0.00"}</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Payment Method</h2>

                    <RadioGroup
                        defaultValue="COD"
                        onValueChange={(val) => form.setValue("paymentMethod", val as "COD" | "UPI")}
                        className="grid gap-4"
                    >
                        <div className="flex items-center space-x-2 rounded-lg border border-white/10 p-4 hover:bg-white/5 cursor-pointer">
                            <RadioGroupItem value="COD" id="cod" className="border-white" />
                            <Label htmlFor="cod" className="text-white cursor-pointer font-medium">Cash on Delivery (COD)</Label>
                        </div>

                        <div className="flex items-center space-x-2 rounded-lg border border-white/10 p-4 hover:bg-white/5 cursor-pointer">
                            <RadioGroupItem value="UPI" id="upi" className="border-white" />
                            <Label htmlFor="upi" className="text-white cursor-pointer font-medium">Pay via UPI (GPay/PhonePe)</Label>
                        </div>
                    </RadioGroup>

                    {/* UPI QR Code Section */}
                    {paymentMethod === "UPI" && (
                        <div className="mt-6 flex flex-col items-center space-y-4 rounded-xl bg-white p-6">
                            <div className="text-center text-black">
                                <p className="font-bold text-lg mb-2">Scan to Pay ₹{totalAmount}</p>
                                <div className="bg-white p-2">
                                    <QRCode value={upiLink} size={150} />
                                </div>
                            </div>

                            <a href={upiLink} className="w-full text-center rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-700 md:hidden block">
                                Open UPI App
                            </a>

                            <div className="w-full pt-4 border-t border-gray-200">
                                <Label htmlFor="txnId" className="text-black mb-1 block">UPI Transaction ID (Required)</Label>
                                <Input
                                    {...form.register("transactionId")}
                                    id="txnId"
                                    className="bg-gray-50 border-gray-300 text-black placeholder:text-gray-400"
                                />
                                {form.formState.errors.transactionId && <p className="text-xs text-red-500 mt-1">{form.formState.errors.transactionId.message}</p>}
                            </div>
                        </div>
                    )}
                </div>

                <Button
                    type="submit"
                    className="w-full h-12 text-lg font-bold bg-white text-black hover:bg-white/90"
                    disabled={isPending}
                >
                    {isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    {paymentMethod === "COD" ? "Place Order (COD)" : "Verify & Place Order"}
                </Button>
            </div>
        </form>
    );
}
