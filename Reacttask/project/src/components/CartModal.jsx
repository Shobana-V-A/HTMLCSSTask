import React from "react";

function CartModal({ cart, closeModal, removeFromCart }) {
  return (
    <div className="fixed inset-0 z-50">
      
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-40"
        onClick={closeModal}
      ></div>

      {/* RIGHT DRAWER */}
      <div className="absolute top-0 right-0 h-full w-80 bg-white shadow-lg flex flex-col transform transition-transform duration-300 translate-x-0">
        
        <h2 className="text-xl font-bold p-4 border-b">
          Your Cart
        </h2>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p className="text-gray-500">Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 border-b py-3"
              >
                <img
                  src={item.image}
                  className="h-12 w-12 object-contain"
                />

                <div className="flex-1">
                  <p className="text-sm line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-green-600 font-semibold">
                    ${item.price}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Close button */}
        <div className="p-4 border-t">
          <button
            onClick={closeModal}
            className="w-full bg-black text-white py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartModal;