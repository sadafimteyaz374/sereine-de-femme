import React, { useState, useEffect, useRef } from "react";
import api from "../../../config/api";
import { MessageSquare, Send, X, Bot, User, HelpCircle, Sparkles } from "lucide-react";

const HelpCenter = () => {
    const [isOpen, setIsOpen] = useState(false); // Floating widget ke liye toggle state
    const [messages, setMessages] = useState([
        { sender: "ai", text: "Hello! Welcome to Sereine De Femme Help Center. How can I assist you with our products, shipping, or returns today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading, isOpen]);

    const handleSendMessage = async (textToSend) => {
        const messageText = textToSend || input;
        if (!messageText.trim() || loading) return;

        setInput("");
        setMessages((prev) => [...prev, { sender: "user", text: messageText }]);
        setLoading(true);

        try {
            const response = await api.post('/faq/chat', { message: messageText });
            if (response.data.success) {
                setMessages((prev) => [...prev, { sender: "ai", text: response.data.reply }]);
            } else {
                setMessages((prev) => [...prev, { sender: "ai", text: "Sorry, I couldn't get an answer right now. Please try again." }]);
            }
        } catch (err) {
            console.error("Chat error:", err);
            setMessages((prev) => [...prev, { sender: "ai", text: "The AI service is busy. Please try asking again in a moment." }]);
        } finally {
            setLoading(false);
        }
    };

    const quickChips = [
        "What is shipping time?",
        "Return & Exchange Policy",
        "Where is my order?"
    ];

    return (
        <>
            {/* Dedicated Page View (Agar koi /help page par aaye) */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
                    <div className="inline-flex p-3 rounded-full bg-zinc-100 text-zinc-900 mb-2">
                        <HelpCircle size={24} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-light tracking-widest text-zinc-900 uppercase">
                        Help Center & FAQs
                    </h1>
                    <div className="w-12 h-[1px] bg-zinc-400 mx-auto"></div>
                    <p className="text-xs uppercase tracking-widest text-zinc-500 leading-relaxed">
                        Have questions about shipping, returns, or our collections? Ask our AI assistant instantly.
                    </p>
                </div>
            </div>

            {/* Floating Chat Bubble Button (Bottom Right Corner) */}
            <div className="fixed bottom-6 right-6 z-50">
                {!isOpen && (
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-zinc-900 text-white p-4 rounded-full shadow-2xl hover:bg-zinc-800 transition transform hover:scale-105 flex items-center space-x-2 group"
                    >
                        <MessageSquare size={22} />
                        <span className="text-xs uppercase tracking-wider font-medium max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out">
                            Need Help?
                        </span>
                    </button>
                )}

                {/* Floating Chat Window Modal */}
                {isOpen && (
                    <div className="bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col w-[360px] sm:w-[380px] h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-300">
                        {/* Chat Header */}
                        <div className="bg-zinc-900 text-white px-4 py-3 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                                    <Bot size={16} />
                                </div>
                                <div>
                                    <h2 className="text-[11px] uppercase tracking-widest font-medium">Sereine Assistant</h2>
                                    <p className="text-[9px] text-zinc-400 tracking-wider">Online | Powered by AI</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-400 hover:text-white transition p-1"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages List */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-zinc-50/50">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start space-x-2 ${msg.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                                >
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0 ${
                                        msg.sender === "user" ? "bg-zinc-900 text-white" : "bg-zinc-200 text-zinc-800"
                                    }`}>
                                        {msg.sender === "user" ? <User size={12} /> : <Bot size={12} />}
                                    </div>
                                    <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[11px] leading-relaxed ${
                                        msg.sender === "user" 
                                            ? "bg-zinc-900 text-white rounded-tr-none" 
                                            : "bg-white text-zinc-800 border border-zinc-200 rounded-tl-none shadow-sm"
                                    }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex items-center space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-zinc-200 text-zinc-800 flex items-center justify-center text-[10px]">
                                        <Bot size={12} />
                                    </div>
                                    <div className="bg-white border border-zinc-200 px-3 py-2 rounded-2xl rounded-tl-none text-[11px] text-zinc-400 tracking-widest animate-pulse">
                                        Thinking...
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Suggestion Chips */}
                        <div className="px-3 py-2 bg-zinc-50 border-t border-zinc-100 flex gap-1.5 overflow-x-auto no-scrollbar">
                            {quickChips.map((chip, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSendMessage(chip)}
                                    className="text-[10px] bg-white border border-zinc-200 text-zinc-700 px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-zinc-900 hover:text-white transition shadow-2xs"
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>

                        {/* Input Bar */}
                        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 bg-white border-t border-zinc-200 flex items-center space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-[11px] focus:outline-none focus:border-zinc-400 transition"
                            />
                            <button
                                type="submit"
                                disabled={loading || !input.trim()}
                                className="bg-zinc-900 text-white p-2.5 rounded-xl hover:bg-zinc-800 transition disabled:opacity-50 flex items-center justify-center"
                            >
                                <Send size={14} />
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
};

export default HelpCenter;