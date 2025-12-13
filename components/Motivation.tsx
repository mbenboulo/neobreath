export default function Motivation() {
    return (
        <section id="motivation" className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
            <div className="mb-16 border-l-4 border-primary pl-6">
                <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest mb-2">Why We Built It</h2>
                <p className="text-gray-500 max-w-xl">Understanding the critical gaps in current infant care.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h3 className="text-4xl font-bold mb-6">
                        The Silent Threat of <br />
                        <span className="text-primary">Infant Apnea</span>
                    </h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        Infant apnea is a condition where a baby stops breathing, often during sleep. It poses severe risks, including Sudden Infant Death Syndrome (SIDS). Unfortunately, effective monitoring solutions are often expensive and lack the accessibility required for home use.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Card 1 */}
                    <div className="bg-card p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-colors">
                        <div className="w-10 h-10 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <h4 className="text-xl font-bold mb-2">Critical</h4>
                        <p className="text-sm text-gray-400">Risk factor for SIDS and developmental delays.</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-card p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-colors">
                        <div className="w-10 h-10 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h4 className="text-xl font-bold mb-2">Gap</h4>
                        <p className="text-sm text-gray-400">Lack of affordable, medical-grade home monitors.</p>
                    </div>

                    {/* Card 3 - Full width */}
                    <div className="bg-card p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-colors sm:col-span-2">
                        <div className="w-10 h-10 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <h4 className="text-xl font-bold mb-2">Peace of Mind</h4>
                        <p className="text-sm text-gray-400">Addressing parental anxiety with reliable technology.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
