import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import DotBackground from './DotBackground';

interface TestimonialsProps {
  lang: 'es' | 'ca' | 'fr';
  t: {
    title: string;
    subtitle: string;
    items: readonly { name: string; company: string; text: string }[];
  };
}

export default function Testimonials({ t }: TestimonialsProps) {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      <DotBackground />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {t.items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="rounded-[1.8rem] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.04)]"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={16} className="fill-[#FCD116] text-[#FCD116]" />
                ))}
              </div>
              <p className="leading-7 text-slate-700">{item.text}</p>
              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="font-bold text-slate-900">{item.name}</p>
                <p className="text-sm text-slate-500">{item.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
