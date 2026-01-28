import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MessageCircle, Lightbulb, Cog, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Custom Orders & Commissions | Z Axis Studio",
    description: "From engineering parts to personalized gifts, we print it all. Custom 3D printing services for your unique projects.",
};

const showcaseCategories = [
    {
        title: "Memories in Light",
        description: "Transform your cherished photos into stunning 3D lithophanes that come alive when backlit.",
        icon: Lightbulb,
        image: "/images/lithophane-showcase.jpg",
        features: ["Photo lithophanes", "Custom lamp designs", "Multi-layer prints"],
    },
    {
        title: "Functional Parts",
        description: "Precision-engineered components, prototypes, and replacement parts for your projects.",
        icon: Cog,
        image: "/images/engineering-showcase.jpg",
        features: ["Engineering prototypes", "Custom brackets", "Replacement parts"],
    },
    {
        title: "High-Detail Props",
        description: "Intricate miniatures, figurines, and decorative pieces with exceptional detail.",
        icon: Sparkles,
        image: "/images/miniature-showcase.jpg",
        features: ["Detailed figurines", "Cosplay props", "Decorative pieces"],
    },
];

export default function CustomOrdersPage() {
    return (
        <main className="min-h-screen bg-black">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-black pt-32 pb-20">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/5 blur-[120px]" />
                    <div
                        className="absolute inset-0 opacity-[0.02]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: '50px 50px',
                        }}
                    />
                </div>

                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                            <Sparkles className="h-4 w-4 text-amber-400" />
                            <span className="text-sm font-medium text-white/80">
                                Custom Commissions
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                            Custom Commissions
                            <span className="block bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                                & Prototypes
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 sm:text-xl">
                            From engineering parts to personalized gifts, we print it all.
                            <span className="block mt-2">Your imagination is the only limit.</span>
                        </p>

                        {/* Quick CTA */}
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
                            <Button
                                asChild
                                size="lg"
                                className="group h-12 rounded-full bg-white px-8 text-base font-semibold text-black transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                            >
                                <Link href="/custom-project">
                                    Start Your Project
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="h-12 rounded-full border-white/20 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10"
                            >
                                <a href="https://wa.me/919483654329" target="_blank" rel="noopener noreferrer">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    WhatsApp Us
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl">
                            What We Can Create
                        </h2>
                        <p className="mt-4 text-lg text-white/60">
                            Explore our capabilities across different categories
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {showcaseCategories.map((category, index) => (
                            <Card
                                key={index}
                                className="group overflow-hidden border-white/10 bg-zinc-900/50 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-zinc-900/80"
                            >
                                {/* Image Placeholder */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <category.icon className="h-20 w-20 text-white/20 transition-transform group-hover:scale-110" />
                                    </div>
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>

                                <CardContent className="p-6">
                                    <h3 className="text-2xl font-bold text-white mb-3">
                                        {category.title}
                                    </h3>
                                    <p className="text-white/60 mb-4">
                                        {category.description}
                                    </p>

                                    {/* Features */}
                                    <ul className="space-y-2">
                                        {category.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2 text-sm text-white/50">
                                                <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-white/5">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-white/60">
                            Simple process from idea to reality
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-4">
                        {[
                            { step: "01", title: "Share Your Idea", desc: "Tell us what you need or upload your 3D model" },
                            { step: "02", title: "Get a Quote", desc: "We'll review and send you a detailed quote within 24 hours" },
                            { step: "03", title: "We Print", desc: "Your project goes into production with quality checks" },
                            { step: "04", title: "Delivered", desc: "Fast shipping to your doorstep anywhere in India" },
                        ].map((item, index) => (
                            <div key={index} className="text-center">
                                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl font-bold text-white">
                                    {item.step}
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                                <p className="text-sm text-white/60">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black p-12 text-center">
                        {/* Background Glow */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[100px]" />
                        </div>

                        <div className="relative">
                            <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl mb-4">
                                Ready to bring your idea to life?
                            </h2>
                            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
                                Whether it's a one-off prototype or a batch of custom parts, we're here to help.
                                Let's create something amazing together.
                            </p>

                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
                                <Button
                                    asChild
                                    size="lg"
                                    className="group h-14 rounded-full bg-white px-10 text-lg font-semibold text-black transition-all hover:bg-white/90 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                                >
                                    <Link href="/custom-project">
                                        Start a Custom Project
                                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="h-14 rounded-full border-white/20 bg-transparent px-10 text-lg font-semibold text-white hover:bg-white/10"
                                >
                                    <a href="https://wa.me/919483654329" target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="mr-2 h-5 w-5" />
                                        WhatsApp Us
                                    </a>
                                </Button>
                            </div>

                            <p className="mt-6 text-sm text-white/40">
                                Response time: Within 24 hours • Free quotes • Pan-India shipping
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
