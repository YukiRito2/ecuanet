'use client';

import { motion } from 'framer-motion';
import { ClipboardList, Lightbulb, Rocket, TrendingUp } from 'lucide-react';

export default function Process() {
  const steps = [
    { icon: ClipboardList, title: 'Diagnóstico', description: 'Revisamos tu espacio y definimos necesidades reales.' },
    { icon: Lightbulb, title: 'Propuesta', description: 'Creamos un plan con tiempos, equipos y alcance exacto.' },
    { icon: Rocket, title: 'Arranque', description: 'Iniciamos la limpieza con protocolos y coordinación.' },
    { icon: TrendingUp, title: 'Optimización', description: 'Ajustamos resultados para mejorar continuidad y experiencia.' },
  ];

  return (
    <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Cómo trabajamos</h2>
          <p className="text-xl text-gray-600">Un proceso claro, seguro y eficiente</p>
        </motion.div>

        <div className="relative grid md:grid-cols-4 gap-8">
          <div className="hidden md:block absolute left-1/4 right-1/4 top-10 h-0.5 bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-yellow-400 via-blue-600 to-red-600 flex items-center justify-center shadow-lg mb-6">
                  <Icon size={28} className="text-white" />
                </div>
                <div className="text-sm font-bold text-blue-600 mb-2">0{i + 1}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
