import "./styles.css"
import homeBanner from "../../assets/home_banner.jpg"
import brandImage from "../../assets/brands.png"
import { useEffect, useState } from "preact/hooks";
import ProductReusable from "../../components/Product";

const FeaturedDataComponent = () => {
	const [featuredData, setFeaturedData] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
	  fetch('https://spoura-go-api.vercel.app/api/featured')
		.then(response => {
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  return response.json();
		})
		.then(data => {
		  setFeaturedData(data);
		})
		.catch(error => {
		  setError(error.message);
		});
	}, []);

	if (error) {
	  return <div>Error: {error}</div>;
	}

	if (!featuredData) {
	  return <div class="h-96 flex items-center justify-center">
		<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
	  </div>;
	}

	return (
		<div class="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto px-4">
			{featuredData.map(product => (
				<div class="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-sm">
					<ProductReusable product={product} />
				</div>
			))}
		</div>
	);
  };

const TypeDataComponent = () => {
	const [typeData, setTypeData] = useState(null);
	const [error, setError] = useState(null);
	const [currenttype, setCurrentType] = useState('m')

	useEffect(() => {
	  fetch('https://spoura-go-api.vercel.app/api/type/' + currenttype)
		.then(response => {
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  return response.json();
		})
		.then(data => {
			setTypeData(data);
		})
		.catch(error => {
		  setError(error.message);
		});
	}, [currenttype]);

	function changeType (char) {
		setCurrentType(char)
	}

	if (error) {
	  return <div>Error: {error}</div>;
	}

	if (!typeData) {
	  return <div class="h-96 flex items-center justify-center">
		<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
	  </div>;
	}

	return (
		<div class="max-w-7xl mx-auto px-4 py-12">
			{/* Section Header */}
			<div class="text-center mb-8">
				<h2 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 mb-3">
					Trending Now
				</h2>
				<p class="text-gray-500">Check out what's hot right now</p>
			</div>

			{/* Category Tabs */}
			<div class="flex justify-center gap-3 mb-10">
				<button
					onClick={() => changeType("m")}
					class={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${
						currenttype === "m"
							? 'bg-gradient-to-r from-blue-500 to-blue-900 text-white shadow-lg'
							: 'bg-slate-200 text-gray-600 hover:bg-slate-300'
					}`}
				>
					Mens
				</button>
				<button
					onClick={() => changeType("w")}
					class={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${
						currenttype === "w"
							? 'bg-gradient-to-r from-blue-500 to-blue-900 text-white shadow-lg'
							: 'bg-slate-200 text-gray-600 hover:bg-slate-300'
					}`}
				>
					Womens
				</button>
				<button
					onClick={() => changeType("k")}
					class={`px-8 py-3 rounded-lg font-bold text-lg transition-all ${
						currenttype === "k"
							? 'bg-gradient-to-r from-blue-500 to-blue-900 text-white shadow-lg'
							: 'bg-slate-200 text-gray-600 hover:bg-slate-300'
					}`}
				>
					Kids
				</button>
			</div>

			{/* Products Grid */}
			<div class="flex flex-wrap justify-center gap-6">
				{typeData.slice(0, 4).map(product => (
					<div class="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-sm">
						<ProductReusable product={product} />
					</div>
				))}
			</div>

			{/* View All Link */}
			<div class="text-center mt-10">
				<a href="/shop" class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-900 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
					View All Products
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
					</svg>
				</a>
			</div>
		</div>
	);
  };

export function Home() {
	return (
		<>
			{/* Hero Section */}
			<div class="hero bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${homeBanner})`, minHeight: '100vh' }}>
				<div class="hero-content grid grid-cols-1 md:grid-cols-2 lg:flex-row-reverse">
					<div class="p-10 ml-2 rounded-3xl bg-opacity-100 relative">
						<h1 class="mb-5 text-5xl font-bold">Welcome to <em class="font-extrabold text-transparent text-7xl md:text-9xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">SPOURA</em></h1>
						<p class="mb-5 text-3xl">Selling the best shoes by the biggest brands since 2013.</p>
						<a class="btn bg-gradient-to-r from-blue-500 to-blue-900 border-0 rounded-lg hover:scale-110 text-white" href="/shop">All Products</a>
						<img class="absolute right-4 bottom-4 w-40 h-10" src={brandImage} alt="Puma Adidas Nike" />
					</div>
					<div />
				</div>
			</div>

			{/* Featured Section - Redesigned */}
			<div class="py-16 bg-gray-50">
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

			{/* Brands Section - Original */}
			<div class="grid grid-cols-2 items-center w-full h-full text-center justify-center">
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

			{/* Promo Banners + Search */}
			<div class="max-w-7xl mx-auto px-4 py-12">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* New Arrivals */}
					<div class="relative rounded-2xl overflow-hidden aspect-[16/9] bg-cover bg-center" style={{ backgroundImage: 'url("https://brand.assets.reebok.com/image/upload/f_auto,q_auto,fl_lossy/reebok_enGB/Images/FW22_Cardi-B_December-Drop_Sustain_Teaser-Carousel_3_tcm265-965885.jpg")' }}>
						<div class="absolute inset-0 bg-black/40 flex items-center justify-center">
							<div class="text-center">
								<h3 class="text-white text-2xl md:text-3xl font-bold mb-3">New Arrivals</h3>
								<a href="/shop" class="inline-block bg-gradient-to-r from-blue-500 to-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90">Shop Now</a>
							</div>
						</div>
					</div>

					{/* Best Sellers */}
					<div class="relative rounded-2xl overflow-hidden aspect-[16/9] bg-cover bg-center" style={{ backgroundImage: 'url("https://brand.assets.reebok.com/image/upload/f_auto,q_auto,fl_lossy/reebok_enGB/Images/22FW_Mountain-Research_FD_Teaser-Carousel-Card-Background_tcm265-971479.jpg")' }}>
						<div class="absolute inset-0 bg-black/40 flex items-center justify-center">
							<div class="text-center">
								<h3 class="text-white text-2xl md:text-3xl font-bold mb-3">Best Sellers</h3>
								<a href="/shop" class="inline-block bg-gradient-to-r from-blue-500 to-blue-900 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90">Shop Now</a>
							</div>
						</div>
					</div>

					{/* Search */}
					<div class="relative rounded-2xl overflow-hidden aspect-[16/9] bg-gradient-to-br from-blue-500 to-blue-900 flex items-center justify-center">
						<div class="text-center px-4">
							<h3 class="text-white text-2xl md:text-3xl font-bold mb-3">Have an idea?</h3>
							<p class="text-blue-100 text-sm mb-4">Search our collection</p>
							<div class="flex flex-col gap-2">
								<input
									type="text"
									class="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
									placeholder="Search for shoes..."
									onKeyDown={(event) => {
										if(event.key === 'Enter') {
											location.href = "/shop?query=" + event.target.value
										}
									}}
								/>
								<button
									class="bg-white text-blue-600 font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
									onClick={(e) => {
										const input = e.currentTarget.previousElementSibling;
										if (input instanceof HTMLInputElement) {
											location.href = "/shop?query=" + input.value;
										}
									}}
								>
									Search
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Trending Section - Redesigned */}
			<TypeDataComponent />
		</>
	);
}
