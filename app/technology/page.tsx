"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function TechnologyPage() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-background pb-0">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full bg-[#112217]/90 backdrop-blur-md border-b border-secondary">
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                        <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-secondary/50 text-white transition-all group">
                            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
                            <span className="text-sm font-bold">Back to Home</span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="w-full max-w-5xl mx-auto pt-12 px-4 sm:px-6 lg:px-8 pb-24">
                {/* Intro Section */}
                <div className="mb-16">
                    <FadeIn delay={0.1}>
                        <div className="flex flex-col gap-6 mb-6">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">Technical Docs</span>
                                    <span className="px-3 py-1 rounded-full bg-card text-text-secondary text-xs font-bold uppercase tracking-wider">v1.0.0</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
                                    Technical Specifications <br className="hidden md:block" />& Overview
                                </h1>
                            </div>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <p className="text-xl text-text-secondary max-w-3xl leading-relaxed">
                            A comprehensive deep dive into the NeoBreath Ecosystem: Real-time infant apnea detection, multi-node architecture, and validation metrics.
                        </p>
                    </FadeIn>
                </div>

                <div className="space-y-24">
                    {/* Project Overview */}
                    <ScrollReveal>
                        <section id="overview" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">info</span>
                                Project Overview
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                                <div className="bg-card rounded-2xl p-8 border border-secondary">
                                    <h3 className="text-lg font-bold text-white mb-4">The Challenge: Infant Apnea</h3>
                                    <p className="text-text-secondary leading-relaxed">
                                        Currently, many apnea monitoring devices are not readily available or are too expensive for low-to-middle income countries. Manual monitoring methods are prone to human error, and there is a significant lack of affordable, portable home monitoring devices.
                                    </p>
                                </div>
                                <div className="bg-card rounded-2xl p-8 border border-secondary relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <span className="material-symbols-outlined text-9xl text-primary">shield_moon</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-4">The NeoBreath Solution</h3>
                                    <p className="text-text-secondary leading-relaxed relative z-10">
                                        NeoBreath Guard is an integrated system designed to monitor infant breathing patterns. It consists of a wearable belt equipped with capacitive sensors, a central processing hub, a foot strap (NeoBreath Step) with a sensor for pulse and heart rate monitoring, and a mobile application. The system detects breathing cessation and alerts caregivers immediately.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-card/50 rounded-2xl p-8 border border-secondary mb-8">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">science</span>
                                    Initial Prototype Results
                                </h3>
                                <p className="text-text-secondary leading-relaxed mb-4">
                                    The initial prototype has successfully demonstrated the ability to detect breathing signals and transmit data. Key milestones achieved include:
                                </p>
                                <ul className="list-disc list-inside text-text-secondary space-y-2 ml-2">
                                    <li>Wireless data transmission via Bluetooth to the app from the hub worked accurately.</li>
                                    <li>Real-time visualization of breathing waveforms on app also worked.</li>
                                    <li>The belt picked up abdominal movements but sensitivity was not up to par.</li>
                                    <li>The alarm worked well, alerting the caregiver when an apneic event was detected.</li>
                                </ul>
                            </div>

                            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden relative group">
                                <img
                                    alt="Abstract visualization of safe and calm breathing patterns"
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700 hover:scale-105 transform"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe6KCsHEm5nuanJ5s5G1469CywP2vBuVffQkLW7ax8UJaJbr0VZogjc-UxiMvNFM5DspvYTC3t6ay5XjNg_FVbEXZzsJSV7eUlfYNU7E-Icy0e8Sqouj63ZyB-wgoWbs66dsW8V_zo9OdEk5-wjTxVR7WibbP596-NKkKForaN-KQ0jUr-AnhGbN35Ycd9MsgfgsKRS1eT50qHxAtD_Y7GyKgmXEcqH755hzk7z4w_NvJbqji8oDQbcTHkkPBbfKZJ2ZNJEL2jzQg"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#112217] via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                                    <p className="text-white font-bold text-lg">Non-Invasive Monitoring</p>
                                    <p className="text-primary text-sm">Safe for infants 0-12 months</p>
                                </div>
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* System Architecture */}
                    <ScrollReveal>
                        <section id="architecture" className="scroll-mt-24">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">hub</span>
                                    System Architecture
                                </h2>
                                <div className="hidden md:flex gap-2 items-center">
                                    <span className="w-3 h-3 rounded-full bg-primary animate-pulse"></span>
                                    <span className="text-xs text-primary font-bold uppercase tracking-wider">Live Connectivity</span>
                                </div>
                            </div>
                            <p className="text-text-secondary mb-10 max-w-3xl">
                                The NeoBreath ecosystem is composed of synchronized components ensuring seamless data transmission from the infant to the caregiver with minimal latency.
                            </p>

                            {/* Diagram Container */}
                            <div className="w-full bg-[#0a160f] border border-secondary rounded-2xl p-8 mb-10 flex flex-col items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                                <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

                                <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                                    {/* Inputs Group */}
                                    <div className="flex gap-8 items-center bg-card/50 p-4 rounded-3xl border border-secondary/50 backdrop-blur-sm relative">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0a160f] border border-secondary rounded text-[10px] text-text-secondary uppercase tracking-widest font-mono">Input</div>
                                        {/* Belt Node */}
                                        <div className="flex flex-col items-center gap-3 group/node">
                                            <div className="w-16 h-16 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(19,236,91,0.3)] transition-transform group-hover/node:scale-110">
                                                <span className="material-symbols-outlined text-primary text-2xl">conveyor_belt</span>
                                            </div>
                                            <span className="text-xs font-bold text-white uppercase tracking-wider">Belt</span>
                                        </div>
                                        {/* Step Node */}
                                        <div className="flex flex-col items-center gap-3 group/node">
                                            <div className="w-16 h-16 rounded-full bg-card border-2 border-secondary group-hover:border-primary transition-colors duration-500 delay-100 flex items-center justify-center group-hover/node:scale-110">
                                                <span className="material-symbols-outlined text-white text-2xl">footprint</span>
                                            </div>
                                            <span className="text-xs font-bold text-white uppercase tracking-wider">Step</span>
                                        </div>
                                    </div>

                                    <span className="material-symbols-outlined text-secondary md:rotate-0 rotate-90">arrow_forward</span>

                                    {/* Hub Node */}
                                    <div className="flex flex-col items-center gap-3 group/node relative">
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0a160f] border border-secondary rounded text-[10px] text-text-secondary uppercase tracking-widest font-mono">Process</div>
                                        <div className="w-16 h-16 rounded-full bg-card border-2 border-secondary group-hover:border-primary transition-colors duration-500 flex items-center justify-center group-hover/node:scale-110">
                                            <span className="material-symbols-outlined text-white text-2xl">router</span>
                                        </div>
                                        <span className="text-xs font-bold text-white uppercase tracking-wider">Hub</span>
                                    </div>

                                    <span className="material-symbols-outlined text-secondary md:rotate-0 rotate-90">arrow_forward</span>

                                    {/* App Node */}
                                    <div className="flex flex-col items-center gap-3 group/node relative">
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#0a160f] border border-secondary rounded text-[10px] text-text-secondary uppercase tracking-widest font-mono">Output</div>
                                        <div className="w-16 h-16 rounded-full bg-card border-2 border-secondary group-hover:border-primary transition-colors duration-500 delay-200 flex items-center justify-center group-hover/node:scale-110">
                                            <span className="material-symbols-outlined text-white text-2xl">touch_app</span>
                                        </div>
                                        <span className="text-xs font-bold text-white uppercase tracking-wider">App</span>
                                    </div>
                                </div>
                            </div>

                            {/* Detailed Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { icon: "conveyor_belt", type: "Input", title: "NeoBreath Belt", desc: "A comfortable, wearable belt for infants that houses the capacitive sensor. Designed to be non-intrusive and safe for continuous use." },
                                    { icon: "footprint", type: "Input", title: "NeoBreath Step", desc: "A wearable foot strap with a sensor for pulse and heart rate monitoring. Works in tandem with the belt for comprehensive data." },
                                    { icon: "router", type: "Processing", title: "NeoBreath Hub", desc: "The central processing unit that receives signals, filters noise, and analyzes breathing data to detect irregularities." },
                                    { icon: "touch_app", type: "Output", title: "NeoBreath App", desc: "A user-friendly mobile application providing real-time breathing visualization, apnea alerts, and history logs." }
                                ].map((item, i) => (
                                    <FadeIn key={i} delay={i * 0.1}>
                                        <div className="bg-card p-6 rounded-2xl border border-secondary hover:border-primary/50 transition-colors group h-full">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="p-3 bg-background rounded-lg">
                                                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                                                </div>
                                                <span className="text-xs font-bold text-text-secondary bg-background px-2 py-1 rounded">{item.type}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                            <p className="text-text-secondary text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </FadeIn>
                                ))}
                            </div>
                        </section>
                    </ScrollReveal>

                    {/* Development Status */}
                    <ScrollReveal>
                        <section id="status" className="scroll-mt-24">
                            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">developer_board</span>
                                Development Status
                            </h2>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                                <FadeIn delay={0.1}>
                                    <div className="bg-gradient-to-br from-card to-background p-8 rounded-2xl border border-secondary flex flex-col items-center text-center h-full">
                                        <div className="mb-4 relative w-20 h-20">
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                                <path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                                                <path className="text-primary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="85, 100" strokeWidth="3"></path>
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">Beta</div>
                                        </div>
                                        <h3 className="text-white font-bold mb-1">Prototype Phase</h3>
                                        <p className="text-text-secondary text-sm">Working prototype developed.</p>
                                    </div>
                                </FadeIn>
                                <FadeIn delay={0.2}>
                                    <div className="bg-gradient-to-br from-card to-background p-8 rounded-2xl border border-secondary flex flex-col items-center text-center justify-center h-full">
                                        <div className="mb-4 text-primary text-3xl font-black tracking-tight">Validation</div>
                                        <h3 className="text-white font-bold mb-1">Detection Accuracy</h3>
                                        <p className="text-text-secondary text-sm">Validating with more data.</p>
                                    </div>
                                </FadeIn>
                                <FadeIn delay={0.3}>
                                    <div className="bg-gradient-to-br from-card to-background p-8 rounded-2xl border border-secondary flex flex-col items-center text-center justify-center h-full">
                                        <div className="mb-4 text-white text-5xl font-black tracking-tighter">6<span className="text-2xl text-primary">+</span></div>
                                        <h3 className="text-white font-bold mb-1">Battery Life (Hours)</h3>
                                        <p className="text-text-secondary text-sm">Targeting continuous use.</p>
                                    </div>
                                </FadeIn>
                            </div>

                            <FadeIn delay={0.4}>
                                <div className="bg-card border border-secondary rounded-2xl p-8">
                                    <h3 className="text-lg font-bold text-white mb-6">Current Engineering Focus</h3>
                                    <p className="text-text-secondary mb-6 text-sm">
                                        The project is currently in the active development phase, with a working prototype demonstrating core functionalities. The team is now focused on optimizing the system for reliability and user experience.
                                    </p>
                                    <div className="space-y-6">
                                        {[
                                            { label: "Detection Accuracy", status: "Refining", pct: "85%", desc: "Improving algorithms to reduce false positives." },
                                            { label: "Motion-Artefact Reduction", status: "In Progress", pct: "75%", desc: "Filtering out non-breathing movements for clearer signals." },
                                            { label: "Usability & Battery Life", status: "Optimizing", pct: "60%", desc: "Extending battery life and ensuring the app is intuitive." }
                                        ].map((item, i) => (
                                            <div key={i} className="flex flex-col gap-2">
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-white font-medium">{item.label}</span>
                                                    <span className="text-primary font-bold">{item.status}</span>
                                                </div>
                                                <div className="w-full bg-background rounded-full h-2">
                                                    <motion.div
                                                        className="bg-primary h-2 rounded-full"
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: item.pct }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, ease: "easeOut" }}
                                                    />
                                                </div>
                                                <p className="text-text-secondary text-xs">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>
                        </section>
                    </ScrollReveal>
                </div>
            </main>
            <Footer />
        </div>
    );
}
