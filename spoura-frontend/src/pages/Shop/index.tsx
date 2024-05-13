import { useLocation } from "preact-iso"
import { useEffect, useState } from "preact/hooks";
import { LoadingSpinnerCenter } from "../../components/LoadingSpinner";

export function Shop ({user, setUser, loading}) {

    const [shopData, setShopData] = useState(null);
    const [allshopData, setAllShopData] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false)
	const [error, setError] = useState(null);
    
    const location = useLocation()
    let query = location.query["query"]
    if (!query) {
        query = ""
    }
    const [searchInput, setSearchInput] = useState(query);
    useEffect(() => {
        if (!searchLoading) {
            setSearchLoading(true)
            NewQuery(searchInput, setShopData, setAllShopData, setError, setSearchLoading)
        }
    }, [searchInput])

    let type = location.query["type"]
    if (!type) {
        type = "all"
    }
    const [typeInput, setTypeInput] = useState(type);
    useEffect(() => {
        if (shopData) {
            if (typeInput == "all") {
                setShopData(allshopData)
            } else {
                setShopData(allshopData.filter(item => item.Type === typeInput))
            }
        }
    }, [typeInput])
    
    let sort = useLocation().query["sort"]
    if (!sort) {
        sort = "any"
    }
    const [sortInput, setSortInput] = useState(sort);
    useEffect(() => {
        if (shopData) {
            if (sortInput == "lowHigh") {
                const sortedData = [...shopData].sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
                setShopData(sortedData);
            } else if (sortInput == "any") {
                setShopData(allshopData)
            } else if (sortInput == "highLow") {
                const sortedData = [...shopData].sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
                setShopData(sortedData);
            }
        }
    }, [sortInput])

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!shopData) {
        return <LoadingSpinnerCenter />
      }

    return (
        <div class="grid">
            <div class="lg:grid lg:fixed justify-center m-auto items-stretch max-w-7xl min-w-full bg-white sticky pt-4 z-10">
                <div class="grid grid-cols-1 md:grid-cols-3 p-2 gap-4">
                    {/* @ts-ignore */}
                    <input type="text" class="rounded-lg h-auto p-2 bg-slate-200 w-80" onChange={(event) => setSearchInput(event.target.value)} onKeyDown={(event) => {if(event.key === 'Enter'){{setSearchInput(event.target.value)}}}} value={searchInput} placeholder="Search..." />
                    {/* @ts-ignore */}
                    <select value={typeInput} onChange={(event) => setTypeInput(event.target.value)} class="rounded-lg h-auto p-2 bg-slate-200 w-80">
                        <option value="m">Mens</option>
                        <option value="w">Womens</option>
                        <option value="k">Kids</option>
                        <option value="all">All</option>
                    </select>
                    {/* <div id="brand" class="p-2"> */}
                        {/* <AutoComplete onChange={filterChange} items="{brand_arr}" bind:selectedItem="{brand_select}" placeholder="Brand" class="rounded-lg h-auto p-2 bg-slate-200 w-80" /> */}
                    {/* </div> */}
                    {/* @ts-ignore */}
                    <select value={sortInput} onChange={(event) => setSortInput(event.target.value)} class="rounded-lg h-auto p-2 bg-slate-200 w-80">
                        <option value="lowHigh">Low -{">"} High</option>
                        <option value="highLow">High -{">"} Low</option>
                        <option value="any">Any</option>
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 justify-center m-auto items-stretch mt-10 max-w-7xl">
                {!searchLoading ?
                    <>
                        {shopData.map(product => (
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
                        ))}
                    </>
                    :
                    <div class="pt-16">
                        <svg class="animate-spin h-16 w-16 text-blue-700 m-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                }
            </div>
        </div>
    )
}

function NewQuery (q, setShopData, setAllShopData, setError, setSearchLoading) {
    setTimeout(function() {
        fetch('https://spoura-go-api.vercel.app/api/shop/' + q)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            setShopData(data);
            setAllShopData(data);
        })
        .catch(error => {
            setError(error.message);
        });
        setTimeout(function() {
            setSearchLoading(false)
        }, 100);
    }, 100);
}