// Paquetes de marketing digital (fuente: "Paquetes de marketing digital
// Havenser", noviembre 2026). Precios en MXN, netos (+ IVA).
//
// Para cambiar un precio, agregar un complemento o ajustar una regla, edita
// SOLO este archivo: la página /soluciones/marketing-digital, la tabla
// comparativa y la calculadora se generan desde aquí.

export type IdPaquete = 'presencia' | 'visibilidad' | 'prospectos' | 'integral';

export interface Paquete {
  id: IdPaquete;
  nombre: string;
  precio: number; // mensual
  arranque: number; // pago único de arranque
  paraQue: string;
  perfil: string;
  redes: number;
  publicaciones: number;
  historias: number;
  reels: number;
  inversionIncluida: number; // inversión en anuncios incluida al mes
  contratoMeses: number;
  incluye: string[];
  alArrancar: string;
}

export const PAQUETES: Paquete[] = [
  {
    id: 'presencia',
    nombre: 'Presencia',
    precio: 3499,
    arranque: 0,
    paraQue: 'Estar activo y verse profesional',
    perfil: 'Para la empresa que quiere dejar atrás unas redes abandonadas y verse profesional, con un esfuerzo mensual acotado.',
    redes: 1,
    publicaciones: 8,
    historias: 4,
    reels: 1,
    inversionIncluida: 0,
    contratoMeses: 3,
    incluye: [
      'Una red a elegir: Facebook, Instagram o LinkedIn',
      'Calendario mensual con texto y hashtags, que usted aprueba',
      'Atención de mensajes L-V, 10:00 a 14:00',
      'Reporte mensual con 3 recomendaciones',
    ],
    alArrancar: 'Kit de plantillas con su marca y alta en Google Business Profile.',
  },
  {
    id: 'visibilidad',
    nombre: 'Visibilidad',
    precio: 6999,
    arranque: 0,
    paraQue: 'Ser encontrado y recibir mensajes',
    perfil: 'Para la empresa que quiere ser encontrada y empezar a recibir mensajes de posibles clientes.',
    redes: 2,
    publicaciones: 12,
    historias: 6,
    reels: 3,
    inversionIncluida: 500,
    contratoMeses: 3,
    incluye: [
      'Calendario con pilares técnico-educativos y banco de contenido atemporal',
      '1 campaña en Meta Ads con $500 de inversión incluida',
      'Atención de mensajes L-V, 10:00 a 16:00',
      'Reporte mensual con interpretación y ajustes',
      'Llamada trimestral de 30 minutos',
    ],
    alArrancar: 'Lo de Presencia, más configuración de medición y orden de su WhatsApp Business.',
  },
  {
    id: 'prospectos',
    nombre: 'Prospectos',
    precio: 12499,
    arranque: 0,
    paraQue: 'Convertir atención en solicitudes de cotización',
    perfil: 'Para la empresa que ya tiene visibilidad y quiere convertir esa atención en solicitudes de cotización.',
    redes: 3,
    publicaciones: 16,
    historias: 8,
    reels: 4,
    inversionIncluida: 1000,
    contratoMeses: 6,
    incluye: [
      'Estrategia de contenido personalizada',
      '2 campañas en Meta Ads y/o Google Ads con $1,000 de inversión incluida',
      'Atención de mensajes L-V, 9:00 a 18:00',
      'Tablero en Looker Studio y reporte con interpretación',
      'Reunión mensual de 1 hora',
    ],
    alArrancar: 'Lo de Visibilidad, más auditoría inicial de presencia digital y puesta en marcha del tablero.',
  },
  {
    id: 'integral',
    nombre: 'Integral',
    precio: 21999,
    arranque: 12000,
    paraQue: 'Seguimiento medible de la publicación a la cotización',
    perfil: 'Para la empresa que quiere medir todo el camino, desde que alguien ve una publicación hasta que pide una cotización.',
    redes: 3,
    publicaciones: 16,
    historias: 8,
    reels: 4,
    inversionIncluida: 1500,
    contratoMeses: 6,
    incluye: [
      'Estrategia personalizada y taller trimestral de competencia',
      '2 campañas y remarketing con $1,500 de inversión incluida',
      'Atención de mensajes L-V, 9:00 a 18:00',
      'Tablero con seguimiento de cada contacto hasta la cotización',
      'Reunión mensual de 1 hora',
      '1 artículo SEO al mes, SEO técnico básico y 2 h de mejoras a su página',
      'Secuencias automáticas de cotización, embudo en su CRM y reactivación mensual',
    ],
    alArrancar: 'Lo de Prospectos, más seguimiento automático, embudo y medición hasta la cotización (pago único de $12,000 + IVA).',
  },
];

const ORDEN: IdPaquete[] = ['presencia', 'visibilidad', 'prospectos', 'integral'];
/** true si `paquete` es igual o superior a `minimo`. */
export const desde = (paquete: IdPaquete, minimo: IdPaquete) => ORDEN.indexOf(paquete) >= ORDEN.indexOf(minimo);

export type Cobro = 'pieza' | 'mensual' | 'unico' | 'unico+mensual';

export interface Complemento {
  id: string;
  grupo: 'Contenido' | 'Atención y reputación' | 'Campañas y eventos' | 'Seguimiento y diagnóstico';
  nombre: string;
  precio: number;
  /** Solo para cobro 'unico+mensual': la parte mensual. */
  mensual?: number;
  cobro: Cobro;
  /** Paquetes donde se puede contratar. */
  disponible: (p: IdPaquete) => boolean;
  /** Paquetes que ya lo incluyen (no se cobra). */
  incluido?: (p: IdPaquete) => boolean;
  /** Permite elegir cantidad (piezas, videos, eventos…). */
  cantidad?: boolean;
  nota?: string;
}

const todos = () => true;

export const COMPLEMENTOS: Complemento[] = [
  { id: 'post', grupo: 'Contenido', nombre: 'Publicación adicional', precio: 250, cobro: 'pieza', disponible: todos, cantidad: true },
  { id: 'reel', grupo: 'Contenido', nombre: 'Reel adicional', precio: 1000, cobro: 'pieza', disponible: todos, cantidad: true },
  { id: 'video', grupo: 'Contenido', nombre: 'Video de producto (30–60 s)', precio: 1800, cobro: 'pieza', disponible: todos, cantidad: true },
  { id: 'articulo', grupo: 'Contenido', nombre: 'Artículo o ficha de producto con SEO', precio: 1800, cobro: 'pieza', disponible: todos, cantidad: true, nota: 'Integral incluye 1 al mes' },
  { id: 'miniserie', grupo: 'Contenido', nombre: 'Mini-serie "Pregúntele al asesor" (4 cápsulas)', precio: 4500, cobro: 'mensual', disponible: (p) => desde(p, 'visibilidad') },
  { id: 'newsletter', grupo: 'Contenido', nombre: 'Newsletter mensual', precio: 2200, cobro: 'mensual', disponible: todos },
  { id: 'voz', grupo: 'Contenido', nombre: 'Guía de voz y tono', precio: 4500, cobro: 'unico', disponible: todos },
  { id: 'resenas', grupo: 'Atención y reputación', nombre: 'Gestión de reseñas de Google', precio: 1500, cobro: 'mensual', disponible: todos },
  { id: 'horario', grupo: 'Atención y reputación', nombre: 'Horario extendido de atención', precio: 1800, cobro: 'mensual', disponible: todos, incluido: (p) => desde(p, 'prospectos'), nota: 'Prospectos e Integral ya atienden 9:00 a 18:00' },
  { id: 'campana', grupo: 'Campañas y eventos', nombre: 'Campaña de anuncios adicional (gestión)', precio: 1800, cobro: 'mensual', disponible: (p) => desde(p, 'visibilidad'), cantidad: true, nota: 'La inversión en anuncios se cobra aparte' },
  { id: 'evento', grupo: 'Campañas y eventos', nombre: 'Cobertura de evento o feria (1 jornada)', precio: 3900, cobro: 'pieza', disponible: todos, cantidad: true },
  { id: 'campana-evento', grupo: 'Campañas y eventos', nombre: 'Campaña de evento: página, QR, publicaciones y anuncios', precio: 7500, cobro: 'unico', disponible: (p) => desde(p, 'visibilidad') },
  { id: 'auditoria', grupo: 'Seguimiento y diagnóstico', nombre: 'Auditoría inicial de presencia digital', precio: 3500, cobro: 'unico', disponible: todos, incluido: (p) => desde(p, 'prospectos') },
  { id: 'reactivacion', grupo: 'Seguimiento y diagnóstico', nombre: 'Campaña de reactivación de cotizaciones', precio: 3500, cobro: 'pieza', disponible: (p) => desde(p, 'visibilidad'), cantidad: true },
  { id: 'seguimiento', grupo: 'Seguimiento y diagnóstico', nombre: 'Seguimiento automático de cotizaciones', precio: 6500, mensual: 1300, cobro: 'unico+mensual', disponible: (p) => desde(p, 'prospectos'), incluido: (p) => p === 'integral' },
];

export const IVA = 0.16;
/** Comisión de gestión sobre la inversión en anuncios que exceda lo incluido. */
export const COMISION_EXCEDENTE = 0.1;

export const CONDICIONES = [
  { titulo: 'Alcance claro', texto: 'El contrato define qué es una publicación, una historia y un reel, con 2 rondas de revisión por pieza. Las piezas no usadas en el mes no se acumulan.' },
  { titulo: 'Aprobación a tiempo', texto: 'Usted aprueba el calendario antes del día 25 del mes anterior. Sin aprobación, publicamos solo lo ya aprobado.' },
  { titulo: 'Material de su empresa', texto: 'Las fotos y videos de producto los aporta usted; sin ellos usamos imágenes genéricas con su aprobación.' },
  { titulo: 'La cuenta de anuncios es suya', texto: 'Queda a nombre de su empresa y la administramos como socio. Cada campaña lleva un tope de gasto y lo incluido que no se use se acumula.' },
  { titulo: 'Contrato mínimo', texto: '3 meses en Presencia y Visibilidad; 6 meses en Prospectos e Integral.' },
  { titulo: 'Sin promesas de ventas', texto: 'Nos comprometemos con la actividad y la medición (mensajes, prospectos y cotizaciones registradas), no con un monto de ventas.' },
];

export const mxn = (n: number) =>
  n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
