import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/product-form";
import type { ProductFormData } from "@/lib/validations/product";

// ============================================
// METADATA
// ============================================

export const metadata: Metadata = {
    title: "Edit Product | Z Axis Studio Admin",
    description: "Update existing product listing",
};

// ============================================
// EDIT PRODUCT PAGE
// ============================================

interface EditProductPageProps {
    params: {
        productId: string;
    };
}

export default async function EditProductPage({
    params,
}: EditProductPageProps) {
    const { productId } = params;

    // Fetch product with related data
    const product = await prisma.product.findUnique({
        where: { id: productId },
        include: {
            images: {
                orderBy: { position: "asc" },
            },
            customizationAttributes: true,
            category: true,
        },
    });

    if (!product) {
        notFound();
    }

    // Map product to form data
    const initialData: ProductFormData = {
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription || "",
        productType: product.productType,
        basePrice: Number(product.basePrice),
        compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
        gstRate: product.gstRate.toString() as "5" | "12" | "18" | "28",
        hsnCode: product.hsnCode || "",
        category: product.category?.slug || "other",
        mainImageUrl: product.images[0]?.url || "",
        additionalImageUrls: product.images.slice(1).map(img => img.url),
        trackInventory: product.trackInventory,
        quantity: product.quantity,
        lowStockThreshold: product.lowStockThreshold,
        isActive: product.isActive,
        isFeatured: product.isFeatured,
        materialType: product.materialType || "",
        // Customization attributes mapping
        requiresFileUpload: product.customizationAttributes.some(
            (attr) => attr.inputType === "FILE_UPLOAD"
        ),
        requiresTextInput: product.customizationAttributes.some(
            (attr) => attr.inputType === "TEXT_INPUT"
        ),
        textInputLabel: product.customizationAttributes.find(
            (attr) => attr.inputType === "TEXT_INPUT"
        )?.label || "",
        textInputPlaceholder: product.customizationAttributes.find(
            (attr) => attr.inputType === "TEXT_INPUT"
        )?.placeholder || "",
    };

    return (
        <div className="mx-auto max-w-4xl space-y-8">
            {/* Header */}
            <div>
                <Link
                    href="/admin/products"
                    className="mb-4 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Products
                </Link>
                <h1 className="text-3xl font-bold text-white">Edit Product</h1>
                <p className="mt-1 text-white/60">
                    Update the details for <strong>{product.name}</strong>.
                </p>
            </div>

            {/* Product Form */}
            <ProductForm initialData={initialData} productId={product.id} />
        </div>
    );
}
