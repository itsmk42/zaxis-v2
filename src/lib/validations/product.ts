import { z } from "zod";

// ============================================
// PRODUCT TYPE & CATEGORY OPTIONS
// ============================================

export const PRODUCT_TYPES = [
  { value: "STANDARD", label: "Standard (Inventory)" },
  { value: "CUSTOM", label: "Custom (Made to Order)" },
] as const;

export const PRODUCT_CATEGORIES = [
  { value: "lamps", label: "Lamps & Lighting" },
  { value: "figurines", label: "Figurines & Collectibles" },
  { value: "lithophanes", label: "Lithophanes" },
  { value: "keychains", label: "Keychains & Accessories" },
  { value: "home-decor", label: "Home Decor" },
  { value: "prototypes", label: "Prototypes" },
  { value: "other", label: "Other" },
] as const;

export const MATERIAL_TYPES = [
  { value: "PLA", label: "PLA" },
  { value: "PETG", label: "PETG" },
  { value: "TPU", label: "TPU" },
  { value: "ABS", label: "ABS" },
  { value: "Resin", label: "Resin" },
] as const;

export const GST_RATES = [
  { value: "5", label: "5% GST" },
  { value: "12", label: "12% GST" },
  { value: "18", label: "18% GST (Default)" },
  { value: "28", label: "28% GST" },
] as const;

// ============================================
// CUSTOMIZATION INPUT TYPES
// ============================================

export const CUSTOMIZATION_INPUT_TYPES = [
  { value: "TEXT_INPUT", label: "Text Input (e.g., name engraving)" },
  { value: "FILE_UPLOAD", label: "File Upload (e.g., photo for lithophane)" },
  { value: "COLOR_SELECT", label: "Color Selection" },
  { value: "SIZE_SELECT", label: "Size Selection" },
] as const;

// ============================================
// ZOD VALIDATION SCHEMA
// ============================================

export const ProductSchema = z.object({
  // Basic Information
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(100, "Product name is too long"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description is too long"),

  shortDescription: z
    .string()
    .max(200, "Short description is too long")
    .optional()
    .or(z.literal("")),

  // Product Type
  productType: z.enum(["STANDARD", "CUSTOM"], {
    required_error: "Please select a product type",
  }),

  // Pricing
  basePrice: z
    .number({ invalid_type_error: "Please enter a valid price" })
    .min(1, "Price must be at least ₹1")
    .max(10000000, "Price is too high"),

  compareAtPrice: z
    .number()
    .min(0)
    .optional()
    .nullable(),

  // GST
  gstRate: z.enum(["5", "12", "18", "28"]).default("18"),
  hsnCode: z.string().max(20).optional().or(z.literal("")),

  // Category
  category: z.string().min(1, "Please select a category"),

  // Inventory (for STANDARD products)
  trackInventory: z.boolean().default(true),
  quantity: z.number().int().min(0).default(0),
  lowStockThreshold: z.number().int().min(0).default(5),

  // Production (for CUSTOM products)
  basePrintTimeMinutes: z.number().int().min(0).optional().nullable(),
  materialType: z.string().optional().or(z.literal("")),

  // Customization Options (for CUSTOM products)
  requiresFileUpload: z.boolean().default(false),
  requiresTextInput: z.boolean().default(false),
  textInputLabel: z.string().max(100).optional().or(z.literal("")),
  textInputPlaceholder: z.string().max(200).optional().or(z.literal("")),

  // Media
  mainImageUrl: z.string().url("Please upload a product image").optional().or(z.literal("")),
  additionalImageUrls: z.array(z.string().url()).optional(),

  // Status
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

// ============================================
// TYPES
// ============================================

export type ProductFormData = z.infer<typeof ProductSchema>;

export type ProductType = "STANDARD" | "CUSTOM";
export type CustomizationInputType = "TEXT_INPUT" | "FILE_UPLOAD" | "COLOR_SELECT" | "SIZE_SELECT";

