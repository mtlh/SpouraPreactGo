import { useLocation } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { FavouriteToggle } from "../../components/FavouriteToggle";
import { AddToCart } from "../../components/CartAction";

export function Product ({user, setUser, loading}) {
	const [productData, setProductData] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(12);
	const [error, setError] = useState(null);

    const urlslug = useLocation().path.split("/")
  
	useEffect(() => {
	  fetch('https://spoura-go-api.vercel.app/api/product/' + urlslug[urlslug.length-1])
		.then(response => {
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  return response.json();
		})
		.then(data => {
            setProductData(data);
		})
		.catch(error => {
		    setError(error.message);
		});
	}, []);

    const [isFavourite, setIsFavourite] = useState(false);
    useEffect(() => {
        if (user.Favourites != null) {
            setIsFavourite(user.Favourites.some(item => item.urlslug === urlslug[urlslug.length-1]))
        }
    }, [user])
  
	if (error) {
	  return <div>Error: {error}</div>;
	}
  
	if (!productData) {
	  return <div class="h-[100vh]">
		<svg class="animate-spin h-12 w-12 text-blue-700 m-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
		</div>;
	}
  
	return (
	   <>
			<div class="p-6 m-auto grid grid-cols-1 md:grid-cols-2 max-w-7xl min-h-screen">
                <img src={productData.ImgURL} alt={productData.Name} class="w-full h-auto ring-2 ring-blue-500 rounded-lg" />
                <div class="mx-6 my-2">
                    <h1 class="text-4xl font-semibold pb-4">{productData.Name}</h1>
                    {productData.Type == "m" &&
                        <div class="badge bg-blue-700 text-lg border-0 p-4">Mens</div>
                    }
                    {productData.Type == "k" &&
                        <div class="badge bg-blue-700 text-lg border-0 p-4">Kids</div>
                    }
                    {productData.Type == "w" &&
                        <div class="badge bg-blue-700 text-lg border-0 p-4">Women</div>
                    }
                    <div class="badge badge-secondary text-lg border-0 p-4 mx-2">£{productData.Price}</div>
                    <div class="flex space-x-2 rounded-xl py-4 m-auto">
                        <p>{productData.Description}</p>
                    </div>
                    {productData.Collection != null &&
                        <p>Collection: <a class="hover:underline" href={"/collection/" + productData.Collection}>{productData.Collection}</a></p>
                    }
                    {/* <div class="flex pt-4 pb-4">
                        <div class="rating">
                            {#each [1, 2, 3, 4, 5] as rating}
                                {#if rating == stars}
                                    <input type="radio" name="rating-1" class="mask mask-star" checked disabled />
                                {:else}
                                    <input type="radio" name="rating-1" class="mask mask-star" disabled />
                                {/if}
                            {/each}
                        </div>
                        <div class="text-lg font-semibold">({reviewcount})</div>
                    </div> */}
                    <p class="p-2">Size (UK): </p>
                    <div class="grid grid-cols-4 space-x-2 rounded-xl bg-gray-200 p-2 m-auto">
                        {[4, 5, 6, 8, 9, 10, 11, 12].map(sizeNum => (
                            <div onClick={()=> setSize(sizeNum)}>
                                { size == sizeNum ?
                                    <input type="radio" name="option" id={sizeNum.toString()} class="peer hidden" checked />
                                :
                                    <input type="radio" name="option" id={sizeNum.toString()} class="peer hidden" />
                                }
                                <label for={sizeNum.toString()} class="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">{sizeNum}</label>
                            </div>
                        ))}
                    </div>
                    <p class="p-2">Quantity: </p>
                    <div class="flex space-x-2 rounded-xl bg-gray-200 p-2 w-40 justify-center">
                        <button class="w-4 p-2" onClick={()=> setQuantity(quantity-1)}>-</button>
                        <span class="w-4 p-2">{quantity}</span>
                        <button class="w-4 p-2" onClick={()=> setQuantity(quantity+1)}>+</button>
                    </div>
                    <div class="flex space-x-2 rounded-xl p-2 m-auto">
                        <button 
                            onClick={async ()=> updateCart(await AddToCart(productData.URLSlug, quantity, size), setUser)}
                            class="btn bg-gradient-to-r from-blue-500 to-blue-900 text-white rounded-lg hover:scale-110 border-0 py-2 px-4 my-4">
                                ADD TO CART
                        </button>
                        <label tabindex={0} class="btn btn-ghost btn-circle py-2 px-4 my-4">
                            <div class="indicator">
                                {isFavourite ?
                                    <svg onClick={async ()=> updateFavourites(await FavouriteToggle(productData.URLSlug), setUser)} fill="#880808" version="1.1" width="30" height="30" id="favourite" viewBox="0 0 490 490" stroke="#000000" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_25_" d="M316.554,108.336c4.553,6.922,2.629,16.223-4.296,20.774c-3.44,2.261-6.677,4.928-9.621,7.929 c-2.938,2.995-6.825,4.497-10.715,4.497c-3.791,0-7.585-1.427-10.506-4.291c-5.917-5.801-6.009-15.298-0.207-21.212 c4.439-4.524,9.338-8.559,14.562-11.992C302.698,99.491,312.002,101.414,316.554,108.336z M447.022,285.869 c-1.506,1.536-148.839,151.704-148.839,151.704C283.994,452.035,265.106,460,245,460s-38.994-7.965-53.183-22.427L42.978,285.869 c-57.304-58.406-57.304-153.441,0-211.847C70.83,45.634,107.882,30,147.31,30c36.369,0,70.72,13.304,97.69,37.648 C271.971,43.304,306.32,30,342.689,30c39.428,0,76.481,15.634,104.332,44.021C504.326,132.428,504.326,227.463,447.022,285.869z M425.596,95.028C403.434,72.44,373.991,60,342.69,60c-31.301,0-60.745,12.439-82.906,35.027c-1.122,1.144-2.129,2.533-3.538,3.777 c-7.536,6.654-16.372,6.32-22.491,0c-1.308-1.352-2.416-2.633-3.538-3.777C208.055,72.44,178.612,60,147.31,60 c-31.301,0-60.744,12.439-82.906,35.027c-45.94,46.824-45.94,123.012,0,169.836c1.367,1.393,148.839,151.704,148.839,151.704 C221.742,425.229,233.02,430,245,430c11.98,0,23.258-4.771,31.757-13.433l148.839-151.703l0,0 C471.535,218.04,471.535,141.852,425.596,95.028z M404.169,116.034c-8.975-9.148-19.475-16.045-31.208-20.499 c-7.746-2.939-16.413,0.953-19.355,8.698c-2.942,7.744,0.953,16.407,8.701,19.348c7.645,2.902,14.521,7.431,20.436,13.459 c23.211,23.658,23.211,62.153,0,85.811l-52.648,53.661c-5.803,5.915-5.711,15.412,0.206,21.212 c2.921,2.863,6.714,4.291,10.506,4.291c3.889,0,7.776-1.502,10.714-4.497l52.648-53.661 C438.744,208.616,438.744,151.275,404.169,116.034z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g></svg>
                                :
                                    <svg onClick={async ()=> updateFavourites(await FavouriteToggle(productData.URLSlug), setUser)} fill="#000000" version="1.1" width="30" height="30" id="favourite" viewBox="0 0 490 490" stroke="#000000" stroke-width="0"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_25_" d="M316.554,108.336c4.553,6.922,2.629,16.223-4.296,20.774c-3.44,2.261-6.677,4.928-9.621,7.929 c-2.938,2.995-6.825,4.497-10.715,4.497c-3.791,0-7.585-1.427-10.506-4.291c-5.917-5.801-6.009-15.298-0.207-21.212 c4.439-4.524,9.338-8.559,14.562-11.992C302.698,99.491,312.002,101.414,316.554,108.336z M447.022,285.869 c-1.506,1.536-148.839,151.704-148.839,151.704C283.994,452.035,265.106,460,245,460s-38.994-7.965-53.183-22.427L42.978,285.869 c-57.304-58.406-57.304-153.441,0-211.847C70.83,45.634,107.882,30,147.31,30c36.369,0,70.72,13.304,97.69,37.648 C271.971,43.304,306.32,30,342.689,30c39.428,0,76.481,15.634,104.332,44.021C504.326,132.428,504.326,227.463,447.022,285.869z M425.596,95.028C403.434,72.44,373.991,60,342.69,60c-31.301,0-60.745,12.439-82.906,35.027c-1.122,1.144-2.129,2.533-3.538,3.777 c-7.536,6.654-16.372,6.32-22.491,0c-1.308-1.352-2.416-2.633-3.538-3.777C208.055,72.44,178.612,60,147.31,60 c-31.301,0-60.744,12.439-82.906,35.027c-45.94,46.824-45.94,123.012,0,169.836c1.367,1.393,148.839,151.704,148.839,151.704 C221.742,425.229,233.02,430,245,430c11.98,0,23.258-4.771,31.757-13.433l148.839-151.703l0,0 C471.535,218.04,471.535,141.852,425.596,95.028z M404.169,116.034c-8.975-9.148-19.475-16.045-31.208-20.499 c-7.746-2.939-16.413,0.953-19.355,8.698c-2.942,7.744,0.953,16.407,8.701,19.348c7.645,2.902,14.521,7.431,20.436,13.459 c23.211,23.658,23.211,62.153,0,85.811l-52.648,53.661c-5.803,5.915-5.711,15.412,0.206,21.212 c2.921,2.863,6.714,4.291,10.506,4.291c3.889,0,7.776-1.502,10.714-4.497l52.648-53.661 C438.744,208.616,438.744,151.275,404.169,116.034z"></path> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </g></svg>
                                }
                            </div>
                        </label>
                    </div>
                </div>
            </div>
		</>
	);
  };
  
export const updateFavourites = (newFavourites, setUser) => {
    setUser((prevUser) => ({
        ...prevUser,
        Favourites: newFavourites,
    }));
};

export const updateCart = (newCart, setUser) => {
    setUser((prevUser) => ({
        ...prevUser,
        Cart: newCart,
    }));
};
