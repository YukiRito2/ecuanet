import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeIn, Kicker, MaskedLines } from "./shared";

const FRAMES = [
  {
    src: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80&auto=format&fit=crop",
    label: "Residencial · La Massana",
    caption: "Chalet de montaña — mantenimiento semanal",
  },
  {
    src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80&auto=format&fit=crop",
    label: "Cocina · Andorra la Vella",
    caption: "Acabados nobles",
  },
  {
    src: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80&auto=format&fit=crop",
    label: "Protocolo ECO-Clean",
    caption: "Productos certificados",
  },
];

export default function Showcase() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const yA = useTransform(scrollYProgress, [0, 1], [80, -30]);
  const yB = useTransform(scrollYProgress, [0, 1], [56, -54]);

  return (
    <section id="showcase" ref={ref} data-testid="showcase-section" className="relative overflow-hidden bg-white py-20 lg:py-32">
      <div className="absolute left-[10%] top-24 h-[380px] w-[380px] rounded-full bg-gold/20 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl">
          <FadeIn>
            <Kicker light>Showcase</Kicker>
          </FadeIn>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-navy-deep sm:text-4xl lg:text-5xl">
            <MaskedLines
              lines={[
                <>El estándar Ecuanet,</>,
                <>
                  en <span className="font-serif font-medium italic text-navy">cada detalle</span>.
                </>,
              ]}
            />
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.div style={{ y: yMain }} className="overflow-hidden rounded-3xl border border-slate-200 shadow-[0_25px_70px_-35px_rgba(0,27,77,0.35)]">
              <div className="relative">
                <img
                  src={FRAMES[0].src}
                  alt={FRAMES[0].caption}
                  loading="lazy"
                  className="aspect-[16/11] w-full scale-110 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{FRAMES[0].label}</p>
                  <p className="mt-1.5 text-lg font-semibold text-white">{FRAMES[0].caption}</p>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-5">
            <motion.div style={{ y: yA }} className="overflow-hidden rounded-3xl border border-slate-200 shadow-[0_25px_70px_-35px_rgba(0,27,77,0.35)]">
              <div className="relative">
                <img
                  src={FRAMES[1].src}
                  alt={FRAMES[1].caption}
                  loading="lazy"
                  className="aspect-[16/9] w-full scale-110 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{FRAMES[1].label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{FRAMES[1].caption}</p>
                </div>
              </div>
            </motion.div>
            <motion.div style={{ y: yB }} className="overflow-hidden rounded-3xl border border-slate-200 shadow-[0_25px_70px_-35px_rgba(0,27,77,0.35)]">
              <div className="relative">
                <img
                  src={FRAMES[2].src}
                  alt={FRAMES[2].caption}
                  loading="lazy"
                  className="aspect-[16/9] w-full scale-110 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">{FRAMES[2].label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{FRAMES[2].caption}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
