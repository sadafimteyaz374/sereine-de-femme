import React from 'react';
import { Link } from 'react-router-dom';

export default function Team() {
  return (
    <div className="bg-white text-black min-h-screen px-6 py-16 md:py-24 font-sans selection:bg-black selection:text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
            The Mind Behind The Brand
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-black uppercase mb-6">
            Sadaf Imteyaz
          </h1>
          <div className="w-12 h-[1px] bg-gray-400 mx-auto"></div>
          <p className="text-gray-600 mt-6 text-sm md:text-base tracking-widest uppercase">
            Solo Creator & Visionary
          </p>
        </div>

        {/* Creator Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 border-t border-b border-gray-200 py-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-light tracking-wide text-black">
              Building Sereine, One Line of Code at a Time.
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light">
              Sereine De Femme is entirely designed, developed, and brought to life by a single creator. From architecting the backend databases and securing authentication to polishing every single pixel of this clean interface—every detail reflects a personal passion for pure elegance.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light">
              This project is a testament to the belief that simplicity, focus, and a bold vision can create experiences that speak louder than words.
            </p>
          </div>

          {/* Minimalist Profile Box (Gray Div) */}
          <div className="bg-gray-100 border border-gray-200 h-96 rounded-none p-8 flex flex-col justify-between shadow-sm relative group">
            <div className="absolute inset-0 border border-gray-300 m-2 pointer-events-none opacity-40"></div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500">Established 2026</span>
              <h3 className="text-xl font-light tracking-wider text-black mt-2">Sereine De Femme</h3>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-black font-mono tracking-widest">SOUL & CODE</p>
              <p className="text-xs text-gray-500">Crafted exclusively by Sadaf Imteyaz.</p>
            </div>
          </div>
        </div>

        {/* Minimalist Quote Section */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <p className="text-gray-700 text-lg md:text-xl font-light italic leading-relaxed">
            "Elegance is not standing out, but being remembered."
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center border-t border-gray-200 pt-16">
          <h2 className="text-xl font-light tracking-wider mb-4 text-black">Explore The Collection</h2>
          <p className="text-gray-500 text-sm mb-8 tracking-wider">
            Experience the clean aesthetic crafted for the modern individual.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-black text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-800 transition duration-300 rounded-none"
          >
            Shop Now
          </Link>
        </div>

      </div>
    </div>
  );
}