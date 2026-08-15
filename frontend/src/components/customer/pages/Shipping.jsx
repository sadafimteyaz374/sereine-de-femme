import React from 'react';

export default function Shipping() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-3xl sm:text-4xl font-serif font-light tracking-widest text-zinc-900 uppercase mb-4 text-center">Shipping & Delivery Policy</h1>
            <div className="w-12 h-[1px] bg-zinc-400 mx-auto mb-10"></div>
            
            <div className="space-y-8 text-zinc-600 text-sm leading-relaxed">
                <section>
                    <h2 className="text-zinc-900 font-medium uppercase tracking-wider text-xs mb-3">Order Processing & Dispatch</h2>
                    <p>All orders are processed and dispatched from our warehouse within 2 to 3 business days (excluding weekends and public holidays). Once your order has been successfully shipped, you will receive an automated email containing your tracking information and carrier details.</p>
                </section>

                <section>
                    <h2 className="text-zinc-900 font-medium uppercase tracking-wider text-xs mb-3">Delivery Timelines & Options</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="border border-zinc-200 p-5 bg-zinc-50">
                            <h3 className="text-zinc-900 font-medium mb-2 uppercase text-xs">Standard Shipping</h3>
                            <p>Typically takes 5 to 7 business days for delivery across domestic locations. Free shipping is applicable on all orders exceeding our promotional cart value threshold.</p>
                        </div>
                        <div className="border border-zinc-200 p-5 bg-zinc-50">
                            <h3 className="text-zinc-900 font-medium mb-2 uppercase text-xs">Express Shipping</h3>
                            <p>Delivered within 2 to 3 business days. Available as an upgraded shipping option during checkout for urgent deliveries.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-zinc-900 font-medium uppercase tracking-wider text-xs mb-3">Shipping Delays & Issues</h2>
                    <p>While we make every effort to ensure timely delivery, unexpected logistical delays, weather conditions, or regional restrictions may occasionally impact transit times. If your package is significantly delayed, please reach out to our support team, and we will coordinate with the courier partner to locate your shipment immediately.</p>
                </section>
            </div>
        </div>
    );
}