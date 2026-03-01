export function Privacy() {
    return (
        <div className="bg-base-200 min-h-screen py-12 md:py-20">
            <div className="max-w-4xl mx-auto px-4">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-8">Privacy Policy</h1>

                        <div className="prose prose-lg max-w-none text-base-content/80">
                            <p className="text-base-content/60 mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">1. Introduction</h2>
                                <p>
                                    At Spoura, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">2. Information We Collect</h2>
                                <p className="mb-4">We may collect personal information that you voluntarily provide to us when you:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Register on the Website</li>
                                    <li>Place an order</li>
                                    <li>Sign up for our newsletter</li>
                                    <li>Contact us with inquiries</li>
                                </ul>
                                <p className="mt-4">The personal information we collect may include:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Name</li>
                                    <li>Email address</li>
                                    <li>Phone number</li>
                                    <li>Shipping and billing address</li>
                                    <li>Payment information</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">3. How We Use Your Information</h2>
                                <p className="mb-4">We use the information we collect to:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Process and fulfill your orders</li>
                                    <li>Communicate with you about your orders</li>
                                    <li>Send you promotional emails (with your consent)</li>
                                    <li>Improve our website and services</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">4. Information Sharing</h2>
                                <p>
                                    We do not sell, trade, or otherwise transfer your personal information to outside parties except as necessary to fulfill your orders (e.g., shipping companies, payment processors). We may also share information when required by law.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">5. Data Security</h2>
                                <p>
                                    We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">6. Your Rights</h2>
                                <p className="mb-4">You have the right to:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Access your personal information</li>
                                    <li>Correct inaccurate data</li>
                                    <li>Request deletion of your data</li>
                                    <li>Opt-out of marketing communications</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">7. Contact Us</h2>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us at{' '}
                                    <a href="mailto:matthewtlharvey@gmail.com" className="text-primary hover:underline">
                                        matthewtlharvey@gmail.com
                                    </a>
                                </p>
                            </section>
                        </div>

                        <div className="card-actions justify-end mt-8">
                            <a href="/shop" className="btn btn-primary">Continue Shopping</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
