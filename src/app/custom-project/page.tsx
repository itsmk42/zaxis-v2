import { Metadata } from "next";
import { CustomProjectForm } from "@/components/forms/custom-project-form";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Start Custom Project | Z Axis Studio",
    description: "Upload a 3D model or reference photo and get a custom quote for your unique 3D printing project.",
};

export default function CustomProjectPage() {
    return (
        <main className="min-h-screen bg-black pt-28 pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                        Bring Your Ideas to Life
                    </h1>
                    <p className="mt-4 text-lg text-white/60 md:text-xl">
                        Upload a 3D model (.stl) or a reference photo, and we will quote you a price.
                    </p>
                </div>

                {/* Two-Column Layout */}
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Left: How it Works */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white md:text-3xl">How It Works</h2>
                            <p className="mt-2 text-white/60">
                                Get your custom 3D printed project in 4 simple steps
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Step 1 */}
                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xl font-bold text-white">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Describe Your Idea</h3>
                                    <p className="mt-1 text-sm text-white/60">
                                        Tell us what you want to create - size, color, and any special requirements.
                                    </p>
                                </div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xl font-bold text-white">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Upload Your File</h3>
                                    <p className="mt-1 text-sm text-white/60">
                                        Share your 3D model (.stl, .obj) or reference images to help us understand your vision.
                                    </p>
                                </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xl font-bold text-white">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Get Your Quote</h3>
                                    <p className="mt-1 text-sm text-white/60">
                                        We'll review your project and send you a detailed quote via WhatsApp within 24 hours.
                                    </p>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xl font-bold text-white">
                                    4
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">We Print & Deliver</h3>
                                    <p className="mt-1 text-sm text-white/60">
                                        Once approved, we'll 3D print your project with precision and deliver it to your doorstep.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">500+</p>
                                <p className="text-xs text-white/60">Projects Done</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">24h</p>
                                <p className="text-xs text-white/60">Quote Time</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-white">4.9★</p>
                                <p className="text-xs text-white/60">Rating</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Request Form */}
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                        <h2 className="mb-6 text-2xl font-bold text-white">Request Your Quote</h2>
                        <CustomProjectForm />
                    </div>
                </div>
            </div>
        </main>
    );
}
