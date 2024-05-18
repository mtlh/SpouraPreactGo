export function About() {
    return (
        <>
            <section className="bg-gradient-to-r from-blue-500 to-blue-900 text-white py-20 px-6 md:px-12">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl m-auto">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">Crafting Comfort, Elevating Style</h1>
                        <p className="text-lg mb-8">
                            At Spoura, we're passionate about creating high-quality shoes that combine unparalleled comfort and
                            timeless design. Our mission is to empower individuals to step confidently, whether they're chasing
                            their dreams or exploring new horizons.
                        </p>
                        <a
                            className="inline-flex items-center bg-white text-blue-900 font-medium py-3 px-6 rounded-md hover:bg-gray-200 transition-colors"
                            href="/shop"
                        >
                            Shop Our Collection
                            <svg className="h-5 w-5 ml-2" fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" viewBox="0 0 330 330"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"></path> </g></svg>
                        </a>
                    </div>
                    <div>
                        <img
                            alt="Hero Thumbnail Shoes"
                            className="rounded-md"
                            height={500}
                            src="https://cdn.oneal.eu/tmp/image-thumbnails/_default_upload_bucket/25032/image-thumb__25032__600x600/2022_ONeal_FLOW%20SPD%20V.22_gray_blue.png"
                            style={{
                                objectFit: "cover",
                            }}
                            width={800} />
                    </div>
                </div>
            </section>
            <section className="py-20 px-6 md:px-12">
                <div className="container mx-auto max-w-7xl m-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <img
                                alt="Story Thumbnail Shoes"
                                className="rounded-md"
                                height={700}
                                src="https://www.si.com/.image/t_share/MTY4MTk2MjczNTMwMDIxNzYx/image-placeholder-title.jpg"
                                style={{
                                    aspectRatio: "700/500",
                                    objectFit: "cover",
                                }}
                                width={700} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-8 text-blue-500">Our Story</h2>
                            <p className="mb-4">
                                Spoura was founded in 2010 with a simple goal: to create shoes that not only look great, but feel
                                amazing to wear. Our team of passionate designers and craftspeople have spent years perfecting the art
                                of shoemaking, blending cutting-edge technology with traditional techniques.
                            </p>
                            <p className="mb-4">
                                Every step you take should be a journey of comfort and confidence. That's why we're
                                committed to using only the finest materials and employing the most skilled artisans to ensure that
                                our shoes exceed your expectations.
                            </p>
                            <p className="mb-4">
                                We're dedicated to sustainability and ethical practices throughout every stage of production. From sourcing materials responsibly to minimizing our carbon footprint, we strive to make a positive impact on both people and the planet.
                            </p>
                            <p>
                                But our journey doesn't end with the creation of exceptional footwear. We're also deeply invested in building a community that shares our values of style, comfort, and sustainability. Inspire and empower conscious choices in everyday lives. Together, we can walk towards a brighter, more sustainable future.
                            </p>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-blue-500 mt-6">Our Aims</h2>
                    <h3 class="font-bold">Dedicated Support</h3>
                    <p className="mb-4">
                        Our customer service team is dedicated to providing you with the best possible experience. Whether you
                        have a question about our products or need assistance with an order, we're here to help you every step
                        of the way.
                    </p>
                    <h3 class="font-bold">Fast, Reliable Shipping</h3>
                    <p className="mb-4">
                        We understand the importance of getting your shoes to you quickly and efficiently. Ensuring your order arrives at your doorstep as soon as possible.
                    </p>
                    <h3 class="font-bold">Exclusive Offers</h3>
                    <p className="mb-4">
                        As a valued customer, you'll have access to exclusive offers, discounts, and special promotions. We're
                        committed to providing you with the best possible value for your money.
                    </p>
                </div>
            </section>
            <section className="bg-gradient-to-r from-blue-500 to-blue-900 text-white py-20 px-6 md:px-12">
                <div className="container mx-auto max-w-7xl m-auto">
                    <h2 className="text-3xl font-bold mb-8">Quality You Can Trust</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <a className="h-8 w-8 text-blue-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Exceptional Materials</h3>
                            <p>
                                We source the finest leathers, fabrics, and materials from around the world to ensure that our shoes
                                are built to last. Every component is carefully selected to provide unparalleled comfort and
                                durability.
                            </p>
                        </div>
                        <div>
                            <a className="h-8 w-8 text-blue-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Meticulous Craftsmanship</h3>
                            <p>
                                Our skilled artisans take great pride in their work, meticulously handcrafting each pair of shoes to
                                the highest standards. From the stitching to the finishing touches, every detail is meticulously
                                executed to perfection.
                            </p>
                        </div>
                        <div>
                            <a className="h-8 w-8 text-blue-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Rigorous Testing</h3>
                            <p>
                                Before any of our shoes hit the market, they undergo rigorous testing to ensure they meet our strict
                                quality and performance standards. We're committed to providing you with footwear that exceeds your
                                expectations.
                            </p>
                        </div>
                        <div>
                            <a className="h-8 w-8 text-blue-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Uncompromising Comfort</h3>
                            <p>
                                Comfort is at the heart of everything we do. Our shoes are designed with advanced cushioning and
                                support systems to keep your feet feeling fresh and energized, no matter where your journey takes you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-gray-100 dark:bg-gray-800 py-12 md:py-24">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8">Meet Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                        <div className="bg-white dark:bg-gray-950 shadow-md p-4 rounded-lg">
                            <img
                                alt="John Doe"
                                height="auto"
                                class="w-full h-60 rounded-lg"
                                src="https://avatars.githubusercontent.com/u/54061093?v=4"
                                style={{
                                    objectFit: "cover",
                                }}
                                width="auto"
                            />
                            <h3 className="text-lg font-bold my-1">Matthew Harvey</h3>
                            <p className="text-gray-500 dark:text-gray-400 my-1">Developer</p>
                            <div class="flex gap-3 my-1">
                                <a class="link link-hover" href="https://github.com/mtlh" target="_blank" rel="noreferrer">Github</a>
                                <a class="link link-hover" href="https://mtlh.dev/" target="_blank" rel="noreferrer">Portfolio</a>
                                <a class="link link-hover" href="https://www.linkedin.com/in/mtlh/" target="_blank" rel="noreferrer">Linkedin</a>
                            </div>
                        </div>
                    </div>
                </div>
                </section>
            </>
    )
}