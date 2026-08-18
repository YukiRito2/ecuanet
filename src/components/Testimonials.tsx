import type { ReactNode } from 'react';
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

// Decorative environmental photography only — never a photo standing in for a specific
// named client, since that would misrepresent a stranger's face as theirs.
function PhotoBackdrop({ src, dark }: { src: string; dark?: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <img src={src} alt="" aria-hidden="true" className={`h-full w-full scale-125 object-cover blur-md ${dark ? 'opacity-40' : 'opacity-[0.14]'}`} />
      <div className={`absolute inset-0 ${dark ? 'bg-gradient-to-t from-emerald-950/90 via-emerald-900/55 to-emerald-800/25' : 'bg-gradient-to-t from-white via-white/85 to-white/60'}`} />
    </div>
  );
}

function Card({
  index,
  big,
  photo,
  photoDark,
  tone = 'light',
  className = '',
  children,
}: {
  index: number;
  big?: boolean;
  photo?: string;
  photoDark?: boolean;
  tone?: 'light' | 'emerald' | 'copper';
  className?: string;
  children: ReactNode;
}) {
  const toneClass = {
    light: 'border border-slate-200 bg-white text-slate-900 shadow-[0_18px_50px_rgba(15,23,42,0.05)]',
    emerald: 'bg-gradient-to-br from-emerald-600 to-emerald-800 text-white shadow-[0_18px_50px_rgba(4,120,87,0.25)]',
    copper: 'bg-gradient-to-br from-[#B45309] to-[#7C3A0C] text-white shadow-[0_18px_50px_rgba(124,58,12,0.25)]',
  }[tone];

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={revealVariants}
      className={`relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 ${toneClass} ${big ? 'lg:flex-[7] min-h-[15rem]' : 'lg:flex-[3] min-h-[11rem]'} ${className}`}
    >
      {photo && <PhotoBackdrop src={photo} dark={photoDark} />}
      {children}
    </motion.div>
  );
}

function Stars({ className = 'fill-emerald-500 text-emerald-500' }: { className?: string }) {
  return (
    <div className="mb-4 flex gap-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star key={idx} size={16} className={className} />
      ))}
    </div>
  );
}

function QuoteBody({
  big,
  text,
  name,
  company,
  dark,
}: {
  big?: boolean;
  text: string;
  name: string;
  company: string;
  dark?: boolean;
}) {
  return (
    <article className="relative mt-auto">
      <Stars className={dark ? 'fill-emerald-300 text-emerald-300' : undefined} />
      <p className={`${big ? 'text-lg leading-7' : 'text-sm leading-6'} ${dark ? 'text-white' : 'text-slate-700'}`}>{text}</p>
      <div className={`mt-5 flex items-center gap-3 border-t pt-4 ${dark ? 'border-white/15' : 'border-slate-100'}`}>
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${dark ? 'bg-white/15 text-white' : 'bg-emerald-50 text-emerald-700'}`}
        >
          {initials(name)}
        </span>
        <div>
          <p className={`font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>{name}</p>
          <p className={`text-sm ${dark ? 'text-white/60' : 'text-slate-500'}`}>{company}</p>
        </div>
      </div>
    </article>
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
            <Card index={0} big tone="emerald" photo="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80" photoDark>
              <QuoteBody big dark text={t1.text} name={t1.name} company={t1.company} />
            </Card>

            <Card index={1}>
              <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                <span className="text-5xl font-black tracking-tight text-emerald-600">5.0</span>
                <Stars />
                <p className="text-sm font-semibold text-slate-600">{t.ratingLabel}</p>
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-3 lg:h-full">
            <Card index={2} photo="https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&w=1000&q=80">
              <QuoteBody text={t2.text} name={t2.name} company={t2.company} />
            </Card>
            <Card index={3}>
              <QuoteBody text={t3.text} name={t3.name} company={t3.company} />
            </Card>

            <Card index={4} className="lg:flex-1">
              <div className="flex flex-col gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Check size={20} />
                </span>
                <p className="font-bold text-slate-900">{stat1}</p>
              </div>
            </Card>
          </div>

          <div className="flex flex-col gap-3 lg:h-full">
            <Card index={5}>
              <div className="flex flex-col gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#B45309]/10 text-[#B45309]">
                  <ShieldCheck size={20} />
                </span>
                <p className="font-bold text-slate-900">{stat2}</p>
              </div>
            </Card>

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
              className="relative flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#B45309] to-[#7C3A0C] p-5 text-white shadow-[0_18px_50px_rgba(124,58,12,0.25)] lg:flex-[7]"
            >
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
