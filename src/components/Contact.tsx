'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

interface ContactProps {
  lang: 'es' | 'ca' | 'fr';
  t: {
    title: string;
    subtitle: string;
    whatsapp: string;
    whatsappSub: string;
    email: string;
    emailSub: string;
    location: string;
    locationSub: string;
    cta: string;
    primary: string;
    item1: string;
    item2: string;
    item3: string;
    item4: string;
  };
}

export default function Contact({ t }: ContactProps) {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t.title}</h2>
              <p className="text-xl text-gray-600">{t.subtitle}</p>
            </div>

            <div className="space-y-4">
              <motion.a
                href="https://wa.me/593999999999"
                target="_blank"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-yellow-400 hover:bg-yellow-50 transition-all"
              >
                <Phone className="text-yellow-500" size={24} />
                <div>
                  <p className="font-semibold text-gray-900">{t.whatsapp}</p>
                  <p className="text-sm text-gray-600">{t.whatsappSub}</p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:contacto@limpiezasecuador.com"
                whileHover={{ x: 5 }}
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
              >
                <Mail className="text-blue-500" size={24} />
                <div>
                  <p className="font-semibold text-gray-900">{t.email}</p>
                  <p className="text-sm text-gray-600">{t.emailSub}</p>
                </div>
              </motion.a>

              <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-red-400 hover:bg-red-50 transition-all">
                <MapPin className="text-red-500" size={24} />
                <div>
                  <p className="font-semibold text-gray-900">{t.location}</p>
                  <p className="text-sm text-gray-600">{t.locationSub}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="p-12 bg-gradient-to-br from-blue-50 to-yellow-50 rounded-2xl border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.primary}</h3>
              <ul className="space-y-3 mb-8">
                {[t.item1, t.item2, t.item3, t.item4].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>

              <motion.a
                href="https://wa.me/593999999999"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-lg hover:shadow-xl transition-shadow"
              >
                {t.cta}
                <ArrowRight size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
