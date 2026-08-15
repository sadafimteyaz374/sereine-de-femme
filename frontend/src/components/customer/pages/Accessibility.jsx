import React from 'react';

export default function Accessibility() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h1 className="text-3xl sm:text-4xl font-serif font-light tracking-widest text-zinc-900 uppercase mb-4 text-center">Accessibility Statement</h1>
            <div className="w-12 h-[1px] bg-zinc-400 mx-auto mb-10"></div>
            
            <div className="space-y-8 text-zinc-600 text-sm leading-relaxed">
                <section>
                    <h2 className="text-zinc-900 font-medium uppercase tracking-wider text-xs mb-3">Our Commitment</h2>
                    <p>We are dedicated to providing a digital experience that is fully accessible and inclusive for everyone, regardless of physical ability, technological setup, or assistive device usage. We strive to continually improve our platform's usability to meet web accessibility guidelines and standards.</p>
                </section>

                <section>
                    <h2 className="text-zinc-900 font-medium uppercase tracking-wider text-xs mb-3">Measures We Take</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Ensuring adequate color contrast for text and interface elements.</li>
                        <li>Providing descriptive alternative text (alt text) for images and visual content.</li>
                        <li>Designing layouts that support full keyboard navigation for users who cannot use a mouse.</li>
                        <li>Structuring semantic HTML to ensure compatibility with screen readers used by visually impaired individuals.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-zinc-900 font-medium uppercase tracking-wider text-xs mb-3">Feedback & Assistance</h2>
                    <p>We welcome your feedback on the accessibility of our website. If you encounter any barriers, technical difficulties, or require assistance accessing any part of our online store, please do not hesitate to contact our customer service team. We are always happy to help you complete your purchase or find the information you need.</p>
                </section>
            </div>
        </div>
    );
}