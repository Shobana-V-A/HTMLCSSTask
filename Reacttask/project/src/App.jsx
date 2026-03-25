import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Components/Navbar";
import ProductList from "./Components/ProductList";
import CartModal from "./Components/CartModal";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // 🔥 Fetch products from API
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🛒 Add to cart
  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      alert("Item already added to the cart");
    } else {
      setCart([...cart, product]);
    }
  };

  // ❌ Remove from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar
        cartCount={cart.length}
        openCart={() => setIsOpen(true)}
      />

      {/* Product List */}
      <ProductList
        products={products}
        addToCart={addToCart}
      />

      {/* 🪟 Cart Drawer (Right Side) */}
      {isOpen && (
        <CartModal
          cart={cart}
          closeModal={() => setIsOpen(false)}
          removeFromCart={removeFromCart}
        />
      )}
    </div>
  );
}

export default App;