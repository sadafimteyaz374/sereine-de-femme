import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-800 min-h-screen px-6 py-12 md:py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            Welcome to Sereine
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 mb-4 text-gray-900">
            Redefining <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Elegance</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-base md:text-lg max-w-xl mx-auto">
            Crafting statement pieces that blend bold modern trends with timeless grace.
          </p>
        </div>

        {/* Brand Story / Introduction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 leading-snug">
              Built with Passion, Driven by Style ✨
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              We aren't just a brand; we are a movement towards confidence and self-expression. Every collection we curate is designed to make you stand out effortlessly, combining high-end quality with everyday wearability.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              From meticulous fabric selection to flawless delivery, your experience is at the center of our universe.
            </p>
            <div className="pt-2">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-purple-200 hover:bg-purple-700 hover:scale-105 transition transform duration-200"
              >
                Explore Collection →
              </Link>
            </div>
          </div>

          {/* Logo / Image Box with Glow Effect */}
          <div className="relative flex items-center justify-center">
            <div className="absolute w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="bg-white border border-gray-100 h-96 w-full rounded-2xl shadow-xl overflow-hidden flex items-center justify-center p-6 transform hover:rotate-1 transition duration-300">
              <img 
                src='/logo1.png' 
                alt="Brand Logo" 
                className="w-40 h-40 object-contain drop-shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Values Section (Energetic Cards) */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900">Why Choose Us?</h3>
            <p className="text-gray-500 text-sm mt-1">The pillars that keep us moving forward</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-purple-600 group-hover:text-white transition">
                ⚡
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">Unmatched Quality</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Premium materials crafted with rigorous standards so you always look and feel your absolute best.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
              <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-pink-600 group-hover:text-white transition">
                💎
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">Trendsetting Design</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Fresh, bold, and modern aesthetics tailored to turn heads wherever you go.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-indigo-600 group-hover:text-white transition">
                💖
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">Customer Love</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Dedicated support and smooth experiences because your happiness is our ultimate success.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 relative z-10">Ready to Upgrade Your Style?</h2>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto relative z-10 text-sm md:text-base">
            Dive into our exclusive catalog and find pieces that match your vibrant energy today.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-white text-black px-8 py-3.5 rounded-xl font-semibold shadow-md hover:bg-gray-100 hover:scale-105 transition transform duration-200 relative z-10"
          >
            Start Shopping Now
          </Link>
        </div>

      </div>
    </div>
  );
}