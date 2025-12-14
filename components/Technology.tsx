import FadeIn from "./FadeIn";

export default function Technology() {
    return (
        <section id="technology" className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
            <FadeIn>
                <div className="text-center mb-16">
                    <span className="inline-block px-3 py-1 rounded bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">Our Novelty</span>
                    <h2 className="text-4xl font-bold mb-4">How It Works</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        NeoBreath Guard integrates cutting-edge sensors with efficient processing to ensure safety, without intrusion.
                    </p>
                </div>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
                {[
                    { title: "Capacitive Sensing", text: "Utilizes capacitive sensors.", icon: "touch" },
                    { title: "Optical SpO2 Monitoring", text: "Integrated SpO2 sensors for blood oxygen saturation tracking.", icon: "droplet" },
                    { title: "Real-time Alerts", text: "Instantly processes sensor data to trigger alerts the moment an anomaly is detected.", icon: "lightning" },
                    { title: "Low-Power Efficiency", text: "Designed for extended use with energy-efficient components.", icon: "battery" },
                ].map((item, i) => (
                    <FadeIn key={i} delay={i * 0.1}>
                        <div className="bg-card p-8 rounded-3xl border border-white/5 flex flex-col gap-4 hover:bg-white/[0.02] transition-colors h-full">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white mb-2">
                                {/* Simple icon placeholders based on name */}
                                {item.icon === 'touch' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.5 10a2.5 2.5 0 014.167-1.488l3.195 2.573a2.5 2.5 0 11-2.934 4.09l-3.23-2.6A2.5 2.5 0 115.5 10z" /></svg>}
                                {item.icon === 'droplet' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
                                {item.icon === 'lightning' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
                                {item.icon === 'battery' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                            </div>
                            <h3 className="text-xl font-bold">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.text}</p>
                        </div>
                    </FadeIn>
                ))}
            </div>

            {/* System Architecture Diagram Placeholder */}
            <FadeIn delay={0.4}>
                <div className="bg-card rounded-3xl p-8 border border-white/5">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div>
                            <h3 className="text-lg font-bold">System Architecture</h3>
                            <p className="text-xs text-gray-500">Seamless integration</p>
                        </div>
                        <div className="flex-grow flex items-center justify-center gap-4 text-xs font-mono">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-primary text-black flex items-center justify-center font-bold">1</div>
                                <span className="opacity-60">Sensors</span>
                            </div>
                            <div className="h-0.5 flex-grow bg-gradient-to-r from-primary to-transparent w-24"></div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold border border-white/20">2</div>
                                <span className="opacity-60">MCU</span>
                            </div>
                            <div className="h-0.5 flex-grow bg-gradient-to-r from-transparent via-white/20 to-transparent w-24"></div>
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold border border-white/20">3</div>
                                <span className="opacity-60">Alert</span>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>
        </section>
    );
}
