import "./styles.css"
import homeBanner from "../../assets/home_banner.jpg"
import brandImage from "../../assets/brands.png"
import { useEffect, useState } from "preact/hooks";
import ProductReusable from "../../components/Product";
import { ErrorFallback, ProductCardSkeleton } from "../../components/Skeleton";
import { API_ENDPOINTS } from "../../utils/api";

const FeaturedDataComponent = () => {
	const [featuredData, setFeaturedData] = useState<any[] | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
	  fetch(API_ENDPOINTS.featured)
		.then(response => {
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  return response.json();
		})
		.then(data => {
		  setFeaturedData(data);
		})
		.catch(err => {
		  setError(err.message);
		});
	}, []);

	if (error) {
	  return <ErrorFallback message={error} />;
	}

	if (featuredData === null) {
	  return (
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
		  <ProductCardSkeleton />
		  <ProductCardSkeleton />
		  <ProductCardSkeleton />
		</div>
	  );
	}

	return (
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
			{featuredData.map((product: any) => (
				<ProductReusable key={product.id} product={product} />
			))}
		</div>
	);
  };

export function Home() {
	return (
		<>
			{/* Hero Section */}
			<div class="hero bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${homeBanner})`, minHeight: '100vh' }}>
				<div class="hero-content grid grid-cols-1 md:grid-cols-2 lg:flex-row-reverse">
					<div class="p-10 ml-2 rounded-3xl bg-white/2 backdrop-blur-md border border-white/20 relative flex flex-col justify-between min-h-[400px]">
						<div>
							<h1 class="mb-5 text-5xl font-bold">Welcome to <em class="font-extrabold text-transparent text-7xl md:text-9xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">SPOURA</em></h1>
							<p class="mb-5 text-3xl">Selling the best shoes by the biggest brands since 2013.</p>
						</div>
						<div class="flex items-center justify-between">
							<img class="w-48 h-auto opacity-80 hover:opacity-100 transition-opacity" src={brandImage} alt="Puma Adidas Nike" />
							<a class="btn bg-gradient-to-r from-blue-500 to-blue-900 border-0 rounded-lg hover:scale-110 text-white" href="/shop">All Products</a>
						</div>
					</div>
					<div />
				</div>
			</div>

			{/* Featured Section */}
			<div class="py-16 bg-gradient-to-b from-gray-50 to-white">
				<div class="max-w-7xl mx-auto px-4">
					<div class="text-center mb-10">
						<h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 mb-3">
							Featured
						</h2>
						<p class="text-gray-500">Handpicked just for you</p>
					</div>
					<FeaturedDataComponent />
				</div>
			</div>

			{/* Brands Section */}
			<div class="grid grid-cols-4 items-center w-full h-full text-center justify-center">
				<a href="/brand/nike">
					<div class="card-zoom">
						<div class="card-zoom-image nike"></div>
						<h1 class="card-zoom-text">NIKE</h1>
					</div>
				</a>
				<a href="/brand/adidas">
					<div class="card-zoom">
						<div class="card-zoom-image adidas"></div>
						<h1 class="card-zoom-text">ADIDAS</h1>
					</div>
				</a>
				<a href="/brand/puma">
					<div class="card-zoom">
						<div class="card-zoom-image puma"></div>
						<h1 class="card-zoom-text">PUMA</h1>
					</div>
				</a>
				<a href="/brand/under-armour">
					<div class="card-zoom">
					<div class="card-zoom-image under"></div>
					<h1 class="card-zoom-text">UNDER ARMOUR</h1>
					</div>
				</a>
			</div>

			{/* New Arrivals - Text left, Image right */}
			<div class="py-20 bg-white">
				<div class="max-w-7xl mx-auto px-4">
					<div class="flex flex-col lg:flex-row gap-8 items-center">
						{/* Text Side - Left (order-1 on desktop) */}
						<div class="flex-1 text-center lg:text-left w-full lg:order-1">
							<h2 class="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 mb-4">
								New Arrivals
							</h2>
							<p class="text-gray-500 text-lg mb-6">Fresh styles just dropped. Be the first to rock the latest drops.</p>
							<a href="/shop" class="inline-block bg-gradient-to-r from-blue-500 to-blue-900 text-white px-8 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity">
								Shop Now
							</a>
						</div>
						{/* Image Side - Right (order-2 on desktop) */}
						<div class="flex-1 w-full relative rounded-3xl overflow-hidden h-80 md:h-96 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 lg:order-2" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80")' }}>
							<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
							<div class="absolute bottom-6 right-6">
								<span class="inline-block bg-white/90 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm">Just Dropped</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Best Sellers - Image left, Text right */}
			<div class="py-20 bg-gradient-to-b from-gray-50 to-blue-50">
				<div class="max-w-7xl mx-auto px-4">
					<div class="flex flex-col lg:flex-row gap-8 items-center">
						{/* Image Side - Left (order-1 on desktop) - swapped position */}
						<div class="flex-1 w-full relative rounded-3xl overflow-hidden h-80 md:h-96 shadow-2xl transform hover:scale-[1.02] transition-transform duration-300 lg:order-1" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80")' }}>
							<div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
							<div class="absolute top-6 left-6">
								<span class="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-bold text-sm">#1 Seller</span>
							</div>
						</div>
						{/* Text Side - Right (order-2 on desktop) */}
						<div class="flex-1 text-center lg:text-right w-full lg:order-2">
							<h2 class="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 mb-4">
								Best Sellers
							</h2>
							<p class="text-gray-500 text-lg mb-6">The most popular picks from our customers.</p>
							<a href="/shop" class="inline-block bg-gradient-to-r from-blue-500 to-blue-900 text-white px-8 py-3 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity">
								Shop Now
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
