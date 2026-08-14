import { useState } from 'react';
import Navbar from './components/Navbar';
import PremiumHero from './components/PremiumHero';
import PremiumServices from './components/PremiumServices';
import PremiumShowcase from './components/PremiumShowcase';
import ResultsSection from './components/ResultsSection';
import PriceValue from './components/PriceValue';
import Process from './components/Process';
import Differentiators from './components/Differentiators';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';

export type Lang = 'es' | 'ca' | 'fr';

export const translations = {
  es: {
    nav: { home: 'Inicio', services: 'Servicios', works: 'Trabajos', differences: 'Diferencias', contact: 'Contacto' },
    hero: {
      badge: 'Limpieza premium en Andorra',
      title1: 'Deja tu espacio',
      title2: 'impecable.',
      subtitle: 'Limpieza profesional para oficinas, viviendas, hoteles, comercios y espacios corporativos con estándares de calidad y atención cercana.',
      ctaPrimary: 'Solicitar presupuesto',
      ctaSecondary: 'Ver servicios',
      stat1: 'Personal capacitado',
      stat2: 'Supervisión constante',
      stat3: 'Andorra · Europa',
    },
    services: {
      eyebrow: 'Servicios',
      title: 'Soluciones de limpieza pensadas para cada tipo de espacio',
    },
    results: {
      eyebrow: 'Clientes satisfechos',
      title: 'Antes y después, la diferencia se nota',
      btn: 'Ver caso completo',
    },
    contact: {
      title: 'Agenda Tu Diagnóstico Gratuito',
      subtitle: 'Sin compromiso. En 24 horas te decimos exactamente qué podemos hacer por tu operación.',
      whatsapp: 'WhatsApp',
      whatsappSub: 'Respuesta en minutos',
      email: 'Email',
      emailSub: 'Propuesta en 24 horas',
      location: 'Ubicación',
      locationSub: 'Andorra, La Vella',
      cta: 'Contactar Ahora',
      primary: '¿Por qué esperar?',
      item1: 'Sin compromiso',
      item2: 'Presupuesto personalizado',
      item3: 'Respuesta en 24 horas',
      item4: 'Equipo profesional',
    },
  },
  ca: {
    nav: { home: 'Inici', services: 'Serveis', works: 'Treballs', differences: 'Diferències', contact: 'Contacte' },
    hero: {
      badge: 'Neteja premium a Andorra',
      title1: 'Deixa el teu espai',
      title2: 'impecable.',
      subtitle: 'Neteja professional per a oficines, habitatges, hotels, comerços i espais corporatius amb estàndards de qualitat i atenció propera.',
      ctaPrimary: 'Sol·licitar pressupost',
      ctaSecondary: 'Veure serveis',
      stat1: 'Personal capacitat',
      stat2: 'Supervisió constant',
      stat3: 'Andorra · Europa',
    },
    services: {
      eyebrow: 'Serveis',
      title: 'Solucions de neteja pensades per a cada tipus d’espai',
    },
    results: {
      eyebrow: 'Clients satisfets',
      title: 'Abans i després, la diferència es nota',
      btn: 'Veure cas complet',
    },
    contact: {
      title: 'Programa el teu Diagnòstic Gratuït',
      subtitle: 'Sense compromís. En 24 hores et direm exactament què podem fer per a la teva operació.',
      whatsapp: 'WhatsApp',
      whatsappSub: 'Resposta en minuts',
      email: 'Correu',
      emailSub: 'Proposta en 24 hores',
      location: 'Ubicació',
      locationSub: 'Andorra, La Vella',
      cta: 'Contactar ara',
      primary: 'Per què esperar?',
      item1: 'Sense compromís',
      item2: 'Pressupost personalitzat',
      item3: 'Resposta en 24 hores',
      item4: 'Equip professional',
    },
  },
  fr: {
    nav: { home: 'Accueil', services: 'Services', works: 'Projets', differences: 'Différences', contact: 'Contact' },
    hero: {
      badge: 'Nettoyage premium en Andorre',
      title1: 'Laissez votre espace',
      title2: 'impeccable.',
      subtitle: 'Nettoyage professionnel pour bureaux, logements, hôtels, commerces et espaces d’entreprise avec des standards de qualité et un service de proximité.',
      ctaPrimary: 'Demander un devis',
      ctaSecondary: 'Voir les services',
      stat1: 'Personnel qualifié',
      stat2: 'Surveillance constante',
      stat3: 'Andorre · Europe',
    },
    services: {
      eyebrow: 'Services',
      title: 'Des solutions de nettoyage pensées pour chaque type d’espace',
    },
    results: {
      eyebrow: 'Clients satisfaits',
      title: 'Avant et après, la différence se voit',
      btn: 'Voir le cas complet',
    },
    contact: {
      title: 'Planifiez Votre Diagnostic Gratuit',
      subtitle: 'Sans engagement. En 24 heures, nous vous dirons exactement ce que nous pouvons faire pour votre activité.',
      whatsapp: 'WhatsApp',
      whatsappSub: 'Réponse en quelques minutes',
      email: 'Email',
      emailSub: 'Proposition en 24 heures',
      location: 'Localisation',
      locationSub: 'Andorre, La Vella',
      cta: 'Contacter maintenant',
      primary: 'Pourquoi attendre ?',
      item1: 'Sans engagement',
      item2: 'Devis personnalisé',
      item3: 'Réponse en 24 heures',
      item4: 'Équipe professionnelle',
    },
  },
} as const;

export default function App() {
  const [lang, setLang] = useState<Lang>('es');
  const t = translations[lang];

  return (
    <main className="bg-white text-slate-900">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <div className="bg-white">
        <PremiumHero lang={lang} t={t.hero} />
      </div>
      <div className="border-t border-slate-100 bg-white">
        <PremiumServices lang={lang} t={t.services} />
      </div>
      <div id="works" className="border-t border-slate-100 bg-slate-50">
        <PremiumShowcase lang={lang} />
      </div>
      <div className="border-t border-slate-100 bg-white">
        <ResultsSection lang={lang} t={t.results} />
      </div>
      <div className="border-t border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <PriceValue lang={lang} />
      </div>
      <div id="differentiators" className="border-t border-slate-100 bg-white">
        <Differentiators />
      </div>
      <div id="process" className="border-t border-slate-100 bg-slate-50">
        <Process />
      </div>
      <div className="border-t border-slate-100 bg-white">
        <Testimonials />
      </div>
      <div id="contact" className="border-t border-slate-100 bg-white">
        <Contact lang={lang} t={t.contact} />
      </div>
      <ChatBot />
      <Footer />
    </main>
  );
}
