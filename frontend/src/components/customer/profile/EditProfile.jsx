import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

export default function EditProfile() {
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
    const [saving, setSaving] = useState(false);
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
                // Corrected API endpoint matching backend route (/api/profile/user)
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
                console.error("Error fetching profile:", error);
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

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        setSaving(true);
        try {
            // Corrected API endpoint matching backend route (/api/profile/update)
            await axios.put(`${API_BASE_URL}/api/profile/update`, {
                phone: user.phone,
                gender: user.gender,
                language: user.language,
                occupation: user.occupation,
                city: user.city,
                state: user.state,
                pincode: user.pincode,
                address: user.address
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Profile updated successfully!");
            navigate("/profile"); 
        } catch (error) {
            console.error("Update error:", error);
            alert(error.response?.data?.message || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white text-black flex items-center justify-center">
                <div className="flex flex-col items-center space-y-3">
                    <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-xs tracking-[0.3em] uppercase text-zinc-400">Loading Profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900 selection:bg-black selection:text-white">
            
            {/* Header */}
            <header className="border-b border-zinc-200 px-6 md:px-16 py-6 flex justify-between items-center bg-white sticky top-0 z-10 shadow-sm/3">
                <button 
                    onClick={() => navigate("/profile")}
                    className="text-xs uppercase tracking-[0.25em] text-zinc-500 hover:text-black transition-colors flex items-center gap-1 font-medium"
                >
                    ← Back to Profile
                </button>
                <h1 className="text-xs uppercase tracking-[0.3em] font-semibold text-zinc-900 hidden sm:block">
                    EDIT ACCOUNT
                </h1>
                <div className="w-16"></div>
            </header>

            {/* Main Form Container */}
            <main className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-16">
                
                <div className="text-center mb-10">
                    <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 block mb-2 font-medium">
                        Modify Details
                    </span>
                    <h2 className="text-3xl font-serif font-light tracking-wide uppercase">
                        Edit Profile
                    </h2>
                </div>

                <div className="border border-zinc-200 p-8 md:p-12 bg-[#fafafa] shadow-sm rounded-none">
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <h4 className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-semibold border-b border-zinc-200 pb-3">
                            Personal Information
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Fixed Fields */}
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2 font-medium">Full Name (Fixed)</label>
                                <input 
                                    type="text" 
                                    value={user.name} 
                                    disabled
                                    className="w-full bg-zinc-100 border border-zinc-300 p-3 text-sm text-zinc-500 cursor-not-allowed select-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2 font-medium">Email Address (Fixed)</label>
                                <input 
                                    type="email" 
                                    value={user.email} 
                                    disabled
                                    className="w-full bg-zinc-100 border border-zinc-300 p-3 text-sm text-zinc-500 cursor-not-allowed select-none"
                                />
                            </div>

                            {/* Editable Fields */}
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-700 mb-2 font-medium">Phone Number</label>
                                <input 
                                    type="text" 
                                    name="phone" 
                                    value={user.phone} 
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className="w-full bg-white border border-zinc-300 p-3 text-sm text-zinc-900 focus:outline-none focus:border-black transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-700 mb-2 font-medium">Gender</label>
                                <select 
                                    name="gender" 
                                    value={user.gender} 
                                    onChange={handleChange}
                                    className="w-full bg-white border border-zinc-300 p-3 text-sm text-zinc-900 focus:outline-none focus:border-black transition-colors"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-700 mb-2 font-medium">Language Spoken</label>
                                <input 
                                    type="text" 
                                    name="language" 
                                    value={user.language} 
                                    onChange={handleChange}
                                    placeholder="e.g. English, Hindi"
                                    className="w-full bg-white border border-zinc-300 p-3 text-sm text-zinc-900 focus:outline-none focus:border-black transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-700 mb-2 font-medium">Occupation</label>
                                <input 
                                    type="text" 
                                    name="occupation" 
                                    value={user.occupation} 
                                    onChange={handleChange}
                                    placeholder="e.g. Designer, Engineer"
                                    className="w-full bg-white border border-zinc-300 p-3 text-sm text-zinc-900 focus:outline-none focus:border-black transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-700 mb-2 font-medium">City</label>
                                <input 
                                    type="text" 
                                    name="city" 
                                    value={user.city} 
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                    className="w-full bg-white border border-zinc-300 p-3 text-sm text-zinc-900 focus:outline-none focus:border-black transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-700 mb-2 font-medium">State</label>
                                <input 
                                    type="text" 
                                    name="state" 
                                    value={user.state} 
                                    onChange={handleChange}
                                    placeholder="Enter state"
                                    className="w-full bg-white border border-zinc-300 p-3 text-sm text-zinc-900 focus:outline-none focus:border-black transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-zinc-700 mb-2 font-medium">Pincode</label>
                                <input 
                                    type="text" 
                                    name="pincode" 
                                    value={user.pincode} 
                                    onChange={handleChange}
                                    placeholder="Enter pincode"
                                    className="w-full bg-white border border-zinc-300 p-3 text-sm text-zinc-900 focus:outline-none focus:border-black transition-colors"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs uppercase tracking-wider text-zinc-700 mb-2 font-medium">Address</label>
                                <textarea 
                                    name="address" 
                                    value={user.address} 
                                    onChange={handleChange}
                                    rows="3"
                                    placeholder="Enter full address"
                                    className="w-full bg-white border border-zinc-300 p-3 text-sm text-zinc-900 focus:outline-none focus:border-black transition-colors resize-none"
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-zinc-200">
                            <button 
                                type="submit"
                                disabled={saving}
                                className="bg-black text-white text-xs uppercase tracking-[0.2em] py-3.5 px-8 hover:bg-zinc-800 transition-colors disabled:bg-zinc-400 font-medium"
                            >
                                {saving ? "Saving Changes..." : "Save Changes"}
                            </button>
                            <button 
                                type="button"
                                onClick={() => navigate("/profile")}
                                className="border border-zinc-300 text-zinc-700 text-xs uppercase tracking-[0.2em] py-3.5 px-8 hover:border-black hover:text-black transition-colors font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

            </main>
        </div>
    );
}