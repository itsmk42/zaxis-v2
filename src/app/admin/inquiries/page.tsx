import { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Phone, Mail, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { SERVICE_TYPES } from "@/lib/validations/bulk-quote";

// ============================================
// METADATA
// ============================================

export const metadata: Metadata = {
  title: "Bulk Inquiries | Z Axis Studio Admin",
  description: "Manage bulk order inquiries and B2B leads",
};

// ============================================
// HELPER FUNCTIONS
// ============================================

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getServiceLabel(value: string): string {
  const service = SERVICE_TYPES.find((s) => s.value === value);
  return service?.label || value;
}

function formatWhatsAppNumber(phone: string): string {
  // Remove all non-digits except leading +
  let cleaned = phone.replace(/[^\d+]/g, "");
  // If starts with +, keep it; otherwise assume Indian number
  if (!cleaned.startsWith("+")) {
    // Remove leading 0 if present
    if (cleaned.startsWith("0")) {
      cleaned = cleaned.substring(1);
    }
    // Add India country code if not present
    if (!cleaned.startsWith("91")) {
      cleaned = "91" + cleaned;
    }
  } else {
    cleaned = cleaned.substring(1); // Remove + for wa.me URL
  }
  return cleaned;
}

function getStatusColor(status: string): string {
  switch (status) {
    case "NEW":
      return "bg-blue-500/20 text-blue-400";
    case "CONTACTED":
      return "bg-yellow-500/20 text-yellow-400";
    case "IN_PROGRESS":
      return "bg-purple-500/20 text-purple-400";
    case "CONVERTED":
      return "bg-green-500/20 text-green-400";
    case "CLOSED":
      return "bg-zinc-500/20 text-zinc-400";
    default:
      return "bg-zinc-500/20 text-zinc-400";
  }
}

// ============================================
// INQUIRIES LIST PAGE
// ============================================

export default async function InquiriesPage() {
  // Fetch inquiries from database
  const inquiries = await prisma.bulkInquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Bulk Inquiries</h1>
        <p className="mt-1 text-white/60">
          Manage B2B leads and bulk order requests ({inquiries.length} inquiries)
        </p>
      </div>

      {/* Inquiries List */}
      {inquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 py-16">
          <MessageSquare className="h-12 w-12 text-white/20" />
          <h3 className="mt-4 text-lg font-medium text-white">No inquiries yet</h3>
          <p className="mt-1 text-sm text-white/60">
            Bulk inquiries from the website will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/[0.07]"
            >
              {/* Header Row */}
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">
                      {inquiry.name}
                    </h3>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(
                        inquiry.status
                      )}`}
                    >
                      {inquiry.status.replace("_", " ")}
                    </span>
                  </div>
                  {inquiry.companyName && (
                    <p className="mt-0.5 text-sm text-white/60">
                      {inquiry.companyName}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <Calendar className="h-4 w-4" />
                  {formatDate(inquiry.createdAt)}
                </div>
              </div>

              {/* Contact & Project Info */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-white/40" />
                  <span className="text-white">{inquiry.whatsappNumber}</span>
                </div>
                {inquiry.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-white/40" />
                    <span className="text-white">{inquiry.email}</span>
                  </div>
                )}
                <div className="text-sm">
                  <span className="text-white/40">Service: </span>
                  <span className="text-white">
                    {getServiceLabel(inquiry.serviceType)}
                  </span>
                </div>
                {inquiry.quantity && (
                  <div className="text-sm">
                    <span className="text-white/40">Qty: </span>
                    <span className="text-white">{inquiry.quantity} units</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mt-4">
                <p className="text-sm text-white/80 line-clamp-2">
                  {inquiry.description}
                </p>
              </div>

              {/* Quote ID & Actions */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
                <div className="text-sm">
                  <span className="text-white/40">Quote ID: </span>
                  <code className="rounded bg-white/10 px-2 py-0.5 font-mono text-white">
                    {inquiry.quoteId || "—"}
                  </code>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    size="sm"
                    className="bg-green-600 text-white hover:bg-green-700"
                  >
                    <Link
                      href={`https://wa.me/${formatWhatsAppNumber(
                        inquiry.whatsappNumber
                      )}?text=${encodeURIComponent(
                        `Hi ${inquiry.name}, thank you for your inquiry (${inquiry.quoteId || "Bulk Order"}) at Z Axis Studio. `
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Reply via WhatsApp
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

