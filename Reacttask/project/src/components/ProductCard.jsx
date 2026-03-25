import React from "react";

function ProductCard({ product, addToCart }) {
    return (
        <div className="bg-white p-4 rounded shadow hover:shadow-lg transition flex flex-col">

            {/* Image */}
            <div className="flex justify-center items-center h-40">
                <img
                    src={product.image}
                    className="h-28 object-contain"
                />
            </div>

            {/* Title */}
            <h2 className="text-sm mt-3 line-clamp-2 min-h-[40px]">
                {product.title}
            </h2>

            {/* Price */}
            <p className="text-lg font-bold mt-2">
                ${product.price}
            </p>

            {/* Button */}
            <button
                onClick={() => addToCart(product)}
                className="mt-auto bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded"
            >
                Add to Cart
            </button>
        </div>
    );
}

export default ProductCard;