import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Randomp from "./Randomp";
import { useParams } from "react-router-dom";
import { API_BASE_URL, resolveImageUrl } from "../../../config/api";

export default function ProductDetails(){
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isWhislisted, setIsWhislisted] = useState(false);
    const [cart, setCart] = useState(false);

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        window.scrollTo(0, 0);
        setCart(false);
        setIsWhislisted(false);

        const fetchProductAndStatus = async() => {
            setLoading(true);
            try {
                // 1. Product details fetch
                const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
                const prodData = response.data.data || response.data;
                setProduct(prodData);

                // 2. Token and UserId check
                const token = localStorage.getItem("token");
                const userId = localStorage.getItem("userId");

                if (token && userId) {
                    // Cart status check
                    try {
                        const cartResponse = await axios.get(`${API_BASE_URL}/api/cart/${userId}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        const cartItems = cartResponse.data.items || cartResponse.data.cart?.items || [];
                        const isInCart = cartItems.some(
                            (item) => (item.productId?._id || item.productId)?.toString() === prodData._id?.toString()
                        );
                        setCart(isInCart);
                    } catch (err) {
                        console.log("Cart check error:", err);
                    }

                    // Wishlist status check
                    try {
                        const wishlistResponse = await axios.get(`${API_BASE_URL}/api/wishlist/${userId}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                        const wishlistItems = wishlistResponse.data.items || wishlistResponse.data.wishlist || [];
                        const isInWishlist = wishlistItems.some(
                            (item) => (item.productId?._id || item.productId)?.toString() === prodData._id?.toString()
                        );
                        setIsWhislisted(isInWishlist);
                    } catch (err) {
                        console.log("Wishlist check error:", err);
                    }
                }
            }
            catch(error){
                console.error("Error fetching product:", error);
            }
            finally{
                setLoading(false);
            }
        };

        fetchProductAndStatus();
    }, [id]);

    const handleWishlist = async () => {
        const token = localStorage.getItem("token");
        if(!token){
            navigate('/login');
            return;
        }

        try {
            if (isWhislisted) {
                await axios.delete(`${API_BASE_URL}/api/wishlist/remove/${product._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setIsWhislisted(false);
                alert("Product removed from wishlist!");
            } else {
                await axios.post(`${API_BASE_URL}/api/wishlist/add`, 
                    { productId: product._id },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setIsWhislisted(true);
                alert("Product added to wishlist successfully!");
            }
        } catch (error) {
            console.error("Wishlist error:", error);
            alert(error.response?.data?.message || "Failed to update wishlist");
        }
    };

    const handleCrt = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); 

    if(!token){
        navigate('/login');
        return;
    }

    try {
        if (cart) {
            await axios.delete(`${API_BASE_URL}/api/cart/remove/${product._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCart(false);
            alert("Product removed from cart!");
        } else {
            await axios.post(`${API_BASE_URL}/api/cart/add`, 
                { productId: product._id, quantity: 1, userId: userId }, // Yeh raha userId
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(true);
            alert("Product added to cart successfully!");
        }
    } catch (error) {
        console.error("Cart error:", error);
        alert(error.response?.data?.message || "Failed to update cart");
    }
};
    const handleBuyNow = async() => {
        try{
            const token = localStorage.getItem('token');
            if(!token){
                navigate('/login');
                return;
            }

            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.id || payload._id || payload.userId;
            const response = await axios.post(`${API_BASE_URL}/api/orders/create-direct`,
                {userId, productId: product._id, quantity: 1},

                {headers :
                    {Authorization: `Bearer ${token}`}
                }
            );

            if(response.data.success){
                const singleItem = response.data.item;
                const itemPrice = singleItem.productId.price || 0;
                const qty = singleItem.quantity || 1;

                const subtotal = itemPrice * qty;
                const totalDeliveryCharge = 20 * qty;
                const finalTotal = subtotal + totalDeliveryCharge;

                navigate('/BuyNow', {
                    state: {
                        cartItems: [singleItem],
                        subtotal,
                        totalDeliveryCharge,
                        finalTotal,
                        isDirectBuy: true
                    }
                });
            }
        }
        catch(err){
            console.error("Direct buy error : ", err.response?.data || err.message);
            alert(err.response?.data?.message || "Could not proceed to direct checkout");
        }
    };

    if(loading){
        return <div className="py-24 text-center text-sm tracking-widest text-zinc-400 uppercase">Loading Details...</div>;
    }

    if(!product){
        return <div className="py-24 text-center text-sm tracking-widest text-red-500 uppercase">Product not found.</div>;
    }

    return (
        <div className="bg-white text-black min-h-screen py-16 px-6 md:px-16 text-base">
            <div className="max-w-7xl mx-auto">
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-20">
                    
                    <div className="md:col-span-5 bg-[#f4f4f4] aspect-square flex items-center justify-center p-8 border border-zinc-200">
                        <img 
                            src={resolveImageUrl(product.imageURL || product.image)}
                            onError={(e) => { e.target.src = "https://via.placeholder.com/600x600?text=No+Image"; }}
                            alt={product.name}
                            className="w-full h-full object-contain object-center max-h-[400]"
                        />
                    </div>

                    <div className="md:col-span-7 flex flex-col justify-center">
                        <span className="text-sm uppercase tracking-[0.3em] text-zinc-400 mb-2">
                            {product.category || "Collection"}
                        </span>
                        
                        <h1 className="text-3xl md:text-4xl font-serif font-normal uppercase tracking-wide mb-4 text-zinc-900">
                            {product.name}
                        </h1>

                        <p className="text-2xl font-semibold text-zinc-900 mb-6">
                            ₹{product.price}
                        </p>

                        <div className="border-t border-b border-zinc-200 py-6 mb-8">
                            <p className="text-base text-zinc-600 font-light leading-relaxed tracking-wide">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <button 
                                onClick={handleBuyNow}
                                className="flex-1 bg-black text-white py-4 px-6 text-sm uppercase tracking-[0.25em] font-medium hover:bg-zinc-800 transition-colors"
                            >
                                Buy Now 
                            </button>

                            <button                       
                                onClick={handleWishlist}
                                className="w-14 h-14 border border-zinc-300 hover:border-black transition-colors flex items-center justify-center"
                                title="Wishlist"
                            >
                                {isWhislisted ? (
                                    <span className="text-red-500 text-xl">❤️</span>
                                ) : (
                                    <span className="text-zinc-800 text-xl">♡</span>
                                )}
                            </button>

                           <button 
                               onClick={handleCrt}
                               className="w-14 h-14 border border-zinc-300 hover:border-black transition-colors flex items-center justify-center"
                               title="Cart"
                           >
                               {cart ? (
                                   <span className="text-green-600 text-lg">✅</span>
                               ) : (
                                   <span className="text-zinc-800 text-lg">🛒</span>
                               )}
                           </button>
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-zinc-200 py-16 mb-16 flex flex-col items-center w-full">
                    <h3 className="text-sm uppercase tracking-[0.25em] text-zinc-400 mb-8 font-medium">Product Specifications</h3>
                    
                    <div className="flex flex-col gap-4 text-base text-zinc-700 font-light max-w-3xl">
                        <div className="border-b border-zinc-100 pb-4 flex justify-between items-center">
                            <span className="font-medium text-zinc-500 uppercase text-sm tracking-wider">Product Name:</span>
                            <span className="text-zinc-900 font-normal">{product.name}</span>
                        </div>
                        <div className="border-b border-zinc-100 pb-4 flex justify-between items-center">
                            <span className="font-medium text-zinc-500 uppercase text-sm tracking-wider">Category:</span>
                            <span className="text-zinc-900 font-normal">{product.category || "N/A"}</span>
                        </div>
                        <div className="border-b border-zinc-100 pb-4 flex justify-between items-center">
                            <span className="font-medium text-zinc-500 uppercase text-sm tracking-wider">Price:</span>
                            <span className="text-zinc-900 font-normal">₹{product.price}</span>
                        </div>
                        <div className="border-b border-zinc-100 pb-4 flex justify-between items-center">
                            <span className="font-medium text-zinc-500 uppercase text-sm tracking-wider">Material:</span>
                            <span className="text-zinc-900 font-normal">{product.material || "Standard"}</span>
                        </div>
                        <div className="border-b border-zinc-100 pb-4 flex flex-col gap-2 pt-2">
                            <span className="font-medium text-zinc-500 uppercase text-sm tracking-wider">Description:</span>
                            <span className="text-zinc-900 font-normal leading-relaxed">{product.description || "No description available."}</span>
                        </div>
                    </div>
                </div>
                
                <div className="pt-8">
                    <Randomp currentProductId={id}/>
                </div>

            </div>
        </div>
    );
}