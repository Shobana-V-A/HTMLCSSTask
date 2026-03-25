import React, { useEffect } from "react";

/**
 * CartModal — Slide-over modal displaying all cart items
 *
 * Props:
 *   cart     {Array}  - Array of product objects in the cart
 *   onClose  {func}   - Handler to close the modal
 *   onRemove {func}   - Handler to remove a product by id
 */
function CartModal({ cart, onClose, onRemove }) {
    // Close on Escape key
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 animate-fade-in"
                onClick={onClose}
                aria-label="Close cart"
            />

            {/* Drawer panel */}
            <aside
                className="fixed top-0 right-0 h-full w-full max-w-md bg-cream z-50 flex flex-col shadow-2xl animate-slide-down"
                role="dialog"
                aria-modal="true"
                aria-label="Shopping cart"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10 bg-ink text-cream">
                    <div>
                        <h2 className="font-display text-xl">Your Cart</h2>
                        <p className="font-body text-xs text-cream/60 mt-0.5">
                            {cart.length} {cart.length === 1 ? "item" : "items"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close cart"
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream/10 transition-colors duration-200 text-cream/70 hover:text-cream"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Cart items — scrollable */}
                <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 space-y-3">
                    {cart.length === 0 ? (
                        <EmptyCart />
                    ) : (
                        cart.map((item) => (
                            <CartItem key={item.id} item={item} onRemove={onRemove} />
                        ))
                    )}
                </div>

                {/* Footer total + CTA */}
                {cart.length > 0 && (
                    <div className="px-6 py-5 border-t border-ink/10 bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-body text-sm text-ink/60 uppercase tracking-widest">
                                Total
                            </span>
                            <span className="font-display text-2xl text-copper">
                                ${totalPrice.toFixed(2)}
                            </span>
                        </div>
                        <button className="w-full bg-ink hover:bg-copper text-cream font-body font-semibold py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98] text-sm tracking-wide">
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
}

/**
 * CartItem — Single cart item row inside the modal
 */
function CartItem({ item, onRemove }) {
    const shortTitle = item.title.length > 45 ? item.title.slice(0, 45) + "…" : item.title;

    return (
        <div className="flex items-start gap-3 bg-white rounded-xl p-3 border border-ink/5 animate-fade-up">
            {/* Thumbnail */}
            <div className="w-16 h-16 flex-shrink-0 bg-blush rounded-lg overflow-hidden flex items-center justify-center p-2">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="font-body text-xs text-ink font-medium leading-snug">
                    {shortTitle}
                </p>
                <p className="font-body text-xs text-ink/50 mt-0.5 capitalize">
                    {item.category}
                </p>
                <p className="font-display text-base text-copper mt-1">
                    ${item.price.toFixed(2)}
                </p>
            </div>

            {/* Remove button */}
            <button
                onClick={() => onRemove(item.id)}
                aria-label={`Remove ${item.title} from cart`}
                className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-ink/30 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
            >
                <TrashIcon />
            </button>
        </div>
    );
}

function EmptyCart() {
    return (
        <div className="flex flex-col items-center justify-center h-full py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-blush flex items-center justify-center mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B87333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                </svg>
            </div>
            <p className="font-display text-xl text-ink/40 italic">Your cart is empty</p>
            <p className="font-body text-xs text-ink/30 mt-1">Add some items to get started</p>
        </div>
    );
}

function CloseIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
        </svg>
    );
}

function TrashIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3,3 3,12 11,12 11,3" />
            <line x1="1.5" y1="3" x2="12.5" y2="3" />
            <path d="M5 3V2h4v1" />
        </svg>
    );
}

export default CartModal;
