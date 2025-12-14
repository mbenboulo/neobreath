"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import SupportModal from "./SupportModal";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSupportOpen, setIsSupportOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className={`sticky top-0 z-50 w-full border-b border-[#23482f] bg-background-dark/80 backdrop-blur-md`}>
                <div className="layout-container flex justify-center">
                    <div className="flex w-full max-w-[960px] items-center justify-between px-4 py-3 md:px-10">
                        <div className="flex items-center gap-4 text-white">
                            <Link href="/" className="flex items-center gap-4">
                                <div className="flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-3xl">medical_services</span>
                                </div>
                                <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">NeoBreath Guard</h2>
                            </Link>
                        </div>
                        <div className="hidden md:flex flex-1 justify-end gap-8">
                            <div className="flex items-center gap-9">
                                <Link href="#motivation" className="text-white hover:text-primary transition-colors text-sm font-medium leading-normal">Motivation</Link>
                                <Link href="#technology" className="text-white hover:text-primary transition-colors text-sm font-medium leading-normal">Technology</Link>
                                <Link href="#impact" className="text-white hover:text-primary transition-colors text-sm font-medium leading-normal">Impact</Link>
                            </div>
                            <button
                                onClick={() => setIsSupportOpen(true)}
                                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-primary text-[#112217] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-white transition-colors"
                            >
                                <span className="truncate">Support Us</span>
                            </button>
                        </div>
                        <div className="md:hidden text-white cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            <span className="material-symbols-outlined">menu</span>
                        </div>
                    </div>
                </div>
                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-[#102216] border-b border-[#23482f] py-4 px-4 flex flex-col gap-4">
                        <Link href="#motivation" className="text-white hover:text-primary transition-colors text-sm font-medium">Motivation</Link>
                        <Link href="#technology" className="text-white hover:text-primary transition-colors text-sm font-medium">Technology</Link>
                        <Link href="#impact" className="text-white hover:text-primary transition-colors text-sm font-medium">Impact</Link>
                        <button
                            onClick={() => {
                                setIsSupportOpen(true);
                                setIsMobileMenuOpen(false);
                            }}
                            className="w-full h-10 rounded-full bg-primary text-[#112217] text-sm font-bold"
                        >
                            Support Us
                        </button>
                    </div>
                )}
            </nav>
            <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
        </>
    );
}
