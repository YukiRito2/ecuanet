import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, ArrowDown, Star, ShieldCheck } from "lucide-react";
import { EASE, MaskedLines } from "./shared";
import { scrollToId } from "@/lib/scroll";

const STATS = [
  { value: "12+", label: "Años de experiencia", detail: "Líderes en el Principado", testid: "trust-stat-years" },
  { value: "450+", label: "Clientes activos", detail: "Hogares y empresas", testid: "trust-stat-clients" },
  { value: "7/7", label: "Zona de cobertura", detail: "Todas las parroquias", testid: "trust-stat-coverage" },
];

export default function PremiumHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imgMainY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const imgSecY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const bgWordY = useTransform(scrollYProgress, [0, 1], [0, 170]);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 120, damping: 18 });

  const onTilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const resetTilt = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <section id="home" ref={ref} data-testid="hero-section" className="relative min-h-screen overflow-hidden bg-navy-deep">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_620px_at_74%_18%,#002E7D_0%,#002466_45%,#001B4D_100%)]" />
      <div className="absolute inset-0 bg-grid-navy opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute -top-36 right-[6%] h-[440px] w-[440px] rounded-full bg-gold/15 blur-[140px]" />
      <motion.div
        style={{ y: bgWordY }}
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-0 select-none whitespace-nowrap font-mono text-[21vw] font-bold leading-none text-stroke-navy"
      >
        ECUANET
      </motion.div>
      <div className="grain absolute inset-0" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-4 pb-32 pt-32 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:pt-40"
      >
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
            data-testid="hero-badge"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/80">
              Limpieza premium en Andorra
            </span>
          </motion.div>

          <h1
            data-testid="hero-title"
            className="mt-8 text-4xl font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            <MaskedLines
              delay={0.35}
              lines={[
                <>Excelencia e higiene</>,
                <span className="font-serif font-medium italic text-gold">impecable</span>,
                <>para espacios exclusivos.</>,
              ]}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.95 }}
            data-testid="hero-subtitle"
            className="mt-7 max-w-xl text-base leading-relaxed text-[#A3B8CC] sm:text-lg"
          >
            Servicio residencial y corporativo de alta gama, adaptado a las exigencias de
            chalets de lujo, sedes empresariales y residencias en el Principado de Andorra.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <button
              data-testid="hero-primary-cta"
              onClick={() => scrollToId("contacto")}
              className="group inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 text-sm font-bold text-navy-deep shadow-[0_12px_40px_-8px_rgba(252,209,22,0.45)] transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-gold-dark hover:shadow-[0_18px_50px_-8px_rgba(252,209,22,0.55)]"
            >
              Solicitar presupuesto
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              data-testid="hero-secondary-cta"
              onClick={() => scrollToId("servicios")}
              className="inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:bg-white/5"
            >
              Ver servicios
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 1.25 }}
            className="mt-16 grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {STATS.map((s) => (
              <div key={s.testid} data-testid={s.testid}>
                <p className="font-mono text-3xl font-semibold tracking-tight text-white sm:text-4xl">{s.value}</p>
                <p className="mt-2 text-sm font-semibold text-white/85">{s.label}</p>
                <p className="mt-0.5 text-xs text-[#A3B8CC]">{s.detail}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative lg:col-span-5" style={{ perspective: 1200 }}>
          <motion.div style={{ y: imgMainY }} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.55 }}
            >
              <motion.div
                data-testid="hero-photo-card"
                onMouseMove={onTilt}
                onMouseLeave={resetTilt}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative overflow-hidden rounded-[28px] border border-white/15 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
              >
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80&auto=format&fit=crop"
                  alt="Profesional de limpieza Ecuanet trabajando con precisión"
                  className="aspect-[3/4] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/75 via-transparent to-navy-deep/30" />
                <div className="absolute inset-x-5 top-5 flex items-start justify-between" style={{ transform: "translateZ(40px)" }}>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Protocolo Ecuanet</p>
                    <p className="mt-1 text-sm font-semibold text-white">Precisión de estándar suizo</p>
                  </div>
                  <ShieldCheck size={22} className="text-gold" />
                </div>
              </motion.div>
            </motion.div>

            <motion.div style={{ y: imgSecY }} className="absolute -bottom-8 left-1 w-36 sm:-left-4 sm:w-48 lg:-left-12">
              <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.8 }}
                className="overflow-hidden rounded-2xl border border-white/20 shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?w=500&q=80&auto=format&fit=crop"
                  alt="Limpieza profesional de cristales"
                  className="aspect-[4/5] w-full object-cover"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
              data-testid="hero-rating-chip"
              className="absolute -right-2 top-8 rounded-2xl border border-white/15 bg-navy-surface/80 px-4 py-3 backdrop-blur-md lg:-right-6"
            >
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="mt-1.5 font-mono text-sm font-semibold text-white">4.9/5</p>
              <p className="text-[10px] uppercase tracking-widest text-[#A3B8CC]">200+ reseñas</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        data-testid="hero-scroll-indicator"
        onClick={() => scrollToId("servicios")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">Desliza</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute left-0 top-0 h-4 w-px bg-gold"
            animate={{ y: [-16, 44] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown size={12} className="text-white/50" />
      </motion.button>
    </section>
  );
}
