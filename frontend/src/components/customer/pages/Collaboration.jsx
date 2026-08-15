import React from 'react';
import { Link } from 'react-router-dom';

export default function Collaborations() {
  return (
    <div className="bg-white text-black min-h-screen px-6 py-16 md:py-24 font-sans selection:bg-black selection:text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-3">
            Partnerships & Projects
          </p>
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-black uppercase mb-6">
            Collaborations
          </h1>
          <div className="w-12 h-[1px] bg-gray-400 mx-auto"></div>
          <p className="text-gray-600 mt-6 text-sm md:text-base tracking-widest uppercase">
            Creating Together, Growing Together
          </p>
        </div>

        {/* Intro / Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20 border-t border-b border-gray-200 py-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-light tracking-wide text-black">
              Let’s Create Something Extraordinary.
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light">
              Sereine De Femme is always open to meaningful partnerships with creative minds, stylists, and visionary brands who share a passion for minimalism and timeless elegance.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base font-light">
              Whether you are looking for editorial features, curated collections, or creative brand alignments, we would love to hear your ideas.
            </p>
          </div>

          {/* Minimalist Info Box (Gray Div) */}
          <div className="bg-gray-100 border border-gray-200 h-80 rounded-none p-8 flex flex-col justify-between shadow-sm relative group">
            <div className="absolute inset-0 border border-gray-300 m-2 pointer-events-none opacity-40"></div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500">Inquiries</span>
              <h3 className="text-xl font-light tracking-wider text-black mt-2">Partner With Us</h3>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-black font-mono tracking-widest">CONNECT</p>
              <p className="text-xs text-gray-500">Reach out directly via our contact desk.</p>
            </div>
          </div>
        </div>

        {/* Call to Action - Redirect to Contact Us */}
        <div className="text-center border-t border-gray-200 pt-16">
          <h2 className="text-xl font-light tracking-wider mb-4 text-black">Ready to Collaborate?</h2>
          <p className="text-gray-500 text-sm mb-8 tracking-wider max-w-lg mx-auto">
            Get in touch with us through our contact page to discuss proposals, ideas, and partnership opportunities.
          </p>
          <Link 
            to="/contactUs" 
            className="inline-block bg-black text-white px-10 py-4 text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-800 transition duration-300 rounded-none"
          >
            Contact Us
          </Link>
        </div>

      </div>
    </div>
  );
}