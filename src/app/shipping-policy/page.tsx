import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shipping Policy | Z Axis Studio",
    description: "Our shipping and delivery policy for 3D printed products.",
};

export default function ShippingPolicyPage() {
    return (
        <main className="min-h-screen bg-black pt-28 pb-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-white mb-8">Shipping Policy</h1>

                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-white/80 mb-6">
                        <strong>Effective Date:</strong> January 27, 2026
                    </p>
                    <p className="text-white/70 mb-6">
                        At Z Axis Studio, we are committed to delivering your custom 3D printed creations safely and on time.
                        This policy outlines our shipping practices.
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Processing Time</h2>

                        <h3 className="text-xl font-semibold text-white mb-3">Standard (Ready-Made) Items:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">Processing Time:</strong> Orders ship within <strong className="text-amber-400">24 hours</strong> of payment confirmation</li>
                            <li>Orders placed after 5 PM IST will be processed the next business day</li>
                            <li>Orders placed on Sundays/holidays will be processed on the next working day</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Custom Items (Lithophanes, Personalized Products):</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">Design & Print Time:</strong> <strong className="text-amber-400">3-4 business days</strong> from file approval</li>
                            <li>Complex designs may require additional time (we'll notify you)</li>
                            <li>File approval typically takes 24 hours after upload</li>
                            <li>Production begins only after you approve the design preview</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Bulk Orders:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Processing time varies based on quantity</li>
                            <li>Estimated timeline provided via email/WhatsApp</li>
                            <li>Typically 5-10 business days for bulk custom orders</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Shipping Carriers</h2>
                        <p className="text-white/70 mb-4">
                            We partner with trusted courier services to ensure safe delivery:
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">DTDC</strong> - For metro cities and major towns</li>
                            <li><strong className="text-white">Delhivery</strong> - For express delivery and remote areas</li>
                            <li><strong className="text-white">India Post (Speed Post)</strong> - For hard-to-reach locations</li>
                        </ul>
                        <p className="text-white/70">
                            The carrier is selected based on your location and order value. You will receive tracking
                            information once your order is shipped.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Delivery Timeline</h2>

                        <h3 className="text-xl font-semibold text-white mb-3">Within Karnataka:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Mangaluru & nearby: 1-2 business days</li>
                            <li>Bangalore, Mysore: 2-3 business days</li>
                            <li>Other cities: 3-5 business days</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Metro Cities (Delhi, Mumbai, Chennai, Kolkata, Hyderabad):</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>3-5 business days</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Other Cities & Towns:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>5-7 business days</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Remote Areas:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>7-10 business days</li>
                        </ul>

                        <p className="text-white/70 mt-4">
                            <strong className="text-white">Note:</strong> Delivery times are estimates and may vary due to
                            courier delays, weather conditions, or local holidays. We are not responsible for delays caused
                            by the courier service.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Shipping Charges</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">Orders above ₹999:</strong> <strong className="text-green-400">FREE Shipping</strong></li>
                            <li><strong className="text-white">Orders below ₹999:</strong> ₹100 shipping fee</li>
                            <li><strong className="text-white">Bulk orders:</strong> Shipping calculated based on weight and destination</li>
                            <li><strong className="text-white">Express delivery:</strong> Available on request (additional charges apply)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Order Tracking</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>You will receive a tracking number via email and SMS once your order ships</li>
                            <li>Track your order on the courier's website using the tracking number</li>
                            <li>For any tracking issues, contact us at support@zaxisstudio.com</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Packaging</h2>
                        <p className="text-white/70 mb-4">
                            We take great care in packaging your orders:
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>All items are wrapped in bubble wrap for protection</li>
                            <li>Fragile items (lithophanes, lamps) are double-boxed</li>
                            <li>Eco-friendly packaging materials used wherever possible</li>
                            <li>Each package is sealed and labeled clearly</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Delivery Attempts</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Courier will make 2-3 delivery attempts</li>
                            <li>Please ensure someone is available to receive the package</li>
                            <li>For COD orders, payment must be made at the time of delivery</li>
                            <li>If delivery fails, the package will be returned to us</li>
                            <li>Return shipping charges will be deducted from refund for failed deliveries</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Undelivered Packages</h2>
                        <p className="text-white/70 mb-4">
                            If a package is returned to us due to:
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">Incorrect address:</strong> Customer must pay reshipping charges</li>
                            <li><strong className="text-white">Refused delivery:</strong> Refund minus shipping charges (both ways)</li>
                            <li><strong className="text-white">Unclaimed package:</strong> Refund minus 20% restocking fee and shipping</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">9. International Shipping</h2>
                        <p className="text-white/70">
                            Currently, we only ship within India. International shipping is not available at this time.
                            We are working to expand our services globally in the future.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">10. Damaged or Lost Packages</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">Damaged in transit:</strong> Contact us within 48 hours with photos/video</li>
                            <li><strong className="text-white">Lost package:</strong> We will file a claim with the courier and arrange replacement/refund</li>
                            <li><strong className="text-white">Unboxing video:</strong> Recommended for high-value orders as proof of damage</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">11. Address Changes</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Address can be changed within 2 hours of order placement</li>
                            <li>Contact us immediately at support@zaxisstudio.com or WhatsApp</li>
                            <li>Once shipped, address cannot be changed</li>
                            <li>Incorrect addresses may result in return charges</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Us</h2>
                        <p className="text-white/70 mb-4">
                            For shipping-related queries:
                        </p>
                        <ul className="list-none text-white/70 space-y-2">
                            <li><strong className="text-white">Email:</strong> support@zaxisstudio.com</li>
                            <li><strong className="text-white">WhatsApp:</strong> +91 94836 54329</li>
                            <li><strong className="text-white">Business Hours:</strong> Monday - Saturday, 10 AM - 7 PM IST</li>
                        </ul>
                    </section>

                    <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-lg">
                        <p className="text-white/60 text-sm">
                            Z Axis Studio reserves the right to modify this shipping policy at any time. Changes will be
                            effective immediately upon posting on our website.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
