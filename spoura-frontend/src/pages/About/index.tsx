export function About() {
    return (
        <>
            {/* Hero Section */}
            <section className="hero bg-base-200 min-h-[60vh]">
                <div className="hero-content flex-col lg:flex-row gap-12 max-w-7xl">
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-6xl font-bold text-base-content">Crafting Comfort, Elevating Style</h1>
                        <p className="py-6 text-lg text-base-content/70">
                            At Spoura, we're passionate about creating high-quality shoes that combine unparalleled comfort and
                            timeless design. Our mission is to empower individuals to step confidently, whether they're chasing
                            their dreams or exploring new horizons.
                        </p>
                        <a
                            className="btn btn-primary"
                            href="/shop"
                        >
                            Shop Our Collection
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>
                    <div className="flex-1">
                        <img
                            alt="Hero Thumbnail Shoes"
                            className="rounded-2xl shadow-2xl w-full max-w-md"
                            src="https://cdn.oneal.eu/tmp/image-thumbnails/_default_upload_bucket/25032/image-thumb__25032__600x600/2022_ONeal_FLOW%20SPD%20V.22_gray_blue.png"
                        />
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 md:py-24 bg-base-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                alt="Story Thumbnail Shoes"
                                className="rounded-2xl shadow-xl w-full"
                                src="https://www.si.com/.image/t_share/MTY4MTk2MjczNTMwMDIxNzYx/image-placeholder-title.jpg"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">Our Story</h2>
                            <div className="space-y-4 text-base-content/80">
                                <p>
                                    Spoura was founded in 2010 with a simple goal: to create shoes that not only look great, but feel
                                    amazing to wear. Our team of passionate designers and craftspeople have spent years perfecting the art
                                    of shoemaking, blending cutting-edge technology with traditional techniques.
                                </p>
                                <p>
                                    Every step you take should be a journey of comfort and confidence. That's why we're
                                    committed to using only the finest materials and employing the most skilled artisans to ensure that
                                    our shoes exceed your expectations.
                                </p>
                                <p>
                                    We're dedicated to sustainability and ethical practices throughout every stage of production. From sourcing materials responsibly to minimizing our carbon footprint, we strive to make a positive impact on both people and the planet.
                                </p>
                                <p>
                                    But our journey doesn't end with the creation of exceptional footwear. We're also deeply invested in building a community that shares our values of style, comfort, and sustainability. Together, we can walk towards a brighter, more sustainable future.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Aims Section */}
            <section className="py-16 md:py-24 bg-base-200">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-base-content text-center mb-12">Our Aims</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Dedicated Support */}
                        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                            <div className="card-body">
                                <div className="btn btn-circle btn-primary mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <h3 className="card-title text-xl font-bold mb-2">Dedicated Support</h3>
                                <p className="text-base-content/70">
                                    Our customer service team is dedicated to providing you with the best possible experience. Whether you
                                    have a question about our products or need assistance with an order, we're here to help you every step
                                    of the way.
                                </p>
                            </div>
                        </div>
                        {/* Fast, Reliable Shipping */}
                        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                            <div className="card-body">
                                <div className="btn btn-circle btn-primary mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                                    </svg>
                                </div>
                                <h3 className="card-title text-xl font-bold mb-2">Fast, Reliable Shipping</h3>
                                <p className="text-base-content/70">
                                    We understand the importance of getting your shoes to you quickly and efficiently. Ensuring your order arrives at your doorstep as soon as possible.
                                </p>
                            </div>
                        </div>
                        {/* Exclusive Offers */}
                        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                            <div className="card-body">
                                <div className="btn btn-circle btn-primary mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <h3 className="card-title text-xl font-bold mb-2">Exclusive Offers</h3>
                                <p className="text-base-content/70">
                                    As a valued customer, you'll have access to exclusive offers, discounts, and special promotions. We're
                                    committed to providing you with the best possible value for your money.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quality Section */}
            <section className="py-16 md:py-24 bg-primary text-primary-content">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Quality You Can Trust</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Exceptional Materials */}
                        <div className="text-center">
                            <div className="btn btn-circle btn-secondary btn-lg mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Exceptional Materials</h3>
                            <p className="opacity-90">
                                We source the finest leathers, fabrics, and materials from around the world.
                            </p>
                        </div>
                        {/* Meticulous Craftsmanship */}
                        <div className="text-center">
                            <div className="btn btn-circle btn-secondary btn-lg mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Meticulous Craftsmanship</h3>
                            <p className="opacity-90">
                                Our skilled artisans meticulously handcraft each pair to perfection.
                            </p>
                        </div>
                        {/* Rigorous Testing */}
                        <div className="text-center">
                            <div className="btn btn-circle btn-secondary btn-lg mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Rigorous Testing</h3>
                            <p className="opacity-90">
                                Every shoe undergoes rigorous testing before reaching your feet.
                            </p>
                        </div>
                        {/* Uncompromising Comfort */}
                        <div className="text-center">
                            <div className="btn btn-circle btn-secondary btn-lg mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Uncompromising Comfort</h3>
                            <p className="opacity-90">
                                Advanced cushioning keeps your feet fresh all day long.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-base-200">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="stat">
                            <div className="stat-title">Founded</div>
                            <div className="stat-value text-primary">2010</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Products</div>
                            <div className="stat-value text-primary">100+</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Happy Customers</div>
                            <div className="stat-value text-primary">10k+</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">Countries</div>
                            <div className="stat-value text-primary">20+</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Our Team Section */}
            <section className="py-16 md:py-24 bg-base-100">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-base-content text-center mb-12">Meet Our Team</h2>
                    <div className="flex justify-center">
                        <div className="card bg-base-200 shadow-xl max-w-sm hover:shadow-2xl transition-shadow">
                            <figure className="pt-6 px-6">
                                <img
                                    alt="Matthew Harvey Profile"
                                    className="w-48 h-48 rounded-full object-cover ring-4 ring-primary"
                                    src="https://avatars.githubusercontent.com/u/54061093?v=4"
                                />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h3 className="card-title text-xl font-bold">Matthew Harvey</h3>
                                <p className="text-primary font-medium">Developer</p>
                                <p className="text-base-content/60 mt-2">
                                    Passionate developer building exceptional digital experiences.
                                </p>
                                <div className="flex gap-4 mt-4">
                                    <a className="btn btn-circle btn-ghost" href="https://github.com/mtlh" target="_blank" rel="noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                    <a className="btn btn-circle btn-ghost" href="https://mtlh.vercel.app/" target="_blank" rel="noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                        </svg>
                                    </a>
                                    <a className="btn btn-circle btn-ghost" href="https://www.linkedin.com/in/mtlh/" target="_blank" rel="noreferrer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-base-200">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-base-content mb-4">Ready to Step Into Comfort?</h2>
                    <p className="text-base-content/70 mb-8 text-lg">
                        Explore our collection of premium footwear and find your perfect pair today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/shop" className="btn btn-primary btn-lg">Shop Now</a>
                        <a href="/contact" className="btn btn-outline btn-lg">Contact Us</a>
                    </div>
                </div>
            </section>
        </>
    )
}