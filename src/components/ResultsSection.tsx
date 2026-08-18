import { motion } from 'framer-motion';
import { ArrowRight, Camera, PlayCircle, Sparkles } from 'lucide-react';
import DotBackground from './DotBackground';

interface ResultsSectionProps {
  lang: 'es' | 'ca' | 'fr';
  t: {
    eyebrow: string;
    title: string;
    btn: string;
    before: string;
    after: string;
    video: string;
    cases: readonly { title: string; result: string }[];
  };
}

const images = [
  {
    before: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=900&q=80',
    after: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80',
  },
  {
    before: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    after: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
  },
  {
    before: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80',
    after: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
  },
];

export default function ResultsSection({ t }: ResultsSectionProps) {
  const cases = t.cases.map((item, i) => ({ ...item, ...images[i] }));

  return (
    <section id="results" className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,46,125,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(252,209,22,0.10),transparent_30%)]" />
      <DotBackground />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            <Sparkles size={14} className="text-yellow-500" />
            {t.eyebrow}
          </div>
          <h2 className="text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
            {t.title}
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {cases.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.07)]"
            >
              <div className="bg-slate-900 px-5 py-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
                    {item.title}
                  </span>
                  <div className="flex items-center gap-2 text-yellow-300">
                    <PlayCircle size={18} />
                    <span className="text-xs uppercase tracking-[0.18em]">{t.video}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                  <div className="flex items-center justify-between bg-slate-50 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                    <span>{t.before}</span>
                    <Camera size={14} />
                  </div>
                  <img src={item.before} alt={`${item.title} ${t.before.toLowerCase()}`} className="h-52 w-full object-cover" />
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                  <div className="flex items-center justify-between bg-emerald-50 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700">
                    <span>{t.after}</span>
                    <Sparkles size={14} />
                  </div>
                  <img src={item.after} alt={`${item.title} ${t.after.toLowerCase()}`} className="h-52 w-full object-cover" />
                </div>
              </div>

              <div className="space-y-4 px-5 pb-6 pt-2">
                <p className="text-lg font-bold text-slate-900">{item.result}</p>
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                  {t.btn}
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
