import { FunctionComponent } from "preact";

interface FilterOption {
    value: string;
    label: string;
}

interface FilterBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    onSearchSubmit?: () => void;
    categoryValue: string;
    onCategoryChange: (value: string) => void;
    categoryOptions?: FilterOption[];
    sortValue: string;
    onSortChange: (value: string) => void;
    sortOptions?: FilterOption[];
    resultCount: number;
    onClearFilters?: () => void;
    placeholder?: string;
}

export const FilterBar: FunctionComponent<FilterBarProps> = ({
    searchValue,
    onSearchChange,
    onSearchSubmit,
    categoryValue,
    onCategoryChange,
    categoryOptions = [
        { value: "all", label: "All Categories" },
        { value: "m", label: "Men's" },
        { value: "w", label: "Women's" },
        { value: "k", label: "Kids" },
    ],
    sortValue,
    onSortChange,
    sortOptions = [
        { value: "any", label: "Sort: Featured" },
        { value: "lowHigh", label: "Price: Low to High" },
        { value: "highLow", label: "Price: High to Low" },
    ],
    resultCount,
    onClearFilters,
    placeholder = "Search products...",
}) => {
    const hasActiveFilters = searchValue || (categoryValue && categoryValue !== "all");

    return (
        <div className="bg-base-200 rounded-2xl p-4 md:p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                {/* Search Input */}
                <div className="flex-1">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-base-content/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            className="input input-bordered w-full pl-12 pr-4 h-12 focus:input-primary"
                            onKeyDown={(event) => {
                                if (event.key === 'Enter' && onSearchSubmit) {
                                    onSearchSubmit();
                                }
                            }}
                            onInput={(e) => onSearchChange(e.target.value)}
                            value={searchValue}
                            placeholder={placeholder}
                        />
                        {searchValue && (
                            <button
                                onClick={() => onSearchChange("")}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-base-content"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Filter */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn h-12 min-w-[160px] justify-between gap-2">
                        <span className="truncate">
                            {categoryOptions.find(opt => opt.value === categoryValue)?.label || "Category"}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
                        {categoryOptions.map((option) => (
                            <li key={option.value}>
                                <button
                                    disabled={categoryValue === option.value}
                                    className={categoryValue === option.value ? 'bg-primary text-primary-content' : ''}
                                    onClick={() => onCategoryChange(option.value)}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Sort Filter */}
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn h-12 min-w-[180px] justify-between gap-2">
                        <span className="truncate">
                            {sortOptions.find(opt => opt.value === sortValue)?.label || "Sort"}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-2">
                        {sortOptions.map((option) => (
                            <li key={option.value}>
                                <button
                                    disabled={sortValue === option.value}
                                    className={sortValue === option.value ? 'bg-primary text-primary-content' : ''}
                                    onClick={() => onSortChange(option.value)}
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Results Bar */}
            <div className="mt-4 pt-4 border-t border-base-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-base-content/70">
                    <span className="font-semibold">{resultCount}</span> {resultCount === 1 ? 'product' : 'products'} found
                </p>

                {hasActiveFilters && onClearFilters && (
                    <button
                        onClick={onClearFilters}
                        className="btn btn-sm btn-ghost text-error"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Clear filters
                    </button>
                )}
            </div>
        </div>
    );
};
