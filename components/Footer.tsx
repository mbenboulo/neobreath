"use client";

import Link from "next/link";
import { useState } from "react";
import SupportModal from "./SupportModal";

export default function Footer() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <footer className="py-12 px-4 md:px-12 border-t border-white/5 bg-[#050a08]">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="max-w-xs">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-5 h-5 bg-primary/10 rounded flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-primary">
                                <path d="M20 6h-4V4c0-1.1-0.9-2-2-2h-4c-1.1 0-2 0.9-2 2v2H4c-1.1 0-2 0.9-2 2v12c0 1.1 0.9 2 2 2h16c1.1 0 2-0.9 2-2V8c0-1.1-0.9-2-2-2zM10 4h4v2h-4V4zm6 11h-3v3h-2v-3H8v-2h3v-3h2v3h3v2z" />
                            </svg>
                        </div>
                        <span className="font-bold">NeoBreath Guard</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                        Advanced technology dedicated to protecting the most vulnerable lives.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
                    <div>
                        <h4 className="font-bold mb-4">Product</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li><Link href="#technology" className="hover:text-primary transition-colors">Technology</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Safety</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Research</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Company</h4>
                        <ul className="space-y-2 text-gray-500">
                            <li><Link href="#motivation" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="hover:text-primary transition-colors text-left"
                                >
                                    Contact
                                </button>
                            </li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Social</h4>
                        <div className="flex gap-4 text-gray-500">
                            <a href="#" className="hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center md:text-left text-xs text-gray-600">
                © 2025 NeoBreath Guard. All rights reserved. Not a medical advice replacement for professional care.
            </div>
            <SupportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </footer>
    );
}
