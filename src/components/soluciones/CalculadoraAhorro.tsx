// Calculadora de ahorro por automatización (isla React, client:visible).
// Estimación ilustrativa: horas repetitivas × personas × % automatizable.
// No es una promesa: el ahorro real se mide en el piloto.
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { AREAS_AUTOMATIZACION } from '../../data/soluciones';
import { linkWhatsApp, CLAVE_PRECARGA_CONTACTO } from '../../data/sitio';
import { mxn } from '../../data/marketing';

gsap.registerPlugin(useGSAP);

const SEMANAS_MES = 4.33;
const HORAS_JORNADA_MES = 40 * SEMANAS_MES;
const entero = (n: number) => Math.round(n).toLocaleString('es-MX');

function Cifra({ valor, formato }: { valor: number; formato: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const actual = useRef({ v: valor });
  useGSAP(
    () => {
      const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.to(actual.current, {
        v: valor,
        duration: reducir ? 0 : 0.6,
        ease: 'power2.out',
        overwrite: true,
        onUpdate: () => {
          if (ref.current) ref.current.textContent = formato(actual.current.v);
        },
      });
    },
    { dependencies: [valor] },
  );
  return <span ref={ref}>{formato(valor)}</span>;
}

interface CampoProps { id: string; etiqueta: string; valor: number; min: number; max: number; paso: number; sufijo: string; onChange: (n: number) => void }
function Campo({ id, etiqueta, valor, min, max, paso, sufijo, onChange }: CampoProps) {
  return (
    <div>
      <label htmlFor={id} className="flex justify-between gap-4 text-[#b9c0cc] mb-1">
        <span>{etiqueta}</span>
        <strong className="text-white whitespace-nowrap">{valor.toLocaleString('es-MX')} {sufijo}</strong>
      </label>
      <input id={id} type="range" min={min} max={max} step={paso} value={valor} onChange={(e) => onChange(Number(e.target.value))} className="calc-rango" />
    </div>
  );
}

export default function CalculadoraAhorro() {
  const [area, setArea] = useState(AREAS_AUTOMATIZACION[2].area);
  const [personas, setPersonas] = useState(5);
  const [horas, setHoras] = useState(8);
  const [costoHora, setCostoHora] = useState(150);
  const [pct, setPct] = useState(60);

  const horasMes = personas * horas * SEMANAS_MES * (pct / 100);
  const ahorroMes = horasMes * costoHora;
  const ahorroAnual = ahorroMes * 12;
  const jornadas = horasMes / HORAS_JORNADA_MES;

  const mensaje = [
    'Hola Havenser, usé su calculadora de ahorro:',
    `• Área: ${area}`,
    `• ${personas} personas, ${horas} h/semana cada una en tareas repetitivas`,
    `• Estimado: ${entero(horasMes)} horas al mes (${mxn(Math.round(ahorroMes))} al mes)`,
    'Me gustaría un diagnóstico para automatizar este proceso.',
  ].join('\n');

  const irAContacto = () => {
    try {
      sessionStorage.setItem(
        CLAVE_PRECARGA_CONTACTO,
        JSON.stringify({ interes: 'Agentes IA y automatización', asunto: `Diagnóstico de automatización: ${area}`, mensaje }),
      );
    } catch {
      /* sin sessionStorage: el formulario funciona igual */
    }
    window.location.href = '/contactanos#contacto';
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2 items-start">
      <div className="space-y-7">
        <fieldset>
          <legend className="calc-legend"><span>1</span> ¿Qué área quiere liberar?</legend>
          <div className="flex flex-wrap gap-2">
            {AREAS_AUTOMATIZACION.map((a) => (
              <label key={a.area} className={`chip-area ${a.area === area ? 'is-activa' : ''}`}>
                <input type="radio" name="area" value={a.area} checked={a.area === area} onChange={() => setArea(a.area)} className="sr-only" />
                {a.area}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="space-y-6">
          <legend className="calc-legend"><span>2</span> Cuéntenos de su equipo</legend>
          <Campo id="ah-personas" etiqueta="Personas que hacen la tarea" valor={personas} min={1} max={50} paso={1} sufijo={personas === 1 ? 'persona' : 'personas'} onChange={setPersonas} />
          <Campo id="ah-horas" etiqueta="Horas a la semana, por persona, en tareas repetitivas" valor={horas} min={1} max={40} paso={1} sufijo="h" onChange={setHoras} />
          <Campo id="ah-costo" etiqueta="Costo por hora de esa persona (sueldo + prestaciones)" valor={costoHora} min={50} max={1000} paso={10} sufijo="MXN" onChange={setCostoHora} />
          <Campo id="ah-pct" etiqueta="Porcentaje que se puede automatizar" valor={pct} min={20} max={90} paso={5} sufijo="%" onChange={setPct} />
        </fieldset>
      </div>

      <aside className="calc-resumen" aria-live="polite">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c9a126] mb-4">Ahorro estimado</p>
        <p className="m-0 text-[#b9c0cc]">Horas recuperadas al mes</p>
        <p className="m-0 mb-5 text-5xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>
          <Cifra valor={horasMes} formato={entero} />
        </p>
        <dl className="calc-filas">
          <div><dt>Equivale a</dt><dd><Cifra valor={jornadas} formato={(n) => `${n.toFixed(1)} jornadas completas`} /></dd></div>
          <div><dt>Costo liberado al mes</dt><dd><Cifra valor={ahorroMes} formato={(n) => mxn(Math.round(n))} /></dd></div>
          <div className="total"><dt>Al año</dt><dd><Cifra valor={ahorroAnual} formato={(n) => mxn(Math.round(n))} /></dd></div>
        </dl>
        <p className="calc-nota">
          Estimación ilustrativa para dimensionar la oportunidad. El ahorro real lo medimos con usted en un piloto, antes de escalar.
        </p>
        <div className="grid gap-3 mt-6">
          <a href={linkWhatsApp(mensaje)} target="_blank" rel="noopener noreferrer" className="btn-oro w-full">Pedir un diagnóstico por WhatsApp</a>
          <button type="button" onClick={irAContacto} className="btn-borde w-full text-[#e6e6f0]">Prefiero que me contacten</button>
        </div>
      </aside>
    </div>
  );
}
