import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { EASE } from "./shared";
import { scrollToId } from "@/lib/scroll";

const LINKS = [
  ["Servicios", "servicios"],
  ["Showcase", "showcase"],
  ["Precios", "precios"],
  ["Proceso", "proceso"],
  ["Testimonios", "testimonios"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled ? "border-b border-slate-200/80 bg-white/85 shadow-[0_10px_35px_-20px_rgba(0,27,77,0.25)] backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12">
        <button
          data-testid="navbar-logo"
          onClick={() => go("home")}
          className="text-xl font-extrabold tracking-tight text-navy-deep"
        >
          ECUANET<span className="text-gold">.</span>
        </button>
        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map(([label, id]) => (
            <button
              key={id}
              data-testid={`navbar-link-${id}`}
              onClick={() => go(id)}
              className="group relative text-sm font-medium text-slate-500 transition-colors duration-300 hover:text-navy-deep"
            >
              {label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>
        <button
          data-testid="navbar-contact-button"
          onClick={() => go("contacto")}
          className="group hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-navy-deep transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-gold-dark lg:inline-flex"
        >
          Solicitar presupuesto
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
        <button
          data-testid="navbar-mobile-toggle"
          onClick={() => setOpen(!open)}
          className="text-navy-deep lg:hidden"
          aria-label="Abrir menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {LINKS.map(([label, id]) => (
                <button
                  key={id}
                  data-testid={`navbar-mobile-link-${id}`}
                  onClick={() => go(id)}
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-navy-deep"
                >
                  {label}
                </button>
              ))}
              <button
                data-testid="navbar-mobile-contact-button"
                onClick={() => go("contacto")}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-navy-deep"
              >
                Solicitar presupuesto
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
