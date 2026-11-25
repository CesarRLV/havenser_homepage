// Demo SIMULADA del chatbot (isla React, client:visible). No usa IA real:
// reproduce conversaciones de ejemplo de src/data/soluciones.ts (DEMO_CHATBOT)
// con un indicador de "escribiendo…". Pestañas por giro de negocio y por canal.
//
// Los mensajes aparecen con un timeline de GSAP que arranca cuando la demo
// entra en pantalla. Con prefers-reduced-motion se muestran todos de una vez.
import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { DEMO_CHATBOT } from '../../data/soluciones';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CANALES = {
  whatsapp: { nombre: 'WhatsApp', fondo: '#0b141a', barra: '#1f2c34', cliente: '#005c4b', bot: '#1f2c34' },
  telegram: { nombre: 'Telegram', fondo: '#0e1621', barra: '#17212b', cliente: '#2b5278', bot: '#182533' },
} as const;
type Canal = keyof typeof CANALES;

export default function DemoChatbot() {
  const [giroId, setGiroId] = useState(DEMO_CHATBOT[0].id);
  const [canal, setCanal] = useState<Canal>('whatsapp');
  const raiz = useRef<HTMLDivElement>(null);
  const giro = DEMO_CHATBOT.find((g) => g.id === giroId)!;
  const c = CANALES[canal];

  useGSAP(
    () => {
      const burbujas = gsap.utils.toArray<HTMLElement>('.burbuja');
      const escribiendo = raiz.current!.querySelector<HTMLElement>('.escribiendo')!;
      const chat = raiz.current!.querySelector<HTMLElement>('.chat-cuerpo')!;

      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(escribiendo, { display: 'none' });
        return;
      }

      // Ocultas con display:none para que el indicador "escribiendo…" quede
      // siempre justo debajo del último mensaje visible.
      gsap.set(burbujas, { display: 'none', autoAlpha: 0, y: 12, scale: 0.96 });
      gsap.set(escribiendo, { display: 'none', autoAlpha: 0 });
      const tl = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 3 });
      burbujas.forEach((b) => {
        if (b.dataset.de === 'bot') {
          tl.set(escribiendo, { display: 'flex' }, '+=0.4')
            .to(escribiendo, { autoAlpha: 1, duration: 0.2 })
            .to(escribiendo, { autoAlpha: 0, duration: 0.15 }, '+=0.9')
            .set(escribiendo, { display: 'none' });
        } else {
          tl.to({}, { duration: 0.8 });
        }
        tl.set(b, { display: 'block' }).to(b, {
          autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.6)',
          onStart: () => chat.scrollTo({ top: chat.scrollHeight, behavior: 'smooth' }),
        });
      });
      tl.to({}, { duration: 2.5 }).to(burbujas, { autoAlpha: 0, duration: 0.4 });

      ScrollTrigger.create({
        trigger: raiz.current,
        start: 'top 80%',
        end: 'bottom top',
        onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
      });
    },
    { scope: raiz, dependencies: [giroId, canal], revertOnUpdate: true },
  );

  return (
    <div ref={raiz} className="grid gap-8 lg:grid-cols-[1fr_380px] items-center">
      <div className="space-y-6">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8d94a1] mb-2" id="demo-giro">Giro de negocio</p>
          <div className="flex flex-wrap gap-2" role="group" aria-labelledby="demo-giro">
            {DEMO_CHATBOT.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={g.id === giroId}
                onClick={() => setGiroId(g.id)}
                className={`chip-area ${g.id === giroId ? 'is-activa' : ''}`}
              >
                {g.giro}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8d94a1] mb-2" id="demo-canal">Canal</p>
          <div className="flex flex-wrap gap-2" role="group" aria-labelledby="demo-canal">
            {(Object.keys(CANALES) as Canal[]).map((k) => (
              <button
                key={k}
                type="button"
                aria-pressed={k === canal}
                onClick={() => setCanal(k)}
                className={`chip-area ${k === canal ? 'is-activa' : ''}`}
              >
                {CANALES[k].nombre}
              </button>
            ))}
          </div>
        </div>
        <p className="text-[#b9c0cc] max-w-prose">
          Así responde el asistente: al instante, con la información de su negocio y en su tono. Cuando un caso lo requiere, le pasa la conversación a una persona de su equipo con todo el contexto.
        </p>
        <p className="text-xs text-[#8d94a1]">Conversación de ejemplo con un negocio ficticio. Precios y datos ilustrativos.</p>
      </div>

      {/* Teléfono */}
      <figure className="telefono mx-auto m-0" aria-label={`Conversación de ejemplo en ${c.nombre}: ${giro.negocio}`}>
        <div className="telefono-pantalla" style={{ background: c.fondo }}>
          <div className="flex items-center gap-3 px-4 py-3" style={{ background: c.barra }}>
            <span className="w-9 h-9 rounded-full grid place-items-center bg-[#c9a126] text-[#10192d] font-bold">
              {giro.negocio.charAt(0)}
            </span>
            <div className="leading-tight">
              <p className="m-0 text-white font-semibold text-sm">{giro.negocio}</p>
              <p className="m-0 text-[11px] text-[#8d94a1]">Asistente con IA · en línea</p>
            </div>
          </div>
          <div className="chat-cuerpo">
            {giro.mensajes.map((m, i) => (
              <p
                key={`${giroId}-${canal}-${i}`}
                data-de={m.de}
                className={`burbuja ${m.de === 'cliente' ? 'burbuja-cliente' : 'burbuja-bot'}`}
                style={{ background: m.de === 'cliente' ? c.cliente : c.bot }}
              >
                {m.texto}
              </p>
            ))}
            <p className="escribiendo burbuja-bot" style={{ background: c.bot }} aria-hidden="true">
              <span></span><span></span><span></span>
            </p>
          </div>
        </div>
      </figure>
    </div>
  );
}
