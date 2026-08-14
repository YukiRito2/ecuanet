'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Juan Rodríguez',
      company: 'Hotel Andorra',
      text: 'Muy profesionales y con un trato impecable. Nuestro edificio siempre luce perfecto.',
      rating: 5,
    },
    {
      name: 'María García',
      company: 'Consultora A',
      text: 'La limpieza de nuestras oficinas cambió por completo la experiencia de clientes y equipos.',
      rating: 5,
    },
    {
      name: 'Carlos Moreno',
      company: 'Centro Comercial',
      text: 'Cumplieron perfectamente con tiempos, estándares y atención del equipo.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Qué dicen nuestros clientes</h2>
          <p className="text-xl text-gray-600">Resultados reales y experiencias de confianza</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl border border-gray-200 bg-gray-50"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} size={18} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">“{item.text}”</p>
              <div>
                <p className="font-bold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">{item.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
