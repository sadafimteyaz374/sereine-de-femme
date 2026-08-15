import React from 'react';

export default function ReturnPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-3xl sm:text-4xl font-serif font-light tracking-widest text-zinc-900 uppercase mb-4 text-center">Returns & Exchanges Policy</h1>
            <div className="w-12 h-[1px] bg-zinc-400 mx-auto mb-10"></div>
            
            <div className="space-y-8 text-zinc-600 text-sm leading-relaxed">
                <section>
                    <h2 className="text-zinc-900 font-medium uppercase tracking-wider text-xs mb-3">Our 7-Day Return Window</h2>
                    <p>We want you to love your purchase. If for any reason you are not completely satisfied, you may request a return or exchange within 7 days from the date of delivery. Items must be sent back in their original, unused state to qualify for a refund.</p>
                </section>

                <section>
                    <h2 className="text-zinc-900 font-medium uppercase tracking-wider text-xs mb-3">Eligibility Conditions</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Products must be completely unworn, unwashed, and undamaged.</li>
                        <li>All original brand tags, labels, and protective packaging must remain intact.</li>
                        <li>Custom-made items, personalized products, and final sale clearance items are strictly non-returnable.</li>
                        <li>Freebies or promotional items included with the order must also be returned.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-zinc-900 font-medium uppercase tracking-wider text-xs mb-3">Refund Processing</h2>
                    <p>Once your returned item is received at our facility, our quality inspection team will evaluate its condition. If approved, your refund will be processed back to your original mode of payment within 5 to 7 business days, or issued as store credit based on your preference.</p>
                </section>
            </div>
        </div>
    );
}