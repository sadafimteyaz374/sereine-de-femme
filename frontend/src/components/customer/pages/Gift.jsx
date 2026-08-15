import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api, { resolveImageUrl } from "../../../config/api";
import { Gift as GiftIcon } from "lucide-react";

const Gift = () => {
    const [giftProducts, setGiftProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const fetchGifts = async () => {
            try {
                setLoading(true);
                const response = await api.get('/products/search', {
                    params: { q: 'gift' } 
                });

                if (response.data.success) {
                    setGiftProducts(response.data.products || response.data.data || []);
                }
            } catch (err) {
                console.error("Error fetching gifts via search controller:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGifts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-xs uppercase tracking-[0.3em] text-zinc-400">
                Loading Gift Collection...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            {/* Header Banner */}
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                <div className="inline-flex p-3 rounded-full bg-zinc-100 text-zinc-900 mb-2">
                    <GiftIcon size={24} />
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-light tracking-widest text-zinc-900 uppercase">
                    The Gifting Collection
                </h1>
                <div className="w-12 h-[1px] bg-zinc-400 mx-auto"></div>
                <p className="text-xs uppercase tracking-widest text-zinc-500 leading-relaxed">
                    Thoughtfully curated hampers and timeless pieces designed for your special moments.
                </p>
            </div>

            {/* Products Grid */}
            {giftProducts.length === 0 ? (
                <div className="text-center py-20 bg-zinc-50 border border-zinc-200 rounded-2xl">
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
                        No gift items found right now.
                    </p>
                    <Link to="/shop" className="inline-block bg-black text-white text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-zinc-800 transition-colors">
                        Explore All Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {giftProducts.map((item) => (
                        <Link key={item._id} to={`/product/${item._id}`} className="group block">
                            <div className="relative overflow-hidden rounded-xl mb-4 bg-zinc-100 aspect-square">
                                <img
                                    src={resolveImageUrl(item.imageURL)}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-wider font-semibold text-zinc-800 rounded-md">
                                    Gift Special
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-medium text-zinc-900 group-hover:text-zinc-600 transition">
                                    {item.name}
                                </h3>
                                <p className="text-xs font-semibold text-zinc-900">
                                    ₹{Number(item.price).toLocaleString("en-IN")}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Gift;