import { createContext, useContext, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowRight, Check, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { scrollToSection } from '../utils/scrollToSection';

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

const MAIN_IMAGE = { src: 'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?auto=format&fit=crop&w=1200&q=80', alt: 'Sala de reuniones impecable' };
const SIDE_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80', alt: 'Hotel con estándares premium' },
  { src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=80', alt: 'Salón preparado para eventos' },
] as const;

// --- Scroll-scrubbed bento gallery primitives ---

const ScrollContext = createContext<MotionValue<number> | null>(null);
function useGalleryScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error('Must be used within the scroll gallery container');
  return ctx;
}

function BentoCell({ className, children }: { className?: string; children: ReactNode }) {
  const scrollYProgress = useGalleryScroll();
  const reduceMotion = useReducedMotion();
  const translate = useTransform(scrollYProgress, [0.1, 0.9], reduceMotion ? ['0%', '0%'] : ['-35%', '0%']);
  const scale = useTransform(scrollYProgress, [0, 0.9], reduceMotion ? [1, 1] : [0.5, 1]);
  return (
    <motion.div className={className} style={{ translate, scale }}>
      {children}
    </motion.div>
  );
}

function HeroCopy({ children }: { children: ReactNode }) {
  const scrollYProgress = useGalleryScroll();
  const reduceMotion = useReducedMotion();
  // Driven from plain React state rather than a Framer `useTransform` motion value: the
  // motion-value version was intermittently getting stuck at opacity 1 past a certain scroll
  // depth instead of staying clamped at 0, leaving the panel visibly parked over later
  // sections. Recomputing opacity/scale in a normal event handler sidesteps that entirely.
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, 'change', setProgress);
  const fadeProgress = reduceMotion ? 0 : Math.min(progress / 0.45, 1);
  const opacity = 1 - fadeProgress;
  const scale = 1 - fadeProgress * 0.15;
  const faded = fadeProgress >= 1;
  return (
    <motion.div
      className={`fixed left-1/2 top-1/2 z-10 w-[90vw] max-w-xl px-4 text-center ${faded ? 'pointer-events-none' : ''}`}
      style={{ translate: '-50% -50%', scale, opacity }}
    >
      <div className="rounded-[2rem] border border-white/60 bg-white/90 px-6 py-7 shadow-[0_30px_90px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:px-8 sm:py-8">
        {children}
      </div>
    </motion.div>
  );
}

export default function PremiumHero({ t }: PremiumHeroProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="relative bg-[#f4f7fb]">
      <ScrollContext.Provider value={scrollYProgress}>
        <div ref={scrollRef} className="relative h-[190vh] w-full">
          <div className="sticky left-0 top-0 z-0 flex h-svh w-full flex-col gap-3 p-4 pt-24 sm:p-6 sm:pt-28 md:flex-row">
            <BentoCell className="h-1/2 w-full origin-top overflow-hidden rounded-2xl shadow-xl md:h-full md:w-[60%] md:origin-top-left">
              <img src={MAIN_IMAGE.src} alt={MAIN_IMAGE.alt} className="h-full w-full object-cover" />
            </BentoCell>
            <div className="flex h-1/2 w-full gap-3 md:h-full md:w-[38%] md:flex-col">
              <BentoCell className="h-full w-1/2 origin-top-right overflow-hidden rounded-2xl shadow-xl md:w-full">
                <img src={SIDE_IMAGES[0].src} alt={SIDE_IMAGES[0].alt} className="h-full w-full object-cover" />
              </BentoCell>
              <BentoCell className="h-full w-1/2 origin-bottom-right overflow-hidden rounded-2xl shadow-xl md:w-full">
                <img src={SIDE_IMAGES[1].src} alt={SIDE_IMAGES[1].alt} className="h-full w-full object-cover" />
              </BentoCell>
            </div>
          </div>

          <HeroCopy>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm"
            >
              <Sparkles size={16} className="text-yellow-500" />
              {t.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
              className="mt-5 text-4xl font-black tracking-[-0.06em] text-slate-900 sm:text-5xl lg:text-6xl"
            >
              {t.title1}
              <motion.span
                className="block bg-gradient-to-r from-[#FCD116] via-[#002E7D] to-[#CE1126] bg-clip-text text-transparent [background-size:300%_auto]"
                animate={reduceMotion ? undefined : { backgroundPosition: ['0% 50%', '300% 50%'] }}
                transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                {t.title2}
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
              className="mx-auto mt-4 max-w-xl text-lg leading-8 text-slate-600"
            >
              {t.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
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
                onClick={scrollToSection('services')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.16, ease: EASE }}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-800 shadow-sm transition-colors hover:border-slate-400"
              >
                {t.ctaSecondary}
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26, ease: EASE }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600"
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
          </HeroCopy>
        </div>
      </ScrollContext.Provider>
    </section>
  );
}
