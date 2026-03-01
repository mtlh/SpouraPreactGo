import { useLocation } from "preact-iso"
import { useEffect, useState } from "preact/hooks";
import { LoadingSpinnerCenter } from "../../components/LoadingSpinner";
import ProductReusable from "../../components/Product";
import { FilterBar } from "../../components/FilterBar";


export function Shop () {

    const [shopData, setShopData] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false)
	const [error, setError] = useState(null);

    const location = useLocation()

    // Parse URL query parameters
    let query = location.query["query"]
    if (!query) { query = ""}
    let page = parseInt(location.query["page"])
    if (!page) { page = 1}
    let type = location.query["type"]
    if (!type) { type = "all" }
    let sort = location.query["sort"]
    if (!sort) { sort = "any" }

    const [searchInput, setSearchInput] = useState(query);
    const [pageInput, setPageInput] = useState(page);
    const [typeInput, setTypeInput] = useState(type);
    const [sortInput, setSortInput] = useState(sort);

    // Sync state with URL when location changes (e.g., clicking links)
    useEffect(() => {
        setSearchInput(query);
        setPageInput(page);
        setTypeInput(type);
        setSortInput(sort);
    }, [location.query]);

    useEffect(() => {
        if (!searchLoading) {
            setSearchLoading(true)
            NewQuery(searchInput, pageInput, setShopData, setError, setSearchLoading, sortInput, typeInput)
        }
    }, [searchInput, pageInput, sortInput, typeInput])

    if (error) {
        return (
            <div class="min-h-[60vh] flex flex-col items-center justify-center">
                <div class="text-center">
                    <p class="text-red-500 text-lg mb-4">Error: {error}</p>
                    <button
                        onClick={() => { setError(null); setSearchInput(""); setPageInput(1); setTypeInput("all"); setSortInput("any"); }}
                        class="btn btn-primary"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
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

    const handleClearFilters = () => {
        setSearchInput("");
        setTypeInput("all");
        setSortInput("any");
    };

    return (
        <div class="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div class="mb-8">
                <h1 class="text-3xl md:text-4xl font-bold text-base-content mb-2">Shop</h1>
                <p class="text-base-content/60">Browse our collection</p>
            </div>

            {/* Reusable Filter Bar */}
            <FilterBar
                searchValue={searchInput}
                onSearchChange={setSearchInput}
                categoryValue={typeInput}
                onCategoryChange={setTypeInput}
                sortValue={sortInput}
                onSortChange={setSortInput}
                resultCount={shopData.resultCount}
                onClearFilters={handleClearFilters}
                placeholder="Search products..."
            />

            {/* Products Grid */}
            {!searchLoading ?
                <>
                    {shopData.resultCount === 0 ? (
                        <div class="min-h-[40vh] flex flex-col items-center justify-center py-16">
                            <svg class="w-24 h-24 text-base-content/30 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h2 class="text-2xl font-semibold text-base-content mb-2">No products found</h2>
                            <p class="text-base-content/60 mb-6">Try adjusting your filters or search terms</p>
                            <button
                                onClick={handleClearFilters}
                                class="btn btn-primary"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {shopData.products.map(product => (
                                <ProductReusable product={product} />
                            ))}
                        </div>
                    )}
                </>
                :
                <div class="py-16">
                    <LoadingSpinnerCenter />
                </div>
            }

            {/* Pagination */}
            {shopData.resultCount > 0 && (
                <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <div class="flex items-center gap-2">
                        <button
                            onClick={handlePageDecrement}
                            disabled={pageInput === 1}
                            class="btn btn-square btn-outline"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div class="flex items-center gap-1">
                            {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
                                let pageNum;
                                if (pageCount <= 5) {
                                    pageNum = i + 1;
                                } else if (pageInput <= 3) {
                                    pageNum = i + 1;
                                } else if (pageInput >= pageCount - 2) {
                                    pageNum = pageCount - 4 + i;
                                } else {
                                    pageNum = pageInput - 2 + i;
                                }
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setPageInput(pageNum)}
                                        class={`btn btn-square ${pageInput === pageNum ? 'btn-primary' : 'btn-ghost'}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={handlePageIncrement}
                            disabled={pageInput >= pageCount}
                            class="btn btn-square btn-outline"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <span class="text-base-content/60 text-sm">
                        Page {pageInput} of {pageCount}
                    </span>
                </div>
            )}
        </div>
    )
}

function NewQuery (q, p, setShopData, setError, setSearchLoading, sortInput, typeInput) {
    let url = "https://spoura-go-api.vercel.app/api/shop/" + q + "?page=" + p + "&sort=" + sortInput + "&type=" + typeInput
    if (!q) {
        url = "https://spoura-go-api.vercel.app/api/shop/" + "?page=" + p + "&sort=" + sortInput + "&type=" + typeInput
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
