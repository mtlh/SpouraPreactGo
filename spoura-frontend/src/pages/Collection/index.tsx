import { useLocation } from "preact-iso";
import { useEffect, useState } from "preact/hooks";
import { LoadingSpinnerCenter } from "../../components/LoadingSpinner";

export function Collection () {
	const [collectionData, setCollectionData] = useState(null);
	const [error, setError] = useState(null);

    const urlslug = useLocation().path.split("/")
  
	useEffect(() => {
	  fetch('https://spoura-go-api.vercel.app/api/collection/' + urlslug[urlslug.length-1])
		.then(response => {
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  return response.json();
		})
		.then(data => {
            setCollectionData(data);
		})
		.catch(error => {
		    setError(error.message);
		});
	}, []);
  
	if (error) {
	  return <div>Error: {error}</div>;
	}
  
	if (!collectionData) {
	  return <LoadingSpinnerCenter />
	}
  
	return (
	   <>
            {collectionData.name ?
                <>
                <div class="hero backdrop-brightness-50 bg-fixed bg-center bg-cover" style={{backgroundImage: `url(${collectionData.imgURL})`, minHeight: '30vh'}}>
                    <div class="hero-overlay bg-opacity-40 bg-blend-darken"></div>
                    <div class="hero-content grid grid-cols-1 lg:flex-row-reverse">
                        <h1 class="font-bold text-white text-8xl">{collectionData.name}</h1>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center md:p-14 m-auto max-w-7xl items-stretch">
                    <p class="col-span-3 m-auto mb-2 px-10 text-lg font-semibold">{collectionData.description}</p>
                    <h2 class="col-span-3 mt-12 px-10 text-4xl text-blue-500 font-extrabold">Products</h2>
                    <div class="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center m-auto items-stretch my-2 gap-8">
                        {collectionData.products ?
                            <>
                                {collectionData.products.map(product => 
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
                            <p>No products found in this collection.</p>
                        }
                    </div>
                </div>
                </>
                : 
                <p>Not a valid collection name.</p>
            }
		</>
	);
};