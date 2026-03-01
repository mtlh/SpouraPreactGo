import { useLocation } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import ProductReusable from "../../components/Product";
import { ProductGridSkeleton, ErrorFallback } from "../../components/Skeleton";
import { API_ENDPOINTS } from "../../utils/api";

export function Collection () {
	const [collectionData, setCollectionData] = useState(null);
	const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    const urlslug = location.path.split("/")[location.path.split("/").length - 1];

    useEffect(() => {
        setIsLoading(true);
        setCollectionData(null);

        fetch(API_ENDPOINTS.collection(urlslug))
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setCollectionData(data);
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

	if (isLoading || !collectionData) {
	  return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <ProductGridSkeleton count={8} />
        </div>
    );
	}

    // Get brand info from first product if available
    const brandName = collectionData.products?.[0]?.Brand || '';

	return (
	   <>
            {collectionData.name ?
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
                            {/* Collection Image */}
                            <div className="flex-shrink-0">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl transform rotate-3"></div>
                                    <img
                                        src={collectionData.imgURL}
                                        alt={collectionData.name}
                                        className="relative w-56 h-56 md:w-72 md:h-72 object-cover rounded-2xl shadow-2xl border-4 border-white/30"
                                    />
                                </div>
                            </div>

                            {/* Collection Info */}
                            <div className="text-center lg:text-left flex-1">
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <span className="text-white font-medium">Collection</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                                    {collectionData.name}
                                </h1>
                                {collectionData.description && (
                                    <p className="text-lg text-blue-100 max-w-xl mb-6">
                                        {collectionData.description}
                                    </p>
                                )}
                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                    <span className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-lg shadow-lg">
                                        {collectionData.products?.length || 0} Products
                                    </span>
                                    {brandName && (
                                        <a
                                            href={`/brand/${brandName.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30 transition-colors"
                                        >
                                            Shop {brandName}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products Section */}
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-base-content">All Products</h2>
                            <p className="text-base-content/60 mt-1">Browse our selection</p>
                        </div>
                    </div>

                    {collectionData.products && collectionData.products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {collectionData.products.map(product =>
                                <ProductReusable key={product.id || product.URLSlug} product={product} />
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                            <h3 className="text-xl font-semibold text-base-content mb-2">No Products Available</h3>
                            <p className="text-base-content/60 mb-6">Check back later for new arrivals.</p>
                            <a href="/shop" className="btn bg-gradient-to-r from-blue-500 to-blue-700 text-white border-0">
                                Browse All Products
                            </a>
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
                                    <p className="text-blue-100">Explore our other collections and brands.</p>
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
                            <h2 className="card-title justify-center">Collection Not Found</h2>
                            <p className="text-base-content/70">The collection you're looking for doesn't exist.</p>
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
