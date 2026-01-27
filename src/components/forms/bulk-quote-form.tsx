"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Send,
  Loader2,
  User,
  Building2,
  Phone,
  Mail,
  Package,
  Layers,
  Hash,
  FileText,
  Upload,
  X,
  ImageIcon,
  CheckCircle2,
  Clock,
  Zap,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectOption } from "@/components/admin/product-form";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  BulkQuoteSchema,
  type BulkQuoteFormData,
  SERVICE_TYPES,
  MATERIAL_OPTIONS,
} from "@/lib/validations/bulk-quote";
import { submitBulkQuote, type BulkQuoteResult } from "@/app/actions/bulk-quote";

// ============================================
// FORM COMPONENT
// ============================================

export function BulkQuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<BulkQuoteResult | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<BulkQuoteFormData>({
    resolver: zodResolver(BulkQuoteSchema),
    defaultValues: {
      urgency: "standard",
      quantity: 10,
    },
  });

  const urgency = watch("urgency");

  const onSubmit = async (data: BulkQuoteFormData) => {
    setIsSubmitting(true);
    setResult(null);

    try {
      // TODO: Upload files to UploadThing first
      // For now, we'll skip file upload
      const response = await submitBulkQuote(data);
      setResult(response);

      if (response.success) {
        reset();
        setUploadedFiles([]);
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

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const validFiles = files.filter(
        (f) => f.size <= 10 * 1024 * 1024 && uploadedFiles.length + files.length <= 5
      );
      setUploadedFiles((prev) => [...prev, ...validFiles].slice(0, 5));
    },
    [uploadedFiles.length]
  );

  const removeFile = useCallback((index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Success State
  if (result?.success) {
    return (
      <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-400" />
        <h3 className="mt-4 text-2xl font-bold text-white">Quote Submitted!</h3>
        <p className="mt-2 text-white/70">{result.message}</p>
        {result.quoteId && (
          <p className="mt-4 text-sm text-white/50">
            Reference ID: <span className="font-mono text-white">{result.quoteId}</span>
          </p>
        )}
        <Button
          onClick={() => setResult(null)}
          className="mt-6 bg-white text-black hover:bg-white/90"
        >
          Submit Another Quote
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Contact Details Section */}
      <FormSection title="Contact Details" icon={User}>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField label="Your Name" icon={User} error={errors.name?.message} required>
            <Input
              {...register("name")}
              placeholder="John Doe"
              className={cn(inputStyles, errors.name && errorStyles)}
            />
          </FormField>

          <FormField label="Company Name" icon={Building2} error={errors.companyName?.message}>
            <Input
              {...register("companyName")}
              placeholder="Acme Industries (Optional)"
              className={cn(inputStyles, errors.companyName && errorStyles)}
            />
          </FormField>

          <FormField
            label="WhatsApp Number"
            icon={Phone}
            error={errors.whatsappNumber?.message}
            required
            hint="We'll contact you here for quick updates"
          >
            <Input
              {...register("whatsappNumber")}
              placeholder="+91 98765 43210"
              className={cn(inputStyles, errors.whatsappNumber && errorStyles)}
            />
          </FormField>

          <FormField label="Email Address" icon={Mail} error={errors.email?.message}>
            <Input
              {...register("email")}
              type="email"
              placeholder="john@company.com (Optional)"
              className={cn(inputStyles, errors.email && errorStyles)}
            />
          </FormField>
        </div>
      </FormSection>

      {/* Project Specifications Section */}
      <FormSection title="Project Specifications" icon={Package}>
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            label="Service Type"
            icon={Layers}
            error={errors.serviceType?.message}
            required
          >
            <Select
              {...register("serviceType")}
              error={!!errors.serviceType}
            >
              <SelectOption value="">Select a service...</SelectOption>
              {SERVICE_TYPES.map((type) => (
                <SelectOption key={type.value} value={type.value}>
                  {type.label}
                </SelectOption>
              ))}
            </Select>
          </FormField>

          <FormField
            label="Material Preference"
            icon={Layers}
            error={errors.materialPreference?.message}
            required
          >
            <Select
              {...register("materialPreference")}
              error={!!errors.materialPreference}
            >
              <SelectOption value="">Select material...</SelectOption>
              {MATERIAL_OPTIONS.map((material) => (
                <SelectOption key={material.value} value={material.value}>
                  {material.label}
                </SelectOption>
              ))}
            </Select>
          </FormField>

          <FormField
            label="Quantity"
            icon={Hash}
            error={errors.quantity?.message}
            required
            hint="Approximate number of units needed"
          >
            <Input
              {...register("quantity", { valueAsNumber: true })}
              type="number"
              min={1}
              placeholder="100"
              className={cn(inputStyles, errors.quantity && errorStyles)}
            />
          </FormField>

          <FormField label="Timeline" icon={Clock}>
            <div className="flex gap-2">
              {[
                { value: "flexible", label: "Flexible", icon: Calendar },
                { value: "standard", label: "Standard", icon: Clock },
                { value: "rush", label: "Rush", icon: Zap },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setValue("urgency", option.value as "flexible" | "standard" | "rush")}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all",
                    urgency === option.value
                      ? "border-white bg-white text-black"
                      : "border-white/20 bg-white/5 text-white/70 hover:border-white/40"
                  )}
                >
                  <option.icon className="h-4 w-4" />
                  {option.label}
                </button>
              ))}
            </div>
          </FormField>
        </div>
      </FormSection>

      {/* Project Details Section */}
      <FormSection title="Project Details" icon={FileText}>
        <FormField
          label="Project Description"
          icon={FileText}
          error={errors.description?.message}
          required
          hint="Include details like dimensions, infill %, layer height, color preferences, etc."
        >
          <Textarea
            {...register("description")}
            placeholder="Describe your project requirements in detail. For example:&#10;- Part dimensions: 100mm x 50mm x 25mm&#10;- Infill: 20%&#10;- Layer height: 0.2mm&#10;- Color: Matte Black&#10;- Special requirements: Food-safe, UV resistant, etc."
            rows={6}
            className={cn(inputStyles, "min-h-[150px]", errors.description && errorStyles)}
          />
        </FormField>

        {/* File Upload */}
        <FormField
          label="Reference Images/Models"
          icon={ImageIcon}
          hint="Upload reference images, CAD files, or sketches (max 5 files, 10MB each)"
        >
          <div
            className={cn(
              "relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center",
              "rounded-lg border-2 border-dashed border-white/20 bg-white/5",
              "transition-colors hover:border-white/40 hover:bg-white/10"
            )}
          >
            <input
              type="file"
              multiple
              accept="image/*,.stl,.obj,.step,.stp"
              onChange={handleFileChange}
              className="absolute inset-0 cursor-pointer opacity-0"
              disabled={uploadedFiles.length >= 5}
            />
            <Upload className="mb-2 h-8 w-8 text-white/40" />
            <p className="text-sm text-white/60">
              Drop files here or click to browse
            </p>
            <p className="mt-1 text-xs text-white/40">
              {uploadedFiles.length}/5 files uploaded
            </p>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-white/40" />
                    <span className="text-sm text-white/70">{file.name}</span>
                    <span className="text-xs text-white/40">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-white/40 hover:text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </FormField>
      </FormSection>

      {/* Error Message */}
      {result && !result.success && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-center text-red-400">
          {result.message}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full bg-white text-black hover:bg-white/90"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Submit Quote Request
          </>
        )}
      </Button>
    </form>
  );
}

// ============================================
// HELPER COMPONENTS
// ============================================

const inputStyles =
  "border-white/20 bg-white/5 text-white placeholder:text-white/30 focus:border-white/40 focus:ring-white/20";
const errorStyles = "border-red-400/50 focus:ring-red-400/20";

interface FormSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function FormSection({ title, icon: Icon, children }: FormSectionProps) {
  return (
    <div className="space-y-6">
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
  icon?: React.ElementType;
  error?: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}

function FormField({
  label,
  icon: Icon,
  error,
  required,
  hint,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2 text-white">
        {Icon && <Icon className="h-4 w-4 text-white/60" />}
        {label}
        {required && <span className="text-red-400">*</span>}
      </Label>
      {children}
      {hint && !error && <p className="text-xs text-white/40">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

