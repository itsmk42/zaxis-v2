"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { BulkQuoteSchema, type BulkQuoteFormData } from "@/lib/validations/bulk-quote";

// ============================================
// TYPES
// ============================================

export interface BulkQuoteResult {
  success: boolean;
  message: string;
  quoteId?: string;
  errors?: Record<string, string[]>;
}

// ============================================
// SERVER ACTION: Submit Bulk Quote
// ============================================

export async function submitBulkQuote(
  formData: BulkQuoteFormData
): Promise<BulkQuoteResult> {
  try {
    // Validate the form data on the server
    const validationResult = BulkQuoteSchema.safeParse(formData);

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

    // Save to database
    const inquiry = await prisma.bulkInquiry.create({
      data: {
        quoteId,
        name: data.name,
        companyName: data.companyName || null,
        email: data.email || null,
        whatsappNumber: data.whatsappNumber,
        serviceType: data.serviceType,
        materialPreference: data.materialPreference,
        quantity: data.quantity,
        urgency: data.urgency,
        description: data.description,
        referenceFileUrls: data.referenceFileUrls || [],
        status: "NEW",
      },
    });

    console.log("Bulk inquiry saved:", inquiry.id, quoteId);

    // Revalidate the admin inquiries page
    revalidatePath("/admin/inquiries");

    // TODO: Send email notification
    // TODO: Send WhatsApp notification via API

    return {
      success: true,
      message: "Thank you! We will contact you on WhatsApp shortly.",
      quoteId,
    };
  } catch (error) {
    console.error("Bulk quote submission error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again or contact us directly.",
    };
  }
}
