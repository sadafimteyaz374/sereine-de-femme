import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

export default function BuyNow() {
    const location = useLocation();
    const navigate = useNavigate();

    const { cartItems, subtotal, totalDeliveryCharge, finalTotal, isDirectBuy } = location.state || {};

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        pincode: ""
    });

    const [hasSavedAddress, setHasSavedAddress] = useState(false);
    const [fetchingProfile, setFetchingProfile] = useState(true);
    
    // Naya state: Yeh control karega ki fields read-only hongi ya editable
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }
                const response = await axios.get(`${API_BASE_URL}/api/profile/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const userProfile = response.data.user || response.data;

                if (userProfile && userProfile.address) {
                    setFormData(prev => ({
                        ...prev, 
                        fullName: userProfile.name || userProfile.fullName || "",
                        phone: userProfile.phone || "",
                        address: userProfile.address || "",
                        city: userProfile.city || "",
                        pincode: userProfile.pincode || ""
                    }));
                    setHasSavedAddress(true);
                    setIsEditing(false); 
                } else {
                    setIsEditing(true); 
                }
            } catch (err) {
                console.error("Error fetching profile address: ", err);
                setIsEditing(true);
            } finally {
                setFetchingProfile(false);
            }
        };
        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleProceedToPayment = (e) => {
        e.preventDefault();

        navigate('/payment', {
            state: {
                shippingAddress: formData,
                cartItems,
                subtotal,
                totalDeliveryCharge,
                finalTotal,
                isDirectBuy
            }
        });
    };

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

    if (fetchingProfile) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center text-xs tracking-[0.3em] uppercase text-zinc-400 animate-pulse">
                    Loading Checkout...
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-serif uppercase tracking-widest">Checkout</h2>
                <div className="w-12 h-[1px] bg-zinc-400 mx-auto mt-2"></div>
            </div>

            <div className="bg-zinc-50 border border-zinc-200 p-6 sm:p-8">
                <div className="flex justify-between items-center border-b border-zinc-200 pb-3 mb-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.2em]">Shipping Address</h3>
                    
                    {/* Agar saved address hai aur abhi edit mode me nahi hain, toh "Change Address" ka button dikhayenge */}
                    {hasSavedAddress && !isEditing && (
                        <button 
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="text-[10px] bg-zinc-200 hover:bg-black hover:text-white text-zinc-800 px-3 py-1 uppercase tracking-wider transition-colors font-medium"
                        >
                            Change Address
                        </button>
                    )}

                    {/* Agar user edit mode me hai toh badge dikhayenge */}
                    {hasSavedAddress && isEditing && (
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 uppercase font-medium">
                            Editing Address
                        </span>
                    )}
                </div>

                <form onSubmit={handleProceedToPayment} className="space-y-4 text-xs">
                    <div>
                        <label className="block uppercase tracking-wider text-zinc-600 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            disabled={!isEditing} // Agar edit mode off hai toh input disabled (read-only) rahega
                            placeholder="Enter your full name"
                            className={`w-full border p-3 bg-white focus:outline-none focus:border-black ${!isEditing ? 'bg-zinc-100 text-zinc-600 cursor-not-allowed border-zinc-200' : 'border-zinc-300'}`}
                        />
                    </div>
                    <div>
                        <label className="block uppercase tracking-wider text-zinc-600 mb-1">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder="10 digit phone number"
                            className={`w-full border p-3 bg-white focus:outline-none focus:border-black ${!isEditing ? 'bg-zinc-100 text-zinc-600 cursor-not-allowed border-zinc-200' : 'border-zinc-300'}`}
                        />
                    </div>
                    <div>
                        <label className="block uppercase tracking-wider text-zinc-600 mb-1">Address</label>
                        <textarea
                            name="address"
                            required
                            rows="3"
                            value={formData.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                            placeholder="House no., Street name, Area"
                            className={`w-full border p-3 bg-white focus:outline-none focus:border-black ${!isEditing ? 'bg-zinc-100 text-zinc-600 cursor-not-allowed border-zinc-200' : 'border-zinc-300'}`}
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block uppercase tracking-wider text-zinc-600 mb-1">City</label>
                            <input
                                type="text"
                                name="city"
                                required
                                value={formData.city}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="City"
                                className={`w-full border p-3 bg-white focus:outline-none focus:border-black ${!isEditing ? 'bg-zinc-100 text-zinc-600 cursor-not-allowed border-zinc-200' : 'border-zinc-300'}`}
                            />
                        </div>
                        <div>
                            <label className="block uppercase tracking-wider text-zinc-600 mb-1">Pincode</label>
                            <input
                                type="text"
                                name="pincode"
                                required
                                value={formData.pincode}
                                onChange={handleChange}
                                disabled={!isEditing}
                                placeholder="Pincode"
                                className={`w-full border p-3 bg-white focus:outline-none focus:border-black ${!isEditing ? 'bg-zinc-100 text-zinc-600 cursor-not-allowed border-zinc-200' : 'border-zinc-300'}`}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-4 uppercase tracking-[0.2em] font-medium hover:bg-zinc-800 transition-colors mt-6"
                    >
                        Continue to Payment
                    </button>
                </form>
            </div>
        </div>
    );
}