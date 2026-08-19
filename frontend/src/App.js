import { useEffect } from "react";
import "@/App.css";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import { setLenis } from "@/lib/scroll";
import Navbar from "@/components/landing/Navbar";
import PremiumHero from "@/components/landing/PremiumHero";
import Marquee from "@/components/landing/Marquee";
import Services from "@/components/landing/Services";
import Showcase from "@/components/landing/Showcase";
import Results from "@/components/landing/Results";
import Pricing from "@/components/landing/Pricing";
import Process from "@/components/landing/Process";
import Testimonials from "@/components/landing/Testimonials";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true });
    setLenis(lenis);
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div className="App bg-navy-deep font-sans text-white">
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <PremiumHero />
        <Marquee />
        <Services />
        <Showcase />
        <Results />
        <Pricing />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
