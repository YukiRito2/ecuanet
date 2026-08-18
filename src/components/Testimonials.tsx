import { motion, type Variants } from 'framer-motion';
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

const EASE = [0.23, 1, 0.32, 1] as const;

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.12, duration: 0.6, ease: EASE },
  }),
};

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const CARD_THEMES = [
  { wrapper: 'lg:col-span-2 lg:row-span-2 bg-[#002E7D] text-white', pattern: true, avatar: 'bg-white/15', meta: 'text-blue-200' },
  { wrapper: 'bg-gradient-to-br from-[#CE1126] to-[#8f0c17] text-white', pattern: false, avatar: 'bg-white/15', meta: 'text-red-100' },
  { wrapper: 'bg-slate-900 text-white', pattern: false, avatar: 'bg-white/10', meta: 'text-slate-400' },
] as const;

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

        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {t.items.map((item, i) => {
            const theme = CARD_THEMES[i % CARD_THEMES.length];
            const featured = i === 0;
            return (
              <motion.div
                key={item.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={revealVariants}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.8rem] p-7 shadow-[0_18px_50px_rgba(15,23,42,0.12)] ${theme.wrapper} ${featured ? 'min-h-[19rem]' : 'min-h-[13.5rem]'}`}
              >
                {theme.pattern && (
                  <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(#fff_1px,transparent_1.6px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_40%,transparent_100%)]" />
                )}

                <div className="relative mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} size={16} className="fill-[#FCD116] text-[#FCD116]" />
                  ))}
                </div>

                <p className={`relative leading-7 ${featured ? 'text-xl' : 'text-base'}`}>{item.text}</p>

                <div className="relative mt-6 flex items-center gap-3 border-t border-white/15 pt-5">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${theme.avatar}`}>
                    {initials(item.name)}
                  </span>
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className={`text-sm ${theme.meta}`}>{item.company}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
