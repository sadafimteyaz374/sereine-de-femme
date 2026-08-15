import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api, { resolveImageUrl } from "../../../config/api"; // Path apne config ke hisab se check kar lein

export default function Collection() {
    const [groupedProducts, setGroupedProducts] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchAllProductsAndGroup = async () => {
            try {
                setLoading(true);
                const response = await api.get('/products/all');
                const products = response.data.data || response.data.products || response.data;

                if (Array.isArray(products)) {
                    const grouped = products.reduce((acc, product) => {
                        const category = product.category || "Uncategorized";
                        if (!acc[category]) {
                            acc[category] = [];
                        }
                        acc[category].push(product);
                        return acc;
                    }, {});

                    setGroupedProducts(grouped);
                }
            } catch (error) {
                console.error("Error fetching products for collection:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProductsAndGroup();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-white">
                <div className="text-xs uppercase tracking-[0.3em] text-zinc-400 animate-pulse">
                    Loading Collections...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-16 px-6 md:px-12 max-w-[90rem] mx-auto">
            
            {/* Page Header */}
            <div className="flex flex-col items-center mb-16 text-center">
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-medium block mb-2">
                    Curated Series
                </span>
                <h1 className="text-3xl md:text-4xl font-serif font-light tracking-widest text-zinc-900 uppercase mb-3">
                    The Collections
                </h1>
                <div className="w-12 h-[1px] bg-zinc-400 mb-4"></div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Explore our exquisite items categorized for your style
                </p>
            </div>

            {Object.keys(groupedProducts).length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xs uppercase tracking-widest text-zinc-400">
                        No products found in the database.
                    </p>
                </div>
            ) : (
                <div className="space-y-20">
                    {Object.entries(groupedProducts).map(([categoryName, items]) => (
                        <div key={categoryName} className="border-b border-zinc-100 pb-16 last:border-none">
                            
                            {/* Category Title Header */}
                            <div className="flex justify-between items-end mb-8">
                                <div>
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 block mb-1">
                                        Featured Section
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-serif font-light tracking-wider text-zinc-900 uppercase">
                                        {categoryName}
                                    </h2>
                                </div>
                                <span className="text-xs uppercase tracking-widest text-zinc-500">
                                    {items.length} {items.length === 1 ? 'Item' : 'Items'}
                                </span>
                            </div>

                            {/* Products Grid for this specific category */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {items.map((product) => {
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

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}