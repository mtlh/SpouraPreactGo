import { FunctionComponent } from 'preact';
import ProductReusable from './Product';

interface Product {
    id?: number;
    URLSlug: string;
    ImgURL: string;
    Name: string;
    Price: number;
    Type: string;
    Brand?: string;
}

interface ProductGridProps {
    products?: Product[];
    loading?: boolean;
    skeletonCount?: number;
}

// Shows skeleton cards during loading, then actual products with matching count
export const ProductGrid: FunctionComponent<ProductGridProps> = ({
    products,
    loading = false,
    skeletonCount = 4
}) => {
    if (loading) {
        return (
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
                {Array.from({ length: skeletonCount }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div class="text-center py-16">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 class="text-xl font-semibold text-base-content mb-2">No Products Available</h3>
                <p class="text-base-content/60">Check back later for new arrivals.</p>
            </div>
        );
    }

    return (
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
            {products.map((product) => (
                <ProductReusable key={product.id || product.URLSlug} product={product} />
            ))}
        </div>
    );
};

// Skeleton loading for product cards
export function ProductCardSkeleton() {
    return (
        <div class="animate-pulse w-full">
            <div class="card bg-base-100 shadow-md w-full max-w-sm mx-auto">
                <figure class="relative aspect-[3/4] bg-base-200">
                    <div class="absolute top-3 left-3 w-16 h-6 bg-base-200 rounded-full"></div>
                    {/* Quick View button placeholder */}
                    <div class="absolute inset-0 flex items-center justify-center bg-black/0">
                        <div class="h-10 bg-base-200 rounded-lg w-32 opacity-0"></div>
                    </div>
                </figure>
                <div class="card-body p-4">
                    <div class="h-5 bg-base-200 rounded w-3/4 mb-2"></div>
                    <div class="flex items-center justify-between mt-2">
                        <div class="h-6 bg-base-200 rounded w-20"></div>
                        <div class="h-4 bg-base-200 rounded w-16"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Skeleton loading for product grid (legacy - kept for compatibility)
export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

// Skeleton loading for hero section
export function HeroSkeleton() {
    return (
        <div class="animate-pulse">
            <div class="hero min-h-[40vh] bg-base-200">
                <div class="hero-content flex-col lg:flex-row gap-8">
                    <div class="w-64 h-64 bg-base-300 rounded-2xl"></div>
                    <div class="space-y-4">
                        <div class="h-10 bg-base-300 rounded w-64"></div>
                        <div class="h-6 bg-base-300 rounded w-48"></div>
                        <div class="h-12 bg-base-300 rounded w-32"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Error boundary fallback component
export function ErrorFallback({ message, onRetry }: { message: string; onRetry?: () => void }) {
    return (
        <div class="min-h-[50vh] flex items-center justify-center">
            <div class="card bg-base-100 shadow-xl max-w-md">
                <div class="card-body text-center">
                    <div class="text-error mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 class="card-title justify-center text-error">Something went wrong</h2>
                    <p class="text-base-content/70">{message}</p>
                    {onRetry && (
                        <div class="card-actions justify-center mt-4">
                            <button onClick={onRetry} class="btn btn-primary">
                                Try Again
                            </button>
                        </div>
                    )}
                    <div class="mt-4">
                        <a href="/" class="btn btn-ghost">Go Home</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Inline error message component
export function ErrorMessage({ message }: { message: string }) {
    return (
        <div class="alert alert-error shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{message}</span>
        </div>
    );
}

// Loading spinner with message
export function LoadingMessage({ message = "Loading..." }: { message?: string }) {
    return (
        <div class="flex flex-col items-center justify-center py-12">
            <span class="loading loading-spinner loading-lg text-primary"></span>
            <p class="mt-4 text-base-content/60">{message}</p>
        </div>
    );
}
