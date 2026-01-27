import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, Package, Search, Edit, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

// ============================================
// METADATA
// ============================================

export const metadata: Metadata = {
  title: "Products | Z Axis Studio Admin",
  description: "Manage your product catalog",
};

// ============================================
// PRODUCTS LIST PAGE
// ============================================

export default async function ProductsPage() {
  // Fetch products from database
  const products = await prisma.product.findMany({
    include: {
      images: {
        take: 1,
        orderBy: { position: "asc" },
      },
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Products</h1>
          <p className="mt-1 text-white/60">
            Manage your product catalog ({products.length} products)
          </p>
        </div>
        <Button asChild className="bg-white text-black hover:bg-white/90">
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <Input
          placeholder="Search products..."
          className="border-white/20 bg-white/5 pl-10 text-white placeholder:text-white/40"
        />
      </div>

      {/* Products Table */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 py-16">
          <Package className="h-12 w-12 text-white/20" />
          <h3 className="mt-4 text-lg font-medium text-white">No products yet</h3>
          <p className="mt-1 text-sm text-white/60">
            Get started by adding your first product.
          </p>
          <Button asChild className="mt-6 bg-white text-black hover:bg-white/90">
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full">
            <thead className="border-b border-white/10 bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white/60">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-white/60">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="transition-colors hover:bg-white/5"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 overflow-hidden rounded-lg bg-white/10">
                        {product.images[0] ? (
                          <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <Package className="h-6 w-6 text-white/20" />
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-sm text-white/40">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${product.productType === "CUSTOM"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-blue-500/20 text-blue-400"
                        }`}
                    >
                      {product.productType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">
                    {formatPrice(Number(product.basePrice))}
                  </td>
                  <td className="px-6 py-4 text-white">
                    {product.productType === "STANDARD"
                      ? product.quantity
                      : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${product.isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                        }`}
                    >
                      {product.isActive ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white/60 hover:bg-white/10 hover:text-white"
                        title="View in Shop"
                      >
                        <Link href={`/shop/${product.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white/60 hover:bg-white/10 hover:text-white"
                        title="Edit Product"
                      >
                        <Link href={`/admin/products/${product.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeleteProductButton
                        productId={product.id}
                        productName={product.name}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

