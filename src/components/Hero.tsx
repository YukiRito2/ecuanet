'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section id="home" className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-200/30 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-red-200/30 to-transparent rounded-full blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles size={16} />
                Limpieza profesional en Andorra
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Tu espacio,{' '}
                <span className="bg-gradient-to-r from-yellow-400 via-blue-600 to-red-600 bg-clip-text text-transparent">
                  impecable
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Servicios de limpieza corporativa, residencial e industrial con los más altos estándares de calidad. Confían en nosotros las mejores empresas.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="https://wa.me/593999999999"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-lg hover:shadow-xl transition-shadow"
              >
                Solicitar presupuesto
                <ArrowRight size={20} />
              </motion.a>

              <motion.a
                href="https://tiktok.com/@limpieecu"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Ver trabajos
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-8 text-center sm:text-left">
              <div>
                <p className="text-3xl font-bold text-gray-900">50+</p>
                <p className="text-gray-600 text-sm">Empresas activas</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">1000+</p>
                <p className="text-gray-600 text-sm">m² limpios</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">15+</p>
                <p className="text-gray-600 text-sm">Años de experiencia</p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative h-96 md:h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 via-blue-500 to-red-500 rounded-2xl opacity-20 blur-2xl" />
            <div className="relative h-full bg-gradient-to-br from-blue-100 to-yellow-50 rounded-2xl flex items-center justify-center p-8 border border-gray-200">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-center"
              >
                <div className="text-6xl mb-4">✨</div>
                <p className="text-gray-700 font-semibold text-lg">Limpieza profesional</p>
                <p className="text-gray-600 text-sm mt-2">Con los colores de Ecuador</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
