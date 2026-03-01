export function Terms() {
    return (
        <div className="bg-base-200 min-h-screen py-12 md:py-20">
            <div className="max-w-4xl mx-auto px-4">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-8">Terms of Service</h1>

                        <div className="prose prose-lg max-w-none text-base-content/80">
                            <p className="text-base-content/60 mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing and using the Spoura website, you accept and agree to be bound by the terms and provision of this agreement.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">2. Description of Service</h2>
                                <p>
                                    Spoura provides an online platform for browsing and purchasing footwear products. By using our service, you agree to use it only for lawful purposes and in accordance with these terms.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">3. User Accounts</h2>
                                <p className="mb-4">When you create an account with us, you must:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Provide accurate and complete information</li>
                                    <li>Maintain the security of your account</li>
                                    <li>Notify us immediately of any unauthorized use</li>
                                    <li>Be responsible for all activities under your account</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">4. Orders and Pricing</h2>
                                <p className="mb-4">By placing an order through our website, you agree to:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Provide valid payment information</li>
                                    <li>Pay all applicable taxes and shipping fees</li>
                                    <li>Accept delivery of your order</li>
                                    <li>Represent that you are of legal age to make purchases</li>
                                </ul>
                                <p className="mt-4">
                                    We reserve the right to refuse or cancel any order for any reason, including pricing errors or product availability.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">5. Product Information</h2>
                                <p>
                                    We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, prices, or other content on our website is accurate, complete, reliable, or error-free. If a product is listed at an incorrect price, we reserve the right to refuse or cancel orders.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">6. Shipping and Returns</h2>
                                <p className="mb-4">Our shipping and return policies include:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Standard delivery within 3-5 business days</li>
                                    <li>Free shipping on orders over £100</li>
                                    <li>30-day return policy for unworn items in original packaging</li>
                                    <li>Return shipping at customer's expense unless item is faulty</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">7. Intellectual Property</h2>
                                <p>
                                    All content on this website, including logos, images, product designs, and text, is the intellectual property of Spoura. You may not reproduce, distribute, or modify any content without our written permission.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">8. Limitation of Liability</h2>
                                <p>
                                    Spoura shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount paid for the product in question.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">9. Governing Law</h2>
                                <p>
                                    These terms shall be governed by and construed in accordance with the laws of the United Kingdom. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the UK courts.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold text-base-content mb-4">10. Contact Information</h2>
                                <p>
                                    For questions about these Terms of Service, please contact us at{' '}
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
