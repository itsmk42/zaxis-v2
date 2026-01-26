import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/product-form";

// ============================================
// METADATA
// ============================================

export const metadata: Metadata = {
  title: "Add New Product | Z Axis Studio Admin",
  description: "Create a new product listing",
};

// ============================================
// ADD PRODUCT PAGE
// ============================================

export default function AddProductPage() {
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
        <h1 className="text-3xl font-bold text-white">Add New Product</h1>
        <p className="mt-1 text-white/60">
          Create a new standard or custom product listing for your store.
        </p>
      </div>

      {/* Product Form */}
      <ProductForm />
    </div>
  );
}

