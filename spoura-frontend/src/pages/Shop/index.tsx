import { useLocation } from "preact-iso"
import { useEffect, useState } from "preact/hooks";
import { LoadingSpinnerCenter } from "../../components/LoadingSpinner";
import ProductReusable from "../../components/Product";


export function Shop () {

    const [shopData, setShopData] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false)
	const [error, setError] = useState(null);
    
    const location = useLocation()
    let query = location.query["query"]
    if (!query) { query = ""}
    const [searchInput, setSearchInput] = useState(query);

    let page = parseInt(location.query["page"])
    if (!page) { page = 1}
    const [pageInput, setPageInput] = useState(page);

    let type = location.query["type"]
    if (!type) { type = "all" }
    const [typeInput, setTypeInput] = useState(type);

    let sort = location.query["sort"]
    if (!sort) { sort = "any" }
    const [sortInput, setSortInput] = useState(sort);

    useEffect(() => {
        if (!searchLoading) {
            setSearchLoading(true)
            NewQuery(searchInput, pageInput, setShopData, setError, setSearchLoading, sortInput, typeInput)
        }
    }, [searchInput, pageInput, sortInput, typeInput])

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!shopData) {
        return <LoadingSpinnerCenter />
    }

    function handlePageIncrement() {
        if (pageInput < Math.ceil(shopData.resultCount/12)) {
            setPageInput(pageInput + 1);
        }
    }

    function handlePageDecrement() {
        if (pageInput > 1) {
            setPageInput(pageInput - 1);
        }
    }

    let pageCount = Math.ceil(shopData.resultCount/12);
    if (pageCount < 1) {
        pageCount = 1
    }

    return (
        <>
            <div class="lg:grid lg:fixed justify-center m-auto items-stretch max-w-7xl min-w-full bg-white sticky z-10 pt-4">
                <div class="grid grid-cols-1 lg:grid-cols-3 p-2 gap-4 m-auto">
                    {/* @ts-ignore */}
                    <input type="text" class="rounded-lg h-auto p-2 bg-slate-200 w-96 lg:w-80 m-auto" onKeyDown={(event) => { if (event.key === 'Enter') { { setSearchInput(event.target.value); } } } } value={searchInput} placeholder="Search..." />
                    {/* @ts-ignore */}
                    <select value={typeInput} onChange={(event) => setTypeInput(event.target.value)} class="rounded-lg h-auto p-2 bg-slate-200 w-96 lg:w-80 m-auto">
                        <option value="m">Mens</option>
                        <option value="w">Womens</option>
                        <option value="k">Kids</option>
                        <option value="all">All</option>
                    </select>
                    {/* <div id="brand" class="p-2"> */}
                        {/* <AutoComplete onChange={filterChange} items="{brand_arr}" bind:selectedItem="{brand_select}" placeholder="Brand" class="rounded-lg h-auto p-2 bg-slate-200 w-80" /> */}
                    {/* </div> */}
                    {/* @ts-ignore */}
                    <select value={sortInput} onChange={(event) => setSortInput(event.target.value)} class="rounded-lg h-auto p-2 bg-slate-200 w-96 lg:w-80 m-auto">
                        <option value="lowHigh">Low -{">"} High</option>
                        <option value="highLow">High -{">"} Low</option>
                        <option value="any">Any</option>
                    </select>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center m-auto max-w-7xl items-stretch">
                {!searchLoading ?
                        <>
                            <p class="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4 text-center text-gray-600 lg:mt-20">{shopData.resultCount} results found</p>
                            {shopData &&
                                <>
                                    {shopData.products.map(product => (
                                        <ProductReusable product={product} />
                                    ))}
                                </>
                            }
                        </>
                        :
                        <>
                            <div class="col-span-4">
                                <LoadingSpinnerCenter />
                            </div>
                        </>
                    }
            </div>
            <div class="flex justify-center my-10 m-auto col-span-4 max-w-xs">
                <button class="rounded-l-lg h-auto p-2 bg-slate-200 w-40 m-auto text-center" onClick={handlePageDecrement}>-</button>
                <p class="h-auto p-2 bg-slate-200 w-10 m-auto text-center">{pageInput}/{pageCount}</p>
                <button class="rounded-r-lg h-auto p-2 bg-slate-200 w-40 m-auto text-center" onClick={handlePageIncrement}>+</button>
            </div>
        </>
    )
}

function NewQuery (q, p, setShopData, setError, setSearchLoading, sortInput, typeInput) {
    let url = "https://spoura-go-api.vercel.app/api/shop/" + q + "?page=" + p + "&sort=" + sortInput + "&type=" + typeInput
    if (!q) {
        url = "https://spoura-go-api.vercel.app/api/shop/" + "?page=" + p  + "&sort=" + sortInput + "&type=" + typeInput
    }
    setTimeout(function() {
        fetch(url)
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
            setShopData(data);
        })
        .catch(error => {
            setError(error.message);
        });
        setTimeout(function() {
            setSearchLoading(false)
            const newUrl = `/shop?query=${q}&page=${p}&sort=${sortInput}&type=${typeInput}`;
            window.history.replaceState(
                { ...window.history.state, as: "/shop", url: newUrl },
                "",
                newUrl
              );
        }, 100);
    }, 100);
}
