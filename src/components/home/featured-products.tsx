import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/product-card";
import { prisma } from "@/lib/prisma";

// ============================================
// FEATURED PRODUCTS SECTION (Server Component)
// ============================================

export async function FeaturedProducts() {
  // Fetch latest 4 featured/active products
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
    },
    include: {
      images: {
        take: 1,
        orderBy: { position: "asc" },
      },
      category: {
        select: { name: true },
      },
    },
    orderBy: [
      { isFeatured: "desc" },
      { createdAt: "desc" },
    ],
    take: 4,
  });

  // Transform Decimal to number for ProductCard
  const transformedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    productType: product.productType as "STANDARD" | "CUSTOM",
    basePrice: Number(product.basePrice),
    compareAtPrice: product.compareAtPrice
      ? Number(product.compareAtPrice)
      : null,
    images: product.images.map((img) => ({
      url: img.url,
      alt: img.alt,
    })),
    category: product.category,
  }));

  return (
    <section className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Featured Collection
            </h2>
            <p className="mt-2 text-white/60">
              Our most popular creations, handpicked for you.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-white/20 bg-transparent text-white hover:bg-white/10"
          >
            <Link href="/shop">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        {transformedProducts.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {transformedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-16">
            <p className="text-lg text-white/60">
              New products coming soon!
            </p>
            <p className="mt-2 text-sm text-white/40">
              Check back later for our latest creations.
            </p>
          </div>
        )}

        {/* Large CTA Button */}
        <div className="mt-12 flex justify-center">
          <Button
            asChild
            size="lg"
            className="h-14 rounded-full bg-white px-10 text-base font-semibold text-black transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            <Link href="/shop">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

