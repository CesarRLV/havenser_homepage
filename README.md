# Sitio web de Havenser

Sitio de marketing de **Havenser** (consultora de ingeniería, datos e IA), construido con **[Astro](https://docs.astro.build) 6** + **Tailwind CSS v4** + **React 19 en islas** (solo donde hay interactividad), **GSAP + ScrollTrigger** para todas las animaciones y **React Three Fiber** para el 3D de la portada. Es un sitio 100% estático (`astro build` genera HTML real por página, sin servidor), desplegado en **AWS Amplify** con el dominio en **Cloudflare**.

Esta guía está pensada para el equipo de desarrollo que le dé mantenimiento al sitio.

## Cómo correr el proyecto

```sh
npm install
npm run dev      # http://localhost:4321, con recarga en caliente
npm run build    # genera ./dist (lo que se despliega)
npm run preview  # sirve ./dist localmente, para probar el build de producción
npx astro check  # revisión de tipos (debe dar 0 errores)
```

> **Versiones:** `@astrojs/react` debe ser la línea **6.x** mientras el proyecto use Astro 6 (la 7.x es para Astro 7 y trae vite 8, que rompe el dev server con el error "Missing field `moduleType`").

## Estructura de carpetas (lo importante)

```
src/
  data/                     ← "bases de datos" del sitio en TypeScript
    sitio.ts                ← teléfono/WhatsApp, correo, redes, URL. ÚNICO lugar para cambiarlos
    marketing.ts            ← paquetes, complementos, IVA y reglas de marketing digital
    soluciones.ts           ← textos, FAQ y casos típicos de /soluciones/* + demo del chatbot
    cursos.ts               ← catálogo de cursos (ver abajo)
    areasEspecialidad.ts    ← contenido de las páginas /tech/* y /ciencia/*
  scripts/scroll.ts         ← animaciones por scroll de TODO el sitio (data-animar, data-stagger, data-parallax)
  components/
    hero/                   ← 3D de la portada (isla React): Hero3D.tsx decide si/cuándo montar, EscenaNucleo.tsx es la escena
    soluciones/             ← PlantillaSolucion.astro + islas: CalculadoraMarketing, CalculadoraAhorro, DemoChatbot
    SolucionesDestacadas.astro ← home: tarjetas de las 3 soluciones
    ProcesoScroll.astro     ← home: sección fijada (pin) con pasos que avanzan con el scroll
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
    soluciones/{marketing-digital,automatizacion-ia,chatbot-whatsapp}.astro
    cursos.astro            ← catálogo de cursos, agrupado por eje temático
    cursos/[id].astro       ← ruta dinámica: una página real por curso (getStaticPaths)
    contactanos.astro       ← página de contacto dedicada (reutiliza ContactoForm)
    tech/{data,dev,virtual}.astro
    ciencia/{biotech,logistica,innova}.astro
    privacidad.astro, TerminosCondiciones.astro
  layouts/
    Layout.astro            ← <html>/<head> con SEO (title, description, canonical, OG, JSON-LD) + Footer — lo usan TODAS las páginas
    General.astro           ← <main> que envuelve las secciones de la home
  styles/global.css         ← tokens de color (:root), resets (@layer base), botones y estilos de calculadoras
public/
  robots.txt, llms.txt      ← rastreadores y resumen para asistentes de IA (AEO)
customHttp.yml              ← cabeceras de AWS Amplify (caché inmutable de /_astro/)
```

## Sistema de colores (tema claro + zonas oscuras de marca)

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

**Tema oscuro (zonas de marca: Hero 3D, Footer, sección de agentes IA, calculadoras y demo del chatbot):** usa la clase `.zona-oscura` (fondo degradado `#10192d`); dentro de ella `.eyebrow` cambia sola a dorado. Variables:

`--bg-main` (`#111b2c`), `--bg-surface` (`#192232`), `--accent` (`#3e4b61`), `--text-muted` (`#8d94a1`), `--text-light` (`#e6e6f0`).

No mezcles los dos sistemas en una sección nueva: si la sección es clara, usa solo los tokens claros; si es un panel oscuro deliberado (como los de "Misión/Visión" dentro de Quiénes Somos), usa los oscuros.

Los componentes en `src/components/animaciones/` (`NatureTechBrain`, `B2BEfficiencyFeature`) están diseñados para **fondo oscuro** (fondos de nodo `#0f172a`, trazos brillantes). Úsalos solo en el Hero o en paneles oscuros — se ven mal sobre `--bg-light`. `LogoParticulas.astro` es al revés: está pensado para **fondo claro** (colorea las partículas con los tonos reales del logo, que son oscuros).

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

`src/components/NavBar.astro` define un arreglo `menus` con hasta **2 niveles** de submenú (el componente no soporta un 3er nivel). El menú "Cursos" se genera automáticamente desde `src/data/cursos.ts` agrupado por eje, y "Soluciones" desde `src/data/soluciones.ts` — no los edites a mano. Con 6 ítems de primer nivel el menú de escritorio aparece desde `xl` (1280px); si agregas otro, revisa que no se parta en 2 líneas.

El menú "Accede" (Portal de Cursos / Portal de Clientes) está resuelto como un caso especial en el render (busca `menu.title === "Accede"`). El link de "Portal de Clientes" es un placeholder (`href="#"`) hasta que exista esa URL real — solo hay que reemplazarlo en el arreglo `menus`.

## Formulario de contacto (wizard)

`ContactoForm.astro` es un formulario de 4 pasos que vive en un solo `<form>`; el JS solo muestra/oculta el paso correspondiente y valida con `checkValidity()` antes de avanzar. Se reutiliza igual en la home (`#contacto`) y en `/contactanos`.

**Importante:** el cambio de paso (mostrar/ocultar) es siempre **síncrono** — nunca depende de que termine una animación. La animación (GSAP) es solo un efecto visual de acompañamiento. Si en algún momento agregas más pasos o cambias la transición, mantén ese orden (primero cambiar el estado, después animar), porque una pestaña en segundo plano puede pausar animaciones indefinidamente y dejaría el formulario "atorado" si la lógica dependiera de ellas.

El envío real pega a un endpoint de AWS (`ContactoForm.astro`, variable `endpoint`) e incluye un campo honeypot (`empresa_web`) anti-spam: si ese campo llega lleno, se descarta el envío silenciosamente.

## Soluciones nuevas (marketing, agentes IA, chatbot)

Las 3 páginas de `/soluciones/*` usan `components/soluciones/PlantillaSolucion.astro` (hero, beneficios, proceso, FAQ, CTA final) y publican JSON-LD `Service`, `FAQPage` y `BreadcrumbList`. Lo propio de cada página va como `<slot />`.

- **Cambiar un precio o un complemento de marketing:** edita `src/data/marketing.ts` (tabla comparativa, calculadora y JSON-LD `OfferCatalog` salen de ahí). Las FAQ de `soluciones.ts` y `public/llms.txt` mencionan precios en texto: actualízalos también.
- **Reglas de complementos:** `disponible(paquete)` dice desde qué paquete se puede contratar; `incluido(paquete)` marca los que ya vienen incluidos (se muestran como "Incluido" y no se cobran).
- **Calculadoras → contacto:** "Prefiero que me contacten" guarda solo la configuración (paquete, complementos u horas) en `sessionStorage` (`CLAVE_PRECARGA_CONTACTO` en `sitio.ts`) y `ContactoForm.astro` la precarga una sola vez. Nunca se guardan datos personales.
- **Demo del chatbot:** conversaciones simuladas en `DEMO_CHATBOT` (`soluciones.ts`). No usa IA real.
- **Regla de contenido:** los "casos típicos" son ilustrativos; no inventar clientes, testimonios ni métricas.

## Animaciones: solo GSAP

Todo el sitio anima con **GSAP** (`gsap`, `gsap/ScrollTrigger`, `gsap/MotionPathPlugin`) y, dentro de React, con `useGSAP` de `@gsap/react` (limpia solo al desmontar). Se eliminaron `motion`, `animejs` y Alpine.

- **Revelar contenido al hacer scroll:** no escribas un `<script>`; agrega un atributo y `src/scripts/scroll.ts` se encarga:
  - `data-animar="fade-up|fade-left|fade-right|zoom"` en un elemento,
  - `data-stagger` en un contenedor (anima sus hijos en cascada),
  - `data-parallax="-12"` (desplazamiento en `yPercent`, solo transform).
- **Accesibilidad:** todo va dentro de `gsap.matchMedia()` con `prefers-reduced-motion: no-preference`; con reduced-motion el contenido queda visible y estático. Sin JS también queda visible (el estado oculto lo pone el script, no el CSS).
- **Animaciones en bucle** (SVG de Quiénes Somos, demo del chatbot) se pausan con ScrollTrigger cuando salen de pantalla.
- **Nunca** dependas de que termine una animación para cambiar estado (ver wizard).
- Si agregas una sección con `pin`, créala en orden de aparición en la página (ScrollTrigger refresca en orden de creación).

## Hero 3D (React Three Fiber)

`PortadaLogo.astro` pinta el texto en HTML (LCP inmediato) y monta `Hero3D` con `client:idle`. `Hero3D.tsx`:

1. Muestra un **póster SVG estático** (también es el respaldo).
2. Solo monta el 3D si hay WebGL, no hay `prefers-reduced-motion`, no hay ahorro de datos y la red no es 2G/3G.
3. Descarga la escena (`EscenaNucleo.tsx`, three.js ~250 KB gzip) con `React.lazy`, así que nunca bloquea el texto ni los botones.
4. Detiene el render (`frameloop="never"`) cuando el hero sale de pantalla; en móvil usa menos nodos y menor resolución.
5. Un ScrollTrigger escribe el progreso de scroll en `estadoHero.ts`, que la escena lee en `useFrame` (sin re-renders de React).

La escena es 100% procedural (icosaedro dorado + red de 4 constelaciones: matemáticas, química, automotriz y sistemas); no descarga modelos ni texturas.

## SEO / AEO

- `Layout.astro` recibe `title`, `description`, `image`, `jsonLd` y `noindex`. Toda página nueva debe pasar al menos `title` y `description`.
- JSON-LD global: `ProfessionalService` (organización). Por página: `WebSite` (home), `Service` + `FAQPage` + `BreadcrumbList` (soluciones), `OfferCatalog` (marketing), `Course` (cada curso).
- Sitemap automático (`@astrojs/sitemap`, requiere `site` en `astro.config.mjs`); `robots.txt` permite rastreadores de IA y `llms.txt` resume la empresa para asistentes.
- Un solo `<h1>` por página.

## Pendientes conocidos

- **Nombre del chatbot**: aún no tiene nombre comercial; cuando lo tenga, cámbialo en `soluciones.ts` (`nombreCorto`, `metaTitulo`, textos).
- **Peso del 3D**: three.js completo (~250 KB gzip) porque R3F registra todo el namespace. Carga diferida y en caché; si el peso preocupa, la alternativa es reescribir la escena con three.js puro e imports con nombre.
- **Portal de Clientes**: falta la URL real (`NavBar.astro`, entrada "Accede").
- **Fotografía real**: varias secciones usan imágenes de `/public` reutilizadas entre distintos usos (marcado con comentarios `NOTA:` en el código). Sustitúyelas cuando haya fotografía propia.
- **Prueba social**: `PruebaSocial.astro` no tiene métricas ni testimonios a propósito (ver comentario al inicio del archivo) — Havenser es una empresa nueva y no hay cifras/testimonios reales que mostrar todavía. Cuando existan casos de éxito autorizados, ese es el lugar para agregarlos.
- **IDs de curso**: los ids en `src/data/cursos.ts` son ficticios (secuenciales desde `237689`). Si en el futuro se conecta un LMS/portal de cursos real, reemplázalos ahí — el resto del sitio los referencia solo por ese campo `id`.
