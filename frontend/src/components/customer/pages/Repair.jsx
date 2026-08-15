import React from 'react';

export default function Repair() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-3xl sm:text-4xl font-serif font-light tracking-widest text-zinc-900 uppercase mb-4 text-center">Product Care & Repair Services</h1>
            <div className="w-12 h-[1px] bg-zinc-400 mx-auto mb-10"></div>
            
            <div className="space-y-8 text-zinc-600 text-sm leading-relaxed">
                <section>
                    <h2 className="text-zinc-900 font-medium uppercase tracking-wider text-xs mb-3">Our Commitment to Quality</h2>
                    <p>Every piece in our collection is crafted with the highest standards of quality and attention to detail. However, we understand that accidents happen or items may experience wear and tear over time. Our dedicated artisan workshop is equipped to breathe new life into your cherished possessions.</p>
                </section>

                <section>
                    <h2 className="text-zinc-900 font-medium uppercase tracking-wider text-xs mb-3">The Repair Process</h2>
                    <ol className="list-decimal pl-5 space-y-3">
                        <li><strong>Submit a Request:</strong> Reach out to our customer support team via email or phone with clear photographs of the damage, your order ID, and a brief description of the issue.</li>
                        <li><strong>Evaluation:</strong> Our expert craftsmen will evaluate the item to determine whether it can be repaired and if it falls under our complimentary warranty guidelines or requires a nominal repair fee.</li>
                        <li><strong>Shipping & Packaging:</strong> Once approved, we will provide secure shipping instructions to safely mail the product back to our central workshop.</li>
                        <li><strong>Restoration & Return:</strong> Our artisans will meticulously restore the item, conduct quality checks, and ship it back directly to your doorstep.</li>
                    </ol>
                </section>

                <section>
                    <h2 className="text-zinc-900 font-medium uppercase tracking-wider text-xs mb-3">Warranty Guidelines</h2>
                    <p>We offer a 6-month limited warranty on manufacturing defects. Please note that normal wear and tear, accidental damage caused by misuse, or alterations done by third parties are not covered under the complimentary warranty policy.</p>
                </section>
            </div>
        </div>
    );
}