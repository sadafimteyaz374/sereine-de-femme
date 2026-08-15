import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroVideo() {
    const navigate = useNavigate();

    const handleVedio = () => {
        const emeraldProductId = "6a61bb51b21ba8a23dffc4b9"; 
        navigate(`/product/${emeraldProductId}`);
    };

    return(
        <div className="relative w-full h-[90vh] overflow-hidden bg-black flex items-center">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full">
                <video 
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover scale-105 animate-fade-in"
                >
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Premium Dark Gradient Overlay taaki text clear dikhe */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            </div>

            {/* Shop Now Button & Overlay Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 w-full flex flex-col items-start justify-center text-white">
                <span className="text-xs uppercase tracking-[0.3em] text-neutral-300 mb-3 font-light">
                    The Vault Reopened
                </span>
                <h1 className="text-4xl md:text-7xl font-serif tracking-wide mb-4 font-normal max-w-2xl leading-tight">
                    Regal Emerald Set
                </h1>
                <p className="text-base md:text-lg mb-8 font-light text-neutral-200 max-w-md leading-relaxed">
                    One of our most-loved vintage sets has officially returned to the collection.
                </p>
                <div>
                    <button 
                        onClick={handleVedio} 
                        className="group relative inline-flex items-center gap-3 bg-white text-black hover:bg-neutral-200 px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer shadow-lg"
                    >
                        <span>Shop Now</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}