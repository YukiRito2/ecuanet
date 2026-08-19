import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { EASE, FadeIn } from "./shared";

const Counter = ({ to, suffix = "", gold = false }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: EASE,
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span
      ref={ref}
      className={`font-mono text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl ${gold ? "text-gold" : "text-white"}`}
    >
      {val}
      {suffix}
    </span>
  );
};

const STATS = [
  { to: 12, suffix: "+", label: "Años de experiencia", detail: "Líderes en limpieza premium en Andorra", gold: false },
  { to: 450, suffix: "+", label: "Clientes activos", detail: "Hogares, chalets y sedes corporativas", gold: false },
  { to: 98, suffix: "%", label: "Retención de clientes", detail: "Renovación de contratos anuales", gold: true },
  { to: 7, suffix: "/7", label: "Parroquias cubiertas", detail: "Cobertura total del Principado", gold: false },
];

export default function Results() {
  return (
    <section id="resultados" data-testid="results-section" className="relative overflow-hidden bg-navy-surface py-20 lg:py-28">
      <div className="absolute inset-0 bg-grid-navy opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.12}>
              <div data-testid={`result-stat-${i}`} className="border-l border-white/15 pl-6">
                <Counter to={s.to} suffix={s.suffix} gold={s.gold} />
                <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-white/90">{s.label}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-[#A3B8CC]">{s.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
