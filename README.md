# Nébula Estudio

Sitio de Alejo Sánchez. React + Vite sobre el boilerplate de 4Geeks, con un terreno 3D en Three.js,
animaciones de scroll con GSAP y scroll suave con Lenis.

## Correr el proyecto

```bash
npm install
npm run start     # http://localhost:3000
npm run build     # genera /dist para Vercel
```

## Dónde editar cada cosa

| Qué quieres cambiar | Archivo |
| --- | --- |
| Proyectos, cifras, stack, fases de COMPASS, contacto | `src/data/proyectos.js` |
| Entradas de la bitácora (mini blog) | `src/data/bitacora.js` |
| Colores y tipografías | `src/index.css` (bloque `:root`) |
| Estilos de cada sección | `src/styles/secciones.css` |
| Pósters animados de los proyectos | `src/styles/posters.css` y `src/components/Poster.jsx` |
| Terreno 3D (forma, colores de noche y amanecer) | `src/components/Terrain.jsx` |
| Estado global (preloader, sellos de la demo) | `src/store.js` |

## Capturas reales en los proyectos

Guarda la imagen en `public/proyectos/` y pon la ruta en el campo `imagen` del proyecto,
por ejemplo `imagen: "/proyectos/orbit.jpg"`. Si `imagen` es `null` se muestra el póster animado.

## Nueva entrada de bitácora

Agrega un objeto al inicio del arreglo en `src/data/bitacora.js`. La ruta `/bitacora/tu-slug` se crea sola.

## Atributos de animación

- `data-split`: el titular entra palabra por palabra.
- `data-sube`: el bloque sube y aparece al entrar en pantalla.
- `data-cuenta="60"`: el número cuenta desde cero.
- `data-cursor="Texto"`: el cursor crece y muestra esa palabra.
- `data-tramo="Nombre"`: nombre de la sección en el altímetro lateral.
- `data-terreno`: sección transparente que deja ver el terreno 3D.
