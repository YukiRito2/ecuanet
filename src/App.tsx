import Navbar from './components/Navbar';
import PremiumHero from './components/PremiumHero';
import PremiumServices from './components/PremiumServices';
import PremiumShowcase from './components/PremiumShowcase';
import Differentiators from './components/Differentiators';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />
      <PremiumHero />
      <PremiumServices />
      <PremiumShowcase />
      <Differentiators />
      <Process />
      <Testimonials />
      <Contact />
      <ChatBot />
      <Footer />
    </main>
  );
}
