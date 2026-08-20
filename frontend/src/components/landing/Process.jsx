import { FadeIn, Kicker, MaskedLines } from "./shared";

const STEPS = [
  {
    number: "01",
    title: "Diagnóstico & Visita Técnica",
    description:
      "Estudiamos cada estancia, los materiales nobles y tus necesidades concretas. Sin compromiso y sin coste.",
    tag: "48h de respuesta",
  },
  {
    number: "02",
    title: "Protocolo a Medida",
    description:
      "Plan ECO-Clean adaptado a tu espacio: productos 100% ecológicos, seguros para niños, mascotas y acabados delicados.",
    tag: "100% ecológico",
  },
  {
    number: "03",
    title: "Ejecución con Discreción",
    description:
      "Personal verificado bajo estricto compromiso de confidencialidad. Fuera de tu horario, si así lo prefieres.",
    tag: "Personal verificado",
  },
  {
    number: "04",
    title: "Control & Garantía",
    description:
      "Supervisión de calidad tras cada servicio. Si algo no queda impecable, volvemos sin coste adicional.",
    tag: "Garantía total",
  },
];

export default function Process() {
  return (
    <section id="proceso" data-testid="process-section" className="relative bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="max-w-3xl">
          <FadeIn>
            <Kicker light>Proceso</Kicker>
          </FadeIn>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-navy-deep sm:text-4xl lg:text-5xl">
            <MaskedLines
              lines={[
                <>Un método,</>,
                <>
                  cuatro <span className="font-serif font-medium italic text-navy">compromisos</span>.
                </>,
              ]}
            />
          </h2>
        </div>

        <div className="mt-16">
          {STEPS.map((s, i) => (
            <FadeIn key={s.number} delay={i * 0.08}>
              <div
                data-testid={`process-step-${s.number}`}
                className="group grid grid-cols-1 gap-4 border-t border-slate-200 py-10 transition-colors duration-500 last:border-b hover:bg-navy/[0.03] sm:grid-cols-12 sm:items-center sm:gap-8"
              >
                <div className="sm:col-span-3">
                  <span className="font-mono text-6xl font-bold tracking-tight text-navy/10 transition-colors duration-500 group-hover:text-gold-dark sm:text-7xl">
                    {s.number}
                  </span>
                </div>
                <div className="sm:col-span-6">
                  <h3 className="text-xl font-semibold text-navy-deep sm:text-2xl">{s.title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-500">{s.description}</p>
                </div>
                <div className="sm:col-span-3 sm:text-right">
                  <span className="inline-block rounded-full border border-slate-200 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 transition-colors duration-500 group-hover:border-gold-dark/50 group-hover:text-gold-dark">
                    {s.tag}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
