"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const isTechnologyPage = pathname === '/technology';

    return (
        <footer className="w-full border-t border-[#23482f] bg-[#0d1a12] py-12">
            <div className="layout-container flex justify-center">
                <div className="w-full max-w-[960px] px-4 md:px-10 flex flex-col md:flex-row justify-between gap-10">
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

                    <div className="flex gap-12 flex-wrap">
                        {/* Supported By Section */}
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-bold text-sm">Supported by</h4>
                            <div className="bg-white p-2 rounded-lg w-fit">
                                <img
                                    src="/british-council.jpg"
                                    alt="British Council"
                                    className="h-12 w-auto object-contain"
                                />
                            </div>
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
                </div>

                <div className="w-full max-w-[960px] px-4 md:px-10 mt-12 pt-8 border-t border-white/5 text-center md:text-left">
                    <p className="text-white/30 text-xs text-center md:text-left">© 2024 NeoBreath Guard. All rights reserved. Not a medical device replacement for professional care.</p>
                </div>
            </div>
        </footer>
    );
}
