import { scrollToId } from "@/lib/scroll";

const PARISHES = [
  "Andorra la Vella",
  "Escaldes-Engordany",
  "Sant Julià de Lòria",
  "Encamp",
  "La Massana",
  "Ordino",
  "Canillo",
];

const NAV = [
  ["Servicios", "servicios"],
  ["Showcase", "showcase"],
  ["Precios", "precios"],
  ["Proceso", "proceso"],
  ["Testimonios", "testimonios"],
  ["Contacto", "contacto"],
];

export default function Footer() {
  return (
    <footer data-testid="footer" className="border-t border-white/10 bg-navy-deep">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-12">
        <div>
          <button data-testid="footer-logo" onClick={() => scrollToId("home")} className="text-2xl font-extrabold tracking-tight text-white">
            ECUANET<span className="text-gold">.</span>
          </button>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#A3B8CC]">
            Limpieza profesional de alta gama en el Principado de Andorra. Precisión suiza,
            productos ecológicos y discreción absoluta.
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Navegación</p>
          <ul className="mt-5 flex flex-col gap-3">
            {NAV.map(([label, id]) => (
              <li key={id}>
                <button
                  data-testid={`footer-link-${id}`}
                  onClick={() => scrollToId(id)}
                  className="text-sm text-white/70 transition-colors duration-300 hover:text-gold"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Cobertura</p>
          <ul className="mt-5 grid grid-cols-1 gap-2.5">
            {PARISHES.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm text-white/70">
                <span className="h-1 w-1 rotate-45 bg-gold/70" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold">Contacto</p>
          <ul className="mt-5 flex flex-col gap-3 text-sm text-white/70">
            <li>+376 800 123</li>
            <li>hola@ecuanet.ad</li>
            <li>Andorra la Vella, Principado de Andorra</li>
            <li>Lun – Sáb · 8:00 – 19:00</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6 lg:px-12">
          <p className="font-mono text-[11px] text-white/40">© 2026 Ecuanet · Todos los derechos reservados</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">Diseñado en Andorra</p>
        </div>
      </div>
    </footer>
  );
}
