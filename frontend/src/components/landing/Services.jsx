import { ArrowUpRight } from "lucide-react";
import { FadeIn, Kicker, MaskedLines } from "./shared";
import { scrollToId } from "@/lib/scroll";

const SERVICES = [
  {
    id: "residencial",
    number: "01",
    title: "Residencial de Lujo & Chalets",
    description:
      "Cuidado exhaustivo de acabados nobles, madera, mampostería y grandes ventanales con productos específicos para cada material.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "corporativo",
    number: "02",
    title: "Sedes Corporativas & Oficinas",
    description:
      "Mantenimiento discreto fuera de horario laboral para asegurar entornos de trabajo impecables cada mañana.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "cristaleria",
    number: "03",
    title: "Cristalería & Ventanales de Alta Montaña",
    description:
      "Limpieza especializada de cristales en altura y fachadas panorámicas con técnicas de pureza absoluta.",
    image: "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?w=900&q=80&auto=format&fit=crop",
  },
  {
    id: "findeobra",
    number: "04",
    title: "Limpieza Técnica Fin de Obra",
    description:
      "Desinfección y eliminación total de micro-polvo tras reformas de alto nivel, lista para entrar a vivir.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=900&q=80&auto=format&fit=crop",
  },
];

export default function Services() {
  return (
    <section id="servicios" data-testid="services-section" className="relative bg-navy-deep py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <FadeIn>
              <Kicker>Servicios</Kicker>
            </FadeIn>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              <MaskedLines
                lines={[
                  <>Limpieza de alto nivel,</>,
                  <span className="font-serif font-medium italic text-gold">a medida</span>,
                  <>de cada espacio.</>,
                ]}
              />
            </h2>
          </div>
          <div className="lg:col-span-5">
            <FadeIn delay={0.2}>
              <p className="text-base leading-relaxed text-[#A3B8CC]">
                Cuatro especialidades, un mismo estándar: el suizo. Cada servicio se
                planifica tras una visita técnica y se ejecuta con protocolos ECO-Clean
                certificados.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.1}>
              <article
                data-testid={`services-card-${s.id}`}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-navy-surface/40 transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-gold/40"
              >
                <div className="relative h-56 overflow-hidden sm:h-64">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-navy-deep/70 px-3 py-1 font-mono text-xs font-semibold text-gold backdrop-blur-sm">
                    {s.number}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-semibold text-white sm:text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#A3B8CC]">{s.description}</p>
                  <button
                    data-testid={`services-cta-${s.id}`}
                    onClick={() => scrollToId("contacto")}
                    className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:text-gold-dark"
                  >
                    Pedir este servicio
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
