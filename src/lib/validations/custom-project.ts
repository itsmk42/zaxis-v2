import { z } from "zod";

// ============================================
// PROJECT TYPE OPTIONS
// ============================================

export const PROJECT_TYPES = [
    { value: "3d_print_file", label: "3D Print from File" },
    { value: "custom_design", label: "Custom Design" },
    { value: "lithophane", label: "Lithophane" },
    { value: "other", label: "Other" },
] as const;

// ============================================
// VALIDATION SCHEMA
// ============================================

export const CustomProjectSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    whatsappNumber: z
        .string()
        .min(10, "WhatsApp number must be at least 10 digits")
        .max(15, "WhatsApp number is too long")
        .regex(/^[0-9+\s()-]+$/, "Invalid phone number format"),
    projectType: z.enum(["3d_print_file", "custom_design", "lithophane", "other"], {
        required_error: "Please select a project type",
    }),
    description: z
        .string()
        .min(10, "Please provide at least 10 characters describing your project")
        .max(1000, "Description is too long"),
    referenceFileUrls: z.array(z.string()).optional().default([]),
});

export type CustomProjectFormData = z.infer<typeof CustomProjectSchema>;
