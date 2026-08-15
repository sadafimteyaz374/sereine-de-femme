import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config/api";

export default function Wishlist() {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate("/login");
                    return;
                }

                const payload = JSON.parse(atob(token.split('.')[1]));
                const userId = payload.id || payload._id;

                const response = await axios.get(`${API_BASE_URL}/api/wishlist`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                setWishlistItems(response.data.wishlist || response.data.products || []);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching wishlist:", err.response?.data || err.message);
                setError("Failed to fetch your wishlist items. Please try again.");
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [navigate]);

    const handleRemoveFromWishlist = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_BASE_URL}/api/wishlist/remove/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setWishlistItems(prevItems => prevItems.filter(item => {
                const prodId = item._id || item.product?._id;
                return prodId !== productId;
            }));
        } catch (err) {
            console.error("Error removing item:", err);
            alert("Could not remove item from wishlist.");
        }
    };

    const handleAddToCart = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate("/login");
                return;
            }

            const response = await axios.post(`${API_BASE_URL}/api/cart/add`, 
                { productId, quantity: 1 }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (response.data.success) {
                alert("Product added to cart successfully!");
            } else {
                alert(response.data.message || "Failed to add to cart");
            }
        } catch (err) {
            console.error("Error adding to cart:", err.response?.data || err.message);
            alert("Error adding product to cart.");
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center text-xs tracking-[0.3em] uppercase text-zinc-400 animate-pulse">
                    Loading Wishlist...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center text-red-500 text-xs tracking-wider font-medium">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col items-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-widest text-zinc-900 uppercase mb-3">
                    My Wishlist
                </h2>
                <div className="w-12 h-[1px] bg-zinc-400"></div>
            </div>

            {wishlistItems.length === 0 ? (
                <div className="text-center py-20 bg-zinc-50 border border-zinc-200 rounded-lg max-w-xl mx-auto px-6">
                    <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-6">
                        Your wishlist is currently empty.
                    </p>
                    <Link 
                        to="/" 
                        className="bg-zinc-900 text-white text-xs uppercase tracking-[0.25em] px-8 py-3.5 rounded-none hover:bg-black transition-all duration-300 font-medium inline-block shadow-sm"
                    >
                        Explore Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {wishlistItems.map((item) => {
                        const product = item.product || item;
                        
                        // Using imageURL as defined in the Product schema
                        const rawImage = product.imageURL || product.image || product.img || product.photo || "";
                        
                        let imageUrl = "https://via.placeholder.com/300x400?text=No+Image";
                        if (rawImage) {
                            if (rawImage.startsWith('http')) {
                                imageUrl = rawImage;
                            } else {
                                const cleanPath = rawImage.replace(/^\/+/, '');
                                imageUrl = `${API_BASE_URL}/${cleanPath}`;
                            }
                        }
                        
                        console.log(`Product: ${product.name}, Image Path in DB: ${rawImage}, Final URL: ${imageUrl}`);

                        return (
                            <div 
                                key={product._id} 
                                className="group bg-white border border-zinc-200 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div>
                                    <div className="w-full h-80 bg-zinc-100 overflow-hidden relative">
                                        <img 
                                            src={imageUrl}
                                            alt={product.name || "Product"}
                                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                console.error("Image failed to load:", imageUrl);
                                                e.target.src = "https://via.placeholder.com/300x400?text=Image+Not+Found";
                                            }}
                                        />
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-medium text-xs tracking-widest uppercase text-zinc-900 truncate mb-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-zinc-700 font-semibold text-sm tracking-wide">
                                            ₹{product.price}
                                        </p>
                                    </div>
                                </div>

                                <div className="px-5 pb-5 pt-0 flex flex-col gap-2">
                                    <button
                                        onClick={() => handleAddToCart(product._id)}
                                        className="w-full bg-black text-white py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors font-medium"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleRemoveFromWishlist(product._id)}
                                        className="w-full bg-white border border-zinc-300 text-zinc-800 py-2.5 text-xs uppercase tracking-[0.2em] hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 font-medium"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}