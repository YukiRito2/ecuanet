import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import DotBackground from './DotBackground';
import CompareSlider from './CompareSlider';

interface TrabajosPageProps {
  lang: 'es' | 'ca' | 'fr';
  onOpenQuoter: () => void;
  t: {
    eyebrow: string;
    title: string;
    subtitle: string;
    intro: string;
    before: string;
    after: string;
    cta: string;
    items: readonly { category: string; location: string; description: string }[];
  };
}

const IMAGES = [
  { before: 'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=900&q=80', after: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80' },
  { before: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80', after: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=900&q=80' },
  { before: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=900&q=80', after: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80' },
  { before: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80', after: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80' },
  { before: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80', after: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80' },
  { before: 'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&w=900&q=80', after: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80' },
] as const;

export default function TrabajosPage({ onOpenQuoter, t }: TrabajosPageProps) {
  const jobs = t.items.map((item, i) => ({ ...item, ...IMAGES[i] }));

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-[#f4f7fb] pb-16 pt-32 sm:pt-36">
        <DotBackground />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#002E7D]">{t.eyebrow}</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-5xl">{t.title}</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-600">{t.subtitle}</p>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-500">{t.intro}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {jobs.map((job, index) => {
              const featured = index % 3 === 0;
              return (
                <motion.article
                  key={`${job.category}-${job.location}`}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: (index % 3) * 0.08, duration: 0.5 }}
                  className={`flex flex-col overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.07)] ${featured ? 'lg:col-span-2' : ''}`}
                >
                  <div className="flex items-center justify-between bg-slate-900 px-5 py-4 text-white">
                    <span className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">{job.category}</span>
                    <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-yellow-300">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                  </div>

                  <div className="p-4">
                    <CompareSlider
                      before={job.before}
                      after={job.after}
                      beforeLabel={t.before}
                      afterLabel={t.after}
                      beforeAlt={`${job.category} en ${job.location}, antes`}
                      afterAlt={`${job.category} en ${job.location}, después`}
                      className="h-56 sm:h-64"
                    />
                  </div>

                  <p className="flex-1 px-5 pb-6 text-base leading-7 text-slate-600">{job.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-900 sm:text-3xl">{t.cta}</h2>
          <motion.button
            type="button"
            onClick={onOpenQuoter}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#FCD116] to-[#f5b700] px-8 py-4 font-bold text-slate-900 shadow-[0_20px_40px_rgba(252,209,22,0.35)] transition-all"
          >
            {t.cta}
            <ArrowRight size={20} />
          </motion.button>
        </div>
      </section>
    </div>
  );
}
