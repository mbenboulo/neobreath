import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Motivation from "@/components/Motivation";
import Technology from "@/components/Technology";
import Impact from "@/components/Impact";
import Footer from "@/components/Footer";

import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <ScrollReveal>
          <Hero />
        </ScrollReveal>
        <ScrollReveal direction="up">
          <Motivation />
        </ScrollReveal>
        <ScrollReveal direction="up">
          <Technology />
        </ScrollReveal>
        <ScrollReveal direction="up">
          <Impact />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
