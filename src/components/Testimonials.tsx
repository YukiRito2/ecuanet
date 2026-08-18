import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Check, Phone, ShieldCheck, Star } from 'lucide-react';
import DotBackground from './DotBackground';

interface TestimonialsProps {
  lang: 'es' | 'ca' | 'fr';
  t: {
    title: string;
    subtitle: string;
    items: readonly { name: string; company: string; text: string }[];
    ratingLabel: string;
    ctaLabel: string;
    ctaSub: string;
  };
  stat1: string;
  stat2: string;
}

const EASE = [0.23, 1, 0.32, 1] as const;

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: i * 0.1, duration: 0.6, ease: EASE },
  }),
};

function initials(name: string) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

function DotOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-[0.15] [background-image:radial-gradient(#fff_1px,transparent_1.6px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black_40%,transparent_100%)]" />
  );
}

function QuoteCard({
  index,
  big,
  bg,
  text,
  name,
  company,
  pattern,
}: {
  index: number;
  big?: boolean;
  bg: string;
  text: string;
  name: string;
  company: string;
  pattern?: boolean;
}) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={revealVariants}
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 text-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] ${bg} ${big ? 'lg:flex-[7] min-h-[15rem]' : 'lg:flex-[3] min-h-[11rem]'}`}
    >
      {pattern && <DotOverlay />}
      <article className="relative mt-auto">
        <div className="mb-4 flex gap-1">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Star key={idx} size={16} className="fill-[#FCD116] text-[#FCD116]" />
          ))}
        </div>
        <p className={big ? 'text-lg leading-7' : 'text-sm leading-6'}>{text}</p>
        <div className="mt-5 flex items-center gap-3 border-t border-white/15 pt-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs font-bold">
            {initials(name)}
          </span>
          <div>
            <p className="font-bold">{name}</p>
            <p className="text-sm text-white/70">{company}</p>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export default function Testimonials({ t, stat1, stat2 }: TestimonialsProps) {
  const [t1, t2, t3] = t.items;

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

        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-3">
          <div className="flex flex-col gap-3 lg:h-full">
            <QuoteCard index={0} big bg="bg-[#002E7D]" pattern text={t1.text} name={t1.name} company={t1.company} />

            <motion.div
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              className="relative flex min-h-[11rem] flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-[#FCD116] to-[#f5b700] p-5 text-center text-slate-900 shadow-[0_18px_50px_rgba(15,23,42,0.12)] lg:flex-[3]"
            >
              <span className="text-5xl font-black tracking-tight">5.0</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={14} className="fill-[#002E7D] text-[#002E7D]" />
                ))}
              </div>
              <p className="text-sm font-semibold text-slate-800">{t.ratingLabel}</p>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3 lg:h-full">
            <QuoteCard index={2} bg="bg-gradient-to-br from-[#CE1126] to-[#8f0c17]" text={t2.text} name={t2.name} company={t2.company} />
            <QuoteCard index={3} bg="bg-slate-900" text={t3.text} name={t3.name} company={t3.company} />

            <motion.div
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              className="flex flex-1 flex-col justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.04)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#FCD116] via-[#002E7D] to-[#CE1126] text-white">
                <Check size={20} />
              </span>
              <p className="font-bold text-slate-900">{stat1}</p>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3 lg:h-full">
            <motion.div
              custom={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              className="relative flex min-h-[11rem] flex-col justify-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.04)] lg:flex-[3]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#FCD116] via-[#002E7D] to-[#CE1126] text-white">
                <ShieldCheck size={20} />
              </span>
              <p className="font-bold text-slate-900">{stat2}</p>
            </motion.div>

            <motion.a
              href="https://wa.me/593999999999"
              target="_blank"
              rel="noreferrer"
              custom={6}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={revealVariants}
              whileHover={{ y: -3 }}
              className="relative flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#CE1126] to-[#002E7D] p-5 text-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] lg:flex-[7]"
            >
              <DotOverlay />
              <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
                <Phone size={22} />
              </span>
              <div className="relative mt-auto">
                <p className="text-xl font-bold">{t.ctaLabel}</p>
                <p className="mt-1 text-sm text-white/75">{t.ctaSub}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                  WhatsApp
                  <ArrowRight size={16} />
                </span>
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
