import { useLocation } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { LoadingSpinnerCenter } from "../../components/LoadingSpinner";

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
	  return <div>Error: {error}</div>;
	}
  
	if (!brandData) {
	  return <LoadingSpinnerCenter />
	}

  	return (
	   <>
            {brandData.name ?
                <>
                <div class="hero">
                    <div class="hero-content flex items-center justify-center p-0">
                        <h1 class="font-bold text-black text-8xl">{brandData.name}</h1>
                        <img src={brandData.imgurl} class="w-60 h-60 bg-contain bg-center" alt="Brand Logo" />
                    </div>
                </div>
                <p class="m-auto mb-2 px-10 mt-6 text-lg font-semibold text-center">{brandData.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 justify-center m-auto max-w-7xl items-stretch my-8">
                    {
                        brandData.Collection ?
                        <>
                            {brandData.Collection.map(collection => 
                                <a href={`/collection/${collection.urlslug}`}>
                                    <div class="card-zoom">
                                        <div class="card-zoom-image" style={{ backgroundImage: `url(${collection.imgURL})` }}></div>
                                        <h1 class="card-zoom-text">{collection.name}</h1>
                                    </div>
                                </a>
                            )}
                        </>
                        :
                        <p>No collections found for this brand.</p>
                    }
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center m-auto max-w-7xl items-stretch">
                    <h2 class="col-span-3 mt-12 px-10 text-4xl text-blue-500 font-extrabold">Products</h2>
                    <div class="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center m-auto items-stretch my-2 gap-14">
                        {brandData.Products ?
                            <>
                                {brandData.Products.map(product => 
                                    <div class="my-6 hover:scale-105 ease-in-out transition">
                                    <a href={"/product/" + product.URLSlug} class="m-auto">
                                        <div class="card h-72 w-80 bg-center bg-cover -z-10" style={{ backgroundImage: 'url(' + product.ImgURL + ')'}}>
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
                                </div>
                                )}
                            </>
                            :
                            <p>No products found for this brand.</p>
                        }
                    </div>
                </div>
                </>
                : 
                <p>Not a valid brand name.</p>
            }
		</>
	);
};