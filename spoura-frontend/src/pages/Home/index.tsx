import "./styles.css"
import homeBanner from "../../assets/home_banner.jpg"
import brandImage from "../../assets/brands.png"
import flameImage from "../../assets/flame.png"
import { useEffect, useState } from "preact/hooks";

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
	  return <div class="h-[90vh]">
		<svg class="animate-spin h-12 w-12 text-blue-700 m-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
		</div>;
	}
  
	return (
	   <>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center md:p-4 m-auto max-w-7xl items-stretch">
				{featuredData.map(product => (
				<a href={`/product/${product.URLSlug}`} class="transition ease-in-out delay-15 hover:scale-105 duration-300 md:p-10 m-auto">
					<div class="card h-72 w-80 ring-2 rounded-xl bg-center bg-cover" style={{ backgroundImage: `url(${product.ImgURL})` }}>
					<div class="card-body pb-40">
						<h2 class="card-title">{product.Name}</h2>
						{product.Type == "m" &&
							<div class="badge bg-blue-700 border-0">Mens</div>
						}
						{product.Type == "k" &&
							<div class="badge bg-blue-700 border-0">Kids</div>
						}
						{product.Type == "w" &&
							<div class="badge bg-blue-700 border-0">Womens</div>
						}
						<div class="badge badge-secondary">£{product.Price}</div>
					</div>
					</div>
				</a>
				))}
			</div>
		</>
	);
  };

const TypeDataComponent = () => {
	const [typeData, setTypeData] = useState(null);
	const [error, setError] = useState(null);
	const [currenttype, setCurrentType] = useState(['m', 'k', 'w'][Math.floor(Math.random() * 3)])
  
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
	  return <div class="h-[90vh]">
		<svg class="animate-spin h-12 w-12 text-blue-700 m-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
		</div>;
	}
  
	return (
	   <>
	   		<div class="p-6 m-auto rounded-lg text-center">
				<h1 class="mb-5 text-5xl font-bold">Trending</h1>
				<img src={flameImage} alt="flame" class="w-20 m-auto pb-16" />
				<div class="grid grid-cols-3 gap-6 max-w-xl m-auto">
					{currenttype == "w" ? 
						<button onClick={() => changeType("w")} class="px-6 py-2 my-2 w-[80%] m-auto btn bg-gradient-to-r from-slate-200 to-slate-400 text-black border-0 rounded-lg shadow-xl">Womens</button>
					:
						<button onClick={() => changeType("w")} class="px-6 py-2 my-2 w-[80%] m-auto btn bg-gradient-to-r from-blue-500 to-blue-900 border-0 rounded-lg">Womens</button>
					}
					{currenttype == "m" ? 
						<button onClick={() => changeType("m")} class="px-6 py-2 my-2 w-[80%] m-auto btn bg-gradient-to-r from-slate-200 to-slate-400 text-black border-0 rounded-lg shadow-xl">Mens</button>
					:
						<button onClick={() => changeType("m")} class="px-6 py-2 my-2 w-[80%] m-auto btn bg-gradient-to-r from-blue-500 to-blue-900 border-0 rounded-lg">Mens</button>
					}
					{currenttype == "k" ? 
						<button onClick={() => changeType("k")} class="px-6 py-2 my-2 w-[80%] m-auto btn bg-gradient-to-r from-slate-200 to-slate-400 text-black border-0 rounded-lg shadow-xl">Kids</button>
					:
						<button onClick={() => changeType("k")} class="px-6 py-2 my-2 w-[80%] m-auto btn bg-gradient-to-r from-blue-500 to-blue-900 border-0 rounded-lg">Kids</button>
					}
				</div>
			</div>
			<section class="grid grid-cols-1 lg:grid-cols-3 max-w-7xl rounded-lg justify-center p-10 items-center m-auto">
				{typeData.map(product => (
						<a href={`/product/${product.URLSlug}`} class="transition ease-in-out delay-15 hover:scale-105 duration-300 md:p-10 m-auto">
							<div class="card h-72 w-80 ring-2 rounded-xl bg-center bg-cover" style={{ backgroundImage: `url(${product.ImgURL})` }}>
							<div class="card-body pb-40">
								<h2 class="card-title">{product.Name}</h2>
								{product.Type == "m" &&
									<div class="badge bg-blue-700 border-0">Mens</div>
								}
								{product.Type == "k" &&
									<div class="badge bg-blue-700 border-0">Kids</div>
								}
								{product.Type == "w" &&
									<div class="badge bg-blue-700 border-0">Womens</div>
								}
								<div class="badge badge-secondary">£{product.Price}</div>
							</div>
							</div>
						</a>
				))}
			</section>
		</>
	);
  };

export function Home() {
	return (
		<>
			{/* <!-- Hero --> */}
			<div class="hero bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${homeBanner})`, minHeight: '100vh' }}>
				<div class="hero-content grid grid-cols-1 md:grid-cols-2 lg:flex-row-reverse">
					<div class="p-10 ml-2 rounded-3xl bg-opacity-100 relative">
						<h1 class="mb-5 text-5xl font-bold">Welcome to <em class="font-extrabold text-transparent text-7xl md:text-9xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">Spoura</em></h1>
						<p class="mb-5 text-3xl">Selling the best shoes by the biggest brands since 2013.</p>
						<a class="btn bg-gradient-to-r from-blue-500 to-blue-900 border-0 rounded-lg hover:scale-110" href="/shop">All Products</a>
						<img class="absolute right-4 bottom-4 w-40 h-10" src={brandImage} alt="Puma Adidas Nike" />
					</div>
					<div />
				</div>
			</div>

			{/* <!-- Collections --> */}
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

			{/* <!-- Featured --> */}
			<h1 class="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900 text-center p-10 z-10">Featured</h1>
			<FeaturedDataComponent />

			{/* <!-- Collections --> */}
			<div class="grid grid-cols-1 md:grid-cols-2 justify-center pt-10 items-center m-auto">
				<div class="w-auto h-96 bg-cover bg-center" style='background-image: url("https://brand.assets.reebok.com/image/upload/f_auto,q_auto,fl_lossy/reebok_enGB/Images/FW22_Cardi-B_December-Drop_Sustain_Teaser-Carousel_3_tcm265-965885.jpg")' >
					<br />
				</div>
				<div class="w-auto h-96 bg-cover bg-center" style='background-image: url("https://brand.assets.reebok.com/image/upload/f_auto,q_auto,fl_lossy/reebok_enGB/Images/22FW_Mountain-Research_FD_Teaser-Carousel-Card-Background_tcm265-971479.jpg")'>
					<br />
				</div>
			</div>

			{/* <!-- Idea Search --> */}
			<div class="mb-10 grid grid-cols-1 justify-center p-10 items-center m-auto bg-gradient-to-r from-pink-500 to-blue-700">
				<p class="text-center font-serif font-semibold text-3xl p-2 text-white">Have an idea?</p>
				{/* @ts-ignore */}
				<input type="text" class="text-center max-w-2xl m-auto rounded-lg p-2 shadow-lg" onKeyDown={(event) => {if(event.key === 'Enter'){{location.href = "/shop?query=" + event.target.value}}}} placeholder="Search..." />
			</div>

			{/* <!-- Mens Womens Kids --> */}
			<TypeDataComponent />

			{/* <!-- Newsletter --> */}
			{/* <div class="grid grid-cols-1 justify-center p-10 items-center m-auto bg-blue-400">
				<p class="text-center font-serif font-semibold text-3xl p-2 text-white">Want marketing updates ?</p>
				<input placeholder="Enter email" class="text-center max-w-2xl m-auto rounded-lg p-2 shadow-lg" />
			</div> */}
		</>
	);
}