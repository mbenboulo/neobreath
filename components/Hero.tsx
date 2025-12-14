import Link from "next/link";
import FadeIn from "./FadeIn";

export default function Hero() {
    return (
        <section className="relative pt-12 pb-24 px-4 md:px-12 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
                <FadeIn delay={0.1}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1a3322] border border-[#23482f] text-xs font-medium text-white/80 uppercase tracking-wider">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        Live Monitoring System
                    </div>
                </FadeIn>
                <FadeIn delay={0.2}>
                    <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-[-0.033em]">
                        NeoBreath <br />
                        Guard: <span className="text-primary">Real-Time Apnea Detection</span>
                    </h1>
                </FadeIn>
                <FadeIn delay={0.3}>
                    <p className="text-white/70 text-lg leading-relaxed max-w-lg">
                        A smart, non-invasive system designed for the early detection of infant apnea, providing parents with peace of mind through reliable, continuous health tracking.
                    </p>
                </FadeIn>
                <FadeIn delay={0.4}>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/technology" className="bg-primary hover:brightness-110 text-black px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 inline-flex items-center justify-center">
                            Explore the Technology
                        </Link>
                    </div>
                </FadeIn>
            </div>

            <div className="relative">
                {/* Metric Visualization Container */}
                <FadeIn delay={0.5} direction="left">
                    <div className="relative rounded-3xl overflow-hidden bg-[#1a3322] border border-[#23482f] shadow-2xl shadow-primary/10 p-6 aspect-square md:aspect-video lg:aspect-square flex flex-col justify-center items-center gap-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-background via-transparent to-transparent opacity-50 pointer-events-none"></div>

                        {/* Heart Rate Card */}
                        <div className="w-full max-w-xs flex items-center justify-between p-4 rounded-2xl bg-background/50 backdrop-blur-md border border-[#23482f] shadow-lg relative z-10 transform transition-transform hover:scale-105">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-3xl text-primary">ecg_heart</span>
                                <div>
                                    <p className="text-xs text-white/60 font-medium uppercase tracking-wider">Heart Rate</p>
                                    <p className="text-xl font-bold text-white">120 <span className="text-sm font-normal text-white/50">BPM</span></p>
                                </div>
                            </div>
                            <div className="h-8 w-24 opacity-60">
                                {/* Simple ECG SVG path */}
                                <svg viewBox="0 0 100 30" fill="none" stroke="currentColor" className="text-primary w-full h-full" strokeWidth="2">
                                    <path d="M0 15 H10 L15 5 L20 25 L25 10 L30 15 H40 L45 5 L50 25 L55 10 L60 15 H70 L75 5 L80 25 L85 10 L90 15 H100" />
                                </svg>
                            </div>
                        </div>

                        {/* Respiratory Rate Card */}
                        <div className="w-full max-w-xs flex items-center justify-between p-4 rounded-2xl bg-background/50 backdrop-blur-md border border-[#23482f] shadow-lg relative z-10 transform transition-transform hover:scale-105">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-3xl text-primary">air</span>
                                <div>
                                    <p className="text-xs text-white/60 font-medium uppercase tracking-wider">Resp. Rate</p>
                                    <p className="text-xl font-bold text-white">50 <span className="text-sm font-normal text-white/50">/ min</span></p>
                                </div>
                            </div>
                            <div className="flex gap-1 h-6 items-end">
                                {[0.6, 0.8, 0.4, 0.7, 0.9, 0.5, 0.7, 0.8].map((h, i) => (
                                    <div key={i} className="w-1.5 bg-primary rounded-full transition-all duration-500 animate-pulse" style={{ height: `${h * 100}%`, opacity: 0.5 + h / 2 }}></div>
                                ))}
                            </div>
                        </div>

                        {/* SpO2 Card */}
                        <div className="w-full max-w-xs flex items-center justify-between p-4 rounded-2xl bg-background/50 backdrop-blur-md border border-[#23482f] shadow-lg relative z-10 transform transition-transform hover:scale-105">
                            <div className="flex items-center gap-4">
                                <span className="material-symbols-outlined text-3xl text-primary">bloodtype</span>
                                <div>
                                    <p className="text-xs text-white/60 font-medium uppercase tracking-wider">SpO2</p>
                                    <p className="text-xl font-bold text-white">98 <span className="text-sm font-normal text-white/50">%</span></p>
                                </div>
                            </div>
                            <div className="h-10 w-28 overflow-hidden flex items-center">
                                {/* Pulse oximeter plethysmogram waveform */}
                                <svg viewBox="0 0 120 40" fill="none" stroke="currentColor" className="text-primary w-full h-full drop-shadow-[0_0_6px_rgba(19,236,91,0.6)]" strokeWidth="2">
                                    <path d="M0 35 
                                             Q 5 5, 10 5 
                                             L 15 35 
                                             Q 18 20, 20 25
                                             Q 25 35, 30 35
                                             L 30 35
                                             
                                             M30 35 
                                             Q 35 5, 40 5 
                                             L 45 35 
                                             Q 48 20, 50 25
                                             Q 55 35, 60 35
                                             L 60 35
                                             
                                             M60 35 
                                             Q 65 5, 70 5 
                                             L 75 35 
                                             Q 78 20, 80 25
                                             Q 85 35, 90 35
                                             L 90 35
                                             
                                             M90 35 
                                             Q 95 5, 100 5 
                                             L 105 35 
                                             Q 108 20, 110 25
                                             Q 115 35, 120 35" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        {/* Background decorations */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none"></div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
