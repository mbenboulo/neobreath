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
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-bold text-sm">Product</h4>
                            {!isTechnologyPage && <Link href="/technology" className="text-white/60 text-sm hover:text-primary transition-colors">Technology</Link>}
                            <a href="#" className="text-white/60 text-sm hover:text-primary transition-colors">Safety</a>
                            <a href="#" className="text-white/60 text-sm hover:text-primary transition-colors">Research</a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-bold text-sm">Company</h4>
                            <a href="#" className="text-white/60 text-sm hover:text-primary transition-colors">About Us</a>
                            <a href="#" className="text-white/60 text-sm hover:text-primary transition-colors">Contact</a>
                            <a href="#" className="text-white/60 text-sm hover:text-primary transition-colors">Privacy Policy</a>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="text-white font-bold text-sm">Social</h4>
                            <div className="flex gap-4">
                                <a href="#" className="text-white/60 hover:text-primary transition-colors">
                                    <span className="sr-only">Twitter</span>
                                    <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
                                </a>
                                <a href="#" className="text-white/60 hover:text-primary transition-colors">
                                    <span className="sr-only">LinkedIn</span>
                                    <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" fillRule="evenodd"></path></svg>
                                </a>
                            </div>
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
