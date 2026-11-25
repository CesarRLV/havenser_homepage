# Sitio web de Havenser

Sitio de marketing de **Havenser** (consultora de ingeniería, datos e IA), construido con **[Astro](https://docs.astro.build) 6** + **Tailwind CSS v4**. Es un sitio 100% estático (`astro build` genera HTML real por página, sin servidor).

Esta guía está pensada para el equipo de desarrollo que le dé mantenimiento al sitio.

## Cómo correr el proyecto

```sh
npm install
npm run dev      # http://localhost:4321, con recarga en caliente
npm run build    # genera ./dist (lo que se despliega)
npm run preview  # sirve ./dist localmente, para probar el build de producción
```

## Estructura de carpetas (lo importante)

```
src/
  data/                     ← "bases de datos" del sitio en TypeScript
    cursos.ts               ← catálogo de cursos (ver abajo)
    areasEspecialidad.ts    ← contenido de las páginas /tech/* y /ciencia/*
  components/
    NavBar.astro            ← menú principal, generado en parte desde src/data/cursos.ts
    Servicios.astro         ← sección "Portafolio de Soluciones" + carrusel circular
    QuienesSomos.astro      ← misión/visión/valores
    PruebaSocial.astro      ← "cómo trabajamos" + diferenciadores
    ContactoForm.astro      ← formulario de contacto multi-step (wizard)
    Footer.astro
    Portadas/PortadaLogo.astro   ← Hero (portada) — es una de las 2 únicas zonas oscuras del sitio
    Portadas/PortadaImagen.astro ← separador de imagen a pantalla completa (banners entre secciones)
    animaciones/            ← piezas SVG animadas (animejs), pensadas para fondo OSCURO
    cursos/
      PlantillaCurso.astro  ← plantilla única reutilizable para cualquier curso
      AvisoEnRevision.astro ← banner "aún estamos trabajando en este curso"
    tech/
      PlantillaArea.astro   ← plantilla única reutilizable para las páginas de Tech/Ciencia
  pages/
    index.astro             ← home (arma las secciones de arriba en orden)
    cursos.astro            ← catálogo de cursos, agrupado por eje temático
    cursos/[id].astro       ← ruta dinámica: una página real por curso (getStaticPaths)
    contactanos.astro       ← página de contacto dedicada (reutiliza ContactoForm)
    tech/{data,dev,virtual}.astro
    ciencia/{biotech,logistica,innova}.astro
    privacidad.astro, TerminosCondiciones.astro
  layouts/
    Layout.astro            ← <html>/<head>/<Footer> — lo usan TODAS las páginas
    General.astro           ← <main> que envuelve las secciones de la home
  styles/global.css         ← tokens de color (:root) y resets — se importa desde Layout.astro
```

## Sistema de colores (tema claro + 2 zonas oscuras)

Los tokens viven en `src/styles/global.css` (¡no en `General.astro`! — ese archivo solo lo usa la home, así que un token definido ahí no llegaría a `/cursos`, `/contactanos`, etc.). Si necesitas un color nuevo, agrégalo ahí.

**Tema claro (úsalo en casi todo lo nuevo que construyas):**

| Token | Valor | Uso |
|---|---|---|
| `--bg-light` | `#f4f5f8` | Fondo de página/sección |
| `--surface-white` | `#ffffff` | Fondo de tarjetas |
| `--text-heading` | `#10192d` | Títulos |
| `--text-body` | `#3e4b61` | Texto de párrafo |
| `--border-soft` | `#d8dce3` | Bordes sutiles |
| `--gold` / `--gold-hover` | `#c9a126` / `#e0b62c` | Acento de marca (CTAs, detalles) |

**Tema oscuro (reservado a propósito solo para el Hero y el Footer — el "ancla de marca" oscura, ~20% del sitio):**

`--bg-main` (`#111b2c`), `--bg-surface` (`#192232`), `--accent` (`#3e4b61`), `--text-muted` (`#8d94a1`), `--text-light` (`#e6e6f0`).

No mezcles los dos sistemas en una sección nueva: si la sección es clara, usa solo los tokens claros; si es un panel oscuro deliberado (como los de "Misión/Visión" dentro de Quiénes Somos), usa los oscuros.

Los componentes en `src/components/animaciones/` (`DoctoralExpertiseViz`, `NatureTechBrain`, `B2BEfficiencyFeature`) están diseñados para **fondo oscuro** (fondos de nodo `#0f172a`, trazos brillantes). Úsalos solo en el Hero o en paneles oscuros — se ven mal sobre `--bg-light`. `LogoParticulas.astro` es al revés: está pensado para **fondo claro** (colorea las partículas con los tonos reales del logo, que son oscuros).

## Cómo agregar / editar un curso

Todo el sistema de cursos (navbar, `/cursos`, `/cursos/[id]`) lee de **un solo archivo**: [`src/data/cursos.ts`](src/data/cursos.ts). Nunca crees una página nueva para un curso.

Para agregar un curso, añade un objeto a `CATALOGO_BASE` con el mismo formato que los demás (`eje`, `titulo`, `descripcion`, `estatus`, `industria`, `audiencia`, `modalidades`, `nivel`, `valorDiferenciador` opcional). El `id` y la `variante` visual se generan solos.

- `estatus: "publicado"` → se muestra normal.
- `estatus: "en_revision"` → se muestra con el aviso "Aún estamos trabajando en este curso...". Úsalo para cursos que quieres empezar a promocionar aunque no estén 100% listos.
- Si quieres que un curso **no aparezca en el sitio**, simplemente bórralo (o comenta) su objeto en `CATALOGO_BASE` — no existe un estatus "oculto", el catálogo original del Excel tenía "No mostrar" y esos cursos directamente no están en este archivo.

La imagen de cada curso se elige automáticamente según su `eje` (ver `getImagenCurso` al final de `cursos.ts`). Si consigues fotos propias por curso, agrega un campo `imagen` al curso y úsalo en `PlantillaCurso.astro` en vez de `getImagenCurso`.

## Cómo agregar una subpágina de área (Tech / Ciencia)

Mismo patrón que los cursos: el contenido vive en [`src/data/areasEspecialidad.ts`](src/data/areasEspecialidad.ts), y `src/components/tech/PlantillaArea.astro` es la única plantilla. Cada página en `src/pages/tech/` o `src/pages/ciencia/` son ~8 líneas: importan `AREAS`, toman su entrada y se la pasan a `PlantillaArea`. Para una página nueva:

1. Agrega una entrada a `AREAS` en `areasEspecialidad.ts`.
2. Crea el archivo de página (por ejemplo `src/pages/tech/nueva-area.astro`) copiando cualquiera de los existentes y cambiando la clave del objeto.
3. Agrega el link en `src/components/NavBar.astro` (dentro del submenú de "Tech" o "Ciencia & logística").

## NavBar

`src/components/NavBar.astro` define un arreglo `menus` con hasta **2 niveles** de submenú (el componente no soporta un 3er nivel). El menú "Cursos" se genera automáticamente desde `src/data/cursos.ts` agrupado por eje — no lo edites a mano.

El menú "Accede" (Portal de Cursos / Portal de Clientes) está resuelto como un caso especial en el render (busca `menu.title === "Accede"`). El link de "Portal de Clientes" es un placeholder (`href="#"`) hasta que exista esa URL real — solo hay que reemplazarlo en el arreglo `menus`.

## Formulario de contacto (wizard)

`ContactoForm.astro` es un formulario de 4 pasos que vive en un solo `<form>`; el JS solo muestra/oculta el paso correspondiente y valida con `checkValidity()` antes de avanzar. Se reutiliza igual en la home (`#contacto`) y en `/contactanos`.

**Importante:** el cambio de paso (mostrar/ocultar) es siempre **síncrono** — nunca depende de que termine una animación. La animación de `motion` es solo un efecto visual de acompañamiento. Si en algún momento agregas más pasos o cambias la transición, mantén ese orden (primero cambiar el estado, después animar), porque una pestaña en segundo plano puede pausar animaciones indefinidamente y dejaría el formulario "atorado" si la lógica dependiera de ellas.

El envío real pega a un endpoint de AWS (`ContactoForm.astro`, variable `endpoint`) e incluye un campo honeypot (`empresa_web`) anti-spam: si ese campo llega lleno, se descarta el envío silenciosamente.

## Animaciones: `motion` vs `animejs`

Ambas librerías ya están instaladas (`package.json`). Para no mezclar estilos sin necesidad:

- **`motion`** (import `{ animate, inView }` de `'motion'`): úsala para animaciones ligadas a interacción del usuario o scroll (revelar tarjetas al hacer scroll, transiciones del wizard, el carrusel circular). Es la que se usó en todo el código nuevo.
- **`animejs`**: ya estaba en uso en los componentes de `src/components/animaciones/` (SVG del Hero y de Quiénes Somos) desde antes de este rediseño. Si tocas esos componentes, sigue usando `animejs` ahí para no mezclar dos motores en el mismo archivo.

## Pendientes conocidos

- **Portal de Clientes**: falta la URL real (`NavBar.astro`, entrada "Accede").
- **Fotografía real**: varias secciones usan imágenes de `/public` reutilizadas entre distintos usos (marcado con comentarios `NOTA:` en el código). Sustitúyelas cuando haya fotografía propia.
- **Prueba social**: `PruebaSocial.astro` no tiene métricas ni testimonios a propósito (ver comentario al inicio del archivo) — Havenser es una empresa nueva y no hay cifras/testimonios reales que mostrar todavía. Cuando existan casos de éxito autorizados, ese es el lugar para agregarlos.
- **IDs de curso**: los ids en `src/data/cursos.ts` son ficticios (secuenciales desde `237689`). Si en el futuro se conecta un LMS/portal de cursos real, reemplázalos ahí — el resto del sitio los referencia solo por ese campo `id`.
