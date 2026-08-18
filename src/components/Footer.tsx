import { motion } from 'framer-motion';
import { Mail, Music2, Phone } from 'lucide-react';
import logo from '../assets/ecuanet-logo.png';

interface FooterProps {
  lang: 'es' | 'ca' | 'fr';
  t: {
    tagline: string;
    servicesTitle: string;
    serviceLinks: readonly string[];
    companyTitle: string;
    companyLinks: readonly string[];
    connectTitle: string;
    copyright: string;
    privacy: string;
    terms: string;
    cookies: string;
  };
}

const socials = [
  { label: 'WhatsApp', href: 'https://wa.me/593999999999', icon: Phone },
  { label: 'TikTok', href: 'https://tiktok.com/@limpieecu', icon: Music2 },
  { label: 'Email', href: 'mailto:contacto@ecuanet.com', icon: Mail },
] as const;

const companyAnchors = ['#home', '#process', '#contact'];

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-slate-900 px-4 py-16 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-10 md:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="mb-4 flex items-center gap-2">
              <img src={logo} alt="Ecuanet" className="h-10 w-10 object-contain" />
              <span className="text-lg font-bold">Ecuanet</span>
            </div>
            <p className="text-sm text-slate-400">{t.tagline}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 }}>
            <h3 className="mb-4 text-lg font-bold">{t.servicesTitle}</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {t.serviceLinks.map((label) => (
                <li key={label}><a href="#services" className="transition-colors hover:text-[#FCD116]">{label}</a></li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.16 }}>
            <h3 className="mb-4 text-lg font-bold">{t.companyTitle}</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {t.companyLinks.map((label, i) => (
                <li key={label}><a href={companyAnchors[i]} className="transition-colors hover:text-[#FCD116]">{label}</a></li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.24 }}>
            <h3 className="mb-4 text-lg font-bold">{t.connectTitle}</h3>
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
            <p>{t.copyright}</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-[#FCD116]">{t.privacy}</a>
              <a href="#" className="transition-colors hover:text-[#FCD116]">{t.terms}</a>
              <a href="#" className="transition-colors hover:text-[#FCD116]">{t.cookies}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
