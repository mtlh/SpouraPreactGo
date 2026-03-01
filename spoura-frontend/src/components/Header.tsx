import './header.css'
import { FavouriteToggle } from './FavouriteToggle';
import { updateCart, updateFavourites } from '../pages/Product';
import { useEffect, useState } from 'preact/hooks';
import { RemoveFromCart } from './CartAction';
import { LoadingSpinner } from './LoadingSpinner';
import { MegaMenu } from './MegaMenu';

const mensSections = [
    {
        title: "Products",
        items: [
            { label: "Lowest Price", href: "/shop?sort=lowHigh&type=m" },
            { label: "Highest Price", href: "/shop?sort=highLow&type=m" },
            { label: "All Products", href: "/shop?type=m" },
        ]
    },
    {
        title: "Brands",
        items: [
            { label: "Nike", href: "/brand/nike" },
            { label: "Adidas", href: "/brand/adidas" },
            { label: "Puma", href: "/brand/puma" },
            { label: "Under Armour", href: "/brand/under-armour" },
        ]
    },
    {
        title: "Collections",
        items: [
            { label: "Puma Ca Pro", href: "/collection/puma-capro" },
            { label: "Nike Flyknit", href: "/collection/nike-flyknit" },
            { label: "Adidas NMD", href: "/collection/adidas-nmd" },
            { label: "Puma MB.02", href: "/collection/puma-mb02" },
        ]
    },
];

const womensSections = [
    {
        title: "Products",
        items: [
            { label: "Lowest Price", href: "/shop?sort=lowHigh&type=w" },
            { label: "Highest Price", href: "/shop?sort=highLow&type=w" },
            { label: "All Products", href: "/shop?type=w" },
        ]
    },
    {
        title: "Brands",
        items: [
            { label: "Nike", href: "/brand/nike" },
            { label: "Adidas", href: "/brand/adidas" },
            { label: "Puma", href: "/brand/puma" },
            { label: "Under Armour", href: "/brand/under-armour" },
        ]
    },
    {
        title: "Collections",
        items: [
            { label: "Puma Ca Pro", href: "/collection/puma-capro" },
            { label: "Nike Flyknit", href: "/collection/nike-flyknit" },
            { label: "Adidas NMD", href: "/collection/adidas-nmd" },
            { label: "Puma MB.02", href: "/collection/puma-mb02" },
        ]
    },
];

const kidsSections = [
    {
        title: "Products",
        items: [
            { label: "Lowest Price", href: "/shop?sort=lowHigh&type=k" },
            { label: "Highest Price", href: "/shop?sort=highLow&type=k" },
            { label: "All Products", href: "/shop?type=k" },
        ]
    },
    {
        title: "Brands",
        items: [
            { label: "Nike", href: "/brand/nike" },
            { label: "Adidas", href: "/brand/adidas" },
            { label: "Puma", href: "/brand/puma" },
            { label: "Under Armour", href: "/brand/under-armour" },
        ]
    },
    {
        title: "Collections",
        items: [
            { label: "Puma Ca Pro", href: "/collection/puma-capro" },
            { label: "Nike Flyknit", href: "/collection/nike-flyknit" },
            { label: "Adidas NMD", href: "/collection/adidas-nmd" },
            { label: "Puma MB.02", href: "/collection/puma-mb02" },
        ]
    },
];

export function Header({user, setUser, loading}) {
	const [subtotal, setSubtotal] = useState(0);
	const [removeCartLoading, setRemoveCartLoading] = useState(false);
	useEffect(() => {
		let runningtotal = 0;
		for (let x in user.Cart) {
			runningtotal += parseFloat(user.Cart[x].price)
		}
		setSubtotal(parseFloat(runningtotal.toFixed(2)))
	}, [user]);

	return (
		<div class="navbar bg-base-100 sticky shadow-xl top-0 z-50">
			<div class="navbar-start">
			<div class="dropdown">
				<label tabindex={0} class="btn btn-ghost lg:hidden">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
				</label>
				<ul tabindex={0} class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-96">
					<div class="flex">
						{
							user.Autocomplete ?
								<Autocomplete suggestions={user.Autocomplete} />
							:
								<p>Loading Product List...</p>
						}
					</div>
					<li tabindex={0} class="grid grid-cols-3 py-2">
						<div class="font-semibold text-lg col-span-3">Products</div>
						<a class="font-base underline text-md" href="/shop?sort=lowHigh">Lowest Price</a>
						<a class="font-base underline text-md" href="/shop?sort=highLow">Highest Price</a>
						<a class="font-base underline text-md" href="/shop?sort=all">All</a>
					</li>
					<li tabindex={0} class="grid grid-cols-3 py-2">
						<div class="font-semibold text-lg col-span-3">Brands</div>
						<a class="font-base underline text-md" href="/brand/nike">Nike</a>
						<a class="font-base underline text-md" href="/brand/adidas">Adidas</a>
						<a class="font-base underline text-md" href="/brand/puma">Puma</a>
						<a class="font-base underline text-md" href="/brand/under-armour">Under Armour</a>
					</li>
					<li tabindex={0} class="grid grid-cols-3 py-2">
						<div class="font-semibold text-lg col-span-3">Collections</div>
						<a class="font-base underline text-md" href="/collection/puma-capro">Puma Ca Pro</a>
						<a class="font-base underline text-md" href="/collection/nike-flyknit">Nike Flyknit</a>
						<a class="font-base underline text-md" href="/collection/adidas-nmd">Adidas NMD</a>
						<a class="font-base underline text-md" href="/collection/puma-mb02">Puma MB.02</a>
					</li>
					<li tabindex={0} class="grid grid-cols-1 py-2">
						<a class="font-semibold text-lg justify-between" href="/about">
							About
						</a>
					</li>
					<li tabindex={0} class="grid grid-cols-1 py-2">
						<a class="font-semibold text-lg justify-between" href="/about">
							Contact
						</a>
					</li>
				</ul>
			</div>
			<a class="btn btn-ghost font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900" href="/">SPOURA</a>
			</div>
			<div class="navbar-center hidden lg:flex">
			<ul class="menu-horizontal px-1" tabindex={0}>
				<li class="hoverable hover:bg-gradient-to-r from-blue-500 to-blue-900 hover:text-white">
				<div class="relative block py-6 px-4 lg:p-6 text-sm lg:text-base hover:bg-gradient-to-r from-blue-500 to-blue-900 hover:text-white">
					Men's
				</div>
				<MegaMenu title="Men's" sections={mensSections} typeChar="m" />
				</li>
				<li class="hoverable hover:bg-gradient-to-r from-blue-500 to-blue-900 hover:text-white">
				<div class="relative block py-6 px-4 lg:p-6 text-sm lg:text-base hover:bg-gradient-to-r from-blue-500 to-blue-900 hover:text-white">Women's</div>
				<MegaMenu title="Women's" sections={womensSections} typeChar="w" />
				</li>
				<li class="hoverable hover:bg-gradient-to-r from-blue-500 to-blue-900 hover:text-white">
				<div class="relative block py-6 px-4 lg:p-6 text-sm lg:text-base hover:bg-gradient-to-r from-blue-500 to-blue-900 hover:text-white">Kids</div>
				<MegaMenu title="Kids" sections={kidsSections} typeChar="k" />
				</li>
				<li class="m-auto py-6 px-4 lg:p-6 font-normal"><a href="/about">About</a></li>
				<li class="m-auto py-6 px-4 lg:p-6 font-normal"><a href="/contact">Contact</a></li>
			</ul>
			</div>
			<div class="navbar-end">
				{
					user.Autocomplete ?
						<Autocomplete suggestions={user.Autocomplete} />
					:
						<p>Loading Product List...</p>
				}
				<a href="/profile" class="ml-1">
					<label tabindex={0} class="btn btn-ghost btn-circle">
						<svg viewBox="0 0 24 24" fill="none" class="h-[30px] w-[30px]" xmlns="http://www.w3.org/2000/svg">
							<circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</label>
				</a>
				{/* Favourites Dropdown */}
				<div class="dropdown dropdown-end">
					<label tabindex={0} class="btn btn-ghost btn-circle hover:bg-gray-100">
						<div class="relative">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-[30px] w-[30px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
							</svg>
							{ user.Favourites && user.Favourites.length > 0 &&
								<span class="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{user.Favourites.length}</span>
							}
						</div>
					</label>
					<div tabindex={0} class="dropdown-content z-50 mt-2">
						<div class="bg-white rounded-xl shadow-xl border border-gray-200 w-80 max-h-96 overflow-y-auto">
							<div class="p-4 border-b border-gray-100">
								<h3 class="font-semibold text-gray-800">Favourites</h3>
								<p class="text-sm text-gray-500">{user.Favourites ? user.Favourites.length : 0} items</p>
							</div>
							{ user && user.Favourites && user.Favourites.length > 0 ?
								<div class="p-2">
									{user.Favourites.map(product => (
										<div class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
											<a href={"/product/" + (product.URLSlug || product.urlslug)} class="flex-shrink-0">
												<img src={product.ImgURL || product.imgurl} alt={product.Name || product.name} class="w-16 h-16 object-cover rounded-lg" />
											</a>
											<div class="flex-1 min-w-0">
												<a href={"/product/" + (product.URLSlug || product.urlslug)} class="block">
													<p class="text-sm font-medium text-gray-800 truncate">{product.Name || product.name}</p>
													<p class="text-sm font-semibold text-blue-600">£{product.Price || product.price}</p>
												</a>
											</div>
											<button
												onClick={async ()=> {setRemoveCartLoading(true); updateFavourites(await FavouriteToggle(product.urlslug), setUser); setRemoveCartLoading(false)}}
												class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
											>
												<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
													<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
												</svg>
											</button>
										</div>
									))}
								</div>
								:
								<div class="p-8 text-center">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
									</svg>
									<p class="text-gray-500">No favourites yet</p>
									<a href="/shop" class="text-blue-600 text-sm hover:underline mt-2 inline-block">Start shopping</a>
								</div>
							}
						</div>
					</div>
				</div>
				{/* Cart Dropdown */}
				<div class="dropdown dropdown-end">
					<label tabindex={0} class="btn btn-ghost btn-circle hover:bg-gray-100">
						<div class="relative">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-[30px] w-[30px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
								<path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
							</svg>
							{ user.Cart && user.Cart.length > 0 &&
								<span class="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{user.Cart.length}</span>
							}
						</div>
					</label>
					<div tabindex={0} class="dropdown-content z-50 mt-2">
						<div class="bg-white rounded-xl shadow-xl border border-gray-200 w-80 max-h-96 overflow-y-auto">
							<div class="p-4 border-b border-gray-100">
								<h3 class="font-semibold text-gray-800">Shopping Cart</h3>
								<p class="text-sm text-gray-500">{user.Cart ? user.Cart.length : 0} items in cart</p>
							</div>
							{ user && user.Cart && user.Cart.length > 0 ?
								<>
									<div class="p-2">
										{user.Cart.map(product => (
											<div class="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
												<a href={"/product/" + product.urlslug} class="flex-shrink-0">
													<img src={product.imgurl} alt={product.name} class="w-16 h-16 object-cover rounded-lg" />
												</a>
												<div class="flex-1 min-w-0">
													<a href={"/product/" + product.urlslug} class="block">
														<p class="text-sm font-medium text-gray-800 truncate">{product.name}</p>
														<div class="flex items-center gap-2 mt-1">
															<span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Size: {product.size}</span>
															<span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Qty: {product.quantity}</span>
														</div>
														<p class="text-sm font-semibold text-blue-600 mt-1">£{product.price}</p>
													</a>
												</div>
												<button
													onClick={async ()=> { setRemoveCartLoading(true); updateCart(await RemoveFromCart(product.urlslug, product.quantity, product.size), setUser, setRemoveCartLoading)}}
													class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
												>
													<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
														<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
													</svg>
												</button>
											</div>
										))}
									</div>
									<div class="p-4 border-t border-gray-100 bg-gray-50">
										<div class="flex justify-between items-center mb-3">
											<span class="text-gray-600">Subtotal</span>
											<span class="text-lg font-bold text-gray-900">£{subtotal}</span>
										</div>
										<a href="/cart" class="btn btn-block bg-gradient-to-r from-blue-500 to-blue-900 border-0 text-white hover:opacity-90">View Cart</a>
									</div>
								</>
								:
								<div class="p-8 text-center">
									<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
									</svg>
									<p class="text-gray-500">Your cart is empty</p>
									<a href="/shop" class="text-blue-600 text-sm hover:underline mt-2 inline-block">Start shopping</a>
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		</div>
		
	);
}

function filterSuggestions(suggestions: Array<any>, userInput) {
	let filteredSuggestions = suggestions.filter(
		suggestion => suggestion.Name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
	)
	if (filteredSuggestions.length > 10) {
		filteredSuggestions = filteredSuggestions.slice(0, 10);
	}
	return filteredSuggestions;
}

const Autocomplete = ({ suggestions }) => {
	const [filteredSuggestions, setFilteredSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [userInput, setUserInput] = useState("");
	const [activeSuggestion, setActiveSuggestion] = useState(-1);
  
	const onChange = (e) => {
	  const userInput = e.target.value;
	  setUserInput(userInput);
	  setFilteredSuggestions(filterSuggestions(suggestions, userInput));
	  setShowSuggestions(true);
	  setActiveSuggestion(-1);
	};
  
	const onClick = (e) => {
	  const urlSlug = e.currentTarget.getAttribute('data-urlslug');
	  const name = e.currentTarget.getAttribute('data-name');
	  setUserInput(name);
	  setShowSuggestions(false);
	  window.location.href = `/product/${urlSlug}`;
	};
  
	const onKeyDown = (e) => {
		if (e.key === 'Enter') {
			if (showSuggestions && filteredSuggestions.length > 0 && activeSuggestion >= 0) {
				window.location.href = `/product/${filteredSuggestions[activeSuggestion].URLSlug}`;
			} else if (userInput.trim()) {
				window.location.href = `/shop?query=${userInput}`;
			}
		} else if (e.key === 'ArrowDown') {
			if (activeSuggestion < filteredSuggestions.length - 1) {
				setActiveSuggestion(activeSuggestion + 1);
			}
		} else if (e.key === 'ArrowUp') {
			if (activeSuggestion > 0) {
				setActiveSuggestion(activeSuggestion - 1);
			}
		} else if (e.key === 'Tab') {
			setShowSuggestions(false);
		}
	};
  
	const SuggestionsListComponent = () => {
	  if (!filteredSuggestions.length) {
		return null;
	  }
	  return (
		<ul className="suggestions bg-white border border-gray-200 rounded-xl mt-2 absolute z-10 w-72 shadow-xl">
		  {filteredSuggestions.map((suggestion, index) => {
			const className = index === activeSuggestion && activeSuggestion >= 0 ? "bg-blue-500 text-white" : "hover:bg-gray-100 text-gray-800";
			return (
			  <li key={index} data-name={suggestion.Name} data-urlslug={suggestion.URLSlug} onClick={onClick} className={`p-3 cursor-pointer rounded-lg transition-colors ${className}`}>
				{suggestion.Name}
			  </li>
			);
		  })}
		</ul>
	  );
	};
  
	const handleSearch = () => {
		if (userInput.trim()) {
			window.location.href = `/shop?query=${userInput}`;
		}
	};

	return (
	  <div className="relative">
		<div className="flex items-center">
			<input
			  type="text"
			  className="rounded-l-xl px-4 py-2 bg-gray-100 w-48 border-2 border-transparent focus:border-blue-500 focus:bg-white transition-all outline-none h-10"
			  placeholder="Search shoes..."
			  onChange={onChange}
			  onKeyDown={onKeyDown}
			  value={userInput}
			  aria-autocomplete="list"
			  aria-controls="autocomplete-list"
			  aria-activedescendant={`autocomplete-item-${activeSuggestion}`}
			/>
			<button
				onClick={handleSearch}
				className="px-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-r-xl hover:from-blue-600 hover:to-blue-700 transition-all border-l-0 h-10 flex items-center justify-center"
			>
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
					<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
				</svg>
			</button>
		</div>
		{showSuggestions && userInput && (
		  <SuggestionsListComponent />
		)}
	  </div>
	);
};
  
export default Autocomplete;