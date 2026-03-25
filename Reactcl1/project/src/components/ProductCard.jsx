import React, { useState } from "react";

/**
 * ProductCard — Individual product display card
 *
 * Props:
 *   product    {Object}  - Product data (id, title, price, image, category, rating)
 *   inCart     {boolean} - Whether this product is already in the cart
 *   onAddToCart {func}   - Handler called when "Add to Cart" is clicked
 */
function ProductCard({ product, inCart, onAddToCart }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    // Truncate long titles
    const shortTitle =
        product.title.length > 55
            ? product.title.slice(0, 55) + "…"
            : product.title;

    // Star rating display (out of 5)
    const rating = product.rating?.rate || 0;
    const count = product.rating?.count || 0;

    return (
        <article className="bg-white rounded-2xl overflow-hidden flex flex-col h-full border border-ink/5 hover:border-copper/30 hover:shadow-xl transition-all duration-300 group">
            {/* Product image area */}
            <div className="relative bg-blush/60 overflow-hidden" style={{ height: "220px" }}>
                {!imageLoaded && (
                    <div className="absolute inset-0 bg-blush animate-pulse" />
                )}
                <img
                    src={product.image}
                    alt={product.title}
                    onLoad={() => setImageLoaded(true)}
                    className={`absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"
                        }`}
                />
                {/* Category pill */}
                <span className="absolute top-3 left-3 bg-ink/80 text-cream text-[10px] font-body font-medium uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {product.category}
                </span>
            </div>

            {/* Product details */}
            <div className="p-5 flex flex-col flex-1">
                <h2 className="font-body text-sm font-medium text-ink leading-snug mb-2 flex-1">
                    {shortTitle}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                    <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon key={i} filled={i < Math.round(rating)} />
                        ))}
                    </div>
                    <span className="text-ink/50 font-body text-xs">
                        {rating.toFixed(1)} ({count})
                    </span>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between gap-3 mt-auto pt-3 border-t border-ink/8">
                    <span className="font-display text-xl text-copper font-semibold">
                        ${product.price.toFixed(2)}
                    </span>

                    <button
                        onClick={() => onAddToCart(product)}
                        aria-label={
                            inCart ? "Already in cart" : `Add ${product.title} to cart`
                        }
                        className={`flex items-center gap-1.5 text-xs font-body font-semibold px-3 py-2 rounded-xl transition-all duration-200 ${inCart
                                ? "bg-sage/20 text-sage cursor-default"
                                : "bg-ink text-cream hover:bg-copper active:scale-95"
                            }`}
                        disabled={inCart}
                    >
                        {inCart ? (
                            <>
                                <CheckIcon />
                                In Cart
                            </>
                        ) : (
                            <>
                                <PlusIcon />
                                Add
                            </>
                        )}
                    </button>
                </div>
            </div>
        </article>
    );
}

function StarIcon({ filled }) {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
                d="M6 1l1.4 2.8L10.5 4l-2.25 2.2.53 3.1L6 7.75 3.22 9.3l.53-3.1L1.5 4l3.1-.2L6 1z"
                fill={filled ? "#B87333" : "none"}
                stroke={filled ? "#B87333" : "#B87333"}
                strokeWidth="0.8"
                opacity={filled ? 1 : 0.35}
            />
        </svg>
    );
}

function PlusIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="6" y1="2" x2="6" y2="10" />
            <line x1="2" y1="6" x2="10" y2="6" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 6l3 3 5-5" />
        </svg>
    );
}

export default ProductCard;
