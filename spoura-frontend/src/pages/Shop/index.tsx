import { useLocation } from "preact-iso"
import { useEffect, useState } from "preact/hooks";
import ProductReusable from "../../components/Product";
import { FilterBar } from "../../components/FilterBar";
import { ProductGridSkeleton, ErrorFallback } from "../../components/Skeleton";
import { API_ENDPOINTS } from "../../utils/api";


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

    const handleRetry = () => {
        setError(null);
        setSearchInput("");
        setPageInput(1);
        setTypeInput("all");
        setSortInput("any");
    };

    if (error && !shopData) {
        return <ErrorFallback message={error} onRetry={handleRetry} />;
    }

    function handlePageIncrement() {
        if (pageInput < Math.ceil(shopData?.resultCount/12)) {
            setPageInput(pageInput + 1);
        }
    }

    function handlePageDecrement() {
        if (pageInput > 1) {
            setPageInput(pageInput - 1);
        }
    }

    const pageCount = shopData?.resultCount ? Math.ceil(shopData.resultCount/12) : 1;

    const handleClearFilters = () => {
        setSearchInput("");
        setTypeInput("all");
        setSortInput("any");
    };

    return (
        <div class="max-w-7xl mx-auto px-4 py-8">
            {/* Header - always visible */}
            <div class="mb-8">
                <h1 class="text-3xl md:text-4xl font-bold text-base-content mb-2">Shop</h1>
                <p class="text-base-content/60">Browse our collection</p>
            </div>

            {/* Filter Bar - always visible */}
            <FilterBar
                searchValue={searchInput}
                onSearchChange={setSearchInput}
                categoryValue={typeInput}
                onCategoryChange={setTypeInput}
                sortValue={sortInput}
                onSortChange={setSortInput}
                resultCount={shopData?.resultCount || 0}
                onClearFilters={handleClearFilters}
            />

            {/* Loading State - Show skeletons during search */}
            {searchLoading && (
                <div class="mt-8">
                    <ProductGridSkeleton count={12} />
                </div>
            )}

            {/* Error State - Show error with retry */}
            {!searchLoading && error && (
                <div class="mt-8">
                    <ErrorFallback message={error} onRetry={handleRetry} />
                </div>
            )}

            {/* Product Grid */}
            {!searchLoading && shopData && shopData.products && (
                <>
                    <div class="mt-8">
                        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {shopData.products.map(product =>
                                <ProductReusable product={product} />
                            )}
                        </div>
                    </div>

                    {/* Pagination */}
                    {shopData.resultCount > 12 && (
                        <div class="flex justify-center items-center gap-4 mt-12">
                            <button
                                onClick={handlePageDecrement}
                                disabled={pageInput === 1}
                                class="btn btn-outline"
                            >
                                Previous
                            </button>
                            <span class="text-base-content/60 text-sm">
                                Page {pageInput} of {pageCount}
                            </span>
                            <button
                                onClick={handlePageIncrement}
                                disabled={pageInput === pageCount}
                                class="btn btn-outline"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

function NewQuery (q, p, setShopData, setError, setSearchLoading, sortInput, typeInput) {
    let url = API_ENDPOINTS.shop(`?page=${p}&sort=${sortInput}&type=${typeInput}`);
    if (q) {
        url = API_ENDPOINTS.shop(`${q}?page=${p}&sort=${sortInput}&type=${typeInput}`);
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
