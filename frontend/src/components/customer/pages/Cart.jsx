import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

export default function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        
        const fetchCartList = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const payload = JSON.parse(atob(token.split('.')[1]));
                const userId = payload.id || payload._id || payload.userId;

                const response = await axios.get(`${API_BASE_URL}/api/cart/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const items = response.data.items || [];
                setCartItems(items);
                setLoading(false);
            } catch (err) {
                console.error("Error while fetching cart items", err.response?.data || err.message);
                setError("Failed to fetch cart items, please try again...!");
                setLoading(false);
            }
        };

        fetchCartList();
    }, [navigate]);

    const handleQuantityChange = async (productId, newQty) => {
        try {
            const token = localStorage.getItem('token');
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.id || payload._id || payload.userId;
            
            await axios.post(`${API_BASE_URL}/api/cart/add`,
                { userId, productId, quantity: Number(newQty) },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setCartItems(prev => prev.map(item => {
                const prod = item.productId || item.product;
                const prodId = prod?._id || prod;
                if (prodId === productId) {
                    return { ...item, quantity: Number(newQty) };
                }
                return item;
            }));
        } catch (err) {
            console.error("Error while updating quantity", err);
            alert("Could not update item quantity..!");
        }
    };

    const handleRemoveFromCart = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.id || payload._id || payload.userId;

            await axios.post(`${API_BASE_URL}/api/cart/remove`, 
                { productId, userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setCartItems(prevItems => prevItems.filter(item => {
                const prod = item.productId || item.product;
                const prodId = prod?._id || prod;
                return prodId !== productId;
            }));
        } catch (err) {
            console.error("Error while removing the item", err);
            alert("Could not remove the item from your cart, please try again...!");
        }
    };

    const handleProductClick = (productId) => {
        if (productId) {
            navigate(`/product/${productId}`);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => {
        const product = item.productId || item.product || {};
        const price = product.price || 0;
        const qty = item.quantity || 1;
        return acc + (price * qty);
    }, 0);

    const totalDeliveryCharge = cartItems.reduce((acc, item) => acc + 20 * (item.quantity || 1), 0);
    const finalTotal = subtotal + totalDeliveryCharge;

    const handleBuyNowAll = async () => {
        if (cartItems.length === 0) return;
        try {
            const token = localStorage.getItem('token');
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userId = payload.id || payload._id || payload.userId;

            const response = await axios.post(`${API_BASE_URL}/api/orders/create-from-cart`, 
                { userId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                navigate('/BuyNow', {
                    state: {
                        cartItems: response.data.items,
                        subtotal,
                        totalDeliveryCharge,
                        finalTotal,
                        isDirectBuy: false
                    }
                });
            }
        } catch (err) {
            console.error("Checkout error:", err.response?.data || err.message);
            alert(err.response?.data?.message || "Could not proceed to checkout.");
        }
    };


    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center text-xs tracking-[0.3em] uppercase text-zinc-400 animate-pulse">
                    Loading Cart...
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col items-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-widest text-zinc-900 uppercase mb-3">
                    Shopping Cart
                </h2>
                <div className="w-12 h-[1px] bg-zinc-400"></div>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-zinc-50 border border-zinc-200 rounded-lg max-w-xl mx-auto px-6">
                    <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-6">
                        Your shopping cart is empty.
                    </p>
                    <Link 
                        to="/" 
                        className="bg-zinc-900 text-white text-xs uppercase tracking-[0.25em] px-8 py-3.5 inline-block hover:bg-black transition-all"
                    >
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item, index) => {
                            const product = item.productId || item.product || {};
                            const productId = product._id || item._id;
                            const rawImage = product.imageURL || product.image || product.img || "";
                            
                            let imageUrl = "https://via.placeholder.com/150x200?text=No+Image";
                            if (rawImage) {
                                imageUrl = rawImage.startsWith('http') ? rawImage : `${API_BASE_URL}/${rawImage.replace(/^\/+/, '')}`;
                            }

                            const itemPrice = product.price || 0;
                            const itemQuantity = item.quantity || 1;

                            return (
                                <div 
                                    key={productId || index} 
                                    className="flex bg-white border border-zinc-200 overflow-hidden shadow-sm"
                                >
                                    <div 
                                        onClick={() => handleProductClick(productId)}
                                        className="w-32 sm:w-40 bg-zinc-100 flex-shrink-0 cursor-pointer overflow-hidden"
                                    >
                                        <img 
                                            src={imageUrl} 
                                            alt={product.name || "Product"} 
                                            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                                            onError={(e) => { e.target.src = "https://via.placeholder.com/150x200?text=Error"; }}
                                        />
                                    </div>

                                    <div className="flex-1 p-5 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 
                                                    onClick={() => handleProductClick(productId)}
                                                    className="font-medium text-xs tracking-widest uppercase text-zinc-900 mb-1 cursor-pointer hover:underline"
                                                >
                                                    {product.name}
                                                </h3>
                                                <p className="text-zinc-700 font-semibold text-sm">
                                                    ₹{itemPrice}
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => handleRemoveFromCart(productId)}
                                                className="text-zinc-400 hover:text-red-600 text-xs uppercase tracking-wider transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 mt-4">
                                            <div className="flex items-center gap-2">
                                                <label className="text-[11px] uppercase tracking-wider text-zinc-500">Qty:</label>
                                                <select 
                                                    value={itemQuantity} 
                                                    onChange={(e) => handleQuantityChange(productId, e.target.value)}
                                                    className="border border-zinc-300 bg-white px-2.5 py-1 text-xs text-zinc-800 focus:outline-none focus:border-black"
                                                >
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                        <option key={num} value={num}>{num}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <span className="text-xs font-medium text-zinc-900">
                                                Subtotal: ₹{itemPrice * itemQuantity}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-zinc-50 border border-zinc-200 p-6 space-y-6 sticky top-24">
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900 border-b border-zinc-200 pb-3">
                                Order Summary
                            </h3>

                            <div className="space-y-3 text-xs text-zinc-600">
                                <div className="flex justify-between">
                                    <span>Bag Subtotal</span>
                                    <span className="font-medium text-zinc-900">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Charges (₹20 per item)</span>
                                    <span className="font-medium text-zinc-900">₹{totalDeliveryCharge}</span>
                                </div>
                                <div className="border-t border-zinc-200 pt-3 flex justify-between text-sm font-semibold text-zinc-900">
                                    <span>Total Amount</span>
                                    <span>₹{finalTotal}</span>
                                </div>
                            </div>

                            <button 
                                onClick={handleBuyNowAll}
                                className="w-full bg-black text-white py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors font-medium shadow-sm"
                            >
                                Proceed to Checkout
                            </button>

                            <p className="text-[10px] text-zinc-400 text-center uppercase tracking-wider">
                                Secure checkout guaranteed
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}