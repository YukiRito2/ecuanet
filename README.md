# 🧹 Limpiezas Ecuador - Landing Page Premium

Landing page profesional para empresa de servicios de limpieza en Andorra, con diseño premium, animaciones suaves y soporte multilingual (Español, Catalán, Francés).

## 🚀 Características

- **Diseño Premium**: Interfaz moderna con animaciones fluidas y gradientes de marca
- **Multilingual**: Soporte completo para ES, CA, FR con selector en navbar
- **Responsive**: Totalmente optimizado para mobile, tablet y desktop
- **Performance**: Build optimizado con Vite (~113KB gzipped)
- **Animaciones**: Framer Motion para transiciones y hover effects
- **Secciones Clave**:
  - Hero con propuesta de valor
  - Servicios (corporativo, residencial, hospitality, industrial)
  - Galería de trabajos
  - Casos de éxito (antes/después)
  - Propuesta de calidad-precio
  - Proceso de trabajo
  - Testimonios
  - Contacto con WhatsApp CTA

## 🛠️ Stack Técnico

- **Frontend**: React 19 + TypeScript
- **Build**: Vite 8.2.1
- **Styling**: Tailwind CSS + Custom gradients
- **Motion**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recomendado)

## 📦 Instalación

```bash
# Instalar dependencias
npm install
```

## 🎯 Desarrollo

```bash
# Iniciar servidor local
npm run dev

# Acceder a:
# http://localhost:3000 (local)
# http://[tu-ip]:3000 (red)
```

Durante desarrollo:
- Hot Module Replacement (HMR) habilitado
- Cambios se reflejan instantáneamente
- Console muestra cualquier error en tiempo real

## 📦 Producción

```bash
# Compilar para producción
npm run build

# Ver compilación localmente
npm run preview
```

Output en carpeta `dist/`:
- `index.html` (0.52 KB)
- CSS bundled (~7.7 KB gzipped)
- JS bundled (~113 KB gzipped)

## 🌍 Desplegar en Vercel

### Opción 1: GitHub + Vercel (Recomendado)

```bash
# 1. Crear repo en GitHub
# github.com/new → limpiezas-ecuador

# 2. Conectar local a GitHub
git remote add origin https://github.com/[usuario]/limpiezas-ecuador.git
git branch -M main
git push -u origin main

# 3. Ir a vercel.com
# → New Project
# → Import Git Repository
# → Seleccionar limpiezas-ecuador
# → Deploy (Vercel auto-detecta Vite)
```

### Opción 2: Vercel CLI

```bash
npm install -g vercel
vercel
# Sigue las instrucciones interactivas
```

**Resultado**: URL tipo `https://limpiezas-ecuador.vercel.app`

## 🎨 Personalización

### Cambiar Colores de Marca
- Ecuador flag: `#FCD116` (amarillo), `#002E7D` (azul), `#CE1126` (rojo)

### Agregar Contenido
1. **Servicios**: `src/components/PremiumServices.tsx`
2. **Testimonios**: `src/components/Testimonials.tsx`
3. **Contacto**: `src/components/Contact.tsx` (cambiar WhatsApp number)

### Traducir Contenido
Todos los textos en `src/App.tsx` en objeto `translations`:
```typescript
export const translations = {
  es: { ... },
  ca: { ... },
  fr: { ... },
}
```

## 📱 Navegación

| Sección | URL |
|---------|-----|
| Inicio | `#home` |
| Servicios | `#services` |
| Trabajos | `#works` |
| Diferencias | `#differentiators` |
| Contacto | `#contact` |

## ✅ Status

- [x] Desarrollo con Vite funcionando
- [x] Build sin errores
- [x] Multilingual implementado
- [x] Responsive verificado
- [x] Animaciones suaves
- [ ] GitHub push
- [ ] Vercel deployment

## 🔗 Links

- [Vercel Docs](https://vercel.com/docs)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)

---

**Última actualización**: Agosto 2026
**Version**: 1.0.0
**Status**: ✅ Listo para producción
