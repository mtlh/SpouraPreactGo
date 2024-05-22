import './header.css'
import { FavouriteToggle } from './FavouriteToggle';
import { updateCart, updateFavourites } from '../pages/Product';
import { useEffect, useState } from 'preact/hooks';
import { RemoveFromCart } from './CartAction';
import { LoadingSpinner } from './LoadingSpinner';

export function Header({user, setUser, loading}) {
	// console.log(user, loading)

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
			<a class="btn btn-ghost font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900" href="/">Spoura</a>
			</div>
			<div class="navbar-center hidden lg:flex">
			<ul class="menu-horizontal px-1" tabindex={0}>
				<li class="hoverable hover:bg-gradient-to-r from-blue-500 to-blue-900 hover:text-white">
				<div class="relative block py-6 px-4 lg:p-6 text-sm lg:text-base hover:bg-gradient-to-r from-blue-500 to-blue-900 hover:text-white">
					Mens
				</div>
				<div class="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-gradient-to-r from-blue-500 to-blue-900">
					<div class="grid grid-cols-4 max-w-7xl m-auto">
						<div>
							<h2 class="font-bold text-4xl flex pb-4">Mens</h2>
							<p class="font-base text-xl w-52">Select what suits your style best...</p>
						</div>
						<div class="grid grid-cols-1 p-2">
							<div class="font-semibold text-4xl flex">
							<svg fill="#000000" class="h-8 mb-3 mr-3 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepoEditor"> <path d="M16.6,20.463a1.5,1.5,0,0,1-.7-.174l-3.666-1.927a.5.5,0,0,0-.464,0L8.1,20.289a1.5,1.5,0,0,1-2.177-1.581l.7-4.082a.5.5,0,0,0-.143-.442L3.516,11.293a1.5,1.5,0,0,1,.832-2.559l4.1-.6a.5.5,0,0,0,.376-.273l1.833-3.714a1.5,1.5,0,0,1,2.69,0l1.833,3.714a.5.5,0,0,0,.376.274l4.1.6a1.5,1.5,0,0,1,.832,2.559l-2.965,2.891a.5.5,0,0,0-.144.442l.7,4.082A1.5,1.5,0,0,1,16.6,20.463Zm-3.9-2.986L16.364,19.4a.5.5,0,0,0,.725-.527l-.7-4.082a1.5,1.5,0,0,1,.432-1.328l2.965-2.89a.5.5,0,0,0-.277-.853l-4.1-.6a1.5,1.5,0,0,1-1.13-.821L12.449,4.594a.516.516,0,0,0-.9,0L9.719,8.308a1.5,1.5,0,0,1-1.13.82l-4.1.6a.5.5,0,0,0-.277.853L7.18,13.468A1.5,1.5,0,0,1,7.611,14.8l-.7,4.082a.5.5,0,0,0,.726.527L11.3,17.477a1.5,1.5,0,0,1,1.4,0Z"></path> </g></svg>
							Products
							</div>
							<a class="font-base underline text-xl" href="/shop?sort=lowHigh&type=m">Lowest Price</a>
							<a class="font-base underline text-xl" href="/shop?sort=highLow&type=m">Highest Price</a>
							<a class="font-base underline text-xl" href="/shop?sort=all&type=m">All</a>
						</div>
						<div class="grid grid-cols-1 p-2">
							<div class="font-semibold text-4xl flex">
							<svg class="h-8 mb-3 mr-3 fill-current text-white" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepoEditor"> <path d="M12.09,21.925a9.846,9.846,0,0,1-3.838-.747A9.673,9.673,0,0,1,3.005,15.93,10.034,10.034,0,0,1,2.244,12a10.425,10.425,0,0,1,.695-3.8,9.606,9.606,0,0,1,2-3.169A9.269,9.269,0,0,1,8.1,2.862a10.605,10.605,0,0,1,4.175-.787,10.516,10.516,0,0,1,4.334.827A8.437,8.437,0,0,1,19.64,5.119a8.622,8.622,0,0,1,1.707,3.1,9.263,9.263,0,0,1,.377,3.487,5.809,5.809,0,0,1-1.3,3.6A3.6,3.6,0,0,1,17.7,16.473a3.628,3.628,0,0,1-2.162-.609,2.82,2.82,0,0,1-1.119-1.694l.5.106a2.582,2.582,0,0,1-1.3,1.3A4.37,4.37,0,0,1,11.746,16,3.681,3.681,0,0,1,9.88,15.54a3.2,3.2,0,0,1-1.237-1.271A3.843,3.843,0,0,1,8.2,12.4a3.88,3.88,0,0,1,.456-1.926A3.191,3.191,0,0,1,9.919,9.214a3.792,3.792,0,0,1,1.853-.443,4.716,4.716,0,0,1,1.767.364,2.622,2.622,0,0,1,1.383,1.3l-.5.5V9.461a.4.4,0,0,1,.4-.4h.232a.4.4,0,0,1,.4.4v3.518a2.723,2.723,0,0,0,.529,1.674,2.173,2.173,0,0,0,1.853.708,2.281,2.281,0,0,0,1.323-.41,2.938,2.938,0,0,0,.967-1.178,4.947,4.947,0,0,0,.437-1.852,9.439,9.439,0,0,0-.417-3.574A7.285,7.285,0,0,0,18.5,5.588a7.424,7.424,0,0,0-2.679-1.78,9.605,9.605,0,0,0-3.547-.622,9.041,9.041,0,0,0-3.758.741,8.252,8.252,0,0,0-2.773,2,8.8,8.8,0,0,0-1.72,2.838,9.27,9.27,0,0,0-.589,3.262,8.568,8.568,0,0,0,.682,3.408A8.951,8.951,0,0,0,6,18.24a8.707,8.707,0,0,0,2.785,1.892,8.515,8.515,0,0,0,3.389.682,9.851,9.851,0,0,0,2.679-.378,8.451,8.451,0,0,0,2-.831.4.4,0,0,1,.553.158l.1.192a.4.4,0,0,1-.141.526,9.832,9.832,0,0,1-2.391,1.04A10.5,10.5,0,0,1,12.09,21.925ZM11.8,14.859a2.469,2.469,0,0,0,1.786-.649,2.427,2.427,0,0,0,.675-1.839,2.414,2.414,0,0,0-.7-1.886A2.532,2.532,0,0,0,11.8,9.856a2.482,2.482,0,0,0-1.839.649,2.523,2.523,0,0,0-.65,1.866,2.4,2.4,0,0,0,.682,1.865A2.574,2.574,0,0,0,11.8,14.859Z"></path> </g></svg>
							Brands
							</div>
							<a class="font-base underline text-xl" href="/brand/nike">Nike</a>
							<a class="font-base underline text-xl" href="/brand/adidas">Adidas</a>
							<a class="font-base underline text-xl" href="/brand/puma">Puma</a>
							<a class="font-base underline text-xl" href="/brand/under-armour">Under Armour</a>
						</div>
						<div class="grid grid-cols-1 p-2">
							<div class="font-semibold text-4xl flex">
							<svg fill="#000000" class="h-8 mb-3 mr-3 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepoEditor" data-name="Box List"> <path d="M6.562,8.062h-2a1.5,1.5,0,0,1-1.5-1.5v-2a1.5,1.5,0,0,1,1.5-1.5h2a1.5,1.5,0,0,1,1.5,1.5v2A1.5,1.5,0,0,1,6.562,8.062Zm-2-4a.5.5,0,0,0-.5.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.5-.5v-2a.5.5,0,0,0-.5-.5Z"></path> <path d="M6.562,20.938h-2a1.5,1.5,0,0,1-1.5-1.5v-2a1.5,1.5,0,0,1,1.5-1.5h2a1.5,1.5,0,0,1,1.5,1.5v2A1.5,1.5,0,0,1,6.562,20.938Zm-2-4a.5.5,0,0,0-.5.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.5-.5v-2a.5.5,0,0,0-.5-.5Z"></path> <path d="M6.562,14.5h-2a1.5,1.5,0,0,1-1.5-1.5V11a1.5,1.5,0,0,1,1.5-1.5h2a1.5,1.5,0,0,1,1.5,1.5v2A1.5,1.5,0,0,1,6.562,14.5Zm-2-4a.5.5,0,0,0-.5.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.5-.5V11a.5.5,0,0,0-.5-.5Z"></path> <path d="M20.438,6.062h-9a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1Z"></path> <path d="M20.438,12.5h-9a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1Z"></path> <path d="M20.438,18.935h-9a.5.5,0,1,1,0-1h9a.5.5,0,0,1,0,1Z"></path> </g></svg>                  Collections
							</div>
							<a class="font-base underline text-xl" href="/collection/puma-capro">Puma Ca Pro</a>
							<a class="font-base underline text-xl" href="/collection/nike-flyknit">Nike Flyknit</a>
							<a class="font-base underline text-xl" href="/collection/adidas-nmd">Adidas NMD</a>
							<a class="font-base underline text-xl" href="/collection/puma-mb02">Puma MB.02</a>
						</div>
					</div>
				</div>
				</li>
				<li class="hoverable hover:bg-gradient-to-r from-blue-500 to-blue-900 hover:text-white">
				<div class="relative block py-6 px-4 lg:p-6 text-sm lg:text-base hover:bg-gradient-to-r from-blue-500 to-blue-900 hover:text-white">Womens</div>
				<div class="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-gradient-to-r from-blue-500 to-blue-900">
					<div class="grid grid-cols-4 max-w-7xl m-auto">
						<div>
							<h2 class="font-bold text-4xl flex pb-4">Womens</h2>
							<p class="font-base text-xl w-52">Select what suits your style best...</p>
						</div>
						<div class="grid grid-cols-1 p-2">
							<div class="font-semibold text-4xl flex">
							<svg fill="#000000" class="h-8 mb-3 mr-3 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepoEditor"> <path d="M16.6,20.463a1.5,1.5,0,0,1-.7-.174l-3.666-1.927a.5.5,0,0,0-.464,0L8.1,20.289a1.5,1.5,0,0,1-2.177-1.581l.7-4.082a.5.5,0,0,0-.143-.442L3.516,11.293a1.5,1.5,0,0,1,.832-2.559l4.1-.6a.5.5,0,0,0,.376-.273l1.833-3.714a1.5,1.5,0,0,1,2.69,0l1.833,3.714a.5.5,0,0,0,.376.274l4.1.6a1.5,1.5,0,0,1,.832,2.559l-2.965,2.891a.5.5,0,0,0-.144.442l.7,4.082A1.5,1.5,0,0,1,16.6,20.463Zm-3.9-2.986L16.364,19.4a.5.5,0,0,0,.725-.527l-.7-4.082a1.5,1.5,0,0,1,.432-1.328l2.965-2.89a.5.5,0,0,0-.277-.853l-4.1-.6a1.5,1.5,0,0,1-1.13-.821L12.449,4.594a.516.516,0,0,0-.9,0L9.719,8.308a1.5,1.5,0,0,1-1.13.82l-4.1.6a.5.5,0,0,0-.277.853L7.18,13.468A1.5,1.5,0,0,1,7.611,14.8l-.7,4.082a.5.5,0,0,0,.726.527L11.3,17.477a1.5,1.5,0,0,1,1.4,0Z"></path> </g></svg>
							Products
							</div>
							<a class="font-base underline text-xl" href="/shop?sort=lowHigh&type=w">Lowest Price</a>
							<a class="font-base underline text-xl" href="/shop?sort=highLow&type=w">Highest Price</a>
							<a class="font-base underline text-xl" href="/shop?sort=all&type=w">All</a>
						</div>
						<div class="grid grid-cols-1 p-2">
							<div class="font-semibold text-4xl flex">
							<svg class="h-8 mb-3 mr-3 fill-current text-white" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepoEditor"> <path d="M12.09,21.925a9.846,9.846,0,0,1-3.838-.747A9.673,9.673,0,0,1,3.005,15.93,10.034,10.034,0,0,1,2.244,12a10.425,10.425,0,0,1,.695-3.8,9.606,9.606,0,0,1,2-3.169A9.269,9.269,0,0,1,8.1,2.862a10.605,10.605,0,0,1,4.175-.787,10.516,10.516,0,0,1,4.334.827A8.437,8.437,0,0,1,19.64,5.119a8.622,8.622,0,0,1,1.707,3.1,9.263,9.263,0,0,1,.377,3.487,5.809,5.809,0,0,1-1.3,3.6A3.6,3.6,0,0,1,17.7,16.473a3.628,3.628,0,0,1-2.162-.609,2.82,2.82,0,0,1-1.119-1.694l.5.106a2.582,2.582,0,0,1-1.3,1.3A4.37,4.37,0,0,1,11.746,16,3.681,3.681,0,0,1,9.88,15.54a3.2,3.2,0,0,1-1.237-1.271A3.843,3.843,0,0,1,8.2,12.4a3.88,3.88,0,0,1,.456-1.926A3.191,3.191,0,0,1,9.919,9.214a3.792,3.792,0,0,1,1.853-.443,4.716,4.716,0,0,1,1.767.364,2.622,2.622,0,0,1,1.383,1.3l-.5.5V9.461a.4.4,0,0,1,.4-.4h.232a.4.4,0,0,1,.4.4v3.518a2.723,2.723,0,0,0,.529,1.674,2.173,2.173,0,0,0,1.853.708,2.281,2.281,0,0,0,1.323-.41,2.938,2.938,0,0,0,.967-1.178,4.947,4.947,0,0,0,.437-1.852,9.439,9.439,0,0,0-.417-3.574A7.285,7.285,0,0,0,18.5,5.588a7.424,7.424,0,0,0-2.679-1.78,9.605,9.605,0,0,0-3.547-.622,9.041,9.041,0,0,0-3.758.741,8.252,8.252,0,0,0-2.773,2,8.8,8.8,0,0,0-1.72,2.838,9.27,9.27,0,0,0-.589,3.262,8.568,8.568,0,0,0,.682,3.408A8.951,8.951,0,0,0,6,18.24a8.707,8.707,0,0,0,2.785,1.892,8.515,8.515,0,0,0,3.389.682,9.851,9.851,0,0,0,2.679-.378,8.451,8.451,0,0,0,2-.831.4.4,0,0,1,.553.158l.1.192a.4.4,0,0,1-.141.526,9.832,9.832,0,0,1-2.391,1.04A10.5,10.5,0,0,1,12.09,21.925ZM11.8,14.859a2.469,2.469,0,0,0,1.786-.649,2.427,2.427,0,0,0,.675-1.839,2.414,2.414,0,0,0-.7-1.886A2.532,2.532,0,0,0,11.8,9.856a2.482,2.482,0,0,0-1.839.649,2.523,2.523,0,0,0-.65,1.866,2.4,2.4,0,0,0,.682,1.865A2.574,2.574,0,0,0,11.8,14.859Z"></path> </g></svg>
							Brands
							</div>
							<a class="font-base underline text-xl" href="/brand/nike">Nike</a>
							<a class="font-base underline text-xl" href="/brand/adidas">Adidas</a>
							<a class="font-base underline text-xl" href="/brand/puma">Puma</a>
							<a class="font-base underline text-xl" href="/brand/under-armour">Under Armour</a>
						</div>
						<div class="grid grid-cols-1 p-2">
							<div class="font-semibold text-4xl flex">
							<svg fill="#000000" class="h-8 mb-3 mr-3 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepoEditor" data-name="Box List"> <path d="M6.562,8.062h-2a1.5,1.5,0,0,1-1.5-1.5v-2a1.5,1.5,0,0,1,1.5-1.5h2a1.5,1.5,0,0,1,1.5,1.5v2A1.5,1.5,0,0,1,6.562,8.062Zm-2-4a.5.5,0,0,0-.5.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.5-.5v-2a.5.5,0,0,0-.5-.5Z"></path> <path d="M6.562,20.938h-2a1.5,1.5,0,0,1-1.5-1.5v-2a1.5,1.5,0,0,1,1.5-1.5h2a1.5,1.5,0,0,1,1.5,1.5v2A1.5,1.5,0,0,1,6.562,20.938Zm-2-4a.5.5,0,0,0-.5.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.5-.5v-2a.5.5,0,0,0-.5-.5Z"></path> <path d="M6.562,14.5h-2a1.5,1.5,0,0,1-1.5-1.5V11a1.5,1.5,0,0,1,1.5-1.5h2a1.5,1.5,0,0,1,1.5,1.5v2A1.5,1.5,0,0,1,6.562,14.5Zm-2-4a.5.5,0,0,0-.5.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.5-.5V11a.5.5,0,0,0-.5-.5Z"></path> <path d="M20.438,6.062h-9a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1Z"></path> <path d="M20.438,12.5h-9a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1Z"></path> <path d="M20.438,18.935h-9a.5.5,0,1,1,0-1h9a.5.5,0,0,1,0,1Z"></path> </g></svg>                  Collections
							</div>
							<a class="font-base underline text-xl" href="/collection/puma-capro">Puma Ca Pro</a>
							<a class="font-base underline text-xl" href="/collection/nike-flyknit">Nike Flyknit</a>
							<a class="font-base underline text-xl" href="/collection/adidas-nmd">Adidas NMD</a>
							<a class="font-base underline text-xl" href="/collection/puma-mb02">Puma MB.02</a>
						</div>
					</div>
				</div>
				</li>
				<li class="hoverable hover:bg-gradient-to-r from-blue-500 to-blue-900 hover:text-white">
				<div class="relative block py-6 px-4 lg:p-6 text-sm lg:text-base hover:bg-gradient-to-r from-blue-500 to-blue-900 hover:text-white">Kids</div>
				<div class="p-6 mega-menu mb-16 sm:mb-0 shadow-xl bg-gradient-to-r from-blue-500 to-blue-900">
					<div class="grid grid-cols-4 max-w-7xl m-auto">
						<div>
							<h2 class="font-bold text-4xl flex pb-4">Kids</h2>
							<p class="font-base text-xl w-52">Select what suits your style best...</p>
						</div>
						<div class="grid grid-cols-1 p-2">
							<div class="font-semibold text-4xl flex">
							<svg fill="#000000" class="h-8 mb-3 mr-3 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepoEditor"> <path d="M16.6,20.463a1.5,1.5,0,0,1-.7-.174l-3.666-1.927a.5.5,0,0,0-.464,0L8.1,20.289a1.5,1.5,0,0,1-2.177-1.581l.7-4.082a.5.5,0,0,0-.143-.442L3.516,11.293a1.5,1.5,0,0,1,.832-2.559l4.1-.6a.5.5,0,0,0,.376-.273l1.833-3.714a1.5,1.5,0,0,1,2.69,0l1.833,3.714a.5.5,0,0,0,.376.274l4.1.6a1.5,1.5,0,0,1,.832,2.559l-2.965,2.891a.5.5,0,0,0-.144.442l.7,4.082A1.5,1.5,0,0,1,16.6,20.463Zm-3.9-2.986L16.364,19.4a.5.5,0,0,0,.725-.527l-.7-4.082a1.5,1.5,0,0,1,.432-1.328l2.965-2.89a.5.5,0,0,0-.277-.853l-4.1-.6a1.5,1.5,0,0,1-1.13-.821L12.449,4.594a.516.516,0,0,0-.9,0L9.719,8.308a1.5,1.5,0,0,1-1.13.82l-4.1.6a.5.5,0,0,0-.277.853L7.18,13.468A1.5,1.5,0,0,1,7.611,14.8l-.7,4.082a.5.5,0,0,0,.726.527L11.3,17.477a1.5,1.5,0,0,1,1.4,0Z"></path> </g></svg>
							Products
							</div>
							<a class="font-base underline text-xl" href="/shop?sort=lowHigh&type=k">Lowest Price</a>
							<a class="font-base underline text-xl" href="/shop?sort=highLow&type=k">Highest Price</a>
							<a class="font-base underline text-xl" href="/shop?sort=all&type=k">All</a>
						</div>
						<div class="grid grid-cols-1 p-2">
							<div class="font-semibold text-4xl flex">
							<svg class="h-8 mb-3 mr-3 fill-current text-white" fill="#000000" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepoEditor"> <path d="M12.09,21.925a9.846,9.846,0,0,1-3.838-.747A9.673,9.673,0,0,1,3.005,15.93,10.034,10.034,0,0,1,2.244,12a10.425,10.425,0,0,1,.695-3.8,9.606,9.606,0,0,1,2-3.169A9.269,9.269,0,0,1,8.1,2.862a10.605,10.605,0,0,1,4.175-.787,10.516,10.516,0,0,1,4.334.827A8.437,8.437,0,0,1,19.64,5.119a8.622,8.622,0,0,1,1.707,3.1,9.263,9.263,0,0,1,.377,3.487,5.809,5.809,0,0,1-1.3,3.6A3.6,3.6,0,0,1,17.7,16.473a3.628,3.628,0,0,1-2.162-.609,2.82,2.82,0,0,1-1.119-1.694l.5.106a2.582,2.582,0,0,1-1.3,1.3A4.37,4.37,0,0,1,11.746,16,3.681,3.681,0,0,1,9.88,15.54a3.2,3.2,0,0,1-1.237-1.271A3.843,3.843,0,0,1,8.2,12.4a3.88,3.88,0,0,1,.456-1.926A3.191,3.191,0,0,1,9.919,9.214a3.792,3.792,0,0,1,1.853-.443,4.716,4.716,0,0,1,1.767.364,2.622,2.622,0,0,1,1.383,1.3l-.5.5V9.461a.4.4,0,0,1,.4-.4h.232a.4.4,0,0,1,.4.4v3.518a2.723,2.723,0,0,0,.529,1.674,2.173,2.173,0,0,0,1.853.708,2.281,2.281,0,0,0,1.323-.41,2.938,2.938,0,0,0,.967-1.178,4.947,4.947,0,0,0,.437-1.852,9.439,9.439,0,0,0-.417-3.574A7.285,7.285,0,0,0,18.5,5.588a7.424,7.424,0,0,0-2.679-1.78,9.605,9.605,0,0,0-3.547-.622,9.041,9.041,0,0,0-3.758.741,8.252,8.252,0,0,0-2.773,2,8.8,8.8,0,0,0-1.72,2.838,9.27,9.27,0,0,0-.589,3.262,8.568,8.568,0,0,0,.682,3.408A8.951,8.951,0,0,0,6,18.24a8.707,8.707,0,0,0,2.785,1.892,8.515,8.515,0,0,0,3.389.682,9.851,9.851,0,0,0,2.679-.378,8.451,8.451,0,0,0,2-.831.4.4,0,0,1,.553.158l.1.192a.4.4,0,0,1-.141.526,9.832,9.832,0,0,1-2.391,1.04A10.5,10.5,0,0,1,12.09,21.925ZM11.8,14.859a2.469,2.469,0,0,0,1.786-.649,2.427,2.427,0,0,0,.675-1.839,2.414,2.414,0,0,0-.7-1.886A2.532,2.532,0,0,0,11.8,9.856a2.482,2.482,0,0,0-1.839.649,2.523,2.523,0,0,0-.65,1.866,2.4,2.4,0,0,0,.682,1.865A2.574,2.574,0,0,0,11.8,14.859Z"></path> </g></svg>
							Brands
							</div>
							<a class="font-base underline text-xl" href="/brand/nike">Nike</a>
							<a class="font-base underline text-xl" href="/brand/adidas">Adidas</a>
							<a class="font-base underline text-xl" href="/brand/puma">Puma</a>
							<a class="font-base underline text-xl" href="/brand/under-armour">Under Armour</a>
						</div>
						<div class="grid grid-cols-1 p-2">
							<div class="font-semibold text-4xl flex">
							<svg fill="#000000" class="h-8 mb-3 mr-3 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#000000" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g> <g id="SVGRepoEditor" data-name="Box List"> <path d="M6.562,8.062h-2a1.5,1.5,0,0,1-1.5-1.5v-2a1.5,1.5,0,0,1,1.5-1.5h2a1.5,1.5,0,0,1,1.5,1.5v2A1.5,1.5,0,0,1,6.562,8.062Zm-2-4a.5.5,0,0,0-.5.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.5-.5v-2a.5.5,0,0,0-.5-.5Z"></path> <path d="M6.562,20.938h-2a1.5,1.5,0,0,1-1.5-1.5v-2a1.5,1.5,0,0,1,1.5-1.5h2a1.5,1.5,0,0,1,1.5,1.5v2A1.5,1.5,0,0,1,6.562,20.938Zm-2-4a.5.5,0,0,0-.5.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.5-.5v-2a.5.5,0,0,0-.5-.5Z"></path> <path d="M6.562,14.5h-2a1.5,1.5,0,0,1-1.5-1.5V11a1.5,1.5,0,0,1,1.5-1.5h2a1.5,1.5,0,0,1,1.5,1.5v2A1.5,1.5,0,0,1,6.562,14.5Zm-2-4a.5.5,0,0,0-.5.5v2a.5.5,0,0,0,.5.5h2a.5.5,0,0,0,.5-.5V11a.5.5,0,0,0-.5-.5Z"></path> <path d="M20.438,6.062h-9a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1Z"></path> <path d="M20.438,12.5h-9a.5.5,0,0,1,0-1h9a.5.5,0,0,1,0,1Z"></path> <path d="M20.438,18.935h-9a.5.5,0,1,1,0-1h9a.5.5,0,0,1,0,1Z"></path> </g></svg>                  Collections
							</div>
							<a class="font-base underline text-xl" href="/collection/puma-capro">Puma Ca Pro</a>
							<a class="font-base underline text-xl" href="/collection/nike-flyknit">Nike Flyknit</a>
							<a class="font-base underline text-xl" href="/collection/adidas-nmd">Adidas NMD</a>
							<a class="font-base underline text-xl" href="/collection/puma-mb02">Puma MB.02</a>
						</div>
					</div>
				</div>
				</li>
				<li class="m-auto py-6 px-4 lg:p-6"><a href="/about">About</a></li>
				<li class="m-auto py-6 px-4 lg:p-6"><a href="/contact">Contact</a></li>
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
						<svg viewBox="0 0 24 24" fill="none" width="75%" height="75%" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="6" r="4" stroke="#1C274C" stroke-width="1"></circle> <path d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18" stroke="#1C274C" stroke-width="1" stroke-linecap="round"></path> </g></svg>
					</label>
				</a>
				<div class="dropdown dropdown-end">
					<label tabindex={0} class="btn btn-ghost btn-circle">
						<div class="indicator">
							<svg fill="#000000" version="1.1" width="25" height="25" id="Capa_1" viewBox="0 0 490 490" stroke="#000000" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_25_" d="M316.554,108.336c4.553,6.922,2.629,16.223-4.296,20.774c-3.44,2.261-6.677,4.928-9.621,7.929 c-2.938,2.995-6.825,4.497-10.715,4.497c-3.791,0-7.585-1.427-10.506-4.291c-5.917-5.801-6.009-15.298-0.207-21.212 c4.439-4.524,9.338-8.559,14.562-11.992C302.698,99.491,312.002,101.414,316.554,108.336z M447.022,285.869 c-1.506,1.536-148.839,151.704-148.839,151.704C283.994,452.035,265.106,460,245,460s-38.994-7.965-53.183-22.427L42.978,285.869 c-57.304-58.406-57.304-153.441,0-211.847C70.83,45.634,107.882,30,147.31,30c36.369,0,70.72,13.304,97.69,37.648 C271.971,43.304,306.32,30,342.689,30c39.428,0,76.481,15.634,104.332,44.021C504.326,132.428,504.326,227.463,447.022,285.869z M425.596,95.028C403.434,72.44,373.991,60,342.69,60c-31.301,0-60.745,12.439-82.906,35.027c-1.122,1.144-2.129,2.533-3.538,3.777 c-7.536,6.654-16.372,6.32-22.491,0c-1.308-1.352-2.416-2.633-3.538-3.777C208.055,72.44,178.612,60,147.31,60 c-31.301,0-60.744,12.439-82.906,35.027c-45.94,46.824-45.94,123.012,0,169.836c1.367,1.393,148.839,151.704,148.839,151.704 C221.742,425.229,233.02,430,245,430c11.98,0,23.258-4.771,31.757-13.433l148.839-151.703l0,0 C471.535,218.04,471.535,141.852,425.596,95.028z M404.169,116.034c-8.975-9.148-19.475-16.045-31.208-20.499 c-7.746-2.939-16.413,0.953-19.355,8.698c-2.942,7.744,0.953,16.407,8.701,19.348c7.645,2.902,14.521,7.431,20.436,13.459 c23.211,23.658,23.211,62.153,0,85.811l-52.648,53.661c-5.803,5.915-5.711,15.412,0.206,21.212 c2.921,2.863,6.714,4.291,10.506,4.291c3.889,0,7.776-1.502,10.714-4.497l52.648-53.661 C438.744,208.616,438.744,151.275,404.169,116.034z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g></svg>
							{ user.Favourites &&
								<span class="badge badge-sm bg-blue-900 indicator-item rounded-lg">{user.Favourites.length}</span>
							}
						</div>
					</label>
					<div tabindex={0} class="mt-3 card card-compact dropdown-content w-96 bg-base-100 shadow p-4">
					{ user && 
						<>
							{ user.Favourites ?
								<>
									<span class="font-bold text-xl">{user.Favourites.length} Items</span>
									{user.Favourites.map(product => (
										<div class="grid grid-cols-6">
											<a href={"/product/" + product.urlslug} class="transition ease-in-out delay-15 duration-300 py-2 col-span-5">
												<div class="text-lg">
													<h2 class="text-lg">{product.name}</h2>
													<div class="badge badge-secondary">£{product.price}</div>
												</div>
											</a>
											{removeCartLoading ?
												<div class="m-auto">
													<LoadingSpinner width="2rem" height="2rem" />
												</div>
												:
												<a onClick={async ()=> updateFavourites(await FavouriteToggle(product.urlslug), setUser)} class="m-auto">
													<svg class="h-6 w-6 hover:cursor-pointer" fill="#000000" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"><path d="M512.481 421.906L850.682 84.621c25.023-24.964 65.545-24.917 90.51.105s24.917 65.545-.105 90.51L603.03 512.377 940.94 850c25.003 24.984 25.017 65.507.033 90.51s-65.507 25.017-90.51.033L512.397 602.764 174.215 940.03c-25.023 24.964-65.545 24.917-90.51-.105s-24.917-65.545.105-90.51l338.038-337.122L84.14 174.872c-25.003-24.984-25.017-65.507-.033-90.51s65.507-25.017 90.51-.033L512.48 421.906z"></path></g></svg>
												</a>
											}
										</div>
									))}
								</>
								:
								<>
									<span class="font-bold text-lg">0 Items</span>
								</>
							}
						</>
					}
					</div>
				</div>
				<div class="dropdown dropdown-end">
					<label tabindex={0} class="btn btn-ghost btn-circle">
						<div class="indicator">
							<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
								<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
							</svg>
							{ user.Cart &&
								<span class="badge badge-sm bg-blue-900 indicator-item rounded-lg">{user.Cart.length}</span>
							}
						</div>
					</label>
					<div tabindex={0} class="mt-3 card card-compact dropdown-content w-96 bg-base-100 shadow p-4">
						{ user && 
							<>
								{ user.Cart ?
									<>
										<span class="text-info">Subtotal: {subtotal}</span>
										<span class="font-bold text-xl">{user.Cart.length} Items</span>
										{user.Cart.map(product => (
											<div class="grid grid-cols-6">
												<a href={"/product/" + product.urlslug} class="transition ease-in-out delay-15 duration-300 py-2 col-span-5">
													<div class="text-lg">
														<h2 class="text-lg">{product.name}</h2>
														<p class="badge badge-secondary">£{product.price}</p>
														<p class="badge badge-secondary ml-2">Size - {product.size}</p>
														<p class="badge badge-secondary ml-2">Quantity - {product.quantity}</p>
													</div>
												</a>
												{removeCartLoading ?
													<div class="m-auto">
														<LoadingSpinner width="2rem" height="2rem" />
													</div>
													:
													<a onClick={async ()=> { setRemoveCartLoading(true); updateCart(await RemoveFromCart(product.urlslug, product.quantity, product.size), setUser, setRemoveCartLoading)}} class="m-auto">
														<svg class="h-6 w-6 hover:cursor-pointer" fill="#000000" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"><path d="M512.481 421.906L850.682 84.621c25.023-24.964 65.545-24.917 90.51.105s24.917 65.545-.105 90.51L603.03 512.377 940.94 850c25.003 24.984 25.017 65.507.033 90.51s-65.507 25.017-90.51.033L512.397 602.764 174.215 940.03c-25.023 24.964-65.545 24.917-90.51-.105s-24.917-65.545.105-90.51l338.038-337.122L84.14 174.872c-25.003-24.984-25.017-65.507-.033-90.51s65.507-25.017 90.51-.033L512.48 421.906z"></path></g></svg>
													</a>
												}
											</div>
										))}
									</>
									:
									<>
										<span class="font-bold text-lg">0 Items</span>
									</>
								}
							</>
						}
						<div class="card-actions py-2">
							<a href="/cart"><button class="btn btn-block bg-gradient-to-r from-blue-500 to-blue-900 border-0">View cart</button></a>
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
	filteredSuggestions.unshift({Name: "Custom Search", URLSlug: "custom-search"});
	if (filteredSuggestions.length > 10) {
		filteredSuggestions = filteredSuggestions.slice(0, 10);
	}
	return filteredSuggestions;
}

const Autocomplete = ({ suggestions }) => {
	const [filteredSuggestions, setFilteredSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const [userInput, setUserInput] = useState("");
	const [activeSuggestion, setActiveSuggestion] = useState(0);
  
	const onChange = (e) => {
	  const userInput = e.target.value;
	  setUserInput(userInput);
	  setFilteredSuggestions(filterSuggestions(suggestions, userInput));
	  setShowSuggestions(true);
	  setActiveSuggestion(0);
	};
  
	const onClick = (e) => {
	  setUserInput(e.currentTarget.getAttribute('data-name'));
	  setShowSuggestions(false);
	};
  
	const onKeyDown = (e) => {
		if (e.key === 'Enter') {
			const filteredSuggestions = filterSuggestions(suggestions, userInput);
			// console.log(showSuggestions, userInput, filteredSuggestions)
			if (filteredSuggestions.length == 2 && !showSuggestions) {
				window.location.href = `/product/${filteredSuggestions[1].URLSlug}`;
				// console.log(filteredSuggestions[0].URLSlug)
			} else if (showSuggestions) {
				if (filteredSuggestions[activeSuggestion].Name == "Custom Search") {
					window.location.href = `/shop?query=${userInput}`;
				} else {
					window.location.href = `/product/${filteredSuggestions[activeSuggestion].URLSlug}`;
				}
			} else {
				window.location.href = `/shop?query=${userInput}`;
				// console.log(userInput)
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
	  return filteredSuggestions.length ? (
		<ul className="suggestions bg-white border border-gray-300 rounded mt-2 absolute z-10 w-52">
		  {filteredSuggestions.map((suggestion, index) => {
			const className = index === activeSuggestion ? "suggestion-active bg-blue-200" : "";
			return (
			  <li key={index} data-name={suggestion.Name} onClick={onClick} className={`p-2 cursor-pointer ${className}`}>
				{suggestion.Name}
			  </li>
			);
		  })}
		</ul>
	  ) : (
		<div className="no-suggestions p-2">
		  <em>No suggestions!</em>
		</div>
	  );
	};
  
	return (
	  <div className="relative">
		<input
		  type="text"
		  className="rounded-lg p-2 bg-slate-200 w-52"
		  placeholder="Search..."
		  onChange={onChange}
		  onKeyDown={onKeyDown}
		  value={userInput}
		  aria-autocomplete="list"
		  aria-controls="autocomplete-list"
		  aria-activedescendant={`autocomplete-item-${activeSuggestion}`}
		/>
		{showSuggestions && userInput && (
		  <SuggestionsListComponent />
		)}
	  </div>
	);
};
  
export default Autocomplete;