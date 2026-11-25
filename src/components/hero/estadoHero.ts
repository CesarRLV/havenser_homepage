// Estado compartido entre el DOM y la escena 3D del hero, sin pasar por
// React (se lee dentro de useFrame, así que mutarlo no provoca re-renders).
export const estadoHero = {
  /** 0 = hero completo en pantalla, 1 = hero fuera de pantalla (lo escribe ScrollTrigger). */
  progreso: 0,
  /** Posición del puntero normalizada a [-1, 1]. */
  punteroX: 0,
  punteroY: 0,
};
