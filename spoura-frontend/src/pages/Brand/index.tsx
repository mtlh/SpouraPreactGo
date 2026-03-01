import { useLocation } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { LoadingSpinnerCenter } from "../../components/LoadingSpinner";
import ProductReusable from "../../components/Product";

export function Brand () {
	const [brandData, setbrandData] = useState(null);
	const [error, setError] = useState(null);

    const urlslug = useLocation().path.split("/")

	useEffect(() => {
	  fetch('https://spoura-go-api.vercel.app/api/brand/' + urlslug[urlslug.length-1])
		.then(response => {
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  return response.json();
		})
		.then(data => {
            setbrandData(data);
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

	if (!brandData) {
	  return <LoadingSpinnerCenter />
	}

  	return (
	   <>
            {brandData.name ?
                <>
                {/* Hero Section */}
                <div className="hero bg-base-200 min-h-[40vh]">
                    <div className="hero-content flex-col lg:flex-row gap-8 text-center lg:text-left">
                        <div className="flex-shrink-0">
                            <img
                                src={brandData.imgurl}
                                className="w-40 h-40 md:w-56 md:h-56 object-contain rounded-2xl shadow-2xl bg-base-100 p-4"
                                alt={`${brandData.name} Logo`}
                            />
                        </div>
                        <div className="max-w-2xl">
                            <h1 className="text-5xl md:text-7xl font-bold text-base-content">{brandData.name}</h1>
                            {brandData.description && (
                                <p className="py-6 text-lg text-base-content/70">{brandData.description}</p>
                            )}
                            {brandData.Products && (
                                <div className="badge badge-primary badge-lg">{brandData.Products.length} Products</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Collections Section */}
                {brandData.Collection && brandData.Collection.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
                        <h2 className="text-3xl font-bold text-base-content mb-8">Collections</h2>
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
                                                <span className="text-primary font-medium group-hover:translate-x-1 transition-transform">
                                                    Shop Now
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
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-base-content">All Products</h2>
                        <div className="badge badge-lg badge-outline">{brandData.Products?.length || 0} items</div>
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