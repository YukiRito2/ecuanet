import { motion } from 'framer-motion';
import { Gauge, Zap, CheckCircle2, HeartHandshake } from 'lucide-react';

const items = [
  {
    title: 'Uso de métricas por m²',
    description: 'Cotizaciones transparentes basadas en superficie y necesidad real del espacio.',
    icon: Gauge,
    align: 'left',
  },
  {
    title: 'Trazabilidad del servicio',
    description: 'Supervisión clara del cumplimiento, frecuencia y estándares de cada limpieza.',
    icon: Zap,
    align: 'right',
  },
  {
    title: 'Mecanización y cuidado',
    description: 'Combinamos equipos profesionales con procedimientos que protegen cada superficie.',
    icon: CheckCircle2,
    align: 'left',
  },
  {
    title: 'Operadores valorados',
    description: 'Trabajamos con personal preparado, respetado y enfocado en resultados sostenibles.',
    icon: HeartHandshake,
    align: 'right',
  },
] as const;

export default function Differentiators() {
  return (
    <section id="differentiators" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">
            ¿Por qué elegirnos?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Calidad que se nota desde el primer día
          </p>
        </motion.div>

        <div className="space-y-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: item.align === 'left' ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="grid items-center gap-6 md:grid-cols-2"
              >
                <div
                  className={`${item.align === 'left' ? 'md:order-1' : 'md:order-2'} rounded-[1.8rem] border border-slate-200 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.04)]`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FCD116] via-[#002E7D] to-[#CE1126] text-white shadow-lg">
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-base leading-7 text-slate-600">{item.description}</p>
                </div>

                <div
                  className={`${item.align === 'left' ? 'md:order-2' : 'md:order-1'} relative flex h-full min-h-[220px] items-center justify-center overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-[#002E7D] to-[#001a4d]`}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(252,209,22,0.25),transparent_55%)]" />
                  <Icon size={72} strokeWidth={1.5} className="relative text-[#FCD116]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
