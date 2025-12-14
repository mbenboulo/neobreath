"use client";

import FadeIn from "./FadeIn";

export default function Technology() {
    return (
        <section id="technology" className="flex justify-center w-full bg-[#0d1a12] py-20 mt-10">
            <div className="w-full max-w-[960px] px-4 md:px-10 flex flex-col gap-12">
                <FadeIn>
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Our Novelty</span>
                        </div>
                        <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">How It Works</h2>
                        <p className="text-white/60 max-w-[600px]">
                            NeoBreath Guard integrates cutting-edge sensors with efficient processing to ensure safety without intrusion.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: "Capacitive Sensing", text: "Utilizes capacitive sensors.", icon: "touch_app" },
                        { title: "Optical SpO2 Monitoring", text: "Integrates optical sensors for blood oxygen saturation tracking, providing a comprehensive view of the infant's respiratory health.", icon: "bloodtype" },
                        { title: "Real-time Alerts", text: "Instantaneously processes sensor data to trigger alerts the moment an anomaly is detected, minimizing response time for parents.", icon: "bolt" },
                        { title: "Low-Power Efficiency", text: "Designed for extended use with energy-efficient components, ensuring reliable operation throughout the night without frequent charging.", icon: "battery_saver" },
                    ].map((item, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div className="group flex flex-col p-8 rounded-[2rem] bg-[#1a3322] border border-[#23482f] hover:border-primary/50 transition-colors h-full">
                                <div className="size-14 rounded-full bg-[#102216] flex items-center justify-center border border-[#23482f] mb-6 group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary text-white transition-all">
                                    <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-white/70 leading-relaxed">{item.text}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.4}>
                    <div className="relative w-full rounded-3xl bg-[#1a3322] border border-[#23482f] p-8 md:p-12 overflow-hidden mt-6">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px]"></div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="text-center md:text-left">
                                <h4 className="text-lg font-bold text-white mb-1">System Architecture</h4>
                                <p className="text-sm text-white/60">Seamless integration</p>
                            </div>
                            <div className="flex flex-1 w-full justify-between items-center gap-2 md:gap-4 max-w-lg">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="size-10 rounded-full bg-primary flex items-center justify-center text-[#102216] font-bold">1</div>
                                    <span className="text-xs text-white font-medium">Sensors</span>
                                </div>
                                <div className="h-[2px] flex-1 bg-gradient-to-r from-primary to-[#23482f]"></div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="size-10 rounded-full bg-[#23482f] text-white border border-primary/30 flex items-center justify-center font-bold">2</div>
                                    <span className="text-xs text-white font-medium">MCU</span>
                                </div>
                                <div className="h-[2px] flex-1 bg-gradient-to-r from-[#23482f] to-primary"></div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="size-10 rounded-full bg-[#23482f] text-white border border-primary/30 flex items-center justify-center font-bold">3</div>
                                    <span className="text-xs text-white font-medium">Alert</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
