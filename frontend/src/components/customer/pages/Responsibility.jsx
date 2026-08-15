import React from 'react';
import { Link } from 'react-router-dom';

export default function Responsibility() {
  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-800 min-h-screen px-6 py-12 md:py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20">
          <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
            Our Commitment
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-4 mb-4 text-gray-900">
            Sustaining Our <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Future</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 text-base md:text-lg max-w-xl mx-auto">
            Creating timeless pieces with conscious choices, ethical practices, and deep respect for our planet.
          </p>
        </div>

        {/* Intro Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 leading-snug">
              Beauty Without Compromise 🌿
            </h2>
            <p className="text-gray-600 leading-relaxed text-base">
              At Sereine De Femme, we believe true luxury shouldn't cost the earth. Every step of our creation process—from raw material sourcing to final packaging—is guided by responsibility and care.
            </p>
            <p className="text-gray-600 leading-relaxed text-base">
              We work closely with ethical partners to ensure fair wages, safe working environments, and environmentally friendly production methods.
            </p>
          </div>

          <div className="bg-white border border-gray-100 h-80 rounded-2xl shadow-xl overflow-hidden flex items-center justify-center p-8 bg-gradient-to-br from-emerald-50 to-teal-50">
            <div className="text-center">
              <span className="text-4xl">🌍</span>
              <h4 className="font-bold text-gray-900 mt-3 text-lg">Conscious Luxury</h4>
              <p className="text-gray-500 text-sm mt-1">Ethically sourced, sustainably crafted.</p>
            </div>
          </div>
        </div>

        {/* Pillars of Responsibility */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900">Our Core Pillars</h3>
            <p className="text-gray-500 text-sm mt-1">How we put our values into action everyday</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-emerald-600 group-hover:text-white transition">
                ♻️
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">Eco-Friendly Packaging</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our packaging materials are 100% recyclable, minimizing waste while keeping your unboxing experience magical.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-teal-600 group-hover:text-white transition">
                🤝
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">Fair & Ethical Labor</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                We partner only with artisans and workshops that guarantee fair compensation, safety, and respect for all workers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition duration-300 group">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl font-bold mb-6 group-hover:bg-green-600 group-hover:text-white transition">
                🌱
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">Sustainable Sourcing</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Materials are carefully selected to reduce environmental footprints and promote long-lasting durability.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute -left-20 -top-20 w-64 h-64 bg-emerald-600 rounded-full blur-3xl opacity-20"></div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 relative z-10">Join Us on Our Journey</h2>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto relative z-10 text-sm md:text-base">
            Every choice you make with us supports a more sustainable and conscious future.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-white text-black px-8 py-3.5 rounded-xl font-semibold shadow-md hover:bg-gray-100 hover:scale-105 transition transform duration-200 relative z-10"
          >
            Explore Conscious Styles
          </Link>
        </div>

      </div>
    </div>
  );
}