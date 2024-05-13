import { useEffect, useState } from "preact/hooks";
import { UserOnlyProp } from "../../components/types";

export function Checkout ({user}: UserOnlyProp) {

    const [cartTotal, setCartTotal] = useState<number>(0);
    useEffect(() => {
        let runningtotal = 0;
        for (let x in user.Cart) {
            // @ts-ignore
            runningtotal += parseFloat(user.Cart[x].price)
        }
        setCartTotal(runningtotal)
    }, []);

    return (
        <>
            <div class="grid grid-cols-1 md:grid-cols-2">
                <div>
                    <div class="form-control">
                        <div class="px-4 mt-10 grid grid-cols-1">
                            <p class="px-2 text-2xl">Basic Details</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 p-4">
                            <label class="input-group input-group-vertical p-2">
                                <span>Name</span>
                                <input type="text" placeholder="Matthew Harvey" class="input input-bordered" />
                            </label>
                            <label class="input-group input-group-vertical p-2">
                                <span>Email</span>
                                <input type="text" placeholder="matthewtlharvey@gmail.com" class="input input-bordered" />
                            </label>
                        </div>
                        <div class="px-4 grid grid-cols-1">
                            <p class="px-2 text-2xl">Shipping Address</p>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 p-4">
                            <label class="input-group input-group-vertical p-2">
                                <span>Flat/House Number</span>
                                <input type="number" placeholder="11" class="input input-bordered" />
                            </label>
                            <label class="input-group input-group-vertical p-2">
                                <span>Street</span>
                                <input type="text" placeholder="Example Road" class="input input-bordered" />
                            </label>
                            <label class="input-group input-group-vertical p-2">
                                <span>Postcode</span>
                                <input type="text" placeholder="TE5 ST0" class="input input-bordered" />
                            </label>
                            <label class="input-group input-group-vertical p-2">
                                <span>Town/City</span>
                                <input type="text" placeholder="London" class="input input-bordered" />
                            </label>
                            <label class="input-group input-group-vertical p-2">
                                <span>Country</span>
                                <input type="text" placeholder="United Kingdom" class="input input-bordered" />
                            </label>
                        </div>
                        <div class="m-auto my-6">
                            <button class="btn bg-gradient-to-r from-blue-500 to-blue-900 border-0 rounded-lg m-auto text-center">Checkout</button>
                        </div>
                    </div>
                </div>
                <div class="relative p-10 max-w-6xl m-auto">
                    {user.Cart ?
                        <h1 class="text-center my-2 font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">Checkout - {user.Cart.length} Item(s)</h1>
                    :
                        <h1 class="text-center my-2 font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-500 to-blue-900">Checkout - 0 Item(s)</h1>
                    }
                    <p class="text-2xl my-2 m-auto text-center">Subtotal: £{cartTotal}</p>
                    <a href="/cart"><h2 class="text-center my-2 font-base underline text-xl hover:scale-110 transition ease-in-out delay-15 duration-300" >Back to cart</h2></a>
                    {user.Cart &&
                        <>
                            {user.Cart.map((product) => (
                                <div class="grid grid-cols-3 rounded-lg">
                                    <img src={product.imgurl} alt={product.name} class="w-60 h-auto m-auto" />
                                    <div class="text-2xl m-auto">
                                        <a href={`/product/${product.urlslug}`} data-sveltekit-reload class="transition ease-in-out delay-15 duration-300">
                                            <h2 class="w-full">{product.name}</h2>
                                            <div class="badge badge-secondary text-xl p-4">£{product.price}</div>
                                            <div class="hidden">{product.price}</div>
                                        </a>
                                    </div>
                                    <div class="text-2xl m-auto">
                                        <p>Quantity: {product.quantity}</p>
                                        <p>Size: {product.size}</p>
                                    </div>
                                </div>
                            ))}
                        </>
        }
                </div>
            </div>
        </>
    )
}