import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, Truck, Shield, RotateCcw } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/format";
import { ImageGallery } from "@/components/product/image-gallery";
import { ProductForm } from "@/components/product/product-form";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

async function getProduct(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      images: {
        orderBy: { position: "asc" },
      },
      category: {
        select: { name: true, slug: true },
      },
      customizationAttributes: {
        orderBy: { position: "asc" },
      },
      reviews: {
        where: { isApproved: true },
        select: { rating: true },
      },
    },
  });

  if (!product) return null;

  // Convert Decimal fields to numbers for client components
  return {
    ...product,
    basePrice: Number(product.basePrice),
    compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    customizationAttributes: product.customizationAttributes.map((attr) => ({
      ...attr,
      additionalPrice: attr.additionalPrice ? Number(attr.additionalPrice) : null,
      validationRules: attr.validationRules as Record<string, unknown> | null,
    })),
  };
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.productId);

  if (!product) {
    return { title: "Product Not Found | Z Axis Studio" };
  }

  return {
    title: `${product.name} | Z Axis Studio`,
    description: product.shortDescription || product.description.slice(0, 160),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.productId);

  if (!product) {
    notFound();
  }

  const {
    name,
    description,
    shortDescription,
    productType,
    basePrice,
    compareAtPrice,
    images,
    category,
    customizationAttributes,
    reviews,
    hsnCode,
    gstRate,
  } = product;

  // Calculate average rating
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const hasDiscount = compareAtPrice && compareAtPrice > basePrice;
  const isCustomProduct = productType === "CUSTOM";

  return (
    <main className="min-h-screen bg-black pt-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-white/40">
          <Link href="/shop" className="flex items-center gap-1 hover:text-white/70">
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>
          {category && (
            <>
              <span>/</span>
              <Link href={`/collections/${category.slug}`} className="hover:text-white/70">
                {category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-white/60">{name}</span>
        </nav>

        {/* Split Screen Layout */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Image Gallery */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ImageGallery images={images} productName={name} />
          </div>

          {/* Right: Product Info & Form */}
          <div className="space-y-6">
            {/* Product Type Badge */}
            <div className="flex items-center gap-3">
              {isCustomProduct && (
                <Badge variant="warning">Customizable</Badge>
              )}
              {category && (
                <Badge variant="outline" className="border-white/20 text-white/60">
                  {category.name}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {name}
            </h1>

            {/* Rating */}
            {reviews.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= avgRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-white/20"
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-white/60">
                  ({reviews.length} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">
                {formatPrice(basePrice)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-white/40 line-through">
                    {formatPrice(compareAtPrice)}
                  </span>
                  <Badge variant="destructive">
                    {Math.round(((compareAtPrice - basePrice) / compareAtPrice) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* GST Info */}
            <p className="text-xs text-white/40">
              Price inclusive of GST ({Number(gstRate)}%)
              {hsnCode && ` • HSN: ${hsnCode}`}
            </p>

            <Separator className="bg-white/10" />

            {/* Short Description */}
            {shortDescription && (
              <p className="text-lg text-white/70">{shortDescription}</p>
            )}

            {/* Product Form with Customization */}
            <ProductForm
              product={{
                id: product.id,
                slug: product.slug,
                name,
                productType,
                basePrice,
                image: images[0]?.url || null,
                customizationAttributes,
              }}
            />

            <Separator className="bg-white/10" />

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                <Truck className="h-6 w-6 text-white/60" />
                <span className="text-xs text-white/60">Free Shipping</span>
                <span className="text-xs text-white/40">Orders ₹999+</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                <Shield className="h-6 w-6 text-white/60" />
                <span className="text-xs text-white/60">Secure Payment</span>
                <span className="text-xs text-white/40">SSL Encrypted</span>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-4 text-center">
                <RotateCcw className="h-6 w-6 text-white/60" />
                <span className="text-xs text-white/60">Easy Returns</span>
                <span className="text-xs text-white/40">7 Day Policy</span>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Full Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Description</h2>
              <div className="prose prose-invert prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-white/70">{description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-24" />
      </div>
    </main>
  );
}

