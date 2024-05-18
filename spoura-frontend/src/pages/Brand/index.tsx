import { useLocation } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { LoadingSpinnerCenter } from "../../components/LoadingSpinner";
import ProductReusable from "../../components/Product";

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
                    <div class="hero-content flex items-center justify-center p-0 mt-4">
                        <h1 class="font-bold text-black md:text-8xl text-5xl">{brandData.name}</h1>
                        <img src={brandData.imgurl} class="md:w-60 md:h-60 w-40 h-40 bg-contain bg-center" alt="Brand Logo" />
                    </div>
                </div>
                <p class="m-auto mb-2 px-10 mt-6 text-lg font-semibold text-center">{brandData.description}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 justify-center m-auto max-w-7xl items-stretch my-8">
                    {
                        brandData.Collection &&
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
                    }
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center m-auto max-w-7xl items-stretch">
                    <h2 class="col-span-3 mt-12 px-10 text-4xl text-blue-500 font-extrabold">Products</h2>
                    <div class="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center m-auto items-stretch my-2 gap-2">
                        {brandData.Products ?
                            <>
                                {brandData.Products.map(product => 
                                    <ProductReusable product={product} />
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