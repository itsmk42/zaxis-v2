"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/app/actions/product";

// ============================================
// DELETE PRODUCT BUTTON
// ============================================

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteProduct(productId);
      if (!result.success) {
        alert(result.message);
      }
    } catch (error) {
      alert("Failed to delete product");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/60">Delete?</span>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setShowConfirm(false)}
          disabled={isDeleting}
          className="h-8 px-2 text-white/60 hover:bg-white/10 hover:text-white"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
          className="h-8 bg-red-500 px-2 text-white hover:bg-red-600"
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Confirm"
          )}
        </Button>
      </div>
    );
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={() => setShowConfirm(true)}
      className="h-8 w-8 p-0 text-white/40 hover:bg-red-500/10 hover:text-red-400"
      title={`Delete ${productName}`}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}

