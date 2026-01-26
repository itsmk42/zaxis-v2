import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Features } from "@/components/home/features";
import { FeaturedProducts } from "@/components/home/featured-products";
import { HowItWorks } from "@/components/home/how-it-works";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Placeholder gradient - replace with actual image */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900"
            style={{
              backgroundImage: `url('/images/hero-bg.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '100px 100px',
            }}
          />
          {/* Glow effect */}
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[120px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium text-white/80">
              Handcrafted in Mangaluru
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            <span className="block">Z Axis</span>
            <span className="block bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Studio
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-xl text-lg text-white/60 sm:text-xl md:text-2xl">
            Engineering Art into Reality
          </p>

          {/* Description */}
          <p className="mt-4 max-w-2xl text-sm text-white/40 sm:text-base">
            Premium 3D printed lamps, lithophanes, and custom creations.
            Transform your memories into illuminated masterpieces.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
            {/* Primary CTA */}
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-full bg-white px-8 text-base font-semibold text-black transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
            >
              <Link href="/collections">
                Shop Creations
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            {/* Secondary CTA */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-white/20 bg-transparent px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
            >
              <Link href="/custom-orders">
                Start Custom Project
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/40">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">500+</span>
              <span className="text-sm">Happy Customers</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">4.9</span>
              <span className="text-sm">★ Rating</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">GST</span>
              <span className="text-sm">Compliant</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-white/40">Scroll to explore</span>
            <div className="h-12 w-6 rounded-full border border-white/20 p-1">
              <div className="h-2 w-full animate-bounce rounded-full bg-white/60" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <Features />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* How It Works */}
      <HowItWorks />
    </>
  );
}

