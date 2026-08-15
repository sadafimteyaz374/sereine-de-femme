import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { resolveImageUrl } from "../../../config/api";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await api.get('/orders/my-orders', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.success) {
                    setOrders(response.data.orders || []);
                }
            } catch (err) {
                console.error("Error fetching order history:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-white">
                <div className="text-xs uppercase tracking-[0.3em] text-zinc-400 animate-pulse">
                    Loading Order History...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-12 px-6 max-w-[80rem] mx-auto">
            {/* Page Header */}
            <div className="flex flex-col items-center mb-16 text-center">
                <h1 className="text-3xl md:text-4xl font-serif font-light tracking-widest text-zinc-900 uppercase mb-3">
                    Order History
                </h1>
                <div className="w-12 h-[1px] bg-zinc-400 mb-4"></div>
                <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Track and view your past purchases
                </p>
            </div>

            {/* Orders List */}
            {orders.length === 0 ? (
                <div className="text-center py-24 bg-zinc-50 border border-zinc-200 max-w-xl mx-auto rounded-2xl px-6">
                    <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mb-4">
                        You have not placed any orders yet.
                    </p>
                    <Link 
                        to="/shop" 
                        className="inline-block bg-black text-white text-[10px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-zinc-800 transition-colors"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order) => {
                        // Correct field name from backend schema
                        const currentStatus = order.orderStatus || 'Processing';
                        
                        return (
                            <div key={order._id} className="border border-zinc-200 p-6 rounded-lg bg-zinc-50/50">
                                {/* Order Info Header */}
                                <div className="flex flex-wrap justify-between items-center pb-4 mb-4 border-b border-zinc-200 text-xs tracking-wider gap-3">
                                    <div>
                                        <span className="text-zinc-400 uppercase">Order ID: </span>
                                        <span className="font-semibold text-zinc-900">{order._id}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-400 uppercase">Date: </span>
                                        <span className="font-medium text-zinc-800">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-400 uppercase">Status: </span>
                                        <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded ${
                                            currentStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                                            currentStatus === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                            currentStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                            currentStatus === 'Packed' ? 'bg-purple-100 text-purple-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {currentStatus}
                                        </span>
                                    </div>
                                </div>

                                {/* Ordered Items */}
                                <div className="space-y-4">
                                    {order.items?.map((item, index) => {
                                        const product = item.productId || item.product || {};
                                        const name = product.name || item.name || 'Jewelry Piece';
                                        const price = Number(item.price || product.price || 0);
                                        const quantity = Number(item.quantity || 1);
                                        const imageUrl = resolveImageUrl(product.imageURL || item.imageURL);

                                        return (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-16 h-16 bg-zinc-200 overflow-hidden flex-shrink-0 rounded-md">
                                                        <img 
                                                            src={imageUrl} 
                                                            alt={name} 
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => { e.target.src = "https://via.placeholder.com/150x150?text=No+Image"; }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xs uppercase tracking-wider font-medium text-zinc-900">
                                                            {name}
                                                        </h4>
                                                        <p className="text-[11px] text-zinc-500 tracking-wider">
                                                            Qty: {quantity} {item.size ? `· Size: ${item.size}` : ''}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-xs font-semibold text-zinc-900">
                                                    ₹{(price * quantity).toLocaleString("en-IN")}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Order Total Footer */}
                                <div className="mt-6 pt-4 border-t border-zinc-200 flex justify-between items-center text-xs tracking-wider">
                                    <span className="uppercase text-zinc-500 font-medium">Total Amount</span>
                                    <span className="text-sm font-bold text-zinc-900">
                                        ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Orders;