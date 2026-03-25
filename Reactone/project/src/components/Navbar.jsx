import React from "react";

const Navbar = ({ cartCount, openModal }) => {
    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-40">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">FakeStore</h1>
                <button
                    onClick={openModal}
                    className="bg-white text-blue-600 font-semibold py-2 px-4 rounded shadow hover:bg-gray-100 transition"
                >
                    Cart ({cartCount})
                </button>
            </div>
        </nav>
    );
};

export default Navbar;