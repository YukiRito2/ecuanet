import { motion } from 'framer-motion';
import { Phone, MapPin, ArrowRight } from 'lucide-react';
import DotBackground from './DotBackground';

interface ContactProps {
  lang: 'es' | 'ca' | 'fr';
  t: {
    title: string;
    subtitle: string;
    whatsapp: string;
    whatsappSub: string;
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
    <section id="contact" className="relative overflow-hidden bg-white py-24">
      <DotBackground />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">{t.title}</h2>
              <p className="mt-4 text-lg leading-8 text-slate-600">{t.subtitle}</p>
            </div>

            <div className="space-y-4">
              <motion.a
                href="https://wa.me/593999999999"
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 transition-colors hover:border-[#FCD116] hover:bg-yellow-50/60"
              >
                <Phone className="text-[#f5b700]" size={24} />
                <div>
                  <p className="font-semibold text-slate-900">{t.whatsapp}</p>
                  <p className="text-sm text-slate-500">{t.whatsappSub}</p>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 transition-colors hover:border-[#CE1126] hover:bg-red-50/60"
              >
                <MapPin className="text-[#CE1126]" size={24} />
                <div>
                  <p className="font-semibold text-slate-900">{t.location}</p>
                  <p className="text-sm text-slate-500">{t.locationSub}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-[1.8rem] border border-slate-200 bg-slate-50 p-10">
              <h3 className="text-2xl font-bold text-slate-900">{t.primary}</h3>
              <ul className="mt-6 space-y-3">
                {[t.item1, t.item2, t.item3, t.item4].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-slate-700">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FCD116] via-[#002E7D] to-[#CE1126]">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <motion.a
                href="https://wa.me/593999999999"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FCD116] to-[#f5b700] px-8 py-4 font-bold text-slate-900 shadow-[0_20px_40px_rgba(252,209,22,0.35)] transition-all"
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
