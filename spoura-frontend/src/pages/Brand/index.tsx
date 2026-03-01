import { useLocation } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import ProductReusable from "../../components/Product";
import { ProductGridSkeleton, ErrorFallback } from "../../components/Skeleton";
import { API_ENDPOINTS } from "../../utils/api";

export function Brand () {
	const [brandData, setbrandData] = useState(null);
	const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const urlslug = location.path.split("/")[location.path.split("/").length - 1];

    useEffect(() => {
        setIsLoading(true);
        setbrandData(null);

        fetch(API_ENDPOINTS.brand(urlslug))
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setbrandData(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, [urlslug]);

	if (error) {
	  return <ErrorFallback message={error} />;
	}

	if (isLoading || !brandData) {
	  return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <ProductGridSkeleton count={8} />
        </div>
    );
	}

  	return (
	   <>
            {brandData.name ?
                <>
                {/* Hero Banner */}
                <div className="relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700">
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
                        </div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
                        <div className="flex flex-col lg:flex-row gap-10 items-center">
                            {/* Brand Logo/Image */}
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl transform rotate-3"></div>
                                    <img
                                        src={brandData.imgurl}
                                        alt={`${brandData.name} Logo`}
                                        className="relative w-40 h-40 md:w-56 md:h-56 object-contain rounded-2xl shadow-2xl bg-white p-6"
                                    />
                                </div>
                            </div>

                            {/* Brand Info */}
                            <div className="text-center lg:text-left flex-1">
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                    <span className="text-white font-medium">Brand</span>
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{brandData.name}</h1>
                                {brandData.description && (
                                    <p className="text-lg text-blue-100 max-w-xl mb-6">{brandData.description}</p>
                                )}
                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                    <span className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
                                        {brandData.Products?.length || 0} Products
                                    </span>
                                    {brandData.Collection && brandData.Collection.length > 0 && (
                                        <span className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium">
                                            {brandData.Collection.length} Collections
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Collections Section */}
                {brandData.Collection && brandData.Collection.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-base-content">Collections</h2>
                                <p className="text-base-content/60 mt-1">Explore our collections</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {brandData.Collection.map(collection =>
                                <a href={`/collection/${collection.urlslug}`} className="group">
                                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                                        <figure className="h-48 overflow-hidden">
                                            <img
                                                src={collection.imgURL}
                                                alt={collection.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </figure>
                                        <div className="card-body">
                                            <h3 className="card-title text-xl">{collection.name}</h3>
                                            <div className="card-actions justify-end mt-2">
                                                <span className="text-primary font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                                                    Shop Now
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>
                )}

                {/* Products Section */}
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-base-content">All Products</h2>
                            <p className="text-base-content/60 mt-1">Browse our selection</p>
                        </div>
                    </div>

                    {brandData.Products && brandData.Products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {brandData.Products.map(product =>
                                <ProductReusable product={product} />
                            )}
                        </div>
                    ) : (
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body text-center py-16">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-base-content/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <h3 className="text-xl font-semibold mt-4">No Products Available</h3>
                                <p className="text-base-content/60">Check back later for new arrivals from {brandData.name}.</p>
                                <div className="card-actions justify-center mt-6">
                                    <a href="/shop" className="btn btn-primary">Browse All Products</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <div className="bg-base-200">
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <div className="card bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl">
                            <div className="card-body flex-row items-center justify-between gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold mb-2">Looking for more?</h3>
                                    <p className="text-blue-100">Explore our other brands and collections.</p>
                                </div>
                                <a href="/shop" className="btn bg-white text-blue-700 border-0 hover:bg-blue-50 shrink-0">
                                    Shop All
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                </>
                :
                <div className="min-h-screen flex items-center justify-center">
                    <div className="card bg-base-100 shadow-xl max-w-md">
                        <div className="card-body text-center">
                            <h2 className="card-title justify-center">Brand Not Found</h2>
                            <p className="text-base-content/70">The brand you're looking for doesn't exist.</p>
                            <div className="card-actions justify-center mt-4">
                                <a href="/shop" className="btn btn-primary">Browse Shop</a>
                            </div>
                        </div>
                    </div>
                </div>
            }
		</>
	);
};
