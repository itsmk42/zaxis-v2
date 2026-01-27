"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import QRCode from "react-qr-code";
import { useState, useTransition } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { checkoutSchema, indianStates } from "@/lib/validators/checkout";
import { createOrder } from "@/actions/order";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type FormData = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
    const [isPending, startTransition] = useTransition();
    const { items, getCartTotal } = useCart();
    const cartTotal = getCartTotal();
    const totalAmount = cartTotal + (cartTotal > 1000 ? 0 : 100); // Add shipping logic here if needed

    const form = useForm<FormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            paymentMethod: "COD",
        },
    });

    const paymentMethod = form.watch("paymentMethod");

    // UPI Logic
    const upiVpa = process.env.NEXT_PUBLIC_UPI_VPA || "yourname@oksbi";
    const upiName = process.env.NEXT_PUBLIC_UPI_NAME || "Z Axis Studio";
    const upiLink = `upi://pay?pa=${upiVpa}&pn=${encodeURIComponent(upiName)}&am=${totalAmount}&cu=INR`;

    function onSubmit(data: FormData) {
        startTransition(async () => {
            const result = await createOrder(data);
            if (result?.error) {
                toast.error(result.error);
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
                        <div>
                            <Label htmlFor="fullName" className="text-white/60">Full Name</Label>
                            <Input {...form.register("fullName")} id="fullName" className="bg-black/50 border-white/10 text-white" placeholder="John Doe" />
                            {form.formState.errors.fullName && <p className="text-xs text-red-400 mt-1">{form.formState.errors.fullName.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="email" className="text-white/60">Email</Label>
                                <Input {...form.register("email")} id="email" type="email" className="bg-black/50 border-white/10 text-white" placeholder="john@example.com" />
                                {form.formState.errors.email && <p className="text-xs text-red-400 mt-1">{form.formState.errors.email.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="phone" className="text-white/60">Phone</Label>
                                <Input {...form.register("phone")} id="phone" className="bg-black/50 border-white/10 text-white" placeholder="9876543210" />
                                {form.formState.errors.phone && <p className="text-xs text-red-400 mt-1">{form.formState.errors.phone.message}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="addressLine1" className="text-white/60">House No / Building</Label>
                            <Input {...form.register("addressLine1")} id="addressLine1" className="bg-black/50 border-white/10 text-white" placeholder="Flat 101, Galaxy Apts" />
                            {form.formState.errors.addressLine1 && <p className="text-xs text-red-400 mt-1">{form.formState.errors.addressLine1.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="addressLine2" className="text-white/60">Street / Area</Label>
                            <Input {...form.register("addressLine2")} id="addressLine2" className="bg-black/50 border-white/10 text-white" placeholder="MG Road" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="city" className="text-white/60">City</Label>
                                <Input {...form.register("city")} id="city" className="bg-black/50 border-white/10 text-white" />
                                {form.formState.errors.city && <p className="text-xs text-red-400 mt-1">{form.formState.errors.city.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="pincode" className="text-white/60">Pincode</Label>
                                <Input {...form.register("pincode")} id="pincode" className="bg-black/50 border-white/10 text-white" maxLength={6} />
                                {form.formState.errors.pincode && <p className="text-xs text-red-400 mt-1">{form.formState.errors.pincode.message}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="state" className="text-white/60">State</Label>
                            <Select onValueChange={(val) => form.setValue("state", val as any)} defaultValue={form.getValues("state")}>
                                <SelectTrigger className="bg-black/50 border-white/10 text-white">
                                    <SelectValue placeholder="Select State" />
                                </SelectTrigger>
                                <SelectContent>
                                    {indianStates.map((st) => (
                                        <SelectItem key={st} value={st}>{st}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {form.formState.errors.state && <p className="text-xs text-red-400 mt-1">{form.formState.errors.state.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="landmark" className="text-white/60">Landmark (Optional)</Label>
                            <Input {...form.register("landmark")} id="landmark" className="bg-black/50 border-white/10 text-white" placeholder="Near City Mall" />
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
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>{cartTotal > 1000 ? "Free" : "₹100.00"}</span>
                        </div>
                        <div className="flex justify-between border-t border-white/10 pt-2 text-base font-bold text-white">
                            <span>Total</span>
                            <span>₹{totalAmount.toFixed(2)}</span>
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
                                    placeholder="Enter 12-digit Ref No."
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
