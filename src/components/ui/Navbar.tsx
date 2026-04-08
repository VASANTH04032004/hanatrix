"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const navLinks = [
    { name: "Toy World", href: "#toy-world" },
    { name: "Fun Zone", href: "#fun-zone" },
    { name: "Story", href: "#story" },
    { name: "Gallery", href: "#gallery" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={clsx(
                "fixed top-0 w-full z-50 transition-all duration-500 ease-in-out px-6 py-4",
                isScrolled
                    ? "bg-dark-bg/80 backdrop-blur-md shadow-lg shadow-violet-primary/20 border-b border-dark-border"
                    : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-2 md:gap-4">
                    <div className="relative w-12 h-12 md:w-16 md:h-16 transform group-hover:scale-105 transition-transform duration-300">
                        <Image
                            src="/logo.png"
                            alt="Hanatrix Logo"
                            fill
                            className="object-contain mix-blend-multiply transition-all hover:scale-110 duration-500 ease-in-out"
                            sizes="(max-width: 64px) 100vw, 64px"
                            priority
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-display font-bold text-2xl md:text-3xl tracking-tight bg-gradient-to-r from-violet-light to-violet-primary bg-clip-text text-transparent">
                            Hanatrix
                        </span>
                        <span className="text-[0.5rem] md:text-[0.65rem] uppercase tracking-[0.2em] text-violet-primary font-bold mt-[-4px]">
                            Eternal Play Power
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-bold text-dark-muted hover:text-dark-text transition-colors px-2 py-1 relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-primary to-violet-light transition-all group-hover:w-full rounded-full"></span>
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        className="ml-4 bg-gradient-to-r from-violet-primary to-violet-deep hover:from-violet-medium hover:to-violet-primary text-white px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-violet-primary/30"
                    >
                        Contact Us
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-dark-text hover:text-violet-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <div
                className={clsx(
                    "md:hidden absolute top-full left-0 w-full bg-dark-bg/95 backdrop-blur-md border-b border-dark-border shadow-lg shadow-violet-primary/20 transition-all duration-300 overflow-hidden",
                    isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="flex flex-col px-6 py-4 gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-base font-medium text-dark-text hover:text-violet-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="#contact"
                        className="bg-gradient-to-r from-violet-primary to-violet-deep text-white text-center px-6 py-3 rounded-xl font-medium mt-2 shadow-md hover:shadow-violet-primary/30 transition-all"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </nav>
    );
}
