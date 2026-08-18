import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { TrendingDown, Award, Zap, DollarSign } from 'lucide-react';
import DotBackground from './DotBackground';

interface PriceValueProps {
  lang: 'es' | 'ca' | 'fr';
}

const translations = {
  es: {
    eyebrow: 'Transparencia de Precios',
    title: 'Máxima calidad al mejor precio',
    subtitle: 'Nos comprometemos a ofrecerte servicios premium sin marcar precios inflados. Inversión inteligente, resultados garantizados.',
    benefits: [
      {
        icon: 'TrendingDown',
        title: 'Sin sorpresas',
        description: 'Presupuestos claros y transparentes. Lo que ves es lo que pagas.',
      },
      {
        icon: 'Award',
        title: 'Premium verificado',
        description: 'Certificaciones internacionales y protocolos de calidad rigurosos.',
      },
      {
        icon: 'Zap',
        title: 'Eficiencia garantizada',
        description: 'Equipos capacitados que hacen el trabajo en tiempo récord sin comprometer calidad.',
      },
      {
        icon: 'DollarSign',
        title: 'ROI comprobado',
        description: 'Nuestros clientes reportan menos reinversión en mantenimiento al año.',
        value: { number: 40, prefix: '-', suffix: '%' },
      },
    ],
    cta: 'Solicita una cotización sin compromiso',
  },
  ca: {
    eyebrow: 'Transparència de Preus',
    title: 'Màxima qualitat al millor preu',
    subtitle: 'Ens comprometem a oferir-te serveis premium sense marcar preus inflats. Inversió intel·ligent, resultats garantits.',
    benefits: [
      {
        icon: 'TrendingDown',
        title: 'Sense sorpreses',
        description: 'Pressupostos clars i transparents. El que veus és el que pagaràs.',
      },
      {
        icon: 'Award',
        title: 'Premium verificat',
        description: 'Certificacions internacionals i protocols de qualitat rigorosos.',
      },
      {
        icon: 'Zap',
        title: 'Eficiència garantida',
        description: 'Equips capacitats que fan la feina en temps rècord sense comprometre qualitat.',
      },
      {
        icon: 'DollarSign',
        title: 'ROI comprovat',
        description: 'Els nostres clients reporten menys reinversió en manteniment l\'any.',
        value: { number: 40, prefix: '-', suffix: '%' },
      },
    ],
    cta: 'Sol·licita una cotització sense compromís',
  },
  fr: {
    eyebrow: 'Transparence des Prix',
    title: 'Qualité maximale au meilleur prix',
    subtitle: 'Nous nous engageons à vous offrir des services premium sans gonflage des tarifs. Investissement intelligent, résultats garantis.',
    benefits: [
      {
        icon: 'TrendingDown',
        title: 'Pas de surprises',
        description: 'Devis clairs et transparents. Ce que vous voyez est ce que vous payez.',
      },
      {
        icon: 'Award',
        title: 'Premium vérifié',
        description: 'Certifications internationales et protocoles de qualité rigoureux.',
      },
      {
        icon: 'Zap',
        title: 'Efficacité garantie',
        description: 'Équipes qualifiées qui font le travail en temps record sans compromettre la qualité.',
      },
      {
        icon: 'DollarSign',
        title: 'ROI prouvé',
        description: 'Nos clients signalent moins de réinvestissement en maintenance par an.',
        value: { number: 40, prefix: '-', suffix: '%' },
      },
    ],
    cta: 'Demandez un devis sans engagement',
  },
};

const iconMap = {
  TrendingDown,
  Award,
  Zap,
  DollarSign,
};

function Counter({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(reduceMotion ? to : 0);

  useEffect(() => {
    if (!isInView || reduceMotion) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, to, reduceMotion]);

  return (
    <span ref={ref}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default function PriceValue({ lang }: PriceValueProps) {
  const t = translations[lang];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(252,209,22,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(0,46,125,0.06),transparent_35%)]" />
      <DotBackground />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#002E7D]">{t.eyebrow}</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">{t.title}</h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">{t.subtitle}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {t.benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                whileHover={{ y: -6, borderColor: 'rgba(252, 209, 22, 0.5)' }}
                className="group relative overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/0 via-transparent to-blue-50/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: [0, -8, 8, -4, 0] }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FCD116] via-[#002E7D] to-[#CE1126] shadow-lg"
                  >
                    <Icon size={24} className="text-white" />
                  </motion.div>

                  {benefit.value && (
                    <p className="text-4xl font-black tracking-tight text-[#002E7D]">
                      <Counter to={benefit.value.number} prefix={benefit.value.prefix} suffix={benefit.value.suffix} />
                    </p>
                  )}

                  <h3 className="text-xl font-bold text-slate-900">{benefit.title}</h3>
                  <p className="leading-6 text-slate-600">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-16 flex justify-center">
          <motion.a
            href="https://wa.me/593999999999"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#FCD116] to-[#f5b700] px-8 py-4 font-bold text-slate-900 shadow-[0_20px_40px_rgba(252,209,22,0.35)] transition-all"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <DollarSign size={20} className="relative" />
            <span className="relative">{t.cta}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
