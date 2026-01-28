"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import { toast } from "sonner";
import { Loader2, X, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const photoboxSchema = z.object({
    variant: z.enum(["keychain", "box_no_led", "box_with_led"]),
    image: z.string().min(1, "Please upload an image"),
});

type PhotoboxFormValues = z.infer<typeof photoboxSchema>;

const variants = [
    {
        id: "keychain",
        name: "Keychain (40mm)",
        price: 499,
    },
    {
        id: "box_no_led",
        name: "Lithophane Box (No LED)",
        price: 999,
    },
    {
        id: "box_with_led",
        name: "Lithophane Box (With LED)",
        price: 1999,
    },
];

interface PhotoboxFormProps {
    product: {
        id: string;
        name: string;
        slug: string;
        image: string | null;
    };
}

export function PhotoboxForm({ product }: PhotoboxFormProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [isCustomizing, setIsCustomizing] = useState(false);
    const { addItem } = useCart();

    const form = useForm<PhotoboxFormValues>({
        resolver: zodResolver(photoboxSchema),
        defaultValues: {
            variant: "box_with_led", // Default to most popular/expensive
        },
    });

    const selectedVariantId = form.watch("variant");
    const selectedVariant = variants.find((v) => v.id === selectedVariantId) || variants[2];

    const onSubmit = (data: PhotoboxFormValues) => {
        if (!uploadedImage) {
            toast.error("Please upload an image first");
            return;
        }

        const variantName = variants.find((v) => v.id === data.variant)?.name || "Custom";

        addItem({
            productId: product.id,
            productName: `${product.name} - ${variantName}`, // Append variant to name
            productSlug: product.slug,
            productType: "CUSTOM",
            productImage: product.image,
            unitPrice: selectedVariant.price,
            quantity: 1,
            customFileUrl: uploadedImage,
            customText: `Variant: ${variantName}`, // Store variant in customText as well
        });

        toast.success("Added to cart!");
    };

    const handleRemoveImage = () => {
        setUploadedImage(null);
        form.setValue("image", "");
    };

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
                <h3 className="text-lg font-semibold text-white">Customize Your Box</h3>
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
                        defaultValue="box_with_led"
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
                                <div className="font-semibold text-white">
                                    {formatPrice(variant.price)}
                                </div>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                    <Label className="text-base font-medium text-white">
                        Upload Photo <span className="text-white/40 text-sm">(Max 16MB)</span>
                    </Label>

                    {!uploadedImage ? (
                        <div className="overflow-hidden rounded-lg border border-dashed border-white/20 hover:bg-white/5 transition-colors">
                            <UploadDropzone<OurFileRouter, "customerUpload">
                                endpoint="customerUpload"
                                onUploadBegin={() => setIsUploading(true)}
                                onUploadError={(error: Error) => {
                                    setIsUploading(false);
                                    toast.error(`Upload failed: ${error.message}`);
                                }}
                                onClientUploadComplete={(res) => {
                                    setIsUploading(false);
                                    if (res && res[0]) {
                                        setUploadedImage(res[0].url);
                                        form.setValue("image", res[0].url);
                                        toast.success("Image uploaded successfully!");
                                    }
                                }}
                                appearance={{
                                    label: "text-white/60 hover:text-white transition-colors",
                                    button: "bg-white !text-black hover:bg-white/90 ut-uploading:cursor-not-allowed",
                                    allowedContent: "text-white/40",
                                    container: "border-0",
                                }}
                                content={{
                                    label: "Upload High-Res Photo",
                                }}
                            />
                        </div>
                    ) : (
                        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/40 p-2">
                            <div className="relative aspect-video w-full overflow-hidden rounded-md">
                                <Image
                                    src={uploadedImage}
                                    alt="Uploaded preview"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute right-2 top-2 h-8 w-8 rounded-full"
                                onClick={handleRemoveImage}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                            <div className="mt-2 text-center text-xs text-green-400">
                                ✓ Photo uploaded successfully
                            </div>
                        </div>
                    )}
                </div>

                {/* Total Price */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-lg font-medium text-white/60">Total Amount:</span>
                    <span className="text-2xl font-bold text-white">
                        {formatPrice(selectedVariant.price)}
                    </span>
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    size="lg"
                    disabled={isUploading || !uploadedImage}
                    className="w-full bg-white text-black hover:bg-white/90 disabled:opacity-50"
                >
                    {isUploading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                        </>
                    ) : !uploadedImage ? (
                        "Upload Photo to Allow Adding to Cart"
                    ) : (
                        `Add to Cart - ${formatPrice(selectedVariant.price)}`
                    )}
                </Button>

                {/* WhatsApp Help */}
                <Button
                    asChild
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg h-14"
                >
                    <Link
                        href="https://wa.me/919483654329?text=Hi,%20I%20am%20having%20trouble%20ordering%20the%20Photobox."
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
