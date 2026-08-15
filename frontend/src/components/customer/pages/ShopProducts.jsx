import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { resolveImageUrl } from "../../../config/api"; // Path apne folder structure ke mutabiq adjust kar lein

export default function ShopProducts() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const navigate = useNavigate();

 
    const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets"];

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                const response = await api.get('/products/all');
                const data = response.data.data || response.data.products || response.data;
                
                if (Array.isArray(data)) {
                    setProducts(data);
                    setFilteredProducts(data);
                }
            } catch (error) {
                console.error("Error fetching shop products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProducts();
    }, []);


    const handleCategoryFilter = (category) => {
        setSelectedCategory(category);
        if (category === "All") {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(
                (p) => p.category && p.category.toLowerCase() === category.toLowerCase()
            );
            setFilteredProducts(filtered);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-white">
                <div className="text-xs uppercase tracking-[0.3em] text-zinc-400 animate-pulse">
                    Loading Collection...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-16 px-6 md:px-12 max-w-[90rem] mx-auto">
            
            {/* Page Header */}
            <div className="flex flex-col items-center mb-12 text-center">
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-medium block mb-2">
                    Sereine de Femme
                </span>
                <h1 className="text-3xl md:text-4xl font-serif font-light tracking-widest text-zinc-900 uppercase mb-3">
                    The Complete Catalog
                </h1>
                <div className="w-12 h-[1px] bg-zinc-400 mb-4"></div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Explore our exquisite range of fine jewelry
                </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryFilter(cat)}
                        className={`text-xs uppercase tracking-[0.2em] px-5 py-2.5 transition-all duration-300 border ${
                            selectedCategory === cat
                                ? "bg-black text-white border-black"
                                : "bg-white text-zinc-700 border-zinc-200 hover:border-black"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xs uppercase tracking-widest text-zinc-400">
                        No products found in this category.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => {
                        const imageUrl = resolveImageUrl(product.imageURL || product.image);

                        return (
                            <div 
                                key={product._id || product.id} 
                                onClick={() => navigate(`/product/${product._id || product.id}`)}
                                className="group cursor-pointer flex flex-col"
                            >
                                <div className="bg-[#f4f4f4] aspect-[4/5] flex items-center justify-center p-8 overflow-hidden mb-4 relative transition-colors duration-300 group-hover:bg-[#ededed]">
                                    <img 
                                        src={imageUrl} 
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
                        );
                    })}
                </div>
            )}
        </div>
    );
}