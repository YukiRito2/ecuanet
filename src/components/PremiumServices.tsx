import { motion } from 'framer-motion';
import { Building2, Castle, Home, Sparkles, Truck, Wrench } from 'lucide-react';
import DotBackground from './DotBackground';

interface PremiumServicesProps {
  lang: 'es' | 'ca' | 'fr';
  t: {
    eyebrow: string;
    title: string;
    list: readonly { title: string; description: string }[];
  };
}

const icons = [Building2, Home, Castle, Truck, Sparkles, Wrench];
const images = [
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80',
];

export default function PremiumServices({ t }: PremiumServicesProps) {
  const services = t.list.map((service, i) => ({ ...service, icon: icons[i], image: images[i] }));

  return (
    <section id="services" className="relative overflow-hidden bg-white py-24">
      <DotBackground />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#002E7D]">{t.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
            {t.title}
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group overflow-hidden rounded-[1.8rem] border border-slate-200 bg-slate-50 shadow-[0_18px_50px_rgba(15,23,42,0.04)]"
              >
                <div className="overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FCD116] via-[#002E7D] to-[#CE1126] text-white shadow-lg">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
                  <p className="text-base leading-7 text-slate-600">{service.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
