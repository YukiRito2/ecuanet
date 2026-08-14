'use client';

import { motion } from 'framer-motion';
import { Gauge, Zap, CheckCircle2, HeartHandshake } from 'lucide-react';

export default function Differentiators() {
  const items = [
    {
      number: '01',
      title: 'Uso de métricas por m²',
      description: 'Cotizaciones transparentes basadas en superficie y necesidad real del espacio.',
      icon: Gauge,
      align: 'left',
    },
    {
      number: '02',
      title: 'Trazabilidad del servicio',
      description: 'Supervisión clara del cumplimiento, frecuencia y estándares de cada limpieza.',
      icon: Zap,
      align: 'right',
    },
    {
      number: '03',
      title: 'Mecanización y cuidado',
      description: 'Combinamos equipos profesionales con procedimientos que protegen cada superficie.',
      icon: CheckCircle2,
      align: 'left',
    },
    {
      number: '04',
      title: 'Operadores valorados',
      description: 'Trabajamos con personal preparado, respetado y enfocado en resultados sostenibles.',
      icon: HeartHandshake,
      align: 'right',
    },
  ];

  return (
    <section id="differentiators" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">¿Por qué elegirnos?</h2>
          <p className="text-xl text-gray-600">Calidad que se nota desde el primer día</p>
        </motion.div>

        <div className="space-y-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: item.align === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="grid md:grid-cols-2 gap-8 items-center"
              >
                <div className={`${item.align === 'left' ? 'md:order-1' : 'md:order-2'} p-8 rounded-2xl bg-white border border-gray-200 shadow-sm`}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 via-blue-600 to-red-600 flex items-center justify-center">
                      <Icon size={22} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-600">{item.number}</p>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>

                <div className={`${item.align === 'left' ? 'md:order-2' : 'md:order-1'} h-full flex items-center justify-center`}>
                  <div className="text-7xl font-black text-gray-200">{item.number}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
