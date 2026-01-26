"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Upload, X, Loader2, FileIcon, ImageIcon, CheckCircle2 } from "lucide-react";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Button } from "./button";

// ============================================
// TYPES
// ============================================

export interface UploadedFile {
  url: string;
  name: string;
  size: number;
}

interface FileUploadProps {
  endpoint: "productImage" | "productModel" | "customerUpload" | "bulkQuoteUpload";
  value?: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  label?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
}

// ============================================
// FILE UPLOAD COMPONENT
// ============================================

export function FileUpload({
  endpoint,
  value = [],
  onChange,
  maxFiles = 1,
  label = "Upload Files",
  hint,
  disabled = false,
  className,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { startUpload, routeConfig } = useUploadThing(endpoint, {
    onClientUploadComplete: (res) => {
      if (res) {
        const newFiles: UploadedFile[] = res.map((file) => ({
          url: file.url,
          name: file.name,
          size: file.size,
        }));
        onChange([...value, ...newFiles].slice(0, maxFiles));
      }
      setIsUploading(false);
      setUploadProgress(0);
    },
    onUploadError: (error) => {
      console.error("Upload error:", error);
      setIsUploading(false);
      setUploadProgress(0);
    },
    onUploadProgress: (progress) => {
      setUploadProgress(progress);
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled || isUploading) return;

      const remainingSlots = maxFiles - value.length;
      const filesToUpload = acceptedFiles.slice(0, remainingSlots);

      if (filesToUpload.length === 0) return;

      setIsUploading(true);
      await startUpload(filesToUpload);
    },
    [disabled, isUploading, maxFiles, value.length, startUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: routeConfig ? generateClientDropzoneAccept(Object.keys(routeConfig)) : undefined,
    disabled: disabled || isUploading || value.length >= maxFiles,
    maxFiles: maxFiles - value.length,
  });

  const removeFile = useCallback(
    (index: number) => {
      onChange(value.filter((_, i) => i !== index));
    },
    [value, onChange]
  );

  const canUploadMore = value.length < maxFiles;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Dropzone */}
      {canUploadMore && (
        <div
          {...getRootProps()}
          className={cn(
            "relative flex min-h-[150px] cursor-pointer flex-col items-center justify-center",
            "rounded-lg border-2 border-dashed transition-all",
            isDragActive
              ? "border-white bg-white/10"
              : "border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10",
            (disabled || isUploading) && "cursor-not-allowed opacity-50"
          )}
        >
          <input {...getInputProps()} />

          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-white/60" />
              <p className="text-sm text-white/60">Uploading... {uploadProgress}%</p>
              <div className="h-2 w-48 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-white transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 p-6 text-center">
              <Upload className="h-10 w-10 text-white/40" />
              <div>
                <p className="text-sm font-medium text-white">
                  {isDragActive ? "Drop files here" : label}
                </p>
                <p className="mt-1 text-xs text-white/40">
                  {hint || `Drag & drop or click to browse (${value.length}/${maxFiles})`}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Uploaded Files Preview */}
      {value.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {value.map((file, index) => (
            <FilePreview
              key={file.url}
              file={file}
              onRemove={() => removeFile(index)}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// FILE PREVIEW COMPONENT
// ============================================

interface FilePreviewProps {
  file: UploadedFile;
  onRemove: () => void;
  disabled?: boolean;
}

function FilePreview({ file, onRemove, disabled }: FilePreviewProps) {
  const isImage = file.url.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="group relative flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
      {/* Thumbnail */}
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md bg-white/10">
        {isImage ? (
          <Image
            src={file.url}
            alt={file.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <FileIcon className="h-6 w-6 text-white/40" />
          </div>
        )}
      </div>

      {/* File Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{file.name}</p>
        <p className="text-xs text-white/40">{formatSize(file.size)}</p>
      </div>

      {/* Success Icon */}
      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-400" />

      {/* Remove Button */}
      {!disabled && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-500 p-0 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}

// ============================================
// SINGLE IMAGE UPLOAD (Simplified)
// ============================================

interface SingleImageUploadProps {
  endpoint: "productImage" | "customerUpload";
  value?: string;
  onChange: (url: string | undefined) => void;
  label?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
}

export function SingleImageUpload({
  endpoint,
  value,
  onChange,
  label = "Upload Image",
  hint,
  disabled = false,
  className,
}: SingleImageUploadProps) {
  const handleChange = useCallback(
    (files: UploadedFile[]) => {
      onChange(files[0]?.url);
    },
    [onChange]
  );

  const fileValue: UploadedFile[] = value
    ? [{ url: value, name: "Uploaded image", size: 0 }]
    : [];

  return (
    <FileUpload
      endpoint={endpoint}
      value={fileValue}
      onChange={handleChange}
      maxFiles={1}
      label={label}
      hint={hint}
      disabled={disabled}
      className={className}
    />
  );
}

