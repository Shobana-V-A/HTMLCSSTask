import React from "react";

function Navbar({ cartCount, openCart }) {
    return (
        <div className="flex justify-between items-center px-6 py-4 bg-black text-white shadow">

            <h1 className="text-2xl font-bold">Fake Shop</h1>

            <button
                onClick={openCart}
                className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200"
            >
                Cart ({cartCount})
            </button>
        </div>
    );
}

export default Navbar;