'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check, MapPin, ShieldCheck, Sparkles } from 'lucide-react';

export default function PremiumHero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#f4f7fb] pt-28 pb-18">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(252,209,22,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,_rgba(0,46,125,0.12),transparent_30%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-7"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm"
          >
            <Sparkles size={16} className="text-yellow-500" />
            Limpieza premium en Andorra
          </motion.div>

          <div className="space-y-5">
            <h1 className="text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-5xl lg:text-7xl">
              Deja tu espacio
              <span className="block bg-gradient-to-r from-[#FCD116] via-[#002E7D] to-[#CE1126] bg-clip-text text-transparent">
                impecable.
              </span>
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Limpieza profesional para oficinas, viviendas, hoteles, comercios y espacios corporativos con estándares de calidad y atención cercana.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <motion.a
              href="https://wa.me/593999999999"
              target="_blank"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FCD116] to-[#f5b700] px-6 py-3.5 font-semibold text-slate-900 shadow-lg shadow-yellow-200"
            >
              Solicitar presupuesto
              <ArrowRight size={18} />
            </motion.a>
            <a href="#services" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-800">
              Ver servicios
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="flex items-center gap-2"><Check size={16} className="text-emerald-500" /> Personal capacitado</div>
            <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-500" /> Supervisión constante</div>
            <div className="flex items-center gap-2"><MapPin size={16} className="text-emerald-500" /> Andorra · Europa</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
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
            <div className="absolute left-8 top-8 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-lg backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Satisfacción</p>
              <p className="mt-1 text-2xl font-black text-slate-900">4.9/5</p>
            </div>
            <div className="absolute bottom-8 right-8 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Clientes</p>
              <p className="mt-1 text-xl font-black text-slate-900">50+ empresas</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
