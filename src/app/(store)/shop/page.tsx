import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/shop/product-card";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Shop | Z Axis Studio",
  description: "Browse our collection of premium 3D printed lamps, lithophanes, and custom creations.",
};

async function getProducts() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      images: {
        orderBy: { position: "asc" },
        take: 1,
      },
      category: {
        select: { name: true },
      },
    },
    orderBy: [
      { isFeatured: "desc" },
      { createdAt: "desc" },
    ],
  });

  // Convert Decimal to number for client component
  return products.map((product) => ({
    ...product,
    basePrice: Number(product.basePrice),
    compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
  }));
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="aspect-[4/5] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );
}

async function ProductGrid() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
        <div className="rounded-full bg-white/5 p-6">
          <svg
            className="h-12 w-12 text-white/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-medium text-white">No products yet</h3>
        <p className="mt-2 text-sm text-white/60">
          Check back soon for our amazing 3D printed creations!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-black pt-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Shop
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/60">
            Discover our collection of handcrafted 3D printed lamps, lithophanes,
            and custom creations. Each piece is made with precision and care.
          </p>
        </div>

        {/* Filters Bar (placeholder for future) */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/40">Filter by:</span>
            <button className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/70 transition-colors hover:border-white/40 hover:text-white">
              All Products
            </button>
            <button className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-white/40 transition-colors hover:border-white/20 hover:text-white/70">
              Lamps
            </button>
            <button className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-white/40 transition-colors hover:border-white/20 hover:text-white/70">
              Lithophanes
            </button>
            <button className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-white/40 transition-colors hover:border-white/20 hover:text-white/70">
              Custom
            </button>
          </div>
          <div className="text-sm text-white/40">
            Showing all products
          </div>
        </div>

        {/* Product Grid */}
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </div>

      {/* Bottom Spacing */}
      <div className="h-24" />
    </main>
  );
}

