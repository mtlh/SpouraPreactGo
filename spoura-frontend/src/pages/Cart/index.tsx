import { useEffect, useState } from "preact/hooks";
import { UserProp } from "../../components/types";
import { updateCart } from "../Product";
import { RemoveFromCart } from "../../components/CartAction";

export function Cart ({user, setuser}: UserProp) {

    const [subtotal, setSubtotal] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [, setRemoveLoading] = useState(false);

	useEffect(() => {
		let runningtotal = 0;
		let count = 0;
		for (let x in user.Cart) {
            // @ts-ignore
			runningtotal += parseFloat(user.Cart[x].price) * parseInt(user.Cart[x].quantity);
            // @ts-ignore
            count += parseInt(user.Cart[x].quantity);
		}
		setSubtotal(runningtotal);
        setItemCount(count);
	}, [user]);

    const shipping = subtotal > 50 ? 0 : 4.99;
    const total = subtotal + shipping;

    const formatPrice = (price: number) => {
        return price.toFixed(2);
    };

    if (!user.Cart || user.Cart.length === 0) {
        return (
            <div class="min-h-[60vh] flex flex-col items-center justify-center p-8">
                <svg class="w-32 h-32 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <h1 class="text-4xl font-bold text-gray-700 mb-4">Your cart is empty</h1>
                <p class="text-gray-500 text-lg mb-8">Looks like you haven't added any items yet.</p>
                <a href="/shop?query=&page=1&sort=any&type=all" class="btn bg-gradient-to-r from-blue-500 to-blue-900 border-0 rounded-lg text-white px-8 py-3 text-lg hover:opacity-90 transition-opacity">Start Shopping</a>
            </div>
        );
    }

    return (
        <>
            <div class="max-w-7xl mx-auto px-4 py-8">
                <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Shopping Cart</h1>
                <p class="text-gray-500 mb-8">{itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart</p>

                <div class="flex flex-col lg:flex-row gap-8">
                    {/* Cart Items */}
                    <div class="flex-1">
                        <div class="hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 rounded-t-lg text-sm font-semibold text-gray-600 uppercase tracking-wider">
                            <div class="col-span-5">Product</div>
                            <div class="col-span-2 text-center">Price</div>
                            <div class="col-span-2 text-center">Quantity</div>
                            <div class="col-span-2 text-center">Total</div>
                            <div class="col-span-1"></div>
                        </div>

                        {user.Cart.map((product) => (
                            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors items-center">
                                {/* Product Info */}
                                <div class="col-span-1 md:col-span-5 flex gap-4 items-center">
                                    <a href={`/product/${product.urlslug}`} data-sveltekit-reload class="shrink-0">
                                        <img src={product.imgurl} alt={product.name} class="w-24 h-24 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow" />
                                    </a>
                                    <div>
                                        <a href={`/product/${product.urlslug}`} data-sveltekit-reload class="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                                            {product.name}
                                        </a>
                                        <div class="mt-1 text-sm text-gray-500">
                                            {product.size && <span class="inline-block bg-gray-100 px-2 py-1 rounded text-xs mr-2">Size: {product.size}</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Price */}
                                <div class="col-span-1 md:col-span-2 text-center">
                                    <span class="md:hidden text-sm text-gray-500 mr-2">Price:</span>
                                    <span class="text-gray-700 font-medium">£{product.price}</span>
                                </div>

                                {/* Quantity */}
                                <div class="col-span-1 md:col-span-2 flex justify-center">
                                    <span class="md:hidden text-sm text-gray-500 mr-2">Qty:</span>
                                    <span class="inline-flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg font-medium text-gray-700">
                                        {product.quantity}
                                    </span>
                                </div>

                                {/* Line Total */}
                                <div class="col-span-1 md:col-span-2 text-center">
                                    <span class="md:hidden text-sm text-gray-500 mr-2">Total:</span>
                                    <span class="text-lg font-bold text-gray-900">£{formatPrice(parseFloat(product.price) * parseInt(product.quantity))}</span>
                                </div>

                                {/* Remove Button */}
                                <div class="col-span-1 flex justify-end">
                                    <button
                                        onClick={async () => updateCart(await RemoveFromCart(product.urlslug, product.quantity, product.size), setuser, setRemoveLoading)}
                                        class="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Remove item"
                                    >
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Continue Shopping */}
                        <div class="mt-6">
                            <a href="/shop?query=&page=1&sort=any&type=all" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
                                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                                </svg>
                                Continue Shopping
                            </a>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div class="lg:w-80">
                        <div class="bg-gray-50 rounded-xl p-6 sticky top-4">
                            <h2 class="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>

                            <div class="space-y-3 text-gray-600">
                                <div class="flex justify-between">
                                    <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                                    <span class="font-medium text-gray-900">£{formatPrice(subtotal)}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Shipping</span>
                                    <span class="font-medium text-gray-900">
                                        {shipping === 0 ? (
                                            <span class="text-green-600">FREE</span>
                                        ) : (
                                            `£{formatPrice(shipping)}`
                                        )}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p class="text-xs text-green-600 bg-green-50 p-2 rounded">
                                        Add £{formatPrice(50 - subtotal)} more for FREE shipping!
                                    </p>
                                )}
                            </div>

                            <div class="border-t border-gray-200 my-4"></div>

                            <div class="flex justify-between text-lg font-bold text-gray-900">
                                <span>Total</span>
                                <span>£{formatPrice(total)}</span>
                            </div>

                            <a href="/checkout" class="block w-full btn bg-gradient-to-r from-blue-500 to-blue-900 border-0 rounded-lg text-white text-center mt-6 py-3 hover:opacity-90 transition-opacity font-semibold">
                                Proceed to Checkout
                            </a>

                            <div class="mt-4 flex items-center justify-center gap-2 text-gray-500 text-sm">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                                </svg>
                                Secure checkout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}