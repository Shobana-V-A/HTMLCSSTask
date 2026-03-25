import React from "react";

/**
 * Navbar — Top navigation bar
 * Displays the brand name and a cart button with item count badge.
 *
 * Props:
 *   cartCount {number}   - Number of items currently in the cart
 *   onCartClick {func}   - Handler to open the cart modal
 */
function Navbar({ cartCount, onCartClick }) {
    return (
        <header className="sticky top-0 z-50 bg-ink text-cream shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-copper flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M2 2h10l-1.5 7H3.5L2 2z" fill="#FAF7F2" />
                                <circle cx="5" cy="12" r="1" fill="#FAF7F2" />
                                <circle cx="10" cy="12" r="1" fill="#FAF7F2" />
                            </svg>
                        </div>
                        <span className="font-display text-xl tracking-wide text-cream">
                            ShopWave
                        </span>
                    </div>

                    {/* Nav links (decorative on mobile, visible on md+) */}
                    <nav className="hidden md:flex items-center gap-8">
                        {["New In", "Collections", "Sale"].map((label) => (
                            <a
                                key={label}
                                href="#"
                                className="font-body text-sm text-cream/60 hover:text-copper transition-colors duration-200 tracking-wide"
                            >
                                {label}
                            </a>
                        ))}
                    </nav>

                    {/* Cart button */}
                    <button
                        onClick={onCartClick}
                        aria-label={`Cart — ${cartCount} item${cartCount !== 1 ? "s" : ""}`}
                        className="relative flex items-center gap-2 bg-copper hover:bg-copper-light active:bg-copper-dark text-cream px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 group"
                    >
                        {/* Cart icon */}
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="group-hover:scale-110 transition-transform duration-200"
                        >
                            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 01-8 0" />
                        </svg>

                        <span>Cart</span>

                        {/* Badge */}
                        {cartCount > 0 && (
                            <span className="ml-1 bg-cream text-ink text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
