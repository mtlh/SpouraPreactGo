import { useEffect, useState } from "preact/hooks";
import { UserProp } from "../../components/types";
import { updateCart } from "../Product";
import { RemoveFromCart } from "../../components/CartAction";

export function Cart ({user, setuser}: UserProp) {

    const [subtotal, setSubtotal] = useState(0);
	useEffect(() => {
		let runningtotal = 0;
		for (let x in user.Cart) {
            // @ts-ignore
			runningtotal += parseFloat(user.Cart[x].price)
		}
		setSubtotal(runningtotal)
	}, [user]);
    
    return (
        <>
            <div class="grid grid-cols-1">
                { user.Cart ?
                    <h1 class="text-center my-6 font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">Cart - {user.Cart.length} Item(s)</h1>
                :
                    <h1 class="text-center my-6 font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">Cart - 0 Item(s)</h1>
                }
                <p class="text-3xl my-2 m-auto text-center">Subtotal: £{subtotal}</p>
                <a href="/checkout" class="m-auto text-center"><button class="btn bg-gradient-to-r from-blue-500 to-blue-900 border-0 rounded-lg m-auto text-center">Checkout</button></a>
            </div>
            <div class="relative p-4 max-w-6xl m-auto">
                {user.Cart &&
                    <>
                        {user.Cart.map((product) => (
                            <div class="grid grid-cols-1 md:grid-cols-3 shadow-lg ring-1 ring-slate-400 p-4 rounded-lg my-2">
                                <img src={product.imgurl} alt={product.name} class="w-60 m-auto" />
                                <div>
                                    <div class="text-3xl m-auto">
                                        <a href={`/product/${product.urlslug}`} data-sveltekit-reload class="transition ease-in-out delay-15 duration-300">
                                            <h2 class="w-full">{product.name}</h2>
                                            <div class="badge badge-secondary text-xl p-4">£{product.price}</div>
                                            <div class="hidden">{product.price}</div>
                                        </a>
                                    </div>
                                    <div class="grid grid-cols-2 p-2 gap-4">
                                        <div>
                                            <p class="p-2">Quantity: </p>
                                            <div class="flex space-x-2 rounded-xl bg-gray-200 p-2 w-40 justify-center">
                                                <span class="w-4 p-2">{product.quantity}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="p-2">Size: </p>
                                            <div class="flex space-x-2 rounded-xl bg-gray-200 p-2 w-40 justify-center">
                                                <span class="w-4 p-2">{product.size}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a onClick={async ()=> updateCart(await RemoveFromCart(product.urlslug, product.quantity, product.size), setuser)} class="m-auto hover:cursor-pointer">
                                    <svg class="h-5 w-5" fill="#000000" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"><path d="M512.481 421.906L850.682 84.621c25.023-24.964 65.545-24.917 90.51.105s24.917 65.545-.105 90.51L603.03 512.377 940.94 850c25.003 24.984 25.017 65.507.033 90.51s-65.507 25.017-90.51.033L512.397 602.764 174.215 940.03c-25.023 24.964-65.545 24.917-90.51-.105s-24.917-65.545.105-90.51l338.038-337.122L84.14 174.872c-25.003-24.984-25.017-65.507-.033-90.51s65.507-25.017 90.51-.033L512.48 421.906z"></path></g></svg>
                                </a>
                            </div> 
                        ))}
                    </>    
                }
            </div>
        </>
    )
}