import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from "../../../config/api";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/contact`, formData);
            if (response.data.success) {
                setSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => {
                    setSubmitted(false);
                }, 4000);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            alert("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-white text-zinc-900 py-24 px-6 md:px-16 border-t border-zinc-200">
            <div className="max-w-4xl mx-auto text-center">
                
                {/* Section Title */}
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-light block mb-3">
                    Get in Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-serif tracking-wide font-normal mb-4">
                    Client Services & Inquiries
                </h2>
                <p className="text-zinc-500 text-sm font-light max-w-lg mx-auto mb-12 tracking-wide">
                    For assistance with orders, custom jewelry inquiries, or styling advice, please reach out to our concierge.
                </p>

                {/* Success Message */}
                {submitted && (
                    <div className="mb-8 p-4 bg-zinc-100 text-zinc-900 text-xs uppercase tracking-[0.2em] font-medium border border-zinc-300">
                        Thank you. Your message has been received.
                    </div>
                )}

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[11px] uppercase tracking-[0.2em] text-zinc-600 mb-2 font-medium">
                                Your Name
                            </label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name" 
                                className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-black transition-colors tracking-wider"
                            />
                        </div>
                        <div>
                            <label className="block text-[11px] uppercase tracking-[0.2em] text-zinc-600 mb-2 font-medium">
                                Email Address
                            </label>
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email" 
                                className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-black transition-colors tracking-wider"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[11px] uppercase tracking-[0.2em] text-zinc-600 mb-2 font-medium">
                            Message
                        </label>
                        <textarea 
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="How may we assist you?" 
                            className="w-full bg-zinc-50 border border-zinc-200 px-4 py-3 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-black transition-colors tracking-wider resize-none"
                        ></textarea>
                    </div>

                    <div className="text-center pt-4">
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-black text-white px-10 py-4 text-xs uppercase tracking-[0.25em] font-medium hover:bg-zinc-800 transition-colors w-full md:w-auto disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </div>
                </form>

            </div>
        </section>
    );
}