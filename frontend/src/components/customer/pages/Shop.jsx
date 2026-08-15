import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import api, { resolveImageUrl } from "../../../config/api";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = "/products/all";

        if (searchQuery) {
          url = `/products/search?q=${encodeURIComponent(searchQuery)}`;
        }

        const response = await api.get(url);
        
        if (response.data.success) {
          const productList = response.data.products || response.data.data || [];
          setProducts(productList);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <div className="text-xs uppercase tracking-[0.3em] text-zinc-400 animate-pulse">
          Loading Curated Pieces...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-6 max-w-[92rem] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col items-center mb-16 text-center">
        <h1 className="text-3xl md:text-4xl font-serif font-light tracking-widest text-zinc-900 uppercase mb-3">
          {searchQuery ? `Search Results for "${searchQuery}"` : "The Collection"}
        </h1>
        <div className="w-12 h-[1px] bg-zinc-400 mb-4"></div>
        {searchQuery && (
          <p className="text-xs uppercase tracking-widest text-zinc-500">
            Found {products.length} matching piece{products.length === 1 ? "" : "s"}
          </p>
        )}
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="text-center py-24 bg-zinc-50 border border-zinc-200 max-w-xl mx-auto rounded-2xl px-6">
          <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-4">
            No jewelry found matching your search.
          </p>
          <Link 
            to="/shop" 
            className="inline-block bg-black text-white text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-zinc-800 transition-colors"
          >
            View All Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => {
            const imageUrl = resolveImageUrl(product.imageURL);

            return (
              /* Product Card ko Link bana diya hai */
              <Link 
                to={`/product/${product._id}`} 
                key={product._id} 
                className="group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-full h-80 bg-zinc-100 overflow-hidden relative mb-4">
                    <img 
                      src={imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {product.stock <= 0 && (
                      <span className="absolute top-3 left-3 bg-white/90 text-zinc-900 text-[9px] uppercase tracking-widest px-2.5 py-1 font-semibold">
                        Sold Out
                      </span>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="font-medium text-xs tracking-[0.2em] uppercase text-zinc-900 mb-1.5 truncate group-hover:underline">
                      {product.name}
                    </h3>
                    <p className="text-zinc-700 text-xs tracking-wider font-semibold">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Shop;