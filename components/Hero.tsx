"use client";

import Link from "next/link";
import FadeIn from "./FadeIn";

export default function Hero() {
    return (
        <section className="layout-container flex grow flex-col items-center">
            <div className="w-full max-w-[960px] px-4 md:px-10 py-10 md:py-16">
                <div className="@container">
                    <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center">
                        <div className="flex flex-1 flex-col gap-6 md:gap-8 text-left">
                            <FadeIn>
                                <div className="flex flex-col gap-4">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-[#1a3322] border border-[#23482f] px-3 py-1 w-fit">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                        </span>
                                        <span className="text-xs font-medium text-white/80 uppercase tracking-wider">Live Monitoring System</span>
                                    </div>
                                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.033em]">
                                        NeoBreath Guard: <span className="text-primary">Real-Time Apnea Detection</span>
                                    </h1>
                                    <p className="text-white/70 text-base md:text-lg font-normal leading-relaxed max-w-[500px]">
                                        A smart, non-invasive system designed for the early detection of infant apnea, providing parents with peace of mind through reliable, continuous health tracking.
                                    </p>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/technology">
                                        <button className="flex cursor-pointer items-center justify-center rounded-full h-12 px-6 bg-primary text-background-dark text-base font-bold leading-normal tracking-[0.015em] hover:brightness-110 transition-all">
                                            <span className="truncate">Explore the Technology</span>
                                        </button>
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>

                        <div className="flex-1 w-full">
                            <FadeIn direction="left" delay={0.3}>
                                <div className="relative w-full aspect-video md:aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 bg-[#1a3322]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10 transition-opacity duration-300"></div>
                                    <div className="w-full h-full bg-center bg-cover opacity-80" data-alt="Soft light image of a sleeping infant in a peaceful setting" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCjz4n1iIKRPoKgvNNSm7_S-3D38d7Vp1UG51E_K_-BR1Zrgwh6ubegiuRNlKJPLEPRd6hXVzCpzRu9cbmn-g5h50VZhSiHlijzUr-Z3ypvK0qlaGHod-ixOafRQ765sYfTptl4Gkg2dvoYg9zBDhXJ09gXPRfCBLcQMXWc-EXXxDo4gjdCbGDGcjs4xPap5TbtU_CA4XStF_3gKrHY1M_mlBY5ZU8GJpYu8hRveX1HVOP-H3-PALdjnB2OYLT4EJH4EItFOleqnhQ")' }}></div>

                                    <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-3">
                                        {/* Heart Rate Card */}
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-background-dark/90 backdrop-blur-sm border border-[#23482f]">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-primary">ecg_heart</span>
                                                <div>
                                                    <p className="text-xs text-white/60">Heart Rate</p>
                                                    <p className="text-sm font-bold text-white">120 BPM</p>
                                                </div>
                                            </div>
                                            <svg viewBox="0 0 100 30" className="h-8 w-24 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M0 15 L10 15 L15 5 L20 25 L25 15 L40 15 L45 5 L50 25 L55 15 L70 15 L75 5 L80 25 L85 15 L100 15" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>

                                        {/* SpO2 Card */}
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-background-dark/90 backdrop-blur-sm border border-[#23482f]">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-primary">bloodtype</span>
                                                <div>
                                                    <p className="text-xs text-white/60">SpO2</p>
                                                    <p className="text-sm font-bold text-white">98%</p>
                                                </div>
                                            </div>
                                            <svg viewBox="0 0 100 30" className="h-8 w-24 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M0 15 Q12 15, 18 8 T36 15 T54 22 T72 15 T90 8 L100 15" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>

                                        {/* Resp Rate Card */}
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-background-dark/90 backdrop-blur-sm border border-[#23482f]">
                                            <div className="flex items-center gap-3">
                                                <span className="material-symbols-outlined text-primary">air</span>
                                                <div>
                                                    <p className="text-xs text-white/60">Resp. Rate</p>
                                                    <p className="text-sm font-bold text-white">50 / min</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 h-4 items-end">
                                                <div className="w-1 h-3 bg-primary rounded-full animate-pulse"></div>
                                                <div className="w-1 h-5 bg-primary/80 rounded-full animate-pulse delay-75"></div>
                                                <div className="w-1 h-2 bg-primary/60 rounded-full animate-pulse delay-100"></div>
                                                <div className="w-1 h-4 bg-primary/90 rounded-full animate-pulse delay-150"></div>
                                                <div className="w-1 h-6 bg-primary rounded-full animate-pulse delay-200"></div>
                                                <div className="w-1 h-3 bg-primary/70 rounded-full animate-pulse delay-300"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
