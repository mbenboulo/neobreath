"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const isTechnologyPage = pathname === '/technology';

    return (
        <footer className="w-full border-t border-[#23482f] bg-[#0d1a12] py-12">
            <div className="max-w-[960px] mx-auto px-4 md:px-10">
                {/* Main Footer Content */}
                <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-white">
                            <span className="material-symbols-outlined text-primary">medical_services</span>
                            <span className="font-bold text-lg">NeoBreath Guard</span>
                        </div>
                        <p className="text-white/50 text-sm max-w-[300px]">
                            Advanced technology dedicated to protecting the most vulnerable lives.
                        </p>
                    </div>

                    {/* Product Section */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-white font-bold text-sm">Product</h4>
                        {isTechnologyPage ? (
                            <>
                                <Link href="/technology#overview" className="text-white/60 text-sm hover:text-primary transition-colors">
                                    Project Overview
                                </Link>
                                <Link href="/technology#architecture" className="text-white/60 text-sm hover:text-primary transition-colors">
                                    System Architecture
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="#motivation" className="text-white/60 text-sm hover:text-primary transition-colors">
                                    Motivation
                                </Link>
                                <Link href="#technology" className="text-white/60 text-sm hover:text-primary transition-colors">
                                    Technology
                                </Link>
                                <Link href="#impact" className="text-white/60 text-sm hover:text-primary transition-colors">
                                    Impact
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Supported By Section */}
                <div className="flex flex-col items-center gap-4 py-8 border-t border-white/5 mt-10">
                    <h4 className="text-white/60 font-medium text-xs uppercase tracking-wider">Supported by</h4>
                    <div className="flex gap-8 items-center">
                        {/* KNUST Logo */}
                        <a
                            href="https://knust.edu.gh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity"
                        >
                            <Image
                                src="/knust.svg"
                                alt="KNUST"
                                width={80}
                                height={80}
                                className="w-20 h-20 md:w-24 md:h-24 object-contain"
                            />
                        </a>
                        {/* DIPPER Logo */}
                        <a
                            href="https://dipperlab.knust.edu.gh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity"
                        >
                            <Image
                                src="/dipper.svg"
                                alt="DIPPER Lab"
                                width={80}
                                height={80}
                                className="w-20 h-20 md:w-24 md:h-24 object-contain"
                            />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-6 text-center">
                    <p className="text-white/30 text-xs">© 2025 NeoBreath Guard. All rights reserved. Not a medical device replacement for professional care.</p>
                </div>
            </div>
        </footer>
    );
}
