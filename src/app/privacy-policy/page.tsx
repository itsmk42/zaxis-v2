import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Z Axis Studio",
    description: "Our privacy policy and data protection practices.",
};

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-black pt-28 pb-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-white/80 mb-6">
                        <strong>Effective Date:</strong> January 27, 2026
                    </p>
                    <p className="text-white/70 mb-6">
                        Z Axis Studio ("we", "us", "our") is committed to protecting your privacy. This Privacy Policy
                        explains how we collect, use, disclose, and safeguard your information when you visit our website
                        and use our services, in compliance with the Information Technology Act, 2000 and applicable Indian laws.
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                        <p className="text-white/70 mb-4">
                            We collect the following types of information:
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3">Personal Information:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">Name:</strong> To personalize your experience and for order processing</li>
                            <li><strong className="text-white">Email Address:</strong> For order confirmations, updates, and customer support</li>
                            <li><strong className="text-white">Phone Number:</strong> For delivery coordination and customer support</li>
                            <li><strong className="text-white">Shipping Address:</strong> To deliver your orders</li>
                            <li><strong className="text-white">Billing Address:</strong> For payment processing and GST compliance</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Uploaded Files:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>3D model files (.stl, .obj) for custom printing</li>
                            <li>Images for lithophanes and custom designs</li>
                            <li>Reference photos for custom projects</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Payment Information:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>UPI transaction IDs (for verification)</li>
                            <li>Payment method preferences</li>
                            <li><strong className="text-white">Note:</strong> We do NOT store credit/debit card details. All card payments are processed securely through Razorpay.</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Automatically Collected Information:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>IP address and browser type</li>
                            <li>Device information</li>
                            <li>Pages visited and time spent on site</li>
                            <li>Referring website</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Process and fulfill your orders</li>
                            <li>Send order confirmations and shipping updates</li>
                            <li>Provide customer support</li>
                            <li>Process payments and prevent fraud</li>
                            <li>Improve our website and services</li>
                            <li>Send promotional emails (with your consent)</li>
                            <li>Comply with legal obligations and GST requirements</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing and Disclosure</h2>
                        <p className="text-white/70 mb-4">
                            We share your information with the following third parties:
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3">Payment Gateway:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">Razorpay:</strong> For secure payment processing. They have their own privacy policy governing the use of your payment information.</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Delivery Partners:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">DTDC, Delhivery, Speed Post:</strong> We share your name, phone number, and shipping address to facilitate delivery of your orders.</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Email Service Provider:</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">Resend:</strong> For sending order confirmations and transactional emails.</li>
                        </ul>

                        <p className="text-white/70 mb-4">
                            <strong className="text-white">We do NOT:</strong>
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Sell your personal information to third parties</li>
                            <li>Share your uploaded files with anyone except for order fulfillment</li>
                            <li>Use your data for purposes other than those stated in this policy</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
                        <p className="text-white/70 mb-4">
                            We implement appropriate technical and organizational security measures to protect your personal information:
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>SSL encryption for data transmission</li>
                            <li>Secure cloud storage for uploaded files</li>
                            <li>Access controls and authentication</li>
                            <li>Regular security audits</li>
                        </ul>
                        <p className="text-white/70">
                            However, no method of transmission over the internet is 100% secure. While we strive to protect
                            your information, we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Data Retention</h2>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Order information: Retained for 7 years for GST compliance</li>
                            <li>Uploaded files: Retained for 90 days after order completion, then deleted</li>
                            <li>Account information: Retained until you request deletion</li>
                            <li>Marketing communications: Until you unsubscribe</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights</h2>
                        <p className="text-white/70 mb-4">
                            Under Indian law, you have the right to:
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Access your personal information</li>
                            <li>Correct inaccurate information</li>
                            <li>Request deletion of your data (subject to legal obligations)</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Withdraw consent for data processing</li>
                        </ul>
                        <p className="text-white/70">
                            To exercise these rights, contact us at <strong className="text-white">privacy@zaxisstudio.in</strong>
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies</h2>
                        <p className="text-white/70 mb-4">
                            We use cookies and similar technologies to:
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>Remember your preferences</li>
                            <li>Maintain your shopping cart</li>
                            <li>Analyze website traffic</li>
                            <li>Improve user experience</li>
                        </ul>
                        <p className="text-white/70">
                            You can control cookies through your browser settings.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Children's Privacy</h2>
                        <p className="text-white/70">
                            Our services are not intended for children under 18. We do not knowingly collect personal
                            information from children. If you believe we have collected information from a child, please
                            contact us immediately.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">9. Changes to This Policy</h2>
                        <p className="text-white/70">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by
                            posting the new policy on this page and updating the "Effective Date."
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">10. Contact Us</h2>
                        <p className="text-white/70 mb-4">
                            For questions about this Privacy Policy or our data practices:
                        </p>
                        <ul className="list-none text-white/70 space-y-2">
                            <li><strong className="text-white">Email:</strong> privacy@zaxisstudio.in</li>
                            <li><strong className="text-white">Address:</strong> Z Axis Studio, Mangaluru, Karnataka, India</li>
                            <li><strong className="text-white">Phone:</strong> +91 XXXXX XXXXX</li>
                        </ul>
                    </section>

                    <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-lg">
                        <p className="text-white/60 text-sm">
                            This Privacy Policy is governed by the Information Technology Act, 2000 and the Information
                            Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or
                            Information) Rules, 2011.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
