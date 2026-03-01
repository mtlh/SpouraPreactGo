export function Contact () {
    return (
        <div className="bg-base-200 min-h-screen py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-base-content mb-4">Contact Us</h1>
                    <p className="text-base-content/70 max-w-2xl mx-auto text-lg">
                        Have a question about our products or need help with your order? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-2xl font-bold text-base-content mb-6">Send us a Message</h2>
                                <form className="space-y-6" action="https://formspree.io/f/moqbgzlp" method="POST">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="form-control">
                                            <label className="label" htmlFor="name">
                                                <span className="label-text font-medium">Your Name</span>
                                            </label>
                                            <input
                                                className="input input-bordered w-full focus:input-primary"
                                                id="name"
                                                name="name"
                                                placeholder="John Doe"
                                                type="text"
                                                required
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label" htmlFor="email">
                                                <span className="label-text font-medium">Email Address</span>
                                            </label>
                                            <input
                                                className="input input-bordered w-full focus:input-primary"
                                                id="email"
                                                placeholder="you@example.com"
                                                type="email"
                                                name="email"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-control">
                                        <label className="label" htmlFor="subject">
                                            <span className="label-text font-medium">Subject</span>
                                        </label>
                                        <input
                                            className="input input-bordered w-full focus:input-primary"
                                            id="subject"
                                            name="subject"
                                            placeholder="What is this about?"
                                            type="text"
                                        />
                                    </div>
                                    <div className="form-control">
                                        <label className="label" htmlFor="message">
                                            <span className="label-text font-medium">Your Message</span>
                                        </label>
                                        <textarea
                                            className="textarea textarea-bordered h-40 focus:textarea-primary"
                                            id="message"
                                            placeholder="Tell us what's on your mind..."
                                            name="message"
                                            required
                                        />
                                    </div>
                                    <button
                                        className="btn btn-primary w-full md:w-auto"
                                        type="submit"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Cards */}
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-base-content mb-4">Get in Touch</h2>

                                <div className="space-y-4">
                                    {/* Email */}
                                    <div className="flex items-start gap-4">
                                        <div className="btn btn-circle btn-primary btn-sm mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-base-content">Email</p>
                                            <a href="mailto:matthewtlharvey@gmail.com" className="text-base-content/70 hover:text-primary transition-colors">
                                                matthewtlharvey@gmail.com
                                            </a>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-start gap-4">
                                        <div className="btn btn-circle btn-primary btn-sm mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-base-content">Location</p>
                                            <p className="text-base-content/70">Leicester, UK</p>
                                        </div>
                                    </div>

                                    {/* Response Time */}
                                    <div className="flex items-start gap-4">
                                        <div className="btn btn-circle btn-primary btn-sm mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-base-content">Response Time</p>
                                            <p className="text-base-content/70">We usually reply within 24 hours</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Business Hours */}
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold text-base-content mb-4">Business Hours</h2>
                                <div className="space-y-2 text-base-content/80">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span className="font-medium">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span className="font-medium text-error">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Link Card */}
                        <div className="card bg-primary text-primary-content shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title text-xl font-bold">Need Help?</h2>
                                <p className="opacity-90">Check our frequently asked questions for quick answers to common questions.</p>
                                <div className="card-actions justify-end mt-4">
                                    <a href="/about" className="btn btn-secondary">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}