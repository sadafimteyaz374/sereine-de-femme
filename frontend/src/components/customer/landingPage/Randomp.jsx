import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { API_BASE_URL, resolveImageUrl } from "../../../config/api";

export default function Randomp({ currentProductId = null }) { 
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 
    
    useEffect(() => {
        const fetchRandomProducts = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/products/all`);
                const allProducts = response.data.data || response.data;
                
                if (Array.isArray(allProducts)) {
                    
                    const filteredProducts = currentProductId 
                        ? allProducts.filter((p) => (p._id || p.id) !== currentProductId)
                        : allProducts;

                    const shuffled = filteredProducts.sort(() => 0.5 - Math.random());
                    setProducts(shuffled.slice(0, 8));
                }
            } catch (error) {
                console.error("Error fetching products ", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRandomProducts();
    }, [currentProductId]);

    if (loading) {
        return <div className="py-20 text-center text-xs tracking-widest text-zinc-400 uppercase">Loading Collection...</div>;
    }

    return (
        <section className="bg-white text-black py-20 px-6 md:px-12 border-t border-zinc-200">
            <div className="max-w-7xl mx-auto">
                
                <div className="text-center mb-12">
                    <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-medium block mb-2">
                        Curated Selection
                    </span>
                    <h2 className="text-2xl md:text-3xl font-light tracking-wider uppercase font-serif">
                        Featured Masterpieces
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {Array.isArray(products) && products.map((product) => (
                        <div 
                            key={product._id || product.id} 
                            onClick={() => navigate(`/product/${product._id || product.id}`)}
                            className="group cursor-pointer flex flex-col"
                        >
                            <div className="bg-[#f4f4f4] aspect-[4/5] flex items-center justify-center p-8 overflow-hidden mb-4 relative transition-colors duration-300 group-hover:bg-[#ededed]">
                                <img 
                                    src={resolveImageUrl(product.imageURL || product.image)} 
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/300x400?text=No+Image"; }}
                                    alt={product.name} 
                                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            
                            <div className="text-left">
                                <h3 className="text-xs uppercase tracking-[0.15em] font-normal text-zinc-900 mb-1 truncate">
                                    {product.name}
                                </h3>
                                <p className="text-xs font-semibold text-zinc-800 tracking-wider">
                                    ₹{product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}