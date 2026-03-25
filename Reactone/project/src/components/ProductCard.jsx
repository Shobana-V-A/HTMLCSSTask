import React from "react";

const ProductCard = ({ product, addToCart }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow">
            <div>
                <div className="h-48 w-full mb-4 bg-white flex justify-center items-center p-2">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full"
                    />
                </div>
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                    {product.title}
                </h2>
                <p className="text-xl font-bold text-gray-900 mb-4">${product.price}</p>
            </div>
            <button
                onClick={() => addToCart(product)}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;