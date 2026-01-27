"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Save,
  Loader2,
  Package,
  DollarSign,
  Layers,
  Image as ImageIcon,
  Settings,
  FileText,
  Upload,
  Type,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SingleImageUpload, FileUpload, type UploadedFile } from "@/components/ui/file-upload";
import { cn } from "@/lib/utils";
import {
  ProductSchema,
  type ProductFormData,
  PRODUCT_TYPES,
  PRODUCT_CATEGORIES,
  GST_RATES,
  MATERIAL_TYPES,
} from "@/lib/validations/product";
import { createProduct, updateProduct, type ProductActionResult } from "@/app/actions/product";

// Local simple Select components since the UI one is Radix-based and the form uses HTML select behavior
const Select = React.forwardRef<HTMLSelectElement, any>(
  ({ className, error, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-red-400/50 focus:ring-red-400/20",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

const SelectOption = ({ children, ...props }: any) => (
  <option className="bg-zinc-900 text-white" {...props}>
    {children}
  </option>
);

// ============================================
// STYLES
// ============================================

const inputStyles =
  "border-white/20 bg-white/5 text-white placeholder:text-white/30 focus:border-white/40 focus:ring-white/20";
const errorStyles = "border-red-400/50 focus:ring-red-400/20";

// ============================================
// PRODUCT FORM COMPONENT
// ============================================

interface ProductFormProps {
  initialData?: ProductFormData;
  productId?: string;
}

export function ProductForm({ initialData, productId }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ProductActionResult | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: initialData || {
      productType: "STANDARD",
      gstRate: "18",
      trackInventory: true,
      quantity: 0,
      lowStockThreshold: 5,
      isActive: true,
      isFeatured: false,
      requiresFileUpload: false,
      requiresTextInput: false,
    },
  });

  const productType = watch("productType");
  const requiresFileUpload = watch("requiresFileUpload");
  const requiresTextInput = watch("requiresTextInput");
  const mainImageUrl = watch("mainImageUrl");
  const additionalImageUrls = watch("additionalImageUrls") || [];

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    setResult(null);

    try {
      let response: ProductActionResult;

      if (productId) {
        response = await updateProduct(productId, data);
      } else {
        response = await createProduct(data);
      }

      setResult(response);

      if (response.success) {
        router.push("/admin/products");
      }
    } catch (error) {
      setResult({
        success: false,
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <FormSection title="Basic Information" icon={Package}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <FormField label="Product Name" error={errors.name?.message} required>
              <Input
                {...register("name")}
                placeholder="e.g., Moon Lamp - Large"
                className={cn(inputStyles, errors.name && errorStyles)}
              />
            </FormField>
          </div>

          <div className="md:col-span-2">
            <FormField label="Description" error={errors.description?.message} required>
              <Textarea
                {...register("description")}
                placeholder="Detailed product description..."
                rows={4}
                className={cn(inputStyles, errors.description && errorStyles)}
              />
            </FormField>
          </div>

          <FormField label="Short Description" error={errors.shortDescription?.message}>
            <Input
              {...register("shortDescription")}
              placeholder="Brief tagline for product cards"
              className={cn(inputStyles, errors.shortDescription && errorStyles)}
            />
          </FormField>

          <FormField label="Category" error={errors.category?.message} required>
            <Select {...register("category")} error={!!errors.category}>
              <SelectOption value="">Select category...</SelectOption>
              {PRODUCT_CATEGORIES.map((cat) => (
                <SelectOption key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectOption>
              ))}
            </Select>
          </FormField>
        </div>
      </FormSection>

      {/* Product Type */}
      <FormSection title="Product Type" icon={Layers}>
        <FormField
          label="Type"
          error={errors.productType?.message}
          required
          hint="Standard products have inventory. Custom products are made to order."
        >
          <Select {...register("productType")} error={!!errors.productType}>
            {PRODUCT_TYPES.map((type) => (
              <SelectOption key={type.value} value={type.value}>
                {type.label}
              </SelectOption>
            ))}
          </Select>
        </FormField>

        {/* STANDARD Product Options */}
        {productType === "STANDARD" && (
          <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-6">
            <h4 className="mb-4 flex items-center gap-2 font-medium text-white">
              <Package className="h-4 w-4" />
              Inventory Settings
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Stock Quantity" error={errors.quantity?.message}>
                <Input
                  {...register("quantity", { valueAsNumber: true })}
                  type="number"
                  min={0}
                  placeholder="0"
                  className={cn(inputStyles, errors.quantity && errorStyles)}
                />
              </FormField>
              <FormField label="Low Stock Alert" error={errors.lowStockThreshold?.message}>
                <Input
                  {...register("lowStockThreshold", { valueAsNumber: true })}
                  type="number"
                  min={0}
                  placeholder="5"
                  className={cn(inputStyles, errors.lowStockThreshold && errorStyles)}
                />
              </FormField>
            </div>
          </div>
        )}

        {/* CUSTOM Product Options */}
        {productType === "CUSTOM" && (
          <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-6">
            <h4 className="mb-4 flex items-center gap-2 font-medium text-white">
              <Settings className="h-4 w-4" />
              Customization Options
            </h4>

            <div className="space-y-4">
              {/* File Upload Toggle */}
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
                <input
                  type="checkbox"
                  {...register("requiresFileUpload")}
                  className="h-5 w-5 rounded border-white/20 bg-white/5 text-white focus:ring-white/20"
                />
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-white/60" />
                  <div>
                    <p className="font-medium text-white">Requires File Upload</p>
                    <p className="text-sm text-white/60">
                      Customer must upload an image (e.g., for lithophanes)
                    </p>
                  </div>
                </div>
              </label>

              {/* Text Input Toggle */}
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10">
                <input
                  type="checkbox"
                  {...register("requiresTextInput")}
                  className="h-5 w-5 rounded border-white/20 bg-white/5 text-white focus:ring-white/20"
                />
                <div className="flex items-center gap-2">
                  <Type className="h-5 w-5 text-white/60" />
                  <div>
                    <p className="font-medium text-white">Requires Text Input</p>
                    <p className="text-sm text-white/60">
                      Customer must enter custom text (e.g., name for engraving)
                    </p>
                  </div>
                </div>
              </label>

              {/* Text Input Configuration */}
              {requiresTextInput && (
                <div className="ml-8 grid gap-4 border-l-2 border-white/10 pl-6 md:grid-cols-2">
                  <FormField label="Input Label" error={errors.textInputLabel?.message}>
                    <Input
                      {...register("textInputLabel")}
                      placeholder="e.g., Name to Engrave"
                      className={cn(inputStyles, errors.textInputLabel && errorStyles)}
                    />
                  </FormField>
                  <FormField label="Placeholder Text" error={errors.textInputPlaceholder?.message}>
                    <Input
                      {...register("textInputPlaceholder")}
                      placeholder="e.g., Enter your name..."
                      className={cn(inputStyles, errors.textInputPlaceholder && errorStyles)}
                    />
                  </FormField>
                </div>
              )}

              {/* Material Type */}
              <FormField label="Material Type" error={errors.materialType?.message}>
                <Select {...register("materialType")} error={!!errors.materialType}>
                  <SelectOption value="">Select material...</SelectOption>
                  {MATERIAL_TYPES.map((mat) => (
                    <SelectOption key={mat.value} value={mat.value}>
                      {mat.label}
                    </SelectOption>
                  ))}
                </Select>
              </FormField>
            </div>
          </div>
        )}
      </FormSection>

      {/* Pricing */}
      <FormSection title="Pricing" icon={DollarSign}>
        <div className="grid gap-6 md:grid-cols-3">
          <FormField label="Base Price (₹)" error={errors.basePrice?.message} required>
            <Input
              {...register("basePrice", { valueAsNumber: true })}
              type="number"
              min={1}
              step="0.01"
              placeholder="999"
              className={cn(inputStyles, errors.basePrice && errorStyles)}
            />
          </FormField>
          <FormField label="Compare at Price (₹)" error={errors.compareAtPrice?.message}>
            <Input
              {...register("compareAtPrice", { valueAsNumber: true })}
              type="number"
              min={0}
              step="0.01"
              placeholder="1299 (optional)"
              className={cn(inputStyles, errors.compareAtPrice && errorStyles)}
            />
          </FormField>
          <FormField label="GST Rate" error={errors.gstRate?.message}>
            <Select {...register("gstRate")} error={!!errors.gstRate}>
              {GST_RATES.map((rate) => (
                <SelectOption key={rate.value} value={rate.value}>
                  {rate.label}
                </SelectOption>
              ))}
            </Select>
          </FormField>
        </div>
        <FormField label="HSN Code" error={errors.hsnCode?.message}>
          <Input
            {...register("hsnCode")}
            placeholder="e.g., 3926 (optional)"
            className={cn(inputStyles, "max-w-xs", errors.hsnCode && errorStyles)}
          />
        </FormField>
      </FormSection>

      {/* Product Images */}
      <FormSection title="Product Images" icon={ImageIcon}>
        <div className="space-y-6">
          <FormField
            label="Main Product Image"
            error={errors.mainImageUrl?.message}
            hint="The primary image shown in search results and product cards."
          >
            <SingleImageUpload
              endpoint="productImage"
              value={mainImageUrl}
              onChange={(url) => setValue("mainImageUrl", url || "")}
              label="Upload Main Image"
              hint="Recommended: 1000x1000px, max 8MB"
            />
          </FormField>

          <FormField
            label="Additional Images"
            error={errors.additionalImageUrls?.message}
            hint="Upload up to 9 more images for the product gallery."
          >
            <FileUpload
              endpoint="productImage"
              value={additionalImageUrls.map(url => ({ url, name: "Product Image", size: 0 }))}
              onChange={(files) => setValue("additionalImageUrls", files.map(f => f.url))}
              maxFiles={9}
              label="Add More Images"
              hint="You can upload multiple gallery images at once."
            />
          </FormField>
        </div>
      </FormSection>

      {/* Status */}
      <FormSection title="Status" icon={Settings}>
        <div className="flex flex-wrap gap-6">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              {...register("isActive")}
              className="h-5 w-5 rounded border-white/20 bg-white/5 text-white focus:ring-white/20"
            />
            <div>
              <p className="font-medium text-white">Active</p>
              <p className="text-sm text-white/60">Product is visible in the store</p>
            </div>
          </label>
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              {...register("isFeatured")}
              className="h-5 w-5 rounded border-white/20 bg-white/5 text-white focus:ring-white/20"
            />
            <div>
              <p className="font-medium text-white">Featured</p>
              <p className="text-sm text-white/60">Show on homepage</p>
            </div>
          </label>
        </div>
      </FormSection>

      {/* Error Message */}
      {result && !result.success && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-center text-red-400">
          {result.message}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="border-white/20 text-white hover:bg-white/10"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-black hover:bg-white/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {productId ? "Saving..." : "Creating..."}
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {productId ? "Update Product" : "Create Product"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

// ============================================
// HELPER COMPONENTS
// ============================================

interface FormSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function FormSection({ title, icon: Icon, children }: FormSectionProps) {
  return (
    <div className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

interface FormFieldProps {
  label: string;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

function FormField({ label, error, required, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="text-white">
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-white/40">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
