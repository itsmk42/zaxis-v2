import { Metadata } from "next";
import {
  Factory,
  Cpu,
  Building2,
  Boxes,
  CheckCircle2,
  Clock,
  Shield,
  Truck,
} from "lucide-react";
import { BulkQuoteForm } from "@/components/forms/bulk-quote-form";

// ============================================
// METADATA
// ============================================

export const metadata: Metadata = {
  title: "Bulk Services & Manufacturing | Z Axis Studio",
  description:
    "Partner with Z Axis Studio for batch production, prototyping, and architectural models. Get a custom quote for your manufacturing needs.",
};

// ============================================
// PAGE COMPONENT
// ============================================

export default function BulkServicesPage() {
  return (
    <main className="min-h-screen bg-black pt-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60">
            <Factory className="h-4 w-4" />
            B2B Manufacturing Services
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Partner with Z Axis Studio
            <br />
            <span className="text-white/60">for Manufacturing</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            From rapid prototyping to batch production, we deliver precision 3D
            printed parts for businesses across India. Specializing in{" "}
            <span className="text-white">Batch Production</span>,{" "}
            <span className="text-white">Prototyping</span>, and{" "}
            <span className="text-white">Architectural Models</span>.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-white/20 hover:bg-white/10"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 transition-colors group-hover:bg-white/20">
                <service.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-white">
                {service.title}
              </h3>
              <p className="text-sm text-white/60">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Main Content: Form + Benefits */}
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <h2 className="mb-2 text-2xl font-bold text-white">
                Request a Quote
              </h2>
              <p className="mb-8 text-white/60">
                Tell us about your project and we&apos;ll get back to you within 24
                hours with a detailed quote.
              </p>

              <BulkQuoteForm />
            </div>
          </div>

          {/* Benefits Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Why Choose Us?
              </h3>
              <div className="space-y-4">
                {BENEFITS.map((benefit) => (
                  <div key={benefit.title} className="flex gap-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                      <benefit.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{benefit.title}</h4>
                      <p className="text-sm text-white/60">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">
                Prefer to Talk?
              </h3>
              <p className="mb-4 text-sm text-white/60">
                For urgent inquiries or complex projects, reach out directly:
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-white">
                  📱 WhatsApp:{" "}
                  <a
                    href="https://wa.me/919876543210"
                    className="text-white/70 hover:text-white hover:underline"
                  >
                    +91 98765 43210
                  </a>
                </p>
                <p className="text-white">
                  ✉️ Email:{" "}
                  <a
                    href="mailto:bulk@zaxisstudio.in"
                    className="text-white/70 hover:text-white hover:underline"
                  >
                    bulk@zaxisstudio.in
                  </a>
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">500+</p>
                  <p className="text-xs text-white/60">Projects Delivered</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">50+</p>
                  <p className="text-xs text-white/60">Business Clients</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">24hr</p>
                  <p className="text-xs text-white/60">Quote Response</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Pan-India</p>
                  <p className="text-xs text-white/60">Shipping</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-24" />
      </div>
    </main>
  );
}

// ============================================
// DATA
// ============================================

const SERVICES = [
  {
    title: "Batch Production",
    description:
      "High-volume manufacturing with consistent quality. Perfect for product launches and inventory.",
    icon: Boxes,
  },
  {
    title: "Rapid Prototyping",
    description:
      "Quick turnaround on functional prototypes. Iterate faster and validate designs.",
    icon: Cpu,
  },
  {
    title: "Architectural Models",
    description:
      "Detailed scale models for presentations, client pitches, and exhibitions.",
    icon: Building2,
  },
  {
    title: "Custom Engineering",
    description:
      "Precision parts for machinery, jigs, fixtures, and specialized applications.",
    icon: Factory,
  },
];

const BENEFITS = [
  {
    title: "Quality Guaranteed",
    description: "Rigorous QC on every batch",
    icon: CheckCircle2,
  },
  {
    title: "Fast Turnaround",
    description: "Rush orders available",
    icon: Clock,
  },
  {
    title: "Secure Process",
    description: "NDA available on request",
    icon: Shield,
  },
  {
    title: "Pan-India Delivery",
    description: "Reliable shipping nationwide",
    icon: Truck,
  },
];

