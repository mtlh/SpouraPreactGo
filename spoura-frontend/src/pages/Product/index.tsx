import { useLocation } from "preact-iso";
import { useEffect, useState, useRef } from "preact/hooks";
import { FavouriteToggle } from "../../components/FavouriteToggle";
import { AddToCart } from "../../components/CartAction";
import { LoadingSpinner, LoadingSpinnerCenter } from "../../components/LoadingSpinner";
import ProductReusable from "../../components/Product";

export function Product ({user, setUser, loading, path}: {user: any, setUser: any, loading?: boolean, path?: string}) {
	const [productData, setProductData] = useState(null);
	const [relatedProducts, setRelatedProducts] = useState(null);
	const [similarProducts, setSimilarProducts] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(10);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [viewerState, setViewerState] = useState({
        scale: 1,
        positionX: 0,
        positionY: 0,
        isDragging: false,
        startX: 0,
        startY: 0
    });
    const [expandedSections, setExpandedSections] = useState({
        description: true,
        shipping: false,
        returns: false
    });
	const [error, setError] = useState(null);
    const [addCartLoading, setAddCartLoading] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const imageContainerRef = useRef<HTMLDivElement>(null);
    const viewerImageRef = useRef<HTMLImageElement>(null);

    const location = useLocation();
    const urlslug = location.path.split("/")[location.path.split("/").length - 1];

    const toggleSection = (section: 'description' | 'shipping' | 'returns') => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Reset viewer state when opening
    const openViewer = () => {
        setViewerState({
            scale: 1,
            positionX: 0,
            positionY: 0,
            isDragging: false,
            startX: 0,
            startY: 0
        });
        setIsViewerOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeViewer = () => {
        setIsViewerOpen(false);
        document.body.style.overflow = '';
    };

    // Zoom functions
    const zoomIn = () => {
        setViewerState(prev => ({
            ...prev,
            scale: Math.min(prev.scale + 0.5, 5)
        }));
    };

    const zoomOut = () => {
        setViewerState(prev => ({
            ...prev,
            scale: Math.max(prev.scale - 0.5, 0.5)
        }));
    };

    const resetZoom = () => {
        setViewerState(prev => ({
            ...prev,
            scale: 1,
            positionX: 0,
            positionY: 0
        }));
    };

    // Mouse wheel zoom
    const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.2 : 0.2;
        setViewerState(prev => ({
            ...prev,
            scale: Math.max(0.5, Math.min(5, prev.scale + delta))
        }));
    };

    // Drag to pan
    const handleMouseDown = (e: MouseEvent) => {
        if (viewerState.scale > 1) {
            setViewerState(prev => ({
                ...prev,
                isDragging: true,
                startX: e.clientX - prev.positionX,
                startY: e.clientY - prev.positionY
            }));
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (viewerState.isDragging && viewerState.scale > 1) {
            setViewerState(prev => ({
                ...prev,
                positionX: e.clientX - prev.startX,
                positionY: e.clientY - prev.startY
            }));
        }
    };

    const handleMouseUp = () => {
        setViewerState(prev => ({
            ...prev,
            isDragging: false
        }));
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1 && viewerState.scale > 1) {
            const touch = e.touches[0];
            setViewerState(prev => ({
                ...prev,
                isDragging: true,
                startX: touch.clientX - prev.positionX,
                startY: touch.clientY - prev.positionY
            }));
        }
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length === 1 && viewerState.isDragging && viewerState.scale > 1) {
            const touch = e.touches[0];
            setViewerState(prev => ({
                ...prev,
                positionX: touch.clientX - prev.startX,
                positionY: touch.clientY - prev.startY
            }));
        }
    };

    const handleTouchEnd = () => {
        setViewerState(prev => ({
            ...prev,
            isDragging: false
        }));
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isViewerOpen) return;
            if (e.key === 'Escape') closeViewer();
            if (e.key === '+' || e.key === '=') zoomIn();
            if (e.key === '-') zoomOut();
            if (e.key === '0') resetZoom();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isViewerOpen]);

	useEffect(() => {
        setIsLoading(true);
        setProductData(null);
        setRelatedProducts(null);
        setSimilarProducts(null);
        setSize(10);
        setQuantity(1);
        setSelectedImage(0);

        if (!urlslug) return;

        fetch('https://spoura-go-api.vercel.app/api/product/' + urlslug)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProductData(data);
                setSelectedImage(0);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
	}, [urlslug]);

    // Fetch related products from the same brand
    useEffect(() => {
        if (productData?.Brand) {
            fetch('https://spoura-go-api.vercel.app/api/brand/' + productData.Brand.toLowerCase())
                .then(response => response.ok ? response.json() : null)
                .then(data => {
                    if (data?.products && data.products.length > 0) {
                        const related = data.products
                            .filter((p: any) => p.URLSlug !== urlslug)
                            .slice(0, 4);
                        setRelatedProducts(related);
                    }
                })
                .catch(() => {});
        }
    }, [productData]);

    // Fetch similar products - same brand (first 2 slots) + different brands
    useEffect(() => {
        if (productData?.Type && productData?.Brand) {
            fetch('https://spoura-go-api.vercel.app/api/shop/?type=' + productData.Type + '&sort=any')
                .then(response => response.ok ? response.json() : null)
                .then(data => {
                    if (data?.products) {
                        // Make comparison case-insensitive
                        const currentBrandLower = productData.Brand.toLowerCase();

                        // Separate same brand and different brand products
                        const sameBrand = data.products.filter((p: any) =>
                            p.URLSlug !== urlslug &&
                            p.Brand?.toLowerCase() === currentBrandLower
                        );
                        const differentBrands = data.products.filter((p: any) =>
                            p.URLSlug !== urlslug &&
                            p.Brand?.toLowerCase() !== currentBrandLower
                        );

                        // Shuffle different brands for randomness
                        const shuffledDifferent = differentBrands.sort(() => Math.random() - 0.5);

                        // First 2 slots: same brand (if available), remaining: different brands
                        const maxSameBrand = Math.min(2, sameBrand.length);
                        const maxDifferent = 4 - maxSameBrand;

                        const combined = [
                            ...sameBrand.slice(0, maxSameBrand),
                            ...shuffledDifferent.slice(0, maxDifferent)
                        ];

                        // Keep the order: same brand first, then different brands
                        setSimilarProducts(combined.slice(0, 4));
                    }
                })
                .catch(() => {});
        }
    }, [productData]);

    const [isFavourite, setIsFavourite] = useState(false);
    useEffect(() => {
        if (user.Favourites != null) {
            setIsFavourite(user.Favourites.some((item: any) => item.urlslug === urlslug))
        }
    }, [user])

    const handleIncrementQuantity = () => { if (quantity < 9) { setQuantity(quantity + 1); } }
    const handleDecrementQuantity = () => { if (quantity > 1) { setQuantity(quantity - 1); } };

    const handleAddToCart = async () => {
        setAddCartLoading(true);
        await updateCart(await AddToCart(productData.URLSlug, quantity, size), setUser, setAddCartLoading);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const shareProduct = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: productData.Name,
                    text: `Check out ${productData.Name} from ${productData.Brand}`,
                    url: window.location.href
                });
            } catch (err) {
                // User cancelled or error
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
        }
    };

	if (error) {
	  return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="card bg-base-100 shadow-xl max-w-md">
                <div className="card-body text-center">
                    <h2 className="card-title justify-center text-error">Error</h2>
                    <p>{error}</p>
                    <div className="card-actions justify-center mt-4">
                        <a href="/" className="btn btn-primary">Go Home</a>
                    </div>
                </div>
            </div>
        </div>
      );
	}

	if (isLoading || !productData) {
	  return <LoadingSpinnerCenter />
	}

    const getTypeLabel = (type: string) => {
        switch(type) {
            case 'm': return "Men's";
            case 'w': return "Women's";
            case 'k': return "Kids";
            default: return type;
        }
    };

    const getTypeColor = (type: string) => {
        switch(type) {
            case 'm': return 'bg-gradient-to-r from-blue-500 to-blue-700';
            case 'w': return 'bg-gradient-to-r from-pink-500 to-rose-600';
            case 'k': return 'bg-gradient-to-r from-amber-500 to-orange-600';
            default: return 'bg-gradient-to-r from-blue-500 to-blue-700';
        }
    };

	return (
	   <>
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div
                            className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-base-200 cursor-zoom-in shadow-lg group"
                            onClick={openViewer}
                            ref={imageContainerRef}
                        >
                            <img
                                src={productData.ImgURL}
                                alt={productData.Name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Hover overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                                    </svg>
                                    <span className="font-medium text-sm">Click to inspect</span>
                                </div>
                            </div>
                            {/* Type Badge */}
                            <div className="absolute top-4 left-4">
                                <span className={`${getTypeColor(productData.Type)} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                                    {getTypeLabel(productData.Type)}
                                </span>
                            </div>
                            {/* Favourite Button (Mobile) */}
                            <div className="absolute top-4 right-4">
                                <button
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        const newFavourites = await FavouriteToggle(productData.URLSlug);
                                        setIsFavourite(!isFavourite);
                                        updateFavourites(newFavourites, setUser);
                                    }}
                                    className="btn btn-circle btn-lg bg-white/90 hover:bg-white shadow-lg border-0"
                                >
                                    {isFavourite ? (
                                        <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                        </svg>
                                    ) : (
                                        <svg className="w-6 h-6 text-base-content/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div>
                            {productData.Brand && (
                                <a
                                    href={"/brand/" + productData.Brand}
                                    className="inline-block text-sm font-semibold text-primary hover:text-primary/80 uppercase tracking-wider mb-2"
                                >
                                    {productData.Brand}
                                </a>
                            )}
                            <h1 className="text-3xl md:text-4xl font-bold text-base-content leading-tight">
                                {productData.Name}
                            </h1>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold text-primary">£{productData.Price}</span>
                            {productData.Collection && (
                                <span className="badge badge-outline badge-lg">Collection</span>
                            )}
                        </div>

                        {/* Quick Info */}
                        <div className="flex flex-wrap gap-x-4 gap-y-2 py-3 border-b border-base-300">
                            {productData.Collection && (
                                <a href={"/collection/" + productData.Collection} className="flex items-center gap-2 text-base-content/70 hover:text-primary transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    <span className="font-medium">{productData.Collection}</span>
                                </a>
                            )}
                            <div className="flex items-center gap-2 text-base-content/70">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span className="font-medium">In Stock</span>
                            </div>
                            <div className="flex items-center gap-2 text-base-content/70">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                                <span className="font-medium">Free Shipping over £50</span>
                            </div>
                            <div className="flex items-center gap-2 text-base-content/70 ml-auto">
                                <span className="text-base-content/70 font-medium">Share:</span>
                                <button
                                    onClick={shareProduct}
                                    className="btn btn-xs btn-ghost btn-circle"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(window.location.href);
                                    }}
                                    className="btn btn-xs btn-ghost btn-circle"
                                    title="Copy link"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Size Selector */}
                        <div className="flex flex-wrap items-center gap-4 py-2">
                            <label className="font-semibold text-base-content">Size (UK):</label>
                            <div className="dropdown">
                                <label tabIndex={0} className="btn bg-base-200 hover:bg-base-300 border-base-300 min-w-[100px] justify-between gap-2">
                                    <span>{size}</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </label>
                                <ul tabIndex={0} className="dropdown-content z-10 menu p-2 shadow-lg bg-base-100 rounded-box w-32 mt-0">
                                    {[4, 5, 6, 7, 8, 9, 10, 11, 12].map(sizeNum => (
                                        <li key={sizeNum}>
                                            <button
                                                onClick={() => setSize(sizeNum)}
                                                className={size === sizeNum ? 'bg-primary text-primary-content' : ''}
                                            >
                                                {sizeNum}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                onClick={() => setIsSizeGuideOpen(true)}
                                className="text-sm text-primary hover:text-primary/80 font-medium underline"
                            >
                                Size Guide
                            </button>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-2">
                                <label className="font-semibold text-base-content mr-2">Qty:</label>
                                <div className="join">
                                    <button
                                        onClick={handleDecrementQuantity}
                                        disabled={quantity <= 1}
                                        className={`join-item btn btn-square ${quantity <= 1 ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white border-0 hover:from-blue-600 hover:to-blue-800'}`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <div className="join-item btn min-w-[3rem] bg-base-200 border-base-300 pointer-events-none">
                                        <span className="font-semibold">{quantity}</span>
                                    </div>
                                    <button
                                        onClick={handleIncrementQuantity}
                                        disabled={quantity >= 9}
                                        className={`join-item btn btn-square ${quantity >= 9 ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-700 text-white border-0 hover:from-blue-600 hover:to-blue-800'}`}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={addCartLoading}
                                className={`flex-1 btn btn-lg h-14 ${
                                    addedToCart
                                        ? 'btn-success'
                                        : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white border-0'
                                }`}
                            >
                                {addCartLoading ? (
                                    <LoadingSpinner width="1.5rem" height="1.5rem" />
                                ) : addedToCart ? (
                                    <>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Added to Cart
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Add to Cart
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Product Details Accordion */}
                        <div className="space-y-2 pt-4">
                            {/* Description */}
                            <div className="collapse collapse-arrow bg-base-200 rounded-xl">
                                <input
                                    type="checkbox"
                                    checked={expandedSections.description}
                                    onChange={() => toggleSection('description')}
                                />
                                <div className="collapse-title font-semibold pr-12">
                                    Description
                                </div>
                                <div className="collapse-content">
                                    <p className="text-base-content/80 leading-relaxed">
                                        {productData.Description}
                                    </p>
                                </div>
                            </div>

                            {/* Shipping */}
                            <div className="collapse collapse-arrow bg-base-200 rounded-xl">
                                <input
                                    type="checkbox"
                                    checked={expandedSections.shipping}
                                    onChange={() => toggleSection('shipping')}
                                />
                                <div className="collapse-title font-semibold pr-12">
                                    Shipping & Delivery
                                </div>
                                <div className="collapse-content">
                                    <ul className="space-y-2 text-base-content/80">
                                        <li className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-success mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Free standard delivery on orders over £50</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-success mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Standard delivery: £4.99 (3-5 working days)</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-success mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span>Express delivery available at checkout</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            {/* Returns */}
                            <div className="collapse collapse-arrow bg-base-200 rounded-xl">
                                <input
                                    type="checkbox"
                                    checked={expandedSections.returns}
                                    onChange={() => toggleSection('returns')}
                                />
                                <div className="collapse-title font-semibold pr-12">
                                    Returns & Exchanges
                                </div>
                                <div className="collapse-content">
                                    <ul className="space-y-2 text-base-content/80">
                                        <li className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-success mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            <span>30-day returns policy</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-success mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            <span>Free returns on all orders</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <svg className="w-5 h-5 text-success mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>Items must be unworn with original tags</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products - Same Brand */}
                {relatedProducts && relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-base-content">
                                    More from {productData.Brand}
                                </h2>
                                <p className="text-base-content/60 mt-1">You might also like these</p>
                            </div>
                            <a href={"/brand/" + productData.Brand} className="btn btn-outline btn-primary">
                                View All
                            </a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((product: any) => (
                                <ProductReusable key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Similar Products - Mix of same brand (first 2) + different brands */}
                {similarProducts && similarProducts.length > 0 && (
                    <div className="mt-16">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-base-content">
                                    You May Also Like
                                </h2>
                                <p className="text-base-content/60 mt-1">More options to consider</p>
                            </div>
                            <a href={"/shop?type=" + productData.Type} className="btn btn-outline btn-primary">
                                View All
                            </a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {similarProducts.map((product: any) => (
                                <ProductReusable key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Image Viewer Modal */}
            {isViewerOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex flex-col"
                    onWheel={handleWheel}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-black/50">
                        <div className="text-white">
                            <span className="font-medium">Inspect Image</span>
                            <span className="text-white/60 ml-2 text-sm">Scroll to zoom • Drag to pan</span>
                        </div>
                        <button
                            onClick={closeViewer}
                            className="btn btn-circle btn-ghost text-white hover:bg-white/20"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Image Container */}
                    <div
                        className="flex-1 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center"
                        onMouseDown={handleMouseDown}
                        onTouchStart={handleTouchStart}
                    >
                        <img
                            ref={viewerImageRef}
                            src={productData.ImgURL}
                            alt={productData.Name}
                            className="max-w-full max-h-full select-none"
                            style={{
                                transform: `scale(${viewerState.scale}) translate(${viewerState.positionX / viewerState.scale}px, ${viewerState.positionY / viewerState.scale}px)`,
                                transition: viewerState.isDragging ? 'none' : 'transform 0.1s ease-out'
                            }}
                            draggable={false}
                        />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center gap-4 p-4 bg-black/50">
                        <button
                            onClick={zoomOut}
                            disabled={viewerState.scale <= 0.5}
                            className="btn btn-circle btn-outline text-white border-white hover:bg-white hover:text-black disabled:opacity-50"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                            </svg>
                        </button>

                        <div className="text-white font-medium min-w-[80px] text-center">
                            {Math.round(viewerState.scale * 100)}%
                        </div>

                        <button
                            onClick={zoomIn}
                            disabled={viewerState.scale >= 5}
                            className="btn btn-circle btn-outline text-white border-white hover:bg-white hover:text-black disabled:opacity-50"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                            </svg>
                        </button>

                        <div className="w-px h-8 bg-white/30 mx-2"></div>

                        <button
                            onClick={resetZoom}
                            className="btn btn-sm btn-outline text-white border-white hover:bg-white hover:text-black"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            )}

            {/* Size Guide Modal */}
            {isSizeGuideOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setIsSizeGuideOpen(false)}></div>
                    <div className="relative bg-base-100 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-base-300">
                            <h2 className="text-2xl font-bold">Size Guide</h2>
                            <button
                                onClick={() => setIsSizeGuideOpen(false)}
                                className="btn btn-circle btn-ghost"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {/* UK Size Chart */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-4">UK Size Chart</h3>
                                <div className="overflow-x-auto">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th>UK Size</th>
                                                <th>EU Size</th>
                                                <th>US Size</th>
                                                <th>Foot Length (cm)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td>4</td><td>37</td><td>5</td><td>23.2</td></tr>
                                            <tr><td>5</td><td>38</td><td>6</td><td>24.0</td></tr>
                                            <tr><td>6</td><td>39</td><td>7</td><td>24.8</td></tr>
                                            <tr><td>7</td><td>40-41</td><td>8</td><td>25.7</td></tr>
                                            <tr><td>8</td><td>42</td><td>9</td><td>26.5</td></tr>
                                            <tr><td>9</td><td>43</td><td>10</td><td>27.3</td></tr>
                                            <tr><td>10</td><td>44</td><td>11</td><td>28.2</td></tr>
                                            <tr><td>11</td><td>45</td><td>12</td><td>29.0</td></tr>
                                            <tr><td>12</td><td>46-47</td><td>13</td><td>29.8</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* How to Measure */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-4">How to Measure</h3>
                                <div className="space-y-3 text-base-content/80">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">1</div>
                                        <p>Stand on a piece of paper with your heel against a wall.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">2</div>
                                        <p>Mark the longest part of your foot on the paper.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">3</div>
                                        <p>Measure from the wall to the mark in centimeters.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 font-bold">4</div>
                                        <p>Use the chart above to find your perfect size.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Tips */}
                            <div className="bg-base-200 rounded-xl p-4">
                                <h3 className="font-semibold mb-2">Tips for the Perfect Fit</h3>
                                <ul className="text-sm text-base-content/80 space-y-1">
                                    <li>• Measure your feet at the end of the day when they're largest</li>
                                    <li>• If between sizes, we recommend sizing up</li>
                                    <li>• Consider the type of socks you'll wear with the shoes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
		</>
	);
  };

export const updateFavourites = (newFavourites: any, setUser: any) => {
    setUser((prevUser: any) => ({
        ...prevUser,
        Favourites: newFavourites,
    }));
};

export const updateCart = (newCart: any, setUser: any, setAddCartLoading: any) => {
    setUser((prevUser: any) => ({
        ...prevUser,
        Cart: newCart,
    }));
    setAddCartLoading(false);
};
