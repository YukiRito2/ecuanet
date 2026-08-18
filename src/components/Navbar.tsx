import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import type { Lang } from '../translations';
import logo from '../assets/ecuanet-logo.png';
import { scrollToSection } from '../utils/scrollToSection';
import LanguageFlag from './LanguageFlag';

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: {
    home: string;
    services: string;
    works: string;
    contact: string;
  };
}

export default function Navbar({ lang, setLang, t }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const navItems: ({ name: string; kind: 'anchor'; id: string } | { name: string; kind: 'link'; path: string })[] = [
    { name: t.home, kind: 'anchor', id: 'home' },
    { name: t.services, kind: 'anchor', id: 'services' },
    { name: t.works, kind: 'link', path: '/trabajos' },
    { name: t.contact, kind: 'anchor', id: 'contact' },
  ];

  const languages = [
    { code: 'es', label: 'ES' },
    { code: 'ca', label: 'CAT' },
    { code: 'fr', label: 'FR' },
  ] as const;

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.a href="/#home" onClick={scrollToSection('home')} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
            <img src={logo} alt="Ecuanet" className="h-11 w-11 object-contain" />
            <span className="text-lg font-bold tracking-[-0.02em] text-slate-900">Ecuanet</span>
          </motion.a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item, i) =>
              item.kind === 'link' ? (
                <motion.div key={item.name} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link to={item.path} className="text-sm font-medium text-slate-700 transition-colors hover:text-[#002E7D]">
                    {item.name}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={item.name}
                  href={`/#${item.id}`}
                  onClick={scrollToSection(item.id)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm font-medium text-slate-700 transition-colors hover:text-[#002E7D]"
                >
                  {item.name}
                </motion.a>
              ),
            )}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="relative">
              <button
                onClick={() => setLanguageOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                <LanguageFlag lang={lang} />
                {languages.find((item) => item.code === lang)?.label}
                <ChevronDown size={16} />
              </button>

              {languageOpen && (
                <div className="absolute right-0 top-12 w-32 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLang(item.code as Lang);
                        setLanguageOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                        lang === item.code ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <LanguageFlag lang={item.code} />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <motion.a
              href="https://wa.me/593999999999"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-2 font-semibold text-gray-900 shadow-lg shadow-yellow-200 transition-shadow hover:shadow-xl"
            >
              WhatsApp
            </motion.a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <div className="relative">
              <button
                onClick={() => setLanguageOpen((prev) => !prev)}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700"
              >
                <LanguageFlag lang={lang} />
                {languages.find((item) => item.code === lang)?.label}
              </button>
              {languageOpen && (
                <div className="absolute right-0 top-10 w-28 rounded-lg border border-slate-200 bg-white shadow-lg">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLang(item.code as Lang);
                        setLanguageOpen(false);
                      }}
                      className="flex w-full items-center gap-1.5 px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
                      <LanguageFlag lang={item.code} />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden border-t md:hidden"
        >
          <div className="space-y-4 px-4 py-4">
            {navItems.map((item) =>
              item.kind === 'link' ? (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block font-medium text-slate-700 hover:text-[#002E7D]"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={`/#${item.id}`}
                  onClick={(event) => {
                    scrollToSection(item.id)(event);
                    setIsOpen(false);
                  }}
                  className="block font-medium text-slate-700 hover:text-[#002E7D]"
                >
                  {item.name}
                </a>
              ),
            )}
            <a
              href="https://wa.me/593999999999"
              target="_blank"
              rel="noreferrer"
              className="block w-full rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 px-4 py-2 text-center font-semibold text-gray-900"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </nav>
  );
}
