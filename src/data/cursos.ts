// src/data/cursos.ts
//
// Catálogo de cursos de Havenser.
//
// FUENTE DE VERDAD: este archivo es la única fuente de datos para todo el
// sistema de cursos del sitio (navbar, /cursos y /cursos/[id]). Para dar de
// alta, editar o quitar un curso, edita el arreglo `CURSOS` de abajo — NO
// hace falta crear ni tocar ninguna página ni componente.
//
// Los datos vienen del catálogo real "Catalogo_Cursos_Interdisciplinarios.xlsx"
// compartido por el equipo (hoja "Catálogo de Cursos"). Los cursos con
// estatus "No mostrar" en ese Excel NO están incluidos aquí a propósito:
// si necesitas publicar uno, cámbialo a "en_revision" o "publicado" y
// agrégalo siguiendo el mismo formato que los demás.
//
// `id` es un identificador ficticio (no viene de ningún sistema externo /
// LMS real todavía). Se generó de forma secuencial a partir de 237689,
// el id de ejemplo que usó el equipo para "IA en el trabajo". Si en el
// futuro se conecta un LMS real, sustituye estos ids por los reales sin
// tocar el resto del sitio (todo se referencia por `id`).

export type EstatusCurso = "publicado" | "en_revision";

export interface Curso {
  /** Id ficticio, único. Se usa en la URL: /cursos/[id] */
  id: number;
  /** # original dentro del catálogo Excel, solo para referencia/orden. */
  numero: number;
  /** Eje temático (categoría) al que pertenece, usado para agrupar en el navbar y en /cursos. */
  eje: string;
  titulo: string;
  descripcion: string;
  estatus: EstatusCurso;
  industria: string;
  audiencia: string;
  modalidades: string;
  nivel: string;
  /** Qué hace distinto a este curso frente a la oferta típica del mercado. Puede faltar. */
  valorDiferenciador?: string;
  /**
   * Variante visual para PlantillaCurso (imagen a la izq/der, tipo de
   * animación de entrada). Se asigna cíclicamente para que los cursos no
   * se vean todos idénticos aunque compartan el mismo componente.
   */
  variante: "A" | "B" | "C";
}

function variantePorIndice(i: number): Curso["variante"] {
  const variantes: Curso["variante"][] = ["A", "B", "C"];
  return variantes[i % variantes.length];
}

// Los cursos están en el mismo orden que el catálogo original (por eje,
// luego por #). El id se asigna secuencialmente a partir de 237689 SOLO
// para los cursos que sí se muestran (el curso "No mostrar" del catálogo
// original nunca entra a este arreglo, así que no "gasta" un id).
const CATALOGO_BASE: Omit<Curso, "id" | "variante">[] = [
  // Eje 1: IA + Áreas técnicas
  {
    numero: 1,
    eje: "IA + Áreas técnicas",
    titulo: "IA en el trabajo",
    descripcion:
      "Domina herramientas de IA Generativa para optimizar tu productividad diaria de forma segura.",
    estatus: "publicado",
    industria: "Transversal (cualquier sector)",
    audiencia: "Público en general",
    modalidades: "B2B, En línea y Personalizado",
    nivel: "Básico-Intermedio",
  },
  {
    numero: 2,
    eje: "IA + Áreas técnicas",
    titulo: "IA aplicada a Supply Chain",
    descripcion:
      "Fundamentos de forecasting de demanda y optimización de rutas usando modelos de IA/ML.",
    estatus: "publicado",
    industria: "Logística, retail, manufactura",
    audiencia: "Equipos de planeación / profesionales individuales",
    modalidades: "B2B, En línea",
    nivel: "Básico",
    valorDiferenciador:
      "Combina IA con operaciones reales de cadena de suministro, un cruce poco común en la oferta de mercado.",
  },
  {
    numero: 3,
    eje: "IA + Áreas técnicas",
    titulo: "IA + Mantenimiento Predictivo",
    descripcion:
      "Cómo sensores IoT alimentan modelos de IA para predecir fallas mecánicas antes de que ocurran.",
    estatus: "publicado",
    industria: "Manufactura, energía, automotriz",
    audiencia: "Ingenieros de planta",
    modalidades: "B2B, Personalizado",
    nivel: "Básico-Intermedio",
    valorDiferenciador:
      "Integra IoT, mecánica e IA en un solo flujo de valor: de sensor a predicción accionable.",
  },
  {
    numero: 4,
    eje: "IA + Áreas técnicas",
    titulo: "IA para Ciencia de Datos en Laboratorio",
    descripcion:
      "Introducción a cómo la IA acelera el análisis de datos experimentales y el descubrimiento de patrones en química/bioquímica.",
    estatus: "publicado",
    industria: "Farmacéutica, alimentos, investigación",
    audiencia: "Científicos, estudiantes de posgrado",
    modalidades: "En línea",
    nivel: "Básico",
    valorDiferenciador:
      "Traduce IA a un lenguaje de laboratorio, cerrando la brecha entre ciencia experimental y datos.",
  },
  {
    numero: 5,
    eje: "IA + Áreas técnicas",
    titulo: "IA en Cloud para Redes Inteligentes",
    descripcion:
      "Fundamentos de cómo la IA optimiza tráfico de red y detecta anomalías en infraestructura cloud.",
    estatus: "publicado",
    industria: "Telecomunicaciones, TI corporativo",
    audiencia: "Equipos de IT",
    modalidades: "B2B, En línea",
    nivel: "Básico",
    valorDiferenciador:
      "Une tres capacidades técnicas (IA, cloud, redes) que normalmente se enseñan por separado.",
  },
  {
    numero: 6,
    eje: "IA + Áreas técnicas",
    titulo: "Fundamentos de IA para No Programadores",
    descripcion:
      "Curso puente: conceptos de IA/ML explicados con analogías de física/matemáticas, sin código.",
    estatus: "publicado",
    industria: "Transversal (cualquier sector)",
    audiencia: "Ejecutivos no técnicos, público general",
    modalidades: "En línea",
    nivel: "Básico",
    valorDiferenciador:
      "Curso “gateway” de bajo riesgo para atraer audiencia amplia hacia cursos más avanzados.",
  },
  {
    numero: 7,
    eje: "IA + Áreas técnicas",
    titulo: "Python para Ingenieros",
    descripcion: "Python aplicado al análisis de manufactura y calidad.",
    estatus: "publicado",
    industria: "Logística, retail, manufactura",
    audiencia: "Ingenieros de planta",
    modalidades: "B2B, En línea y Personalizado",
    nivel: "Básico-Intermedio",
  },
  {
    numero: 8,
    eje: "IA + Áreas técnicas",
    titulo: "Bases de Datos – SQL",
    descripcion: "Automatización con SQL y Power Platform.",
    estatus: "publicado",
    industria: "Transversal (cualquier sector)",
    audiencia: "Ejecutivos no técnicos, público general",
    modalidades: "B2B, En línea y Personalizado",
    nivel: "Básico-Intermedio",
    valorDiferenciador:
      "Además de aprender SQL, el público accede a una capacitación especializada en Power BI.",
  },

  // Eje 2: IoT + Ciencias Físicas/Mecánicas
  {
    numero: 9,
    eje: "IoT + Ciencias Físicas/Mecánicas",
    titulo: "IoT para Monitoreo Mecánico Básico",
    descripcion:
      "Fundamentos de sensores (vibración, temperatura, presión) conectados a plataformas IoT para vigilar el estado de maquinaria.",
    estatus: "en_revision",
    industria: "Manufactura, energía, minería",
    audiencia: "Técnicos y operadores",
    modalidades: "B2B, Personalizado",
    nivel: "Básico",
    valorDiferenciador:
      "Aplicación práctica e inmediata en planta, con curva de entrada baja.",
  },
  {
    numero: 10,
    eje: "IoT + Ciencias Físicas/Mecánicas",
    titulo: "Física Aplicada + IoT: Introducción a Gemelos Digitales",
    descripcion:
      "Cómo los principios de física (dinámica, termodinámica) se combinan con datos IoT para crear modelos virtuales de equipos reales.",
    estatus: "publicado",
    industria: "Manufactura, automotriz, aeroespacial",
    audiencia: "Ingenieros",
    modalidades: "B2B, En línea",
    nivel: "Básico-Intermedio",
    valorDiferenciador:
      "Introduce un concepto de vanguardia (digital twins) con bases físicas sólidas y accesibles.",
  },
  {
    numero: 11,
    eje: "IoT + Ciencias Físicas/Mecánicas",
    titulo: "Redes + IoT: Arquitecturas de Conectividad Industrial",
    descripcion:
      "Fundamentos de cómo diseñar redes (LoRaWAN, Wi-Fi industrial, 5G) para soportar sensores IoT a escala de planta.",
    estatus: "en_revision",
    industria: "Manufactura, ciudades inteligentes, agroindustria",
    audiencia: "Equipos de infraestructura",
    modalidades: "B2B, Personalizado",
    nivel: "Básico",
    valorDiferenciador:
      "Cubre la capa de conectividad que casi siempre se da por sentada en cursos de IoT.",
  },
  {
    numero: 12,
    eje: "IoT + Ciencias Físicas/Mecánicas",
    titulo: "Mecánica + Ciencia de Datos: Análisis de Vibraciones y Fallas",
    descripcion:
      "Introducción a cómo interpretar datos de sensores mecánicos con herramientas básicas de análisis de datos (sin ML avanzado).",
    estatus: "en_revision",
    industria: "Manufactura, energía",
    audiencia: "Técnicos, ingenieros junior",
    modalidades: "En línea",
    nivel: "Básico",
    valorDiferenciador:
      "Punto de entrada accesible al análisis de datos para perfiles mecánicos sin experiencia previa.",
  },
  {
    numero: 13,
    eje: "IoT + Ciencias Físicas/Mecánicas",
    titulo: "IoT para Principiantes: De Sensor a Dashboard",
    descripcion:
      "Curso introductorio hands-on: cómo montar un sensor simple, conectarlo a la nube y visualizar datos en tiempo real.",
    estatus: "publicado",
    industria: "Transversal",
    audiencia: "Estudiantes, recién graduados",
    modalidades: "En línea",
    nivel: "Básico",
    valorDiferenciador:
      "Curso “gateway” de IoT con resultado tangible en pocas horas, ideal para captar nuevos estudiantes.",
  },

  // Eje 3: Química/Bioquímica + Tecnología
  {
    numero: 14,
    eje: "Química/Bioquímica + Tecnología",
    titulo: "Ciencia de Datos para Química de Alimentos",
    descripcion:
      "Fundamentos de cómo analizar datos de control de calidad (composición, vida de anaquel, sensorial) con herramientas básicas de análisis de datos.",
    estatus: "publicado",
    industria: "Alimentos y bebidas",
    audiencia: "Equipos de calidad / I+D",
    modalidades: "B2B, En línea",
    nivel: "Básico",
    valorDiferenciador:
      "Aplica ciencia de datos a un dominio con alta necesidad de digitalización y poca oferta especializada.",
  },
  {
    numero: 15,
    eje: "Química/Bioquímica + Tecnología",
    titulo: "Bioquímica + Cloud Computing: Gestión de Datos de Laboratorio",
    descripcion:
      "Introducción a cómo almacenar, organizar y compartir datos experimentales de laboratorio usando plataformas cloud (sin necesidad de ser experto en TI).",
    estatus: "publicado",
    industria: "Farmacéutica, alimentos, investigación académica",
    audiencia: "Personal de laboratorio",
    modalidades: "En línea, Personalizado",
    nivel: "Básico",
    valorDiferenciador:
      "Resuelve un dolor común (datos de laboratorio dispersos) con una solución de bajo costo de entrada.",
  },
  {
    numero: 16,
    eje: "Química/Bioquímica + Tecnología",
    titulo: "Química Aplicada a Trazabilidad de Alimentos",
    descripcion:
      "Cómo sensores y datos químicos (pH, temperatura, humedad) se integran a la cadena de suministro para garantizar trazabilidad y seguridad alimentaria.",
    estatus: "en_revision",
    industria: "Alimentos y bebidas, logística",
    audiencia: "Equipos de calidad y supply chain",
    modalidades: "B2B, Personalizado",
    nivel: "Básico-Intermedio",
    valorDiferenciador:
      "Triple cruce (química, IoT, supply chain) directamente ligado a cumplimiento normativo.",
  },
  {
    numero: 17,
    eje: "Química/Bioquímica + Tecnología",
    titulo: "Fundamentos de Bioquímica para Perfiles Tecnológicos",
    descripcion:
      "Curso puente: conceptos básicos de bioquímica explicados para ingenieros/científicos de datos que trabajan en proyectos de biotecnología o alimentos, sin formación previa en la materia.",
    estatus: "en_revision",
    industria: "Biotecnología, alimentos, salud",
    audiencia: "Ingenieros, científicos de datos",
    modalidades: "En línea",
    nivel: "Básico",
    valorDiferenciador:
      "Curso “gateway” que abre la puerta a proyectos de biotecnología para perfiles tecnológicos.",
  },
  {
    numero: 18,
    eje: "Química/Bioquímica + Tecnología",
    titulo: "Química + Ciencia de Datos: Modelado Predictivo de Formulaciones",
    descripcion:
      "Introducción a cómo usar datos históricos de formulaciones (alimentos, cosméticos, materiales) para predecir propiedades del producto final.",
    estatus: "en_revision",
    industria: "Alimentos, cosmética, materiales",
    audiencia: "Equipos de I+D",
    modalidades: "B2B, Personalizado",
    nivel: "Básico-Intermedio",
    valorDiferenciador:
      "Acerca modelado predictivo a equipos de I+D que tradicionalmente trabajan por prueba y error.",
  },

  // Eje 4: Matemáticas/Física + Supply Chain y Cloud
  // (El curso #20 original, "Física + Cloud Computing: Simulación de
  // Sistemas en la Nube", tenía estatus "No mostrar" en el catálogo y por
  // eso se omite aquí a propósito.)
  {
    numero: 19,
    eje: "Matemáticas/Física + Supply Chain y Cloud",
    titulo: "Matemáticas Aplicadas a Optimización de Supply Chain",
    descripcion:
      "Fundamentos de programación lineal e investigación de operaciones para optimizar inventarios, rutas y niveles de servicio, sin necesidad de programar.",
    estatus: "publicado",
    industria: "Logística, retail, manufactura",
    audiencia: "Equipos de planeación",
    modalidades: "B2B, En línea",
    nivel: "Básico",
    valorDiferenciador:
      "Aterriza matemáticas abstractas en decisiones operativas concretas y medibles.",
  },
  {
    numero: 21,
    eje: "Matemáticas/Física + Supply Chain y Cloud",
    titulo: "Matemáticas para Ciencia de Datos: Fundamentos Estadísticos",
    descripcion:
      "Curso puente de estadística y probabilidad aplicada, orientado a quienes quieren entrar a ciencia de datos sin base matemática fuerte.",
    estatus: "publicado",
    industria: "Transversal",
    audiencia: "Estudiantes, profesionales en transición de carrera",
    modalidades: "En línea",
    nivel: "Básico",
    valorDiferenciador:
      "Curso “gateway” que reduce la deserción en cursos avanzados de ciencia de datos.",
  },
  {
    numero: 22,
    eje: "Matemáticas/Física + Supply Chain y Cloud",
    titulo: "Supply Chain + Cloud Computing: Plataformas Digitales de Cadena de Suministro",
    descripcion:
      "Fundamentos de cómo las plataformas cloud (ERP, visibilidad en tiempo real) transforman la gestión de la cadena de suministro.",
    estatus: "en_revision",
    industria: "Logística, manufactura, retail",
    audiencia: "Equipos de cadena de suministro, nivel ejecutivo",
    modalidades: "B2B, En línea",
    nivel: "Básico",
    valorDiferenciador:
      "Conecta transformación digital con un tema de alta visibilidad para tomadores de decisión.",
  },
  {
    numero: 23,
    eje: "Matemáticas/Física + Supply Chain y Cloud",
    titulo: "Física + Matemáticas + Redes: Fundamentos de Sistemas de Comunicación",
    descripcion:
      "Introducción a los principios físicos y matemáticos detrás de redes (señales, ancho de banda, propagación), para quienes trabajan en redes sin formación en ingeniería de telecomunicaciones.",
    estatus: "en_revision",
    industria: "Telecomunicaciones, TI",
    audiencia: "Técnicos de redes",
    modalidades: "En línea, B2B",
    nivel: "Básico",
    valorDiferenciador:
      "Da bases teóricas sólidas a perfiles de redes con formación mayormente práctica.",
  },
];

const ID_BASE = 237689;

export const CURSOS: Curso[] = CATALOGO_BASE.map((curso, i) => ({
  ...curso,
  id: ID_BASE + i,
  variante: variantePorIndice(i),
}));

export function getCursoById(id: number): Curso | undefined {
  return CURSOS.find((c) => c.id === id);
}

export interface GrupoEje {
  eje: string;
  cursos: Curso[];
}

/** Cursos agrupados por eje temático, en el mismo orden del catálogo original. */
export function getCursosPorEje(): GrupoEje[] {
  const grupos: GrupoEje[] = [];
  for (const curso of CURSOS) {
    let grupo = grupos.find((g) => g.eje === curso.eje);
    if (!grupo) {
      grupo = { eje: curso.eje, cursos: [] };
      grupos.push(grupo);
    }
    grupo.cursos.push(curso);
  }
  return grupos;
}

// No hay una foto propia por curso todavía, así que se usa una imagen
// representativa por eje temático (ya existente en /public). En cuanto
// haya fotografía real por curso, agrega un campo `imagen` a cada curso
// en `CATALOGO_BASE` y úsalo en vez de esta función.
const IMAGEN_POR_EJE: Record<string, string> = {
  "IA + Áreas técnicas": "/ia.jpeg",
  "IoT + Ciencias Físicas/Mecánicas": "/iot.jpeg",
  "Química/Bioquímica + Tecnología": "/biologia.jpeg",
  "Matemáticas/Física + Supply Chain y Cloud": "/logistica.jpeg",
};

export function getImagenCurso(curso: Curso): string {
  return IMAGEN_POR_EJE[curso.eje] ?? "/software.jpeg";
}
