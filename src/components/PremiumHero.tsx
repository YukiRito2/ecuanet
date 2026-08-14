import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowRight, Check, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

interface PremiumHeroProps {
  lang: 'es' | 'ca' | 'fr';
  t: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stat1: string;
    stat2: string;
    stat3: string;
  };
}

const EASE = [0.23, 1, 0.32, 1] as const;

export default function PremiumHero({ t }: PremiumHeroProps) {
  const reduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.09, delayChildren: 0.05 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section id="home" className="relative overflow-hidden bg-[#f4f7fb] pt-28 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(252,209,22,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(0,46,125,0.12),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-7">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm"
          >
            <Sparkles size={16} className="text-yellow-500" />
            {t.badge}
          </motion.div>

          <motion.div variants={item} className="space-y-5">
            <h1 className="text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-5xl lg:text-7xl">
              {t.title1}
              <span className="block bg-gradient-to-r from-[#FCD116] via-[#002E7D] to-[#CE1126] bg-clip-text text-transparent">
                {t.title2}
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              {t.subtitle}
            </p>
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-4 sm:flex-row">
            <motion.a
              href="https://wa.me/593999999999"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.16, ease: EASE }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FCD116] to-[#f5b700] px-6 py-3.5 font-semibold text-slate-900 shadow-[0_18px_35px_rgba(252,209,22,0.35)] transition-shadow hover:shadow-[0_22px_45px_rgba(252,209,22,0.45)]"
            >
              {t.ctaPrimary}
              <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="#services"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.16, ease: EASE }}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-800 shadow-sm transition-colors hover:border-slate-400"
            >
              {t.ctaSecondary}
            </motion.a>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600"
          >
            <span className="inline-flex items-center gap-1.5">
              <Check size={16} className="text-[#002E7D]" />
              {t.stat1}
            </span>
            <span className="hidden h-4 w-px bg-slate-300 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#002E7D]" />
              {t.stat2}
            </span>
            <span className="hidden h-4 w-px bg-slate-300 sm:block" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5">
              <MapPin size={16} className="text-[#002E7D]" />
              {t.stat3}
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="relative"
        >
          <div className="absolute -left-4 top-10 h-32 w-32 rounded-full bg-yellow-300/40 blur-3xl" />
          <div className="absolute -right-2 bottom-8 h-36 w-36 rounded-full bg-blue-500/25 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
              alt="Limpieza profesional de oficina"
              className="h-[560px] w-full rounded-[1.5rem] object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
