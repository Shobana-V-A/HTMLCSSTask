import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products, addToCart }) {
    return (
        <div className="bg-[#eaeded] min-h-screen p-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((item) => (
                    <ProductCard
                        key={item.id}
                        product={item}
                        addToCart={addToCart}
                    />
                ))}
            </div>

        </div>
    );
}

export default ProductList;