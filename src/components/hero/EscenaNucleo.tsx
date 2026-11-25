// Escena 3D del hero: "núcleo interdisciplinario".
// Un icosaedro de alambre dorado (el rigor científico) rodeado por una red de
// nodos agrupados en 4 constelaciones (matemáticas, química, automotriz y
// sistemas) conectadas entre sí. 100% procedural: no descarga modelos ni
// texturas. Reacciona al puntero y se expande al hacer scroll.
//
// Este módulo se carga en diferido (React.lazy desde Hero3D.tsx), así que
// three.js nunca bloquea el texto ni el botón principal del hero.
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { estadoHero } from './estadoHero';

const ORO = new THREE.Color('#c9a126');
const AZUL = new THREE.Color('#6e7b90');
const CLARO = new THREE.Color('#e6e6f0');

/** Textura circular suave para los nodos (se genera en un canvas, sin red). */
function texturaPunto() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.85)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Genera nodos en 4 constelaciones y las líneas entre vecinos cercanos. */
function crearRed(n: number) {
  const centros = [
    new THREE.Vector3(1, 0.6, 0.4),
    new THREE.Vector3(-1, 0.5, -0.3),
    new THREE.Vector3(0.3, -0.9, 0.6),
    new THREE.Vector3(-0.4, -0.6, -0.9),
  ].map((v) => v.normalize());

  const puntos: THREE.Vector3[] = [];
  const colores = new Float32Array(n * 3);
  const tmp = new THREE.Color();
  for (let i = 0; i < n; i++) {
    const dir = centros[i % 4]
      .clone()
      .add(new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(1.3))
      .normalize();
    puntos.push(dir.multiplyScalar(2 + Math.random() * 1.3));
    tmp.copy(Math.random() < 0.3 ? ORO : AZUL.clone().lerp(CLARO, Math.random() * 0.6));
    tmp.toArray(colores, i * 3);
  }

  // Cada nodo se une con sus 2 vecinos más cercanos (si están cerca).
  const lineas: number[] = [];
  puntos.forEach((p, i) => {
    puntos
      .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
      .filter(({ j, d }) => j > i && d < 0.7)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
      .forEach(({ j }) => lineas.push(...p.toArray(), ...puntos[j].toArray()));
  });
  // Algunos "rayos" del núcleo hacia la red: la ciencia alimenta a la tecnología.
  for (let i = 0; i < puntos.length; i += Math.ceil(n / 14)) {
    lineas.push(...puntos[i].clone().setLength(1.35).toArray(), ...puntos[i].toArray());
  }

  return {
    posiciones: new Float32Array(puntos.flatMap((p) => p.toArray())),
    colores,
    lineas: new Float32Array(lineas),
  };
}

function Nucleo({ movil }: { movil: boolean }) {
  const raiz = useRef<THREE.Group>(null!);
  const red = useRef<THREE.Group>(null!);
  const alambre = useRef<THREE.Mesh>(null!);
  const corazon = useRef<THREE.Mesh>(null!);
  const viewport = useThree((s) => s.viewport);
  const { posiciones, colores, lineas } = useMemo(() => crearRed(movil ? 90 : 220), [movil]);
  const textura = useMemo(texturaPunto, []);

  // En escritorio el núcleo vive a la derecha (el texto está a la izquierda);
  // en móvil, centrado y más arriba, detrás del texto.
  const ancho = viewport.width > 7;
  const base = ancho
    ? { x: viewport.width * 0.24, y: 0, s: 1 }
    : { x: 0, y: viewport.height * 0.3, s: 0.45 };

  useFrame((state, delta) => {
    const p = estadoHero.progreso;
    const t = state.clock.elapsedTime;
    const g = raiz.current;

    // Rotación continua + inclinación hacia el puntero (suavizada).
    red.current.rotation.y += delta * (0.08 + p * 0.5);
    alambre.current.rotation.y -= delta * (0.15 + p * 0.8);
    alambre.current.rotation.x += delta * 0.05;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, estadoHero.punteroY * 0.25, 3, delta);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, estadoHero.punteroX * 0.35, 3, delta);

    // Scroll: el núcleo sube y la red se expande.
    g.position.set(base.x, base.y + p * 1.5, 0);
    red.current.scale.setScalar(1 + p * 0.7);
    g.scale.setScalar(base.s * (1 + p * 0.15));

    // Latido del corazón dorado.
    corazon.current.scale.setScalar(1 + Math.sin(t * 2) * 0.06);
  });

  return (
    <group ref={raiz}>
      {/* Núcleo: icosaedro de alambre + sólido facetado + corazón brillante */}
      <mesh ref={alambre}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color={ORO} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial color="#1d2f52" metalness={0.4} roughness={0.35} flatShading transparent opacity={0.5} />
      </mesh>
      <mesh ref={corazon}>
        <sphereGeometry args={[0.22, 24, 16]} />
        <meshBasicMaterial color={ORO} />
      </mesh>
      <sprite scale={1.6}>
        <spriteMaterial map={textura} color={ORO} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </sprite>

      {/* Órbitas */}
      <mesh rotation={[1.2, 0.3, 0]}>
        <torusGeometry args={[1.95, 0.005, 6, 128]} />
        <meshBasicMaterial color={AZUL} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[0.4, 1.1, 0.6]}>
        <torusGeometry args={[2.35, 0.004, 6, 128]} />
        <meshBasicMaterial color={ORO} transparent opacity={0.25} />
      </mesh>

      {/* Red de nodos interdisciplinaria */}
      <group ref={red}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[posiciones, 3]} />
            <bufferAttribute attach="attributes-color" args={[colores, 3]} />
          </bufferGeometry>
          <pointsMaterial
            map={textura}
            size={movil ? 0.13 : 0.1}
            sizeAttenuation
            vertexColors
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[lineas, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={AZUL} transparent opacity={0.28} depthWrite={false} />
        </lineSegments>
      </group>
    </group>
  );
}

export default function EscenaNucleo({ activo, movil, onListo }: { activo: boolean; movil: boolean; onListo: () => void }) {
  return (
    <Canvas
      flat
      dpr={movil ? [1, 1.25] : [1, 1.75]}
      frameloop={activo ? 'always' : 'never'}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: !movil, alpha: true, powerPreference: 'high-performance' }}
      onCreated={onListo}
      aria-hidden="true"
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 3, 4]} intensity={25} color={CLARO} />
      <directionalLight position={[-4, -2, 2]} intensity={1.2} color={AZUL} />
      <Nucleo movil={movil} />
    </Canvas>
  );
}
