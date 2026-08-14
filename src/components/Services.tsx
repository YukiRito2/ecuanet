'use client';

import { motion } from 'framer-motion';
import { Building2, Home, Zap, Droplets, Gem, Users } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Building2,
      title: 'Limpieza Corporativa',
      description: 'Edificios, oficinas y espacios de alto tráfico con protocolos certificados.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Home,
      title: 'Residenciales Premium',
      description: 'Condominios, viviendas y áreas comunes con atención personalizada.',
      color: 'from-yellow-400 to-yellow-500',
    },
    {
      icon: Zap,
      title: 'Limpieza Industrial',
      description: 'Plantas, almacenes y zonas de producción con equipos especializados.',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Droplets,
      title: 'Restauración de Pisos',
      description: 'Tratamientos especiales, sanitización y mantenimiento profundo.',
      color: 'from-blue-400 to-blue-500',
    },
    {
      icon: Gem,
      title: 'Retail & Comercios',
      description: 'Centros comerciales y espacios de alta rotación con limpieza continua.',
      color: 'from-yellow-300 to-yellow-400',
    },
    {
      icon: Users,
      title: 'Hospitalidad',
      description: 'Hoteles y eventos con estándares de presentación de alto nivel.',
      color: 'from-red-400 to-red-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
          <p className="text-xl text-gray-600">Soluciones integrales de limpieza para todo tipo de espacios</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="p-8 rounded-xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
