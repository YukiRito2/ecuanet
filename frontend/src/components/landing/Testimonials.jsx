import { Star, Quote } from "lucide-react";
import { FadeIn, Kicker, MaskedLines } from "./shared";

const TESTIMONIALS = [
  {
    quote:
      "El equipo trabaja fuera de horario y cada mañana la oficina parece recién inaugurada. Ni una sola incidencia en tres años.",
    name: "Marc Vidal",
    role: "Director de oficina · Escaldes-Engordany",
  },
  {
    quote:
      "Cuidan la madera y los ventanales del chalet como si fuera su propia casa. Nivel suizo, de verdad.",
    name: "Claudia Rossell",
    role: "Propietaria · Chalet en La Massana",
  },
  {
    quote:
      "Llevamos seis años con Ecuanet para las zonas comunes del hotel. Discreción absoluta y trato impecable.",
    name: "Hotel Les Fonts",
    role: "Dirección · Andorra la Vella",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" data-testid="testimonials-section" className="relative overflow-hidden bg-navy-deep py-20 lg:py-32">
      <div className="absolute right-[8%] top-16 h-[360px] w-[360px] rounded-full bg-gold/10 blur-[130px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl">
          <FadeIn>
            <Kicker>Testimonios</Kicker>
          </FadeIn>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            <MaskedLines
              lines={[
                <>Quien confía,</>,
                <>
                  <span className="font-serif font-medium italic text-gold">repite</span>.
                </>,
              ]}
            />
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.12} className="h-full">
              <figure
                data-testid={`testimonial-card-${i}`}
                className="flex h-full flex-col rounded-3xl border border-white/10 bg-navy-surface/40 p-8 transition-[border-color,transform] duration-500 hover:-translate-y-1.5 hover:border-gold/40"
              >
                <Quote size={26} className="text-gold/60" />
                <div className="mt-5 flex items-center gap-1">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={13} className="fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/85">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-7 border-t border-white/10 pt-5">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#A3B8CC]">{t.role}</p>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
