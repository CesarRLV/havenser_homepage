// src/data/areasEspecialidad.ts
//
// Contenido de las 6 subpáginas de área de especialidad (menús "Tech" y
// "Ciencia & Logística" del navbar). Todas se renderizan con el mismo
// componente `src/components/tech/PlantillaArea.astro` — para editar el
// texto de una página, edita el objeto correspondiente aquí, NO el
// componente ni la página .astro.
//
// El copy viene del brief de marca (Marca Havenser.md) que compartió el
// equipo: cada bullet corresponde a un servicio real ya definido para esa
// área, no a relleno genérico.

export interface AreaEspecialidad {
  slug: string;
  /** Texto corto que aparece en el navbar y como eyebrow de la página. */
  categoria: string;
  titulo: string;
  resumen: string;
  imagen: string;
  bullets: { titulo: string; desc: string }[];
  /** A quién va dirigido este servicio (si aplica). */
  audiencia?: string;
}

export const AREAS: Record<string, AreaEspecialidad> = {
  "tech-data": {
    slug: "tech/data",
    categoria: "Tech · AI & Datos",
    titulo: "Automatización e Inteligencia Operativa",
    resumen:
      "Eliminamos cuellos de botella operativos mediante la implementación de modelos predictivos y machine learning. Transformamos flujos manuales en activos automatizados de alto rendimiento, incrementando drásticamente la eficiencia empresarial de su organización.",
    imagen: "/ia.jpeg",
    bullets: [
      {
        titulo: "RPA (Automatización Robótica de Procesos)",
        desc: "Creación de bots para la extracción automatizada de datos web (web scraping) y ejecución de tareas repetitivas sin intervención humana.",
      },
      {
        titulo: "Ingeniería de Datos y Pipelines ETL",
        desc: "Diseño de procesos automatizados de Extracción, Transformación y Carga para migrar flujos manuales (como archivos de Excel dispersos) hacia bases de datos centralizadas y limpias.",
      },
      {
        titulo: "Implementación de Inteligencia Artificial",
        desc: "Integración de modelos analíticos predictivos y machine learning para descubrir valor oculto en los datos operativos de la empresa.",
      },
    ],
  },

  "tech-dev": {
    slug: "tech/dev",
    categoria: "Tech · Desarrollo, Infraestructura e IoT",
    titulo: "Ingeniería de Software e Infraestructura Cloud",
    resumen:
      "Construimos plataformas tecnológicas adaptadas a la lógica exacta de su negocio y diseñamos ecosistemas distribuidos robustos para operaciones transaccionales críticas, sin interrupciones.",
    imagen: "/web_servicios.jpeg",
    bullets: [
      {
        titulo: "Desarrollo Full-Stack a la Medida",
        desc: "Ingeniería de plataformas web transaccionales, aplicaciones móviles y ecosistemas de software bajo demanda.",
      },
      {
        titulo: "Plataformas de Gestión (LMS y ERP)",
        desc: "Construcción de portales educativos, sistemas de reservas con reglas de negocio dinámicas y paneles de administración corporativa.",
      },
      {
        titulo: "Despliegue y Migración Cloud",
        desc: "Configuración, alojamiento y gestión de arquitecturas de alta disponibilidad utilizando plataformas como AWS y redes perimetrales (Cloudflare).",
      },
      {
        titulo: "Arquitectura IoT (Internet de las Cosas)",
        desc: "Auditoría, diseño y optimización de redes de comunicación seguras para conectar infraestructura física con entornos digitales.",
      },
    ],
  },

  "tech-virtual": {
    slug: "tech/virtual",
    categoria: "Tech · RX Realidad Extendida",
    titulo: "Realidad Extendida e Inmersión Digital",
    resumen:
      "Desarrollamos entornos y soluciones espaciales (Spatial Computing) orientadas al sector corporativo e industrial (Enterprise XR), reduciendo costos operativos, tiempos de capacitación y margen de error humano mediante interacciones 3D avanzadas.",
    imagen: "/ra.jpeg",
    bullets: [
      {
        titulo: "Realidad Virtual (VR)",
        desc: "Simulaciones inmersivas de alta fidelidad para entrenamiento técnico en entornos de alto riesgo (mantenimiento industrial, protocolos de evacuación, operaciones químicas) y aulas virtuales interactivas.",
      },
      {
        titulo: "Realidad Aumentada (AR)",
        desc: "Proyección de capas de información y planos digitales sobre el mundo real mediante marcadores o algoritmos SLAM, aplicados a guiado paso a paso en ensamblaje, inventarios (picking guiado) y empaques interactivos.",
      },
      {
        titulo: "Realidad Mixta (MR) y Computación Espacial",
        desc: "Desarrollo de soluciones con passthrough avanzado (HoloLens, Apple Vision Pro) para colaboración remota multidisciplinaria con prototipos 3D flotantes en tiempo real.",
      },
      {
        titulo: "Gemelos Espaciales y Maquetas Holográficas",
        desc: "Visualización y revisión de estructuras mecánicas o instalaciones a escala real antes de su ejecución física.",
      },
    ],
  },

  "ciencia-biotech": {
    slug: "ciencia/biotech",
    categoria: "Ciencia · BioTech",
    titulo: "Biocomputación y Consultoría Regulatoria",
    resumen:
      "Dirigido a industrias alimentarias, farmacéuticas y biotecnológicas que buscan validar científicamente sus productos o escalar procesos químicos y de producción.",
    imagen: "/biologia.jpeg",
    bullets: [
      {
        titulo: "Modelado de Sistemas Biológicos",
        desc: "Simulaciones físico-matemáticas avanzadas aplicadas a reacciones químicas y cultivos biológicos.",
      },
      {
        titulo: "Optimización de Formulaciones",
        desc: "Análisis computacional para elevar la estabilidad, rendimiento y calidad de insumos agrícolas y alimentos.",
      },
      {
        titulo: "Asesoría Regulatoria y Bioseguridad",
        desc: "Consultoría en cumplimiento normativo de calidad para industrias alimentarias, farmacéuticas y biotecnológicas.",
      },
    ],
  },

  "ciencia-logistica": {
    slug: "ciencia/logistica",
    categoria: "Ciencia · Logística",
    titulo: "Optimización de Cadena de Suministro y Logística Predictiva",
    resumen:
      "Enfocado en empresas de manufactura, automotriz, retail o distribución con cuellos de botella en inventarios, retrasos de proveedores o altos costos de transporte.",
    imagen: "/logistica.jpeg",
    bullets: [
      {
        titulo: "Modelos Predictivos de Demanda",
        desc: "Algoritmos basados en Machine Learning para anticipar la necesidad de insumos y evitar roturas de stock.",
      },
      {
        titulo: "Optimización de Rutas de Distribución",
        desc: "Cálculo matemático de rutas eficientes para reducir tiempos de traslado y consumo de combustible.",
      },
      {
        titulo: "Simulación de Almacenes",
        desc: "Modelado físico de flujos logísticos para optimizar el almacenamiento y movimiento de piezas.",
      },
    ],
  },

  "ciencia-innova": {
    slug: "ciencia/innova",
    categoria: "Ciencia · Innova",
    titulo: "Automatización, Modernización y Optimización de Procesos",
    resumen:
      "Especializado en plantas de manufactura, sector automotriz e infraestructura física que desean monitorear, modernizar y optimizar su operación en tiempo real. Innovación aplicada directamente al piso de planta y a la gestión diaria de la empresa.",
    imagen: "/iot.jpeg",
    bullets: [
      {
        titulo: "Integración de Dispositivos IoT",
        desc: "Despliegue de sensores y redes de comunicación en piso de producción.",
      },
      {
        titulo: "Tableros de Control en Tiempo Real",
        desc: "Paneles analíticos para la visualización instantánea del estado de máquinas y consumo energético.",
      },
      {
        titulo: "Gemelos Digitales (Digital Twins)",
        desc: "Réplicas virtuales de sistemas mecánicos para pruebas de estrés, detección de fallas y mantenimiento predictivo.",
      },
      {
        titulo: "Innovación y mejora continua",
        desc: "Refinación y optimización de procesos operativos y administrativos en empresas y PyMEs, con metodologías ágiles.",
      },
    ],
  },
};

export function getArea(slug: string): AreaEspecialidad | undefined {
  return AREAS[slug];
}
