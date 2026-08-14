import { useState } from 'react';
import Navbar from './components/Navbar';
import PremiumHero from './components/PremiumHero';
import PremiumServices from './components/PremiumServices';
import PremiumShowcase from './components/PremiumShowcase';
import ResultsSection from './components/ResultsSection';
import PriceValue from './components/PriceValue';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Quoter from './components/Quoter';
import Footer from './components/Footer';
import { translations, type Lang } from './translations';

export default function App() {
  const [lang, setLang] = useState<Lang>('es');
  const t = translations[lang];

  return (
    <main className="bg-white text-slate-900">
      <Navbar lang={lang} setLang={setLang} t={t.nav} />
      <div className="bg-white">
        <PremiumHero lang={lang} t={t.hero} />
      </div>
      <div className="border-t border-slate-100 bg-white">
        <PremiumServices lang={lang} t={t.services} />
      </div>
      <div id="works" className="border-t border-slate-100 bg-slate-50">
        <PremiumShowcase />
      </div>
      <div className="border-t border-slate-100 bg-white">
        <ResultsSection lang={lang} t={t.results} />
      </div>
      <div className="border-t border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <PriceValue lang={lang} />
      </div>
      <div className="border-t border-slate-100 bg-slate-50">
        <Process />
      </div>
      <div className="border-t border-slate-100 bg-white">
        <Testimonials />
      </div>
      <div className="border-t border-slate-100 bg-white">
        <Contact lang={lang} t={t.contact} />
      </div>
      <Quoter />
      <Footer />
    </main>
  );
}
