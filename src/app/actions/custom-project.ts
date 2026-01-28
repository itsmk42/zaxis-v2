"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CustomProjectSchema, type CustomProjectFormData } from "@/lib/validations/custom-project";

// ============================================
// TYPES
// ============================================

export interface CustomProjectResult {
    success: boolean;
    message: string;
    quoteId?: string;
    errors?: Record<string, string[]>;
}

// ============================================
// SERVER ACTION: Submit Custom Project Request
// ============================================

export async function submitCustomProject(
    formData: CustomProjectFormData
): Promise<CustomProjectResult> {
    try {
        // Validate the form data on the server
        const validationResult = CustomProjectSchema.safeParse(formData);

        if (!validationResult.success) {
            return {
                success: false,
                message: "Please check the form for errors",
                errors: validationResult.error.flatten().fieldErrors as Record<string, string[]>,
            };
        }

        const data = validationResult.data;

        // Generate a quote reference ID
        const quoteId = `ZAX-${Date.now().toString(36).toUpperCase()}-${Math.random()
            .toString(36)
            .substring(2, 6)
            .toUpperCase()}`;

        // Map project type to service type for database
        const serviceTypeMap: Record<string, string> = {
            "3d_print_file": "3D Print from File",
            "custom_design": "Custom Design Service",
            "lithophane": "Custom Lithophane",
            "other": "Other Custom Project",
        };

        // Save to database
        const inquiry = await prisma.bulkInquiry.create({
            data: {
                quoteId,
                inquiryType: "CUSTOM_INDIVIDUAL",
                name: data.name,
                companyName: null,
                email: null,
                whatsappNumber: data.whatsappNumber,
                serviceType: serviceTypeMap[data.projectType],
                materialPreference: null,
                quantity: 1,
                urgency: "standard",
                description: data.description,
                referenceFileUrls: data.referenceFileUrls || [],
                status: "NEW",
            },
        });

        console.log("Custom project inquiry saved:", inquiry.id, quoteId);

        // Revalidate the admin inquiries page
        revalidatePath("/admin/inquiries");

        // TODO: Send email notification
        // TODO: Send WhatsApp notification via API

        return {
            success: true,
            message: "Thank you! We'll review your project and contact you on WhatsApp shortly with a quote.",
            quoteId,
        };
    } catch (error) {
        console.error("Custom project submission error:", error);

        return {
            success: false,
            message: "Something went wrong. Please try again or contact us directly on WhatsApp.",
        };
    }
}
