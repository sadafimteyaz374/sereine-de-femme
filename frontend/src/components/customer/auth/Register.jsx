import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../config/api";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
                name, 
                email,
                password
            });

            if (response.data.success) {
                alert("Account created successfully! Please login.");
                navigate("/login");
            }
        } catch (error) {
            console.log("Registration error ", error);
            alert(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-white px-4 py-12">
            <div className="max-w-md w-full bg-white border border-zinc-200 p-8 md:p-10 shadow-sm">
                
                <h1 className="text-xl md:text-2xl font-black uppercase tracking-[0.25em] text-center text-zinc-900 mb-8">
                    Create Account
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-700 mb-2">
                            Full Name
                        </label>
                        <input 
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-black transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-black transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-black transition-colors"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white text-[11px] font-bold uppercase tracking-[0.25em] py-3.5 hover:bg-zinc-800 transition-colors mt-4"
                    >
                        Register
                    </button>
                </form>

                <div className="text-center mt-6">
                    <Link
                        to="/login"
                        className="text-[11px] tracking-wider uppercase font-semibold text-zinc-600 hover:text-black transition-colors border-b border-zinc-300 pb-0.5"
                    >
                        Already have an account? Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
}