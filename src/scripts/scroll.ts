// Animaciones por scroll de TODO el sitio (GSAP + ScrollTrigger).
// Se carga una sola vez desde Layout.astro. Funciona con atributos en el HTML,
// así que ningún componente necesita su propio <script> para revelar contenido:
//
//   data-animar="fade-up|fade-left|fade-right|zoom"  revela el elemento al entrar
//   data-stagger                                      revela sus hijos en cascada
//   data-parallax="-12"                               desplaza el elemento en Y (yPercent) con el scroll
//
// Con prefers-reduced-motion no se anima nada y todo queda visible.
// Sin JS, todo queda visible (el estado oculto lo pone este script, no el CSS).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DESDE: Record<string, gsap.TweenVars> = {
  'fade-up': { y: 32 },
  'fade-left': { x: 32 },
  'fade-right': { x: -32 },
  zoom: { scale: 0.94 },
};

const mm = gsap.matchMedia();

mm.add('(prefers-reduced-motion: no-preference)', () => {
  // Barra de progreso de lectura (arriba de la página).
  gsap.to('.barra-progreso', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
  });

  // Revelado individual.
  const animables = gsap.utils.toArray<HTMLElement>('[data-animar]');
  animables.forEach((el) => gsap.set(el, { autoAlpha: 0, ...(DESDE[el.dataset.animar!] ?? DESDE['fade-up']) }));
  ScrollTrigger.batch(animables, {
    start: 'top 88%',
    once: true,
    onEnter: (lote) =>
      gsap.to(lote, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power3.out', stagger: 0.08, overwrite: true }),
  });

  // Revelado en cascada de los hijos.
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((grupo) => {
    gsap.from(grupo.children, {
      autoAlpha: 0,
      y: 24,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.09,
      scrollTrigger: { trigger: grupo, start: 'top 85%', once: true },
    });
  });

  // Parallax suave (solo transform: no provoca reflow).
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.to(el, {
      yPercent: Number(el.dataset.parallax) || -10,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
});

// Las islas de React y las imágenes pueden cambiar la altura de la página.
window.addEventListener('load', () => ScrollTrigger.refresh());
