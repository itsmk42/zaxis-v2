import { z } from "zod";

// ============================================
// SERVICE & MATERIAL OPTIONS
// ============================================

export const SERVICE_TYPES = [
  { value: "batch_printing", label: "Batch Printing" },
  { value: "prototyping", label: "Prototyping" },
  { value: "lithophanes", label: "Lithophanes" },
  { value: "architectural_models", label: "Architectural Models" },
  { value: "custom_engineering", label: "Custom Engineering Parts" },
] as const;

export const MATERIAL_OPTIONS = [
  { value: "pla", label: "PLA (Standard)" },
  { value: "petg", label: "PETG (Durable)" },
  { value: "tpu", label: "TPU (Flexible)" },
  { value: "abs", label: "ABS (Heat Resistant)" },
  { value: "resin", label: "Resin (High Detail)" },
  { value: "not_sure", label: "Not Sure - Need Guidance" },
] as const;

// ============================================
// ZOD VALIDATION SCHEMA
// ============================================

export const BulkQuoteSchema = z.object({
  // Contact Details
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  
  companyName: z
    .string()
    .max(100, "Company name is too long")
    .optional()
    .or(z.literal("")),
  
  whatsappNumber: z
    .string()
    .min(10, "Please enter a valid WhatsApp number")
    .max(15, "WhatsApp number is too long")
    .regex(
      /^[+]?[0-9]{10,15}$/,
      "Please enter a valid phone number (digits only, optional + prefix)"
    ),
  
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),

  // Project Specifications
  serviceType: z.enum(
    SERVICE_TYPES.map((s) => s.value) as [string, ...string[]],
    { required_error: "Please select a service type" }
  ),
  
  materialPreference: z.enum(
    MATERIAL_OPTIONS.map((m) => m.value) as [string, ...string[]],
    { required_error: "Please select a material preference" }
  ),
  
  quantity: z
    .number({ invalid_type_error: "Please enter a valid number" })
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1")
    .max(100000, "For quantities over 100,000, please contact us directly"),

  // Project Details
  description: z
    .string()
    .min(20, "Please provide more details about your project (at least 20 characters)")
    .max(2000, "Description is too long"),

  // File References (optional - URLs after upload)
  referenceFileUrls: z
    .array(z.string().url())
    .max(5, "Maximum 5 reference files allowed")
    .optional(),

  // Additional Options
  urgency: z
    .enum(["standard", "rush", "flexible"])
    .default("standard"),
});

// ============================================
// TYPES
// ============================================

export type BulkQuoteFormData = z.infer<typeof BulkQuoteSchema>;

export type ServiceType = (typeof SERVICE_TYPES)[number]["value"];
export type MaterialOption = (typeof MATERIAL_OPTIONS)[number]["value"];

