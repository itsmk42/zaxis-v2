"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductSchema, type ProductFormData } from "@/lib/validations/product";

// ============================================
// TYPES
// ============================================

export interface ProductActionResult {
  success: boolean;
  message: string;
  productId?: string;
  errors?: Record<string, string[]>;
}

// ============================================
// HELPER: Generate Slug
// ============================================

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 100);
}

// ============================================
// SERVER ACTION: Create Product
// ============================================

export async function createProduct(
  formData: ProductFormData
): Promise<ProductActionResult> {
  try {
    // Validate the form data on the server
    const validationResult = ProductSchema.safeParse(formData);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Please check the form for errors",
        errors: validationResult.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    const data = validationResult.data;

    // Generate unique slug
    let slug = generateSlug(data.name);
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    // Find category
    const category = await prisma.category.findUnique({
      where: { slug: data.category },
    });

    // Create the product
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
        shortDescription: data.shortDescription || null,
        productType: data.productType,
        categoryId: category?.id || null,
        basePrice: data.basePrice,
        compareAtPrice: data.compareAtPrice || null,
        gstRate: parseFloat(data.gstRate),
        hsnCode: data.hsnCode || null,
        trackInventory: data.productType === "STANDARD" ? data.trackInventory : false,
        quantity: data.productType === "STANDARD" ? data.quantity : 0,
        lowStockThreshold: data.lowStockThreshold,
        basePrintTimeMinutes: data.basePrintTimeMinutes || null,
        materialType: data.materialType || null,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        // Create images if provided
        images: {
          create: [
            ...(data.mainImageUrl
              ? [{ url: data.mainImageUrl, alt: data.name, position: 0 }]
              : []),
            ...(data.additionalImageUrls?.map((url, index) => ({
              url,
              alt: `${data.name} - ${index + 1}`,
              position: index + 1,
            })) || []),
          ],
        },
        // Create customization attributes for CUSTOM products
        customizationAttributes:
          data.productType === "CUSTOM"
            ? {
              create: [
                ...(data.requiresFileUpload
                  ? [
                    {
                      name: "photo_upload",
                      label: "Photo Upload",
                      inputType: "FILE_UPLOAD" as const,
                      isRequired: true,
                      position: 0,
                    },
                  ]
                  : []),
                ...(data.requiresTextInput
                  ? [
                    {
                      name: "custom_text",
                      label: data.textInputLabel || "Custom Text",
                      inputType: "TEXT_INPUT" as const,
                      isRequired: true,
                      placeholder: data.textInputPlaceholder || "",
                      position: 1,
                    },
                  ]
                  : []),
              ],
            }
            : undefined,
      },
    });

    console.log("Product created:", product.id, product.name);

    // Revalidate the products pages
    revalidatePath("/admin/products");
    revalidatePath("/shop");

    return {
      success: true,
      message: "Product created successfully!",
      productId: product.id,
    };
  } catch (error) {
    console.error("Create product error:", error);

    return {
      success: false,
      message: "Failed to create product. Please try again.",
    };
  }
}

// ============================================
// SERVER ACTION: Create Product and Redirect
// ============================================

export async function createProductAndRedirect(
  formData: ProductFormData
): Promise<void> {
  const result = await createProduct(formData);

  if (result.success) {
    redirect("/admin/products");
  }

  // If not successful, the error will be handled by the form
  throw new Error(result.message);
}

// ============================================
// SERVER ACTION: Update Product
// ============================================

export async function updateProduct(
  productId: string,
  formData: ProductFormData
): Promise<ProductActionResult> {
  try {
    // Validate the form data on the server
    const validationResult = ProductSchema.safeParse(formData);

    if (!validationResult.success) {
      return {
        success: false,
        message: "Please check the form for errors",
        errors: validationResult.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    const data = validationResult.data;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: { images: true, customizationAttributes: true },
    });

    if (!existingProduct) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    // Update the product
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name: data.name,
        description: data.description,
        shortDescription: data.shortDescription || null,
        productType: data.productType,
        basePrice: data.basePrice,
        compareAtPrice: data.compareAtPrice || null,
        gstRate: parseFloat(data.gstRate),
        hsnCode: data.hsnCode || null,
        trackInventory: data.productType === "STANDARD" ? data.trackInventory : false,
        quantity: data.productType === "STANDARD" ? data.quantity : 0,
        lowStockThreshold: data.lowStockThreshold,
        materialType: data.materialType || null,
        isActive: data.isActive,
        isFeatured: data.isFeatured,
        categoryId: (await prisma.category.findUnique({ where: { slug: data.category } }))?.id || null,
        // Handling images: Replace all images with the new set
        images: {
          deleteMany: {},
          create: [
            ...(data.mainImageUrl
              ? [{ url: data.mainImageUrl, alt: data.name, position: 0 }]
              : []),
            ...(data.additionalImageUrls?.map((url, index) => ({
              url,
              alt: `${data.name} - ${index + 1}`,
              position: index + 1,
            })) || []),
          ],
        },
        // Updating customization attributes
        customizationAttributes:
          data.productType === "CUSTOM"
            ? {
              deleteMany: {}, // Clean slate for simplicity in attributes
              create: [
                ...(data.requiresFileUpload
                  ? [
                    {
                      name: "photo_upload",
                      label: "Photo Upload",
                      inputType: "FILE_UPLOAD" as const,
                      isRequired: true,
                      position: 0,
                    },
                  ]
                  : []),
                ...(data.requiresTextInput
                  ? [
                    {
                      name: "custom_text",
                      label: data.textInputLabel || "Custom Text",
                      inputType: "TEXT_INPUT" as const,
                      isRequired: true,
                      placeholder: data.textInputPlaceholder || "",
                      position: 1,
                    },
                  ]
                  : []),
              ],
            }
            : {
              deleteMany: {}, // Remove if product type changed to STANDARD
            },
      },
    });

    console.log("Product updated:", product.id, product.name);

    // Revalidate the products pages
    revalidatePath("/admin/products");
    revalidatePath(`/shop/${product.slug}`);
    revalidatePath("/shop");

    return {
      success: true,
      message: "Product updated successfully!",
      productId: product.id,
    };
  } catch (error) {
    console.error("Update product error:", error);

    return {
      success: false,
      message: "Failed to update product. Please try again.",
    };
  }
}

// ============================================
// SERVER ACTION: Delete Product
// ============================================

export async function deleteProduct(
  productId: string
): Promise<ProductActionResult> {
  try {
    // Delete the product and its related data
    // Prisma will cascade delete images and customization attributes
    await prisma.product.delete({
      where: { id: productId },
    });

    console.log("Product deleted:", productId);

    // Revalidate the products pages
    revalidatePath("/admin/products");
    revalidatePath("/shop");

    return {
      success: true,
      message: "Product deleted successfully!",
    };
  } catch (error) {
    console.error("Delete product error:", error);

    return {
      success: false,
      message: "Failed to delete product. It may have associated orders.",
    };
  }
}
