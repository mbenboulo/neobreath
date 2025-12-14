"use client";

import FadeIn from "./FadeIn";

export default function Motivation() {
    return (
        <section id="motivation" className="flex justify-center w-full">
            <div className="w-full max-w-[960px] px-4 md:px-10 py-12">
                <div className="flex flex-col gap-10">
                    <FadeIn>
                        <div className="border-l-4 border-primary pl-4">
                            <h2 className="text-white text-2xl font-bold leading-tight tracking-tight">Why We Built It</h2>
                            <p className="text-white/60 mt-1">Understanding the critical gaps in current infant care.</p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <FadeIn delay={0.2}>
                            <div className="flex flex-col gap-6">
                                <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight max-w-[400px]">
                                    The Silent Threat of <span className="text-primary underline decoration-primary/30 underline-offset-4">Infant Apnea</span>
                                </h3>
                                <p className="text-white/80 text-base leading-relaxed">
                                    Infant apnea is a condition where a baby stops breathing, often during sleep. It poses severe risks, including Sudden Infant Death Syndrome (SIDS). Unfortunately, effective monitoring solutions are often expensive and lack the accessibility required for home use.
                                </p>
                            </div>
                        </FadeIn>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FadeIn delay={0.3}>
                                <div className="flex flex-col p-6 rounded-2xl bg-[#1a3322] border border-[#23482f] h-full">
                                    <div className="mb-4 size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined">warning</span>
                                    </div>
                                    <h4 className="text-3xl font-bold text-white mb-1">Critical</h4>
                                    <p className="text-sm text-white/60">Risk factor for SIDS and developmental delays</p>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.4}>
                                <div className="flex flex-col p-6 rounded-2xl bg-[#1a3322] border border-[#23482f] h-full">
                                    <div className="mb-4 size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined">notifications_off</span>
                                    </div>
                                    <h4 className="text-3xl font-bold text-white mb-1">Gap</h4>
                                    <p className="text-sm text-white/60">Lack of affordable, medical-grade home monitors</p>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.5} className="sm:col-span-2">
                                <div className="flex flex-col p-6 rounded-2xl bg-[#1a3322] border border-[#23482f]">
                                    <div className="mb-4 size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined">sentiment_dissatisfied</span>
                                    </div>
                                    <h4 className="text-3xl font-bold text-white mb-1">Peace of Mind</h4>
                                    <p className="text-sm text-white/60">Addressing parental anxiety with reliable technology.</p>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
