# 🚀 Deployment Guide - Limpiezas Ecuador

## GitHub Setup (1 minuto)

### 1. Crear repositorio en GitHub
Ve a https://github.com/new y crea un nuevo repositorio llamado `limpiezas-ecuador`
- **Repository name**: `limpiezas-ecuador`
- **Description**: Premium cleaning services landing page
- **Public** (para que Vercel lo pueda acceder)
- **NO inicialices con README** (ya tenemos uno)

### 2. Agregar remoto y hacer push
Copia y ejecuta estos comandos en PowerShell:

```powershell
cd "c:\Users\marpe\ECUADOR MARKET\limpiezas-ecuador"
git remote add origin https://github.com/[TU_USERNAME]/limpiezas-ecuador.git
git branch -M main
git push -u origin main
```

**Reemplaza `[TU_USERNAME]` con tu usuario de GitHub**

---

## Vercel Deployment (2 minutos)

### 1. Ir a Vercel
Ve a https://vercel.com y haz login con tu cuenta (o crea una con GitHub)

### 2. Importar proyecto
- Clic en "New Project"
- Selecciona "Import Git Repository"
- Busca `limpiezas-ecuador` y selecciona
- Haz clic en "Import"

### 3. Configuración automática
Vercel detectará automáticamente:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

No necesitas cambiar nada, solo haz clic en **Deploy** ✓

### 4. Esperar
En 2-3 minutos tu sitio estará en vivo con una URL como:
`https://limpiezas-ecuador.vercel.app`

---

## Scripts disponibles

```bash
npm run dev      # Desarrollo local (http://localhost:5173)
npm run build    # Compilar para producción
npm run preview  # Ver compilación local
```

---

## ✅ Checklist Final

- [ ] Repositorio creado en GitHub
- [ ] Remoto añadido y push completado
- [ ] Proyecto importado en Vercel
- [ ] Deploy completado
- [ ] Dominio personalizado configurado (opcional en Vercel)

---

## Soporte

Para cambios futuros:
1. Edita los archivos localmente
2. `git add .` → `git commit -m "descripción"` → `git push`
3. Vercel redesplegará automáticamente

¡Listo! 🎉
