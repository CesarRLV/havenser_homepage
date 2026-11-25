// Isla de React del hero (client:idle). Decide SI se monta el 3D y CUÁNDO:
//  - Nunca con prefers-reduced-motion, ahorro de datos o sin WebGL: se queda
//    el póster SVG estático (que también es lo que se ve mientras carga).
//  - La escena (three.js + R3F) se descarga en diferido con React.lazy.
//  - El render se detiene cuando el hero sale de pantalla.
//  - ScrollTrigger (GSAP) escribe el progreso de scroll que lee la escena.
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { estadoHero } from './estadoHero';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EscenaNucleo = lazy(() => import('./EscenaNucleo'));

function soporta3D() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const red = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (red?.saveData || /(^|-)2g|3g/.test(red?.effectiveType ?? '')) return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Póster estático: proyección 2D del icosaedro. Se renderiza en el HTML del servidor. */
function Poster({ oculto }: { oculto: boolean }) {
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return [200 + Math.cos(a) * 150, 200 + Math.sin(a) * 150];
  });
  const tri = [hex[1], hex[3], hex[5]];
  return (
    <svg
      className="poster-nucleo"
      viewBox="0 0 400 400"
      aria-hidden="true"
      style={{ opacity: oculto ? 0 : 1, transition: 'opacity 1.2s ease' }}
    >
      <g fill="none" stroke="#c9a126" strokeWidth="1.2" opacity="0.6">
        <polygon points={hex.map((p) => p.join(',')).join(' ')} />
        <polygon points={tri.map((p) => p.join(',')).join(' ')} />
        {hex.map(([x, y], i) => (
          <line key={i} x1="200" y1="200" x2={x} y2={y} />
        ))}
      </g>
      <circle cx="200" cy="200" r="70" fill="none" stroke="#6e7b90" strokeWidth="0.8" opacity="0.5" />
      <circle cx="200" cy="200" r="190" fill="none" stroke="#6e7b90" strokeWidth="0.6" opacity="0.35" />
      <circle cx="200" cy="200" r="12" fill="#c9a126" />
    </svg>
  );
}

export default function Hero3D() {
  const contenedor = useRef<HTMLDivElement>(null);
  const [montar, setMontar] = useState(false);
  const [activo, setActivo] = useState(true);
  const [listo, setListo] = useState(false);
  const [movil, setMovil] = useState(false);

  useEffect(() => {
    if (!soporta3D()) return;
    setMovil(window.innerWidth < 768 || navigator.hardwareConcurrency <= 4);
    setMontar(true);

    const io = new IntersectionObserver(([e]) => setActivo(e.isIntersecting));
    io.observe(contenedor.current!);

    const puntero = (e: PointerEvent) => {
      estadoHero.punteroX = (e.clientX / window.innerWidth) * 2 - 1;
      estadoHero.punteroY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', puntero, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener('pointermove', puntero);
    };
  }, []);

  // Progreso de scroll del hero -> escena 3D.
  useGSAP(
    () => {
      if (!montar) return;
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => (estadoHero.progreso = self.progress),
      });
    },
    { dependencies: [montar], scope: contenedor },
  );

  return (
    <div ref={contenedor} className="hero-3d">
      <Poster oculto={listo} />
      {montar && (
        <Suspense fallback={null}>
          <div className="hero-canvas" style={{ opacity: listo ? 1 : 0 }}>
            <EscenaNucleo activo={activo} movil={movil} onListo={() => setListo(true)} />
          </div>
        </Suspense>
      )}
    </div>
  );
}
