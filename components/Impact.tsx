export default function Impact() {
    return (
        <section id="impact" className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
                <div>
                    <div className="mb-8 border-l-4 border-primary pl-6">
                        <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-2">Projected Impact</h2>
                        <p className="text-3xl font-bold mb-4">A Safer Future for Infants</p>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        NeoBreath Guard aims to ensure widespread availability and accessibility to both hospitals and home caregivers, ultimately working to reduce the infant apnea mortality rate.
                    </p>
                </div>

                <div className="grid gap-6">
                    <div className="flex gap-6">
                        <div className="flex-1 bg-card p-6 rounded-3xl border border-white/5">
                            <h3 className="font-bold mb-2">Faster Response</h3>
                            <p className="text-xs text-gray-400">Immediate alerts enable quicker parental intervention.</p>
                        </div>
                        <div className="flex-1 bg-card p-6 rounded-3xl border border-white/5">
                            <h3 className="font-bold mb-2">Reduced Anxiety</h3>
                            <p className="text-xs text-gray-400">Continuous, reliable monitoring calms parents' minds.</p>
                        </div>
                    </div>
                    <div className="bg-card p-6 rounded-3xl border border-white/5 flex items-center gap-6">
                        <div className="w-12 h-12 rounded-full bg-green-900/30 text-primary flex items-center justify-center shrink-0">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <div>
                            <h3 className="font-bold mb-1">Increased Access</h3>
                            <p className="text-xs text-gray-400">Affordable technology brings medical-grade safety to more homes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
