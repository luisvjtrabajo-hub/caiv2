# CAI · Cruzada Apologética Itinerante

Diseño web funcional basado en el MD v1 y los escudos del Excel adjunto. Construido con Next.js, React y TypeScript; cartografía con amCharts 5 instalada en el proyecto.

## Acceso de prueba

La página principal abre la portada pública, inspirada en la web de referencia. **Iniciar sesión** lleva a `/ingresar`, con usuario y contraseña propios de CAI y sin requerir ChatGPT. Tras ingresar se abre `/miembros`, directamente en el globo 3D mundial de apologetas. Para revisar la administración:

- Usuario: `admin`
- Contraseña de demostración: `CaiDemo2026!`

La sesión de prueba se conserva en la pestaña durante un máximo de ocho horas y se elimina con **Cerrar sesión**. Las credenciales son públicas y el control es solo una simulación en el navegador, sin backend ni protección de datos reales. Toda la información es ficticia.

## Ejecutar el proyecto

Desde la raíz del repositorio:

```powershell
npm ci
npm run dev
```

Vista local: http://localhost:3000/

```powershell
npm run check
npm run build
npm start
```

Se requiere Node.js 22.13 o posterior. Con el servidor iniciado, `node scripts/check-public-http.mjs` comprueba las tres rutas y las cinco imágenes de referencia.

## Vercel

Importa este repositorio en Vercel y selecciona la raíz del repositorio como **Root Directory**. `vercel.json` define Next.js como framework y `npm run build` como comando de compilación. Usa Node.js 22.x. Esta demostración no requiere variables de entorno.

Se conservan los archivos del alojamiento anterior en Sites/Cloudflare. Sus comandos están disponibles como `dev:sites`, `build:sites` y `start:sites`; el flujo principal utiliza Next.js para Vercel. Los archivos del worker y de Vite quedan fuera de la comprobación TypeScript de Next.js porque corresponden a ese otro entorno.

## Documentación

Los documentos originales están incluidos en [docs/requisitos](./docs/requisitos/): el MD vigente y el Excel de rangos y misiones.

Consulta [DISENO-Y-ALCANCE.md](./DISENO-Y-ALCANCE.md) para las fuentes, reglas implementadas, verificación, imagen generada y trabajo pendiente antes de producción. Esta entrega es una demostración con datos ficticios: no se deben ingresar datos personales reales ni utilizar la administración como control de acceso real.

El catálogo vigente está en `lib/catalog.json`; se genera con `node scripts/import-reference.mjs` desde el MD, que prevalece sobre el Excel. Los escudos originales están en `public/ranks/`. Las dos fotografías de la comunidad están en `public/images/reference/` y se muestran completas.
