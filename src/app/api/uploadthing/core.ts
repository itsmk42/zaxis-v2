import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// ============================================
// AUTH HELPER (Placeholder - implement with your auth solution)
// ============================================

// TODO: Replace with actual auth check (NextAuth, Clerk, etc.)
async function getUser() {
  // For now, return a mock admin user
  // In production, verify session and check admin role
  return { id: "admin", role: "admin" };
}

async function requireAdmin() {
  const user = await getUser();
  if (!user || user.role !== "admin") {
    throw new UploadThingError("Unauthorized: Admin access required");
  }
  return user;
}

// ============================================
// FILE ROUTER - Define upload endpoints
// ============================================

export const ourFileRouter = {
  // ----------------------------------------
  // ADMIN: Product Image Upload
  // For uploading product photos in admin dashboard
  // ----------------------------------------
  productImage: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 10,
    },
  })
    .middleware(async () => {
      // Verify admin access
      const user = await requireAdmin();
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Product image uploaded by:", metadata.userId);
      console.log("File URL:", file.url);

      return {
        uploadedBy: metadata.userId,
        url: file.url,
        name: file.name,
        size: file.size,
      };
    }),

  // ----------------------------------------
  // ADMIN: Product 3D Model Upload
  // For uploading STL/OBJ files for products
  // ----------------------------------------
  productModel: f({
    blob: {
      maxFileSize: "64MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const user = await requireAdmin();
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("3D model uploaded by:", metadata.userId);
      console.log("File URL:", file.url);

      return {
        uploadedBy: metadata.userId,
        url: file.url,
        name: file.name,
        size: file.size,
      };
    }),

  // ----------------------------------------
  // CUSTOMER: Custom Order File Upload
  // For customers uploading images for lithophanes, etc.
  // ----------------------------------------
  customerUpload: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 5,
    },
    blob: {
      maxFileSize: "32MB", // For STL files
      maxFileCount: 2,
    },
  })
    .middleware(async () => {
      // For customer uploads, we don't require auth
      // but we could track by session/IP if needed
      return { uploadedAt: new Date().toISOString() };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Customer file uploaded at:", metadata.uploadedAt);
      console.log("File URL:", file.url);

      return {
        url: file.url,
        name: file.name,
        size: file.size,
        uploadedAt: metadata.uploadedAt,
      };
    }),

  // ----------------------------------------
  // BULK QUOTE: Reference File Upload
  // For B2B clients uploading reference materials
  // ----------------------------------------
  bulkQuoteUpload: f({
    image: {
      maxFileSize: "8MB",
      maxFileCount: 5,
    },
    blob: {
      maxFileSize: "64MB",
      maxFileCount: 3,
    },
  })
    .middleware(async () => {
      return { uploadedAt: new Date().toISOString() };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Bulk quote file uploaded at:", metadata.uploadedAt);

      return {
        url: file.url,
        name: file.name,
        size: file.size,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

