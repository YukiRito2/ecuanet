# Limpiezas Ecuador — guía del proyecto

Landing page en **React 19 + Vite + TypeScript + Tailwind CSS 4**. No usa Next.js: no hay carpeta `app/`, no hay SSR, no hay `next.config`.

## Comandos

- `npm run dev` — servidor de desarrollo (puerto 3000)
- `npm run build` — build de producción (`vite build`)
- `npm run preview` — sirve la build de `dist/`
- `npm run lint` — ESLint (flat config en `eslint.config.mjs`)

## Estructura

- `src/App.tsx` — componente raíz, ensambla las secciones de la página
- `src/translations.ts` — textos en ES/CA/FR y el tipo `Lang`
- `src/components/` — una sección por archivo (Navbar, PremiumHero, PremiumServices, PremiumShowcase, ResultsSection, PriceValue, Differentiators, Process, Testimonials, Contact, ChatBot, Footer)
