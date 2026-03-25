import React from "react";

/**
 * Alert — Toast notification displayed when a duplicate item is added
 *
 * Props:
 *   message  {string} - The alert text to display
 *   onClose  {func}   - Handler to dismiss the alert
 */
function Alert({ message, onClose }) {
    return (
        <div
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[60] animate-slide-down"
            role="alert"
            aria-live="assertive"
        >
            <div className="flex items-center gap-3 bg-ink text-cream px-5 py-3.5 rounded-2xl shadow-2xl min-w-[280px] max-w-sm border border-copper/30">
                {/* Warning icon */}
                <div className="w-7 h-7 rounded-full bg-copper/20 flex items-center justify-center flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                            d="M7 1L13 12H1L7 1z"
                            stroke="#B87333"
                            strokeWidth="1.5"
                            strokeLinejoin="round"
                        />
                        <line x1="7" y1="5.5" x2="7" y2="8.5" stroke="#B87333" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="7" cy="10.5" r="0.75" fill="#B87333" />
                    </svg>
                </div>

                <p className="font-body text-sm flex-1 leading-snug">{message}</p>

                {/* Dismiss */}
                <button
                    onClick={onClose}
                    aria-label="Dismiss alert"
                    className="text-cream/40 hover:text-cream transition-colors duration-150 ml-1"
                >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <line x1="3" y1="3" x2="11" y2="11" />
                        <line x1="11" y1="3" x2="3" y2="11" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Alert;
