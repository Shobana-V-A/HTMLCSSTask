import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import CartModal from "./components/CartModal";
import Alert from "./components/Alert";

/**
 * App — Root component
 * Manages global state: products, cart, modal visibility, and alert messages.
 * Passes state and handlers down to child components via props.
 */
function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]); // Array of product objects in cart
  const [isCartOpen, setIsCartOpen] = useState(false); // Controls cart modal visibility
  const [alert, setAlert] = useState(null); // { message: string } | null

  // Fetch products from Fake Store API on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Auto-dismiss alert after 3 seconds
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  /**
   * Adds a product to the cart.
   * If the product is already in the cart, shows an alert instead.
   * @param {Object} product - The product to add
   */
  const handleAddToCart = (product) => {
    const alreadyInCart = cart.some((item) => item.id === product.id);
    if (alreadyInCart) {
      setAlert({ message: "Item already added to the cart" });
      return;
    }
    setCart((prev) => [...prev, product]);
  };

  /**
   * Removes a product from the cart by its id.
   * @param {number} productId - The id of the product to remove
   */
  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Top navigation bar */}
      <Navbar cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />

      {/* Alert for duplicate cart items */}
      {alert && <Alert message={alert.message} onClose={() => setAlert(null)} />}

      {/* Main product listing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero heading */}
        <div className="mb-12 text-center">
          <p className="text-copper font-body text-sm tracking-[0.2em] uppercase mb-3">
            Curated for you
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-ink leading-tight">
            The Collection
          </h1>
          <div className="mt-4 flex justify-center">
            <div className="h-px w-24 bg-copper opacity-50" />
          </div>
        </div>

        {/* Product grid / states */}
        {loading && <LoadingState />}
        {error && <ErrorState message={error} />}
        {!loading && !error && (
          <ProductGrid
            products={products}
            cart={cart}
            onAddToCart={handleAddToCart}
          />
        )}
      </main>

      {/* Cart modal */}
      {isCartOpen && (
        <CartModal
          cart={cart}
          onClose={() => setIsCartOpen(false)}
          onRemove={handleRemoveFromCart}
        />
      )}
    </div>
  );
}

/** Loading skeleton grid */
function LoadingState() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden animate-pulse"
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          <div className="bg-blush h-56" />
          <div className="p-5 space-y-3">
            <div className="h-3 bg-blush rounded w-3/4" />
            <div className="h-3 bg-blush rounded w-1/2" />
            <div className="h-8 bg-blush rounded mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Error state */
function ErrorState({ message }) {
  return (
    <div className="text-center py-20">
      <p className="font-display text-2xl text-copper italic mb-2">
        Something went wrong
      </p>
      <p className="text-ink/60 font-body text-sm">{message}</p>
    </div>
  );
}

export default App;
