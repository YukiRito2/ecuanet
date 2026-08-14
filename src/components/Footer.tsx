import { motion } from 'framer-motion';
import { Mail, Music2, Phone } from 'lucide-react';

const socials = [
  { label: 'WhatsApp', href: 'https://wa.me/593999999999', icon: Phone },
  { label: 'TikTok', href: 'https://tiktok.com/@limpieecu', icon: Music2 },
  { label: 'Email', href: 'mailto:contacto@limpiezasecuador.com', icon: Mail },
] as const;

export default function Footer() {
  return (
    <footer className="bg-slate-900 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-10 md:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#FCD116] via-[#002E7D] to-[#CE1126]">
                <span className="text-sm font-bold text-white">LC</span>
              </div>
              <span className="text-lg font-bold">Limpiezas Ecuador</span>
            </div>
            <p className="text-sm text-slate-400">
              Servicios profesionales de limpieza en Andorra con los colores y valores de Ecuador.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
            <h3 className="mb-4 text-lg font-bold">Servicios</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#services" className="transition-colors hover:text-[#FCD116]">Limpieza corporativa</a></li>
              <li><a href="#services" className="transition-colors hover:text-[#FCD116]">Residencial</a></li>
              <li><a href="#services" className="transition-colors hover:text-[#FCD116]">Industrial</a></li>
              <li><a href="#services" className="transition-colors hover:text-[#FCD116]">Especializado</a></li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }}>
            <h3 className="mb-4 text-lg font-bold">Empresa</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#home" className="transition-colors hover:text-[#FCD116]">Inicio</a></li>
              <li><a href="#differentiators" className="transition-colors hover:text-[#FCD116]">Sobre nosotros</a></li>
              <li><a href="#process" className="transition-colors hover:text-[#FCD116]">Proceso</a></li>
              <li><a href="#contact" className="transition-colors hover:text-[#FCD116]">Contacto</a></li>
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.24 }}>
            <h3 className="mb-4 text-lg font-bold">Conecta con nosotros</h3>
            <div className="mb-6 flex gap-3">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-300 transition-colors hover:border-[#FCD116] hover:text-[#FCD116]"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-slate-400"><span className="font-semibold text-slate-300">WhatsApp:</span> +593 9 9999 9999</p>
          </motion.div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
            <p>© 2026 Limpiezas Ecuador. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-[#FCD116]">Privacidad</a>
              <a href="#" className="transition-colors hover:text-[#FCD116]">Términos</a>
              <a href="#" className="transition-colors hover:text-[#FCD116]">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
