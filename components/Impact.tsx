"use client";

import FadeIn from "./FadeIn";

export default function Impact() {
    return (
        <section id="impact" className="flex justify-center w-full">
            <div className="w-full max-w-[960px] px-4 md:px-10 py-16 md:py-24">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                    <FadeIn className="flex-1 flex flex-col gap-6">
                        <div className="border-l-4 border-primary pl-4">
                            <h2 className="text-white text-2xl font-bold leading-tight tracking-tight">Projected Impact</h2>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                            A Safer Future for Infants
                        </h3>
                        <p className="text-white/70 text-lg">
                            NeoBreath Guard aims to ensure widespread availability and accessibility to both hospitals and home caregivers, ultimately working to reduce the infant apnea mortality rate.
                        </p>
                    </FadeIn>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                        <FadeIn delay={0.2}>
                            <div className="p-6 rounded-2xl bg-[#1a3322] border-t-4 border-primary h-full">
                                <h4 className="text-xl font-bold text-white mb-2">Faster Response</h4>
                                <p className="text-sm font-medium text-white/90">Immediate alerts enable quicker parental intervention.</p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <div className="p-6 rounded-2xl bg-[#1a3322] border-t-4 border-primary h-full">
                                <h4 className="text-xl font-bold text-white mb-2">Reduced Anxiety</h4>
                                <p className="text-sm font-medium text-white/90">Continuous, reliable monitoring allows parents to rest.</p>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.4} className="sm:col-span-2">
                            <div className="p-6 rounded-2xl bg-[#1a3322] border-t-4 border-primary flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left h-full">
                                <span className="material-symbols-outlined text-4xl text-primary">public</span>
                                <div>
                                    <h4 className="text-xl font-bold text-white">Increased Access</h4>
                                    <p className="text-sm text-white/60 mt-1">Affordable technology brings medical-grade safety to more homes.</p>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>
        </section>
    );
}
