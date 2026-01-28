import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cookie Policy | Z Axis Studio",
    description: "Our cookie policy and how we use cookies on our website.",
};

export default function CookiePolicyPage() {
    return (
        <main className="min-h-screen bg-black pt-28 pb-20">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-white mb-8">Cookie Policy</h1>

                <div className="prose prose-invert prose-lg max-w-none">
                    <p className="text-white/80 mb-6">
                        <strong>Effective Date:</strong> January 27, 2026
                    </p>
                    <p className="text-white/70 mb-6">
                        This Cookie Policy explains how Z Axis Studio ("we", "us", "our") uses cookies and similar
                        technologies on our website.
                    </p>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">1. What Are Cookies?</h2>
                        <p className="text-white/70 mb-4">
                            Cookies are small text files that are stored on your device (computer, tablet, or mobile)
                            when you visit a website. They help the website remember your preferences and improve your
                            browsing experience.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Cookies</h2>
                        <p className="text-white/70 mb-4">
                            We use cookies for the following purposes:
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3">Essential Cookies (Required)</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">Authentication:</strong> To keep you logged in to your account</li>
                            <li><strong className="text-white">Shopping Cart:</strong> To remember items you've added to your cart</li>
                            <li><strong className="text-white">Security:</strong> To protect against fraud and ensure secure transactions</li>
                            <li><strong className="text-white">Session Management:</strong> To maintain your session across pages</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Functional Cookies</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">Preferences:</strong> To remember your language and region settings</li>
                            <li><strong className="text-white">User Experience:</strong> To remember your choices (e.g., display preferences)</li>
                        </ul>

                        <h3 className="text-xl font-semibold text-white mb-3">Analytics Cookies</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">Website Analytics:</strong> To understand how visitors use our site</li>
                            <li><strong className="text-white">Performance Monitoring:</strong> To identify and fix technical issues</li>
                            <li><strong className="text-white">Traffic Analysis:</strong> To improve our website and services</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">3. Types of Cookies We Use</h2>

                        <h3 className="text-xl font-semibold text-white mb-3">Session Cookies</h3>
                        <p className="text-white/70 mb-4">
                            These are temporary cookies that expire when you close your browser. They help us maintain
                            your session as you navigate through our website.
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3">Persistent Cookies</h3>
                        <p className="text-white/70 mb-4">
                            These cookies remain on your device for a set period or until you delete them. They help us
                            remember your preferences for future visits.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">4. Third-Party Cookies</h2>
                        <p className="text-white/70 mb-4">
                            We use services from third-party providers that may set their own cookies:
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">Clerk:</strong> For authentication and user management</li>
                            <li><strong className="text-white">Razorpay:</strong> For secure payment processing</li>
                            <li><strong className="text-white">Google Analytics:</strong> For website analytics (if enabled)</li>
                        </ul>
                        <p className="text-white/70">
                            These third parties have their own privacy policies governing their use of cookies.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">5. Managing Cookies</h2>
                        <p className="text-white/70 mb-4">
                            You can control and manage cookies in several ways:
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3">Browser Settings</h3>
                        <p className="text-white/70 mb-4">
                            Most browsers allow you to:
                        </p>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li>View and delete cookies</li>
                            <li>Block third-party cookies</li>
                            <li>Block cookies from specific websites</li>
                            <li>Block all cookies</li>
                            <li>Delete all cookies when you close your browser</li>
                        </ul>

                        <p className="text-white/70 mb-4">
                            <strong className="text-white">Note:</strong> Blocking or deleting essential cookies may affect
                            the functionality of our website. You may not be able to use certain features like the shopping
                            cart or user account.
                        </p>

                        <h3 className="text-xl font-semibold text-white mb-3">Browser-Specific Instructions</h3>
                        <ul className="list-disc list-inside text-white/70 space-y-2 mb-4">
                            <li><strong className="text-white">Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                            <li><strong className="text-white">Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                            <li><strong className="text-white">Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                            <li><strong className="text-white">Edge:</strong> Settings → Cookies and site permissions</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">6. Do Not Track</h2>
                        <p className="text-white/70">
                            Some browsers have a "Do Not Track" feature that signals to websites that you don't want to
                            be tracked. We respect Do Not Track signals and will not track users who have enabled this feature.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">7. Updates to This Policy</h2>
                        <p className="text-white/70">
                            We may update this Cookie Policy from time to time to reflect changes in our practices or for
                            legal reasons. We will notify you of any significant changes by posting the new policy on this page.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
                        <p className="text-white/70 mb-4">
                            If you have questions about our use of cookies:
                        </p>
                        <ul className="list-none text-white/70 space-y-2">
                            <li><strong className="text-white">Email:</strong> privacy@zaxisstudio.in</li>
                            <li><strong className="text-white">Address:</strong> Z Axis Studio, Mangaluru, Karnataka, India</li>
                        </ul>
                    </section>

                    <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-lg">
                        <p className="text-white/60 text-sm">
                            By continuing to use our website, you consent to our use of cookies as described in this policy.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
