import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TrackOrder() {
    const navigate = useNavigate();

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-3xl sm:text-4xl font-serif font-light tracking-widest text-zinc-900 uppercase mb-4 text-center">Track Your Order</h1>
            <div className="w-12 h-[1px] bg-zinc-400 mx-auto mb-10"></div>
            
            {/* Instruction Banner */}
            <div className="p-8 bg-zinc-50 border border-zinc-200 text-center mb-10 space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-900">How to track your orders</h2>
                <p className="text-zinc-600 text-sm leading-relaxed max-w-lg mx-auto">
                    To check the live status of your shipments, view past purchases, or download invoices, please visit your account profile where all your order details are securely managed.
                </p>
                <div className="pt-2">
                    <button 
                        onClick={() => navigate('/profile')} 
                        className="bg-black text-white px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-zinc-800 transition-colors"
                    >
                        Go to My Profile Orders
                    </button>
                </div>
            </div>

            {/* Extra Help Section */}
            <div className="p-6 border border-zinc-200 bg-white text-center space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">Need Extra Help?</h3>
                <p className="text-xs text-zinc-600 max-w-md mx-auto">
                    Facing issues with your delivery, damaged items, or have general queries? Our support team is here to assist you.
                </p>
                <div className="pt-1">
                    <button 
                        onClick={() => navigate('/helpCentre')} 
                        className="text-xs uppercase tracking-[0.15em] font-medium text-black underline hover:text-zinc-600 transition-colors"
                    >
                        Visit Help Center & Support →
                    </button>
                </div>
            </div>
        </div>
    );
}