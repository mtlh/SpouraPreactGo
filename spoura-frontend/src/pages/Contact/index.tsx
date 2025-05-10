export function Contact () {
    return (
        <div className="bg-white py-12 md:py-20 max-w-7xl m-auto">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <div className="space-y-6 col-span-2">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Get in Touch</h1>
                    <p className="text-gray-500 max-w-md">
                    Have a question or want to work together? Fill out the form below and we'll get back to you as soon as
                    possible.
                    </p>
                    <form className="space-y-4" action="https://formspree.io/f/moqbgzlp" method="POST">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            type="text"
                        />
                        </div>
                        <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                            id="email"
                            placeholder="Enter your email"
                            type="email"
                            name="email"
                        />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="message">
                        Message
                        </label>
                        <textarea
                        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                        id="message"
                        placeholder="Enter your message"
                        rows={4}
                        name="message"
                        />
                    </div>
                    <button
                        className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        type="submit"
                    >
                        Submit
                    </button>
                    </form>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Contact Information</h2>
                    <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                        <svg
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            />
                            <path
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            />
                        </svg>
                        <span className="text-gray-500">Leicester</span>
                        </div>
                        <div className="flex items-center space-x-2">
                        <svg
                            className="h-5 w-5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            />
                        </svg>
                        <span className="text-gray-500 hover:underline hover:cursor-pointer" href="mailto:matthewtlharvey@gmail.com">matthewtlharvey@gmail.com</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}