import React from "react";

const CartModal = ({ cart, closeModal, removeFromCart }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl">

                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-2xl font-bold">Your Cart</h2>
                    <button onClick={closeModal} className="text-gray-500 hover:text-red-500 font-bold text-xl">
                        &times;
                    </button>
                </div>

                {/* Modal Body (Scrollable) */}
                <div className="p-4 overflow-y-auto flex-grow">
                    {cart.length === 0 ? (
                        <p className="text-center text-gray-500 my-10">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-4">
                            {cart.map((item) => (
                                <li key={item.id} className="flex items-center justify-between border-b pb-4">
                                    <div className="flex items-center space-x-4">
                                        <img src={item.image} alt={item.title} className="h-16 w-16" />
                                        <div>
                                            <h3 className="text-md font-semibold line-clamp-1">{item.title}</h3>
                                            <p className="text-gray-600 font-bold">${item.price}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t flex justify-end">
                    <button onClick={closeModal} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;