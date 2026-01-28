import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Refund & Cancellation Policy | Z Axis Studio",
    description: "Our refund and cancellation policy for 3D printed custom goods.",
};

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen bg-black pt-28 pb-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-white mb-8">Refund & Cancellation Policy</h1>

                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-white/80 mb-6">
                        <strong>Effective Date:</strong> January 27, 2026
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Customized Items Policy</h2>
                        <p className="text-white/70 mb-4">
                            <strong className="text-white">IMPORTANT:</strong> Due to the personalized nature of our 3D printed products,
                            <strong className="text-amber-400"> customized items (including but not limited to Lithophanes, Custom Keychains,
                                Personalized Lamps, and any product requiring uploaded files or custom text) CANNOT be returned,
                                refunded, or exchanged unless they arrive damaged or defective.</strong>
                        </p>
                        <p className="text-white/70">
                            By placing an order for customized items, you acknowledge and accept that these products are
                            made-to-order specifically for you and cannot be resold.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Standard (Non-Customized) Items</h2>
                        <p className="text-white/70 mb-4">
                            For standard, ready-made inventory items (lamps, figurines without customization):
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Returns accepted within <strong className="text-white">7 days</strong> of delivery</li>
                            <li>Item must be unused, in original packaging</li>
                            <li>Customer bears return shipping costs unless item is defective</li>
                            <li>Refund processed within 7-10 business days after receiving returned item</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Damaged or Defective Items</h2>
                        <p className="text-white/70 mb-4">
                            If your order arrives damaged or defective, we offer a <strong className="text-white">7-day replacement window</strong>
                            from the date of delivery.
                        </p>
                        <p className="text-white/70 mb-4">
                            <strong className="text-white">To request a replacement or refund for damaged goods:</strong>
                        </p>
                        <ol className="list-decimal list-inside text-white/70 space-y-2 mb-4">
                            <li>Email us at <strong className="text-white">support@zaxisstudio.in</strong> within 7 days of delivery</li>
                            <li>Include your order number in the subject line</li>
                            <li>Provide an <strong className="text-amber-400">unboxing video</strong> showing the damaged/defective item</li>
                            <li>Include clear photos of the damage from multiple angles</li>
                        </ol>
                        <p className="text-white/70">
                            <strong className="text-white">Note:</strong> Unboxing videos are mandatory proof for damage claims.
                            Claims without video evidence cannot be processed.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Order Cancellation</h2>
                        <p className="text-white/70 mb-4">
                            <strong className="text-white">Before Production Starts:</strong>
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Standard items: Can be cancelled within 2 hours of order placement for full refund</li>
                            <li>Custom items: Can be cancelled within 1 hour of order placement for full refund</li>
                        </ul>
                        <p className="text-white/70 mb-4">
                            <strong className="text-white">After Production Starts:</strong>
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Custom items cannot be cancelled once 3D printing has begun</li>
                            <li>Standard items may be cancelled with a 20% restocking fee</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Refund Processing</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Approved refunds processed within 7-10 business days</li>
                            <li>Refunds issued to original payment method</li>
                            <li>For COD orders, refunds via bank transfer (provide account details)</li>
                            <li>Shipping charges are non-refundable unless item is defective</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Non-Refundable Items</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>All customized/personalized products (unless damaged)</li>
                            <li>Digital files or 3D model downloads</li>
                            <li>Gift cards</li>
                            <li>Sale or clearance items (unless defective)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Contact Us</h2>
                        <p className="text-white/70">
                            For any refund or cancellation queries, please contact us at:
                        </p>
                        <ul className="list-none text-white/70 space-y-2 mt-4">
                            <li><strong className="text-white">Email:</strong> support@zaxisstudio.in</li>
                            <li><strong className="text-white">WhatsApp:</strong> +91 XXXXX XXXXX</li>
                            <li><strong className="text-white">Business Hours:</strong> Monday - Saturday, 10 AM - 7 PM IST</li>
                        </ul>
                    </section>

                    <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-lg">
                        <p className="text-white/60 text-sm">
                            Z Axis Studio reserves the right to modify this refund and cancellation policy at any time.
                            Changes will be effective immediately upon posting on our website. Your continued use of our
                            services after changes constitutes acceptance of the modified policy.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
