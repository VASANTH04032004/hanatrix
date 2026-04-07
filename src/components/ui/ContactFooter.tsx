"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import clsx from "clsx";

export default function ContactFooter() {
    const [formState, setFormState] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('sending');
        // Simulate network request
        setTimeout(() => {
            setFormState('sent');
            setTimeout(() => setFormState('idle'), 3000);
        }, 1500);
    };

    return (
        <footer className="w-full relative bg-dark-bg border-t-8 border-violet-primary" id="contact">
            {/* Footer Train Animation */}
            <div className="absolute top-0 transform -translate-y-[calc(100%+8px)] left-0 w-full overflow-hidden h-24 pointer-events-none z-20">
                <motion.div
                    initial={{ x: "-10%" }}
                    animate={{ x: "110%" }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 flex items-end gap-1 shrink-0 w-[500px]"
                >
                    {/* Train Engine */}
                    <div className="relative">
                        <div className="w-16 h-12 bg-violet-primary rounded-t-xl rounded-l-none"></div>
                        <div className="w-24 h-8 bg-violet-primary absolute bottom-0 -left-8 rounded-l-xl"></div>
                        <div className="w-8 h-12 bg-gold-primary absolute bottom-8 -left-4 rounded-t-xl"></div>
                        {/* Wheels */}
                        <div className="w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-400 absolute -bottom-3 left-2 animate-spin-slow"></div>
                        <div className="w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-400 absolute -bottom-3 left-10 animate-spin-slow"></div>
                        <div className="w-8 h-8 bg-gray-800 rounded-full border-2 border-gray-400 absolute -bottom-4 -left-6 animate-spin-slow"></div>
                        {/* Smoke */}
                        <div className="w-4 h-4 bg-white rounded-full absolute -top-4 -left-3 animate-ping"></div>
                        <div className="w-6 h-6 bg-white rounded-full absolute -top-8 -left-6 animate-ping animation-delay-500"></div>
                    </div>
                    {/* Carriages */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="relative ml-2">
                            <div className="w-4 h-2 bg-gray-600 absolute bottom-2 -left-3"></div>
                            <div className={clsx("w-20 h-10 rounded-xl", i === 1 ? "bg-violet-medium" : i === 2 ? "bg-violet-light" : "bg-violet-deep")}></div>
                            <div className="w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-400 absolute -bottom-3 left-2 animate-spin-slow"></div>
                            <div className="w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-400 absolute -bottom-3 right-2 animate-spin-slow"></div>
                            {/* Toy in carriage */}
                            <div className="w-8 h-8 bg-white/50 rounded-full absolute -top-4 left-6 animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, staggerChildren: 0.2 }}
                        className="flex flex-col justify-center"
                    >
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="font-display text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-light via-violet-primary to-gold-primary mb-6">
                            Ready to Play?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-dark-muted mb-12 text-xl max-w-md">
                            Have a question about our toys, want to partner with us, or just want to say hello? Get in touch!
                        </motion.p>

                        <div className="space-y-8">
                            <motion.div
                                whileHover={{ scale: 1.05, x: 10 }}
                                className="flex items-center gap-6 text-dark-text hover:text-violet-primary transition-all cursor-pointer group">
                                <div className="w-14 h-14 bg-white/5 group-hover:bg-violet-light/20 rounded-2xl flex items-center justify-center -rotate-12 group-hover:rotate-0 transition-all duration-300 shadow-lg">
                                    <Phone className="text-violet-light w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Call Us</p>
                                    <p className="text-2xl font-medium">+91 7339321803</p>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05, x: 10 }}
                                className="flex items-center gap-6 text-dark-text hover:text-violet-primary transition-all cursor-pointer group">
                                <div className="w-14 h-14 bg-white/5 group-hover:bg-violet-primary/20 rounded-2xl flex items-center justify-center rotate-12 group-hover:rotate-0 transition-all duration-300 shadow-lg">
                                    <Mail className="text-violet-primary w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Email Us</p>
                                    <p className="text-2xl font-medium">info.contact@hanatrix.com</p>
                                </div>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05, x: 10 }}
                                className="flex items-center gap-6 text-gray-300 hover:text-white transition-all cursor-pointer group">
                                <div className="w-14 h-14 bg-white/5 group-hover:bg-gold-primary/20 rounded-2xl flex items-center justify-center -rotate-6 group-hover:rotate-0 transition-all duration-300 shadow-lg">
                                    <MapPin className="text-gold-primary w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Visit Us</p>
                                    <p className="text-xl leading-snug font-medium">
                                        Worldwide through<br />magical experiences
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <div className="bg-dark-surface p-8 rounded-[2rem] shadow-2xl relative border border-dark-border">
                        <div className="absolute -top-6 -right-6 text-6xl animate-bounce">
                            ✉️
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-violet-light/50 text-dark-text focus:outline-none focus:ring-4 focus:ring-violet-primary/20 focus:border-violet-primary transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-violet-light/50 text-dark-text focus:outline-none focus:ring-4 focus:ring-violet-primary/20 focus:border-violet-primary transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-dark-surface border border-dark-border text-white focus:outline-none focus:ring-4 focus:ring-violet-primary/20 focus:border-violet-primary transition-all resize-none"
                                    placeholder="Tell us about the magic you want to create..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={formState !== 'idle'}
                                className={clsx(
                                    "w-full py-4 rounded-xl font-bold text-lg text-white transition-all transform active:scale-95 flex items-center justify-center gap-2",
                                    formState === 'idle' && "bg-gradient-to-r from-violet-deep to-violet-primary hover:from-violet-primary hover:to-violet-medium hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/30",
                                    formState === 'sending' && "bg-gray-400 animate-pulse",
                                    formState === 'sent' && "bg-violet-light text-violet-deep"
                                )}
                            >
                                {formState === 'idle' && <><Send size={20} /> Send Message</>}
                                {formState === 'sending' && "Sending Magic..."}
                                {formState === 'sent' && "✨ Magic Sent! ✨"}
                            </button>
                        </form>
                    </div>

                </div>

                {/* Copyright Footer */}
                <div className="mt-20 pt-8 border-t border-gray-800 text-center flex flex-col items-center justify-center gap-4">
                    <div className="font-display font-bold text-3xl tracking-tight text-white/50">
                        Hanatrix
                    </div>
                    <p className="text-gray-500 text-sm">
                        © 2026 Hanatrix. All rights reserved. | Designed with ❤️ for magical worlds.
                    </p>
                </div>
            </div >
        </footer >
    );
}
