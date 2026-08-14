'use client';

import { motion } from 'framer-motion';
import { Globe, MessageCircle, Phone, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 via-blue-600 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LC</span>
              </div>
              <span className="font-bold text-lg">Limpiezas Ecuador</span>
            </div>
            <p className="text-gray-400 text-sm">
              Servicios profesionales de limpieza en Andorra con los colores y valores de Ecuador.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-lg mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#services" className="hover:text-yellow-400 transition-colors">Limpieza Corporativa</a></li>
              <li><a href="#services" className="hover:text-yellow-400 transition-colors">Residencial</a></li>
              <li><a href="#services" className="hover:text-yellow-400 transition-colors">Industrial</a></li>
              <li><a href="#services" className="hover:text-yellow-400 transition-colors">Especializado</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-bold text-lg mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#home" className="hover:text-yellow-400 transition-colors">Inicio</a></li>
              <li><a href="#differentiators" className="hover:text-yellow-400 transition-colors">Sobre Nosotros</a></li>
              <li><a href="#process" className="hover:text-yellow-400 transition-colors">Proceso</a></li>
              <li><a href="#contact" className="hover:text-yellow-400 transition-colors">Contacto</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-lg mb-4">Conecta Con Nosotros</h3>
            <div className="flex gap-4 mb-6">
              <motion.a href="https://tiktok.com/@limpieecu" target="_blank" whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.95 }} className="p-2 bg-gray-800 hover:bg-yellow-400 rounded-lg transition-colors">
                <Globe size={20} className="text-gray-900" />
              </motion.a>
              <motion.a href="https://tiktok.com/@limpieecu" target="_blank" whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.95 }} className="p-2 bg-gray-800 hover:bg-yellow-400 rounded-lg transition-colors">
                <MessageCircle size={20} className="text-gray-900" />
              </motion.a>
              <motion.a href="https://wa.me/593999999999" target="_blank" whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.95 }} className="p-2 bg-gray-800 hover:bg-yellow-400 rounded-lg transition-colors">
                <Phone size={20} className="text-gray-900" />
              </motion.a>
              <motion.a href="https://linkedin.com" target="_blank" whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.95 }} className="p-2 bg-gray-800 hover:bg-yellow-400 rounded-lg transition-colors">
                <Sparkles size={20} className="text-gray-900" />
              </motion.a>
            </div>
            <p className="text-sm text-gray-400"><span className="font-semibold">WhatsApp:</span> +593 9 9999 9999</p>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© 2026 Limpiezas Ecuador. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-yellow-400 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Términos</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
