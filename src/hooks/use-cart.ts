import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// ============================================
// TYPES
// ============================================

export interface CartItem {
  // Product identification
  id: string; // Unique cart item ID (generated)
  productId: string;
  productName: string;
  productSlug: string;
  productType: "STANDARD" | "CUSTOM";
  productImage: string | null;
  
  // Pricing
  unitPrice: number;
  quantity: number;
  
  // Customization (for CUSTOM products)
  customText?: string | null;
  customFileUrl?: string | null;
  customFileName?: string | null;
  
  // All customizations as a record for flexibility
  customizations?: Record<string, {
    attributeId: string;
    attributeName: string;
    inputType: string;
    value: string;
    fileUrl?: string;
  }>;
}

interface CartStore {
  items: CartItem[];
  
  // Actions
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Computed (as functions since Zustand doesn't have computed)
  getItemCount: () => number;
  getSubtotal: () => number;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Generate a unique ID for cart items
 * Combines productId with customization hash for uniqueness
 */
function generateCartItemId(item: Omit<CartItem, "id">): string {
  const customizationKey = item.customText || item.customFileUrl || "";
  return `${item.productId}-${hashString(customizationKey)}`;
}

/**
 * Simple string hash for creating unique keys
 */
function hashString(str: string): string {
  if (!str) return "standard";
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Check if two cart items are identical (same product + same customizations)
 */
function areItemsIdentical(a: CartItem, b: Omit<CartItem, "id">): boolean {
  return (
    a.productId === b.productId &&
    a.customText === b.customText &&
    a.customFileUrl === b.customFileUrl
  );
}

// ============================================
// STORE
// ============================================

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        set((state) => {
          // Check if identical item already exists
          const existingItemIndex = state.items.findIndex((item) =>
            areItemsIdentical(item, newItem)
          );

          if (existingItemIndex !== -1) {
            // Merge quantities
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
            };
            return { items: updatedItems };
          }

          // Add as new item
          const itemWithId: CartItem = {
            ...newItem,
            id: generateCartItemId(newItem),
          };
          return { items: [...state.items, itemWithId] };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.id !== itemId) };
          }
          return {
            items: state.items.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.unitPrice * item.quantity,
          0
        );
      },
    }),
    {
      name: "zaxis-cart", // localStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist the items array
      partialize: (state) => ({ items: state.items }),
    }
  )
);

