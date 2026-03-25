import { useEffect, useState } from "react";
import axios from "axios";

// IMPORT MULTIPLE IMAGES
import shirt1 from "./assets/shirt1.jpg";
import shirt2 from "./assets/shirt2.jpg";
import shirt3 from "./assets/shirt3.jpg";
import shirt4 from "./assets/shirt4.jpg";

const images = [shirt1, shirt2, shirt3, shirt4];

const convertToINR = (usd) => Math.round(usd * 83);

function Navbar({ cartCount, openModal }) {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-md">
      <h1 className="text-2xl font-bold">🛍️ Fake Store</h1>
      <div
        onClick={openModal}
        className="cursor-pointer bg-white text-indigo-600 px-4 py-2 rounded-full font-semibold shadow"
      >
        Cart ({cartCount})
      </div>
    </div>
  );
}

function ProductCard({ product, addToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-28 object-contain mb-3"
      />

      <h2 className="text-sm font-semibold line-clamp-2 min-h-[40px]">
        {product.title}
      </h2>

      <p className="text-green-600 font-bold mt-2">
        ₹{convertToINR(product.price)}
      </p>

      <button
        onClick={() => addToCart(product)}
        className="mt-auto bg-indigo-600 text-white py-1.5 rounded-lg text-sm"
      >
        Add to Cart
      </button>
    </div>
  );
}

function CartModal({ cart, closeModal, removeFromCart }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white w-[90%] max-w-md rounded-2xl p-6">
        <h2 className="text-xl font-bold mb-4">🛒 Cart Items</h2>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="text-sm">{item.title}</p>
                  <p className="text-green-600 text-sm">₹{convertToINR(item.price)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-xs"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={closeModal}
          className="mt-4 w-full bg-gray-800 text-white py-2 rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      // MULTIPLE IMAGES LOGIC
      const updated = res.data.map((item, index) => ({
        ...item,
        image: images[index % images.length]
      }));

      setProducts(updated);
    });
  }, []);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      alert("Item already added to the cart");
      return;
    }
    setCart([...cart, product]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar cartCount={cart.length} openModal={() => setShowModal(true)} />

      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {showModal && (
        <CartModal
          cart={cart}
          closeModal={() => setShowModal(false)}
          removeFromCart={removeFromCart}
        />
      )}
    </div>
  );
}

/*
=========== IMPORTANT ===========

1. Put images inside:
src/assets/

2. Example:
src/assets/shirt1.jpg
src/assets/shirt2.jpg

3. Images will automatically rotate across products

*/
