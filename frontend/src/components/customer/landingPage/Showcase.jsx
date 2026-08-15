import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, resolveImageUrl } from "../../../config/api";

export default function Showcase() {
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);


    const targetProductId = "6a61bb17b21ba8a23dffc4b8";

    useEffect(() => {
        const fetchProductById = async () => {
            try {
    
                const response = await axios.get(`${API_BASE_URL}/api/products/${targetProductId}`);
                if (response.data.success) {
                    setProduct(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching product by ID:", error);
            } finally {
                setLoading(false);
            }
        };

        if (targetProductId) {
            fetchProductById();
        }
    }, []);

    const handleProductClick = () => {
        if (product && product._id) {
            navigate(`/product/${product._id}`);
        }
    };

    if (loading) {
        return <div className="bg-black text-white py-20 text-center">Loading showcase...</div>;
    }

    return (
        <section className="relative w-full bg-black text-white py-20 px-6 md:px-16 overflow-hidden">
            <div className="max-w-[92rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Side: Product Details fetched via ID */}
                <div 
                    onClick={handleProductClick}
                    className="cursor-pointer group flex flex-col justify-center space-y-6"
                >
                    <span className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-light">
                        Featured Showcase
                    </span>
                    <h2 className="text-3xl md:text-5xl font-serif tracking-wide font-normal leading-tight group-hover:text-neutral-300 transition-colors">
                        {product ? product.name : "Featured Masterpiece"}
                    </h2>
                    <p className="text-neutral-400 text-sm md:text-base font-light max-w-md leading-relaxed line-clamp-3">
                        {product ? product.description : "Experience luxury and precise craftsmanship."}
                    </p>
                    
                    {/* Database Product Image */}
                    <div className="relative overflow-hidden w-full h-[350px] md:h-[420px] bg-neutral-900 border border-neutral-800">
                        <img 
                            src={resolveImageUrl(product?.imageURL)} 
                            alt={product ? product.name : "Showcase Product"}
                            onError={(e) => { e.target.src = "https://via.placeholder.com/600x420?text=Sereine+De+Femme"; }}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                        />
                        <div className="absolute bottom-6 left-6 bg-white text-black px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium">
                            Discover Details {product && `— ₹${product.price}`}
                        </div>
                    </div>
                </div>

                {/* Right Side: Matching Cinematic Video */}
                <div className="relative w-full h-[350px] md:h-[540px] overflow-hidden rounded-none shadow-2xl">
                    <video 
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/videos/showcase.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                </div>

            </div>
        </section>
    );
}