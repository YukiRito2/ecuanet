import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import TrabajosPage from './components/TrabajosPage';
import LegalPage from './components/LegalPage';
import { translations, type Lang } from './translations';

interface HomePageProps {
  lang: Lang;
  t: (typeof translations)[Lang];
  onOpenQuoter: () => void;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomePage({ lang, t, onOpenQuoter }: HomePageProps) {
  return (
    <>
      <div className="bg-white">
        <PremiumHero lang={lang} t={t.hero} onOpenQuoter={onOpenQuoter} />
      </div>
      <div className="border-t border-slate-100 bg-white">
        <PremiumServices lang={lang} t={t.services} />
      </div>
      <div id="works" className="border-t border-slate-100 bg-slate-50">
        <PremiumShowcase lang={lang} t={t.showcase} />
      </div>
      <div className="border-t border-slate-100 bg-white">
        <ResultsSection lang={lang} t={t.results} />
      </div>
      <div className="border-t border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <PriceValue lang={lang} onOpenQuoter={onOpenQuoter} />
      </div>
      <div className="border-t border-slate-100 bg-slate-50">
        <Process lang={lang} t={t.process} />
      </div>
      <div className="border-t border-slate-100 bg-white">
        <Testimonials lang={lang} t={t.testimonials} stat1={t.hero.stat1} stat2={t.hero.stat2} />
      </div>
      <div className="border-t border-slate-100 bg-white">
        <Contact lang={lang} t={t.contact} />
      </div>
    </>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>('es');
  const [quoterOpen, setQuoterOpen] = useState(false);
  const t = translations[lang];
  const openQuoter = () => setQuoterOpen(true);

  return (
    <BrowserRouter>
      <main className="bg-white text-slate-900">
        <ScrollToTop />
        <Navbar lang={lang} setLang={setLang} t={t.nav} />
        <Routes>
          <Route path="/" element={<HomePage lang={lang} t={t} onOpenQuoter={openQuoter} />} />
          <Route path="/trabajos" element={<TrabajosPage lang={lang} t={t.trabajosPage} onOpenQuoter={openQuoter} />} />
          <Route path="/terminos" element={<LegalPage title={t.legal.terms.title} updated={t.legal.terms.updated} backHome={t.legal.backHome} sections={t.legal.terms.sections} />} />
          <Route path="/cookies" element={<LegalPage title={t.legal.cookies.title} updated={t.legal.cookies.updated} backHome={t.legal.backHome} sections={t.legal.cookies.sections} />} />
        </Routes>
        <Quoter lang={lang} t={t.quoter} isOpen={quoterOpen} setIsOpen={setQuoterOpen} />
        <Footer lang={lang} t={t.footer} />
      </main>
    </BrowserRouter>
  );
}
