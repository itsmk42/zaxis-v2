"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, User, Phone, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload, type UploadedFile } from "@/components/ui/file-upload";
import {
    CustomProjectSchema,
    type CustomProjectFormData,
    PROJECT_TYPES,
} from "@/lib/validations/custom-project";
import { submitCustomProject, type CustomProjectResult } from "@/app/actions/custom-project";

// ============================================
// FORM COMPONENT
// ============================================

export function CustomProjectForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<CustomProjectResult | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<CustomProjectFormData>({
        resolver: zodResolver(CustomProjectSchema),
        defaultValues: {
            projectType: "3d_print_file",
            referenceFileUrls: [],
        },
    });

    const referenceFileUrls = watch("referenceFileUrls");

    const onSubmit = async (data: CustomProjectFormData) => {
        setIsSubmitting(true);
        setResult(null);

        try {
            const response = await submitCustomProject(data);
            setResult(response);

            if (response.success) {
                reset();
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

    const handleFileChange = (files: UploadedFile[]) => {
        setValue("referenceFileUrls", files.map((f) => f.url));
    };

    // Success state
    if (result?.success) {
        return (
            <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-8 text-center">
                <CheckCircle2 className="mx-auto h-16 w-16 text-green-400" />
                <h3 className="mt-4 text-2xl font-bold text-white">Request Submitted!</h3>
                <p className="mt-2 text-white/70">{result.message}</p>
                {result.quoteId && (
                    <p className="mt-4 text-sm text-white/60">
                        Your reference ID: <span className="font-mono font-bold text-white">{result.quoteId}</span>
                    </p>
                )}
                <Button
                    onClick={() => {
                        setResult(null);
                        reset();
                    }}
                    className="mt-6 bg-white text-black hover:bg-white/90"
                >
                    Submit Another Request
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Error Message */}
            {result && !result.success && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
                    <p className="text-sm text-red-400">{result.message}</p>
                </div>
            )}

            {/* Name */}
            <div>
                <Label htmlFor="name" className="text-white/80">
                    <User className="mr-2 inline h-4 w-4" />
                    Your Name *
                </Label>
                <Input
                    {...register("name")}
                    id="name"
                    className="mt-2 border-white/20 bg-white/5 text-white placeholder:text-white/40"
                    disabled={isSubmitting}
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
            </div>

            {/* WhatsApp Number */}
            <div>
                <Label htmlFor="whatsappNumber" className="text-white/80">
                    <Phone className="mr-2 inline h-4 w-4" />
                    WhatsApp Number *
                </Label>
                <Input
                    {...register("whatsappNumber")}
                    id="whatsappNumber"
                    type="tel"
                    placeholder="+91 9876543210"
                    className="mt-2 border-white/20 bg-white/5 text-white placeholder:text-white/40"
                    disabled={isSubmitting}
                />
                {errors.whatsappNumber && (
                    <p className="mt-1 text-xs text-red-400">{errors.whatsappNumber.message}</p>
                )}
                <p className="mt-1 text-xs text-white/40">We'll send you a quote via WhatsApp</p>
            </div>

            {/* Project Type */}
            <div>
                <Label htmlFor="projectType" className="text-white/80">
                    Project Type *
                </Label>
                <select
                    {...register("projectType")}
                    id="projectType"
                    className="mt-2 flex h-10 w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 text-base text-white focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isSubmitting}
                >
                    {PROJECT_TYPES.map((type) => (
                        <option key={type.value} value={type.value} className="bg-zinc-900">
                            {type.label}
                        </option>
                    ))}
                </select>
                {errors.projectType && (
                    <p className="mt-1 text-xs text-red-400">{errors.projectType.message}</p>
                )}
            </div>

            {/* Description */}
            <div>
                <Label htmlFor="description" className="text-white/80">
                    <FileText className="mr-2 inline h-4 w-4" />
                    Project Description *
                </Label>
                <Textarea
                    {...register("description")}
                    id="description"
                    rows={5}
                    placeholder="Describe your project: size, color preferences, specific requirements..."
                    className="mt-2 border-white/20 bg-white/5 text-white placeholder:text-white/40"
                    disabled={isSubmitting}
                />
                {errors.description && (
                    <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>
                )}
            </div>

            {/* File Upload */}
            <div>
                <Label className="text-white/80">Reference File (STL/OBJ/IMG)</Label>
                <p className="mb-2 text-xs text-white/40">
                    Upload your 3D model or reference images (optional)
                </p>
                <FileUpload
                    endpoint="bulkQuoteUpload"
                    value={referenceFileUrls?.map((url) => ({ url, name: "File", size: 0 })) || []}
                    onChange={handleFileChange}
                    maxFiles={5}
                    label="Upload Files"
                    hint="Drag & drop or click to browse (max 5 files)"
                    disabled={isSubmitting}
                />
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-white/90"
                size="lg"
            >
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    <>
                        <Send className="mr-2 h-5 w-5" />
                        Request Quote
                    </>
                )}
            </Button>
        </form>
    );
}
