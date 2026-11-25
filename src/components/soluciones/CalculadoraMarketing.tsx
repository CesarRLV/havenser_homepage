// Calculadora de paquetes de marketing digital (isla React, client:visible).
// Todos los precios y reglas vienen de src/data/marketing.ts.
//
// Flujo (3 pasos, ley de Hick: una decisión a la vez):
//   1. Paquete  2. Complementos  3. Inversión en anuncios
// El resumen se recalcula al instante (umbral de Doherty) y se puede enviar
// por WhatsApp o precargar en el formulario de contacto (solo la
// configuración, nunca datos personales).
import { useMemo, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  PAQUETES, COMPLEMENTOS, IVA, COMISION_EXCEDENTE, mxn,
  type IdPaquete, type Complemento,
} from '../../data/marketing';
import { linkWhatsApp, CLAVE_PRECARGA_CONTACTO } from '../../data/sitio';

gsap.registerPlugin(useGSAP);

const GRUPOS = ['Contenido', 'Atención y reputación', 'Campañas y eventos', 'Seguimiento y diagnóstico'] as const;
const COBRO_TEXTO: Record<Complemento['cobro'], string> = {
  pieza: 'por pieza',
  mensual: 'al mes',
  unico: 'pago único',
  'unico+mensual': 'configuración + mensual',
};

/** Número que se anima hacia su nuevo valor (GSAP). */
function Monto({ valor, className }: { valor: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const actual = useRef({ v: valor });
  useGSAP(
    () => {
      const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches;
      gsap.to(actual.current, {
        v: valor,
        duration: reducir ? 0 : 0.5,
        ease: 'power2.out',
        overwrite: true,
        onUpdate: () => {
          if (ref.current) ref.current.textContent = mxn(Math.round(actual.current.v));
        },
      });
    },
    { dependencies: [valor] },
  );
  return <span ref={ref} className={className}>{mxn(valor)}</span>;
}

export default function CalculadoraMarketing() {
  const [idPaquete, setIdPaquete] = useState<IdPaquete>('visibilidad');
  const [cantidades, setCantidades] = useState<Record<string, number>>({});
  const [inversion, setInversion] = useState(0);

  const paquete = PAQUETES.find((p) => p.id === idPaquete)!;

  // Las tarjetas comparativas de la página (HTML de Astro) eligen paquete con este evento.
  useEffect(() => {
    // Si se eligió antes de que la isla terminara de hidratarse.
    const previo = (window as Window & { havenserPaquete?: IdPaquete }).havenserPaquete;
    if (previo) setIdPaquete(previo);
    const elegir = (e: Event) => setIdPaquete((e as CustomEvent<IdPaquete>).detail);
    window.addEventListener('havenser:paquete', elegir);
    return () => window.removeEventListener('havenser:paquete', elegir);
  }, []);

  // La inversión arranca en lo incluido por el paquete.
  useEffect(() => setInversion(paquete.inversionIncluida), [paquete.inversionIncluida]);

  const calculo = useMemo(() => {
    const activos = COMPLEMENTOS.filter(
      (c) => (cantidades[c.id] ?? 0) > 0 && c.disponible(idPaquete) && !c.incluido?.(idPaquete),
    ).map((c) => ({ c, n: cantidades[c.id] }));

    let mensual = paquete.precio;
    let unico = paquete.arranque;
    let piezas = 0;
    for (const { c, n } of activos) {
      if (c.cobro === 'mensual') mensual += c.precio * n;
      if (c.cobro === 'unico') unico += c.precio;
      if (c.cobro === 'pieza') piezas += c.precio * n;
      if (c.cobro === 'unico+mensual') {
        unico += c.precio;
        mensual += c.mensual ?? 0;
      }
    }
    const conCampanas = paquete.inversionIncluida > 0;
    const excedente = conCampanas ? Math.max(0, inversion - paquete.inversionIncluida) : 0;
    const comision = Math.round(excedente * COMISION_EXCEDENTE);
    mensual += comision;

    const subtotal = mensual + unico + piezas;
    return {
      activos, mensual, unico, piezas, excedente, comision, subtotal,
      iva: Math.round(subtotal * IVA),
      total: Math.round(subtotal * (1 + IVA)),
      contrato: mensual * paquete.contratoMeses,
    };
  }, [cantidades, idPaquete, inversion, paquete]);

  // Móvil: barra fija con el total mientras se eligen opciones (ley de Fitts);
  // se oculta cuando el resumen completo ya está a la vista.
  const pasosRef = useRef<HTMLDivElement>(null);
  const resumenRef = useRef<HTMLElement>(null);
  const [verBarra, setVerBarra] = useState(false);
  useEffect(() => {
    const vistos = new Map<Element, boolean>();
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => vistos.set(e.target, e.isIntersecting));
      setVerBarra(!!vistos.get(pasosRef.current!) && !vistos.get(resumenRef.current!));
    });
    io.observe(pasosRef.current!);
    io.observe(resumenRef.current!);
    return () => io.disconnect();
  }, []);

  const cambiar = (id: string, n: number) => setCantidades((c) => ({ ...c, [id]: Math.max(0, Math.min(20, n)) }));

  const mensaje = [
    'Hola Havenser, armé este paquete en su calculadora:',
    `• Paquete: ${paquete.nombre} (${mxn(paquete.precio)} + IVA al mes)`,
    calculo.activos.length
      ? `• Complementos: ${calculo.activos.map(({ c, n }) => (c.cantidad ? `${c.nombre} ×${n}` : c.nombre)).join(', ')}`
      : '• Sin complementos',
    paquete.inversionIncluida > 0 ? `• Inversión en anuncios deseada: ${mxn(inversion)} al mes` : '',
    `Estimado del primer mes: ${mxn(calculo.subtotal)} + IVA (${mxn(calculo.total)} con IVA).`,
    '¿Me pueden enviar la cotización formal?',
  ].filter(Boolean).join('\n');

  const irAContacto = () => {
    try {
      sessionStorage.setItem(
        CLAVE_PRECARGA_CONTACTO,
        JSON.stringify({ interes: 'Marketing digital', asunto: `Cotización paquete ${paquete.nombre}`, mensaje }),
      );
    } catch {
      /* sin sessionStorage: el formulario funciona igual, solo sin precarga */
    }
    window.location.href = '/contactanos#contacto';
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px] items-start">
      <div className="space-y-10" ref={pasosRef}>
        {/* Paso 1 */}
        <fieldset>
          <legend className="calc-legend"><span>1</span> Elija su paquete</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {PAQUETES.map((p) => (
              <label key={p.id} className={`calc-opcion ${p.id === idPaquete ? 'is-activa' : ''}`}>
                <input
                  type="radio"
                  name="paquete"
                  value={p.id}
                  checked={p.id === idPaquete}
                  onChange={() => setIdPaquete(p.id)}
                  className="sr-only"
                />
                <span className="flex items-baseline justify-between gap-2">
                  <strong className="text-lg text-white">{p.nombre}</strong>
                  <span className="text-[#c9a126] font-bold">{mxn(p.precio)}</span>
                </span>
                <span className="text-sm text-[#b9c0cc]">{p.paraQue}</span>
                <span className="text-xs text-[#8d94a1]">
                  {p.redes} {p.redes === 1 ? 'red' : 'redes'} · {p.publicaciones} publicaciones · {p.reels} {p.reels === 1 ? 'reel' : 'reels'} · contrato {p.contratoMeses} meses
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Paso 2 */}
        <fieldset>
          <legend className="calc-legend"><span>2</span> Refuerce con complementos <em>(opcional)</em></legend>
          <div className="space-y-6">
            {GRUPOS.map((grupo) => (
              <div key={grupo}>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8d94a1] mb-2">{grupo}</p>
                <ul className="calc-lista">
                  {COMPLEMENTOS.filter((c) => c.grupo === grupo).map((c) => {
                    const incluido = c.incluido?.(idPaquete);
                    const disponible = c.disponible(idPaquete) && !incluido;
                    const n = disponible ? cantidades[c.id] ?? 0 : 0;
                    return (
                      <li key={c.id} className={`calc-item ${disponible ? '' : 'is-off'}`}>
                        <div className="min-w-0">
                          <p className="text-[#e6e6f0] font-semibold leading-snug">{c.nombre}</p>
                          <p className="text-xs text-[#8d94a1]">
                            {incluido ? 'Ya incluido en su paquete' : !disponible ? 'Disponible desde un paquete superior' : (
                              <>
                                {mxn(c.precio)} {COBRO_TEXTO[c.cobro]}
                                {c.mensual ? ` + ${mxn(c.mensual)} al mes` : ''}
                                {c.nota ? ` · ${c.nota}` : ''}
                              </>
                            )}
                          </p>
                        </div>
                        {incluido ? (
                          <span className="calc-incluido">Incluido</span>
                        ) : c.cantidad ? (
                          <div className="calc-stepper" aria-label={`Cantidad de ${c.nombre}`}>
                            <button type="button" onClick={() => cambiar(c.id, n - 1)} disabled={!disponible || n === 0} aria-label={`Quitar ${c.nombre}`}>−</button>
                            <output aria-live="polite">{n}</output>
                            <button type="button" onClick={() => cambiar(c.id, n + 1)} disabled={!disponible} aria-label={`Agregar ${c.nombre}`}>+</button>
                          </div>
                        ) : (
                          <input
                            type="checkbox"
                            className="calc-check"
                            checked={n > 0}
                            disabled={!disponible}
                            onChange={(e) => cambiar(c.id, e.target.checked ? 1 : 0)}
                            aria-label={c.nombre}
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </fieldset>

        {/* Paso 3 */}
        <fieldset disabled={paquete.inversionIncluida === 0}>
          <legend className="calc-legend"><span>3</span> Inversión mensual en anuncios</legend>
          {paquete.inversionIncluida === 0 ? (
            <p className="text-[#b9c0cc]">Presencia no incluye campañas de anuncios. Si las necesita, elija Visibilidad o superior.</p>
          ) : (
            <>
              <label htmlFor="calc-inversion" className="flex justify-between text-[#b9c0cc] mb-2">
                <span>¿Cuánto quiere invertir en Meta / Google al mes?</span>
                <strong className="text-white">{mxn(inversion)}</strong>
              </label>
              <input
                id="calc-inversion"
                type="range"
                min={paquete.inversionIncluida}
                max={30000}
                step={500}
                value={inversion}
                onChange={(e) => setInversion(Number(e.target.value))}
                className="calc-rango"
              />
              <p className="text-sm text-[#8d94a1] mt-3">
                Su paquete incluye {mxn(paquete.inversionIncluida)} al mes. El excedente lo paga usted directo a la plataforma con su tarjeta, y Havenser cobra una comisión de gestión del {COMISION_EXCEDENTE * 100}% sobre ese excedente.
              </p>
            </>
          )}
        </fieldset>
      </div>

      {/* Resumen */}
      <aside className="calc-resumen" aria-labelledby="calc-resumen-titulo" ref={resumenRef} id="calc-resumen">
        <p id="calc-resumen-titulo" className="text-xs font-bold uppercase tracking-[0.16em] text-[#c9a126] mb-1">Su estimado</p>
        <p className="text-2xl font-bold text-white mb-5" style={{ fontFamily: 'Georgia, serif' }}>Paquete {paquete.nombre}</p>

        <dl className="calc-filas">
          <div><dt>Mensualidad</dt><dd><Monto valor={calculo.mensual} /></dd></div>
          {calculo.comision > 0 && <div className="sub"><dt>incluye comisión de anuncios</dt><dd>{mxn(calculo.comision)}</dd></div>}
          {calculo.unico > 0 && <div><dt>Pagos únicos</dt><dd><Monto valor={calculo.unico} /></dd></div>}
          {calculo.piezas > 0 && <div><dt>Piezas extra (este mes)</dt><dd><Monto valor={calculo.piezas} /></dd></div>}
          <div className="total"><dt>Primer mes (sin IVA)</dt><dd><Monto valor={calculo.subtotal} /></dd></div>
          <div className="sub"><dt>IVA ({IVA * 100}%)</dt><dd>{mxn(calculo.iva)}</dd></div>
          <div className="sub"><dt>Total con IVA</dt><dd aria-live="polite">{mxn(calculo.total)}</dd></div>
        </dl>

        {calculo.excedente > 0 && (
          <p className="calc-nota">Además pagará {mxn(calculo.excedente)} al mes directamente a Meta o Google (excedente de anuncios).</p>
        )}
        <p className="calc-nota">
          Contrato mínimo: {paquete.contratoMeses} meses ({mxn(calculo.contrato)} + IVA en mensualidades).
        </p>

        <div className="grid gap-3 mt-6">
          <a href={linkWhatsApp(mensaje)} target="_blank" rel="noopener noreferrer" className="btn-oro w-full">
            Solicitar este paquete por WhatsApp
          </a>
          <button type="button" onClick={irAContacto} className="btn-borde w-full text-[#e6e6f0]">
            Prefiero que me contacten
          </button>
        </div>
        <p className="text-xs text-[#8d94a1] mt-4 mb-0">
          Estimado + IVA, en pesos mexicanos. La cotización final se confirma después de una reunión.
        </p>
      </aside>

      <div className={`calc-barra lg:hidden ${verBarra ? 'is-visible' : ''}`} aria-hidden={!verBarra}>
        <div>
          <p className="text-xs text-[#8d94a1] m-0">{paquete.nombre} · primer mes + IVA</p>
          <p className="text-xl font-bold text-[#c9a126] m-0"><Monto valor={calculo.subtotal} /></p>
        </div>
        <a href="#calc-resumen" className="btn-oro" tabIndex={verBarra ? 0 : -1}>Ver resumen</a>
      </div>
    </div>
  );
}
