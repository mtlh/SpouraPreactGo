export default function ProductReusable({product}) {
    return (
        <div class="group w-full" key={product.id}>
            <a href={"/product/" + product.URLSlug} class="block w-full">
                <div class="card bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 w-full max-w-sm mx-auto">
                    {/* Product Image */}
                    <figure class="relative aspect-[3/4] overflow-hidden">
                        <img
                            src={product.ImgURL}
                            alt={product.Name}
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Category Badge - Top Left */}
                        <div class="absolute top-3 left-3">
                            {product.Type == "m" &&
                                <span class="badge badge-primary">Men's</span>
                            }
                            {product.Type == "k" &&
                                <span class="badge badge-secondary">Kids</span>
                            }
                            {product.Type == "w" &&
                                <span class="badge badge-accent">Women's</span>
                            }
                        </div>

                        {/* Quick View Button - Center on Hover */}
                        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40">
                            <button class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View Details
                            </button>
                        </div>
                    </figure>

                    {/* Product Info */}
                    <div class="card-body p-4">
                        <h3 class="card-title text-base line-clamp-2 text-base-content">
                            {product.Name}
                        </h3>
                        <div class="flex items-center justify-between mt-2">
                            <span class="text-xl font-bold text-primary">£{product.Price}</span>
                            {product.Brand && (
                                <span class="text-sm text-base-content/60">{product.Brand}</span>
                            )}
                        </div>
                    </div>
                </div>
            </a>
        </div>
    )
}