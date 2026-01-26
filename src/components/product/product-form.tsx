"use client";

import { useState, useMemo, useCallback } from "react";
import { ShoppingCart, Upload, X, ImageIcon, Type, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";

// Types matching Prisma schema
type CustomizationInputType = "TEXT_INPUT" | "FILE_UPLOAD" | "COLOR_SELECT" | "SIZE_SELECT";
type ProductType = "STANDARD" | "CUSTOM";

interface CustomizationAttribute {
  id: string;
  name: string;
  label: string;
  inputType: CustomizationInputType;
  isRequired: boolean;
  placeholder?: string | null;
  helpText?: string | null;
  additionalPrice?: number | null;
  validationRules?: {
    minLength?: number;
    maxLength?: number;
    maxSizeMB?: number;
    allowedTypes?: string[];
  } | null;
}

interface ProductFormProps {
  product: {
    id: string;
    slug?: string;
    name: string;
    productType: ProductType;
    basePrice: number;
    image?: string | null;
    customizationAttributes: CustomizationAttribute[];
  };
}

interface CustomizationValues {
  [attributeId: string]: {
    value: string;
    file?: File | null;
    filePreview?: string | null;
  };
}

export function ProductForm({ product }: ProductFormProps) {
  const { id, slug, name, productType, basePrice, image, customizationAttributes } = product;

  const [customizations, setCustomizations] = useState<CustomizationValues>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCart((state) => state.addItem);

  // Calculate total price including customization add-ons
  const totalPrice = useMemo(() => {
    let total = basePrice;
    customizationAttributes.forEach((attr) => {
      if (customizations[attr.id]?.value && attr.additionalPrice) {
        total += attr.additionalPrice;
      }
    });
    return total;
  }, [basePrice, customizationAttributes, customizations]);

  // Check if all required customizations are filled
  const isFormValid = useMemo(() => {
    if (productType === "STANDARD") return true;

    return customizationAttributes
      .filter((attr) => attr.isRequired)
      .every((attr) => {
        const value = customizations[attr.id];
        if (attr.inputType === "FILE_UPLOAD") {
          return value?.file != null;
        }
        return value?.value && value.value.trim().length > 0;
      });
  }, [productType, customizationAttributes, customizations]);

  const handleTextChange = useCallback((attributeId: string, value: string) => {
    setCustomizations((prev) => ({
      ...prev,
      [attributeId]: { ...prev[attributeId], value },
    }));
  }, []);

  const handleFileChange = useCallback((attributeId: string, file: File | null) => {
    if (file) {
      const preview = URL.createObjectURL(file);
      setCustomizations((prev) => ({
        ...prev,
        [attributeId]: { value: file.name, file, filePreview: preview },
      }));
    } else {
      setCustomizations((prev) => ({
        ...prev,
        [attributeId]: { value: "", file: null, filePreview: null },
      }));
    }
  }, []);

  const handleRemoveFile = useCallback((attributeId: string) => {
    const current = customizations[attributeId];
    if (current?.filePreview) {
      URL.revokeObjectURL(current.filePreview);
    }
    setCustomizations((prev) => ({
      ...prev,
      [attributeId]: { value: "", file: null, filePreview: null },
    }));
  }, [customizations]);

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);
    try {
      // Extract text customization (first TEXT_INPUT attribute)
      const textAttr = customizationAttributes.find((a) => a.inputType === "TEXT_INPUT");
      const customText = textAttr ? customizations[textAttr.id]?.value : null;

      // Extract file customization (first FILE_UPLOAD attribute)
      const fileAttr = customizationAttributes.find((a) => a.inputType === "FILE_UPLOAD");
      const fileData = fileAttr ? customizations[fileAttr.id] : null;

      // TODO: Upload file to UploadThing and get URL
      // For now, we'll use a placeholder or the preview URL
      const customFileUrl = fileData?.filePreview || null;
      const customFileName = fileData?.file?.name || null;

      addItem({
        productId: id,
        productName: name,
        productSlug: slug || id,
        productType,
        productImage: image || null,
        unitPrice: totalPrice,
        quantity: 1,
        customText,
        customFileUrl,
        customFileName,
      });

      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter attributes by type for rendering
  const textAttributes = customizationAttributes.filter(
    (attr) => attr.inputType === "TEXT_INPUT"
  );
  const fileAttributes = customizationAttributes.filter(
    (attr) => attr.inputType === "FILE_UPLOAD"
  );

  const hasCustomizations = customizationAttributes.length > 0;

  return (
    <div className="space-y-6">
      {/* Customization Section */}
      {hasCustomizations && (
        <>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-white">
              Customize Your Product
            </h3>
            <p className="text-sm text-white/60">
              Fill in the details below to personalize your order
            </p>
          </div>

          <div className="space-y-6">
            {/* Text Input Customizations */}
            {textAttributes.map((attr) => (
              <TextCustomization
                key={attr.id}
                attribute={attr}
                value={customizations[attr.id]?.value || ""}
                onChange={(value) => handleTextChange(attr.id, value)}
              />
            ))}

            {/* File Upload Customizations */}
            {fileAttributes.map((attr) => (
              <FileCustomization
                key={attr.id}
                attribute={attr}
                file={customizations[attr.id]?.file || null}
                preview={customizations[attr.id]?.filePreview || null}
                onChange={(file) => handleFileChange(attr.id, file)}
                onRemove={() => handleRemoveFile(attr.id)}
              />
            ))}
          </div>

          <Separator className="bg-white/10" />
        </>
      )}

      {/* Price Summary */}
      <div className="flex items-center justify-between">
        <span className="text-white/60">Total</span>
        <span className="text-2xl font-bold text-white">
          {formatPrice(totalPrice)}
        </span>
      </div>

      {/* Add to Cart Button */}
      <Button
        size="lg"
        className={cn(
          "w-full disabled:opacity-50",
          addedToCart
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-white text-black hover:bg-white/90"
        )}
        disabled={!isFormValid || isSubmitting}
        onClick={handleSubmit}
      >
        {addedToCart ? (
          <>
            <Check className="mr-2 h-5 w-5" />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-5 w-5" />
            {isSubmitting ? "Adding..." : "Add to Cart"}
          </>
        )}
      </Button>

      {/* Validation Message */}
      {!isFormValid && hasCustomizations && (
        <p className="text-center text-sm text-amber-400">
          Please complete all required customizations above
        </p>
      )}
    </div>
  );
}

// ============================================
// TEXT CUSTOMIZATION COMPONENT
// ============================================

interface TextCustomizationProps {
  attribute: CustomizationAttribute;
  value: string;
  onChange: (value: string) => void;
}

function TextCustomization({ attribute, value, onChange }: TextCustomizationProps) {
  const { label, placeholder, helpText, isRequired, validationRules } = attribute;
  const maxLength = validationRules?.maxLength || 50;
  const minLength = validationRules?.minLength || 0;

  const isValid = !isRequired || (value.length >= minLength && value.length <= maxLength);
  const charCount = value.length;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2 text-white">
          <Type className="h-4 w-4 text-white/60" />
          {label}
          {isRequired && <span className="text-red-400">*</span>}
        </Label>
        <span className={cn(
          "text-xs",
          charCount > maxLength ? "text-red-400" : "text-white/40"
        )}>
          {charCount}/{maxLength}
        </span>
      </div>

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Enter text for 3D print"}
        maxLength={maxLength + 10} // Allow slight overflow for UX
        className={cn(
          "border-white/20 bg-white/5 text-white placeholder:text-white/30",
          "focus:border-white/40 focus:ring-white/20",
          !isValid && value.length > 0 && "border-red-400/50"
        )}
      />

      {helpText && (
        <p className="text-xs text-white/40">{helpText}</p>
      )}

      {value.length > 0 && isValid && (
        <div className="flex items-center gap-1 text-xs text-green-400">
          <Check className="h-3 w-3" />
          <span>Looks good!</span>
        </div>
      )}
    </div>
  );
}

// ============================================
// FILE UPLOAD CUSTOMIZATION COMPONENT
// ============================================

interface FileCustomizationProps {
  attribute: CustomizationAttribute;
  file: File | null;
  preview: string | null;
  onChange: (file: File | null) => void;
  onRemove: () => void;
}

function FileCustomization({
  attribute,
  file,
  preview,
  onChange,
  onRemove
}: FileCustomizationProps) {
  const { label, helpText, isRequired, validationRules } = attribute;
  const maxSizeMB = validationRules?.maxSizeMB || 10;
  const allowedTypes = validationRules?.allowedTypes || ["image/jpeg", "image/png", "image/webp"];

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      onChange(droppedFile);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      onChange(selectedFile);
    }
  };

  const validateFile = (f: File): boolean => {
    if (f.size > maxSizeMB * 1024 * 1024) {
      alert(`File size must be less than ${maxSizeMB}MB`);
      return false;
    }
    if (!allowedTypes.includes(f.type)) {
      alert("Please upload a valid image file (JPEG, PNG, or WebP)");
      return false;
    }
    return true;
  };

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-white">
        <ImageIcon className="h-4 w-4 text-white/60" />
        {label}
        {isRequired && <span className="text-red-400">*</span>}
      </Label>

      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={cn(
            "relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center",
            "rounded-lg border-2 border-dashed border-white/20 bg-white/5",
            "transition-colors hover:border-white/40 hover:bg-white/10"
          )}
        >
          <input
            type="file"
            accept={allowedTypes.join(",")}
            onChange={handleFileSelect}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
          <Upload className="mb-3 h-10 w-10 text-white/40" />
          <p className="text-sm font-medium text-white/70">
            Drop your image here or click to browse
          </p>
          <p className="mt-1 text-xs text-white/40">
            JPEG, PNG, or WebP up to {maxSizeMB}MB
          </p>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-lg border border-white/20 bg-white/5">
          <div className="flex items-center gap-4 p-4">
            {preview && (
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-white/10">
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {file.name}
              </p>
              <p className="text-xs text-white/40">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <Badge variant="success" className="mt-2">
                <Check className="mr-1 h-3 w-3" />
                Ready to upload
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="text-white/60 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      {helpText && (
        <p className="text-xs text-white/40">{helpText}</p>
      )}
    </div>
  );
}

