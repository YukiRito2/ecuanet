import { Check, ArrowRight } from "lucide-react";
import { FadeIn, Kicker, MaskedLines } from "./shared";
import { scrollToId } from "@/lib/scroll";

const PLANS = [
  {
    id: "esencial",
    name: "Esencial",
    price: 79,
    scope: "Hogares hasta 100 m²",
    features: [
      "Limpieza general completa",
      "Productos ECO-Clean incluidos",
      "Cocina y baños a fondo",
      "Flexibilidad total de horario",
    ],
    featured: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 149,
    scope: "Hogares y oficinas hasta 200 m²",
    features: [
      "Todo lo del plan Esencial",
      "Cristales y ventanales incluidos",
      "Equipo dedicado de 2 profesionales",
      "Plan semanal o bisemanal",
      "Productos premium para acabados nobles",
    ],
    featured: true,
  },
  {
    id: "signature",
    name: "Signature",
    price: 289,
    scope: "Chalets, sedes y fin de obra",
    features: [
      "Todo lo del plan Premium",
      "Limpieza técnica fin de obra",
      "Protocolo de discreción VIP",
      "Disponibilidad 7 días",
      "Supervisor de calidad dedicado",
    ],
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="precios" data-testid="pricing-section" className="bg-[#F8FAFC] py-20 text-slate-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <FadeIn className="flex justify-center">
            <Kicker light>Precios</Kicker>
          </FadeIn>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-navy-deep sm:text-4xl lg:text-5xl">
            <MaskedLines
              lines={[
                <>Tarifas claras,</>,
                <>
                  sin <span className="font-serif font-medium italic text-navy">sorpresas</span>.
                </>,
              ]}
            />
          </h2>
          <FadeIn delay={0.2}>
            <p className="mt-5 text-base leading-relaxed text-slate-500">
              Precio por visita, confirmado tras la visita técnica gratuita. Sin permanencias
              ni costes ocultos.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
          {PLANS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.12} className="h-full">
              <article
                data-testid={`pricing-plan-${p.id}`}
                className={`relative flex h-full flex-col rounded-3xl border p-8 transition-transform duration-500 hover:-translate-y-1.5 ${
                  p.featured
                    ? "border-gold/50 bg-navy-deep text-white shadow-[0_30px_80px_-30px_rgba(0,46,125,0.5)] lg:scale-[1.04]"
                    : "border-slate-200 bg-white text-slate-900 shadow-sm"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-navy-deep">
                    Más solicitado
                  </span>
                )}
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
                  {p.name}
                </h3>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className={`font-mono text-5xl font-bold tracking-tight ${p.featured ? "text-white" : "text-navy-deep"}`}>
                    €{p.price}
                  </span>
                  <span className={`text-sm ${p.featured ? "text-white/60" : "text-slate-400"}`}>/ visita</span>
                </div>
                <p className={`mt-2 text-sm ${p.featured ? "text-white/70" : "text-slate-500"}`}>{p.scope}</p>
                <ul className="mt-7 flex flex-1 flex-col gap-3.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${p.featured ? "bg-gold/20" : "bg-navy/10"}`}>
                        <Check size={12} className={p.featured ? "text-gold" : "text-navy"} />
                      </span>
                      <span className={p.featured ? "text-white/85" : "text-slate-600"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  data-testid={`pricing-cta-${p.id}`}
                  onClick={() => scrollToId("contacto")}
                  className={`group mt-9 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold transition-[background-color,transform,color] duration-300 ${
                    p.featured
                      ? "bg-gold text-navy-deep hover:bg-gold-dark"
                      : "border border-navy/20 text-navy-deep hover:border-navy hover:bg-navy hover:text-white"
                  }`}
                >
                  Solicitar este plan
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
