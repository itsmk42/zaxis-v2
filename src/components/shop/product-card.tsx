"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Palette } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPrice, formatDiscount } from "@/lib/format";
import { cn } from "@/lib/utils";

// Type matching our Prisma schema
type ProductType = "STANDARD" | "CUSTOM";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    productType: ProductType;
    basePrice: number;
    compareAtPrice?: number | null;
    images: { url: string; alt?: string | null }[];
    category?: { name: string } | null;
  };
  onAddToCart?: (productId: string) => void;
  className?: string;
}

export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  const { id, name, slug, productType, basePrice, compareAtPrice, images, category } = product;
  
  const primaryImage = images[0]?.url || "/images/placeholder-product.jpg";
  const imageAlt = images[0]?.alt || name;
  const hasDiscount = compareAtPrice && compareAtPrice > basePrice;
  
  const isCustomProduct = productType === "CUSTOM";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(id);
  };

  return (
    <Link href={`/shop/${slug}`} className="group block">
      <Card
        className={cn(
          "overflow-hidden border-white/10 bg-zinc-900/50 transition-all duration-300",
          "hover:border-white/20 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-black/20",
          className
        )}
      >
        {/* Image Container - 4:5 Aspect Ratio */}
        <div className="relative aspect-[4/5] overflow-hidden bg-zinc-800">
          <Image
            src={primaryImage}
            alt={imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-semibold text-white">
              {formatDiscount(compareAtPrice, basePrice)}
            </div>
          )}
          
          {/* Product Type Badge */}
          {isCustomProduct && (
            <div className="absolute right-3 top-3 rounded-full bg-amber-500/90 px-2.5 py-1 text-xs font-semibold text-black backdrop-blur-sm">
              Customizable
            </div>
          )}
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        <CardContent className="p-4">
          {/* Category */}
          {category && (
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-white/40">
              {category.name}
            </p>
          )}
          
          {/* Product Name */}
          <h3 className="line-clamp-2 text-base font-medium text-white transition-colors group-hover:text-white/90">
            {name}
          </h3>
          
          {/* Price */}
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-white">
              {formatPrice(basePrice)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-white/40 line-through">
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          {/* Smart Action Button */}
          {isCustomProduct ? (
            <Button
              variant="outline"
              className="w-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <Palette className="mr-2 h-4 w-4" />
              Customize
            </Button>
          ) : (
            <Button
              className="w-full bg-white text-black hover:bg-white/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}

