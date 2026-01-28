import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service | Z Axis Studio",
    description: "Terms and conditions for using Z Axis Studio services.",
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-black pt-28 pb-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>

                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-white/80 mb-6">
                        <strong>Effective Date:</strong> January 27, 2026
                    </p>
                    <p className="text-white/70 mb-6">
                        Welcome to Z Axis Studio. By accessing our website and using our services, you agree to be bound
                        by these Terms of Service. Please read them carefully.
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">1. About Z Axis Studio</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">Business Name:</strong> Z Axis Studio</li>
                            <li><strong className="text-white">Location:</strong> Mangaluru, Karnataka, India</li>
                            <li><strong className="text-white">Services:</strong> Custom 3D printing, lithophanes, personalized lamps, keychains, and related products</li>
                            <li><strong className="text-white">GSTIN:</strong> [Your GSTIN Number]</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">2. Acceptance of Terms</h2>
                        <p className="text-white/70">
                            By placing an order, creating an account, or using our website, you acknowledge that you have
                            read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Eligibility</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>You must be at least 18 years old to use our services</li>
                            <li>You must provide accurate and complete information</li>
                            <li>You are responsible for maintaining the confidentiality of your account</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Products and Services</h2>

                        <h3 className="text-xl font-semibold text-white mb-3">Standard Products:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Ready-made 3D printed items available for immediate purchase</li>
                            <li>Prices displayed are inclusive of GST</li>
                            <li>Product images are for reference; actual products may vary slightly</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Custom Products:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Require customer-provided files or specifications</li>
                            <li>Production begins only after file approval</li>
                            <li>Cannot be cancelled once production starts</li>
                            <li>Final product appearance depends on file quality provided</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Pricing and Payment</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>All prices are in Indian Rupees (INR) and inclusive of GST</li>
                            <li>We reserve the right to change prices without prior notice</li>
                            <li>Payment methods: UPI, Cash on Delivery (COD), Credit/Debit Cards via Razorpay</li>
                            <li>For COD orders, payment must be made at the time of delivery</li>
                            <li>For UPI orders, payment verification is required before shipping</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Order Processing</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Order confirmation does not guarantee acceptance</li>
                            <li>We reserve the right to refuse or cancel any order</li>
                            <li>Reasons for cancellation may include: product unavailability, pricing errors, or fraudulent transactions</li>
                            <li>You will be notified if your order is cancelled</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Intellectual Property</h2>

                        <h3 className="text-xl font-semibold text-white mb-3">Your Content:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>You retain ownership of files you upload</li>
                            <li>You grant us a license to use uploaded files solely for order fulfillment</li>
                            <li>You warrant that you have the right to use uploaded content</li>
                            <li>You are responsible for ensuring uploaded content doesn't infringe third-party rights</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Our Content:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>All website content, designs, and logos are owned by Z Axis Studio</li>
                            <li>You may not reproduce, distribute, or create derivative works without permission</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Prohibited Uses</h2>
                        <p className="text-white/70 mb-4">You agree NOT to:</p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Upload illegal, offensive, or copyrighted content</li>
                            <li>Use our services for any unlawful purpose</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Interfere with the proper functioning of our website</li>
                            <li>Impersonate any person or entity</li>
                            <li>Upload content containing weapons, violence, or adult material</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>We are not liable for delays caused by courier services</li>
                            <li>We are not responsible for color variations due to monitor settings</li>
                            <li>Custom products are made based on files provided; we are not liable for file quality issues</li>
                            <li>Our total liability is limited to the order value</li>
                            <li>We are not liable for indirect, incidental, or consequential damages</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">10. Indemnification</h2>
                        <p className="text-white/70">
                            You agree to indemnify and hold Z Axis Studio harmless from any claims, damages, or expenses
                            arising from your use of our services, violation of these terms, or infringement of third-party rights.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">11. Governing Law and Jurisdiction</h2>
                        <p className="text-white/70 mb-4">
                            <strong className="text-amber-400">These Terms of Service are governed by the laws of India.</strong>
                        </p>
                        <p className="text-white/70 mb-4">
                            <strong className="text-white">Jurisdiction:</strong> Any disputes arising from these terms or your use
                            of our services shall be subject to the exclusive jurisdiction of the courts in
                            <strong className="text-amber-400"> Mangaluru, Karnataka, India</strong>.
                        </p>
                        <p className="text-white/70">
                            By using our services, you consent to the jurisdiction and venue of these courts.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">12. Dispute Resolution</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>We encourage resolving disputes amicably through direct communication</li>
                            <li>Contact us at support@zaxisstudio.com for any concerns</li>
                            <li>If unresolved, disputes will be settled through arbitration in Mangaluru</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">13. Modifications to Terms</h2>
                        <p className="text-white/70">
                            We reserve the right to modify these Terms of Service at any time. Changes will be effective
                            immediately upon posting. Your continued use of our services constitutes acceptance of modified terms.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">14. Severability</h2>
                        <p className="text-white/70">
                            If any provision of these terms is found to be unenforceable, the remaining provisions will
                            continue in full force and effect.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">15. Contact Information</h2>
                        <p className="text-white/70 mb-4">
                            For questions about these Terms of Service:
                        </p>
                        <ul className="list-none text-white/70 space-y-2">
                            <li><strong className="text-white">Email:</strong> legal@zaxisstudio.com</li>
                            <li><strong className="text-white">Address:</strong> Z Axis Studio, Mangaluru, Karnataka, India</li>
                            <li><strong className="text-white">Phone:</strong> +91 94836 54329</li>
                        </ul>
                    </section>

                    <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-lg">
                        <p className="text-white/60 text-sm">
                            By using Z Axis Studio's services, you acknowledge that you have read, understood, and agree
                            to be bound by these Terms of Service.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
