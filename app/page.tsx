import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Motivation from "@/components/Motivation";
import Technology from "@/components/Technology";
import Impact from "@/components/Impact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Motivation />
        <Technology />
        <Impact />
      </main>
      <Footer />
    </div>
  );
}
