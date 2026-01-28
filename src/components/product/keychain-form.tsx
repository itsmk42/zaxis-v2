"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import { toast } from "sonner";
import { MessageCircle, X } from "lucide-react";
import Link from "next/link";

const keychainSchema = z.object({
    variant: z.enum(["keychain", "pet_tag"]),
    customText: z.string().min(1, "Please enter text"),
});

type KeychainFormValues = z.infer<typeof keychainSchema>;

const variants = [
    {
        id: "keychain",
        name: "Keychain",
        price: 499, // Assuming a default price, should be passed from product or dynamic
        label: "What do you want to write?",
        placeholder: "e.g., Drive Safe",
    },
    {
        id: "pet_tag",
        name: "Pet Tag",
        price: 499,
        label: "Pet's Name",
        placeholder: "e.g., Bruno",
    },
];

interface KeychainFormProps {
    product: {
        id: string;
        name: string;
        slug: string;
        image: string | null;
        basePrice: number;
    };
}

export function KeychainForm({ product }: KeychainFormProps) {
    const [isCustomizing, setIsCustomizing] = useState(false);
    const { addItem } = useCart();

    const form = useForm<KeychainFormValues>({
        resolver: zodResolver(keychainSchema),
        defaultValues: {
            variant: "keychain",
            customText: "",
        },
    });

    const selectedVariantId = form.watch("variant");
    const selectedVariant = variants.find((v) => v.id === selectedVariantId) || variants[0];

    const onSubmit = (data: KeychainFormValues) => {
        const variantName = variants.find((v) => v.id === data.variant)?.name || "Custom";

        addItem({
            productId: product.id,
            productName: `${product.name} - ${variantName}`,
            productSlug: product.slug,
            productType: "CUSTOM",
            productImage: product.image,
            unitPrice: product.basePrice, // Using base price passed from prop
            quantity: 1,
            customText: `${variantName}: ${data.customText}`,
        });

        toast.success("Added to cart!");
    };

    const textLabel = selectedVariant.label;
    const textPlaceholder = selectedVariant.placeholder;

    if (!isCustomizing) {
        return (
            <Button
                onClick={() => setIsCustomizing(true)}
                size="lg"
                className="w-full bg-white text-black hover:bg-white/90 font-bold text-lg h-14"
            >
                Customise Now
            </Button>
        );
    }

    return (
        <div className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Customize Your Product</h3>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCustomizing(false)}
                    className="text-white/40 hover:text-white"
                >
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Variants */}
                <div className="space-y-4">
                    <Label className="text-base font-medium text-white">Select Type</Label>
                    <RadioGroup
                        defaultValue="keychain"
                        onValueChange={(val) => form.setValue("variant", val as any)}
                        className="grid gap-4"
                    >
                        {variants.map((variant) => (
                            <div
                                key={variant.id}
                                className={`relative flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-all hover:bg-white/5 ${selectedVariantId === variant.id
                                    ? "border-rose-500 bg-rose-500/10"
                                    : "border-white/10"
                                    }`}
                                onClick={() => form.setValue("variant", variant.id as any)}
                            >
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value={variant.id} id={variant.id} className="border-white/20 text-rose-500" />
                                    <Label
                                        htmlFor={variant.id}
                                        className="cursor-pointer font-medium text-white"
                                    >
                                        {variant.name}
                                    </Label>
                                </div>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* Text Input */}
                <div className="space-y-4">
                    <Label htmlFor="customText" className="text-base font-medium text-white">
                        {textLabel}
                    </Label>
                    <Input
                        id="customText"
                        {...form.register("customText")}
                        placeholder={textPlaceholder}
                        className="border-white/20 bg-black/40 text-white placeholder:text-white/40"
                    />
                    {form.formState.errors.customText && (
                        <p className="text-sm text-red-500">{form.formState.errors.customText.message}</p>
                    )}
                </div>

                {/* Total Price */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-lg font-medium text-white/60">Total Amount:</span>
                    <span className="text-2xl font-bold text-white">
                        {formatPrice(product.basePrice)}
                    </span>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-white text-black hover:bg-white/90"
                >
                    Add to Cart - {formatPrice(product.basePrice)}
                </Button>

                {/* WhatsApp Help */}
                <Button
                    asChild
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg h-14"
                >
                    <Link
                        href="https://wa.me/91XXXXXXXXXX?text=Hi,%20I%20am%20having%20trouble%20ordering%20the%20Keychain/Pet%20Tag."
                        target="_blank"
                        className="flex items-center justify-center gap-2"
                    >
                        <MessageCircle className="h-5 w-5" />
                        Having trouble ordering? Talk to us
                    </Link>
                </Button>
            </form>
        </div>
    );
}
