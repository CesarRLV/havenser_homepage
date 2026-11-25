// Contenido de las 3 páginas de /soluciones/* y de la sección "Soluciones
// destacadas" de la home. Textos, preguntas frecuentes (FAQ, también se
// publican como JSON-LD FAQPage) y casos típicos viven aquí.
//
// Regla de contenido: los "casos típicos" son ilustrativos, NUNCA clientes
// reales. No inventar testimonios ni métricas de clientes.

export interface Faq { q: string; a: string }
export interface Bloque { titulo: string; texto: string }

export interface Solucion {
  slug: 'marketing-digital' | 'automatizacion-ia' | 'chatbot-whatsapp';
  nombreCorto: string;
  resumen: string; // tarjeta en la home
  metaTitulo: string;
  metaDescripcion: string;
  eyebrow: string;
  h1: string;
  sub: string;
  beneficios: Bloque[];
  proceso: Bloque[];
  faqs: Faq[];
}

export const SOLUCIONES: Solucion[] = [
  {
    slug: 'marketing-digital',
    nombreCorto: 'Marketing digital',
    resumen: 'Cuatro paquetes mensuales para verse profesional, ser encontrado y recibir solicitudes de cotización. Arme el suyo en la calculadora.',
    metaTitulo: 'Paquetes de marketing digital para empresas B2B | Havenser',
    metaDescripcion: 'Paquetes de marketing digital desde $3,499 + IVA al mes: redes sociales, reels, campañas en Meta y Google Ads, reportes y seguimiento de cotizaciones. Calcule su paquete en línea.',
    eyebrow: 'Marketing digital',
    h1: 'Marketing digital con rigor de ingeniería',
    sub: 'Producimos el contenido con inteligencia artificial y lo revisa un equipo de ingeniería y ciencias exactas. Por eso podemos explicar productos técnicos sin simplificarlos de más, y medir el camino hasta la cotización.',
    beneficios: [
      { titulo: 'Contenido técnico que se entiende', texto: 'Pilares técnico-educativos que explican sus productos o servicios con precisión, en el tono de su marca.' },
      { titulo: 'Campañas con tope de gasto', texto: 'Meta Ads y Google Ads con inversión incluida, cuenta a nombre de su empresa y control de cada peso.' },
      { titulo: 'Medición hasta la cotización', texto: 'Tableros en Looker Studio y seguimiento de cada contacto: sabe qué publicación trajo qué solicitud.' },
    ],
    proceso: [
      { titulo: 'Reunión', texto: 'Nos dice qué paquete le interesa o qué presupuesto tiene.' },
      { titulo: 'Cotización exacta', texto: 'Le enviamos el precio final con los ajustes y complementos que elija.' },
      { titulo: 'Arranque', texto: 'Firmamos, abrimos la cuenta de anuncios a nombre de su empresa y arrancamos con el kit de marca y el primer calendario.' },
    ],
    faqs: [
      { q: '¿Cuánto cuesta el marketing digital con Havenser?', a: 'Hay cuatro paquetes mensuales: Presencia ($3,499), Visibilidad ($6,999), Prospectos ($12,499) e Integral ($21,999 más $12,000 de arranque). Todos los precios son en pesos mexicanos más IVA.' },
      { q: '¿La inversión en anuncios está incluida?', a: 'Visibilidad incluye $500 al mes, Prospectos $1,000 e Integral $1,500. Si quiere invertir más, el excedente lo paga directamente a Meta o Google y Havenser cobra una comisión de gestión del 10% sobre ese excedente, más IVA. Lo incluido que no se gaste se acumula para los meses siguientes.' },
      { q: '¿Cuál es el contrato mínimo?', a: '3 meses en Presencia y Visibilidad; 6 meses en Prospectos e Integral.' },
      { q: '¿Garantizan un monto de ventas?', a: 'No. Nos comprometemos con la actividad y la medición: mensajes, prospectos y cotizaciones registradas. Prometer ventas sería deshonesto porque dependen también de su oferta y su equipo comercial.' },
      { q: '¿Puedo ajustar un paquete?', a: 'Sí. Puede sumar complementos (reels, videos, newsletter, reseñas, eventos, etc.) o pedirnos un ajuste, por ejemplo menos reels con las mismas publicaciones, y le entregamos una cotización con el precio exacto.' },
      { q: '¿Incluye un chatbot de WhatsApp?', a: 'No. El agente de IA en WhatsApp es un servicio aparte que puede combinar con cualquier paquete para atender a sus clientes las 24 horas.' },
    ],
  },
  {
    slug: 'automatizacion-ia',
    nombreCorto: 'Agentes IA y automatización',
    resumen: 'Agentes de inteligencia artificial que hacen el trabajo repetitivo de ventas, atención, finanzas, RH y operaciones, para que su equipo dedique sus horas a lo que sí genera valor.',
    metaTitulo: 'Agentes de IA y automatización de procesos para empresas | Havenser',
    metaDescripcion: 'Automatizamos flujos de trabajo con agentes de inteligencia artificial: captura de datos, conciliaciones, seguimiento comercial, reportes y atención. Calcule cuántas horas puede ahorrar su empresa.',
    eyebrow: 'Agentes IA y automatización',
    h1: 'Recupere las horas que su equipo pierde en tareas repetitivas',
    sub: 'Diseñamos agentes de inteligencia artificial y automatizaciones que se conectan a sus sistemas actuales (correo, Excel, ERP, CRM, WhatsApp) y ejecutan el trabajo operativo con supervisión humana donde importa.',
    beneficios: [
      { titulo: 'Se conectan a lo que ya usa', texto: 'Integramos sus hojas de cálculo, correo, ERP, CRM y bases de datos; no tiene que cambiar de sistemas para empezar.' },
      { titulo: 'Humano en el ciclo', texto: 'El agente prepara, clasifica y propone; las decisiones sensibles siguen pasando por una persona de su equipo.' },
      { titulo: 'Medible desde el primer mes', texto: 'Definimos con usted el indicador base (horas, errores, tiempo de respuesta) y lo medimos antes y después.' },
    ],
    proceso: [
      { titulo: 'Diagnóstico', texto: 'Mapeamos el flujo actual y detectamos dónde se va el tiempo.' },
      { titulo: 'Piloto', texto: 'Automatizamos un proceso acotado y medimos el ahorro real.' },
      { titulo: 'Escalamiento', texto: 'Extendemos a otras áreas con monitoreo y mejora continua.' },
      { titulo: 'Capacitación', texto: 'Su equipo aprende a operar y supervisar a los agentes.' },
    ],
    faqs: [
      { q: '¿Qué es un agente de inteligencia artificial para empresas?', a: 'Es un programa que usa modelos de lenguaje para entender instrucciones y datos (correos, documentos, mensajes) y ejecutar pasos de un proceso: capturar, clasificar, consultar sistemas, redactar respuestas o generar reportes, con reglas y supervisión definidas por su empresa.' },
      { q: '¿Qué procesos conviene automatizar primero?', a: 'Los repetitivos, de alto volumen y con reglas claras: captura de facturas y pedidos, conciliaciones, seguimiento de cotizaciones, reportes semanales y respuestas a preguntas frecuentes.' },
      { q: '¿Necesito cambiar mis sistemas?', a: 'No. Los agentes se conectan a sus herramientas actuales; si algo no tiene integración, usamos RPA o pipelines ETL para leer y escribir los datos.' },
      { q: '¿Mis datos están seguros?', a: 'Diseñamos cada solución con permisos mínimos, registros de auditoría y, cuando se requiere, modelos desplegados en su propia nube. El equipo de Havenser también ofrece auditoría de ciberseguridad.' },
      { q: '¿Cuánto tarda un piloto?', a: 'Depende del proceso, pero un piloto acotado suele medirse en semanas, no en meses. Se lo confirmamos tras el diagnóstico.' },
    ],
  },
  {
    slug: 'chatbot-whatsapp',
    nombreCorto: 'Chatbot con IA para WhatsApp',
    resumen: 'Un asistente con inteligencia artificial que responde en WhatsApp y Telegram las 24 horas: precios, horarios, citas, pedidos y canalización a su equipo.',
    metaTitulo: 'Chatbot con IA para WhatsApp y Telegram | Havenser',
    metaDescripcion: 'Chatbot con inteligencia artificial para WhatsApp y Telegram: atiende a sus clientes 24/7, responde preguntas frecuentes, agenda citas, toma pedidos y canaliza a un asesor. Agende una demo.',
    eyebrow: 'Chatbot con IA',
    h1: 'Atienda a sus clientes en WhatsApp las 24 horas',
    sub: 'Un asistente con inteligencia artificial, entrenado con la información de su negocio, que responde al instante en WhatsApp y Telegram y le pasa a su equipo solo las conversaciones que lo necesitan.',
    beneficios: [
      { titulo: 'Respuesta inmediata', texto: 'Ningún mensaje se queda sin contestar fuera de horario, en fin de semana o en temporada alta.' },
      { titulo: 'Entrenado con su negocio', texto: 'Precios, catálogo, horarios, políticas y preguntas frecuentes, en el tono de su marca.' },
      { titulo: 'Canaliza a una persona', texto: 'Cuando el cliente lo pide o el caso lo requiere, transfiere la conversación a su equipo con el contexto completo.' },
      { titulo: 'Agenda, cotiza y registra', texto: 'Puede agendar citas, tomar pedidos y guardar cada prospecto en su CRM u hoja de cálculo.' },
    ],
    proceso: [
      { titulo: 'Demo', texto: 'Le mostramos el asistente funcionando con un caso parecido al suyo.' },
      { titulo: 'Entrenamiento', texto: 'Cargamos la información de su negocio y definimos qué casos pasan a una persona.' },
      { titulo: 'Conexión', texto: 'Conectamos su número de WhatsApp Business o su bot de Telegram.' },
      { titulo: 'Mejora continua', texto: 'Revisamos conversaciones y ajustamos respuestas cada mes.' },
    ],
    faqs: [
      { q: '¿En qué canales funciona el chatbot?', a: 'Hoy en WhatsApp y Telegram. Si necesita otros canales, coméntelo en la demo.' },
      { q: '¿El chatbot reemplaza a mi equipo de atención?', a: 'No. Resuelve las preguntas repetitivas y fuera de horario, y transfiere a una persona los casos que lo requieren, con el contexto de la conversación.' },
      { q: '¿Qué pasa si el chatbot no sabe una respuesta?', a: 'No inventa: le dice al cliente que lo canaliza con un asesor y le avisa a su equipo.' },
      { q: '¿Necesito WhatsApp Business?', a: 'Sí, para WhatsApp se conecta a un número de WhatsApp Business. Le ayudamos con la configuración.' },
      { q: '¿Cuánto cuesta?', a: 'Depende del volumen de conversaciones y de las integraciones. Agende una demo y le enviamos una cotización a la medida.' },
    ],
  },
];

export const getSolucion = (slug: Solucion['slug']) => SOLUCIONES.find((s) => s.slug === slug)!;

// ---------- Automatización: áreas y casos típicos ----------
export interface AreaAutomatizacion { area: string; tareas: string[]; casoTipico: string }

export const AREAS_AUTOMATIZACION: AreaAutomatizacion[] = [
  {
    area: 'Ventas',
    tareas: ['Seguimiento automático de cotizaciones', 'Calificación de prospectos', 'Actualización del CRM desde correo y WhatsApp'],
    casoTipico: 'Un agente revisa cada mañana las cotizaciones sin respuesta y redacta el seguimiento para que el vendedor solo lo apruebe.',
  },
  {
    area: 'Atención a clientes',
    tareas: ['Respuestas a preguntas frecuentes', 'Clasificación y enrutamiento de tickets', 'Resúmenes de conversaciones'],
    casoTipico: 'Los correos de soporte llegan ya clasificados por urgencia, con un borrador de respuesta y la información del cliente.',
  },
  {
    area: 'Administración y finanzas',
    tareas: ['Captura de facturas (CFDI) y órdenes de compra', 'Conciliaciones bancarias', 'Reportes semanales automáticos'],
    casoTipico: 'La conciliación pasa de horas de captura manual a una revisión de excepciones: el agente solo marca lo que no cuadra.',
  },
  {
    area: 'Recursos humanos',
    tareas: ['Filtrado inicial de CVs', 'Respuestas sobre políticas internas', 'Onboarding guiado'],
    casoTipico: 'Un asistente interno responde dudas de vacaciones, prestaciones y procesos con base en el reglamento de la empresa.',
  },
  {
    area: 'Operaciones y logística',
    tareas: ['Extracción de datos web y de portales de proveedores', 'Alertas de inventario', 'Consolidación de Excel dispersos'],
    casoTipico: 'Los reportes que se armaban copiando datos de varios Excel se generan solos desde una base de datos centralizada.',
  },
];

// ---------- Chatbot: conversaciones de la demo (simuladas) ----------
export interface MensajeDemo { de: 'cliente' | 'bot'; texto: string }
export interface GiroDemo { id: string; giro: string; negocio: string; mensajes: MensajeDemo[] }

export const DEMO_CHATBOT: GiroDemo[] = [
  {
    id: 'clinica',
    giro: 'Clínica',
    negocio: 'Clínica Dental (ejemplo)',
    mensajes: [
      { de: 'cliente', texto: 'Hola, ¿cuánto cuesta una limpieza dental?' },
      { de: 'bot', texto: '¡Hola! La limpieza dental cuesta $650 e incluye revisión. ¿Le gustaría agendar una cita?' },
      { de: 'cliente', texto: 'Sí, ¿tienen el sábado en la mañana?' },
      { de: 'bot', texto: 'Tengo disponible el sábado a las 10:00 y a las 11:30. ¿Cuál prefiere?' },
      { de: 'cliente', texto: 'A las 10 por favor' },
      { de: 'bot', texto: 'Listo ✅ Cita confirmada el sábado a las 10:00. Le enviaré un recordatorio un día antes.' },
    ],
  },
  {
    id: 'restaurante',
    giro: 'Restaurante',
    negocio: 'Restaurante (ejemplo)',
    mensajes: [
      { de: 'cliente', texto: '¿Hacen entregas a domicilio?' },
      { de: 'bot', texto: 'Sí, entregamos en un radio de 5 km de 13:00 a 22:00. ¿Quiere ver el menú del día?' },
      { de: 'cliente', texto: 'Sí' },
      { de: 'bot', texto: 'Hoy tenemos: 1) Pasta al pesto $165, 2) Pollo en mole $180, 3) Ensalada de la casa $120. Responda con el número para agregarlo.' },
      { de: 'cliente', texto: '2, para dos personas' },
      { de: 'bot', texto: 'Perfecto: 2 × Pollo en mole = $360. ¿A qué dirección lo enviamos?' },
    ],
  },
  {
    id: 'distribuidora',
    giro: 'Distribuidora',
    negocio: 'Distribuidora industrial (ejemplo)',
    mensajes: [
      { de: 'cliente', texto: 'Buenas noches, necesito cotizar 200 rodamientos 6205' },
      { de: 'bot', texto: 'Con gusto. ¿Los necesita sellados (2RS) o abiertos? ¿Y a qué ciudad sería la entrega?' },
      { de: 'cliente', texto: 'Sellados, a Querétaro' },
      { de: 'bot', texto: 'Registré su solicitud: 200 × 6205-2RS, entrega en Querétaro. Un asesor le enviará la cotización formal mañana antes de las 11:00.' },
      { de: 'cliente', texto: 'Gracias' },
      { de: 'bot', texto: 'A usted. Si necesita algo más, aquí estoy las 24 horas.' },
    ],
  },
];
