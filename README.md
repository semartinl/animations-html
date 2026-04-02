# Animaciones HTML (React + Vite)
Catálogo interactivo de animaciones CSS pensado para componentes de interfaz, empezando por dropdowns. Permite:
- Previsualizar animaciones sobre un dropdown real.
- Filtrar por tipos (Entrada, Énfasis, Moderno, etc.).
- Copiar snippets de CSS/HTML en un clic.
- Usar un playground con editor para componer y previsualizar una animación propia.
- Preparado para SPA y despliegue en Vercel.

## Demo local rápida
- Página principal: listado de animaciones de dropdowns con vista previa integrada.
- Página de creación: playground para editar CSS y publicar una nueva animación.

## Requisitos
- Node.js ≥ 18
- Git (para clonar)

## Clonar y ejecutar en local (Windows)
```bash
# 1) Clona el repositorio
git clone URL_DEL_REPO
cd animaciones-html

# 2) Instala dependencias
npm install

# 3) Arranca el servidor de desarrollo
npm run dev
# Abre http://localhost:5173

# 4) (Opcional) Build de producción y preview local
npm run build
npm run preview