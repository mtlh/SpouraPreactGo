import { useLocation } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { LoadingSpinnerCenter } from "../../components/LoadingSpinner";
import ProductReusable from "../../components/Product";

export function Collection () {
	const [collectionData, setCollectionData] = useState(null);
	const [error, setError] = useState(null);

    const urlslug = useLocation().path.split("/")

	useEffect(() => {
	  fetch('https://spoura-go-api.vercel.app/api/collection/' + urlslug[urlslug.length-1])
		.then(response => {
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  return response.json();
		})
		.then(data => {
            setCollectionData(data);
		})
		.catch(error => {
		    setError(error.message);
		});
	}, []);

	if (error) {
	  return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="card bg-base-100 shadow-xl max-w-md">
                <div className="card-body text-center">
                    <h2 className="card-title justify-center text-error">Error</h2>
                    <p>{error}</p>
                    <div className="card-actions justify-center mt-4">
                        <a href="/" className="btn btn-primary">Go Home</a>
                    </div>
                </div>
            </div>
        </div>
      );
	}

	if (!collectionData) {
	  return <LoadingSpinnerCenter />
	}

	return (
	   <>
            {collectionData.name ?
                <>
                {/* Hero Section with Background */}
                <div
                    className="hero min-h-[40vh] bg-fixed bg-center bg-cover relative"
                    style={{ backgroundImage: `url(${collectionData.imgURL})` }}
                >
                    <div className="hero-overlay bg-neutral/70"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-3xl">
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">{collectionData.name}</h1>
                            {collectionData.products && (
                                <div className="badge badge-primary badge-lg">{collectionData.products.length} Products</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                {collectionData.description && (
                    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12">
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body text-center">
                                <p className="text-lg text-base-content/80">{collectionData.description}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Section */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-base-content">Products</h2>
                        <div className="badge badge-lg badge-outline">{collectionData.products?.length || 0} items</div>
                    </div>

                    {collectionData.products && collectionData.products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {collectionData.products.map(product =>
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
                                <p className="text-base-content/60">Check back later for new arrivals in this collection.</p>
                                <div className="card-actions justify-center mt-6">
                                    <a href="/shop" className="btn btn-primary">Browse All Products</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Back to Shop */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12">
                    <div className="card bg-base-200 shadow-xl">
                        <div className="card-body flex-row items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-lg">Looking for more?</h3>
                                <p className="text-base-content/60">Explore our other collections and brands.</p>
                            </div>
                            <div className="card-actions">
                                <a href="/shop" className="btn btn-primary">Shop All</a>
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