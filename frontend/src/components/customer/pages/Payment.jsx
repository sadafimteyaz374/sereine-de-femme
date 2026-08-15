import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

export default function Payment() {
    const location = useLocation();
    const navigate = useNavigate();

    const { shippingAddress, cartItems, subtotal, totalDeliveryCharge, finalTotal, isDirectBuy } = location.state || {};

    // Use a ref so Razorpay handler always has access to the latest cart items & direct buy status
    const cartItemsRef = useRef(cartItems);
    const isDirectBuyRef = useRef(isDirectBuy);

    useEffect(() => {
        cartItemsRef.current = cartItems;
        isDirectBuyRef.current = isDirectBuy;
    }, [cartItems, isDirectBuy]);

    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("COD");

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <p className="text-zinc-500 text-xs tracking-[0.2em] uppercase mb-4">No Checkout items found</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-black text-white text-xs uppercase tracking-widest px-6 py-3"
                >
                    Go to home
                </button>
            </div>
        );
    }

    const saveOrderToDatabase = async (paymentDetails = {}) => {
        try {
            const token = localStorage.getItem('token');
            const endpoint = `${API_BASE_URL}/api/orders/save-order`;

            const currentItems = cartItemsRef.current;
            const currentIsDirectBuy = isDirectBuyRef.current;

            const payload = {
                shippingAddress,
                paymentMethod,
                paymentStatus: paymentMethod === "COD" ? "Pending" : "Completed",
                paymentDetails,
                cartItems: currentItems,
                isDirectBuy: currentIsDirectBuy,
                ...(currentIsDirectBuy && currentItems && currentItems.length > 0 ? {
                    productId: currentItems[0].productId?._id || currentItems[0].productId || currentItems[0]._id,
                    quantity: currentItems[0].quantity || 1,
                    size: currentItems[0].size || "Standard"
                } : {})
            };

            const response = await axios.post(endpoint, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success || response.status === 200 || response.status === 201) {
                alert("Order Placed successfully!");
                navigate('/orders');
            }
        } catch (err) {
            console.error("Order save error details: ", err.response?.data);
            alert("Failed to save order: " + JSON.stringify(err.response?.data || err.message));
        }
    };

    // Form Submit Handler
    const handleCompletePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            if (paymentMethod === "COD") {
                await saveOrderToDatabase();
            } else {
                // Online Payment (UPI / ATM Card) via Razorpay
                const { data } = await axios.post(`${API_BASE_URL}/api/orders/create-razorpay-order`, {
                    amount: finalTotal
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!data.success) {
                    alert("Failed to initiate online payment.");
                    setLoading(false);
                    return;
                }

                if (!window.Razorpay) {
                    alert("Razorpay SDK failed to load. Please check your internet connection or HTML script tag.");
                    setLoading(false);
                    return;
                }

                const options = {
                    key: "rzp_test_TLFaZq8eDEe7rJ",
                    amount: data.order.amount,
                    currency: "INR",
                    name: "Sereine De Femme",
                    description: "Secure Payment",
                    order_id: data.order.id,
                    handler: async function (response) {
                        await saveOrderToDatabase({
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature
                        });
                    },
                    prefill: {
                        name: shippingAddress?.fullName || "",
                        contact: shippingAddress?.phone || "",
                    },
                    theme: {
                        color: "#000000"
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            }
        } catch (err) {
            console.error("Payment error: ", err);
            alert("Something went wrong during payment..!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-serif uppercase tracking-widest">Select payment method</h2>
                <div className="w-12 h-[1px] bg-zinc-400 mx-auto mt-2"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-zinc-50 border border-zinc-200 p-6 sm:p-8">
                    <form onSubmit={handleCompletePayment} className="space-y-6 text-xs">
                        <div className="space-y-3">
                            {/* COD option */}
                            <label className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${paymentMethod === "COD" ? "border-black bg-white" : "border-zinc-200 bg-zinc-50"}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="COD"
                                    checked={paymentMethod === "COD"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="accent-black"
                                />
                                <div>
                                    <p className="font-semibold uppercase tracking-wider text-zinc-900">Cash On Delivery (COD)</p>
                                    <p className="text-[10px] text-zinc-500">Pay cash when your order arrives</p>
                                </div>
                            </label>

                            {/* UPI option */}
                            <label className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${paymentMethod === "UPI" ? "border-black bg-white" : "border-zinc-200 bg-zinc-50"}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="UPI"
                                    checked={paymentMethod === "UPI"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="accent-black"
                                />
                                <div>
                                    <p className="font-semibold uppercase tracking-wider text-zinc-900">UPI (GPay / PhonePe / Paytm)</p>
                                    <p className="text-[10px] text-zinc-500">Instant payment via UPI apps or QR code.</p>
                                </div>
                            </label>

                            {/* ATM Card option */}
                            <label className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${paymentMethod === "ATM" ? "border-black bg-white" : "border-zinc-200 bg-zinc-50"}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="ATM"
                                    checked={paymentMethod === "ATM"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="accent-black"
                                />
                                <div>
                                    <p className="font-semibold uppercase tracking-wider text-zinc-900">ATM / Debit / Credit Card</p>
                                    <p className="text-[10px] text-zinc-500">Pay securely using your bank debit/credit card.</p>
                                </div>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-4 uppercase tracking-[0.2em] font-medium hover:bg-zinc-800 transition-colors"
                        >
                            {loading ? "Processing..." : `Pay ₹${finalTotal} & Confirm Order`}
                        </button>
                    </form>
                </div>

                {/* Price Details Section */}
                <div className="bg-zinc-50 border border-zinc-200 p-6 h-fit">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-900 border-b border-zinc-200 pb-3 mb-4">
                        Price Details
                    </h3>
                    <div className="space-y-3 text-xs text-zinc-600">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span className="font-medium text-zinc-900">₹{subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery Charge</span>
                            <span className="font-medium text-zinc-900">₹{totalDeliveryCharge}</span>
                        </div>
                        <div className="border-t border-zinc-200 pt-3 flex justify-between text-sm font-semibold text-zinc-900">
                            <span>Total Payable</span>
                            <span>₹{finalTotal}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}