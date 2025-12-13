import Link from "next/link";

export default function TechnologyPage() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground pb-24">
            {/* Header */}
            <header className="px-4 md:px-12 py-8 max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Home
                </Link>
            </header>

            <main className="px-4 md:px-12 max-w-7xl mx-auto space-y-16">
                {/* Title Section */}
                <section>
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-primary/10 text-xs font-medium text-primary border border-primary/20">
                        TECHNICAL SPECS
                        <span className="bg-primary/20 px-1 rounded text-white ml-2">v1.0.0</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Technical Specifications <br /> & Overview</h1>
                    <p className="text-gray-400 max-w-2xl text-lg">
                        A comprehensive deep dive into the NeoBreath Ecosystem: Real-time infant apnea detection, multi-node architecture, and validation metrics.
                    </p>
                </section>

                {/* Project Overview */}
                <section>
                    <div className="flex items-center gap-2 mb-6 text-xl font-bold">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <h2>Project Overview</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-card p-8 rounded-3xl border border-white/5">
                            <h3 className="text-xl font-bold mb-4">The Challenge: Infant Apnea</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Currently, many apnea monitoring devices are not readily available or are too expensive for low-to-middle income countries. Manual sleep monitoring methods are prone to human error, and there is a significant lack of affordable, portable home monitoring devices.
                            </p>
                        </div>
                        <div className="bg-card p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg className="w-32 h-32 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-4">The NeoBreath Solution</h3>
                            <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                                NeoBreath Guard is an integrated system designed to monitor infant breathing patterns. It consists of a wearable belt equipped with capacitive sensors, a foot strap for pulse and heart rate monitoring, and a central processing hub. The system detects breathing cessation and alerts caregivers immediately.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Initial Prototype Results */}
                <section>
                    <div className="bg-card p-8 rounded-3xl border border-white/5">
                        <div className="flex items-center gap-2 mb-4">
                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            <h3 className="text-xl font-bold">Initial Prototype Results</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-6">
                            The initial prototype has successfully demonstrated the ability to detect breathing signals and transmit data. Key milestones achieved include:
                        </p>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                                Wireless data transmission via Bluetooth to the app from the hub worked accurately.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                                Real-time visualization of breathing waveform on app also verified.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                                The belt picked up abdominal movements but sensitivity was not up to par.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                                The alarm worked well, alerting the caregiver when an apnea event was detected.
                            </li>
                        </ul>
                    </div>
                </section>

                {/* Non-Invasive Monitoring Visual */}
                <section className="w-full h-64 md:h-80 rounded-2xl overflow-hidden relative">
                    <img
                        alt="Abstract visualization of safe and calm breathing patterns in blue and green gradients"
                        className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-700"
                        data-alt="Abstract visualization of safe and calm breathing patterns in blue and green gradients"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe6KCsHEm5nuanJ5s5G1469CywP2vBuVffQkLW7ax8UJaJbr0VZogjc-UxiMvNFM5DspvYTC3t6ay5XjNg_FVbEXZzsJSV7eUlfYNU7E-Icy0e8Sqouj63ZyB-wgoWbs66dsW8V_zo9OdEk5-wjTxVR7WibbP596-NKkKForaN-KQ0jUr-AnhGbN35Ycd9MsgfgsKRS1eT50qHxAtD_Y7GyKgmXEcqH755hzk7z4w_NvJbqji8oDQbcTHkkPBbfKZJ2ZNJEL2jzQg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#112217] via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                        <p className="text-white font-bold text-lg">Non-Invasive Monitoring</p>
                        <p className="text-primary text-sm">Safe for infants 0-12 months</p>
                    </div>
                </section>

                {/* System Architecture */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2 text-xl font-bold">
                            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                            <h2>System Architecture</h2>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                            Live Connectivity
                        </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-12 max-w-3xl">
                        The NeoBreath ecosystem is composed of synced low-power components ensuring seamless data transmission from the infant to the caregiver with minimal latency.
                    </p>

                    {/* Flow Diagram */}
                    <div className="bg-card rounded-3xl border border-white/5 p-8 mb-12 overflow-x-auto">
                        <div className="flex items-center gap-8 min-w-[600px] justify-between">
                            {/* Node 1 */}
                            <div className="flex flex-col items-center gap-3 relative">
                                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-primary text-primary flex items-center justify-center relative">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <div className="-bottom-2 absolute bg-card px-2 text-[10px] text-gray-400 border border-white/10 rounded-full">BELT</div>
                                </div>
                            </div>
                            {/* Broken Line */}
                            <div className="h-px bg-white/10 flex-grow relative">
                                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                            {/* Node 2 */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center relative">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                    <div className="-bottom-2 absolute bg-card px-2 text-[10px] text-gray-400 border border-white/10 rounded-full">STRAP</div>
                                </div>
                            </div>
                            {/* Broken Line */}
                            <div className="h-px bg-white/10 flex-grow relative">
                                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                            {/* Node 3 */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center relative">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                                    <div className="-bottom-2 absolute bg-card px-2 text-[10px] text-gray-400 border border-white/10 rounded-full">HUB</div>
                                </div>
                            </div>
                            {/* Broken Line */}
                            <div className="h-px bg-white/10 flex-grow relative">
                                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                </div>
                            </div>
                            {/* Node 4 */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center relative">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                    <div className="-bottom-2 absolute bg-card px-2 text-[10px] text-gray-400 border border-white/10 rounded-full">APP</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-card p-6 rounded-3xl border border-white/5 relative group hover:border-white/20 transition-colors">
                            <div className="absolute top-6 right-6 text-xs text-gray-500 font-mono">Input</div>
                            <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">NeoBreath Belt</h3>
                            <p className="text-sm text-gray-400">
                                A comfortable, wearable belt for infants that houses the capacitive sensor. It is designed to be non-intrusive and safe for continuous use, capturing subtle abdominal movements associated with breathing.
                            </p>
                        </div>

                        <div className="bg-card p-6 rounded-3xl border border-white/5 relative group hover:border-white/20 transition-colors">
                            <div className="absolute top-6 right-6 text-xs text-gray-500 font-mono">Input</div>
                            <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">NeoBreath Strap</h3>
                            <p className="text-sm text-gray-400">
                                A wearable foot strap with a sensor for pulse and heart rate monitoring. It works in tandem with the belt to provide comprehensive vital sign data to the hub.
                            </p>
                        </div>

                        <div className="bg-card p-6 rounded-3xl border border-white/5 relative group hover:border-white/20 transition-colors">
                            <div className="absolute top-6 right-6 text-xs text-gray-500 font-mono">Processing</div>
                            <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">NeoBreath Hub</h3>
                            <p className="text-sm text-gray-400">
                                The central processing unit that receives signals from the belt and strap. It filters noise and analyzes the breathing data to detect any irregularities or cessation of breathing.
                            </p>
                        </div>

                        <div className="bg-card p-6 rounded-3xl border border-white/5 relative group hover:border-white/20 transition-colors">
                            <div className="absolute top-6 right-6 text-xs text-gray-500 font-mono">Output</div>
                            <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-4">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-2">NeoBreath App</h3>
                            <p className="text-sm text-gray-400">
                                A user-friendly mobile application for parents and caregivers. It provides real-time breathing visualization, alerts for apnea events, and history logs for medical consultation.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Development Status */}
                <section>
                    <div className="flex items-center gap-2 mb-8 text-xl font-bold">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        <h2>Development Status</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-card p-6 rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center gap-2">
                            <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center text-xl font-bold mb-2">
                                Beta
                            </div>
                            <h3 className="font-bold">Prototype Phase</h3>
                            <p className="text-xs text-gray-400">Working prototype developed</p>
                        </div>

                        <div className="bg-card p-6 rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-card to-green-900/20">
                            <h3 className="text-2xl font-bold text-primary mb-1">Validation</h3>
                            <p className="text-sm font-bold">Detection Accuracy</p>
                            <p className="text-xs text-gray-400">Validating with more data.</p>
                        </div>

                        <div className="bg-card p-6 rounded-3xl border border-white/5 text-center flex flex-col items-center justify-center gap-2">
                            <h3 className="text-4xl font-bold text-white mb-1">6+</h3>
                            <p className="text-sm font-bold">Battery Life (Hours)</p>
                            <p className="text-xs text-gray-400">Currently optimizing for longer continuous use.</p>
                        </div>
                    </div>

                    {/* Engineering Focus */}
                    <div className="bg-card p-8 rounded-3xl border border-white/5">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Current Engineering Focus</h3>
                        <p className="text-sm text-gray-400 mb-8 max-w-2xl">
                            The project is currently in the active development phase, with a working prototype demonstrating core functionalities. The team is now focused on optimizing the system for reliability and user experience.
                        </p>

                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <div>
                                        <h4 className="font-bold text-sm">Detection Accuracy</h4>
                                        <p className="text-xs text-gray-500">Improving algorithms to reduce false positives.</p>
                                    </div>
                                    <span className="text-xs font-bold text-primary">Refining</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-3/4 rounded-full"></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <div>
                                        <h4 className="font-bold text-sm">Motion Artifact Reduction</h4>
                                        <p className="text-xs text-gray-500">Filtering out non-breathing movements for clearer signals.</p>
                                    </div>
                                    <span className="text-xs font-bold text-primary">In Progress</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-1/2 rounded-full"></div>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-end mb-2">
                                    <div>
                                        <h4 className="font-bold text-sm">Usability & Battery Life</h4>
                                        <p className="text-xs text-gray-500">Refining form factor, UI, and optimizing power consumption for system.</p>
                                    </div>
                                    <span className="text-xs font-bold text-primary">Optimizing</span>
                                </div>
                                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-2/3 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="mt-24 py-8 border-t border-white/5 text-center text-xs text-gray-600 px-4">
                <div className="flex justify-between max-w-7xl mx-auto">
                    <div>© 2025 NeoBreath Guard Project. All rights reserved.</div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gray-400">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-400">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
