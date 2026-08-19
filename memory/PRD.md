# PRD — Ecuanet · Landing Page Premium (Limpieza profesional, Andorra)

## Problem statement original
Rediseñar la sección Hero (PremiumHero, id="home") de la landing de Ecuanet, empresa de limpieza profesional en Andorra, con paleta azul #002E7D dominante + amarillo #FCD116 como acento sobrio (corporativo premium, no bandera). El usuario pidió "scroll dinámicos". Como el proyecto no contenía la landing previa, el usuario autorizó reconstruir la landing completa con contenido realista y libertad artística total.

## Arquitectura
- Frontend: React 19 + Tailwind + framer-motion 11 + Lenis (smooth momentum scroll). Componentes en `/app/frontend/src/components/landing/`.
- Backend: FastAPI (`/app/backend/server.py`) — POST/GET `/api/quotes` con MongoDB (modelos BaseDocument + PyObjectId).
- Diseño: directrices en `/app/design_guidelines.json` (Arquetipo Luxury & Corporate Precision).

## Personas
- Propietarios de chalets/residencias de lujo en Andorra que buscan limpieza recurrente premium.
- Gerentes de oficinas/sedes corporativas que necesitan mantenimiento discreto fuera de horario.
- Promotores que requieren limpieza técnica fin de obra.

## Requisitos core (estáticos)
- Hero: badge "Limpieza premium en Andorra", título, subtítulo, CTA "Solicitar presupuesto" + "Ver servicios", 3 trust stats.
- Secciones: servicios, showcase, resultados, precios, proceso, testimonios, contacto, footer.
- Azul como base (>80%), amarillo solo en acentos (CTA, detalles, resplandores).

## Implementado (2026-08-19)
- Hero cinético: reveal enmascarado línea por línea (cubic-bezier 0.16,1,0.3,1), palabra "impecable" en serif itálica dorada, tarjeta fotográfica con tilt 3D (rotateX/Y con springs), foto secundaria con parallax de scroll, chip de valoración 4.9/5, palabra gigante "ECUANET" en outline con parallax, grain, glow dorado sutil, indicador de scroll animado.
- Scroll: Lenis momentum scroll global + navegación por anclas suave (offset -72px).
- Marquee editorial lento (48s) con las 7 parroquias.
- Servicios: 4 especialidades con imágenes, numeración mono, hover premium.
- Showcase: layout editorial asimétrico con parallax por frame (velocidades igualadas para evitar solapes).
- Resultados: contadores animados al entrar en viewport (12+, 450+, 98% dorado, 7/7).
- Precios: sección clara de contraste, 3 planes (Esencial €79, Premium €149 destacado, Signature €289).
- Proceso: 4 pasos numerados estilo manifiesto.
- Testimonios: 3 reseñas con estrellas.
- Contacto: formulario con calculadora de estimación en vivo + POST a `/api/quotes` + toast de confirmación (verificado E2E: solicitud guardada en MongoDB).
- Fix técnico: `whileInView` no dispara con React 19 + framer-motion 11 → hook `useInView` + animate controlado en `shared.jsx`.

## Backlog priorizado
- P0: nada pendiente.
- P1: Panel admin para ver solicitudes de presupuesto (GET /api/quotes ya existe).
- P1: Envío de email al recibir solicitud (Resend).
- P2: Antes/después interactivo con slider en Showcase.
- P2: Fotos reales del equipo/instalaciones de Ecuanet.
- P2: SEO técnico (meta OG, schema LocalBusiness) y i18n (ca/fr/en).

## Próximas tareas
1. Panel de solicitudes para el equipo Ecuanet.
2. Email automático de confirmación al cliente.
3. Slider antes/después en Showcase.
