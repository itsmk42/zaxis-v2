"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Minus, Plus, Trash2, FileImage, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart, type CartItem } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

interface CartSheetProps {
  children?: React.ReactNode;
}

export function CartSheet({ children }: CartSheetProps) {
  const { items, removeItem, updateQuantity, getItemCount, getSubtotal } = useCart();

  const itemCount = getItemCount();
  const subtotal = getSubtotal();
  const isEmpty = items.length === 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white/70 hover:bg-white/10 hover:text-white"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Button>
        )}
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col border-white/10 bg-black/95 text-white backdrop-blur-xl sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-white">
            <ShoppingCart className="h-5 w-5" />
            Your Cart
            {itemCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto py-4">
          {isEmpty ? (
            <EmptyCart />
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {!isEmpty && (
          <SheetFooter className="flex-col gap-4 border-t border-white/10 pt-4 sm:flex-col">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg">
              <span className="text-white/60">Subtotal</span>
              <span className="font-bold text-white">{formatPrice(subtotal)}</span>
            </div>

            <p className="text-xs text-white/40">
              Shipping and GST calculated at checkout
            </p>

            {/* Checkout Button */}
            <SheetClose asChild>
              <Button
                asChild
                size="lg"
                className="w-full bg-white text-black hover:bg-white/90"
              >
                <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </Button>
            </SheetClose>

            {/* Continue Shopping */}
            <SheetClose asChild>
              <Button
                variant="outline"
                className="w-full border-white/20 bg-transparent text-white hover:bg-white/10"
                asChild
              >
                <Link href="/shop">Continue Shopping</Link>
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

// ============================================
// EMPTY CART STATE
// ============================================

function EmptyCart() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="rounded-full bg-white/5 p-6">
        <ShoppingCart className="h-12 w-12 text-white/20" />
      </div>
      <h3 className="mt-4 text-lg font-medium text-white">Your cart is empty</h3>
      <p className="mt-2 text-sm text-white/60">
        Discover our amazing 3D printed creations
      </p>
      <SheetClose asChild>
        <Button className="mt-6 bg-white text-black hover:bg-white/90" asChild>
          <Link href="/shop">Start Shopping</Link>
        </Button>
      </SheetClose>
    </div>
  );
}

// ============================================
// CART ITEM CARD
// ============================================

interface CartItemCardProps {
  item: CartItem;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
}

function CartItemCard({ item, onUpdateQuantity, onRemove }: CartItemCardProps) {
  const {
    id,
    productName,
    productSlug,
    productImage,
    productType,
    unitPrice,
    quantity,
    customText,
    customFileUrl,
    customFileName,
  } = item;

  const lineTotal = unitPrice * quantity;
  const hasCustomization = customText || customFileUrl;

  return (
    <div className="group relative rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:border-white/20">
      <div className="flex gap-4">
        {/* Product Image */}
        <Link
          href={`/products/${productSlug}`}
          className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-zinc-800"
        >
          {productImage ? (
            <Image
              src={productImage}
              alt={productName}
              fill
              sizes="80px"
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-white/20" />
            </div>
          )}
        </Link>

        {/* Product Details */}
        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between">
            <div>
              <Link
                href={`/products/${productSlug}`}
                className="font-medium text-white hover:underline"
              >
                {productName}
              </Link>

              {/* Product Type Badge */}
              {productType === "CUSTOM" && (
                <Badge variant="warning" className="ml-2 text-[10px]">
                  Custom
                </Badge>
              )}
            </div>

            {/* Remove Button */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white/40 hover:bg-white/10 hover:text-red-400"
              onClick={() => onRemove(id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Customization Details */}
          {hasCustomization && (
            <div className="mt-2 space-y-1">
              {customText && (
                <div className="flex items-center gap-1.5 text-xs text-white/50">
                  <Type className="h-3 w-3" />
                  <span>Engraving: &quot;{customText}&quot;</span>
                </div>
              )}
              {customFileUrl && (
                <div className="flex items-center gap-1.5">
                  <Badge variant="outline" className="border-white/20 text-[10px] text-white/50">
                    <FileImage className="mr-1 h-3 w-3" />
                    {customFileName || "File Attached"}
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Price and Quantity */}
          <div className="mt-auto flex items-center justify-between pt-2">
            {/* Quantity Controls */}
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 border-white/20 bg-transparent text-white hover:bg-white/10"
                onClick={() => onUpdateQuantity(id, quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center text-sm font-medium text-white">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 border-white/20 bg-transparent text-white hover:bg-white/10"
                onClick={() => onUpdateQuantity(id, quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>

            {/* Line Total */}
            <span className="font-semibold text-white">
              {formatPrice(lineTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

