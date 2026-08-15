import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

export default function Profile() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        language: "",
        occupation: "",
        city: "",
        state: "",
        pincode: "",
        address: ""
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await axios.get(`${API_BASE_URL}/api/profile/user`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const userData = response.data.user || response.data;
                setUser({
                    name: userData.name || "",
                    email: userData.email || "",
                    phone: userData.phone || "",
                    gender: userData.gender || "",
                    language: userData.language || "",
                    occupation: userData.occupation || "",
                    city: userData.city || "",
                    state: userData.state || "",
                    pincode: userData.pincode || "",
                    address: userData.address || ""
                });
            } catch (error) {
                console.error("Error fetching profile:", error.response?.data || error.message);
                if (error.response?.status === 401) {
                    localStorage.clear();
                    navigate("/login");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white text-black flex items-center justify-center">
                <div className="flex flex-col items-center space-y-3">
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs tracking-[0.3em] uppercase text-zinc-400">Loading Account...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 selection:bg-black selection:text-white">
            
            {/* Top Navigation Header */}
            <header className="border-b border-zinc-200 px-6 md:px-16 py-6 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm/3">
                <button 
                    onClick={() => navigate("/")}
                    className="text-xs uppercase tracking-[0.25em] text-zinc-500 hover:text-black transition-colors font-medium"
                >
                    ← Back to Store
                </button>
                <h1 className="text-xs uppercase tracking-[0.3em] font-semibold text-zinc-900 hidden sm:block">
                    MY ACCOUNT
                </h1>
                <div className="w-16"></div>
            </header>

            <main className="max-w-3xl mx-auto px-6 py-12 md:py-16 space-y-10">
                
                {/* User About Section */}
                <div className="border border-zinc-200 p-8 bg-[#fafafa] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-black text-white flex items-center justify-center text-lg font-serif tracking-widest shrink-0">
                            {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div>
                            <h2 className="text-sm font-medium tracking-[0.2em] uppercase text-zinc-900 mb-1">
                                {user.name || "Valued Customer"}
                            </h2>
                            <p className="text-xs text-zinc-500 tracking-wider">
                                {user.email || "No email provided"}
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate("/editProfile")}
                        className="text-xs uppercase tracking-[0.2em] border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors font-medium w-full sm:w-auto text-center"
                    >
                        Edit Profile
                    </button>
                </div>

                {/* Additional Profile Details Divs */}
                <div className="border border-zinc-200 bg-[#fafafa] p-8 space-y-6 shadow-sm">
                    <h3 className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold border-b border-zinc-200 pb-3">
                        Personal & Location Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white border border-zinc-200 p-4">
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1 font-medium">Phone</span>
                            <p className="text-sm text-zinc-800 font-medium">{user.phone || "Not specified"}</p>
                        </div>

                        <div className="bg-white border border-zinc-200 p-4">
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1 font-medium">Gender</span>
                            <p className="text-sm text-zinc-800 font-medium">{user.gender || "Not specified"}</p>
                        </div>

                        <div className="bg-white border border-zinc-200 p-4">
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1 font-medium">Language</span>
                            <p className="text-sm text-zinc-800 font-medium">{user.language || "Not specified"}</p>
                        </div>

                        <div className="bg-white border border-zinc-200 p-4">
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1 font-medium">Occupation</span>
                            <p className="text-sm text-zinc-800 font-medium">{user.occupation || "Not specified"}</p>
                        </div>

                        <div className="bg-white border border-zinc-200 p-4">
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1 font-medium">City</span>
                            <p className="text-sm text-zinc-800 font-medium">{user.city || "Not specified"}</p>
                        </div>

                        <div className="bg-white border border-zinc-200 p-4">
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1 font-medium">State</span>
                            <p className="text-sm text-zinc-800 font-medium">{user.state || "Not specified"}</p>
                        </div>

                        <div className="bg-white border border-zinc-200 p-4">
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1 font-medium">Pincode</span>
                            <p className="text-sm text-zinc-800 font-medium">{user.pincode || "Not specified"}</p>
                        </div>

                        <div className="bg-white border border-zinc-200 p-4 sm:col-span-2 lg:col-span-2">
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-zinc-400 mb-1 font-medium">Address</span>
                            <p className="text-sm text-zinc-800 font-medium">{user.address || "Not specified"}</p>
                        </div>
                    </div>
                </div>

                {/* Middle Options Section */}
                <div className="border border-zinc-200 divide-y divide-zinc-200 bg-[#fafafa] shadow-sm">
                    <div 
                        onClick={() => navigate("/orders")} 
                        className="p-6 text-xs uppercase tracking-[0.2em] font-medium text-zinc-900 hover:bg-zinc-100 cursor-pointer flex justify-between items-center transition-colors"
                    >
                        <span>Orders</span>
                        <span className="text-zinc-400">→</span>
                    </div>
                    <div 
                        onClick={() => navigate("/wishlist")} 
                        className="p-6 text-xs uppercase tracking-[0.2em] font-medium text-zinc-900 hover:bg-zinc-100 cursor-pointer flex justify-between items-center transition-colors"
                    >
                        <span>Wishlist</span>
                        <span className="text-zinc-400">→</span>
                    </div>
                    <div 
                        onClick={() => navigate("/cart")} 
                        className="p-6 text-xs uppercase tracking-[0.2em] font-medium text-zinc-900 hover:bg-zinc-100 cursor-pointer flex justify-between items-center transition-colors"
                    >
                        <span>Cart</span>
                        <span className="text-zinc-400">→</span>
                    </div>
                    <div 
                        onClick={() => navigate("/HelpCenter")} 
                        className="p-6 text-xs uppercase tracking-[0.2em] font-medium text-zinc-900 hover:bg-zinc-100 cursor-pointer flex justify-between items-center transition-colors"
                    >
                        <span>Help Center</span>
                        <span className="text-zinc-400">→</span>
                    </div>
                </div>

                {/* Logout Button Section */}
                <div className="pt-2">
                    <button 
                        onClick={handleLogout}
                        className="w-full border border-red-600 text-red-600 text-xs uppercase tracking-[0.2em] py-4 hover:bg-red-600 hover:text-white transition-colors font-medium shadow-sm"
                    >
                        Logout
                    </button>
                </div>

            </main>
        </div>
    );
}