'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import type { Lang } from '../App';

interface NavbarProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: {
    home: string;
    services: string;
    works: string;
    differences: string;
    contact: string;
  };
}

export default function Navbar({ lang, setLang, t }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const navItems = [
    { name: t.home, href: '#home' },
    { name: t.services, href: '#services' },
    { name: t.works, href: '#works' },
    { name: t.differences, href: '#differentiators' },
    { name: t.contact, href: '#contact' },
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
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 via-blue-600 to-red-600">
              <span className="text-sm font-bold text-white">LC</span>
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">Limpiezas</p>
              <p className="text-xs font-semibold text-blue-600">Ecuador</p>
            </div>
          </motion.div>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="relative">
              <button
                onClick={() => setLanguageOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
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
                      className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                        lang === item.code ? 'bg-slate-100 font-semibold text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span>{item.code === 'es' ? 'ES' : item.code === 'ca' ? 'CAT' : 'FR'}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <motion.a
              href="https://wa.me/593999999999"
              target="_blank"
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
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700"
              >
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
                      className="block w-full px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50"
                    >
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
            {navItems.map((item) => (
              <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="block font-medium text-gray-700 hover:text-blue-600">
                {item.name}
              </a>
            ))}
            <a
              href="https://wa.me/593999999999"
              target="_blank"
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
